<?php
declare(strict_types=1);

namespace MsThemeConfig\Analytics;

use Closure;
use DomainException;
use Throwable;

/** Claims before HTTP; an ambiguous delivery is held for investigation, not auto-replayed. */
final class Ga4RefundDispatcher
{
    private RefundDispatchStore $store;
    private Closure $sender;
    private Closure $clock;

    public function __construct(RefundDispatchStore $store, ?callable $sender = null, ?callable $clock = null)
    {
        $this->store = $store;
        $this->sender = Closure::fromCallable($sender ?? [Ga4RefundTransport::class, 'send']);
        $this->clock = Closure::fromCallable($clock ?? 'time');
    }

    /**
     * The snapshot callback only reads persisted order/credit-note data. Calling it here
     * records preparation failures too, and a duplicate hook does not need to read secrets.
     */
    public function dispatch(array $key, callable $snapshotReader, bool $retry = false): array
    {
        $token = $this->store->claim($key, $retry);
        if ($token === null) {
            return [
                'processed' => false,
                'record' => $this->store->find((int)$key['id_shop'], (int)$key['id_order_slip']),
            ];
        }
        $sending = false;
        try {
            $snapshot = $snapshotReader();
            if ((int)$snapshot['order']['id_order'] !== (int)$key['id_order']
                || (int)$snapshot['order']['id_shop'] !== (int)$key['id_shop']
                || (int)$snapshot['slip']['id_order_slip'] !== (int)$key['id_order_slip']) {
                throw new DomainException('refund_snapshot_key_mismatch');
            }
            $payload = Ga4RefundBuilder::build($snapshot, ($this->clock)());
            $request = Ga4RefundTransport::request($snapshot, $payload);
            // A durable write must succeed before starting the external request.
            $this->store->update($key, $token, 'sending', 'http_request_started');
            $sending = true;
            $response = ($this->sender)($request);
            $state = Ga4RefundTransport::outcome($response);
            $reasons = [
                'accepted' => 'endpoint_accepted',
                'failed' => 'connection_failed_before_delivery',
                'uncertain' => 'delivery_requires_verification',
            ];
            $this->store->update($key, $token, $state, $reasons[$state], $response);
        } catch (Throwable $exception) {
            if ($sending) {
                $state = 'uncertain';
                $reason = 'delivery_or_acknowledgement_uncertain';
            } else {
                $reason = $exception instanceof DomainException ? $exception->getMessage() : 'refund_preparation_failed';
                $state = in_array($reason, ['analytics_consent_denied', 'zero_refund'], true) ? 'skipped' : 'blocked';
                if ($reason === 'credit_note_older_than_72_hours') {
                    $state = 'expired';
                }
            }
            // If this write also fails, leave the durable preparing/sending claim in place.
            // The hook boundary catches the error so analytics cannot interrupt the credit.
            $this->store->update($key, $token, $state, $reason);
        }

        return [
            'processed' => true,
            'record' => $this->store->find((int)$key['id_shop'], (int)$key['id_order_slip']),
        ];
    }
}

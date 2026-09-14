<?php
declare(strict_types=1);

namespace MsThemeConfig\Controller\Admin;

use Address;
use Configuration;
use Context;
use Country;
use DateTimeImmutable;
use DateTimeZone;
use MsThemeConfig\Class\KoopmanReturnNotification;
use MsThemeConfig\Class\KoopmanReturnShipment;
use MsThemeConfig\Class\KoopmanReturnSettings;
use Order;
use PrestaShopBundle\Controller\Admin\PrestaShopAdminController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Throwable;
use Validate;

/** Customer collection requests and their labels belong to the authenticated back office. */
class KoopmanReturnController extends PrestaShopAdminController
{
    public function __construct(private CsrfTokenManagerInterface $returnTokens)
    {
    }

    public function formAction(Request $request): Response
    {
        $order = $this->loadOrder($request->query->getInt('id_order'));
        try {
            $existing = (new KoopmanReturnShipment())->getForOrder($order);
            $created = ($existing['status'] ?? '') === 'created';
            $blocked = in_array($existing['status'] ?? '', ['creating', 'uncertain'], true);
            if (!$created && !$blocked) {
                $this->assertCanCreate($order);
            }
            $address = new Address((int) $order->id_address_delivery);
            if (!Validate::isLoadedObject($address)) {
                throw new \InvalidArgumentException('Het afleveradres van de bestelling is niet gevonden.');
            }
            $preflightError = '';
            $phone = trim((string) $address->phone_mobile) ?: trim((string) $address->phone);
            if (!$created && !$blocked) {
                try {
                    $phone = KoopmanReturnShipment::getCustomerPhone($address);
                } catch (\InvalidArgumentException $e) {
                    $preflightError = $e->getMessage()
                        . ' Vul een geldig telefoonnummer in bij het afleveradres van deze bestelling en open de retour opnieuw.';
                }
            }
            $today = new DateTimeImmutable('today', new DateTimeZone('Europe/Amsterdam'));
            $pickup = $today->modify('+1 weekday');
            $notification = $created ? $this->notificationState($order, (int) $existing['return_id']) : [];
            $products = $order->getOrderDetailList();
            foreach ($products as $key => $product) {
                $unitWeight = $product['product_weight'] ?? null;
                $quantity = $product['product_quantity'] ?? null;
                $weight = is_numeric($unitWeight) && is_numeric($quantity) && $unitWeight >= 0 && $quantity >= 0
                    ? (float) $unitWeight * (float) $quantity : null;
                $products[$key]['retour_weight'] = $weight !== null && is_finite($weight)
                    ? number_format($weight, 3, ',', '.') : null;
            }
            $template = Context::getContext()->smarty->createTemplate(
                _PS_MODULE_DIR_ . 'msthemeconfig/views/templates/admin/retourform.tpl'
            );
            $template->assign([
                'id_order' => (int) $order->id,
                'order' => $order,
                'retour_submit_url' => $this->generateUrl('admin_koopman_return_create'),
                'retour_token' => $this->returnTokens->getToken($this->tokenId($order))->getValue(),
                'retour_request_key' => bin2hex(random_bytes(16)),
                'retour_pickup_date' => $pickup->format('Y-m-d'),
                'retour_min_pickup_date' => $today->format('Y-m-d'),
                'retour_address' => [
                    'name' => trim($address->firstname . ' ' . $address->lastname),
                    'company' => $address->company,
                    'address1' => $address->address1,
                    'address2' => $address->address2,
                    'house_number' => $address->house_number ?? '',
                    'house_number_extension' => $address->house_number_extension ?? '',
                    'postcode' => $address->postcode,
                    'city' => $address->city,
                    'country' => Country::getNameById((int) $order->id_lang, (int) $address->id_country),
                    'phone' => $phone,
                ],
                // Enter the packages actually being returned, independently of the outbound shipment.
                'retour_packages' => [],
                'retour_products' => $products,
                'retour_created' => $created,
                'retour_blocked' => $blocked,
                'retour_preflight_error' => $preflightError,
                'retour_message' => $existing['message'] ?? '',
                'retour_tracking' => $existing['tracking_number'] ?? '',
                'retour_tracking_url' => $existing['tracking_url'] ?? '',
                'retour_labels' => $existing ? $this->labelLinks($order, $existing) : [],
                'retour_return_id' => (int) ($existing['return_id'] ?? 0),
                'retour_send_url' => $this->generateUrl('admin_koopman_return_send'),
                'retour_notification' => $notification,
                'retour_customer_email' => $notification['recipient'] ?? '',
            ]);

            return new Response($template->fetch(), 200, ['Cache-Control' => 'no-store']);
        } catch (Throwable $e) {
            $message = $e instanceof \InvalidArgumentException
                ? $e->getMessage()
                : 'Het retourformulier kon niet worden geladen. Probeer het opnieuw of controleer de module-instellingen.';
            return new Response('<div class="alert alert-danger">' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</div>', 400, ['Cache-Control' => 'no-store']);
        }
    }

    public function createAction(Request $request): JsonResponse
    {
        $order = $this->loadOrder($request->request->getInt('id_order'));
        if (!$this->isCsrfTokenValid($this->tokenId($order), $request->request->get('token'))) {
            return new JsonResponse(['success' => false, 'message' => 'De sessie is verlopen. Open het retourformulier opnieuw.'], 403);
        }
        try {
            $service = new KoopmanReturnShipment();
            $existing = $service->getForOrder($order);
            if (!$existing || $existing['status'] === 'failed') {
                $this->assertCanCreate($order);
            }
            $result = $service->create(
                $order,
                $request->request->all(),
                (string) $request->request->get('request_key', ''),
                $this->getEmployeeContext()->getEmployee()->getId()
            );
            $notification = $result['status'] === 'created'
                ? $this->notificationState($order, (int) $result['return_id'])
                : [];
            return new JsonResponse([
                'success' => $result['status'] === 'created',
                'blocked' => in_array($result['status'], ['creating', 'uncertain'], true),
                'message' => $result['message'],
                'tracking_number' => $result['tracking_number'],
                'tracking_url' => $result['tracking_url'],
                'labels' => $this->labelLinks($order, $result),
                'return_id' => (int) $result['return_id'],
                'send_url' => $this->generateUrl('admin_koopman_return_send'),
                'notification' => $notification,
                'customer_email' => $notification['recipient'] ?? '',
            ], 200, ['Cache-Control' => 'no-store']);
        } catch (\InvalidArgumentException $e) {
            return new JsonResponse(['success' => false, 'message' => $e->getMessage()], 400);
        } catch (Throwable $e) {
            return new JsonResponse([
                'success' => false,
                'blocked' => true,
                'message' => 'De retouraanvraag kon niet worden afgerond. Open het formulier opnieuw om de status te controleren.',
            ], 500);
        }
    }

    /** Only the explicit Send to customer action dispatches the return email. */
    public function sendAction(Request $request): JsonResponse
    {
        $order = $this->loadOrder($request->request->getInt('id_order'));
        if (!$this->isCsrfTokenValid($this->tokenId($order), $request->request->get('token'))) {
            return new JsonResponse(['success' => false, 'message' => 'De sessie is verlopen. Open het retourformulier opnieuw.'], 403);
        }
        try {
            $result = (new KoopmanReturnNotification())->send(
                $order,
                $request->request->getInt('return_id'),
                $this->getEmployeeContext()->getEmployee()->getId()
            );
            return new JsonResponse([
                'success' => $result['status'] === 'sent',
                'blocked' => (bool) $result['blocked'],
                'message' => $result['message'],
                'notification' => $result,
            ], 200, ['Cache-Control' => 'no-store']);
        } catch (\InvalidArgumentException $e) {
            return new JsonResponse(['success' => false, 'message' => $e->getMessage()], 400, ['Cache-Control' => 'no-store']);
        } catch (Throwable $e) {
            return new JsonResponse([
                'success' => false,
                'blocked' => true,
                'message' => 'De verzendbevestiging kon niet worden opgehaald. Open de retour opnieuw om de e-mailstatus te controleren.',
            ], 500, ['Cache-Control' => 'no-store']);
        }
    }

    public function labelAction(Request $request): Response
    {
        $order = $this->loadOrder($request->query->getInt('id_order'));
        try {
            $label = (new KoopmanReturnShipment())->getLabel(
                $order,
                $request->query->getInt('return_id'),
                $request->query->getInt('label_index')
            );
        } catch (Throwable $e) {
            throw $this->createNotFoundException('Het retourlabel is niet gevonden.');
        }
        $disposition = $request->query->getBoolean('preview') ? 'inline' : 'attachment';
        return new Response($label['content'], 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => $disposition . '; filename="' . preg_replace('/[^A-Za-z0-9._-]/', '_', $label['filename']) . '"',
            'Cache-Control' => 'private, no-store',
            'X-Content-Type-Options' => 'nosniff',
            'X-Frame-Options' => 'SAMEORIGIN',
        ]);
    }

    private function loadOrder(int $id): Order
    {
        $this->denyAccessUnlessGranted('update', 'AdminOrders');
        $employee = $this->getEmployeeContext();
        if (!$employee->getEmployee()) {
            throw $this->createAccessDeniedException();
        }
        $order = new Order($id);
        if (!Validate::isLoadedObject($order)) {
            throw $this->createNotFoundException('De bestelling is niet gevonden.');
        }
        if (!$employee->hasAuthorizationOnShop((int) $order->id_shop)) {
            throw $this->createAccessDeniedException();
        }
        return $order;
    }

    private function assertCanCreate(Order $order): void
    {
        $getConfig = static fn (string $key) => Configuration::get($key, (int) $order->id_lang, (int) $order->id_shop_group, (int) $order->id_shop);
        $show = $getConfig('KOOPMANORDEREXPORT_SHOW_RETOUR');
        $accepted = KoopmanReturnSettings::parseStates($getConfig('KOOPMANORDEREXPORT_RETOUR_ACCEPTED_STATUSSES'));
        $created = KoopmanReturnSettings::parseStates($getConfig('KOOPMANORDEREXPORT_RETOUR_CREATED_STATUSSES'));
        if (($show !== false && !(bool) $show) || !in_array((int) $order->current_state, $accepted, true)) {
            throw new \InvalidArgumentException('Voor deze bestelstatus kan geen retour worden aangemaakt. Controleer de Koopman-retourinstellingen.');
        }
        if (in_array((int) $order->current_state, $created, true)) {
            throw new \InvalidArgumentException('Deze bestelling heeft al een retourstatus. Controleer de bestaande retour bij Transmission.');
        }
    }

    private function tokenId(Order $order): string
    {
        return 'koopman_return_' . (int) $order->id;
    }

    private function notificationState(Order $order, int $returnId): array
    {
        try {
            return (new KoopmanReturnNotification())->getForReturn($order, $returnId);
        } catch (Throwable $e) {
            // An email-status failure must not hide a successfully booked shipment or its label.
            return [
                'status' => 'unavailable',
                'sent' => false,
                'blocked' => true,
                'can_send' => false,
                'sent_at' => '',
                'recipient' => '',
                'message' => 'De e-mailstatus kan niet worden geladen. Open de retour opnieuw om te controleren of de klant is bericht.',
            ];
        }
    }

    private function labelLinks(Order $order, array $result): array
    {
        $labels = [];
        for ($index = 0; $index < (int) $result['label_count']; ++$index) {
            $labels[] = [
                'label' => 'Retourlabel ' . ($index + 1) . ' (PDF)',
                'url' => $this->generateUrl('admin_koopman_return_label', [
                    'id_order' => (int) $order->id,
                    'return_id' => (int) $result['return_id'],
                    'label_index' => $index,
                ]),
                'preview_url' => $this->generateUrl('admin_koopman_return_label', [
                    'id_order' => (int) $order->id,
                    'return_id' => (int) $result['return_id'],
                    'label_index' => $index,
                    'preview' => 1,
                ]),
            ];
        }
        return $labels;
    }
}

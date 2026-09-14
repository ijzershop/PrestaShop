<?php
declare(strict_types=1);

namespace MsThemeConfig\Analytics;

interface RefundDispatchStore
{
    /** Atomically claim a new note, or an explicitly retried blocked/unsent note. */
    public function claim(array $key, bool $retry): ?string;

    /** Persist state only while this attempt still owns the claim. */
    public function update(array $key, string $token, string $state, string $reason, array $response = []): void;

    public function find(int $shopId, int $slipId): ?array;
}

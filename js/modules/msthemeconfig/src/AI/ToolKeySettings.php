<?php

declare(strict_types=1);

namespace MsThemeConfig\AI;

use Configuration;
use Context;
use Db;
use DomainException;
use Module;
use Shop;
use Tools;

/** Server credentials for the four customer tools, independent of content-generation keys. */
final class ToolKeySettings
{
    public const TOKEN_FIELD = 'ai_tool_keys_token';
    public const KEYS = [
        'search' => 'MSTHEMECONFIG_AI_SEARCH_OPENAI_KEY',
        'cutting' => 'MSTHEMECONFIG_AI_CUTTING_OPENAI_KEY',
        'sawing' => 'MSTHEMECONFIG_AI_SAWING_OPENAI_KEY',
        'plasma' => 'MSTHEMECONFIG_AI_PLASMA_OPENAI_KEY',
    ];

    public static function isManagedField(string $field): bool
    {
        return in_array($field, self::KEYS, true)
            || (str_ends_with($field, '_REMOVE') && in_array(substr($field, 0, -7), self::KEYS, true));
    }

    public static function canManage(): bool
    {
        $employee = Context::getContext()->employee;
        if (!$employee || !(int) $employee->id || !$employee->isLoggedBack()
            || !in_array((int) $employee->id_profile, [1, 2, 3, 4], true)) {
            return false;
        }

        $module = Module::getInstanceByName('msthemeconfig');
        return $module && $module->getPermission('configure', $employee);
    }

    private static function canManageShop(): bool
    {
        $context = Context::getContext();
        if (Shop::getContext() !== Shop::CONTEXT_SHOP || (int) $context->shop->id < 1) {
            return false;
        }

        return $context->employee->isSuperAdmin()
            || in_array((int) $context->shop->id, array_map('intval', $context->employee->getAssociatedShops()), true);
    }

    /** Only presence is returned to the back office; saved secrets never enter view data. */
    public static function viewData(): array
    {
        $allowed = self::canManage();
        $shopAllowed = $allowed && self::canManageShop();
        $labels = ['search' => 'Zoeken in de werkbalk', 'cutting' => 'Hulp bij snijden',
            'sawing' => 'Hulp bij zagen', 'plasma' => 'Hulp bij plasmasnijden'];
        $fields = [];
        foreach (self::KEYS as $tool => $key) {
            $fields[] = [
                'name' => $key,
                'label' => $labels[$tool],
                'configured' => $shopAllowed && self::get($tool, (int) Context::getContext()->shop->id) !== '',
            ];
        }

        return [
            'ai_tool_keys_allowed' => $allowed,
            'ai_tool_keys_shop_allowed' => $shopAllowed,
            'ai_tool_key_fields' => $fields,
            'ai_tool_keys_token' => $shopAllowed ? Tools::getAdminTokenLite('AdminModules') : '',
        ];
    }

    /** Server-side reads explicitly refuse inherited group/global credentials. */
    public static function get(string $tool, int $shopId): string
    {
        if (!isset(self::KEYS[$tool]) || $shopId < 1) {
            throw new DomainException('Ongeldige AI-tool of winkel.');
        }
        try {
            $shop = new Shop($shopId);
            $key = self::KEYS[$tool];
            if (!Shop::isFeatureActive()) {
                // Core Configuration::get ignores explicit shop IDs when multishop is disabled.
                $value = Db::getInstance()->getValue(
                    'SELECT `value` FROM `' . _DB_PREFIX_ . 'configuration` WHERE '
                    . self::shopRestriction($key, (int) $shop->id_shop_group, $shopId),
                    false
                );
                return is_string($value) ? $value : '';
            }
            // get() initializes PrestaShop's configuration cache before hasKey().
            $value = Configuration::get($key, null, (int) $shop->id_shop_group, $shopId, '');
            return Configuration::hasKey($key, null, null, $shopId) && is_string($value) ? $value : '';
        } catch (\Throwable $error) {
            throw new DomainException('De AI-API-sleutel kon niet worden gelezen.');
        }
    }

    /** Call with POST fields only. Validate the entire credential change before writing. */
    public static function saveRequest(array $request): void
    {
        if (!array_filter(array_keys($request), [self::class, 'isManagedField'])) {
            return;
        }
        if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST' || !self::canManage()) {
            throw new DomainException('U heeft geen toegang om de AI-API-sleutels te wijzigen.');
        }
        $token = $request[self::TOKEN_FIELD] ?? null;
        if (!is_string($token) || $token === '' || !hash_equals(Tools::getAdminTokenLite('AdminModules'), $token)) {
            throw new DomainException('De beveiligingscontrole is verlopen. Vernieuw de pagina en probeer opnieuw.');
        }
        if (!self::canManageShop()) {
            throw new DomainException('Selecteer eerst een afzonderlijke winkel waarvoor u toegang heeft.');
        }

        $updates = [];
        foreach (self::KEYS as $key) {
            $value = $request[$key] ?? '';
            $remove = $request[$key . '_REMOVE'] ?? '0';
            if (!is_string($value) || !in_array($remove, ['0', '1'], true)) {
                throw new DomainException('Ongeldige AI-API-sleutelinstelling.');
            }
            $value = trim($value);
            if (strlen($value) > 2048 || ($value !== '' && preg_match('/[^\x21-\x7e]/', $value))) {
                throw new DomainException('De AI-API-sleutel bevat ongeldige tekens of is te lang.');
            }
            if ($remove === '1' && $value !== '') {
                throw new DomainException('Kies per AI-tool voor vervangen of verwijderen van de sleutel.');
            }
            if ($remove === '1' || $value !== '') {
                $updates[$key] = $remove === '1' ? '' : $value;
            }
        }

        $shop = Context::getContext()->shop;
        foreach ($updates as $key => $value) {
            try {
                $saved = self::store($key, $value, (int) $shop->id_shop_group, (int) $shop->id);
            } catch (\Throwable $error) {
                // Database exceptions can contain the SQL value. Never expose a submitted credential.
                throw new DomainException('De AI-API-sleutel kon niet worden opgeslagen.');
            }
            if (!$saved) {
                throw new DomainException('De AI-API-sleutel kon niet worden opgeslagen.');
            }
        }
    }

    private static function shopRestriction(string $key, int $groupId, int $shopId): string
    {
        return "`name` = '" . pSQL($key) . "' AND `id_shop_group` = " . $groupId . ' AND `id_shop` = ' . $shopId;
    }

    private static function store(string $key, string $value, int $groupId, int $shopId): bool
    {
        if (Shop::isFeatureActive()) {
            return Configuration::updateValue($key, $value, false, $groupId, $shopId);
        }

        // Configuration::updateValue would otherwise silently write a global credential.
        $db = Db::getInstance();
        $where = self::shopRestriction($key, $groupId, $shopId);
        $existing = $db->getValue('SELECT `id_configuration` FROM `' . _DB_PREFIX_ . 'configuration` WHERE ' . $where, false);
        $data = ['value' => pSQL($value), 'date_upd' => date('Y-m-d H:i:s')];
        if ($existing) {
            return (bool) $db->update('configuration', $data, $where);
        }

        return (bool) $db->insert('configuration', $data + [
            'name' => pSQL($key), 'id_shop_group' => $groupId, 'id_shop' => $shopId,
            'date_add' => $data['date_upd'],
        ]);
    }
}

<?php

declare(strict_types=1);

namespace MsThemeConfig\Plasma;

use Configuration;
use Context;
use Db;
use DomainException;
use Shop;

/** Shop-scoped plasma settings. Machine parameters must be commissioned explicitly. */
final class PlasmaSettings
{
    public const PREFIX = 'MSTHEMECONFIG_PLASMA_';
    public const STOCK_WIDTH_MM = 1000.0;
    public const STOCK_HEIGHT_MM = 500.0;
    public const MACHINE_FIELDS = ['feed_rate', 'pierce_time', 'lead_in_length', 'operating_cost_per_minute'];

    public static function defaults(): array
    {
        return [
            self::PREFIX . 'ENABLED' => '0',
            self::PREFIX . 'PYTHON_BINARY' => '',
            self::PREFIX . 'MATERIAL_SOURCE' => '',
            self::PREFIX . 'WIDTH_SOURCE' => '',
            self::PREFIX . 'HEIGHT_SOURCE' => '',
            self::PREFIX . 'THICKNESS_SOURCE' => '',
            self::PREFIX . 'FEED_RATE' => '',
            self::PREFIX . 'PIERCE_TIME' => '',
            self::PREFIX . 'LEAD_IN_LENGTH' => '',
            self::PREFIX . 'OPERATING_COST_PER_MINUTE' => '',
        ];
    }

    public static function get(string $suffix, ?int $shopId = null, $default = null)
    {
        $shopId = $shopId ?? (int) Context::getContext()->shop->id;
        $shop = new Shop($shopId);
        $key = self::PREFIX . $suffix;

        return Configuration::get($key, null, (int) $shop->id_shop_group, $shopId, $default ?? (self::defaults()[$key] ?? ''));
    }

    /** Validate the entire submitted plasma panel before persisting any value. */
    public static function saveRequest(array $request): void
    {
        $submitted = array_intersect_key($request, self::defaults());
        if (!$submitted) {
            return;
        }
        $context = Context::getContext();
        if (!$context->employee || !$context->employee->id || !in_array((int) $context->employee->id_profile, [1, 2, 3, 4], true)) {
            throw new DomainException('U heeft geen toegang tot de plasmasnij-instellingen.');
        }
        $values = [];
        foreach (self::defaults() as $key => $default) {
            $raw = $request[$key] ?? self::get(substr($key, strlen(self::PREFIX)));
            if (!is_scalar($raw) && $raw !== null) {
                throw new DomainException('Ongeldige plasmasnij-instelling: ' . $key);
            }
            $values[$key] = trim((string) $raw);
        }
        $enabled = $values[self::PREFIX . 'ENABLED'];
        if (!in_array($enabled, ['0', '1'], true)) {
            throw new DomainException('Ongeldige activatiestatus voor plasmasnijden.');
        }
        foreach (['MATERIAL', 'WIDTH', 'HEIGHT', 'THICKNESS'] as $field) {
            $source = $values[self::PREFIX . $field . '_SOURCE'];
            if ($source !== '' && !preg_match('/^(feature|attribute):[1-9][0-9]*$/D', $source)) {
                throw new DomainException('Selecteer een geldig kenmerk of attribuut voor ' . strtolower($field) . '.');
            }
            if ($enabled === '1' && in_array($field, ['MATERIAL', 'THICKNESS'], true) && $source === '') {
                throw new DomainException('Koppel materiaal en plaatdikte voordat u plasmasnijden inschakelt.');
            }
        }
        $python = $values[self::PREFIX . 'PYTHON_BINARY'];
        if ($python !== '' && (strlen($python) > 500 || preg_match('/[\x00-\x1f]/', $python))) {
            throw new DomainException('Vul uitsluitend het pad naar het Python-programma in, zonder argumenten.');
        }
        if ($enabled === '1' && $python === '') {
            throw new DomainException('Stel eerst het Python-programma voor de tekeningenverwerking in.');
        }
        foreach (self::MACHINE_FIELDS as $field) {
            $key = self::PREFIX . strtoupper($field);
            if ($values[$key] !== '') {
                $values[$key] = (string) self::machineNumber($values[$key], $field);
            } elseif ($enabled === '1') {
                throw new DomainException('Vul alle gevalideerde machineparameters in voordat u plasmasnijden inschakelt.');
            }
        }
        $scope = Shop::getContext();
        $groupId = $scope === Shop::CONTEXT_ALL ? null : (int) $context->shop->id_shop_group;
        $shopId = $scope === Shop::CONTEXT_SHOP ? (int) $context->shop->id : null;
        foreach (array_keys($submitted) as $key) {
            if (!Configuration::updateValue($key, $values[$key], false, $groupId, $shopId)) {
                throw new DomainException('De plasmasnij-instellingen konden niet worden opgeslagen.');
            }
        }
    }

    public static function viewData(): array
    {
        $context = Context::getContext();
        $scope = Shop::getContext();
        $groupId = $scope === Shop::CONTEXT_ALL ? null : (int) $context->shop->id_shop_group;
        $shopId = $scope === Shop::CONTEXT_SHOP ? (int) $context->shop->id : null;
        $settings = [];
        foreach (self::defaults() as $key => $default) {
            $settings[$key] = Configuration::get($key, null, $groupId, $shopId, $default);
        }
        $sources = [];
        foreach (\Feature::getFeatures((int) $context->language->id) as $feature) {
            $sources[] = ['value' => 'feature:' . (int) $feature['id_feature'], 'label' => 'Kenmerk: ' . $feature['name']];
        }
        foreach (\AttributeGroup::getAttributesGroups((int) $context->language->id) as $group) {
            $sources[] = ['value' => 'attribute:' . (int) $group['id_attribute_group'], 'label' => 'Attribuutgroep: ' . $group['name']];
        }
        return [
            'plasma_settings' => $settings,
            'plasma_sources' => $sources,
            'plasma_library_url' => $context->link->getAdminLink('MsAdminPlasmaLibrary'),
        ];
    }

    public static function product(int $productId, int $shopId): array
    {
        $defaults = ['id_product' => $productId, 'id_shop' => $shopId, 'enabled' => 0];
        foreach (self::MACHINE_FIELDS as $field) {
            $defaults[$field] = null;
        }
        if ($productId < 1 || $shopId < 1 || Configuration::getGlobalValue(self::PREFIX . 'ENABLED') === false) {
            return $defaults;
        }
        $row = Db::getInstance()->getRow('SELECT * FROM `' . _DB_PREFIX_ . 'plasma_product` WHERE `id_product` = ' . $productId . ' AND `id_shop` = ' . $shopId);

        return array_merge($defaults, $row ?: []);
    }

    public static function resolveProduct(int $productId, int $combinationId, int $shopId, int $langId): array
    {
        $settings = self::product($productId, $shopId);
        $settings['enabled'] = (bool) $settings['enabled'] && (bool) self::get('ENABLED', $shopId);
        $settings['product_type'] = 'plasmacutting';
        $settings['stock_width_mm'] = self::STOCK_WIDTH_MM;
        $settings['stock_height_mm'] = self::STOCK_HEIGHT_MM;
        if (!$settings['enabled']) {
            return $settings;
        }
        if (!Db::getInstance()->getValue('SELECT `id_product` FROM `' . _DB_PREFIX_ . 'product_shop` WHERE `id_product` = ' . $productId . ' AND `id_shop` = ' . $shopId)) {
            throw new DomainException('Dit product is niet beschikbaar in deze winkel.');
        }
        if ($combinationId > 0 && !Db::getInstance()->getValue('SELECT pa.`id_product_attribute` FROM `' . _DB_PREFIX_ . 'product_attribute` pa INNER JOIN `' . _DB_PREFIX_ . 'product_attribute_shop` pas ON pas.`id_product_attribute` = pa.`id_product_attribute` WHERE pa.`id_product_attribute` = ' . $combinationId . ' AND pa.`id_product` = ' . $productId . ' AND pas.`id_shop` = ' . $shopId)) {
            throw new DomainException('Ongeldige productcombinatie voor plasmasnijden.');
        }
        $material = self::mappedValue('MATERIAL', $productId, $combinationId, $shopId, $langId);
        $materialKey = strtolower(trim($material));
        $materials = [
            'steel' => 'Steel', 'staal' => 'Steel',
            'aluminium' => 'Aluminium', 'aluminum' => 'Aluminium',
            'corten' => 'Corten', 'cortenstaal' => 'Corten',
            'zicor' => 'Zicor',
            'rvs' => 'RVS', 'stainless steel' => 'RVS', 'roestvast staal' => 'RVS', 'roestvrij staal' => 'RVS',
        ];
        if (!isset($materials[$materialKey])) {
            throw new DomainException('Het materiaal is niet ingesteld als Steel, Aluminium, Corten, Zicor of RVS.');
        }
        $settings['material'] = $materials[$materialKey];
        $settings['thickness'] = self::dimension(self::mappedValue('THICKNESS', $productId, $combinationId, $shopId, $langId));
        foreach (['WIDTH' => self::STOCK_WIDTH_MM, 'HEIGHT' => self::STOCK_HEIGHT_MM] as $field => $expected) {
            if (self::get($field . '_SOURCE', $shopId) !== '') {
                $actual = self::dimension(self::mappedValue($field, $productId, $combinationId, $shopId, $langId));
                if (abs($actual - $expected) > 0.001) {
                    throw new DomainException('Plasmasnijden vereist een volledige voorraadplaat van 1000 x 500 mm.');
                }
            }
        }
        foreach (self::MACHINE_FIELDS as $field) {
            $value = $settings[$field] ?? self::get(strtoupper($field), $shopId);
            if ($value === '') {
                throw new DomainException('De machineparameters voor deze plaat zijn nog niet ingesteld.');
            }
            $settings[$field] = self::machineNumber($value, $field);
        }

        return $settings;
    }

    public static function machineNumber($value, string $field): float
    {
        if (!is_scalar($value) || !is_numeric(str_replace(',', '.', (string) $value))) {
            throw new DomainException('Ongeldige machineparameter: ' . $field . '.');
        }
        $number = (float) str_replace(',', '.', (string) $value);
        $positive = in_array($field, ['feed_rate', 'operating_cost_per_minute'], true);
        if (!is_finite($number) || $number < 0 || ($positive && $number <= 0) || $number > 1000000) {
            throw new DomainException('Machineparameter ' . $field . ' moet ' . ($positive ? 'groter dan nul' : 'nul of positief') . ' zijn (maximaal 1000000).');
        }

        return $number;
    }

    private static function dimension(string $value): float
    {
        if (!preg_match('/^\s*([0-9]+(?:[.,][0-9]+)?)\s*(mm)?\s*$/iuD', $value, $match)) {
            throw new DomainException('Plaatmaten en dikte moeten in millimeters zijn ingevuld.');
        }
        $number = (float) str_replace(',', '.', $match[1]);
        if (!is_finite($number) || $number <= 0) {
            throw new DomainException('Plaatmaten en dikte moeten groter dan nul zijn.');
        }

        return $number;
    }

    private static function mappedValue(string $field, int $productId, int $combinationId, int $shopId, int $langId): string
    {
        $source = (string) self::get($field . '_SOURCE', $shopId);
        if (!preg_match('/^(feature|attribute):([1-9][0-9]*)$/D', $source, $match)) {
            throw new DomainException('Ontbrekende productkoppeling voor ' . strtolower($field) . '.');
        }
        $id = (int) $match[2];
        if ($match[1] === 'feature') {
            $sql = 'SELECT DISTINCT fvl.`value` FROM `' . _DB_PREFIX_ . 'feature_product` fp INNER JOIN `' . _DB_PREFIX_ . 'feature_value_lang` fvl ON fvl.`id_feature_value` = fp.`id_feature_value` AND fvl.`id_lang` = ' . $langId . ' WHERE fp.`id_product` = ' . $productId . ' AND fp.`id_feature` = ' . $id;
        } else {
            if ($combinationId < 1) {
                throw new DomainException('Selecteer eerst een materiaal- en diktecombinatie.');
            }
            $sql = 'SELECT DISTINCT al.`name` AS value FROM `' . _DB_PREFIX_ . 'product_attribute_combination` pac INNER JOIN `' . _DB_PREFIX_ . 'attribute` a ON a.`id_attribute` = pac.`id_attribute` INNER JOIN `' . _DB_PREFIX_ . 'attribute_lang` al ON al.`id_attribute` = a.`id_attribute` AND al.`id_lang` = ' . $langId . ' WHERE pac.`id_product_attribute` = ' . $combinationId . ' AND a.`id_attribute_group` = ' . $id;
        }
        $rows = Db::getInstance()->executeS($sql);
        if (!is_array($rows) || count($rows) !== 1 || trim((string) $rows[0]['value']) === '') {
            throw new DomainException('Vul precies een productwaarde in voor ' . strtolower($field) . '.');
        }

        return trim((string) $rows[0]['value']);
    }
}

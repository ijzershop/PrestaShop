<?php

declare(strict_types=1);

namespace MsThemeConfig\Plasma;

use Context;
use Db;
use DomainException;
use Shop;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Validator\Constraints\GreaterThan;
use Symfony\Component\Validator\Constraints\GreaterThanOrEqual;
use Symfony\Component\Validator\Constraints\LessThanOrEqual;

/** Adds module metadata beside the existing Saw/Cut fields in Product > Details. */
final class PlasmaProductForm
{
    public static function build(array $params): void
    {
        if (\Configuration::getGlobalValue(PlasmaSettings::PREFIX . 'ENABLED') === false) {
            return;
        }
        $builder = $params['form_builder'] ?? null;
        if (!$builder || !$builder->has('details') || !$builder->get('details')->has('references')) {
            return;
        }
        $references = $builder->get('details')->get('references');
        $settings = PlasmaSettings::product((int) ($params['id'] ?? 0), (int) Context::getContext()->shop->id);
        $disabled = Shop::getContext() !== Shop::CONTEXT_SHOP;
        $references->add('plasma_enabled', ChoiceType::class, [
            'label' => 'Plasmasnijden (plasmacutting)',
            'choices' => ['Uitgeschakeld' => 0, 'Ingeschakeld' => 1],
            'data' => (int) $settings['enabled'],
            'disabled' => $disabled,
            'help' => $disabled
                ? 'Selecteer een afzonderlijke winkel om plasmasnijden in te stellen.'
                : 'Gebruik dit product als volledige voorraadplaat van 1000 x 500 mm. De klant ontvangt de plaat met alle uitsneden en restmateriaal.',
        ]);
        $labels = [
            'feed_rate' => 'Plasma: snijsnelheid (mm/min)',
            'pierce_time' => 'Plasma: doorsteektijd (seconden)',
            'lead_in_length' => 'Plasma: aanlooplengte (mm)',
            'operating_cost_per_minute' => 'Plasma: machinekosten per minuut (excl. btw, standaardvaluta)',
        ];
        foreach ($labels as $field => $label) {
            $positive = in_array($field, ['feed_rate', 'operating_cost_per_minute'], true);
            $references->add('plasma_' . $field, NumberType::class, [
                'label' => $label,
                'required' => false,
                'disabled' => $disabled,
                'html5' => true,
                'scale' => 4,
                'data' => $settings[$field] === null ? null : (float) $settings[$field],
                'help' => 'Leeg laten om de globale instelling te gebruiken. Stel de machineparameters af op dit materiaal en deze plaatdikte.',
                'attr' => ['min' => $positive ? '0.0001' : '0', 'max' => '1000000', 'step' => 'any'],
                'constraints' => [
                    $positive ? new GreaterThan(['value' => 0]) : new GreaterThanOrEqual(['value' => 0]),
                    new LessThanOrEqual(['value' => 1000000]),
                ],
            ]);
        }
    }

    public static function provideData(array $params): void
    {
        if (\Configuration::getGlobalValue(PlasmaSettings::PREFIX . 'ENABLED') === false || !isset($params['data']) || !is_array($params['data'])) {
            return;
        }
        $settings = PlasmaSettings::product((int) ($params['id'] ?? 0), (int) Context::getContext()->shop->id);
        $params['data']['details']['references']['plasma_enabled'] = (int) $settings['enabled'];
        foreach (PlasmaSettings::MACHINE_FIELDS as $field) {
            $params['data']['details']['references']['plasma_' . $field] = $settings[$field] === null ? null : (float) $settings[$field];
        }
    }

    public static function save(array $params): void
    {
        if (\Configuration::getGlobalValue(PlasmaSettings::PREFIX . 'ENABLED') === false) {
            return;
        }
        $productId = (int) ($params['id'] ?? $params['id_product'] ?? 0);
        $data = $params['form_data']['details']['references'] ?? [];
        if ($productId < 1 || !is_array($data) || !array_key_exists('plasma_enabled', $data)) {
            return;
        }
        if (Shop::getContext() !== Shop::CONTEXT_SHOP) {
            // Disabled form fields are still present in Symfony's normalized data.
            return;
        }
        $shopId = (int) Context::getContext()->shop->id;
        if (!in_array($data['plasma_enabled'], [0, 1, '0', '1'], true)) {
            throw new DomainException('Ongeldige instelling voor plasmasnijden.');
        }
        $row = ['id_product' => $productId, 'id_shop' => $shopId, 'enabled' => (int) $data['plasma_enabled']];
        foreach (PlasmaSettings::MACHINE_FIELDS as $field) {
            $value = $data['plasma_' . $field] ?? null;
            $row[$field] = $value === null || $value === '' ? null : PlasmaSettings::machineNumber($value, $field);
        }
        if (!Db::getInstance()->insert('plasma_product', $row, true, true, Db::ON_DUPLICATE_KEY)) {
            throw new DomainException('De plasmasnij-instellingen voor dit product konden niet worden opgeslagen.');
        }
    }
}

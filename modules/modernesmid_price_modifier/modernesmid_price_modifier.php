<?php
if (!defined('_PS_VERSION_')) {
    exit;
}

use ModernesmidPriceModifier\Controller\Admin\AdminPriceModifierController;
use PrestaShop\PrestaShop\Adapter\Entity\Module;

require_once __DIR__ . '/vendor/autoload.php';

/**
 *
 */
class ModernesmidPriceModifier extends Module
{
    public function __construct()
    {
        $this->name = 'modernesmid_price_modifier';
        $this->author = 'JB Stoker';
        $this->need_instance = 1;
        $this->ps_versions_compliancy = ['min' => '1.7.7', 'max' => '1.7.8'];
        $this->description = $this->l('Create Tabs in Symfony Controller and manage its Permissions');
        $this->displayName = $this->l('Moderne Smid Product Price Modifier');
        $this->version = '1.0.0';

        $tab_names = [];
        foreach (Language::getLanguages(true) as $language) {
            $tab_names[$language['locale']] = $this->trans('Price Modifier', [], 'Modules.ModernesmidPriceModifier.Admin', $language['locale']);
        }
        $this->tabs = [
            [
                'route_name' => 'price_modifier_index',
                'class_name' => "AdminPriceModifierController",
                'visible' => true,
                'name' => $tab_names,
                'icon' => 'sale',
                'parent_class_name' => 'SELL',
                'wording' => 'Price Modifier', // Translation key
                'wording_domain' => 'Modules.ModernesmidPriceModifier.Admin', // Translation domain
            ]
        ];
        parent::__construct();
    }

    /**
     * Insert module into datable.
     */
    public function install(): bool
    {
        return parent::install();
    }
}

<?php
/**
 * Price Modifier
 * Copyright since 2021 JB Stoker and Contributors
 * <JB Stoker> Property
 *

 * @author    JB Stoker
 * @copyright Since 2021 JB Stoker
 * @license   https://opensource.org/licenses/MIT
 */
declare(strict_types=1);

use Modernesmid\Module\Pricemodifier\Database\PriceModifierInstaller;
use PrestaShop\PrestaShop\Adapter\SymfonyContainer;

if (!defined('_PS_VERSION_')) {
    exit;
}

if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
}

/**
 *
 */
class Pricemodifier extends Module
{
    /**
     * Constructor.
     *
     * @param null $name Module unique name
     * @param Context|null $context
     */
    public function __construct($name = null, Context $context = null)
    {
        $this->name = 'pricemodifier';
        $this->tab = 'administrator';
        $this->version = '1.0.0';
        $this->author = 'JB Stoker';
        $this->need_instance = 0;

        parent::__construct($name, $context);

        $this->displayName = $this->getTranslator()->trans(
            'Price Modifier',
            [],
            'Modules.Pricemodifier.Admin'
        );

        $this->description =
            $this->getTranslator()->trans(
                'Price Modifier',
                [],
                'Modules.Pricemodifier.Admin'
            );

        $this->ps_versions_compliancy = [
            'min' => '1.7.7.0',
            'max' => _PS_VERSION_,
        ];
    }

    /**
     * This function is required in order to make module compatible with new translation system.
     *
     * @return bool
     */
    public function isUsingNewTranslationSystem()
    {
        return true;
    }


    /**
     * Install module and register hooks to allow grid modification.
     *
     * @see https://devdocs.prestashop.com/1.7/modules/concepts/hooks/use-hooks-on-modern-pages/
     *
     * @return bool
     */
    public function install()
    {

        return $this->installTables() && parent::install() &&
            $this->installTab()
            ;
    }

    /**
     * Uninstall module and detach hooks
     *
     * @return bool
     */
    public function uninstall()
    {
        return $this->removeTables() && parent::uninstall() &&
            $this->uninstallTab()
            ;
    }

    /**
     * enable
     *
     * @param bool $force_all
     *
     * @return bool
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function enable($force_all = false)
    {
        return parent::enable($force_all)
            && $this->installTab()
            ;
    }

    /**
     * disable
     *
     * @param bool $force_all
     *
     * @return bool
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function disable($force_all = false)
    {
        return parent::disable($force_all)
            && $this->uninstallTab()
            ;
    }

    /**
     * @return bool
     */
    private function installTables()
    {
        /** @var PriceModifierInstaller $installer */
        $installer = $this->getInstaller();
        $errors = $installer->createTables();

        return empty($errors);
    }

    /**
     * @return bool
     */
    private function removeTables()
    {
        /** @var PriceModifierInstaller $installer */
        $installer = $this->getInstaller();
        $errors = $installer->dropTables();

        return empty($errors);
    }

    /**
     * @return PriceModifierInstaller
     */
    private function getInstaller()
    {
        try {
            $installer = $this->get('prestashop.module.pricemodifier.price_modification.install');
        } catch (Exception $e) {
            // Catch exception in case container is not available, or service is not available
            $installer = null;
        }

        // During install process the module's service is not available yet, so we build it manually
        if (!$installer) {
            $installer = new PriceModifierInstaller(
                $this->get('doctrine.dbal.default_connection'),
                $this->getContainer()->getParameter('database_prefix')
            );
        }

        return $installer;
    }

    /**
     * install Tab
     *
     * @return bool
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function installTab()
    {
        // Main
        $MainTabId = (int) SymfonyContainer::getInstance()->get('prestashop.core.admin.tab.repository')->findOneIdByClassName('AdminPricemodifier');
        if (!$MainTabId) {
            $MainTabId = null;
        }

        $MainTab = new Tab($MainTabId);
        $MainTab->active = true;
        $MainTab->class_name = 'AdminPricemodifier';
        $MainTab->name = [];
        $MainTab->icon = 'style';
        foreach (Language::getLanguages(true) as $lang) {
            $MainTab->name[$lang['id_lang']] = 'Moderne Smid Price Modifier';
        }
        $MainTab->id_parent = (int) SymfonyContainer::getInstance()->get('prestashop.core.admin.tab.repository')->findOneIdByClassName('SELL');
        $MainTab->module = $this->name;
        $MainTab->save();

        // Sub for "PriceModification"
        $PriceModificationTabId = (int) SymfonyContainer::getInstance()->get('prestashop.core.admin.tab.repository')->findOneIdByClassName('AdminPricemodifierPriceModification');
        if (!$PriceModificationTabId) {
            $PriceModificationTab = null;
        }

        $PriceModificationTab = new Tab($PriceModificationTabId);
        $PriceModificationTab->active = true;
        $PriceModificationTab->class_name = 'AdminPricemodifierPriceModification';
        $PriceModificationTab->name = [];
        $PriceModificationTab->icon = 'style';
        foreach (Language::getLanguages(true) as $lang) {
            $PriceModificationTab->name[$lang['id_lang']] = 'Price Modification';
        }
        $PriceModificationTab->id_parent = $MainTab->id;
        $PriceModificationTab->module = $this->name;
        $PriceModificationTab->save();

        return true;
    }

    /**
     * uninstall Tab
     *
     * @return bool
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function uninstallTab()
    {
        // Main
        $MainTabId = (int) SymfonyContainer::getInstance()->get('prestashop.core.admin.tab.repository')->findOneIdByClassName('AdminPricemodifier');
        if ($MainTabId) {
            $Maintab = new Tab($MainTabId);
            $Maintab->delete();
        }

        $PriceModificationTabId = (int) SymfonyContainer::getInstance()->get('prestashop.core.admin.tab.repository')->findOneIdByClassName('PriceModificationsController');
        if (!$PriceModificationTabId) {
            return true;
        }
        $PriceModificationTab = new Tab($PriceModificationTabId);
        $PriceModificationTab->delete();

        return true;
    }
}

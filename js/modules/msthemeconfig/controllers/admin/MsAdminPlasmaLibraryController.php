<?php

use MsThemeConfig\Plasma\PlasmaService;

if (!defined('_PS_VERSION_')) {
    exit;
}

/** Employee-only template intake and authorized order manufacturing downloads. */
class MsAdminPlasmaLibraryController extends ModuleAdminController
{
    public function __construct()
    {
        $this->bootstrap = true;
        parent::__construct();
        $this->meta_title = $this->trans('Plasma parts library', [], 'Modules.Msthemeconfig.Admin');
    }

    public function setMedia($isNewTheme = false)
    {
        parent::setMedia($isNewTheme);
        $this->addJS($this->module->getPathUri() . 'views/js/admin/plasma-library.js');
    }

    public function viewAccess($disable = false)
    {
        if (Tools::getValue('plasma_action') === 'order_asset') {
            return $this->canViewOrders();
        }

        return parent::viewAccess($disable);
    }

    public function postProcess()
    {
        $action = (string) Tools::getValue('plasma_action', '');
        if ($action === '') {
            return parent::postProcess();
        }
        try {
            if (!$this->context->employee || !Validate::isLoadedObject($this->context->employee)) {
                throw new DomainException('Log in als medewerker om deze actie uit te voeren.');
            }
            $token = Tools::getValue('token', '');
            if (!is_string($token) || !hash_equals(Tools::getAdminTokenLite('MsAdminPlasmaLibrary'), $token)) {
                throw new DomainException('De beveiligingstoken is verlopen. Herlaad de pagina.');
            }
            if ($action === 'order_asset') {
                $this->downloadOrderAsset();
                return;
            }
            if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
                throw new DomainException('Deze actie vereist een formulierverzending.');
            }
            if (!$this->viewAccess() || Shop::getContext() !== Shop::CONTEXT_SHOP) {
                throw new DomainException('Selecteer een afzonderlijke winkel waarvoor u bibliotheektoegang heeft.');
            }
            if ($action === 'import') {
                if (!$this->access('add')) {
                    throw new DomainException('U heeft geen rechten om onderdelen toe te voegen.');
                }
                $name = trim((string) Tools::getValue('display_name', ''));
                $category = trim((string) Tools::getValue('category', 'General'));
                if ($name === '' || Tools::strlen($name) > 255 || !Validate::isGenericName($name)) {
                    throw new DomainException('Vul een geldige onderdeelnaam in (maximaal 255 tekens).');
                }
                if (!in_array($category, $this->categories(), true)) {
                    throw new DomainException('Selecteer een geldige onderdelencategorie.');
                }
                $upload = $_FILES['cutfile'] ?? [];
                if (!is_array($upload)) {
                    throw new DomainException('Selecteer een DXF- of SVG-tekening.');
                }
                (new PlasmaService())->importLibrary($upload, $name, $category);
                $message = 'Onderdeel gecontroleerd en toegevoegd aan de bibliotheek.';
            } elseif ($action === 'deactivate') {
                if (!$this->access('edit')) {
                    throw new DomainException('U heeft geen rechten om onderdelen te wijzigen.');
                }
                $id = (int) Tools::getValue('id_cutfile');
                if ($id < 1 || !Db::getInstance()->update('plasma_cutfile_library', ['active' => 0], '`id_cutfile` = ' . $id . ' AND `id_shop` = ' . (int) $this->context->shop->id)) {
                    throw new DomainException('Het onderdeel kon niet worden gedeactiveerd.');
                }
                $message = 'Onderdeel gedeactiveerd. Bestaande bestellingen behouden hun productiebestand.';
            } else {
                throw new DomainException('Onbekende bibliotheekactie.');
            }
            if (Tools::getValue('plasma_ajax') === '1') {
                $this->respondJson(['success' => true, 'message' => $message]);
            }
            $this->confirmations[] = $message;
        } catch (Throwable $error) {
            $message = $error instanceof DomainException ? $error->getMessage() : 'De tekening kon niet worden verwerkt. Controleer het bestand en de parserinstellingen.';
            if (!$error instanceof DomainException) {
                PrestaShopLogger::addLog('Plasma library: ' . $error->getMessage(), 3);
            }
            if (Tools::getValue('plasma_ajax') === '1') {
                http_response_code(400);
                $this->respondJson(['success' => false, 'message' => $message]);
            }
            if ($action === 'order_asset') {
                http_response_code(403);
            }
            $this->errors[] = $message;
        }
    }

    public function initContent()
    {
        parent::initContent();
        if (!$this->viewAccess()) {
            return;
        }
        $search = Tools::substr(trim((string) Tools::getValue('plasma_search', '')), 0, 100);
        $shopId = (int) $this->context->shop->id;
        $sql = 'SELECT `id_cutfile`, `display_name`, `category`, `raw_geometry_length_mm`, `total_pierces`, `part_width_mm`, `part_height_mm`, `date_add`, `active` FROM `' . _DB_PREFIX_ . 'plasma_cutfile_library` WHERE `id_shop` = ' . $shopId;
        if ($search !== '') {
            $sql .= " AND (`display_name` LIKE '%" . pSQL($search) . "%' OR `category` LIKE '%" . pSQL($search) . "%')";
        }
        $sql .= ' ORDER BY `active` DESC, `display_name` ASC LIMIT 200';
        $this->context->smarty->assign([
            'plasma_library_parts' => Db::getInstance()->executeS($sql) ?: [],
            'plasma_library_categories' => $this->categories(),
            'plasma_library_url' => $this->context->link->getAdminLink('MsAdminPlasmaLibrary'),
            'plasma_library_token' => Tools::getAdminTokenLite('MsAdminPlasmaLibrary'),
            'plasma_library_can_add' => $this->access('add') && Shop::getContext() === Shop::CONTEXT_SHOP,
            'plasma_library_can_edit' => $this->access('edit') && Shop::getContext() === Shop::CONTEXT_SHOP,
            'plasma_library_single_shop' => Shop::getContext() === Shop::CONTEXT_SHOP,
            'plasma_library_search' => $search,
        ]);
        $this->content .= $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'msthemeconfig/views/templates/admin/plasma_library.tpl');
        $this->context->smarty->assign('content', $this->content);
    }

    private function categories(): array
    {
        $categories = ['General', 'Beugels', 'Flenzen', 'Vervangingsonderdelen'];
        $rows = Db::getInstance()->executeS('SELECT DISTINCT `category` FROM `' . _DB_PREFIX_ . 'plasma_cutfile_library` WHERE `id_shop` = ' . (int) $this->context->shop->id . ' ORDER BY `category` LIMIT 200');
        foreach ($rows ?: [] as $row) {
            if (trim((string) $row['category']) !== '') {
                $categories[] = (string) $row['category'];
            }
        }

        return array_values(array_unique($categories));
    }

    private function canViewOrders(): bool
    {
        $employee = $this->context->employee;

        return $employee && Validate::isLoadedObject($employee)
            && ($employee->isSuperAdmin() || Access::isGranted('ROLE_MOD_TAB_ADMINORDERS_READ', (int) $employee->id_profile));
    }

    private function downloadOrderAsset(): void
    {
        if (!$this->canViewOrders()) {
            throw new DomainException('U heeft geen toegang tot deze bestelling.');
        }
        $orderId = (int) Tools::getValue('id_order');
        $customizationId = (int) Tools::getValue('id_customization');
        $type = (string) Tools::getValue('type', 'dxf');
        if ($orderId < 1 || $customizationId < 1 || !in_array($type, ['dxf', 'svg'], true)) {
            throw new DomainException('Ongeldig productiebestand.');
        }
        $order = new Order($orderId);
        $allowedShops = array_map('intval', $this->context->employee->getAssociatedShops());
        if (!Validate::isLoadedObject($order) || !in_array((int) $order->id_shop, $allowedShops, true)
            || (Shop::getContext() === Shop::CONTEXT_SHOP && (int) $order->id_shop !== (int) $this->context->shop->id)) {
            throw new DomainException('Deze bestelling valt buiten uw winkeltoegang.');
        }
        $asset = (new PlasmaService())->orderAsset($orderId, $customizationId, $type);
        if (!isset($asset['path']) || !is_file($asset['path']) || !is_readable($asset['path'])) {
            throw new DomainException('Het productiebestand is niet beschikbaar.');
        }
        $filename = 'plasma-order-' . $orderId . '-' . $customizationId . '.' . $type;
        header('Content-Type: ' . ($type === 'svg' ? 'image/svg+xml' : 'application/dxf'));
        header('Content-Disposition: ' . ($type === 'svg' ? 'inline' : 'attachment') . '; filename="' . $filename . '"');
        header('Content-Length: ' . filesize($asset['path']));
        header('X-Content-Type-Options: nosniff');
        header("Content-Security-Policy: default-src 'none'; sandbox");
        header('Cache-Control: private, no-store');
        readfile($asset['path']);
        exit;
    }

    private function respondJson(array $payload): void
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        die(json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR));
    }
}

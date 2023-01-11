<?php
declare(strict_types=1);

namespace MsThemeConfig\Class;

use PrestaShop\PrestaShop\Adapter\Entity\Carrier;
use PrestaShop\PrestaShop\Adapter\Entity\Category;
use PrestaShop\PrestaShop\Adapter\Entity\CMS;
use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Db;
use PrestaShop\PrestaShop\Adapter\Entity\Feature;
use PrestaShop\PrestaShop\Adapter\Entity\Group;
use PrestaShop\PrestaShop\Adapter\Entity\ModuleAdminController;
use PrestaShop\PrestaShop\Adapter\Entity\OrderState;
use PrestaShop\PrestaShop\Adapter\Entity\PrestaShopDatabaseException;
use PrestaShop\PrestaShop\Adapter\Entity\PrestaShopException;
use PrestaShop\PrestaShop\Adapter\Entity\Profile;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use PrestaShop\PrestaShop\Adapter\SymfonyContainer;
use Symfony\Component\HttpFoundation\Request;

/**
 *
 */
class ModernConfigurator
{
    private ?int $idShop;
    private ?int $idShopGroup;
    private int $idLang;
    private string $prefix;
    private $context;
    private $module;

    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws \PrestaShopException
     */
    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
        $this->idShop = $this->context->shop->id;
        $this->idShopGroup = $this->context->shop->getGroup()->id;
        $this->idLang = $this->context->language->id;
        $this->prefix = 'MsThemeConfig_';
    }

    /**
     * Get access list of panel of employee
     *
     * Profiles within prestashop
     *
     *  1 	Ontwikkelaar
     *	2 	Kantoor medewerker
     *	3 	Werkplaats medewerker
     *	4 	Administrator
     *	5 	Winkel Medewerker
     *	6 	Inpakbaan 1
     *	7 	Inpakbaan 2
     *	8 	Inpakbaan 3
     *
     * @param $profile
     * @return array
     */
    public function getAccessiblePanelsUser($profile): array
    {
        $accessiblePanels = [];
        switch ($profile){
            case '1':
                $accessiblePanels = ['home', 'pages', 'alert', 'main', 'user', 'dev', 'email', 'mail-theme', 'footer', 'kiyoh', 'koopman', 'offer', 'services'];
                break;
            case '2':
                $accessiblePanels = ['home', 'pages', 'alert', 'email','mail-theme', 'footer', 'kiyoh', 'koopman'];
                break;
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
                    $accessiblePanels = ['alert'];
                break;
        }
        return $accessiblePanels;
    }


    /**
     * @param array $viewData
     * @return string
     */
    public function getConfigPage(array $viewData=[]): string
    {
        $container = SymfonyContainer::getInstance()->get('twig');
        return $container->render("@Modules/msthemeconfig/views/templates/admin/configure.html.twig",
            $viewData
        , $this->context);
    }
}

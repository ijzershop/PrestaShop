<?php

declare(strict_types=1);

namespace MsThemeConfig\Class;

use Module;
use PrestaShop\PrestaShop\Adapter\Entity\PrestaShopDatabaseException;
use PrestaShop\PrestaShop\Adapter\Entity\PrestaShopException;
use PrestaShop\PrestaShop\Adapter\LegacyContext;
use Twig\Environment as TwigEnvironment;

class ModernConfigurator
{
    private ?int $idShop;
    private ?int $idShopGroup;
    private int $idLang;
    private string $prefix;
    private $context;
    private $module;
    private ?TwigEnvironment $twig;

    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws \PrestaShopException
     */
    public function __construct(LegacyContext $legacyContext, TwigEnvironment $twig = null)
    {
        $this->context = $legacyContext->getContext();
        $this->module = Module::getInstanceByName('msthemeconfig');
        $this->twig = $twig;
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
     *
     * @return array
     */
    public function getAccessiblePanelsUser($profile): array
    {
        $accessiblePanels = [];
        switch ((int) $profile) {
            case 1:
            case 2:
            case 3:
            case 4:
                $accessiblePanels = [
                    'home', 'pages', 'alert', 'main', 'user', 'counter-checkout',
                    'dev', 'email', 'mail-theme', 'footer',
                    'kiyoh', 'koopman', 'sawcut', 'plasma', 'ssa', 'offer', 'services',
                    'backup', 'vat', 'sell', 'ai',
                ];
                break;
            case 5:
            case 6:
            case 7:
            case 8:
                $accessiblePanels = ['alert'];
                break;
        }

        return $accessiblePanels;
    }

    /**
     * Get configuration value for templates (multistore-aware)
     */
    private function getConfigForView($key, $default = '')
    {
        return \Configuration::get($key, $this->idLang, $this->idShopGroup, $this->idShop, $default);
    }

    /**
     * @param array $viewData
     *
     * @return string
     */
    public function getConfigPage(array $viewData = []): string
    {
        // Add admin header logo to view data
        $viewData['MSTHEMECONFIG_ADMIN_HEADER_LOGO'] = $this->getConfigForView('MSTHEMECONFIG_ADMIN_HEADER_LOGO', '');

        return $this->twig->render('@Modules/msthemeconfig/views/templates/admin/configure.html.twig', $viewData);
    }

    /**
     * Render any template with injected Twig without accessing the container.
     */
    public function render(string $template, array $data = []): string
    {
        return $this->twig->render($template, $data);
    }
}

<?php
declare(strict_types=1);

namespace MsThemeConfig\Controller\Admin;

use PrestaShop\PrestaShop\Adapter\Entity\Carrier;
use PrestaShop\PrestaShop\Adapter\Entity\Category;
use PrestaShop\PrestaShop\Adapter\Entity\CMS;
use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Db;
use PrestaShop\PrestaShop\Adapter\Entity\Feature;
use PrestaShop\PrestaShop\Adapter\Entity\Group;
use PrestaShop\PrestaShop\Adapter\Entity\OrderState;
use PrestaShop\PrestaShop\Adapter\Entity\Profile;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use PrestaShop\PrestaShop\Adapter\SymfonyContainer;
use PrestaShopDatabaseException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
/**
 *
 */
class ModernAjax
{
    private ?int $idShop;
    private ?int $idShopGroup;
    private int $idLang;
    private string $prefix;
    private $context;

    public function __construct()
    {
        $this->context = Context::getContext();
        $this->idShop = $this->context->shop->id;
        $this->idShopGroup = $this->context->shop->getGroup()->id;
        $this->idLang = $this->context->language->id;
        $this->prefix = 'MSTHEMECONFIG_';
    }
    /**
     *
     * Get the default url for select2 calls from the module config page
     *
     * @return string
     *
     */
    public function getSelect2Url(): string
    {
        return $this->context->link->getAdminLink('AdminModules', true, ['route' => 'modernesmid_config_get_select2_data', 'data_type' => ' '], ['method' => 'GET']);
    }
    /**
     *
     * Get the default url for ajax calls from the module config page
     *
     * @return string
     *
     */
    public function getAjaxUrl(): string
    {
        return $this->context->link->getAdminLink('AdminModules', true, ['route' => 'admin_configuration_get_panel', 'panel_name' => ''], ['method' => 'GET']);
    }
    /**
     * Get access list of panel of employee to show only needed configuration panels
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
                $accessiblePanels = ['home', 'pages', 'alert', 'config', 'config', 'dev', 'email', 'footer', 'kiyoh', 'koopman', 'services'];
                break;
            case '2':
                $accessiblePanels = ['home', 'pages', 'alert', 'email', 'footer', 'kiyoh', 'koopman'];
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
     * @param $panel_name
     * @param Request $request
     * @return Response
     */
    public function getPanel($panel_name, Request $request): Response
    {
        if (empty($panel_name)) {
            $panel_name = 'home';
        }

        try {
            $panelData = $this->fetchData($panel_name);
            $container = SymfonyContainer::getInstance()->get('twig');
            return Response::create($container->render(
                '@Modules/MsThemeConfig/views/templates/admin/panels/panel-' . $panel_name . '.html.twig',
                $panelData)
            );
        } catch (\PrestaShopException) {
            return Response::create("");
        }
    }
    /**
     * Fetch the configuration data from the database per panel
     *
     * @param string $panel_name
     * @return array
     * @throws PrestaShopDatabaseException
     */
    private function fetchData(string $panel_name = 'home'): array
    {
        $dataArray = [];
        //Fetch and build configuration data of panel
        switch ($panel_name) {
            //Start Home
            case 'home':
                $dataArray[$this->prefix . 'TOKEN'] = Configuration::get($this->prefix . 'TOKEN', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'FAVICON_SHOP'] = Configuration::get($this->prefix . 'FAVICON_SHOP', $this->idLang, $this->idShopGroup, $this->idShop, 'IJ');
                break;
            //Start Alert
            case 'pages':
                //Header
                $dataArray[$this->prefix . 'SHOW_MENU_ICON'] = Configuration::get($this->prefix . 'SHOW_MENU_ICON', $this->idLang, $this->idShopGroup, $this->idShop, 1);
                $dataArray[$this->prefix . 'HEADER_WHATSAPP_TEXT'] = Configuration::get($this->prefix . 'HEADER_WHATSAPP_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '0636 58 58 00');
                $dataArray[$this->prefix . 'HEADER_WHATSAPP_LINK'] = Configuration::get($this->prefix . 'HEADER_WHATSAPP_LINK', $this->idLang, $this->idShopGroup, $this->idShop, 'https://api.whatsapp.com/send?phone=31636585800');
                $dataArray[$this->prefix . 'HEADER_PHONENUMBER_TEXT'] = Configuration::get($this->prefix . 'HEADER_PHONENUMBER_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '0900-2502500');
                $dataArray[$this->prefix . 'HEADER_PHONENUMBER_LINK'] = Configuration::get($this->prefix . 'HEADER_PHONENUMBER_LINK', $this->idLang, $this->idShopGroup, $this->idShop, 'tel://0900-2502500');
                $dataArray[$this->prefix . 'HEADER_MAIL_TEXT'] = Configuration::get($this->prefix . 'HEADER_MAIL_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, 'Mail');
                $dataArray[$this->prefix . 'HEADER_MAIL_LINK'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'HEADER_MAIL_LINK', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'pages');
                $dataArray[$this->prefix . 'OFFER_LINK'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'OFFER_LINK', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'pages');
                $dataArray[$this->prefix . 'PRIMARY_COLOR'] = Configuration::get($this->prefix . 'PRIMARY_COLOR', $this->idLang, $this->idShopGroup, $this->idShop, '#3b56ad');
                //Homepage variables
                $dataArray[$this->prefix . 'HOMEPAGE_CATEGORIES'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'HOMEPAGE_SELECTED_CATEGORIES', $this->idLang, $this->idShopGroup, $this->idShop, []), 'categories_home');
                $dataArray[$this->prefix . 'HOMEPAGE_TEXT'] = Configuration::get($this->prefix . 'HOMEPAGE_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'HOMEPAGE_BACKGROUND_COLOR'] = Configuration::get($this->prefix . 'HOMEPAGE_BACKGROUND_COLOR', $this->idLang, $this->idShopGroup, $this->idShop, '#efefef');
                //Category variables
                $dataArray[$this->prefix . 'CATEGORY_SHOW_PRODUCT_PAGE'] = (int)Configuration::get($this->prefix . 'CATEGORY_SHOW_PRODUCT_PAGE', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'CATEGORY_BOTTOM_TEXT'] = Configuration::get($this->prefix . 'CATEGORY_BOTTOM_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'CATEGORY_IMAGE_SIZE'] = Configuration::get($this->prefix . 'CATEGORY_IMAGE_SIZE', $this->idLang, $this->idShopGroup, $this->idShop, 'col-sm-4 col-md-2');
                //Product page
                $dataArray[$this->prefix . 'SHOW_PRODUCT_FEATURES'] = Configuration::get('SHOW_PRODUCT_FEATURES', $this->idLang, $this->idShopGroup, $this->idShop, 'category');
                $dataArray[$this->prefix . 'FEATURE_ENABLED'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'FEATURE_ENABLED', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'features');
                $dataArray[$this->prefix . 'FEATURE_LENGTH'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'FEATURE_LENGTH', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'features');
                $dataArray[$this->prefix . 'FEATURE_WIDTH'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'FEATURE_WIDTH', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'features');
                $dataArray[$this->prefix . 'FEATURE_HEIGHT'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'FEATURE_HEIGHT', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'features');
                $dataArray[$this->prefix . 'FEATURE_WEIGHT'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'FEATURE_WEIGHT', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'features');
                $dataArray[$this->prefix . 'FEATURE_MATERIAL'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'FEATURE_MATERIAL', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'features');
                $dataArray[$this->prefix . 'FEATURE_COLOR'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'FEATURE_COLOR', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'features');
                //Contact page
                $dataArray[$this->prefix . 'CONTACTPAGE_CONSTRUCTION'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'CONTACTPAGE_CONSTRUCTION', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'pages');
                $dataArray[$this->prefix . 'CONTACTPAGE_FAQ'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'CONTACTPAGE_FAQ', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'pages');
                $dataArray[$this->prefix . 'CONTACTPAGE_PRIVACY'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'CONTACTPAGE_PRIVACY', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'pages');

                $dataArray[$this->prefix . 'CONTACTPAGE_CONTACTINFORMATION_PAGE'] = Configuration::get($this->prefix . 'CONTACTPAGE_CONTACTINFORMATION_PAGE', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'CONTACTPAGE_CONTACTINFORMATION_TEXT'] = Configuration::get($this->prefix . 'CONTACTPAGE_CONTACTINFORMATION_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'CONTACTPAGE_CONTACTOFFER_PAGE'] = Configuration::get($this->prefix . 'CONTACTPAGE_CONTACTOFFER_PAGE', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'CONTACTPAGE_CONTACTOFFER_TEXT'] = Configuration::get($this->prefix . 'CONTACTPAGE_CONTACTOFFER_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');

                //cookie
                $dataArray[$this->prefix . 'AVG_INFO_PAGE'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'AVG_INFO_PAGE', $this->idLang, $this->idShopGroup, $this->idShop, 52), 'pages');
                break;
            //Start Alert
            case 'alert':
                //Notifications
                $dataArray[$this->prefix . 'SHOP_NOTIFICATION_PAGES'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'SHOP_NOTIFICATION_PAGES', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'notification_pages');
                $dataArray[$this->prefix . 'SHOP_NOTIFICATION_TYPE'] = Configuration::get($this->prefix . 'SHOP_NOTIFICATION_TYPE', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'SHOP_NOTIFICATION_TEXT'] = Configuration::get($this->prefix . 'SHOP_NOTIFICATION_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                break;
            case 'email':
                // Emails
                $dataArray[$this->prefix . 'EMAIL_FOOTER_TEXT'] = Configuration::get($this->prefix . 'EMAIL_FOOTER_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'EMAIL_FOOTER_TEXT_TXT'] = Configuration::get($this->prefix . 'EMAIL_FOOTER_TEXT_TXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'ORDERSTATE_SENDMAIL_JSON'] = Configuration::get($this->prefix . 'ORDERSTATE_SENDMAIL_JSON', $this->idLang, $this->idShopGroup, $this->idShop, '');

                $dataArray[$this->prefix . 'ORDERSTATE_SENDMAIL'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'ORDERSTATE_SENDMAIL', $this->idLang, $this->idShopGroup, $this->idShop, 52), 'order_states');

                $dataArray[$this->prefix . 'MY_ACCOUNT_LANDING_TEXT'] = Configuration::get($this->prefix . 'MY_ACCOUNT_LANDING_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                break;
            //Start Alert
            case 'services':
                //Google maps
                $dataArray[$this->prefix . 'MAPS_KEY'] = Configuration::get($this->prefix . 'MAPS_KEY', $this->idLang, $this->idShopGroup, $this->idShop, '');
                //Clarity
                $dataArray[$this->prefix . 'CLARITY_ID'] = Configuration::get($this->prefix . 'CLARITY_ID', $this->idLang, $this->idShopGroup, $this->idShop, '7bu3k08a1u');
                //TawkTo
                $dataArray[$this->prefix . 'TAWKTO_WIDGET_ID'] = Configuration::get($this->prefix . 'TAWKTO_WIDGET_ID', $this->idLang, $this->idShopGroup, $this->idShop, '1gb4md3r7');
                //Trello
                $dataArray[$this->prefix . 'TRELLO_URL'] = Configuration::get($this->prefix . 'TRELLO_URL', $this->idLang, $this->idShopGroup, $this->idShop, 'https://api.trello.com');
                $dataArray[$this->prefix . 'TRELLO_SECRET'] = Configuration::get($this->prefix . 'TRELLO_SECRET', $this->idLang, $this->idShopGroup, $this->idShop, '38fb659a1379d6cb0aa5e9ab2a41e8e4');
                $dataArray[$this->prefix . 'TRELLO_TOKEN'] = Configuration::get($this->prefix . 'TRELLO_TOKEN', $this->idLang, $this->idShopGroup, $this->idShop, 'fc910c51fa24c3fa5f6935409454b317bd70c9eac213b8bfeddef23b7e1c66d4');
                //Dashboard Api
                $dataArray[$this->prefix . 'DASHBOARD_API_URL'] = Configuration::get($this->prefix . 'DASHBOARD_API_URL', $this->idLang, $this->idShopGroup, $this->idShop, 52);
                $dataArray[$this->prefix . 'DASHBOARD_API_USER'] = Configuration::get($this->prefix . 'DASHBOARD_API_USER', $this->idLang, $this->idShopGroup, $this->idShop, 52);
                $dataArray[$this->prefix . 'DASHBOARD_API_PASS'] = Configuration::get($this->prefix . 'DASHBOARD_API_PASS', $this->idLang, $this->idShopGroup, $this->idShop, 52);
                //Channable
                $dataArray[$this->prefix . 'CHANNABLE_CATEGORIES'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'CHANNABLE_SELECTED_CATEGORIES', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'categories_home');
                break;
            //Start Footer
            case 'footer':
                //Start Certainties banner

                $dataArray[$this->prefix . 'FIRST_BOX_ACTIVE'] = (int)Configuration::get($this->prefix . 'FIRST_BOX_ACTIVE', $this->idLang, $this->idShopGroup, $this->idShop, 1);
                $dataArray[$this->prefix . 'BANNER_FIRST_TEXT'] = Configuration::get($this->prefix . 'BANNER_FIRST_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'BANNER_FIRST_TITLE'] = Configuration::get($this->prefix . 'BANNER_FIRST_TITLE', $this->idLang, $this->idShopGroup, $this->idShop, '');


                $dataArray[$this->prefix . 'BANNER_FIRST_LINK'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'BANNER_FIRST_LINK', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'pages');

                $dataArray[$this->prefix . 'SECOND_BOX_ACTIVE'] = (int)Configuration::get($this->prefix . 'SECOND_BOX_ACTIVE', $this->idLang, $this->idShopGroup, $this->idShop, true);
                $dataArray[$this->prefix . 'BANNER_SECOND_TEXT'] = Configuration::get($this->prefix . 'BANNER_SECOND_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'BANNER_SECOND_TITLE'] = Configuration::get($this->prefix . 'BANNER_SECOND_TITLE', $this->idLang, $this->idShopGroup, $this->idShop, '');

                $dataArray[$this->prefix . 'BANNER_SECOND_LINK'] = Configuration::get($this->prefix . 'BANNER_SECOND_LINK', $this->idLang, $this->idShopGroup, $this->idShop, '');

                $dataArray[$this->prefix . 'THIRD_BOX_ACTIVE'] = (int)Configuration::get($this->prefix . 'THIRD_BOX_ACTIVE', $this->idLang, $this->idShopGroup, $this->idShop, true);
                $dataArray[$this->prefix . 'BANNER_THIRD_TEXT'] = Configuration::get($this->prefix . 'BANNER_THIRD_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'BANNER_THIRD_TITLE'] = Configuration::get($this->prefix . 'BANNER_THIRD_TITLE', $this->idLang, $this->idShopGroup, $this->idShop, '');

                $dataArray[$this->prefix . 'BANNER_THIRD_LINK'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'BANNER_THIRD_LINK', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'pages');

                $dataArray[$this->prefix . 'FOURTH_BOX_ACTIVE'] = (int)Configuration::get($this->prefix . 'FOURTH_BOX_ACTIVE', $this->idLang, $this->idShopGroup, $this->idShop, true);
                $dataArray[$this->prefix . 'BANNER_FOURTH_TEXT'] = Configuration::get($this->prefix . 'BANNER_FOURTH_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'BANNER_FOURTH_TITLE'] = Configuration::get($this->prefix . 'BANNER_FOURTH_TITLE', $this->idLang, $this->idShopGroup, $this->idShop, '');

                $dataArray[$this->prefix . 'BANNER_FOURTH_LINK'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'BANNER_FOURTH_LINK', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'pages');

                $dataArray[$this->prefix . 'FIFTH_BOX_ACTIVE'] = (int)Configuration::get($this->prefix . 'FIFTH_BOX_ACTIVE', $this->idLang, $this->idShopGroup, $this->idShop, true);
                $dataArray[$this->prefix . 'BANNER_FIFTH_TEXT'] = Configuration::get($this->prefix . 'BANNER_FIFTH_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'BANNER_FIFTH_TITLE'] = Configuration::get($this->prefix . 'BANNER_FIFTH_TITLE', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'BANNER_FIFTH_LINK'] = Configuration::get($this->prefix . 'BANNER_FIFTH_LINK', $this->idLang, $this->idShopGroup, $this->idShop, '');

                $img1 = Configuration::get($this->prefix . 'BANNER_FIRST_IMAGE', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'BANNER_FIRST_IMAGE'] = $img1 ? '../upload/' . $img1 : '';

                $img2 = Configuration::get($this->prefix . 'BANNER_SECOND_IMAGE', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'BANNER_SECOND_IMAGE'] = $img2 ? '../upload/' . $img2 : '';

                $img3 = Configuration::get($this->prefix . 'BANNER_THIRD_IMAGE', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'BANNER_THIRD_IMAGE'] = $img3 ? '../upload/' . $img3 : '';

                $img4 = Configuration::get($this->prefix . 'BANNER_FOURTH_IMAGE', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'BANNER_FOURTH_IMAGE'] = $img4 ? '../upload/' . $img4 : '';

                $img5 = Configuration::get($this->prefix . 'BANNER_FIFTH_IMAGE', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'BANNER_FIFTH_IMAGE'] = $img5 ? '../upload/' . $img5 : '';

                // Footer top settings
                $dataArray[$this->prefix . 'ABOUT_FOOTERTOP_BOX_ACTIVE'] = (int)Configuration::get($this->prefix . 'ABOUT_FOOTERTOP_BOX_ACTIVE', $this->idLang, $this->idShopGroup, $this->idShop, true);
                $dataArray[$this->prefix . 'FOOTERTOP_ABOUTUS_HEADER'] = Configuration::get($this->prefix . 'FOOTERTOP_ABOUTUS_HEADER', $this->idLang, $this->idShopGroup, $this->idShop, 'Over ons');
                $dataArray[$this->prefix . 'FOOTERTOP_ABOUTUS_TEXT'] = Configuration::get($this->prefix . 'FOOTERTOP_ABOUTUS_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, 'IJzershop.nl levert stalen, aluminium en roestvaste platen en profielen. Wij leveren in heel Nederland aan vakmensen en particulieren. De metalen profielen worden in lengtes van 2 meter geleverd maar kunnen ook op maat worden gezaagd of geknipt.<br/>Samen met de partner webshops van de IJzershop kunnen wij profiteren van een ijzersterk netwerk van leveranciers en expediteurs. De supportdesk van IJzershop.nl is elke werkdag bereikbaar van 7.30 tot 17.00 uur.');


                $dataArray[$this->prefix . 'FOOTERTOP_ABOUTUS_LINK'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'FOOTERTOP_ABOUTUS_LINK', $this->idLang, $this->idShopGroup, $this->idShop, null), 'pages');

                $dataArray[$this->prefix . 'INFORMATION_FOOTERTOP_BOX_ACTIVE'] = (int)Configuration::get($this->prefix . 'INFORMATION_FOOTERTOP_BOX_ACTIVE', $this->idLang, $this->idShopGroup, $this->idShop, true);
                $dataArray[$this->prefix . 'FOOTERTOP_INFORMATION_HEADER'] = Configuration::get($this->prefix . 'FOOTERTOP_INFORMATION_HEADER', $this->idLang, $this->idShopGroup, $this->idShop, null);
                $dataArray[$this->prefix . 'FOOTERTOP_INFORMATION'] = Configuration::get($this->prefix . 'FOOTERTOP_INFORMATION', $this->idLang, $this->idShopGroup, $this->idShop, null);

                $dataArray[$this->prefix . 'PARTNERS_FOOTERTOP_BOX_ACTIVE'] = (int)Configuration::get($this->prefix . 'PARTNERS_FOOTERTOP_BOX_ACTIVE', $this->idLang, $this->idShopGroup, $this->idShop, true);
                $dataArray[$this->prefix . 'FOOTERTOP_PARTNERS_HEADER'] = Configuration::get($this->prefix . 'FOOTERTOP_PARTNERS_HEADER', $this->idLang, $this->idShopGroup, $this->idShop, null);
                $dataArray[$this->prefix . 'FOOTERTOP_PARTNERS'] = Configuration::get($this->prefix . 'FOOTERTOP_PARTNERS', $this->idLang, $this->idShopGroup, $this->idShop, null);

                $dataArray[$this->prefix . 'STORE_INFORMATION_FOOTERTOP_BOX_ACTIVE'] = (int)Configuration::get($this->prefix . 'STORE_INFORMATION_FOOTERTOP_BOX_ACTIVE', $this->idLang, $this->idShopGroup, $this->idShop, true);
                $dataArray[$this->prefix . 'FOOTERTOP_STOREINFO_OPENED'] = Configuration::get($this->prefix . 'FOOTERTOP_STOREINFO_OPENED', $this->idLang, $this->idShopGroup, $this->idShop, '8.00 - 17.00 uur');
                $dataArray[$this->prefix . 'FOOTERTOP_STOREINFO_ADDRESS'] = Configuration::get($this->prefix . 'FOOTERTOP_STOREINFO_ADDRESS', $this->idLang, $this->idShopGroup, $this->idShop, 'Venusweg 15, 8938 bc Leeuwarden');
                $dataArray[$this->prefix . 'FOOTERTOP_STOREINFO_PHONE'] = Configuration::get($this->prefix . 'FOOTERTOP_STOREINFO_PHONE', $this->idLang, $this->idShopGroup, $this->idShop, '0900-2502500');
                $dataArray[$this->prefix . 'FOOTERTOP_STOREINFO_WHATSAPP'] = Configuration::get($this->prefix . 'FOOTERTOP_STOREINFO_WHATSAPP', $this->idLang, $this->idShopGroup, $this->idShop, '0636 58 58 00');
                $dataArray[$this->prefix . 'FOOTERTOP_STOREINFO_CONTACTPAGE'] = Configuration::get($this->prefix . 'FOOTERTOP_STOREINFO_CONTACTPAGE', $this->idLang, $this->idShopGroup, $this->idShop, null);


                $dataArray[$this->prefix . 'FOOTERTOP_STOREINFO_LINK'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'FOOTERTOP_STOREINFO_LINK', $this->idLang, $this->idShopGroup, $this->idShop, null), 'pages');

                $dataArray[$this->prefix . 'FOOTERTOP_STOREINFO_GOOGLE_STRING'] = Configuration::get($this->prefix . 'FOOTERTOP_STOREINFO_GOOGLE_STRING', $this->idLang, $this->idShopGroup, $this->idShop, 'Venusweg+15,+8938+BC+Leeuwarden,+Nederland/@53.1900453,5.8343069,14.84z/data=!4m5!3m4!1s0x47c8ff1ce41c9249:0x1c9b6585ccebc071!8m2!3d53.1917373!4d5.8470482?hl=nl-NL');

                //Footer bottom settings
                $dataArray[$this->prefix . 'FIRST_FOOTERBOTTOM_BOX_ACTIVE'] = (int)Configuration::get($this->prefix . 'FIRST_FOOTERBOTTOM_BOX_ACTIVE', $this->idLang, $this->idShopGroup, $this->idShop, true);
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIRST_TEXT'] = Configuration::get($this->prefix . 'FOOTERBOTTOM_FIRST_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIRST_TITLE'] = Configuration::get($this->prefix . 'FOOTERBOTTOM_FIRST_TITLE', $this->idLang, $this->idShopGroup, $this->idShop, '');

                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIRST_LINK'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'FOOTERBOTTOM_FIRST_LINK', $this->idLang, $this->idShopGroup, $this->idShop, null), 'pages');

                $dataArray[$this->prefix . 'SECOND_FOOTERBOTTOM_BOX_ACTIVE'] = (int)Configuration::get($this->prefix . 'SECOND_FOOTERBOTTOM_BOX_ACTIVE', $this->idLang, $this->idShopGroup, $this->idShop, true);
                $dataArray[$this->prefix . 'FOOTERBOTTOM_SECOND_TEXT'] = Configuration::get($this->prefix . 'FOOTERBOTTOM_SECOND_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_SECOND_TITLE'] = Configuration::get($this->prefix . 'FOOTERBOTTOM_SECOND_TITLE', $this->idLang, $this->idShopGroup, $this->idShop, '');

                $dataArray[$this->prefix . 'FOOTERBOTTOM_SECOND_LINK'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'FOOTERBOTTOM_SECOND_LINK', $this->idLang, $this->idShopGroup, $this->idShop, null), 'pages');

                $dataArray[$this->prefix . 'THIRD_FOOTERBOTTOM_BOX_ACTIVE'] = (int)Configuration::get($this->prefix . 'THIRD_FOOTERBOTTOM_BOX_ACTIVE', $this->idLang, $this->idShopGroup, $this->idShop, true);
                $dataArray[$this->prefix . 'FOOTERBOTTOM_THIRD_TEXT'] = Configuration::get($this->prefix . 'FOOTERBOTTOM_THIRD_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_THIRD_TITLE'] = Configuration::get($this->prefix . 'FOOTERBOTTOM_THIRD_TITLE', $this->idLang, $this->idShopGroup, $this->idShop, '');

                $dataArray[$this->prefix . 'FOOTERBOTTOM_THIRD_LINK'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'FOOTERBOTTOM_THIRD_LINK', $this->idLang, $this->idShopGroup, $this->idShop, null), 'pages');

                $dataArray[$this->prefix . 'FOURTH_FOOTERBOTTOM_BOX_ACTIVE'] = (int)Configuration::get($this->prefix . 'FOURTH_FOOTERBOTTOM_BOX_ACTIVE', $this->idLang, $this->idShopGroup, $this->idShop, true);
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FOURTH_TEXT'] = Configuration::get($this->prefix . 'FOOTERBOTTOM_FOURTH_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FOURTH_TITLE'] = Configuration::get($this->prefix . 'FOOTERBOTTOM_FOURTH_TITLE', $this->idLang, $this->idShopGroup, $this->idShop, '');

                $dataArray[$this->prefix . 'FOOTERBOTTOM_FOURTH_LINK'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'FOOTERBOTTOM_FOURTH_LINK', $this->idLang, $this->idShopGroup, $this->idShop, null), 'pages');

                $dataArray[$this->prefix . 'FIFTH_FOOTERBOTTOM_BOX_ACTIVE'] = (int)Configuration::get($this->prefix . 'FIFTH_FOOTERBOTTOM_BOX_ACTIVE', $this->idLang, $this->idShopGroup, $this->idShop, true);
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIFTH_TEXT'] = Configuration::get($this->prefix . 'FOOTERBOTTOM_FIFTH_TEXT', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIFTH_TITLE'] = Configuration::get($this->prefix . 'FOOTERBOTTOM_FIFTH_TITLE', $this->idLang, $this->idShopGroup, $this->idShop, '');

                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIFTH_LINK'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'FOOTERBOTTOM_FIFTH_LINK', $this->idLang, $this->idShopGroup, $this->idShop, null), 'pages');


                $imgf1 = Configuration::get($this->prefix . 'FOOTERBOTTOM_FIRST_IMAGE', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIRST_IMAGE'] = $imgf1 ? '../upload/' . $imgf1 : '';

                $imgf2 = Configuration::get($this->prefix . 'FOOTERBOTTOM_SECOND_IMAGE', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_SECOND_IMAGE'] = $imgf2 ? '../upload/' . $imgf2 : '';

                $imgf3 = Configuration::get($this->prefix . 'FOOTERBOTTOM_THIRD_IMAGE', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_THIRD_IMAGE'] = $imgf3 ? '../upload/' . $imgf3 : '';

                $imgf4 = Configuration::get($this->prefix . 'FOOTERBOTTOM_FOURTH_IMAGE', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FOURTH_IMAGE'] = $imgf4 ? '../upload/' . $imgf4 : '';

                $imgf5 = Configuration::get($this->prefix . 'FOOTERBOTTOM_FIFTH_IMAGE', $this->idLang, $this->idShopGroup, $this->idShop, '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIFTH_IMAGE'] = $imgf5 ? '../upload/' . $imgf5 : '';


                break;
            case 'config-main':
                //Custom Product
                $dataArray[$this->prefix . 'CUSTOM_PRODUCT_CATEGORY'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'CUSTOM_PRODUCT_CATEGORY', $this->idLang, $this->idShopGroup, $this->idShop, '1'), 'categories_home');
                $dataArray[$this->prefix . 'CUSTOM_PRODUCT_REFERENCE'] = Configuration::get($this->prefix . 'CUSTOM_PRODUCT_REFERENCE', $this->idLang, $this->idShopGroup, $this->idShop, '');

                //Order states
                $dataArray[$this->prefix . 'ORDERSTATE_PAID'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'ORDERSTATE_PAID', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'order_states');
                $dataArray[$this->prefix . 'ORDERSTATE_FREE_ORDER'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'ORDERSTATE_FREE_ORDER', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'order_states');

                //Carriers
                $dataArray[$this->prefix . 'SHIPPING_CARRIER'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'SHIPPING_CARRIER', $this->idLang, $this->idShopGroup, $this->idShop, '10'), 'carriers');
                $dataArray[$this->prefix . 'PICKUP_CARRIER'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'PICKUP_CARRIER', $this->idLang, $this->idShopGroup, $this->idShop, '7'), 'carriers');
                $dataArray[$this->prefix . 'ADD2ORDER_CARRIER'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'ADD2ORDER_CARRIER', $this->idLang, $this->idShopGroup, $this->idShop, '8'), 'carriers');
                break;
            case 'config-user':
                $dataArray[$this->prefix . 'EMPLOYEE_WORKSHOP_PROFILES'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'EMPLOYEE_WORKSHOP_PROFILES', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'profiles');
                $dataArray[$this->prefix . 'EMPLOYEE_SHOP_PROFILES'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'EMPLOYEE_SHOP_PROFILES', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'profiles');
                $dataArray[$this->prefix . 'EMPLOYEE_CUSTOMER_PROFILE'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'EMPLOYEE_CUSTOMER_PROFILE', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'profiles');
                $dataArray[$this->prefix . 'EMPLOYEE_CUSTOMER_BALIE_GROUP'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'EMPLOYEE_CUSTOMER_BALIE_GROUP', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'groups');
                $dataArray[$this->prefix . 'EMPLOYEE_CUSTOMER_CREDIT_GROUP'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'EMPLOYEE_CUSTOMER_CREDIT_GROUP', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'groups');
                $dataArray[$this->prefix . 'EMPLOYEE_CUSTOMER_VOUCHER_GROUP'] = $this->getSelect2SelectedOptions(Configuration::get($this->prefix . 'EMPLOYEE_CUSTOMER_VOUCHER_GROUP', $this->idLang, $this->idShopGroup, $this->idShop, ''), 'groups');
                $dataArray[$this->prefix . 'SHOW_ONCREDIT_CUSTOMER'] = (int)Configuration::get($this->prefix . 'SHOW_ONCREDIT_CUSTOMER', $this->idLang, $this->idShopGroup, $this->idShop, 0);
                break;
            case 'dev':
                $dataArray[$this->prefix . 'ORDERLIST_FILTER_TIME'] = Configuration::get($this->prefix . 'ORDERLIST_FILTER_TIME', $this->idLang, $this->idShopGroup, $this->idShop, '-4 weeks');
                $dataArray[$this->prefix . 'TEST_WEBSITES'] = Configuration::get($this->prefix . 'TEST_WEBSITES', $this->idLang, $this->idShopGroup, $this->idShop, '8');
                break;
            case 'kiyoh':
                $dataArray['IJZERSHOPKIYOH_LIVE_MODE'] =  Configuration::get('IJZERSHOPKIYOH_LIVE_MODE', $this->idLang, $this->idShopGroup, $this->idShop,  1);
                $dataArray['IJZERSHOPKIYOH_TOKEN'] =  Configuration::get('IJZERSHOPKIYOH_TOKEN', $this->idLang, $this->idShopGroup, $this->idShop,  'e1fk9hurmsnjxrv');
                $dataArray['IJZERSHOPKIYOH_TOTAL_PER_PAGE'] =  Configuration::get('IJZERSHOPKIYOH_TOTAL_PER_PAGE', $this->idLang, $this->idShopGroup, $this->idShop,  '10');
                $dataArray['IJZERSHOPKIYOH_UPDATE_INTERVAL'] =  Configuration::get('IJZERSHOPKIYOH_UPDATE_INTERVAL', $this->idLang, $this->idShopGroup, $this->idShop,  '24');
                $dataArray['IJZERSHOPKIYOH_REVIEW_PAGE'] =  $this->getSelect2SelectedOptions(Configuration::get('IJZERSHOPKIYOH_REVIEW_PAGE', $this->idLang, $this->idShopGroup, $this->idShop,  '49'),'pages');
                break;
        }
        return $dataArray;
    }
    /**
     *
     * Get the default option list for select2 inputs
     *
     * @throws PrestaShopDatabaseException
     */
    private function getSelect2SelectedOptions($options, $data_type): string
    {
        $selectedOptionList = [];
        $optionList = $this->getSelect2Data($data_type)->getContent();
        $selectedOptions = explode(',', $options);
        if ($optionList) {
            $data = json_decode($optionList);
            foreach ($data->results as $option) {
                if (in_array($option->id, $selectedOptions)) {
                    $selectedOptionList[] = '<option value="' . $option->id . '" selected>' . $option->text . '</option>';
                }

            }
        }

        return implode("", $selectedOptionList);
    }
    /**
     *
     * Ajax data for select2 inputs
     *
     * @param $data_type
     * @return JsonResponse
     * @throws PrestaShopDatabaseException
     */
    public function getSelect2Data($data_type): JsonResponse
    {
        $search = Tools::getValue('search');
        if (!$search) {
            $search = '';
        }

        if (empty($data_type)) {
            $data_type = 'pages';
        }

        if (empty($data_type)) {
            return JsonResponse::fromJsonString(json_encode([]));
        }

        switch ($data_type) {
            case 'pages':
                $pages = CMS::listCms($this->idLang);
                $pagesList = [];
                $pagesList['results'][] = ["id" => 0, "text" => "Geen pagina"];
                $pagesList = $this->pageLoop($pages, $pagesList, $search);

                return JsonResponse::fromJsonString(json_encode($this->sortSearchResult($pagesList)));
            case 'notification_pages':
                $pages = CMS::listCms($this->idLang);
                $pagesList = [];
                $pagesList['results'][] = ["id" => 0, "text" => "Geen pagina"];
                $pagesList['results'][] = ['id' => 'my-account', 'text' => 'Mijn account pagina\'s'];
                $pagesList['results'][] = ['id' => 'category', 'text' => 'Categorieen'];
                $pagesList['results'][] = ['id' => 'product', 'text' => 'Producten'];
                $pagesList['results'][] = ['id' => 'offer', 'text' => 'Offerte aanvragen'];
                $pagesList['results'][] = ['id' => 'information', 'text' => 'Informatie aanvragen'];
                $pagesList['results'][] = ['id' => 'home', 'text' => 'Home'];
                $pagesList['results'][] = ['id' => 'module-supercheckout-supercheckout', 'text' => 'Checkout pagina'];
                $pagesList['results'][] = ['id' => 'all', 'text' => 'Alle paginas'];

                $pagesList = $this->pageLoop($pages, $pagesList, $search);
                return JsonResponse::fromJsonString(json_encode($this->sortSearchResult($pagesList)));
            case 'features':
                $features = Feature::getFeatures($this->idLang);
                $featuresList = [];

                foreach ($features as $feature) {
                    $title = $feature['name'];
                    $id = $feature['id_feature'];
                    if (!empty($search)) {
                        if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                            continue;
                        }
                    }
                    $featuresList['results'][] = ['id' => $id, 'text' => $title];
                }
                return JsonResponse::fromJsonString(json_encode($this->sortSearchResult($featuresList)));
            case 'profiles':
                $profiles = Profile::getProfiles($this->idLang);
                $profilesList = [];

                foreach ($profiles as $profile) {
                    $title = $profile['name'];
                    $id = $profile['id_profile'];
                    if (!empty($search)) {
                        if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                            continue;
                        }
                    }
                    $profilesList['results'][] = ['id' => $id, 'text' => $title];
                }
                return JsonResponse::fromJsonString(json_encode($this->sortSearchResult($profilesList)));
            case 'order_states':
                $orderStates = OrderState::getOrderStates($this->idLang);
                $orderStatesList = [];

                foreach ($orderStates as $orderState) {
                    $title = $orderState['name'];
                    $id = $orderState['id_order_state'];
                    if (!empty($search)) {
                        if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                            continue;
                        }
                    }
                    $orderStatesList['results'][] = ['id' => $id, 'text' => $title];
                }
                return JsonResponse::fromJsonString(json_encode($this->sortSearchResult($orderStatesList)));
            case 'carriers':
                $carriers = Carrier::getCarriers($this->idLang, true);
                $carriersList = [];

                foreach ($carriers as $carrier) {
                    $title = $carrier['name'];
                    $id = $carrier['id_carrier'];
                    if (!empty($search)) {
                        if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                            continue;
                        }
                    }
                    $carriersList['results'][] = ['id' => $id, 'text' => $title];
                }
                return JsonResponse::fromJsonString(json_encode($this->sortSearchResult($carriersList)));
            case 'categories_home':
                $categories = Category::getSimpleCategoriesWithParentInfos($this->idLang);
                $categoriesList = [];
                $filteredCategories = [];
                foreach ($categories as $category) {
                    $id = $category['id_category'];

                    if (!is_null($id)) {
                        $parentCat = new Category($category['id_parent']);
                        $title = $parentCat->getName($this->idLang) . ' - ' . $category['name'];
                    } else {
                        $title = $category['name'];
                    }

                    if (!empty($search)) {
                        if (!preg_match('(' . $search . ')', $title)) {
                            continue;
                        }
                    }
                    $filteredCategories[] = ['id' => $id, 'text' => $title];
                }

                $categoriesList['results'] = $filteredCategories;

                return JsonResponse::fromJsonString(json_encode($this->sortSearchResult($categoriesList)));
            case 'customer':
                $customerList = [];
                $searchArray = explode(' ', $search);
                $likeList = '';
                if (is_array($searchArray)) {
                    foreach ($searchArray as $index => $searchValue) {
                        if ($index != 0) {
                            $likeList .= 'OR ';
                        }
                        $likeList .= "firstname LIKE '%" . $searchValue . "%' OR lastname LIKE '%" . $searchValue . "%' OR email LIKE '%" . $searchValue . "%' ";
                    }
                } else {
                    $likeList = "firstname LIKE '%" . $search . "%' OR lastname LIKE '%" . $search . "%' OR email LIKE '%" . $search . "%'";
                }

                $sql = "SELECT id_customer AS id, CONCAT(firstname, ' ', lastname,' - ', email) AS text FROM `" . _DB_PREFIX_ . "customer`";
                if (!empty($search)) {
                    $sql .= " WHERE " . $likeList . " AND";
                } else {
                    $sql .= " WHERE";
                }

                $sql .= " `active` = '1' ORDER BY `text` LIMIT 0,10";

                $customerList['results'] = Db::getInstance()->executeS($sql);

                return JsonResponse::fromJsonString(json_encode($customerList));
            case 'groups':
                $groups = Group::getGroups($this->idLang, $this->idShop);
                $groupsList = [];

                foreach ($groups as $group) {
                    $title = $group['name'];
                    $id = $group['id_group'];
                    if (!empty($search)) {
                        if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                            continue;
                        }
                    }
                    $groupsList['results'][] = ['id' => $id, 'text' => $title];
                }
                return JsonResponse::fromJsonString(json_encode($this->sortSearchResult($groupsList)));
        }
        return JsonResponse::fromJsonString(json_encode([]));
    }

    /**
     *
     * Loop through all pages and generate list for select2 box
     *
     * @param $pages
     * @param array $pagesList
     * @param string $search
     * @return array
     */
    private function pageLoop($pages, array $pagesList = [], string $search = ''): array
    {
        foreach ($pages as $page) {
            $title = $page['meta_title'];
            $id = $page['id_cms'];
            if (!empty($search)) {
                if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                    continue;
                }
            }
            $pagesList['results'][] = ['id' => $id, 'text' => $title];
        }
        return $pagesList;
    }
    /**
     * Sort the search result alphabetical
     *
     * @param $searchArray
     * @return array
     */
    private function sortSearchResult($searchArray): array
    {
        $tempArray = $searchArray['results'];
        $sortedArray = [];
        $textColumn = array_column($tempArray, 'text');
        if (array_multisort($textColumn, SORT_NATURAL | SORT_FLAG_CASE, $tempArray)) {
            $searchArray['results'] = $tempArray;
        }
        return $searchArray;
    }
}

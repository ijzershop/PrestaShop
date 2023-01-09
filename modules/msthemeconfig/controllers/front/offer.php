<?php



use MsThemeConfig\Class\Offer;
use PrestaShop\PrestaShop\Adapter\Entity\ModuleFrontController;
use PrestaShop\PrestaShop\Adapter\Entity\Product;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;


/**
 *
 */
class MsThemeConfigOfferModuleFrontController extends ModuleFrontController {

    private array $products = [];
    private	$date_exp = '';
    private	$date_exp_days = '';

    public function __construct(){
        parent::__construct();
    }

    public function postProcess() {
        $offer_id = null;

        if (Tools::getIsset('offer_code') && preg_match("/^[-0-9A-Za-z]+$/", Tools::getValue('offer_code'))) {
            $result = Offer::getOfferForCode(Tools::getValue('offer_code'));
            if ($result != null && count($result) == 1) {
                $offer_id = $result[0]['id_oi_offer'];
                $offer = Offer::getOfferByID($offer_id);
                $this->date_exp = $offer['date_exp'];

                $earlier = date_create_from_format('Y-m-d', date('Y-m-d'))->setTime(0,0,0,0);
                $later = date_create_from_format('Y-m-d H:i:s', $this->date_exp)->setTime(0,0,0,0);

                if($earlier < $later){
                    $this->date_exp_days = date_diff($later, $earlier)->format("%a");
                } else {
                    $this->date_exp_days = '-'.date_diff($earlier, $later)->format("%a");
                }
            }
        }
        if ($offer_id == null && Tools::getIsset('id_oi_offer') && is_numeric(Tools::getValue('id_oi_offer'))) {
            $offer_id = Tools::getValue('id_oi_offer');
        }

        if ($offer_id != null) {
            //get products for offer
            $this->products = Product::getOfferRows($offer_id, $this->context->language->id);
        }
        parent::postProcess();
    }

    /**
     * Sets controller CSS and JS files.
     *
     * @return void
     */
    public function setMedia($theme = null) {
        parent::setMedia();
        $this->context->controller->addCSS(_THEME_CSS_DIR_.'product_list.css', 'all');
        $this->context->controller->addJs(_THEME_JS_DIR_.'category.js');
        return;
    }

    /**
     * @throws PrestaShopException
     */
    public  function initContent()
    {
        parent::initContent();

        $this->context->smarty->assign([
            'products' =>  $this->products,
            'date_exp' =>  $this->date_exp,
            'date_exp_days' =>  $this->date_exp_days
        ]);

        $this->setTemplate('module:msthemeconfig/views/templates/front/offer.tpl');
    }



}

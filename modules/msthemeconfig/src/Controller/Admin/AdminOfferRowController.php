<?php
namespace MsThemeConfig\Controller\Admin;

use MsThemeConfig\Class\Offer;
use MsThemeConfig\Class\OIHelperList;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;

/**
 *
 */
class AdminOfferRowController extends FrameworkBundleAdminController {

	private $offer_id = null;
	private $oi_offer_extra_shipping = null;

	private $offer;

	protected $configuration = [];

	public function __construct()
	{

		$this->_setValues();

		$this->module = 'offerintegration';
		$this->name = 'offerrow';
		$this->table = 'product';
		$this->className = 'Product';
		$this->lang = false;

//		$this->deleted = true;
		$this->addRowAction('edit');
		$this->addRowAction('delete');

		$this->orderBy = 'date_add';
		$this->orderWay = 'DESC';
		$this->context = Context::getContext();
		$this->bootstrap = true;

		$this->bulk_actions = array(
			'delete' => array(
				'text' => Context::getContext()->getTranslator()->trans('Verwijder geselecteerde'),
				'confirm' => Context::getContext()->getTranslator()->trans('Verwijder de geselecteerde items?'),
				'icon' => 'icon-trash'
			)
		);

		$this->fields_form = array(
			'legend' => array(
				'title' => Context::getContext()->getTranslator()->trans('Wijzig Product')
			),
			'input' => array(
				'name' => array(
					'type' => 'text',
					'name' => 'name',
					'label' => Context::getContext()->getTranslator()->trans('Offerte titel'),
					'required' => true,
					'onclick' => null,
					'lang' => true
				),
				'description_short' => array(
					'type' => 'textarea',
					'name' => 'description_short',
					'label' => Context::getContext()->getTranslator()->trans('Offerte toelichting'),
					'required' => false,
					'autoload_rte' => true,
					'lang' => true
				),
				'price' => array(
					'type' => 'text',
					'name' => 'price',
					'label' => Context::getContext()->getTranslator()->trans('Prijs'),
					'required' => true,
					'prefix' => '&euro;',
					'class' => 'md',
					'hint' => Context::getContext()->getTranslator()->trans('Prijs exclusief BTW')
				),
                'quantity' => array(
                    'type' => 'text',
                    'name' => 'quantity',
                    'label' => Context::getContext()->getTranslator()->trans('Beschikbaar aantal'),
                    'required' => true
                ),
                'selected_products' => array(
                    'type' => 'text',
                    'id' => 'selected_products',
                    'name' => 'selected_products',
                    'label' => Context::getContext()->getTranslator()->trans('Gebruikte producten (t.b.v. vooraad)'),
                    'required' => false
                ),
                'linked_products' => array(
                    'type' => 'hidden',
                    'name' => 'linked_products',
                    'required' => false
                ),
				'weight' => array(
					'type' => 'hidden',
					'name' => 'weight',
					'label' => Context::getContext()->getTranslator()->trans('Gewicht'),
					'required' => false,
					'suffix' => 'kg'
				),
				'additionalweight' => array(
					'type'    => 'radio',
					'label'   => Context::getContext()->getTranslator()->trans('Extra gewicht'),
					'desc'    => Context::getContext()->getTranslator()->trans(''),
					'name'    => 'additionalweight',
					'is_bool' => true,
					'values'    => array(
						array(
							'id'    => 'active_off',
							'value' => 0,
							'label' => Context::getContext()->getTranslator()->trans('Nee')
						),
						array(
							'id'    => 'active_on',
							'value' => 1,
							'label' => Context::getContext()->getTranslator()->trans('Ja')
						)
					),
				),
				'oi_offer_extra_shipping' => array(
					'type'    => 'radio',
					'label'   => Context::getContext()->getTranslator()->trans('Extra verzendkosten'),
					'desc'    => Context::getContext()->getTranslator()->trans(''),
					'name'    => 'oi_offer_extra_shipping',
					'is_bool' => true,
					'values'    => array(
						array(
							'id'    => 'active_off',
							'value' => 0,
							'label' => Context::getContext()->getTranslator()->trans('Nee')
						),
						array(
							'id'    => 'active_on',
							'value' => 1,
							'label' => Context::getContext()->getTranslator()->trans('Ja')
						)
					),
				),
                'link_rewrite' => array(
					'type' => 'hidden',
					'name' => 'link_rewrite_' . $this->context->language->id,
					'label' => Context::getContext()->getTranslator()->trans('link_rewrite'),
					'required' => false
				),
				'id_oi_offer' => array(
					'type' => 'hidden',
					'name' => 'id_oi_offer',
					'label' => Context::getContext()->getTranslator()->trans('id offer'),
					'required' => false
				),
				'visibility' => array(
					'type' => 'hidden',
					'name' => 'visibility',
					'label' => Context::getContext()->getTranslator()->trans('visibility'),
					'required' => false
				),
				'id_category_default' => array(
					'type' => 'hidden',
					'name' => 'id_category_default',
					'label' => Context::getContext()->getTranslator()->trans('default category'),
					'required' => false
				)
			),
			'submit' => array(
				'title' => Context::getContext()->getTranslator()->trans('Opslaan'),
				'class' => 'btn btn-default pull-right'
			)
		);

		parent::__construct();
	}

	/**
	 * Create links on page header
	 */
	public function initPageHeaderToolbar()
	{
		if ($this->display == null || ($this->display != null && $this->display == 'list')) {
			//Link back to offer-list
			$this->page_header_toolbar_btn['offer_list'] = array(
				'href' => $this->context->link->getAdminLink('AdminOffer'),
				'desc' => Context::getContext()->getTranslator()->trans('Terug'),
				'icon' => 'process-icon-back'
			);
		}
		else if ($this->display == 'edit' || $this->display == 'add' || $this->display() == 'view') {
			//Link back to offer rows (products)
			$this->page_header_toolbar_btn['offer_list'] = array(
				'href' => $this->context->link->getAdminLink('AdminOfferRow').'&id_oi_offer='.$this->offer_id,
				'desc' => Context::getContext()->getTranslator()->trans('Terug'),
				'icon' => 'process-icon-back'
			);
		}
		if ($this->display != 'view' && $this->offer_id != null) {
			$this->page_header_toolbar_btn['new_product'] = array(
				'href' => $this->context->link->getAdminLink('AdminOfferRow').'&configure=offer&addproduct&id_oi_offer='.$this->offer_id,
				'desc' => Context::getContext()->getTranslator()->trans('Nieuw product'),
				'icon' => 'process-icon-new'
			);
		}
		if ($this->display == null || ($this->display != null && $this->display == 'list')) {
			$this->page_header_toolbar_btn['send_email'] = array(
				'href' => $this->context->link->getAdminLink('AdminOfferRow') . '&sendemail=true&id_oi_offer=' . $this->offer_id,
				'desc' => Context::getContext()->getTranslator()->trans('Verstuur offerte'),
				'icon' => 'process-icon-t icon-send'
			);
		}
		parent::initPageHeaderToolbar();
	}

	/**
	 *
	 */
	public function display(){
		if (Tools::getIsset('sendemail') && Tools::getIsset('id_oi_offer')) {
			$this->sendEmail(Tools::getValue('id_oi_offer'));
		}
		elseif (!Tools::getIsset('id_product') && !Tools::getIsset('id_oi_offer')) {
			Tools::redirectAdmin($this->context->link->getAdminLink('AdminOffer'));
		}


		parent::display();
	}

	public function renderList() {
		$fields_list = array(
			'name' => array(
				'title' => Context::getContext()->getTranslator()->trans('Naam'),
				'width' => 'auto',
				'type' => 'text',
				'search' => true
			),
			'description_short' => array(
				'title' => Context::getContext()->getTranslator()->trans('Omschrijving'),
				'width' => 'auto',
				'type' => 'text',
				'search' => true,
				'maxlength' => 40
			),
			'price' => array(
				'title' => Context::getContext()->getTranslator()->trans('Prijs'),
				'width' => 'auto',
				'type' => 'price',
				'search' => true
			),
            'quantity' => array(
                'title' => Context::getContext()->getTranslator()->trans('Beschikbaar aantal'),
                'width' => 'auto',
                'type' => 'quantity',
                'search' => true
            ),
            'weight' => array(
                'title' => Context::getContext()->getTranslator()->trans('Extra Gewicht'),
                'width' => 'auto',
                'type' => 'text',
                'search' => true
            ),
            'oi_offer_extra_shipping' => array(
                'title' => Context::getContext()->getTranslator()->trans('Extra Verzendkosten'),
                'width' => 'auto',
                'type' => 'bool',
                'search' => true
            )
		);

		$helper = new OIHelperList();

		if (isset($this->offer_id)) {
			$helper->setAdditionalLinkParameter('id_oi_offer', $this->offer_id);
		}

		$helper->shopLinkType = '';
		$helper->simple_header = true;
		$helper->table_id = 'product';
		$helper->table = 'product';
		$helper->actions = array('edit', 'delete');

		$helper->identifier = 'id_product';
		$helper->show_toolbar = true;
		$helper->title = Context::getContext()->getTranslator()->trans('Alle offerte producten');
		$helper->specificConfirmDelete = true;

		//Override template
		$helper->override_folder = '_configure/offerrow/';
		$helper->base_folder = 'helpers/list/';
		$helper->base_tpl = 'list.tpl';
		$helper->module = $this->module;
		$a = Offer::getOfferByID($this->offer_id);
		$this->offer = $a;

		$this->context->smarty->assign('offer', $this->offer);
		$this->context->smarty->assign('maillink', $this->context->link->getAdminLink('AdminOfferRow') . '&sendemail=true&id_oi_offer=' . $this->offer_id);

		$helper->token = Tools::getAdminTokenLite('AdminOfferRow');
		$helper->currentIndex = AdminController::$currentIndex.'&configure='.$this->name;

		$products = Product::getOfferRows($this->offer_id, $this->context->language->id);
		for ($i = 0; $i < count($products); $i++){
		    $products[$i]['quantity'] = StockAvailable::getQuantityAvailableByProduct($products[$i]['id_product'], null);
        }

		return $helper->generateList($products, $fields_list);
	}

	public function renderView() {
		return parent::renderView();
	}

	/**
	 * Render product form
	 * @return mixed
	 */
	public function renderForm() {

		if ($this->offer_id == null) {
			//TODO: Redirect to base
			Tools::redirectAdmin($this->context->link->getAdminLink('AdminOffer'));
		}

		if (!$this->default_form_language) {
			$this->getLanguages();
		}

		if (Tools::getValue('submitFormAjax')) {
			$this->content .= $this->context->smarty->fetch('form_submit_ajax.tpl');
		}

		if ($this->fields_form && is_array($this->fields_form)) {
			if (!$this->multiple_fieldsets) {
				$this->fields_form = array(array('form' => $this->fields_form));
			}

			// For add a fields via an override of $fields_form, use $fields_form_override
			if (is_array($this->fields_form_override) && !empty($this->fields_form_override)) {
				$this->fields_form[0]['form']['input'] = array_merge($this->fields_form[0]['form']['input'], $this->fields_form_override);
			}

			$fields_value = $this->getFieldsValue($this->object);

			if (!isset($fields_value['link_rewrite_' . $this->context->language->id]) || $fields_value['link_rewrite_' . $this->context->language->id] == false || empty($fields_value['link_rewrite_' . $this->context->language->id])) {
				$fields_value['link_rewrite_' . $this->context->language->id] = substr( "abcdefghijklmnopqrstuvwxyz" ,mt_rand( 0 ,25 ) ,1 ) .substr( md5( time( ) ) ,1 );
			}

			if ($this->offer_id != null && (!isset($fields_value['id_oi_offer']) || $fields_value['id_oi_offer'] == false)) {
				$fields_value['id_oi_offer'] = $this->offer_id;
			}

			if (!isset($fields_value['oi_offer_extra_shipping']) || $fields_value['oi_offer_extra_shipping'] == false) {
				$fields_value['oi_offer_extra_shipping'] = $this->oi_offer_extra_shipping;
			}

			$fields_value['visibility'] = 'none';
			$configuration = $this->getConfiguration();
			if (isset($configuration['id_category'])) {
				$fields_value['id_category_default'] = $configuration['id_category'];
			}

			$fields_value['carrier_list'] = $this->_getProductCarriers($this->object);


			if (empty($this->object->weight) || (int)$this->object->weight == $configuration['weight']) {
				$fields_value['additionalweight'] = '0';
			}

            if (!isset($fields_value['quantity']) || $fields_value['quantity'] == false) {
                $currentQuantity = StockAvailable::getQuantityAvailableByProduct($this->object->id, null);
                if($currentQuantity <=0){
                    $fields_value['quantity'] = 100;
                } else {
                    $fields_value['quantity'] = $currentQuantity;
                }
            }

			Hook::exec('action'.$this->controller_name.'FormModifier', array(
				'fields' => &$this->fields_form,
				'fields_value' => &$fields_value,
				'form_vars' => &$this->tpl_form_vars,
			));

			$helper = new HelperForm($this);
			$this->setHelperDisplay($helper);
			$helper->fields_value = $fields_value;

			$helper->submit_action = $this->submit_action;
			$helper->tpl_vars = $this->getTemplateFormVars();
			$helper->show_cancel_button = (isset($this->show_form_cancel_button)) ? $this->show_form_cancel_button : ($this->display == 'add' || $this->display == 'edit');

			$back = Tools::safeOutput(Tools::getValue('back', ''));
			if (empty($back)) {
				$back = self::$currentIndex.'&token='.$this->token;
			}
			if (!Validate::isCleanHtml($back)) {
				die(Tools::displayError());
			}

			$helper->back_url = $back;
			!is_null($this->base_tpl_form) ? $helper->base_tpl = $this->base_tpl_form : '';
			if ($this->tabAccess['view']) {
				if (Tools::getValue('back')) {
					$helper->tpl_vars['back'] = Tools::safeOutput(Tools::getValue('back'));
				} else {
					$helper->tpl_vars['back'] = Tools::safeOutput(Tools::getValue(self::$currentIndex.'&token='.$this->token));
				}
			}
			$form = $helper->generateForm($this->fields_form);

			return $form;
		}
		return parent::renderForm();
	}

	/**
	 * Process delete action
	 * @return mixed
	 */
	public function processDelete() {
		$res = parent::processDelete();

		if (isset($this->redirect_after) &&  $this->redirect_after != "" && $this->offer_id != null) {
			$this->redirect_after .= "&id_oi_offer=".$this->offer_id;
		}
		return $res;
	}
	public function processBulkDelete() {
		$res = parent::processBulkDelete();

		if (isset($this->redirect_after) &&  $this->redirect_after != "" && $this->offer_id != null) {
			$this->redirect_after .= "&id_oi_offer=".$this->offer_id;
		}
		return $res;
	}

	public function processSave()
	{
		$this->_setValuesForAllLanguages();
        $this->_setCurrencyValue();
        $this->_setAdditionalWeight();
        if ($this->id_object) {
            $this->object = $this->loadObject();
            return $this->processUpdate();
        } else {
            //Fix hidden returns string instead of integer
            $this->offer_id = (int)$this->offer_id;
            return $this->processAdd();
		}
	}



	public function sendEmail($id_oi_offer = null) {
		$offer = null;
		if ($id_oi_offer == null
			|| !is_numeric($id_oi_offer)
			|| ($offer = new Offer($id_oi_offer)) == null
			|| !ValidateCore::isEmail($offer->email)) {
			$this->displayWarning('Er is een fout opgetreden bij het verzenden van de email, is het emailadres correct?');
			return false;
		}

		$template = 'offernotification';
		$template_path = _PS_MODULE_DIR_ . 'offerintegration/mails/';
		$subject = sprintf(Context::getContext()->getTranslator()->trans('Offerte %s'), $offer->code);
		$bcc = ConfigurationCore::get('PS_SHOP_EMAIL');

		$vars = array(
			'{customer_name}' => $offer->name,
			'{message}' => $offer->message,
			'{offer_code}' => $offer->code,
			'{date_exp}' => date('d-m-Y H:m',strtotime($offer->date_exp)),
			'{url}' => $this->context->link->getModuleLink('offerintegration', 'offer', array('offer_code' => $offer->code))
		);

		if (Mail::Send($this->context->language->id, $template, $subject, $vars, $offer->email, $offer->name, null, null, null, null, $template_path, false, null, $bcc)) {
			$this->displayInformation('Offerte '. $offer->code . ' is verstuurd naar ' . $offer->email);
		}
		else {
			$this->displayWarning('Er is een fout opgetreden bij het verzenden van de email');
		}
		return true;
	}

}

<?php
if (!defined('_PS_VERSION_'))
{
    exit;
}
require_once _PS_MODULE_DIR_ . '/productcomments/ProductComment.php';
require_once _PS_MODULE_DIR_ . '/productcomments/ProductCommentCriterion.php';

class AdminReviewsController extends ModuleAdminController {

	public function __construct()
	{
		$this->module = 'productcomments';
		$this->name = 'reviews';
		$this->className = 'AdminReviews';
		$this->lang = false;
		$this->deleted = true;
		$this->orderBy = 'date_add';
		$this->orderWay = 'DESC';
		$this->context = Context::getContext();
		$this->bootstrap = true;

		parent::__construct();


	}

	public function initPageHeaderToolbar()
	{
		parent::initPageHeaderToolbar();
	}

	/**
	 *
	 */
	public function display(){
		parent::display();
	}

	public function renderList() {
		return $this->renderView();
	}

	public function renderView() {
        include_once _PS_MODULE_DIR_ . '/productcomments/ProductComment.php';
        include_once _PS_MODULE_DIR_ . '/productcomments/ProductCommentCriterion.php';

        $this->_html = '';
        if (Tools::isSubmit('updateproductcommentscriterion'))
        {
            $this->_html .= $this->renderCriterionForm((int)Tools::getValue('id_product_comment_criterion'));
        }
        else
        {
            $this->_postProcess();
            $this->_html .= $this->renderModerateLists();
            $this->_html .= $this->renderCriterionList();
            $this->_html .= $this->renderCommentsList();
        }

        $this->_setBaseUrl();
        $this->_productCommentsCriterionTypes = ProductCommentCriterion::getTypes();


		return parent::renderView().$this->_html;
	}

    protected function _postProcess()
    {
        $this->_setFilters();

        if (Tools::isSubmit('submitModerate'))
        {
            Configuration::updateValue('PRODUCT_COMMENTS_GDPRCMS', (int)Tools::getValue('PRODUCT_COMMENTS_GDPRCMS'));
            Configuration::updateValue('PRODUCT_COMMENTS_MODERATE', (int)Tools::getValue('PRODUCT_COMMENTS_MODERATE'));
            Configuration::updateValue('PRODUCT_COMMENTS_GDPR', (int)Tools::getValue('PRODUCT_COMMENTS_GDPR'));
            Configuration::updateValue('PRODUCT_COMMENTS_ALLOW_GUESTS', (int)Tools::getValue('PRODUCT_COMMENTS_ALLOW_GUESTS'));
            Configuration::updateValue('PRODUCT_COMMENTS_MINIMAL_TIME', (int)Tools::getValue('PRODUCT_COMMENTS_MINIMAL_TIME'));
            Configuration::updateValue('PRODUCT_COMMENTS_LIST', (int)Tools::getValue('PRODUCT_COMMENTS_LIST'));
            $this->_html .= '<div class="conf confirm alert alert-success">' . $this->l('Settings updated') . '</div>';
        }
        elseif (Tools::isSubmit('productcomments'))
        {
            $id_product_comment = (int)Tools::getValue('id_product_comment');
            $comment = new ProductComment($id_product_comment);
            $comment->validate();
            ProductComment::deleteReports($id_product_comment);
        }
        elseif (Tools::isSubmit('deleteproductcomments'))
        {
            $id_product_comment = (int)Tools::getValue('id_product_comment');
            $comment = new ProductComment($id_product_comment);
            $comment->delete();
        }
        elseif (Tools::isSubmit('submitEditCriterion'))
        {
            $criterion = new ProductCommentCriterion((int)Tools::getValue('id_product_comment_criterion'));
            $criterion->id_product_comment_criterion_type = Tools::getValue('id_product_comment_criterion_type');
            $criterion->active = Tools::getValue('active');

            $languages = Language::getLanguages();
            $name = array();
            foreach ($languages as $key => $value)
            {
                $name[$value['id_lang']] = Tools::getValue('name_' . $value['id_lang']);
            }
            $criterion->name = $name;

            $criterion->save();

            // Clear before reinserting data
            $criterion->deleteCategories();
            $criterion->deleteProducts();
            if ($criterion->id_product_comment_criterion_type == 2)
            {
                if ($categories = Tools::getValue('categoryBox'))
                {
                    if (count($categories))
                    {
                        foreach ($categories as $id_category)
                        {
                            $criterion->addCategory((int)$id_category);
                        }
                    }
                }
            }
            elseif ($criterion->id_product_comment_criterion_type == 3)
            {
                if ($products = Tools::getValue('ids_product'))
                {
                    if (count($products))
                    {
                        foreach ($products as $product)
                        {
                            $criterion->addProduct((int)$product);
                        }
                    }
                }
            }
            if ($criterion->save())
            {
                Tools::redirectAdmin(Context::getContext()->link->getAdminLink('AdminModules') . '&configure=' . $this->name . '&conf=4');
            }
            else
            {
                $this->_html .= '<div class="conf confirm alert alert-danger">' . $this->l('The criterion could not be saved') . '</div>';
            }
        }
        elseif (Tools::isSubmit('deleteproductcommentscriterion'))
        {
            $productCommentCriterion = new ProductCommentCriterion((int)Tools::getValue('id_product_comment_criterion'));
            if ($productCommentCriterion->id)
            {
                if ($productCommentCriterion->delete())
                {
                    $this->_html .= '<div class="conf confirm alert alert-success">' . $this->l('Criterion deleted') . '</div>';
                }
            }
        }
        elseif (Tools::isSubmit('statusproductcommentscriterion'))
        {
            $criterion = new ProductCommentCriterion((int)Tools::getValue('id_product_comment_criterion'));
            if ($criterion->id)
            {
                $criterion->active = (int)(!$criterion->active);
                $criterion->save();
            }
            Tools::redirectAdmin($this->context->link->getAdminLink('AdminModules') . '&configure=' . $this->name . '&tab_module=' . $this->tab . '&conf=4&module_name=' . $this->name);
        }
        elseif ($id_product_comment = (int)Tools::getValue('approveComment'))
        {
            $comment = new ProductComment($id_product_comment);
            $comment->validate();
        }
        elseif ($id_product_comment = (int)Tools::getValue('noabuseComment'))
        {
            ProductComment::deleteReports($id_product_comment);
        }

        // $this->_clearcache('productcomments_reviews.tpl');
    }

    private function _setFilters()
    {
        $this->_filters = array(
            'page' => (string)Tools::getValue('submitFilter' . $this->name),
            'pagination' => (string)Tools::getValue($this->name . '_pagination'),
            'filter_id' => (string)Tools::getValue($this->name . 'Filter_id_product_comment'),
            'filter_content' => (string)Tools::getValue($this->name . 'Filter_content'),
            'filter_customer_name' => (string)Tools::getValue($this->name . 'Filter_customer_name'),
            'filter_grade' => (string)Tools::getValue($this->name . 'Filter_grade'),
            'filter_name' => (string)Tools::getValue($this->name . 'Filter_name'),
            'filter_date_add' => (string)Tools::getValue($this->name . 'Filter_date_add'),
        );
    }


private function _setBaseUrl()
    {
        $this->_baseUrl = 'index.php?';
        foreach ($_GET as $k => $value)
        {
            if (!in_array($k, array(
                'deleteCriterion',
                'editCriterion'
            ))
            )
            {
                $this->_baseUrl .= $k . '=' . $value . '&';
            }
        }
        $this->_baseUrl = rtrim($this->_baseUrl, '&');
    }

        public function renderModerateLists()
    {
        $return = null;

        if (Configuration::get('PRODUCT_COMMENTS_MODERATE'))
        {
            $comments = ProductComment::getByValidate(0, false);

            $fields_list = $this->getStandardFieldList();

            if (version_compare(_PS_VERSION_, '1.6', '<'))
            {
                $return .= '<h1>' . $this->l('Reviews waiting for approval') . '</h1>';
                $actions = array(
                    'enable',
                    'delete'
                );
            }
            else
            {
                $actions = array(
                    'approve',
                    'delete'
                );
            }

            $helper = new HelperList();
            $helper->shopLinkType = '';
            $helper->simple_header = true;
            $helper->actions = $actions;
            $helper->show_toolbar = false;
            $helper->module = $this;
            $helper->listTotal = count($comments);
            $helper->identifier = 'id_product_comment';
            $helper->title = $this->l('Reviews waiting for approval');
            $helper->table = $this->name;
            $helper->token = Tools::getAdminTokenLite('AdminReviews');
            $helper->currentIndex = AdminController::$currentIndex . '&configure=' . $this->name;

            //$helper->tpl_vars = array('priority' => array($this->l('High'), $this->l('Medium'), $this->l('Low')));
            $return .= $helper->generateList($comments, $fields_list);
        }

        $comments = ProductComment::getReportedComments();

        $fields_list = $this->getStandardFieldList();
        if (version_compare(_PS_VERSION_, '1.6', '<'))
        {
            $return .= '<h1>' . $this->l('Reported Reviews') . '</h1>';
            $actions = array(
                'enable',
                'delete'
            );
        }
        else
        {
            $actions = array(
                'delete',
                'noabuse'
            );
        }

        $helper = new HelperList();
        $helper->shopLinkType = '';
        $helper->simple_header = true;
        $helper->actions = $actions;
        $helper->show_toolbar = false;
        $helper->module = $this;
        $helper->listTotal = count($comments);
        $helper->identifier = 'id_product_comment';
        $helper->title = $this->l('Reported Reviews');
        $helper->table = $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->currentIndex = AdminController::$currentIndex;
        //$helper->tpl_vars = array('priority' => array($this->l('High'), $this->l('Medium'), $this->l('Low')));


        if (version_compare(_PS_VERSION_, '1.6', '<'))

        $return .= $helper->generateList($comments, $fields_list);

        return $return;
    }

    public function renderCriterionList()
    {
        include_once _PS_MODULE_DIR_ . '/productcomments/ProductCommentCriterion.php';

        $criterions = ProductCommentCriterion::getCriterions($this->context->language->id, false, false);

        $fields_list = array(
            'id_product_comment_criterion' => array(
                'title' => $this->l('ID'),
                'type' => 'text',
            ),
            'name' => array(
                'title' => $this->l('Name'),
                'type' => 'text',
            ),
            'type_name' => array(
                'title' => $this->l('Type'),
                'type' => 'text',
            ),
            'active' => array(
                'title' => $this->l('Status'),
                'active' => 'status',
                'type' => 'bool',
            ),
        );

        $helper = new HelperList();
        $helper->shopLinkType = '';
        $helper->simple_header = false;
        $helper->actions = array(
            'edit',
            'delete'
        );
        $helper->show_toolbar = true;
        $helper->toolbar_btn['new'] = array(
            'href' => $this->context->link->getAdminLink('AdminModules') . '&configure=' . $this->name . '&module_name=' . $this->name . '&updateproductcommentscriterion',
            'desc' => $this->l('Add New Criterion', null, null, false),
        );
        $helper->module = $this;
        $helper->identifier = 'id_product_comment_criterion';
        $helper->title = $this->l('Review Criteria');
        $helper->table = $this->name . 'criterion';
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->currentIndex = AdminController::$currentIndex . '&configure=' . $this->name;
        //$helper->tpl_vars = array('priority' => array($this->l('High'), $this->l('Medium'), $this->l('Low')));

        return $helper->generateList($criterions, $fields_list);
    }

    public function renderCommentsList()
    {
        $comments = ProductComment::getByValidate(1, false);
        $moderate = Configuration::get('PRODUCT_COMMENTS_MODERATE');
        if (empty($moderate))
        {
            $comments = array_merge($comments, ProductComment::getByValidate(0, false));
        }

        $fields_list = $this->getStandardFieldList();

        $helper = new HelperList();
        $helper->shopLinkType = '';
        $helper->simple_header = true;
        $helper->actions = array('delete');
        $helper->show_toolbar = false;
        $helper->module = $this;
        $helper->listTotal = count($comments);
        $helper->identifier = 'id_product_comment';
        $helper->title = $this->l('Approved Reviews');
        $helper->table = $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->currentIndex = AdminController::$currentIndex . '&configure=' . $this->name;
        $helper->tpl_vars = array('priority' => array($this->l('High'), $this->l('Medium'), $this->l('Low')));

        return $helper->generateList($comments, $fields_list);
    }


        public function getStandardFieldList()
    {
        return array(
            'id_product_comment' => array(
                'title' => $this->l('ID'),
                'type' => 'text',
            ),
            'title' => array(
                'title' => $this->l('Review title'),
                'type' => 'text',
            ),
            'content' => array(
                'title' => $this->l('Review'),
                'type' => 'text',
            ),
            'grade' => array(
                'title' => $this->l('Rating'),
                'type' => 'text',
                'suffix' => '/5',
            ),
            'customer_name' => array(
                'title' => $this->l('Author'),
                'type' => 'text',
            ),
            'name' => array(
                'title' => $this->l('Product'),
                'type' => 'text',
            ),
            'date_add' => array(
                'title' => $this->l('Time of publication'),
                'type' => 'date',
            ),
        );
    }
    public function displayApproveLink($token, $id, $name = null)
    {
        $this->context->smarty->assign(array(
            'href' => $this->context->link->getAdminLink('AdminModules') . '&configure=' . $this->name . '&module_name=' . $this->name . '&approveComment=' . $id,
            'action' => $this->l('Approve'),
            'ps_version' => _PS_VERSION_,
            'timer_start' => microtime(true),
            'host_mode' => $this->context->smarty->getTemplateVars('host_mode'),
            'iso_is_fr' => $this->context->smarty->getTemplateVars('iso_is_fr'),
        ));

        return $this->display(__FILE__, 'views/templates/admin/list_action_approve.tpl');
    }

    public function displayNoabuseLink($token, $id, $name = null)
    {
        $this->context->smarty->assign(array(
            'href' => $this->context->link->getAdminLink('AdminModules') . '&configure=' . $this->name . '&module_name=' . $this->name . '&noabuseComment=' . $id,
            'action' => $this->l('Not abusive'),
            'ps_version' => _PS_VERSION_,
            'timer_start' => microtime(true),
            'host_mode' => $this->context->smarty->getTemplateVars('host_mode'),
            'iso_is_fr' => $this->context->smarty->getTemplateVars('iso_is_fr'),
        ));

        return $this->display(__FILE__, 'views/templates/admin/list_action_noabuse.tpl');
    }
}
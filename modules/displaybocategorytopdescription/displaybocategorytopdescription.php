<?php

/*
* This is a pretty complete, generic displaybocategorytopdescription module, which you can adapt in various ways
* It installs a back office tab, as well as a database table
*
*
*/
if (!defined('_PS_VERSION_'))
	exit;

class displayBoCategoryTopdescription extends Module
{

	protected $_errors = array();
	protected $_html = '';


	public function __construct()
	{
		$this->name = 'displaybocategorytopdescription';
		$this->tab = 'front_office_features';
		$this->version = '1.0';
		$this->author = 'Ijzershop';
		$this->need_instance = 0;
		
		$this->bootstrap = true;

	 	parent::__construct();

		$this->displayName = $this->l('Display BO Category top description');
		$this->description = $this->l('Displays an additional short description field in the category back office');
	}
	
	public function install()
	{
		if (!parent::install() OR
			!$this->alterTable() OR
			!$this->registerHook('displayBackOfficeCategory') OR
			!$this->registerHook('categoryAddition') OR
			!$this->registerHook('categoryUpdate')
			)
			return false;
		return true;
	}

	public function uninstall()
	{
		if (!parent::uninstall() OR
			!$this->alterTable('remove'))
			return false;
		return true;
	}

	public function alterTable($method = 'add')
	{
		if($method == 'add'){
			$sql = 'ALTER TABLE ' . _DB_PREFIX_ . 'category_lang ADD `top_description` TEXT';
			$sql2 = 'ALTER TABLE ' . _DB_PREFIX_ . 'category_lang ADD `second_name` VARCHAR(255)';
		} else {
			$sql = 'ALTER TABLE ' . _DB_PREFIX_ . 'category_lang DROP COLUMN `top_description`';
			$sql2 = 'ALTER TABLE ' . _DB_PREFIX_ . 'category_lang DROP COLUMN `second_name`';
		} 

		if(!Db::getInstance()->Execute($sql) || !Db::getInstance()->Execute($sql2))
			return false;
		return true;
	}

	public function getTopDescription($id_category)
	{
		return Db::getInstance()->getValue('SELECT top_description FROM '._DB_PREFIX_.'category_lang WHERE id_category = '. (int)$id_category .' AND id_lang = 1');
	}

	public function getSecondName($id_category)
	{
		return Db::getInstance()->getValue('SELECT second_name FROM '._DB_PREFIX_.'category_lang WHERE id_category = '. (int)$id_category .' AND id_lang = 1');
	}

	public function hookCategoryAddition($params)
	{
		$top_description = Tools::getValue('top_description');
		if(!empty($top_description)){
			$top_description = htmlentities($top_description);
		}
		$second_name = Tools::getValue('second_name');
		// die();
		$dbCheck = Db::getInstance()->update('category_lang', array('top_description' => $top_description, 'second_name' => $second_name), 'id_category = ' . $params['category']->id.' AND id_lang = 1');

		return $dbCheck;
	}

	public function hookCategoryUpdate($params)
	{
		$this->hookCategoryAddition($params);
	}

	public function hookDisplayBackOfficeCategory($params)
	{
		// we need an actual id, otherwise if we are just adding the category this field can be left empty
		if((int)$params['request']->get('categoryId')){

			$top_description = $this->getTopDescription((int)$params['request']->get('categoryId'));
			$second_name = $this->getSecondName((int)$params['request']->get('categoryId'));
		} else {
			$top_description = '';
			$second_name = '';
		} 

		$this->context->smarty->assign(array(
			'top_description'=> $top_description,
			'second_name'=> $second_name
		));

		return $this->display(__FILE__, 'backoffice.tpl');
	}


}

<?php
namespace MsThemeConfig\Class;


use HelperListCore;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;

/**
 *
 */
class OIHelperList extends HelperListCore {

	var $additional_link_parameters = array();

	public function __construct()
	{
		$this->base_folder = _PS_MODULE_DIR_.'views/templates/admin/_configure/offerrow/helpers/list/';
        $this->base_tpl = 'list.tpl';
		parent::__construct();
	}

	/**
	 * Display view action link
	 */
	public function displayViewLink($token = null, $id, $name = null)
	{
		$tpl = $this->createTemplate('list_action_view.tpl');
		if (!array_key_exists('View', self::$cache_lang)) {
			self::$cache_lang['View'] = $this->context->getTranslator()->trans('View', [],'Modules.MsThemeConfig.OIHelperList');
		}


		$tpl->assign(array(
			'href' => $this->currentIndex.'&'.$this->identifier.'='.$id.'&view'.$this->table.'&token='.($token != null ? $token : $this->token),
			'action' => self::$cache_lang['View'],
		));

		return $tpl->fetch();
	}

	/**
	 * Display edit action link
	 */
	public function displayEditLink($token = null, $id, $name = null)
	{
		$tpl = $this->createTemplate('list_action_edit.tpl');
		if (!array_key_exists('Edit', self::$cache_lang)) {
			self::$cache_lang['Edit'] = $this->context->getTranslator()->trans('Edit', [],'Modules.MsThemeConfig.OIHelperList');
		}

		$tpl->assign(array(
			'href' => $this->currentIndex.'&'.$this->identifier.'='.$id.'&update'.$this->table.($this->page && $this->page > 1 ? '&page='.(int)$this->page : '').$this->_paramListToString($this->additional_link_parameters).'&token='.($token != null ? $token : $this->token),
			'action' => self::$cache_lang['Edit'],
			'id' => $id
		));

		return $tpl->fetch();
	}

	/**
	 * Display delete action link
	 */
	public function displayDeleteLink($token = null, $id, $name = null)
	{
		$tpl = $this->createTemplate('list_action_delete.tpl');

		if (!array_key_exists('Delete', self::$cache_lang)) {
			self::$cache_lang['Delete'] = $this->context->getTranslator()->trans('Delete', [],'Modules.MsThemeConfig.OIHelperList');
		}

		if (!array_key_exists('DeleteItem', self::$cache_lang)) {
			self::$cache_lang['DeleteItem'] = $this->context->getTranslator()->trans('Delete selected item?', [],'Modules.MsThemeConfig.OIHelperList');
		}

		if (!array_key_exists('Name', self::$cache_lang)) {
			self::$cache_lang['Name'] = $this->context->getTranslator()->trans('Name:', [],'Modules.MsThemeConfig.OIHelperList');
		}

		if (!is_null($name)) {
			$name = addcslashes('\n\n'.self::$cache_lang['Name'].' '.$name, '\'');
		}

		$data = array(
			$this->identifier => $id,
			'href' => $this->currentIndex.'&'.$this->identifier.'='.$id.'&delete'.$this->table.$this->_paramListToString($this->additional_link_parameters).'&token='.($token != null ? $token : $this->token),
			'action' => self::$cache_lang['Delete']
		);

		if ($this->specificConfirmDelete !== false) {
			$data['confirm'] = !is_null($this->specificConfirmDelete) ? $this->context->getTranslator()->trans('Weet u zeker dat u deze offerte regel wilt verwijderen?',[],'Modules.MsThemeConfig.OIHelperList') : Tools::safeOutput(self::$cache_lang['DeleteItem'].$name);
		}

		$tpl->assign(array_merge($this->tpl_delete_link_vars, $data));

		return $tpl->fetch();
	}

	public function setAdditionalLinkParameter($parameter, $value) {
		if ($parameter != null && $value != null) {
			$this->additional_link_parameters[$parameter] = $value;
		}
	}

	private function _paramListToString($parameters = array()) {
		$output = "";
		foreach($parameters as $key => $value) {
			$output = "&" . $key . "=" . $value;
		}
		return $output;
	}
}

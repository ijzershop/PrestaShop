<?php



class SawConfigurationController
{
	const CONF_NAME = 'SAWANDCUTMODULE';
	protected static $instance;
	private $configuration = array();

	protected function __construct() {
		$this->configuration = $this->getConfiguration();
	}

	public function getValue($qualifier) {
		if (array_key_exists($qualifier, $this->configuration)) {
			return $this->getConfiguration()[$qualifier];
		}
		return null;
	}

	public function setValue($qualifier, $value) {
		$this->configuration[$qualifier] = $value;
		$this->saveConfiguration();
	}

	public function getConfiguration() {
		if (empty($this->configuration)) {
			$this->configuration = unserialize(Configuration::get(SawConfigurationController::CONF_NAME, Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id));
		}
		return is_array($this->configuration)? $this->configuration : array();
	}

	public function saveConfiguration()
	{

		if (!empty($this->configuration)){
			Configuration::updateValue(SawConfigurationController::CONF_NAME, serialize($this->configuration));
		}
	}

	public static function getInstance() {
		if (!self::$instance) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}

<?php



class DynamicProductConfigurationController
{
	const CONF_NAME = 'MODERNESMIDDYNAMICPRODUCT';
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
			$this->configuration = unserialize(Configuration::get(DynamicProductConfigurationController::CONF_NAME));
		}
		return is_array($this->configuration)? $this->configuration : array();
	}

	public function saveConfiguration()
	{	
		
		if (!empty($this->configuration)){
			Configuration::updateValue(DynamicProductConfigurationController::CONF_NAME, serialize($this->configuration));
		}
	}

	public static function getInstance() {
		if (!self::$instance) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}
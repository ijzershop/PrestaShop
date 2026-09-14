<?php

class DynamicProductConfigurationController
{
	const CONF_NAME = 'DYNAMICPRODUCT';
	const LEGACY_CONF_NAME = 'MODERNESMIDDYNAMICPRODUCT';
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
			$raw_config = Configuration::get(DynamicProductConfigurationController::CONF_NAME);
			if (empty($raw_config)) {
				$raw_config = Configuration::get(DynamicProductConfigurationController::LEGACY_CONF_NAME);
				if (!empty($raw_config)) {
					Configuration::updateValue(DynamicProductConfigurationController::CONF_NAME, $raw_config);
				}
			}
			if (!empty($raw_config)) {
				$this->configuration = unserialize($raw_config);
			}
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

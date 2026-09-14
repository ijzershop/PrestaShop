<?php



class SawConfigurationController
{
	protected static $instance;
	private $configuration = array();
	private $configMap = [
		'id_attribute_group' => 'SAWANDCUT_ATTRIBUTE_GROUP',
		'id_attribute_group_cut' => 'SAWANDCUT_ATTRIBUTE_GROUP_CUT',
		'id_feature_product_length' => 'SAWANDCUT_FEATURE_LENGTH',
		'id_feature_product_cutlength' => 'SAWANDCUT_FEATURE_CUTLENGTH',
		'id_feature_product_cutwidth' => 'SAWANDCUT_FEATURE_CUTWIDTH',
		'id_feature_product_default_sawloss' => 'SAWANDCUT_DEFAULT_SAWLOSS',
		'id_feature_product_default_minsawsize' => 'SAWANDCUT_DEFAULT_MINSAWSIZE',
		'id_feature_product_default_mincutsize' => 'SAWANDCUT_DEFAULT_MINCUTSIZE',
		'id_feature_product_default_mincutremainder' => 'SAWANDCUT_DEFAULT_MINCUTREMAINDER',
		'default_cut_price' => 'SAWANDCUT_DEFAULT_CUT_PRICE',
		'id_cms_offerpage' => 'SAWANDCUT_OFFER_PAGE',
		'id_cms_sawinfo_page' => 'SAWANDCUT_SAWINFO_PAGE',
		'id_cms_cutinfo_page' => 'SAWANDCUT_CUTINFO_PAGE',
		'single_cut_form_enabled' => 'SAWANDCUT_SINGLE_CUT_ENABLED',
	];

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
			$this->configuration = $this->loadFromSeparateConfig();
		}
		return is_array($this->configuration)? $this->configuration : array();
	}

	private function loadFromSeparateConfig(): array
	{
		$idLang = Context::getContext()->language->id;
		$idShopGroup = Context::getContext()->shop->id_shop_group;
		$idShop = Context::getContext()->shop->id;

		$config = [];
		foreach ($this->configMap as $internalKey => $configKey) {
			$val = Configuration::get($configKey, $idLang, $idShopGroup, $idShop);
			if ($val !== null && $val !== '') {
				$config[$internalKey] = ctype_digit((string) $val) ? (int) $val : $val;
			}
		}

		return $config;
	}

	public function saveConfiguration()
	{

		if (empty($this->configuration)) {
			return;
		}
		$idShopGroup = Context::getContext()->shop->id_shop_group;
		$idShop = Context::getContext()->shop->id;

		foreach ($this->configMap as $internalKey => $configKey) {
			if (array_key_exists($internalKey, $this->configuration)) {
				Configuration::updateValue(
					$configKey,
					$this->configuration[$internalKey],
					false,
					$idShopGroup,
					$idShop
				);
			}
		}
	}

	public static function getInstance() {
		if (!self::$instance) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}

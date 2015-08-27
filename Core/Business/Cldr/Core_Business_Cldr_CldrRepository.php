<?php
/**
 * 2007-2015 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 *  @author 	PrestaShop SA <contact@prestashop.com>
 *  @copyright  2007-2015 PrestaShop SA
 *  @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */

use ICanBoogie\CLDR\FileProvider;
use ICanBoogie\CLDR\Repository;
use ICanBoogie\CLDR\RunTimeProvider;
use ICanBoogie\CLDR\WebProvider;
use ICanBoogie\CLDR\Currency;

class Core_Business_Cldr_CldrRepository
{
	protected $cldrCacheFolder;
	protected $repository;
	protected $localeRepository;
	protected $region;
	protected $locale;

	public function __construct()
	{
		$this->cldrCacheFolder = _PS_CACHE_DIR_.'cldr';

		if(!is_dir($this->cldrCacheFolder)){
			try {
				mkdir($this->cldrCacheFolder.DIRECTORY_SEPARATOR.'tmp', 0777, true);
			} catch (Exception $e) {
				throw new Exception('Cldr cache folder can\'t be created');
			}
		}

		$provider = new RunTimeProvider
		(
			new FileProvider
			(
				new WebProvider, $this->cldrCacheFolder
			)
		);

		$locale = new Core_Business_Cldr_CldrLocalize();
		$this->locale = $locale->getLanguage();
		$this->region = $locale->getRegion();

		$this->repository = new Repository($provider);
		$this->localeRepository = $this->repository->locales[$this->locale];
	}

	public function setLocale($locale){
		$this->locale = $locale;
		$this->localeRepository = $this->repository->locales[$this->locale];
	}

	public function setRegion($region){
		$this->region = $region;
	}

	public function getRepository()
	{
		return $this->repository;
	}

	public function getAllCurrencies(){
		$currencies = $this->repository->supplemental['codeMappings'];
		$datas = array();
		foreach($currencies as $k=>$v){

			if($k === 'XTS' ||  strlen($k)!==3){
				continue;
			}

			$currency = $this->getCurrency($k);
			$datas[] = array( 'name' => ucfirst($currency['name']).' ('.$k.')', 'code' => $k, 'iso_code' => $currency['iso_code']);
		}

		//sort array naturally
		uasort($datas, function($x, $y) {
			return strnatcmp($x["name"], $y["name"]);
		});

		return $datas;
	}

	public function getCurrencyIsoCodeNum($code){
		$currencies = $this->repository->supplemental['codeMappings'];

		if(!empty($currencies[$code]) && !empty($currencies[$code]['_numeric'])){
			return $currencies[$code]['_numeric'];
		}

		return null;
	}

	public function getCurrency($code = null){
		if(!$code) {
			$territory = $this->repository->territories[$this->region];
			$code = (string)$territory->currency;
		}

		$currency = new Currency($this->repository, $code);
		$localized_currency = $currency->localize($this->locale);

		return array(
			'name' => $localized_currency->name,
			'symbol' => $localized_currency->symbol,
			'code' => $code,
			'iso_code' => $this->getCurrencyIsoCodeNum($code)
		);
	}

}

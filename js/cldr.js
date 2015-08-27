/*
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
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2015 PrestaShop SA
*  @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

/* CLDR globals */
var cldrLoadedCatalogs = [];
var cldrLoaderError = false;
var cldrCatalogsPath = '/translations/cldr/datas/';

/**
 * Will get list of CLDR catalogs by XHR.
 * Please do not call this directly except if you know what you do. Prefer to call the wrapper methods cldrForXXX()
 * containing catalogs depending on the locale type you want to use.
 * 
 * Asynchronous behavior: If callback is defined and callable, then each ajax request will be
 * asynchronous and the callback will be called with a Globalize object in its parameter.
 * 
 * Synchronous behavior: If callback is undefined, then ajax request will be SYNCHRONOUS.
 * The function will return a Globalize object instance.
 * WARNING: Please avoid as much as you can this SYNC behavior till its deprecated for browser
 * because of a slow down process in browsers (will freeze javascript process until each CLDR
 * catalogs are fully loaded).
 * 
 * @param catalogs An array of strings representing the catalogs to load.
 * @param callback A function to execute in ASYNC behavior. This will receive a Globalize object as parameter.
 * @returns Globalize instance in SYNC behavior only.
 */
function cldrLazyLoadCatalogs(catalogs, callback) {
	var sync = (typeof callback === 'undefined' || !$.isFunction(callback));
	var culture = full_language_code.split('-'); // en-us -> [en, us]
	culture = culture[0] + '-' + culture[1].toUpperCase(); // en-US
	
	if (sync) {
		// Warning, Sync behavior will slow down Browser performances!
		catalogs.forEach(function(catalog) {
			var url = cldrCatalogsPath + catalog.replace(/main\/[^\/]+/, 'main/'+culture) + '.json';
			if ($.inArray(url, cldrLoadedCatalogs) == -1)
				$.ajax({
					url: url,
					dataType: 'json',
					async: false, // deprecated for modern browser, but not really other choice...
					success: function(data) {
						Globalize.load(data);
						cldrLoadedCatalogs.push(url);
					},
					error: function() {
						cldrLoaderError = true;
					}
				});
		});
		
		if (!cldrLoaderError) return Globalize(culture);
	} else {
		var deferreds = [];
		catalogs.forEach(function(catalog) {
			var url = cldrCatalogsPath + catalog.replace(/main\/[^\/]+/, 'main/'+culture) + '.json';
			if ($.inArray(url, cldrLoadedCatalogs) == -1)
				this.push($.get(url).done(function() {
						cldrLoadedCatalogs.push(url);
					}).fail(function() {
						cldrLoaderError = true;
					}));
		}, deferreds);

		$.when.apply($, deferreds).then(function() {
			return [].slice.apply( arguments, [ 0 ] ).map(function( result ) {
				return result[ 0 ];
			});
	    }).then( Globalize.load ).then(function() {
	    	if (!cldrLoaderError) 
	    		callback(Globalize(culture));
	    });
	}
}

/**
 * Will load CLDR catalogs for Number conversions.
 * 
 * Asynchronous behavior: If callback is defined and callable, then each ajax request will be
 * asynchronous and the callback will be called with a Globalize object in its parameter.
 * 
 * Synchronous behavior: If callback is undefined, then ajax request will be SYNCHRONOUS.
 * The function will return a Globalize object instance.
 * WARNING: Please avoid as much as you can this SYNC behavior till its deprecated for browser
 * because of a slow down process in browsers (will freeze javascript process until each CLDR
 * catalogs are fully loaded).
 * 
 * @param callback A function to execute in ASYNC behavior. This will receive a Globalize object as parameter.
 * @returns Globalize instance in SYNC behavior only.
 */
function cldrForNumber(callback) {
	var catalogs = ['main/en/numbers', 'supplemental/likelySubtags', 'supplemental/numberingSystems'];
	return cldrLazyLoadCatalogs(catalogs, callback);
}

/**
 * Will load CLDR catalogs for Currencies conversions.
 * 
 * Asynchronous behavior: If callback is defined and callable, then each ajax request will be
 * asynchronous and the callback will be called with a Globalize object in its parameter.
 * 
 * Synchronous behavior: If callback is undefined, then ajax request will be SYNCHRONOUS.
 * The function will return a Globalize object instance.
 * WARNING: Please avoid as much as you can this SYNC behavior till its deprecated for browser
 * because of a slow down process in browsers (will freeze javascript process until each CLDR
 * catalogs are fully loaded).
 * 
 * @param callback A function to execute in ASYNC behavior. This will receive a Globalize object as parameter.
 * @returns Globalize instance in SYNC behavior only.
 */
function cldrForCurrencies(callback) {
	var catalogs = ['main/en/numbers', 'main/en/currencies', 'supplemental/likelySubtags',
	                'supplemental/currencyData', 'supplemental/plurals'];
	return cldrLazyLoadCatalogs(catalogs, callback);
}

/**
 * A small wrapper for currency, returning directly the currency formatter with the good currency.
 * Works in SYNC or ASYNC behaviors.
 * Warning: SYNC behavior should be avoided.
 * @see cldrForCurrencies(callback)
 * 
 * @param callback A function to execute in ASYNC behavior. This will receive a currencyFormatter object as parameter.
 * @param options An option hash table to transfer to formatter factory.
 * @returns currencyFormatter instance in SYNC behavior only.
 */
function cldrForCurrencyFormatterWrapper(callback, options) {
	var sync = (typeof callback === 'undefined' || !$.isFunction(callback));
	var currencyIsoCode = currency['iso_code'];
	
	if (sync) {
		var globalize = cldrForCurrencies();
		return globalize.currencyFormatter(currencyIsoCode, options);
	} else {
		var callbackEncap = function(globalize) {
			callback(globalize.currencyFormatter(currencyIsoCode, options));
		};
		cldrForCurrencies(callbackEncap);
	}
}

/**
 * Will load CLDR catalogs for Date conversions.
 * 
 * Asynchronous behavior: If callback is defined and callable, then each ajax request will be
 * asynchronous and the callback will be called with a Globalize object in its parameter.
 * 
 * Synchronous behavior: If callback is undefined, then ajax request will be SYNCHRONOUS.
 * The function will return a Globalize object instance.
 * WARNING: Please avoid as much as you can this SYNC behavior till its deprecated for browser
 * because of a slow down process in browsers (will freeze javascript process until each CLDR
 * catalogs are fully loaded).
 * 
 * @param callback A function to execute in ASYNC behavior. This will receive a Globalize object as parameter.
 * @returns Globalize instance in SYNC behavior only.
 */
function cldrForDate(callback) {
	var catalogs = ['main/en/ca-gregorian', 'main/en/numbers', 'main/en/timeZoneNames', 'supplemental/timeData',
	                'supplemental/weekData', 'supplemental/likelySubtags'];
	return cldrLazyLoadCatalogs(catalogs, callback);
}

















//////////////////
// UNIT TESTING //
//////////////////

function testCurrenciesSync() {
	var glCurrencyFormatter = cldrForCurrencyFormatterWrapper();
	console.log(glCurrencyFormatter(59.99));
}
function testCurrenciesAsync() {
	cldrForCurrencyFormatterWrapper(function(formatter) {
		console.log(formatter(39.991268));
	}, {style: "name"});
}

function testNumbers() {
	var glNumb = cldrForNumber();
	console.log(glNumb.numberFormatter({
			minimumSignificantDigits: 1,
			maximumSignificantDigits: 3
		})(3.141592));
	console.log(glNumb.numberParser()("$57.67"));
}

function testDateSync() {
	console.log(cldrForDate().formatDate( new Date(), { datetime: "medium" }));
}
function testDateAsync() {
	cldrForDate(function(gl) {
		console.log(gl.formatDate( new Date(), { datetime: "medium" }));
	});
}

//////////////////////////
// NON REGRESSION TESTS //
//////////////////////////

function testFormatNumber() {
	console.log(formatNumber(1234.09876543, 4, '_', ';'));
	formatNumberCldr(1234.09876543, function(v) {
		console.log(v);
	}, 4);
	
	console.log(formatNumber(1234, 4, '_', ';'));
	formatNumberCldr(1234, function(v) {
		console.log(v);
	}, 4);
	
	console.log(formatNumber(1234.00000000001, 4, '_', ';'));
	formatNumberCldr(1234.00000000001, function(v) {
		console.log(v);
	}, 4);
	
	formatNumberCldr(123456.987654, function(v) {
		console.log(v);
	});
}

function testFormatCurrency() {
	priceDisplayPrecision = 2; // global should be already defined
	console.log(formatCurrency(12344.12345657, 1, '$', 0));
	formatCurrencyCldr(12344.12345657, function(v) {
		console.log(v);
	});
	
	priceDisplayPrecision = 6; // global should be already defined
	console.log(formatCurrency(22344.12345657, 1, '$', 0));
	formatCurrencyCldr(22344.12345657, function(v) {
		console.log(v);
	});
	
	priceDisplayPrecision = 2; // global should be already defined
	console.log(formatCurrency(-.5698, 1, '$', 0));
	formatCurrencyCldr(-.5698, function(v) {
		console.log(v);
	});
}

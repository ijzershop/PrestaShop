<?php
/**
 * 2007-2017 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
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
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2017 PrestaShop SA
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShopBundle\Translation\View;

use PrestaShopBundle\Translation\Factory\TranslationsFactory;
use PrestaShopBundle\Translation\Provider\AbstractProvider;
use Doctrine\Common\Util\Inflector;
use PrestaShopBundle\Translation\Provider\UseDefaultCatalogueInterface;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\Translation\MessageCatalogueInterface;

class TreeBuilder
{
    private $locale;
    private $theme;

    public function __construct($locale, $theme)
    {
        $this->locale = $locale;
        $this->theme = $theme;
    }

    public function makeTranslationArray(AbstractProvider $provider)
    {
        $provider->setLocale($this->locale);
        $translations = $provider->getDefaultCatalogue()->all();
        $xliffCatalog = $provider->getXliffCatalogue()->all();
        $databaseCatalogue = $provider->getDatabaseCatalogue($this->theme)->all();

        foreach ($translations as $domain => $messages) {
            $missingTranslations = 0;

            foreach ($messages as $translationKey => $translationValue) {
                $translations[$domain][$translationKey] = array(
                    'xlf' =>  (array_key_exists($domain, $xliffCatalog) &&
                        array_key_exists($translationValue, $xliffCatalog[$domain]) ?
                        $xliffCatalog[$domain][$translationValue] : null),
                    'db' => (array_key_exists($domain, $databaseCatalogue) &&
                        array_key_exists($translationValue, $databaseCatalogue[$domain]) ?
                        $databaseCatalogue[$domain][$translationValue] : null),
                );

                if (
                    empty($translations[$domain][$translationKey]['xlf']) &&
                    empty($translations[$domain][$translationKey]['db'])
                ) {
                    $missingTranslations++;
                }
            }

            $translations[$domain]['__metadata'] = array('missing_translations' => $missingTranslations);
        }

        ksort($translations);

        return $translations;
    }

    /**
     * @return array
     */
    public function makeTranslationsTree($catalogue)
    {
        $translationsTree = array();
        $flippedUnbreakableWords = array_flip($this->getUnbreakableWords());

        foreach ($catalogue as $domain => $messages) {
            $unbreakableDomain = $this->makeDomainUnbreakable($domain);

            $tableisedDomain = Inflector::tableize($unbreakableDomain);
            list($basename) = explode('.', $tableisedDomain);
            $parts = array_reverse(explode('_', $basename));

            $subtree = &$translationsTree;

            while (count($parts) > 0) {
                $subdomain = ucfirst(array_pop($parts));
                if (array_key_exists($subdomain, $flippedUnbreakableWords)) {
                    $subdomain = $flippedUnbreakableWords[$subdomain];
                }

                if (!array_key_exists($subdomain, $subtree)) {
                    $subtree[$subdomain] = array();
                }

                $subtree = &$subtree[$subdomain];
            }

            $subtree['__messages'] = array($domain => $messages);
            if (isset($messages['__metadata'])) {
                $subtree['__fixed_length_id'] = '_' . sha1($domain);
                list($subtree['__domain']) = explode('.', $domain);
                $subtree['__metadata'] = $messages['__metadata'];
                $subtree['__metadata']['domain'] = $subtree['__domain'];
                unset($messages['__metadata']);
            }
        }

        return $translationsTree;
    }

    /**
     * Clean tree to use it with the new API system
     *
     * @param $tree
     * @param Router $router
     * @return array
     */
    public function cleanTreeToApi($tree, Router $router)
    {
        $rootTree = array(
            'tree' => array(
                'total_translations' => 0,
                'total_missing_translations' => 0,
                'children' => array(),
            ),
        );

        $cleanTree = &$rootTree['tree']['children'];

        $index1 = 0;
        foreach ($tree as $k1 => $t1) {
            $index2 = 0;
            if ('__metadata' !== $k1) {
                $this->addTreeInfo($router, $cleanTree, $index1, $k1, $k1);

                if (array_key_exists('__messages', $t1)) {
                    $nbMessage = count(current($t1['__messages']));
                    if (array_key_exists('__metadata', $t1)) {
                        $nbMessage -= 1;
                    }

                    $cleanTree[$index1]['total_translations'] += $nbMessage;
                    $rootTree['tree']['total_translations'] += $nbMessage;

                    if (array_key_exists('__metadata', $t1) && array_key_exists('missing_translations', $t1['__metadata'])) {
                        $cleanTree[$index1]['total_missing_translations'] += (int)$t1['__metadata']['missing_translations'];
                        $rootTree['tree']['total_missing_translations'] += (int)$t1['__metadata']['missing_translations'];
                    }

                } else {
                    foreach ($t1 as $k2 => $t2) {
                        $index3 = 0;
                        if ('__metadata' !== $k2) {
                            $this->addTreeInfo($router, $cleanTree[$index1]['children'], $index2, $k2, $k1 . $k2);

                            if (array_key_exists('__messages', $t2)) {
                                $nbMessage = count(current($t2['__messages']));
                                if (array_key_exists('__metadata', $t2)) {
                                    $nbMessage -= 1;
                                }

                                $cleanTree[$index1]['children'][$index2]['total_translations'] += $nbMessage;
                                $cleanTree[$index1]['total_translations'] += $nbMessage;
                                $rootTree['tree']['total_translations'] += $nbMessage;

                                if (array_key_exists('__metadata', $t2) && array_key_exists('missing_translations', $t2['__metadata'])) {
                                    $cleanTree[$index1]['children'][$index2]['total_missing_translations'] += (int)$t2['__metadata']['missing_translations'];
                                    $cleanTree[$index1]['total_missing_translations'] += (int)$t2['__metadata']['missing_translations'];
                                    $rootTree['tree']['total_missing_translations'] += (int)$t2['__metadata']['missing_translations'];
                                }

                            } else {
                                foreach ($t2 as $k3 => $t3) {
                                    if ('__metadata' !== $k3) {
                                        $this->addTreeInfo($router, $cleanTree[$index1]['children'][$index2]['children'], $index3, $k3, $k1 . $k2 . $k3);

                                        if (array_key_exists('__messages', $t3)) {
                                            $nbMessage = count(current($t3['__messages']));
                                            if (array_key_exists('__metadata', $t3)) {
                                                $nbMessage -= 1;
                                            }

                                            $cleanTree[$index1]['children'][$index2]['children'][$index3]['total_translations'] += $nbMessage;
                                            $cleanTree[$index1]['children'][$index2]['total_translations'] += $nbMessage;
                                            $cleanTree[$index1]['total_translations'] += $nbMessage;
                                            $rootTree['tree']['total_translations'] += $nbMessage;
                                        }

                                        if (array_key_exists('__metadata', $t3) && array_key_exists('missing_translations', $t3['__metadata'])) {
                                            $cleanTree[$index1]['children'][$index2]['children'][$index3]['total_missing_translations'] += (int)$t3['__metadata']['missing_translations'];
                                            $cleanTree[$index1]['children'][$index2]['total_missing_translations'] += (int)$t3['__metadata']['missing_translations'];
                                            $cleanTree[$index1]['total_missing_translations'] += (int)$t3['__metadata']['missing_translations'];
                                            $rootTree['tree']['total_missing_translations'] += (int)$t3['__metadata']['missing_translations'];
                                        }

                                        if (empty($cleanTree[$index1]['children'][$index2]['children'][$index3]['children'])) {
                                            unset($cleanTree[$index1]['children'][$index2]['children'][$index3]['children']);
                                        }
                                        $index3++;
                                    }
                                }
                            }

                            if (empty($cleanTree[$index1]['children'][$index2]['children'])) {
                                unset($cleanTree[$index1]['children'][$index2]['children']);
                            }
                            $index2++;
                        }
                    }

                    if (empty($cleanTree[$index1]['children'])) {
                        unset($cleanTree[$index1]['children']);
                    }
                    $index1++;
                }
            }
        }

        return $rootTree;
    }

    /**
     * @param Router $router
     * @param $tree
     * @param $index
     * @param $name
     * @param $fullName
     * @return mixed
     */
    private function addTreeInfo(Router $router, &$tree, $index, $name, $fullName)
    {
        $tree[$index]['name'] = $name;
        $tree[$index]['full_name'] = $fullName;
        $tree[$index]['domain_catalog_link'] = $router->generate('api_translation_domain_catalog', array(
            'locale' => $this->locale,
            'domain' => $fullName,
        ));
        $tree[$index]['total_translations'] = 0;
        $tree[$index]['total_missing_translations'] = 0;
        $tree[$index]['children'] = array();

        return $tree;
    }

    /**
     * There are domains containing multiple words,
     * hence these domains should not be split from those words in camelcase.
     * The latter are replaced from a list of unbreakable words.
     *
     * @param $domain
     *
     * @return string
     */
    public function makeDomainUnbreakable($domain)
    {
        $adjustedDomain = $domain;
        $unbreakableWords = $this->getUnbreakableWords();

        foreach ($unbreakableWords as $search => $replacement) {
            if (false !== strpos($domain, $search)) {
                $adjustedDomain = str_replace($search, $replacement, $domain);

                break;
            }
        }

        return $adjustedDomain;
    }

    /**
     * @return array
     */
    public function getUnbreakableWords()
    {
        return array(
            'BankWire' => 'Bankwire',
            'BlockBestSellers' => 'Blockbestsellers',
            'BlockCart' => 'Blockcart',
            'CheckPayment' => 'Checkpayment',
            'ContactInfo' => 'Contactinfo',
            'EmailSubscription' => 'Emailsubscription',
            'FacetedSearch' => 'Facetedsearch',
            'FeaturedProducts' => 'Featuredproducts',
            'LegalCompliance' => 'Legalcompliance',
            'ShareButtons' => 'Sharebuttons',
            'ShoppingCart' => 'Shoppingcart',
            'SocialFollow' => 'Socialfollow',
            'WirePayment' => 'Wirepayment',
            'BlockAdvertising' => 'Blockadvertising',
            'CategoryTree' => 'Categorytree',
            'CustomerSignIn' => 'Customersignin',
            'CustomText' => 'Customtext',
            'ImageSlider' => 'Imageslider',
            'LinkList' => 'Linklist',
            'ShopPDF' => 'ShopPdf',
        );
    }

    /*
    * @param AbstractProvider $provider
    * @param MessageCatalogueInterface $catalogue
    * @return MessageCatalogueInterface
    */
    private function addDefaultTranslations(AbstractProvider $provider, MessageCatalogueInterface $catalogue)
    {
        if (!$provider instanceof UseDefaultCatalogueInterface) {
            return $catalogue;
        }

        $catalogueWithDefault = $provider->getDefaultCatalogue();
        $catalogueWithDefault->addCatalogue($catalogue);

        return $catalogueWithDefault;
    }
}

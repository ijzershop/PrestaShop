<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
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
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
declare(strict_types=1);

namespace Tests\Unit\Core\Translation\Provider;

use InvalidArgumentException;
use PHPUnit\Framework\TestCase;
use PrestaShop\PrestaShop\Core\Translation\Exception\TranslationFilesNotFoundException;
use PrestaShop\PrestaShop\Core\Translation\Provider\CatalogueLayersProviderInterface;
use PrestaShop\PrestaShop\Core\Translation\Provider\DefaultCatalogueProvider;
use Symfony\Component\Translation\Dumper\XliffFileDumper;
use Symfony\Component\Translation\MessageCatalogue;

class DefaultCatalogueProviderTest extends TestCase
{
    /**
     * @var string
     */
    private static $tempDir;

    private static $wordings = [
        'ShopSomeDomain' => [
            'Some wording' => 'Some wording',
            'Some other wording' => 'Some other wording',
        ],
        'ShopSomethingElse' => [
            'Foo' => 'Foo',
            'Bar' => 'Bar',
        ],
    ];

    private static $emptyWordings = [
        'ShopSomeDomain.en-US' => [
            'Some wording' => '',
            'Some other wording' => '',
        ],
        'ShopSomethingElse.en-US' => [
            'Foo' => '',
            'Bar' => '',
        ],
    ];

    public static function setUpBeforeClass()
    {
        self::$tempDir = implode(DIRECTORY_SEPARATOR, [sys_get_temp_dir(), 'DefaultCatalogueProviderTest']);

        $catalogue = new MessageCatalogue(CatalogueLayersProviderInterface::DEFAULT_LOCALE);
        foreach (self::$wordings as $domain => $messages) {
            $catalogue->add($messages, $domain);
        }
        (new XliffFileDumper())->dump($catalogue, [
            'path' => self::$tempDir,
        ]);
    }

    public function testItFailsWhenDirectoryNotExists()
    {
        $this->expectException(TranslationFilesNotFoundException::class);
        new DefaultCatalogueProvider('someFakeDirectory', ['filter']);
    }

    public function testItFailsWhenFiltersAreNotStrings()
    {
        $this->expectException(InvalidArgumentException::class);
        new DefaultCatalogueProvider('/tmp', ['filter', 1]);
    }

    public function testGetCatalogueFilters()
    {
        $catalogue = (new DefaultCatalogueProvider(
            self::$tempDir,
            ['#^Shop([A-Z]|\.|$)#']
        ))
            ->getCatalogue(CatalogueLayersProviderInterface::DEFAULT_LOCALE);

        $domains = $catalogue->getDomains();
        sort($domains);

        $this->assertSame([
            'ShopSomeDomain',
            'ShopSomethingElse',
        ], $domains);

        $provider = new DefaultCatalogueProvider(
            self::$tempDir,
            ['#^ShopSomething([A-Z]|\.|$)#']
        );
        $catalogue = $provider->getCatalogue(CatalogueLayersProviderInterface::DEFAULT_LOCALE);

        $domains = $catalogue->getDomains();
        sort($domains);

        $this->assertSame([
            'ShopSomethingElse',
        ], $domains);
    }

    public function testGetCatalogueMessages()
    {
        $provider = new DefaultCatalogueProvider(
            self::$tempDir,
            ['#^Shop([A-Z]|\.|$)#']
        );

        $catalogue = $provider->getCatalogue(CatalogueLayersProviderInterface::DEFAULT_LOCALE);

        $catalogueAsArray = $catalogue->all();
        foreach (self::$wordings as $key => $messages) {
            $this->assertArrayHasKey($key, $catalogueAsArray);
            foreach ($messages as $messageKey => $message) {
                $this->assertArrayHasKey($messageKey, $catalogueAsArray[$key]);
                $this->assertSame('', $catalogueAsArray[$key][$messageKey]);
            }
        }
    }

    public function testGetCatalogue()
    {
        $provider = new DefaultCatalogueProvider(
            self::$tempDir,
            ['#^Shop([A-Z]|\.|$)#']
        );

        $catalogue = $provider->getCatalogue('ab-AB');

        $messages = $catalogue->all();
        ksort($messages);

        $this->assertSame(self::$emptyWordings, $messages);
    }
}

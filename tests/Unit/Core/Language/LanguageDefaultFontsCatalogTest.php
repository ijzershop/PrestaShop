<?php
/**
 * 2007-2019 PrestaShop SA and Contributors
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
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace Tests\Unit\Core\Language;

use PHPUnit\Framework\TestCase;
use PrestaShop\PrestaShop\Core\Language\LanguageDefaultFontsCatalog;
use PrestaShop\PrestaShop\Core\Language\LanguageInterface;

class LanguageDefaultFontsCatalogTest extends TestCase
{
    public function testConstructor()
    {
        $fontCatalog = new LanguageDefaultFontsCatalog();
        $this->assertNotNull($fontCatalog);

        $fontCatalog = new LanguageDefaultFontsCatalog([
            'ar' => 'Tahoma',
            'fa' => 'Tahoma',
        ]);
        $this->assertNotNull($fontCatalog);
    }

    public function testGetDefaultFont()
    {
        $fontCatalog = new LanguageDefaultFontsCatalog([
            'ar' => 'Tahoma',
            'fa' => 'Tahoma',
            'fr' => 'Comic Sans MS',
        ]);
        $this->assertNotNull($fontCatalog);

        $font = $fontCatalog->getDefaultFontByLanguage($this->buildLanguageMock('ar'));
        $this->assertEquals('Tahoma', $font);

        $font = $fontCatalog->getDefaultFontByLanguage($this->buildLanguageMock('fr'));
        $this->assertEquals('Comic Sans MS', $font);

        $font = $fontCatalog->getDefaultFontByLanguage($this->buildLanguageMock('en'));
        $this->assertEquals('', $font);
    }

    /**
     * @param string $isoCode
     *
     * @return \PHPUnit_Framework_MockObject_MockObject|LanguageInterface
     */
    private function buildLanguageMock($isoCode)
    {
        $languageMock = $this->getMockBuilder(LanguageInterface::class)
            ->disableOriginalConstructor()
            ->getMock()
        ;

        $languageMock
            ->expects($this->once())
            ->method('getIsoCode')
            ->willReturn($isoCode)
        ;

        return $languageMock;
    }
}

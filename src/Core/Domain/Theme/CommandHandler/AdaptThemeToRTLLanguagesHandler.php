<?php
/**
 * 2007-2018 PrestaShop
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
 * @copyright 2007-2018 PrestaShop SA
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\PrestaShop\Core\Domain\Theme\CommandHandler;

use PrestaShop\PrestaShop\Core\Domain\Theme\Command\AdaptThemeToRTLLanguagesCommand;
use PrestaShop\PrestaShop\Core\Domain\Theme\Exception\CannotAdaptThemeToRTLLanguagesException;
use PrestaShop\PrestaShop\Core\Localization\RTL\Exception\GenerationException;
use PrestaShop\PrestaShop\Core\Localization\RTL\ProcessorFactoryInterface;

/**
 * Class AdaptThemeToRTLLanguagesHandler
 */
final class AdaptThemeToRTLLanguagesHandler implements AdaptThemeToRTLLanguagesHandlerInterface
{
    /**
     * @var ProcessorFactoryInterface
     */
    private $stylesheetProcessorFactory;

    /**
     * @param ProcessorFactoryInterface $stylesheetProcessorFactory
     */
    public function __construct(ProcessorFactoryInterface $stylesheetProcessorFactory)
    {
        $this->stylesheetProcessorFactory = $stylesheetProcessorFactory;
    }

    /**
     * {@inheritdoc}
     */
    public function handle(AdaptThemeToRTLLanguagesCommand $command)
    {
        try {
            $this->stylesheetProcessorFactory
                ->create()
                ->setProcessFOThemes([$command->getThemeName()])
                ->setRegenerate(true)
                ->process()
            ;
        } catch (GenerationException $e) {
            throw new CannotAdaptThemeToRTLLanguagesException(
                sprintf('Cannot adapt "%s" theme to RTL languages.', $command->getThemeName()),
                0,
                $e
            );
        }
    }
}

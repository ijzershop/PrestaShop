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

namespace PrestaShopBundle\DependencyInjection\Compiler;

use Generator;
use PrestaShop\PrestaShop\Core\Form\FormHandlerInterface;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;

/**
 * Used for collecting options form hook names and store them in the container.
 */
final class OptionsFormHookNameCollectorPass implements CompilerPassInterface
{
    const OPTIONS_FORM_SERVICE_ENDS_WITH = 'form_handler';

    const HOOK_NAME_POSITION_IN_CONSTRUCTOR = 4;
    const HOOK_NAME_STARTS_WITH = 'action';
    const HOOK_NAME_OF_FORM_BUILDER_ENDS_WITH = 'Form';
    const HOOK_NAME_OF_FORM_SAVE_ENDS_WIDTH = 'Save';

    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!in_array($container->getParameter('kernel.environment'), ['dev', 'test'])) {
            return;
        }

        $serviceDefinitions = $container->getDefinitions();

        $optionsFormServiceDefinitions = [];
        foreach ($serviceDefinitions as $serviceId => $serviceDefinition) {
            if ($serviceDefinition->isAbstract() || $serviceDefinition->isPrivate()) {
                continue;
            }

            if ($this->isOptionsFormService($serviceId, $serviceDefinition->getClass())) {
                $optionsFormServiceDefinitions[$serviceId] = $serviceDefinition;
            }
        }

        $optionNames = $this->getOptionNamesFromConstructorArgument($optionsFormServiceDefinitions);

        $formBuilderHookNames = [];
        $formBuilderSaveHookNames = [];

        foreach ($optionNames as $optionName) {
            $formBuilderHookNames[] = $this->formatHookName(
                self::HOOK_NAME_STARTS_WITH,
                $optionName,
                self::HOOK_NAME_OF_FORM_BUILDER_ENDS_WITH
            );

            $formBuilderSaveHookNames[] = $this->formatHookName(
                self::HOOK_NAME_STARTS_WITH,
                $optionName,
                self::HOOK_NAME_OF_FORM_SAVE_ENDS_WIDTH
            );
        }

        $container->setParameter(
            'prestashop.hook.option_form_hook_names',
            array_merge($formBuilderHookNames, $formBuilderSaveHookNames)
        );
    }

    /**
     * Checks if service belongs to options form.
     *
     * @param string $serviceId
     * @param string $serviceClass
     *
     * @return bool
     */
    private function isOptionsFormService($serviceId, $serviceClass)
    {
        return $this->stringEndsWith($serviceId, self::OPTIONS_FORM_SERVICE_ENDS_WITH) &&
            is_subclass_of($serviceClass, FormHandlerInterface::class)
        ;
    }

    /**
     * Checks if string ends with certain string.
     *
     * @param string $haystack
     * @param string $needle
     *
     * @return bool
     */
    private function stringEndsWith($haystack, $needle)
    {
        $diff = strlen($haystack) - strlen($needle);

        return $diff >= 0 && strpos($haystack, $needle, $diff) !== false;
    }

    /**
     * @param Definition[] $serviceDefinitions
     *
     * @return Generator
     */
    private function getOptionNamesFromConstructorArgument(array $serviceDefinitions)
    {
        foreach ($serviceDefinitions as $serviceDefinition) {
            $constructorArguments = $serviceDefinition->getArguments();

            if (!isset($constructorArguments[self::HOOK_NAME_POSITION_IN_CONSTRUCTOR])) {
                continue;
            }

            $hookName = $constructorArguments[self::HOOK_NAME_POSITION_IN_CONSTRUCTOR];

            if (!is_string($hookName)) {
                continue;
            }

            yield $hookName;
        }
    }

    /**
     * Formats hook names.
     *
     * @param string $hookStartsWith
     * @param string $hookId
     * @param string $hookEndsWidth
     *
     * @return string
     */
    private function formatHookName($hookStartsWith, $hookId, $hookEndsWidth)
    {
        return $hookStartsWith . $hookId . $hookEndsWidth;
    }
}

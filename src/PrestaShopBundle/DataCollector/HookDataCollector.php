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

namespace PrestaShopBundle\DataCollector;

use Smarty;
use Smarty_Internal_Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\DataCollector\DataCollector;
use Symfony\Component\VarDumper\Caster\CutStub;
use Symfony\Component\VarDumper\Cloner\Stub;

/**
 * Collect all information about Legacy hooks and make it available
 * in the Symfony Web profiler.
 */
final class HookDataCollector extends DataCollector
{
    /**
     * @var HookRegistry
     */
    private $registry;

    public function __construct(HookRegistry $registry)
    {
        $this->registry = $registry;
    }

    /**
     * {@inheritdoc}
     */
    public function collect(Request $request, Response $response, \Exception $exception = null)
    {
        $hooks = $this->registry->getHooks();
        $calledHooks = $this->registry->getCalledHooks();
        $notCalledHooks = $this->registry->getNotCalledHooks();
        $notRegisteredHooks = $this->registry->getNotRegisteredHooks();
        $this->data = [
            'hooks' => $this->stringifyHookArguments($hooks),
            'calledHooks' => $this->stringifyHookArguments($calledHooks),
            'notCalledHooks' => $this->stringifyHookArguments($notCalledHooks),
            'notRegisteredHooks' => $this->stringifyHookArguments($notRegisteredHooks),
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function unserialize($data)
    {
        // it seems that php 7.3 has a bug with unserialize: https://bugs.php.net/bug.php?id=77302
        $this->data = is_array($data) ? $data : @unserialize($data);
    }

    /**
     * Return the list of every dispatched legacy hooks during one request.
     *
     * @return array
     */
    public function getHooks()
    {
        return $this->data['hooks'];
    }

    /**
     * Return the list of every called legacy hooks during one request.
     *
     * @return array
     */
    public function getCalledHooks()
    {
        return $this->data['calledHooks'];
    }

    /**
     * Return the list of every uncalled legacy hooks during oHookne request.
     *
     * @return array
     */
    public function getNotCalledHooks()
    {
        return $this->data['notCalledHooks'];
    }

    /**
     * Return the list of every uncalled legacy hooks during oHookne request.
     *
     * @return array
     */
    public function getNotRegisteredHooks()
    {
        return $this->data['notRegisteredHooks'];
    }

    /**
     * {@inheritdoc}
     */
    public function reset()
    {
        $this->data = [];
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'ps.hooks_collector';
    }

    /**
     * @param array $hooksList
     *
     * @return array a better representation of arguments for HTML rendering
     */
    private function stringifyHookArguments(array &$hooksList)
    {
        foreach ($hooksList as &$hookList) {
            foreach ($hookList as &$hook) {
                $hook['args'] = $this->cloneVar($hook['args']);

                foreach ($hook['modules'] as &$modulesByType) {
                    foreach ($modulesByType as $type => &$module) {
                        if (empty($module)) {
                            unset($modulesByType[$type]);
                        }

                        if (array_key_exists('args', $module)) {
                            $module['args'] = $this->cloneVar($module['args']);
                        }
                    }
                }
            }
        }

        return $hooksList;
    }

    /**
     * @return callable[] The casters to add to the cloner
     */
    protected function getCasters()
    {
        $casters = parent::getCasters();

        $casters['*'] = function ($vv, array $a, Stub $s, $isNested) {
            if (!$vv instanceof Stub) {
                foreach ($a as $k => $v) {
                    $isSmarty = $k === 'smarty' && $vv instanceof Smarty_Internal_Template && $v instanceof Smarty;
                    if (\is_object($v) && !$v instanceof \DateTimeInterface && !$v instanceof Stub && !$isSmarty) {
                        $a[$k] = new CutStub($v);
                    }
                }
            }

            return $a;
        };

        return $casters;
    }
}

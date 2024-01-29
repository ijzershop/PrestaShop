<?php
/**
 * 2010-2022 Tuni-Soft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * It is available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to newer
 * versions in the future. If you wish to customize the module for your
 * needs please refer to
 * http://doc.prestashop.com/display/PS15/Overriding+default+behaviors
 * for more information.
 *
 * @author    Tunis-Soft
 * @copyright 2010-2022 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\presenter;

use classes\DynamicTools;
use classes\models\DynamicMainConfig;
use classes\module\DynamicPresenter;

class MainConfigPresenter extends DynamicPresenter
{
    protected $model = 'config';

    protected function getFormFields()
    {
        $source = DynamicTools::getSource();

        $switch_debug_mode = array(
            'type'   => 'switch',
            'label'  => $this->module->l('Debug mode', $source),
            'desc'   => $this->module->l('Enable this option to debug formulas in the browser console', $source),
            'name'   => 'debug_mode',
            'values' => array(
                array(
                    'id'    => 'active_on',
                    'value' => 1,
                    'label' => $this->module->l('Yes', $source)
                ),
                array(
                    'id'    => 'active_off',
                    'value' => 0,
                    'label' => $this->module->l('No', $source)
                )
            )
        );

        return array(
            'form' => array(
                'legend'  => array(
                    'title' => $this->module->l('Configuration', $source),
                    'icon'  => 'icon-cogs'
                ),
                'input'   => array(
                    $switch_debug_mode,
                ),
                'buttons' => array(
                    array(
                        'title' => $this->module->l('Troubleshooting', $source),
                        'href'  => $this->module->provider->getModuleAdminLink('view_troubleshooter'),
                        'icon'  => 'process-icon-terminal',
                        'class' => 'pull-left btn-success'
                    )
                )
            )
        );
    }

    protected function getFormValues()
    {
        $result = array();
        $values = DynamicMainConfig::getConfigValues();
        foreach ($values as $name => $value) {
            $result[$name] = $value;
        }
        return $result;
    }
}

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

namespace PrestaShop\PrestaShop\Core\Grid\Definition\Factory;

use PrestaShop\PrestaShop\Core\Grid\Action\GridActionCollection;
use PrestaShop\PrestaShop\Core\Grid\Column\ColumnCollection;
use PrestaShopBundle\Form\Admin\Type\DateRangeType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Templating\EngineInterface;

/**
 * Class LogGridDefinitionFactory is responsible for creating new instance of Log grid definition
 */
final class LogGridDefinitionFactory extends AbstractGridDefinitionFactory
{
    /**
     * @var EngineInterface
     */
    private $templating;

    /**
     * @param EngineInterface $templating
     */
    public function __construct(EngineInterface $templating)
    {
        $this->templating = $templating;
    }

    /**
     * {@inheritdoc}
     */
    protected function getIdentifier()
    {
        return 'logs';
    }

    /**
     * {@inheritdoc}
     */
    protected function getName()
    {
        return $this->trans('Logs', [], 'Admin.Navigation.Menu');
    }

    /**
     * {@inheritdoc}
     */
    protected function getColumns()
    {
        $templating = $this->templating;
        $displayEmployee = function ($row) use ($templating) {
            return $templating->render('@AdvancedParameters/LogsPage/Blocks/employee_block.html.twig', [
                'log' => $row,
            ]);
        };

        return ColumnCollection::fromArray([
            [
                'identifier' => 'id_log',
                'name' => $this->trans('ID', [], 'Admin.Global'),
                'filter_form_type' => TextType::class,
            ],
            [
                'identifier' => 'employee',
                'name' => $this->trans('Employee', [], 'Admin.Global'),
                'filter_form_type' => TextType::class,
                'modifier' => $displayEmployee,
                'raw_content' => true,
            ],
            [
                'identifier' => 'severity',
                'name' => $this->trans('Severity (1-4)', [], 'Admin.Advparameters.Feature'),
                'filter_form_type' => TextType::class,
            ],
            [
                'identifier' => 'message',
                'name' => $this->trans('Message', [], 'Admin.Global'),
                'filter_form_type' => TextType::class,
            ],
            [
                'identifier' => 'object_type',
                'name' => $this->trans('Object type', [], 'Admin.Advparameters.Feature'),
                'filter_form_type' => TextType::class,
            ],
            [
                'identifier' => 'object_id',
                'name' => $this->trans('Object ID', [], 'Admin.Advparameters.Feature'),
                'filter_form_type' => TextType::class,
            ],
            [
                'identifier' => 'error_code',
                'name' => $this->trans('Error code', [], 'Admin.Advparameters.Feature'),
                'filter_form_type' => TextType::class,
            ],
            [
                'identifier' => 'date_add',
                'name' => $this->trans('Date', [], 'Admin.Global'),
                'filter_form_type' => DateRangeType::class,
            ],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    protected function getGridActions()
    {
        $templating = $this->templating;
        $renderDeleteAllAction = function () use ($templating) {
            return $templating->render('@AdvancedParameters/LogsPage/Blocks/delete_all_grid_action.html.twig');
        };

        return GridActionCollection::fromArray([
            [
                'identifier' => 'delete',
                'name' => $this->trans('Erase all', [], 'Admin.Advparameters.Feature'),
                'icon' => 'delete_forever',
                'renderer' => $renderDeleteAllAction,
            ],
            [
                'identifier' => 'ps_refresh_list',
                'name' => $this->trans('Refresh list', [], 'Admin.Advparameters.Feature'),
                'icon' => 'refresh',
            ],
            [
                'identifier' => 'ps_show_query',
                'name' => $this->trans('Show SQL query', [], 'Admin.Actions'),
                'icon' => 'code',
            ],
            [
                'identifier' => 'ps_export_sql_manager',
                'name' => $this->trans('Export to SQL Manager', [], 'Admin.Actions'),
                'icon' => 'storage',
            ],
        ]);
    }
}

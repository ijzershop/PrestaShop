<?php
/**
 * 2007-2018 PrestaShop.
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

use PrestaShop\PrestaShop\Core\Form\FormChoiceProviderInterface;
use PrestaShop\PrestaShop\Core\Grid\Action\GridActionCollection;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\RowActionCollection;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\Type\LinkRowAction;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\Type\SubmitRowAction;
use PrestaShop\PrestaShop\Core\Grid\Action\Type\SimpleGridAction;
use PrestaShop\PrestaShop\Core\Grid\Action\Type\SubmitGridAction;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\ActionColumn;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\ToggleColumn;
use PrestaShopBundle\Form\Admin\Type\SearchAndResetType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use PrestaShop\PrestaShop\Core\Grid\Column\ColumnCollection;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\BulkActionColumn;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\DataColumn;
use PrestaShop\PrestaShop\Core\Grid\Filter\Filter;
use PrestaShop\PrestaShop\Core\Grid\Filter\FilterCollection;

/**
 * Class WebserviceDefinitionFactory is responsible for creating grid definition for Webservice grid
 */
final class WebserviceDefinitionFactory extends AbstractGridDefinitionFactory
{
    /**
     * @var array
     */
    private $statusChoices;

    /**
     * @var string
     */
    private $resetActionUrl;

    /**
     * @var string
     */
    private $redirectionUrl;

    /**
     * WebserviceDefinitionFactory constructor.
     *
     * @param array $statusChoices
     * @param $resetActionUrl
     * @param $redirectionUrl
     */
    public function __construct(
        array $statusChoices,
        $resetActionUrl,
        $redirectionUrl
    ) {
        $this->statusChoices = $statusChoices;
        $this->resetActionUrl = $resetActionUrl;
        $this->redirectionUrl = $redirectionUrl;
    }

    /**
     * {@inheritdoc}
     */
    protected function getId()
    {
        return 'webservice';
    }

    /**
     * {@inheritdoc}
     */
    protected function getName()
    {
        return $this->trans('Webservice', [], 'Admin.Navigation.Menu');
    }

    /**
     * {@inheritdoc}
     */
    protected function getColumns()
    {
        return (new ColumnCollection())
            ->add((new BulkActionColumn('bulk_action'))
                ->setOptions([
                    'bulk_field' => 'id_webservice_account'
                ])
            )
            ->add((new DataColumn('key'))
                ->setName($this->trans('Key', [], 'Admin.Advparameters.Feature'))
                ->setOptions([
                    'field' => 'key'
                ])
            )
            ->add((new DataColumn('description'))
                ->setName($this->trans('Key description', [], 'Admin.Advparameters.Feature'))
                ->setOptions([
                    'field' => 'description',
                    'sortable' => false
                ])
            )
            ->add((new ToggleColumn('active'))
                ->setName($this->trans('Enabled', [], 'Admin.Global'))
                ->setOptions([
                    'field' => 'active',
                    'primary_field' => 'id_webservice_account',
                    'route' => 'admin_webservice_status_toggle',
                    'route_param_id' => 'idWebserviceAccount'
                ])
            )
            ->add((new ActionColumn('actions'))
                ->setName($this->trans('Actions', [], 'Admin.Global'))
                ->setOptions([
                    'actions' =>  (new RowActionCollection())
                        ->add((new SubmitRowAction('delete'))
                            ->setIcon('delete')
                            ->setOptions([
                                'method' => 'DELETE',
                                'route' => 'admin_delete_single_webservice_log',
                                'route_param_name' => 'webserviceAccountId',
                                'route_param_field' => 'id_webservice_account',
                                'confirm_message' => $this->trans(
                                    'Delete selected item?',
                                    [],
                                    'Admin.Notifications.Warning'
                                ),
                            ])
                        ),
                ])
            );
    }

    protected function getFilters()
    {
        return (new FilterCollection())
            ->add((new Filter('key', TextType::class))
                ->setTypeOptions([
                    'required' => false
                ])
                ->setAssociatedColumn('key')
            )
            ->add((new Filter('description', TextType::class))
                ->setTypeOptions([
                    'required' => false
                ])
                ->setAssociatedColumn('description')
            )
            ->add((new Filter('active', ChoiceType::class))
                ->setTypeOptions([
                    'required' => false,
                    'choices' => $this->statusChoices,
                    'choice_translation_domain' => false,
                ])
                ->setAssociatedColumn('active')
            )
            ->add((new Filter('actions', SearchAndResetType::class))
                ->setTypeOptions([
                    'attr' => [
                        'data-url' => $this->resetActionUrl,
                        'data-redirect' => $this->redirectionUrl
                    ]
                ])
                ->setAssociatedColumn('actions')
            );
    }

    protected function getGridActions()
    {
        return (new GridActionCollection())
            ->add((new SubmitGridAction('add_webservice'))
                ->setName($this->trans('Add new', [], 'Admin.Actions'))
                ->setIcon('add')
                ->setOptions([
                    'submit_route' => 'admin_webservice', //todo: change to add webservice link
                    'submit_method' => 'GET'
                ])
            )
            ->add((new SimpleGridAction('common_refresh_list'))
                ->setName($this->trans('Refresh list', [], 'Admin.Advparameters.Feature'))
                ->setIcon('refresh')
            )
            ->add((new SimpleGridAction('common_show_query'))
                ->setName($this->trans('Show SQL query', [], 'Admin.Actions'))
                ->setIcon('code')
            )
            ->add((new SimpleGridAction('common_export_sql_manager'))
                ->setName($this->trans('Export to SQL Manager', [], 'Admin.Actions'))
                ->setIcon('storage')
            );

    }
}

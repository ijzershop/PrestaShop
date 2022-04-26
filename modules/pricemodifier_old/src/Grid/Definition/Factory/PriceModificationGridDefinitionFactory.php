<?php
/**
 * Price Modifier
 * Copyright since 2021 JB Stoker and Contributors
 * <JB Stoker> Property
 *

 * @author    JB Stoker
 * @copyright Since 2021 JB Stoker
 * @license   https://opensource.org/licenses/MIT
 */
declare(strict_types=1);

namespace Modernesmid\Module\Pricemodifier\Grid\Definition\Factory;

use PrestaShop\PrestaShop\Core\Grid\Action\Bulk\BulkActionCollection;
use PrestaShop\PrestaShop\Core\Grid\Action\Bulk\Type\SubmitBulkAction;
use PrestaShop\PrestaShop\Core\Grid\Action\GridActionCollection;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\RowActionCollection;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\Type\LinkRowAction;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\Type\SubmitRowAction;
use PrestaShop\PrestaShop\Core\Grid\Action\Type\SimpleGridAction;
use PrestaShop\PrestaShop\Core\Grid\Column\ColumnCollection;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\ActionColumn;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\BulkActionColumn;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\ToggleColumn;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\DataColumn;
use PrestaShop\PrestaShop\Core\Grid\Definition\Factory\AbstractGridDefinitionFactory;
use PrestaShop\PrestaShop\Core\Grid\Filter\Filter;
use PrestaShop\PrestaShop\Core\Grid\Filter\FilterCollection;
use PrestaShop\PrestaShop\Core\Hook\HookDispatcherInterface;
use PrestaShopBundle\Form\Admin\Type\SearchAndResetType;
use PrestaShopBundle\Form\Admin\Type\YesAndNoChoiceType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class PriceModificationGridDefinitionFactory extends AbstractGridDefinitionFactory
{
    public const GRID_ID = 'store_product';

    /**
     * @var string
     */
    private $resetActionUrl;

    /**
     * @var string
     */
    private $redirectionUr;

    /**
     * @param HookDispatcherInterface $hookDispatcher
     * @param string $resetActionUrl
     * @param string $redirectionUrl
     */
    public function __construct(
        HookDispatcherInterface $hookDispatcher,
        $resetActionUrl,
        $redirectionUrl
    ) {
        parent::__construct($hookDispatcher);
        $this->resetActionUrl = $resetActionUrl;
        $this->redirectionUr = $redirectionUrl;
    }

    /**
     * {@inheritdoc}
     */
    protected function getId()
    {
        return self::GRID_ID;
    }

    /**
     * {@inheritdoc}
     */
    protected function getName()
    {
        return $this->trans('PriceModifications', [], 'Modules.Pricemodifier.Admin');
    }

    /**
     * {@inheritdoc}
     */
    protected function getColumns()
    {
        return (new ColumnCollection())
            ->add((new BulkActionColumn('bulk'))
                ->setOptions([
                    'bulk_field' => 'id',
                ])
            )
            ->add((new DataColumn('id'))
                ->setName($this->trans('ID', [], 'Admin.Global'))
                ->setOptions([
                    'field' => 'id',
                    'sortable' => true,
                ])
            )
            ->add((new DataColumn('name_supplier'))
                ->setName($this->trans('Name', [], 'Modules.Pricemodifier.Admin'))
                ->setOptions([
                    'field' => 'name_supplier',
                ])
            )
            ->add((new DataColumn('id_store_product'))
                ->setName($this->trans('Product', [], 'Modules.Pricemodifier.Admin'))
                ->setOptions([
                    'field' => 'id_store_product',
                ])
            )
            ->add((new DataColumn('file_supplier'))
                ->setName($this->trans('File', [], 'Modules.Pricemodifier.Admin'))
                ->setOptions([
                    'field' => 'file_supplier',
                ])
            )
            ->add((new ToggleColumn('active'))
                ->setName($this->trans('Enabled', [], 'Admin.Global'))
                ->setOptions([
                    'field' => 'active',
                    'primary_field' => 'id',
                    'route' => 'modernesmid_pricemodifier_price_modification_toggle_status',
                    'route_param_name' => 'price_modificationId',
                ])
            )
            ->add((new ActionColumn('actions'))
                ->setName($this->trans('Actions', [], 'Admin.Global'))
                ->setOptions([
                    'actions' => (new RowActionCollection())
                        ->add((new LinkRowAction('edit'))
                            ->setName($this->trans('Edit', [], 'Admin.Actions'))
                            ->setIcon('edit')
                            ->setOptions([
                                'route' => 'modernesmid_pricemodifier_price_modification_edit',
                                'route_param_name' => 'price_modificationId',
                                'route_param_field' => 'id',
                                'clickable_row' => true,
                            ])
                        )
                        ->add((new SubmitRowAction('delete'))
                            ->setName($this->trans('Delete', [], 'Admin.Actions'))
                            ->setIcon('delete')
                            ->setOptions([
                                'method' => 'DELETE',
                                'route' => 'modernesmid_pricemodifier_price_modification_delete',
                                'route_param_name' => 'price_modificationId',
                                'route_param_field' => 'id',
                                'confirm_message' => $this->trans(
                                    'Delete selected item?',
                                    [],
                                    'Admin.Notifications.Warning'
                                ),
                            ])
                        ),
                ])
            )
            ;
    }

    /**
     * {@inheritdoc}
     */
    protected function getFilters()
    {
        return (new FilterCollection())
            ->add((new Filter('id', TextType::class))
                ->setTypeOptions([
                    'required' => false,
                    'attr' => [
                        'placeholder' => $this->trans('ID', [], 'Admin.Global'),
                    ],
                ])
                ->setAssociatedColumn('id')
            )
            ->add((new Filter('name_supplier', TextType::class))
                ->setTypeOptions([
                    'required' => false,
                    'attr' => [
                        'placeholder' => $this->trans('Supplier Product Name', [], 'Modules.Pricemodifier.Admin'),
                    ],
                ])
                ->setAssociatedColumn('name_supplier')
            )
            ->add((new Filter('file_supplier', ChoiceType::class))
                ->setTypeOptions([
                    'required' => false,
                    'choices' => [
                        'Douma' => 'douma',
                        'MCB' => 'mcb',
                        'Indi' => 'indi',
                        'Haquebord' => 'haquebord'
                    ],
                    'attr' => [
                        'placeholder' => $this->trans('File from', [], 'Modules.Pricemodifier.Admin'),
                    ],
                ])
                ->setAssociatedColumn('file_supplier')
            )
            ->add((new Filter('active', YesAndNoChoiceType::class))
                ->setTypeOptions([
                    'required' => false,
                    'choice_translation_domain' => false,
                ])
                ->setAssociatedColumn('active')
            )
            ->add((new Filter('actions', SearchAndResetType::class))
                ->setTypeOptions([
                    'attr' => [
                        'data-url' => $this->resetActionUrl,
                        'data-redirect' => $this->redirectionUr,
                    ],
                    'reset_route' => 'admin_common_reset_search_by_filter_id',
                    'reset_route_params' => [
                        'filterId' => self::GRID_ID,
                    ],
                    'redirect_route' => 'modernesmid_pricemodifier_price_modification_index',
                ])
                ->setAssociatedColumn('actions')
            )
            ;
    }

    /**
     * {@inheritdoc}
     */
    protected function getGridActions()
    {
        return (new GridActionCollection())
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
            )
            ;
    }

    /**
     * {@inheritdoc}
     */
    protected function getBulkActions()
    {
        return (new BulkActionCollection())
            ->add((new SubmitBulkAction('delete_bulk'))
                ->setName($this->trans('Delete selected', [], 'Admin.Actions'))
                ->setOptions([
                    'submit_route' => 'modernesmid_pricemodifier_price_modification_bulk_delete',
                    'confirm_message' => $this->trans('Delete selected items?', [], 'Admin.Notifications.Warning'),
                ])
            )
            ;
    }
}

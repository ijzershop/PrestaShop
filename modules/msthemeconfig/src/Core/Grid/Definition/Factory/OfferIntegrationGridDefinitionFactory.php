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

namespace MsThemeConfig\Core\Grid\Definition\Factory;

use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Db;
use PrestaShop\PrestaShop\Adapter\Entity\DbQuery;
use PrestaShop\PrestaShop\Adapter\Entity\Product;
use PrestaShop\PrestaShop\Adapter\Entity\Shop;
use PrestaShop\PrestaShop\Core\Domain\Product\ValueObject\ProductType;
use PrestaShop\PrestaShop\Core\Grid\Action\Bulk\BulkActionCollection;
use PrestaShop\PrestaShop\Core\Grid\Action\Bulk\BulkActionCollectionInterface;
use PrestaShop\PrestaShop\Core\Grid\Action\Bulk\Type\SubmitBulkAction;
use PrestaShop\PrestaShop\Core\Grid\Action\GridActionCollection;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\RowActionCollection;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\Type\LinkRowAction;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\Type\SubmitRowAction;
use PrestaShop\PrestaShop\Core\Grid\Action\Type\SimpleGridAction;
use PrestaShop\PrestaShop\Core\Grid\Column\ColumnCollection;
use PrestaShop\PrestaShop\Core\Grid\Column\ColumnCollectionInterface;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\ActionColumn;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\BulkActionColumn;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\DateTimeColumn;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\ToggleColumn;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\DataColumn;
use PrestaShop\PrestaShop\Core\Grid\Data\GridData;
use PrestaShop\PrestaShop\Core\Grid\Definition\Factory\AbstractGridDefinitionFactory;
use PrestaShop\PrestaShop\Core\Grid\Filter\Filter;
use PrestaShop\PrestaShop\Core\Grid\Filter\FilterCollection;
use PrestaShop\PrestaShop\Core\Grid\Record\RecordCollection;
use PrestaShop\PrestaShop\Core\Grid\Search\SearchCriteriaInterface;
use PrestaShop\PrestaShop\Core\Hook\HookDispatcherInterface;
use PrestaShopBundle\Form\Admin\Type\DateRangeType;
use PrestaShopBundle\Form\Admin\Type\SearchAndResetType;
use PrestaShopBundle\Form\Admin\Type\YesAndNoChoiceType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

/**
 *
 */
class OfferIntegrationGridDefinitionFactory extends AbstractGridDefinitionFactory
{
    public const GRID_ID = 'oi_offer';

    /**
     * @var string
     */
    private string $resetActionUrl;

    /**
     * @var string
     */
    private string $redirectionUr;
    private \Context $context;

    /**
     * @param HookDispatcherInterface $hookDispatcher
     * @param string $resetActionUrl
     * @param string $redirectionUrl
     */
    public function __construct(
        HookDispatcherInterface $hookDispatcher,
        string                  $resetActionUrl = '',
                                $redirectionUrl = ''
    ) {
        parent::__construct($hookDispatcher);
        $this->resetActionUrl = $resetActionUrl;
        $this->redirectionUr = $redirectionUrl;
        $this->context = Context::getContext();
    }

    /**
     * {@inheritdoc}
     */
    protected function getId(): string
    {
        return self::GRID_ID;
    }

    /**
     * {@inheritdoc}
     */
    protected function getName(): string
    {
        return $this->trans('OfferIntegrations', [], 'Modules.MsThemeConfig.OfferIntegrationGridDefinitionFactory');
    }

    /**
     * {@inheritdoc}
     */
    protected function getColumns(): ColumnCollectionInterface|ColumnCollection
    {
        return (new ColumnCollection())
            ->add((new BulkActionColumn('bulk'))
                ->setOptions([
                    'bulk_field' => 'id_oi_offer',
                ])
            )
            ->add((new DataColumn('id_oi_offer'))
                ->setName($this->trans('ID', [], 'Admin.Global'))
                ->setOptions([
                    'field' => 'id_oi_offer',
                    'sortable' => true,
                ])
            )
            ->add((new DataColumn('code'))
                ->setName($this->trans('Code', [], 'Modules.MsThemeConfig.OfferIntegrationGridDefinitionFactory'))
                ->setOptions([
                    'field' => 'code',
                ])
            )
            ->add((new DataColumn('name'))
                ->setName($this->trans('Name', [], 'Modules.MsThemeConfig.OfferIntegrationGridDefinitionFactory'))
                ->setOptions([
                    'field' => 'name',
                    'sortable' => true,
                ])
            )
            ->add((new DataColumn('email'))
                ->setName($this->trans('Email', [], 'Modules.MsThemeConfig.OfferIntegrationGridDefinitionFactory'))
                ->setOptions([
                    'field' => 'email',
                    'sortable' => true,
                ])
            )
            ->add((new DataColumn('phone'))
                ->setName($this->trans('Phone', [], 'Admin.Global'))
                ->setOptions([
                    'field' => 'phone',
                    'sortable' => true,
                ]))

            ->add((new DataColumn('message'))
                ->setName($this->trans('Message', [], 'Admin.Global'))
                ->setOptions([
                    'field' => 'message',
                    'sortable' => false,
                ])
            )
            ->add((new DateTimeColumn('date_exp'))
                ->setName($this->trans('Exp. date', [], 'Admin.Global'))
                ->setOptions([
                    'field' => 'date_exp',
                    'sortable' => false,
                ])
            )
            ->add((new DateTimeColumn('date_upd'))
                ->setName($this->trans('Updated record', [], 'Modules.MsThemeConfig.OfferIntegrationGridDefinitionFactory'))
                ->setOptions([
                    'field' => 'date_upd',
                    'sortable' => true,
                ])
            )
            ->add((new ActionColumn('actions'))
                ->setName($this->trans('Actions', [], 'Admin.Global'))
                ->setOptions([
                    'actions' => (new RowActionCollection())
                        ->add((new SubmitRowAction('send_email'))
                            ->setName($this->trans('Send ', [], 'Admin.Actions'))
                            ->setIcon('edit')
                            ->setOptions([
                                'route' => 'offerintegration_send_email',
                                'route_param_name' => 'offer_id',
                                'route_param_field' =>  'id_oi_offer',
                                'confirm_message' => $this->trans(
                                    'Weet u zeker dat u een email naar de klant wilt verzenden?',
                                    [],
                                    'Admin.Notifications.Warning'
                                ),
                            ])
                        )
                        ->add((new SubmitRowAction('edit_offer'))
                            ->setName($this->trans('Edit ', [], 'Admin.Actions'))
                            ->setIcon('edit')
                            ->setOptions([
                                'route' => 'offerintegration_edit',
                                'route_param_name' => 'offer_id',
                                'route_param_field' =>  'id_oi_offer',
                                'confirm_message' => $this->trans(
                                    'Weet u zeker dat u de instellingen van deze offerte wilt wijzigen?',
                                    [],
                                    'Admin.Notifications.Warning'
                                ),
                            ])
                        )
                        ->add((new SubmitRowAction('delete'))
                            ->setName($this->trans('Delete', [], 'Admin.Actions'))
                            ->setIcon('delete')
                            ->setOptions([
                                'method' => 'DELETE',
                                'route' => 'offerintegration_delete',
                                'route_param_name' => 'offer_id',
                                'route_param_field' => 'id_oi_offer',
                                'confirm_message' => $this->trans(
                                    'Weet u zeker dat u deze offerte wilt verwijderen?',
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
        $id_lang = $this->context->language->id;

        return (new FilterCollection())
            ->add((new Filter('id_oi_offer', TextType::class))
                ->setTypeOptions([
                    'required' => false,
                    'attr' => [
                        'placeholder' => $this->trans('ID', [], 'Admin.Global'),
                    ],
                ])
                ->setAssociatedColumn('id_oi_offer')
            )
            ->add((new Filter('code', TextType::class))
                ->setTypeOptions([
                    'required' => false,
                    'attr' => [
                        'placeholder' => $this->trans('Code', [], 'Modules.MsThemeConfig.OfferIntegrationGridDefinitionFactory'),
                    ],
                ])
                ->setAssociatedColumn('code')
            )
            ->add((new Filter('name', TextType::class))
                ->setTypeOptions([
                    'required' => false,
                    'attr' => [
                        'placeholder' => $this->trans('Name', [], 'Modules.MsThemeConfig.OfferIntegrationGridDefinitionFactory'),
                    ],
                ])
                ->setAssociatedColumn('name')
            )
            ->add((new Filter('email', TextType::class))
                ->setTypeOptions([
                    'required' => false,
                    'attr' => [
                        'placeholder' => $this->trans('email', [], 'Modules.MsThemeConfig.OfferIntegrationGridDefinitionFactory'),
                    ],
                ])
                ->setAssociatedColumn('email')
            )
            ->add((new Filter('phone', TextType::class))
                ->setTypeOptions([
                    'required' => false,
                    'attr' => [
                        'placeholder' => $this->trans('Phone', [], 'Modules.MsThemeConfig.OfferIntegrationGridDefinitionFactory'),
                    ],
                ])
                ->setAssociatedColumn('phone')
            )
            ->add((new Filter('message', TextType::class))
                ->setTypeOptions([
                    'required' => false,
                    'attr' => [
                        'placeholder' => $this->trans('Message', [], 'Modules.MsThemeConfig.OfferIntegrationGridDefinitionFactory'),
                    ],
                ])
                ->setAssociatedColumn('message')
            )
            ->add((new Filter('date_exp', DateRangeType::class))
                ->setTypeOptions([
                    'required' => false,
                    'date_format' => 'YYYY-MM-DD',
                ])
                ->setAssociatedColumn('date_exp')
            )
            ->add((new Filter('date_upd', DateRangeType::class))
                ->setTypeOptions([
                    'required' => false,
                    'date_format' => 'YYYY-MM-DD',
                ])
                ->setAssociatedColumn('date_upd')
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
                    'redirect_route' => 'offerintegration_index',
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
                ->setName($this->trans('Refresh list', [], 'Admin.parameters.Feature'))
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
    protected function getBulkActions(): BulkActionCollection|BulkActionCollectionInterface
    {

        return (new BulkActionCollection())
            ->add((new SubmitBulkAction('delete_bulk'))
                ->setName($this->trans('Delete selected', [], 'Admin.Actions'))
                ->setOptions([
                    'submit_route' => 'offerintegration_bulk_delete',
                    'confirm_message' => $this->trans('Delete selected items?', [], 'Admin.Notifications.Warning'),
                ])
            );
    }
}

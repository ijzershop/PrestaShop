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

use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Db;
use PrestaShop\PrestaShop\Adapter\Entity\DbQuery;
use PrestaShop\PrestaShop\Adapter\Entity\Product;
use PrestaShop\PrestaShop\Adapter\Entity\Shop;
use PrestaShop\PrestaShop\Core\Domain\Product\ValueObject\ProductType;
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
use PrestaShop\PrestaShop\Core\Grid\Data\GridData;
use PrestaShop\PrestaShop\Core\Grid\Definition\Factory\AbstractGridDefinitionFactory;
use PrestaShop\PrestaShop\Core\Grid\Filter\Filter;
use PrestaShop\PrestaShop\Core\Grid\Filter\FilterCollection;
use PrestaShop\PrestaShop\Core\Grid\Record\RecordCollection;
use PrestaShop\PrestaShop\Core\Grid\Search\SearchCriteriaInterface;
use PrestaShop\PrestaShop\Core\Hook\HookDispatcherInterface;
use PrestaShopBundle\Form\Admin\Type\SearchAndResetType;
use PrestaShopBundle\Form\Admin\Type\YesAndNoChoiceType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class PriceModificationGridDefinitionFactory extends AbstractGridDefinitionFactory
{
    public const GRID_ID = 'product_price_modification';

    /**
     * @var string
     */
    private $resetActionUrl;

    /**
     * @var string
     */
    private $redirectionUr;
    private $context;

    /**
     * @param HookDispatcherInterface $hookDispatcher
     * @param string $resetActionUrl
     * @param string $redirectionUrl
     */
    public function __construct(
        HookDispatcherInterface $hookDispatcher,
        $resetActionUrl = '',
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
                    'sortable' => true,
                ])
            )
            ->add((new DataColumn('id_category_default'))
                ->setName($this->trans('Store Category', [], 'Modules.Pricemodifier.Admin'))
                ->setOptions([
                    'field' => 'id_category_default',
                    'sortable' => true,
                ])
            )
            ->add((new DataColumn('supplier_data'))
                ->setName($this->trans('Uploaded XML Prices', [], 'Admin.Global'))
                ->setOptions([
                    'field' => 'supplier_data',
                    'sortable' => false,
                ]))

            ->add((new DataColumn('price_formula'))
                ->setName($this->trans('Price Formula', [], 'Admin.Global'))
                ->setOptions([
                    'field' => 'id',
                    'sortable' => true,
                ])
            )
            ->add((new DataColumn('increment_formula'))
                ->setName($this->trans('Increment Formula', [], 'Admin.Global'))
                ->setOptions([
                    'field' => 'id',
                    'sortable' => true,
                ])
            )
            ->add((new DataColumn('store_price'))
                ->setName($this->trans('Store Price', [], 'Admin.Global'))
                ->setOptions([
                    'field' => 'id',
                    'sortable' => true,
                ])
            )
            ->add((new DataColumn('new_price'))
                ->setName($this->trans('New Price', [], 'Admin.Global'))
                ->setOptions([
                    'field' => 'id',
                    'sortable' => true,
                ])
            )
            ->add((new DataColumn('chart'))
                ->setName($this->trans('Chart', [], 'Admin.Global'))
                ->setOptions([
                    'field' => 'id',
                    'sortable' => false,
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
                        ->add((new SubmitRowAction('update_product'))
                            ->setName($this->trans('Update product settings', [], 'Admin.Actions'))
                            ->setIcon('update')
                            ->setOptions([
                                'route' => 'modernesmid_pricemodifier_price_modification_save_product_settings',
                                'route_param_name' => 'price_modificationId',
                                'route_param_field' =>  'id',
                                'confirm_message' => $this->trans(
                                    'Weet u zeker dat u de instellingen van dit product wilt wijzigen?',
                                    [],
                                    'Admin.Notifications.Warning'
                                ),
                            ])
                        )
                        ->add((new SubmitRowAction('update_product_price'))
                            ->setName($this->trans('Update price', [], 'Admin.Actions'))
                            ->setIcon('loop')
                            ->setOptions([
                                'route' => 'modernesmid_pricemodifier_price_modification_save_product_price',
                                'route_param_name' => 'price_modificationId',
                                'route_param_field' =>  'id',
                                'confirm_message' => $this->trans(
                                    'Weet u zeker dat u de nieuwe prijs wilt doorvoeren?',
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
        $id_lang = $this->context->language->id;

        $customCategory = Configuration::get('MODERNESMIDTHEMECONFIGURATOR_CUSTOM_PRODUCT_CATEGORY', null);

        $sqlProducts = new DbQuery();
        $sqlProducts->select('p.`id_product` as id, p.`id_category_default`, CONCAT(pl.`name`, " - " , clp.`name`," ", cl.`name`) as text');
        $sqlProducts->from('product', 'p');
        $sqlProducts->join(Shop::addSqlAssociation('product', 'p'));
        $sqlProducts->leftJoin(
            'product_lang',
            'pl',
            'p.`id_product` = pl.`id_product`
            AND pl.`id_lang` = ' . (int) $id_lang . Shop::addSqlRestrictionOnLang('pl')
        );
        $sqlProducts->leftJoin('category', 'c', 'c.`id_category` = p.`id_category_default`');
        $sqlProducts->leftJoin('category_lang', 'cl', 'cl.`id_category` = c.`id_category`');
        $sqlProducts->leftJoin('category_lang', 'clp', 'clp.`id_category` = c.`id_parent`');
        $sqlProducts->where('c.level_depth > 1');
        $sqlProducts->where('p.id_category_default != '.$customCategory);
        $sqlProducts->orderBy('cl.`name` ASC');
        $sqlProducts->limit('1500');

        $products = Db::getInstance()->executeS($sqlProducts);
        uasort($products, function ($x, $y) {
            return $x['text'] <=> $y['text'];
        });
        $productList = array_combine(array_column($products,'text'), array_column($products,'id'));


        $sqlCategories = new DbQuery();
        $sqlCategories->select('c.`id_category` as id, CONCAT(clp.`name`," - ", cl.`name`) as text');
        $sqlCategories->from('category', 'c');
        $sqlCategories->leftJoin('category_lang', 'cl', 'cl.`id_category` = c.`id_category`');
        $sqlCategories->leftJoin('category_lang', 'clp', 'clp.`id_category` = c.`id_parent`');
        $sqlCategories->where('c.level_depth > 1');
        $sqlProducts->where('p.id_category_default != '.$customCategory);
        $sqlCategories->orderBy('cl.`name` ASC');
        $sqlCategories->limit('1500');
        $categories = Db::getInstance()->executeS($sqlCategories);

        uasort($categories, function ($x, $y) {
            return $x['text'] <=> $y['text'];
        });
        $categoryList = array_combine(array_column($categories,'text'), array_column($categories,'id'));

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
            ->add((new Filter('id_store_product', ChoiceType::class))
                ->setTypeOptions([
                    'required' => false,
                    'choices' => $productList,
                    'attr' => [
                        'placeholder' => $this->trans('Selected store product', [], 'Modules.Pricemodifier.Admin'),
                    ],
                ])
                ->setAssociatedColumn('id_store_product')
            )->add((new Filter('id_category_default', ChoiceType::class))
                ->setTypeOptions([
                    'required' => false,
                    'choices' => $categoryList,
                    'attr' => [
                        'placeholder' => $this->trans('Selected store product category', [], 'Modules.Pricemodifier.Admin'),
                    ],
                ])
                ->setAssociatedColumn('id_category_default')
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
            ->add((new SubmitBulkAction('update_settings_bulk'))
                ->setName($this->trans('Update product settings', [], 'Admin.Actions'))
                ->setOptions([
                    'submit_route' => 'modernesmid_pricemodifier_price_modification_save_bulk_product_settings',
                    'confirm_message' => $this->trans('Update settings of all selected rows?', [], 'Admin.Notifications.Warning'),
                ])
            )
            ->add((new SubmitBulkAction('update_prices_bulk'))
                ->setName($this->trans('Update product prices', [], 'Admin.Actions'))
                ->setOptions([
                    'submit_route' => 'modernesmid_pricemodifier_price_modification_save_bulk_product_prices',
                    'confirm_message' => $this->trans('Update prices of all selected rows?', [], 'Admin.Notifications.Warning'),
                ])
            )
            ->add((new SubmitBulkAction('delete_bulk'))
                ->setName($this->trans('Delete selected', [], 'Admin.Actions'))
                ->setOptions([
                    'submit_route' => 'modernesmid_pricemodifier_price_modification_bulk_delete',
                    'confirm_message' => $this->trans('Delete selected items?', [], 'Admin.Notifications.Warning'),
                ])
            );
    }
}

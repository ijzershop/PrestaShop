<?php

// declare(strict_types=1);

namespace MsThemeConfig\Controller\Admin;

use Category;
use PrestaShop\PrestaShop\Adapter\Shop\Url\CategoryProvider;
use PrestaShop\PrestaShop\Core\CommandBus\CommandBusInterface;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CannotAddCategoryException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CannotDeleteImageException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CannotDeleteRootCategoryForShopException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CannotEditCategoryException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CannotEditRootCategoryException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CannotUpdateCategoryStatusException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CategoryConstraintException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CategoryException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CategoryNotFoundException;
use PrestaShop\PrestaShop\Core\Domain\Category\Query\GetCategoryForEditing;
use PrestaShop\PrestaShop\Core\Domain\Category\QueryResult\EditableCategory;
use PrestaShop\PrestaShop\Adapter\Feature\MultistoreFeature;
use PrestaShop\PrestaShop\Core\Form\IdentifiableObject\Builder\FormBuilderInterface;
use PrestaShop\PrestaShop\Core\Form\IdentifiableObject\Handler\FormHandlerInterface;
use PrestaShop\PrestaShop\Core\Grid\Definition\Factory\CategoryGridDefinitionFactory;
use PrestaShop\PrestaShop\Core\Group\Provider\DefaultGroupsProviderInterface;
use PrestaShopBundle\Controller\Admin\PrestaShopAdminController;
use PrestaShopBundle\Security\Attribute\AdminSecurity;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class DmsAdminCustomerController.
 */
class DmsAdminCategoryController extends PrestaShopAdminController
{
    /**
     * Show & process category editing.
     *
     * @param int $categoryId
     * @param Request $request
     *
     * @return Response
     */
    #[AdminSecurity(
        "is_granted('read', request.get('_legacy_controller')) && is_granted('update', request.get('_legacy_controller'))",
        message: 'You do not have permission to edit this.',
        redirectRoute: 'admin_categories_index'
    )]
    public function editAction(
        int $categoryId,
        Request $request,
        #[Autowire(service: 'prestashop.core.form.identifiable_object.builder.category_form_builder')]
        FormBuilderInterface $categoryFormBuilder,
        #[Autowire(service: 'prestashop.core.form.identifiable_object.handler.category_form_handler')]
        FormHandlerInterface $categoryFormHandler,
        #[Autowire(service: 'prestashop.adapter.group.provider.default_groups_provider')]
        DefaultGroupsProviderInterface $defaultGroupsProvider,
        #[Autowire(service: 'prestashop.adapter.shop.url.category_provider')]
        CategoryProvider $categoryUrlProvider,
        #[Autowire(service: 'prestashop.core.command_bus')]
        CommandBusInterface $commandBus
    ): Response {
        try {
            /** @var EditableCategory $editableCategory */
            $editableCategory = $commandBus->handle(new GetCategoryForEditing((int) $categoryId));

            if ($editableCategory->isRootCategory()) {
                return $this->redirectToRoute('admin_categories_edit_root', ['categoryId' => $categoryId]);
            }
        } catch (CategoryException $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages()));

            return $this->redirectToRoute('admin_categories_index');
        }

        $categoryFormOptions = [
            'id_category' => (int) $categoryId,
            'subcategories' => $editableCategory->getSubCategories(),
        ];

        try {
            $categoryForm = $categoryFormBuilder->getFormFor((int) $categoryId, [], $categoryFormOptions);
        } catch (\Exception $exception) {
            $this->addFlash('error', $this->getErrorMessageForException($exception, $this->getErrorMessages()));

            return $this->redirectToRoute('admin_categories_index');
        }

        try {
            $categoryForm->handleRequest($request);
            $handlerResult = $categoryFormHandler->handleFor((int) $categoryId, $categoryForm);

            if ($handlerResult->isSubmitted() && $handlerResult->isValid()) {
                $this->addFlash('success', $this->trans('Successful update.', [], 'Admin.Notifications.Success'));

                return $this->redirectToRoute('admin_categories_index', [
                    'categoryId' => $categoryForm->getData()['id_parent'],
                ]);
            }
        } catch (\Exception $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages()));
        }

        $defaultGroups = $defaultGroupsProvider->getGroups();

        $category = new Category($categoryId);
        $langId = $this->getLanguageContext()->getId();
        $editableCategory->top_description = $category->top_description[$langId] ?? '';
        $editableCategory->second_name = $category->second_name[$langId] ?? '';
        $editableCategory->jsonld = $category->jsonld;

        return $this->render(
            '@PrestaShop/Admin/Sell/Catalog/Categories/edit.html.twig',
            [
                'contextLangId' => $this->getLanguageContext()->getId(),
                'editCategoryForm' => $categoryForm->createView(),
                'editableCategory' => $editableCategory,
                'defaultGroups' => $defaultGroups,
                'categoryUrl' => $categoryUrlProvider->getUrl($categoryId, '{friendly-url}'),
            ]
        );
    }

    #[AdminSecurity(
        "is_granted('read', request.get('_legacy_controller')) && is_granted('update', request.get('_legacy_controller'))",
        message: 'You do not have permission to edit this.',
        redirectRoute: 'admin_categories_index'
    )]
    public function editRootAction(
        $categoryId,
        Request $request,
        #[Autowire(service: 'prestashop.core.form.identifiable_object.builder.root_category_form_builder')]
        FormBuilderInterface $rootCategoryFormBuilder,
        #[Autowire(service: 'prestashop.core.form.identifiable_object.handler.root_category_form_handler')]
        FormHandlerInterface $rootCategoryFormHandler,
        #[Autowire(service: 'prestashop.adapter.group.provider.default_groups_provider')]
        DefaultGroupsProviderInterface $defaultGroupsProvider,
        #[Autowire(service: 'prestashop.adapter.shop.url.category_provider')]
        CategoryProvider $categoryUrlProvider,
        #[Autowire(service: 'prestashop.core.command_bus')]
        CommandBusInterface $commandBus
    ) {
        try {
            /** @var EditableCategory $editableCategory */
            $editableCategory = $commandBus->handle(new GetCategoryForEditing((int) $categoryId));

            if (!$editableCategory->isRootCategory()) {
                return $this->redirectToRoute('admin_categories_edit', ['categoryId' => $categoryId]);
            }
        } catch (CannotEditRootCategoryException|CategoryNotFoundException $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages()));

            return $this->redirectToRoute('admin_categories_index');
        }

        try {
            $rootCategoryForm = $rootCategoryFormBuilder->getFormFor((int) $categoryId);
        } catch (\Exception $exception) {
            $this->addFlash('error', $this->getErrorMessageForException($exception, $this->getErrorMessages()));

            return $this->redirectToRoute('admin_categories_index');
        }

        try {
            $rootCategoryForm->handleRequest($request);
            $handlerResult = $rootCategoryFormHandler->handleFor((int) $categoryId, $rootCategoryForm);

            if ($handlerResult->isSubmitted() && $handlerResult->isValid()) {
                $this->addFlash('success', $this->trans('Successful update.', [], 'Admin.Notifications.Success'));

                return $this->redirectToRoute('admin_categories_index', [
                    'categoryId' => (int) $this->getConfiguration()->get('PS_ROOT_CATEGORY'),
                ]);
            }
        } catch (\Exception $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages()));
        }

        $defaultGroups = $defaultGroupsProvider->getGroups();

        $category = new \PrestaShop\PrestaShop\Adapter\Entity\Category($categoryId);

        $langId = $this->getLanguageContext()->getId();
        $editableCategory->top_description = $category->top_description[$langId] ?? '';
        $editableCategory->second_name = $category->second_name[$langId] ?? '';
        $editableCategory->jsonld = $category->jsonld;

        return $this->render(
            '@PrestaShop/Admin/Sell/Catalog/Categories/edit_root.html.twig',
            [
                'contextLangId' => $this->getLanguageContext()->getId(),
                'editRootCategoryForm' => $rootCategoryForm->createView(),
                'editableCategory' => $editableCategory,
                'defaultGroups' => $defaultGroups,
                'categoryUrl' => $categoryUrlProvider->getUrl($categoryId, '{friendly-url}'),
            ]
        );
    }

    //    /**
    //     * Show & process category editing.
    //     *
    //     * @AdminSecurity(
    //     *     "is_granted(['update'], request.get('_legacy_controller'))",
    //     *     message="You do not have permission to edit this.",
    //     *     redirectRoute="admin_categories_index"
    //     * )
    //     *
    //     * @param int $categoryId
    //     * @param Request $request
    //     *
    //     * @return Response
    //     */
    //    public function editAction($categoryId, Request $request)
    //    {
    //        try {
    //            /** @var EditableCategory $editableCategory */
    //            $editableCategory = $this->getQueryBus()->handle(new GetCategoryForEditing((int) $categoryId));
    //
    //            if ($editableCategory->isRootCategory()) {
    //                return $this->redirectToRoute('admin_categories_edit_root', ['categoryId' => $categoryId]);
    //            }
    //        } catch (CategoryException $e) {
    //            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages()));
    //
    //            return $this->redirectToRoute('admin_categories_index');
    //        }
    //
    //        $categoryFormBuilder = $this->get('prestashop.core.form.identifiable_object.builder.category_form_builder');
    //        $categoryFormHandler = $this->get('prestashop.core.form.identifiable_object.handler.category_form_handler');
    //
    //        $categoryFormOptions = [
    //            'id_category' => (int) $categoryId,
    //            'subcategories' => $editableCategory->getSubCategories(),
    //        ];
    //
    //        try {
    //            $categoryForm = $categoryFormBuilder->getFormFor((int) $categoryId, [], $categoryFormOptions);
    //        } catch (Exception $exception) {
    //            $this->addFlash('error', $this->getErrorMessageForException($exception, $this->getErrorMessages()));
    //
    //            return $this->redirectToRoute('admin_categories_index');
    //        }
    //
    //        try {
    //            $categoryForm->handleRequest($request);
    //            $handlerResult = $categoryFormHandler->handleFor((int) $categoryId, $categoryForm);
    //
    //            if ($handlerResult->isSubmitted() && $handlerResult->isValid()) {
    //                $this->addFlash('success', $this->trans('Successful update.', 'Admin.Notifications.Success'));
    //
    //                return $this->redirectToRoute('admin_categories_index', [
    //                    'categoryId' => $categoryForm->fetchDataFromKiyohServer()['id_parent'],
    //                ]);
    //            }
    //        } catch (Exception $e) {
    //            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages()));
    //        }
    //
    //        $defaultGroups = $this->get('prestashop.adapter.group.provider.default_groups_provider')->getGroups();
    //
    //        $category = new Category($categoryId);
    //        $editableCategory->top_description = $category->top_description[$this->getContext()->language->id];
    //        $editableCategory->second_name = $category->second_name[$this->getContext()->language->id];
    //
    //        return $this->render(
    //            '@PrestaShop/Admin/Sell/Catalog/Categories/edit.html.twig',
    //            [
    //                'allowMenuThumbnailsUpload' => $editableCategory->canContainMoreMenuThumbnails(),
    //                'maxMenuThumbnails' => count(MenuThumbnailId::ALLOWED_ID_VALUES),
    //                'contextLangId' => $this->getContextLangId(),
    //                'editCategoryForm' => $categoryForm->createView(),
    //                'editableCategory' => $editableCategory,
    //                'defaultGroups' => $defaultGroups,
    //                'categoryUrl' => $this->get('prestashop.adapter.shop.url.category_provider')
    //                    ->getUrl($categoryId, '{friendly-url}'),
    //            ]
    //        );
    //    }

    /**
     * @param Request $request
     *
     * @return bool
     */
    private function requestHasSearchParameters(Request $request)
    {
        return !empty($request->query->get(CategoryGridDefinitionFactory::GRID_ID)['filters']);
    }

    /**
     * @param Request $request
     *
     * @return array
     */
    private function getCategoryToolbarButtons(
        Request $request,
        #[Autowire(service: 'prestashop.adapter.feature.multistore')]
        MultistoreFeature $multistoreFeature
    ) {
        $toolbarButtons = [];

        if ($multistoreFeature->isUsed()) {
            $toolbarButtons['add_root'] = [
                'href' => $this->generateUrl('admin_categories_create_root'),
                'desc' => $this->trans('Add new root category', [], 'Admin.Catalog.Feature'),
                'icon' => 'add_circle_outline',
            ];
        }

        $categoryId = $request->attributes->get('categoryId');
        if (empty($categoryId)) {
            $categoryId = (int) $this->getConfiguration()->get('PS_HOME_CATEGORY');
        }

        $toolbarButtons['add'] = [
            'href' => $this->generateUrl('admin_categories_create', ['id_parent' => $categoryId]),
            'desc' => $this->trans('Add new category', [], 'Admin.Catalog.Feature'),
            'icon' => 'add_circle_outline',
        ];

        return $toolbarButtons;
    }

    /**
     * Get translated error messages for category exceptions
     *
     * @return array
     */
    private function getErrorMessages()
    {
        return [
            CannotDeleteImageException::class => $this->trans('Unable to delete associated images.', [], 'Admin.Notifications.Error'),
            CategoryNotFoundException::class => $this->trans('The object cannot be loaded (or found)', [], 'Admin.Notifications.Error'),
            CategoryConstraintException::class => [
                CategoryConstraintException::EMPTY_BULK_DELETE_DATA => $this->trans('You must select at least one element to delete.', [], 'Admin.Notifications.Error'),
            ],
            CannotDeleteRootCategoryForShopException::class => $this->trans(
                'You cannot remove this category because one of your shops uses it as a root category.',
                [],
                'Admin.Catalog.Notification'
            ),
            CannotAddCategoryException::class => $this->trans(
                'An error occurred while creating the category.',
                [],
                'Admin.Catalog.Notification'
            ),
            CannotEditRootCategoryException::class => $this->trans(
                'The root category of a shop cannot be edited.',
                [],
                'Admin.Catalog.Notification'
            ),
            CannotEditCategoryException::class => $this->trans(
                'An error occurred while editing the category.',
                [],
                'Admin.Catalog.Notification'
            ),
            CannotUpdateCategoryStatusException::class => $this->trans(
                'An error occurred while updating the status for an object.',
                [],
                'Admin.Notifications.Error'
            ),
        ];
    }
}

<?php
//declare(strict_types=1);

namespace MsThemeConfig\Controller\Admin;


use Exception;
use PrestaShop\PrestaShop\Core\Domain\Category\Command\BulkDeleteCategoriesCommand;
use PrestaShop\PrestaShop\Core\Domain\Category\Command\BulkDisableCategoriesCommand;
use PrestaShop\PrestaShop\Core\Domain\Category\Command\BulkEnableCategoriesCommand;
use PrestaShop\PrestaShop\Core\Domain\Category\Command\DeleteCategoryCommand;
use PrestaShop\PrestaShop\Core\Domain\Category\Command\DeleteCategoryCoverImageCommand;
use PrestaShop\PrestaShop\Core\Domain\Category\Command\DeleteCategoryMenuThumbnailImageCommand;
use PrestaShop\PrestaShop\Core\Domain\Category\Command\SetCategoryIsEnabledCommand;
use PrestaShop\PrestaShop\Core\Domain\Category\Command\UpdateCategoryPositionCommand;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CannotAddCategoryException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CannotDeleteImageException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CannotDeleteRootCategoryForShopException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CannotEditCategoryException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CannotEditRootCategoryException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CannotUpdateCategoryStatusException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CategoryConstraintException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CategoryException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\CategoryNotFoundException;
use PrestaShop\PrestaShop\Core\Domain\Category\Exception\MenuThumbnailsLimitException;
use PrestaShop\PrestaShop\Core\Domain\Category\Query\GetCategoriesTree;
use PrestaShop\PrestaShop\Core\Domain\Category\Query\GetCategoryForEditing;
use PrestaShop\PrestaShop\Core\Domain\Category\Query\GetCategoryIsEnabled;
use PrestaShop\PrestaShop\Core\Domain\Category\QueryResult\CategoryForTree;
use PrestaShop\PrestaShop\Core\Domain\Category\QueryResult\EditableCategory;
use PrestaShop\PrestaShop\Core\Domain\Category\ValueObject\MenuThumbnailId;
use PrestaShop\PrestaShop\Core\Domain\ShowcaseCard\Query\GetShowcaseCardIsClosed;
use PrestaShop\PrestaShop\Core\Domain\ShowcaseCard\ValueObject\ShowcaseCard;
use PrestaShop\PrestaShop\Core\Grid\Definition\Factory\CategoryGridDefinitionFactory;
use PrestaShop\PrestaShop\Core\Search\Filters\CategoryFilters;
use PrestaShopBundle\Component\CsvResponse;
use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;
use PrestaShopBundle\Form\Admin\Sell\Category\DeleteCategoriesType;
use PrestaShopBundle\Security\Annotation\AdminSecurity;
use PrestaShopBundle\Security\Annotation\DemoRestricted;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * Class DmsAdminCustomerController.
 * @package KoopmanOrderExport\Controller\Admin
 */
class DmsAdminCategoryController extends FrameworkBundleAdminController
{
    /**
     * Show & process category editing.
     *
     * @AdminSecurity(
     *     "is_granted(['update'], request.get('_legacy_controller'))",
     *     message="You do not have permission to edit this.",
     *     redirectRoute="admin_categories_index"
     * )
     *
     * @param int $categoryId
     * @param Request $request
     *
     * @return Response
     */
    public function editAction(int $categoryId, Request $request): Response
    {
        try {
            /** @var EditableCategory $editableCategory */
            $editableCategory = $this->getQueryBus()->handle(new GetCategoryForEditing((int) $categoryId));

            if ($editableCategory->isRootCategory()) {
                return $this->redirectToRoute('admin_categories_edit_root', ['categoryId' => $categoryId]);
            }
        } catch (CategoryException $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages()));

            return $this->redirectToRoute('admin_categories_index');
        }

        $categoryFormBuilder = $this->get('prestashop.core.form.identifiable_object.builder.category_form_builder');
        $categoryFormHandler = $this->get('prestashop.core.form.identifiable_object.handler.category_form_handler');

        $categoryFormOptions = [
            'id_category' => (int) $categoryId,
            'subcategories' => $editableCategory->getSubCategories(),
        ];

        try {
            $categoryForm = $categoryFormBuilder->getFormFor((int) $categoryId, [], $categoryFormOptions);
        } catch (Exception $exception) {
            $this->addFlash('error', $this->getErrorMessageForException($exception, $this->getErrorMessages()));

            return $this->redirectToRoute('admin_categories_index');
        }

        try {
            $categoryForm->handleRequest($request);
            $handlerResult = $categoryFormHandler->handleFor((int) $categoryId, $categoryForm);

            if ($handlerResult->isSubmitted() && $handlerResult->isValid()) {
                $this->addFlash('success', $this->trans('Successful update.', 'Admin.Notifications.Success'));

                return $this->redirectToRoute('admin_categories_index', [
                    'categoryId' => $categoryForm->getData()['id_parent'],
                ]);
            }
        } catch (Exception $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages()));
        }

        $defaultGroups = $this->get('prestashop.adapter.group.provider.default_groups_provider')->getGroups();

        $category = new \PrestaShop\PrestaShop\Adapter\Entity\Category($categoryId);
        $editableCategory->top_description = $category->top_description[$this->getContext()->language->id];
        $editableCategory->second_name = $category->second_name[$this->getContext()->language->id];
        $editableCategory->jsonld = $category->jsonld;

        return $this->render(
            '@PrestaShop/Admin/Sell/Catalog/Categories/edit.html.twig',
            [
                'allowMenuThumbnailsUpload' => $editableCategory->canContainMoreMenuThumbnails(),
                'maxMenuThumbnails' => count(MenuThumbnailId::ALLOWED_ID_VALUES),
                'contextLangId' => $this->getContextLangId(),
                'editCategoryForm' => $categoryForm->createView(),
                'editableCategory' => $editableCategory,
                'defaultGroups' => $defaultGroups,
                'categoryUrl' => $this->get('prestashop.adapter.shop.url.category_provider')
                    ->getUrl($categoryId, '{friendly-url}'),
            ]
        );
    }

    public function editRootAction($categoryId, Request $request)
    {
        try {
            /** @var EditableCategory $editableCategory */
            $editableCategory = $this->getQueryBus()->handle(new GetCategoryForEditing((int) $categoryId));

            if (!$editableCategory->isRootCategory()) {
                return $this->redirectToRoute('admin_categories_edit', ['categoryId' => $categoryId]);
            }
        } catch (CannotEditRootCategoryException | CategoryNotFoundException $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages()));

            return $this->redirectToRoute('admin_categories_index');
        }

        $rootCategoryFormBuilder = $this->get('prestashop.core.form.identifiable_object.builder.root_category_form_builder');
        $rootCategoryFormHandler = $this->get('prestashop.core.form.identifiable_object.handler.root_category_form_handler');

        try {
            $rootCategoryForm = $rootCategoryFormBuilder->getFormFor((int) $categoryId);
        } catch (Exception $exception) {
            $this->addFlash('error', $this->getErrorMessageForException($exception, $this->getErrorMessages()));

            return $this->redirectToRoute('admin_categories_index');
        }

        try {
            $rootCategoryForm->handleRequest($request);
            $handlerResult = $rootCategoryFormHandler->handleFor((int) $categoryId, $rootCategoryForm);

            if ($handlerResult->isSubmitted() && $handlerResult->isValid()) {
                $this->addFlash('success', $this->trans('Successful update.', 'Admin.Notifications.Success'));

                return $this->redirectToRoute('admin_categories_index', [
                    'categoryId' => $this->configuration->getInt('PS_ROOT_CATEGORY'),
                ]);
            }
        } catch (Exception $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages()));
        }

        $defaultGroups = $this->get('prestashop.adapter.group.provider.default_groups_provider')->getGroups();

        $category = new \PrestaShop\PrestaShop\Adapter\Entity\Category($categoryId);

        $editableCategory->top_description = $category->top_description[$this->getContext()->language->id];
        $editableCategory->second_name = $category->second_name[$this->getContext()->language->id];
        $editableCategory->jsonld = $category->jsonld;


        return $this->render(
            '@PrestaShop/Admin/Sell/Catalog/Categories/edit_root.html.twig',
            [
                'allowMenuThumbnailsUpload' => $editableCategory->canContainMoreMenuThumbnails(),
                'maxMenuThumbnails' => count(MenuThumbnailId::ALLOWED_ID_VALUES),
                'contextLangId' => $this->getContextLangId(),
                'editRootCategoryForm' => $rootCategoryForm->createView(),
                'editableCategory' => $editableCategory,
                'defaultGroups' => $defaultGroups,
                'categoryUrl' => $this->get('prestashop.adapter.shop.url.category_provider')
                    ->getUrl($categoryId, '{friendly-url}'),
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
//                    'categoryId' => $categoryForm->getData()['id_parent'],
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
    private function getCategoryToolbarButtons(Request $request)
    {
        $toolbarButtons = [];

        if ($this->get('prestashop.adapter.feature.multistore')->isUsed()) {
            $toolbarButtons['add_root'] = [
                'href' => $this->generateUrl('admin_categories_create_root'),
                'desc' => $this->trans('Add new root category', 'Admin.Catalog.Feature'),
                'icon' => 'add_circle_outline',
            ];
        }

        $categoryId = $request->attributes->get('categoryId');
        if (empty($categoryId)) {
            $categoryId = $this->configuration->getInt('PS_HOME_CATEGORY');
        }

        $toolbarButtons['add'] = [
            'href' => $this->generateUrl('admin_categories_create', ['id_parent' => $categoryId]),
            'desc' => $this->trans('Add new category', 'Admin.Catalog.Feature'),
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
            CannotDeleteImageException::class => $this->trans('Unable to delete associated images.', 'Admin.Notifications.Error'),
            CategoryNotFoundException::class => $this->trans('The object cannot be loaded (or found)', 'Admin.Notifications.Error'),
            CategoryConstraintException::class => [
                CategoryConstraintException::EMPTY_BULK_DELETE_DATA => $this->trans('You must select at least one element to delete.', 'Admin.Notifications.Error'),
                CategoryConstraintException::TOO_MANY_MENU_THUMBNAILS => sprintf(
                    '%s %s',
                    $this->trans('An error occurred while uploading the image:', 'Admin.Catalog.Notification'),
                    $this->trans('You cannot upload more files', 'Admin.Notifications.Error')
                ),
            ],
            CannotDeleteRootCategoryForShopException::class => $this->trans(
                'You cannot remove this category because one of your shops uses it as a root category.',
                'Admin.Catalog.Notification'
            ),
            CannotAddCategoryException::class => $this->trans(
                'An error occurred while creating the category.',
                'Admin.Catalog.Notification'
            ),
            CannotEditRootCategoryException::class => $this->trans(
                'The root category of a shop cannot be edited.',
                'Admin.Catalog.Notification'
            ),
            CannotEditCategoryException::class => $this->trans(
                'An error occurred while editing the category.',
                'Admin.Catalog.Notification'
            ),
            CannotUpdateCategoryStatusException::class => $this->trans(
                'An error occurred while updating the status for an object.',
                'Admin.Notifications.Error'
            ),
            MenuThumbnailsLimitException::class => sprintf(
                '%s %s',
                $this->trans('An error occurred while uploading the image:', 'Admin.Catalog.Notification'),
                $this->trans('You cannot upload more files', 'Admin.Notifications.Error')
            ),
        ];
    }
}

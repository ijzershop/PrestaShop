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

namespace PrestaShopBundle\Controller\Api;

use Exception;
use PrestaShop\PrestaShop\Core\Translation\Storage\Provider\Definition\BackofficeProviderDefinition;
use PrestaShop\PrestaShop\Core\Translation\Storage\Provider\Definition\CoreDomainProviderDefinition;
use PrestaShop\PrestaShop\Core\Translation\Storage\Provider\Definition\FrontofficeProviderDefinition;
use PrestaShop\PrestaShop\Core\Translation\Storage\Provider\Definition\MailsBodyProviderDefinition;
use PrestaShop\PrestaShop\Core\Translation\Storage\Provider\Definition\MailsProviderDefinition;
use PrestaShop\PrestaShop\Core\Translation\Storage\Provider\Definition\ModuleProviderDefinition;
use PrestaShop\PrestaShop\Core\Translation\Storage\Provider\Definition\OthersProviderDefinition;
use PrestaShop\PrestaShop\Core\Translation\Storage\Provider\Definition\ProviderDefinitionInterface;
use PrestaShop\PrestaShop\Core\Translation\Storage\Provider\Definition\ThemeProviderDefinition;
use PrestaShop\PrestaShop\Adapter\EntityTranslation\EntityTranslatorFactory;
use PrestaShopBundle\Api\QueryTranslationParamsCollection;
use PrestaShopBundle\Entity\Lang;
use PrestaShopBundle\Exception\InvalidLanguageException;
use PrestaShopBundle\Security\Annotation\AdminSecurity;
use PrestaShopBundle\Service\TranslationService;
use PrestaShopBundle\Translation\Exception\UnsupportedLocaleException;
use PrestaShopBundle\Translation\View\TreeBuilder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class TranslationController extends ApiController
{
    /**
     * @var QueryTranslationParamsCollection
     */
    public $queryParams;

    /**
     * @var TranslationService
     */
    public $translationService;

    /**
     * Show translations for 1 domain & 1 locale given & 1 theme given (optional).
     *
     * @AdminSecurity("is_granted('read', request.get('_legacy_controller'))")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function listDomainTranslationAction(Request $request): JsonResponse
    {
        try {
            $queryParamsCollection = $this->queryParams->fromRequest($request);
            $queryParams = $queryParamsCollection->getQueryParams();

            /** @var TranslationService $translationService */
            $translationService = $this->container->get('prestashop.service.translation');

            $locale = $request->attributes->get('locale');
            $domain = $request->attributes->get('domain');
            $theme = $request->attributes->get('theme');
            $module = $request->query->get('module');
            $search = $request->query->get('search');

            try {
                $this->translationService->findLanguageByLocale($locale);
            } catch (InvalidLanguageException $e) {
                // If the locale is invalid, no need to call the translation provider.
                throw UnsupportedLocaleException::invalidLocale($locale);
            }

            $catalog = $translationService->listDomainTranslation($locale, $domain, $theme, $this->searchExpressionToArray($search), $module);
            $info = [
                'Total-Pages' => ceil(count($catalog['data']) / $queryParams['page_size']),
            ];

            $catalog['data'] = array_slice(
                $catalog['data'],
                ($queryParams['page_index'] - 1) * $queryParams['page_size'],
                $queryParams['page_size']
            );

            return $this->jsonResponse($catalog, $request, $queryParamsCollection, 200, $info);
        } catch (Exception $exception) {
            return $this->handleException(new BadRequestHttpException($exception->getMessage(), $exception));
        }
    }

    /**
     * Show tree for translation page with some params.
     *
     * @AdminSecurity("is_granted('read', request.get('_legacy_controller'))")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function listTreeAction(Request $request)
    {
        try {
            // params possibles:
            // lang : en, fr, etc.
            // type : themes, modules, mails, back, others
            // selected : classic, starterTheme, module name, subject (for email).

            $lang = $request->attributes->get('lang');
            $type = $request->attributes->get('type');
            $selected = $request->attributes->get('selected');

            $search = $request->query->get('search');

            if (!in_array($type, ProviderDefinitionInterface::ALLOWED_TYPES)) {
                throw new Exception(sprintf("The 'type' parameter '%s' is not valid", $type));
            }

            if (ProviderDefinitionInterface::TYPE_THEMES === $type && '0' === $selected) {
                $type = ProviderDefinitionInterface::TYPE_FRONT;
            }

            if (
                in_array($type, [ProviderDefinitionInterface::TYPE_MODULES, ProviderDefinitionInterface::TYPE_THEMES])
                && empty($selected)
            ) {
                throw new Exception("The 'selected' parameter is empty.");
            }

            $tree = $this->getTree($lang, $type, $this->searchExpressionToArray($search), $selected);

            return $this->jsonResponse($tree, $request);
        } catch (Exception $exception) {
            return $this->handleException(new BadRequestHttpException($exception->getMessage(), $exception));
        }
    }

    /**
     * Route to edit translation.
     *
     * @AdminSecurity("is_granted(['create', 'update'], request.get('_legacy_controller'))")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function translationEditAction(Request $request)
    {
        try {
            $decodedContent = $this->guardAgainstInvalidTranslationBulkRequest($request);

            $translations = $decodedContent['translations'];
            $this->guardAgainstInvalidTranslationEditRequest($translations);

            $translationService = $this->container->get('prestashop.service.translation');
            $response = [];
            $modifiedDomains = [];
            if (!empty($translations)) {
                $lang = null;
                foreach ($translations as $translation) {
                    if (empty($translation['theme'])) {
                        $translation['theme'] = null;
                    }

                    try {
                        if ($lang === null) {
                            $lang = $translationService->findLanguageByLocale($translation['locale']);
                        }
                    } catch (Exception $exception) {
                        throw new BadRequestHttpException($exception->getMessage());
                    }

                    $response[$translation['default']] = $translationService->saveTranslationMessage(
                        $lang,
                        $translation['domain'],
                        $translation['default'],
                        $translation['edited'],
                        $translation['theme']
                    );

                    $modifiedDomains[$translation['domain']] = true;
                }

                // this has to be done *before* retranslating
                $this->clearCache();

                $this->translateMultilingualContent(array_keys($modifiedDomains), $lang);
            }

            return new JsonResponse($response, 200);
        } catch (BadRequestHttpException $exception) {
            return $this->handleException($exception);
        }
    }

    /**
     * Route to reset translation.
     *
     * @AdminSecurity("is_granted(['create', 'update'], request.get('_legacy_controller'))")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function translationResetAction(Request $request)
    {
        try {
            $decodedContent = $this->guardAgainstInvalidTranslationBulkRequest($request);

            $translations = $decodedContent['translations'];
            $this->guardAgainstInvalidTranslationResetRequest($translations);

            $translationService = $this->container->get('prestashop.service.translation');
            $response = [];

            foreach ($translations as $translation) {
                if (!array_key_exists('theme', $translation)) {
                    $translation['theme'] = null;
                }

                try {
                    $lang = $translationService->findLanguageByLocale($translation['locale']);
                } catch (Exception $exception) {
                    throw new BadRequestHttpException($exception->getMessage());
                }

                $response[$translation['default']] = $translationService->resetTranslationMessage(
                    $lang->getId(),
                    $translation['domain'],
                    $translation['default'],
                    $translation['theme']
                );
            }

            $this->clearCache();

            return new JsonResponse($response, 200);
        } catch (BadRequestHttpException $exception) {
            return $this->handleException($exception);
        }
    }

    /**
     * @param Request $request
     *
     * @return mixed
     */
    private function guardAgainstInvalidTranslationBulkRequest(Request $request)
    {
        $content = $request->getContent();

        $decodedContent = $this->guardAgainstInvalidJsonBody($content);

        if (empty($decodedContent) ||
            !array_key_exists('translations', $decodedContent) ||
            !is_array($decodedContent['translations'])
        ) {
            $message = 'The request body should contain a JSON-encoded array of translations';

            throw new BadRequestHttpException(sprintf('Invalid JSON content (%s)', $message));
        }

        return $decodedContent;
    }

    /**
     * @param array $content
     */
    private function guardAgainstInvalidTranslationEditRequest($content)
    {
        $message = 'Each item of JSON-encoded array in the request body should contain ' .
            'a "locale", a "domain", a "default" and a "edited" values. ' .
            'The item of index #%d is invalid.';

        array_walk($content, function ($item, $index) use ($message) {
            if (!array_key_exists('locale', $item) ||
                !array_key_exists('domain', $item) ||
                !array_key_exists('default', $item) ||
                !array_key_exists('edited', $item)
            ) {
                throw new BadRequestHttpException(sprintf($message, $index));
            }
        });
    }

    /**
     * @param array $content
     */
    protected function guardAgainstInvalidTranslationResetRequest($content)
    {
        $message = 'Each item of JSON-encoded array in the request body should contain ' .
            'a "locale", a "domain" and a "default" values. ' .
            'The item of index #%d is invalid.';

        array_walk($content, function ($item, $index) use ($message) {
            if (!array_key_exists('locale', $item) ||
                !array_key_exists('domain', $item) ||
                !array_key_exists('default', $item)
            ) {
                throw new BadRequestHttpException(sprintf($message, $index));
            }
        });
    }

    /**
     * Returns a translation domain tree
     *
     * @param string $lang
     * @param string $type "themes", "modules", "mails", "mails_body", "back", "front" or "others"
     * @param array $search Search strings
     * @param string|null $selectedValue Depends on the type. It's a theme name if type = "themes" or a module name if type = "modules"
     *
     * @return array
     *
     * @throws Exception
     */
    private function getTree(string $lang, string $type, array $search, ?string $selectedValue = null)
    {
        $locale = $this->translationService->langToLocale($lang);

        return $this->translationService->getTranslationsTree(
            $this->buildProviderDefinitionByType($type, $selectedValue),
            $locale,
            $search
        );
    }

    /**
     * @param string $type
     * @param string|null $selectedValue
     *
     * @return ProviderDefinitionInterface
     */
    private function buildProviderDefinitionByType(
        string $type,
        ?string $selectedValue = null
    ): ProviderDefinitionInterface {
        switch ($type) {
            case ProviderDefinitionInterface::TYPE_MODULES:
                return new ModuleProviderDefinition($selectedValue);
            case ProviderDefinitionInterface::TYPE_THEMES:
                return new ThemeProviderDefinition($selectedValue);
            case ProviderDefinitionInterface::TYPE_CORE_DOMAIN:
                return new CoreDomainProviderDefinition($selectedValue);
            case ProviderDefinitionInterface::TYPE_BACK:
                return new BackofficeProviderDefinition();
            case ProviderDefinitionInterface::TYPE_FRONT:
                return new FrontofficeProviderDefinition();
            case ProviderDefinitionInterface::TYPE_MAILS:
                return new MailsProviderDefinition();
            case ProviderDefinitionInterface::TYPE_MAILS_BODY:
                return new MailsBodyProviderDefinition();
            case ProviderDefinitionInterface::TYPE_OTHERS:
                return new OthersProviderDefinition();
            default:
                throw new \RuntimeException(sprintf('Unrecognized type: %s', $type));
        }
    }

    /**
     * @param string $lang
     * @param string|null $type
     * @param string $theme Selected theme name
     * @param null $search
     *
     * @return array
     */
    private function getNormalTree($lang, $type, $theme, $search = null)
    {
        $treeBuilder = new TreeBuilder($this->translationService->langToLocale($lang), $theme);
        $catalogue = $this->translationService->getTranslationsCatalogue($lang, $type, $theme, $search);

        return $this->getCleanTree($treeBuilder, $catalogue, $theme, $search);
    }

    /**
     * @param string $lang Two-letter iso code
     * @param string $selectedModuleName Selected module name
     * @param string|null $search
     *
     * @return array
     */
    private function getModulesTree($lang, $selectedModuleName, $search = null)
    {
        $theme = null;
        $locale = $this->translationService->langToLocale($lang);

        $moduleProvider = $this->container->get('prestashop.translation.external_module_provider');
        $moduleProvider->setModuleName($selectedModuleName);

        $treeBuilder = new TreeBuilder($locale, $theme);
        $catalogue = $treeBuilder->makeTranslationArray($moduleProvider, $search);

        return $this->getCleanTree($treeBuilder, $catalogue, $theme, $search, $selectedModuleName);
    }

    /**
     * @param string $lang Two-letter iso code
     * @param null $search
     *
     * @return array
     */
    private function getMailsSubjectTree($lang, $search = null)
    {
        $theme = null;

        $treeBuilder = new TreeBuilder($this->translationService->langToLocale($lang), $theme);
        $catalogue = $this->translationService->getTranslationsCatalogue($lang, 'mails', $theme, $search);

        return $this->getCleanTree($treeBuilder, $catalogue, $theme, $search);
    }

    /**
     * @param string $lang Two-letter iso code
     * @param null $search
     *
     * @return array
     */
    private function getMailsBodyTree($lang, $search = null)
    {
        $theme = null;

        $treeBuilder = new TreeBuilder($this->translationService->langToLocale($lang), $theme);
        $catalogue = $this->translationService->getTranslationsCatalogue($lang, 'mails_body', $theme, $search);

        return $this->getCleanTree($treeBuilder, $catalogue, $theme, $search);
    }

    /**
     * Make final tree.
     *
     * @param TreeBuilder $treeBuilder
     * @param array $catalogue
     * @param string|null $theme
     * @param string|null $search
     * @param string|null $module
     *
     * @return array
     */
    private function getCleanTree(TreeBuilder $treeBuilder, $catalogue, $theme, $search = null, $module = null)
    {
        $translationsTree = $treeBuilder->makeTranslationsTree($catalogue);
        $translationsTree = $treeBuilder->cleanTreeToApi($translationsTree, $this->container->get('router'), $theme, $search, $module);

        return $translationsTree;
    }

    /**
     * Trigger translation of multilingual content in database according to which domains have been modified
     *
     * @param string[] $modifiedDomains List of modified domains
     * @param Lang $lang
     *
     * @throws \PrestaShopDatabaseException
     * @throws \PrestaShopException
     */
    private function translateMultilingualContent(array $modifiedDomains, Lang $lang)
    {
        if (in_array('AdminNavigationMenu', $modifiedDomains)) {
            $translator = $this->container->get('translator');

            // reset translator
            $translator->clearLanguage($lang->getLocale());

            // update menu items (tabs)
            (new EntityTranslatorFactory($translator))
                ->buildFromTableName('tab', $lang->getLocale())
                ->translate($lang->getId(), \Context::getContext()->shop->id);
        }
    }

    /**
     * @param string|array $search
     *
     * @return array
     */
    private function searchExpressionToArray($search): array
    {
        if (is_array($search)) {
            return $search;
        }

        return empty($search) ? [] : [$search];
    }
}

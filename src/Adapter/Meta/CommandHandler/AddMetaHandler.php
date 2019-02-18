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

namespace PrestaShop\PrestaShop\Adapter\Meta\CommandHandler;

use Meta;
use PrestaShop\PrestaShop\Core\Domain\Meta\Command\AddMetaCommand;
use PrestaShop\PrestaShop\Core\Domain\Meta\CommandHandler\AddMetaHandlerInterface;
use PrestaShop\PrestaShop\Core\Domain\Meta\Exception\CannotAddMetaException;
use PrestaShop\PrestaShop\Core\Domain\Meta\Exception\MetaException;
use PrestaShop\PrestaShop\Core\Domain\Meta\ValueObject\MetaId;
use PrestaShop\PrestaShop\Core\Hook\HookDispatcherInterface;
use PrestaShopException;

/**
 * Class SaveMetaHandler is responsible for saving meta data.
 */
final class AddMetaHandler implements AddMetaHandlerInterface
{
    /**
     * @var HookDispatcherInterface
     */
    private $hookDispatcher;

    /**
     * @var int
     */
    private $defaultLanguageId;

    /**
     * @param HookDispatcherInterface $hookDispatcher
     * @param int $defaultLanguageId
     */
    public function __construct(
        HookDispatcherInterface $hookDispatcher,
        $defaultLanguageId
    ) {
        $this->hookDispatcher = $hookDispatcher;
        $this->defaultLanguageId = $defaultLanguageId;
    }

    /**
     * {@inheritdoc}
     *
     * @throws CannotAddMetaException
     * @throws MetaException
     */
    public function handle(AddMetaCommand $command)
    {
        //todo: copy from default language the values to the empty link rewrites
        try {
            $entity = new Meta();
            $entity->page = $command->getPageName();
            $entity->title = $command->getPageTitle();
            $entity->description = $command->getMetaDescription();
            $entity->keywords = $command->getMetaKeywords();

            $rewriteUrls = $command->getRewriteUrl();
            foreach ($rewriteUrls as $idLang => $rewriteUrl) {
                if (!$rewriteUrl) {
                    $rewriteUrls[$idLang] = $rewriteUrls[$this->defaultLanguageId];
                }
            }

            $entity->url_rewrite = $rewriteUrls;
            $entity->add();

            if (0 >= $entity->id) {
                throw new CannotAddMetaException(
                    sprintf('Invalid entity id after creation: %s', $entity->id)
                );
            }

        } catch (PrestaShopException $exception) {
            throw new MetaException(
                'Failed to create meta entity',
                0,
                $exception
            );
        }

        $this->hookDispatcher->dispatchWithParameters('actionAdminMetaSave');

        return new MetaId($entity->id);
    }
}

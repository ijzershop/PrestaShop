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
use PrestaShop\PrestaShop\Core\Domain\Meta\Command\EditMetaCommand;
use PrestaShop\PrestaShop\Core\Domain\Meta\CommandHandler\EditMetaHandlerInterface;

/**
 * Class EditMetaHandler is responsible for editing meta data,
 */
final class EditMetaHandler extends SaveMetaHandler implements EditMetaHandlerInterface
{
    /**
     * {@inheritdoc}
     */
    public function handle(EditMetaCommand $command)
    {
        $entity = new Meta($command->getMetaId()->getValue());
        //todo: validations
        $entity->page = $command->getPageName();
        $entity->title = $command->getPageTitle();
        $entity->description = $command->getMetaDescription();
        $entity->keywords = $command->getMetaKeywords();
        $entity->url_rewrite = $command->getRewriteUrl();

        $this->validateMetaData($entity);

        $entity->update();
    }
}

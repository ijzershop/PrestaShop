<?php
/**
 * 2007-2020 PrestaShop SA and Contributors
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
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\PrestaShop\Adapter\Hook\CommandHandler;

use Hook;
use PrestaShop\PrestaShop\Core\Domain\Hook\Command\UpdateHookStatusCommand;
use PrestaShop\PrestaShop\Core\Domain\Hook\CommandHandler\UpdateHookStatusCommandHandlerInterface;
use PrestaShop\PrestaShop\Core\Domain\Hook\Exception\CannotUpdateHookException;
use PrestaShop\PrestaShop\Core\Domain\Hook\Exception\HookNotFoundException;

/**
 * @internal
 */
class UpdateHookStatusCommandHandler implements UpdateHookStatusCommandHandlerInterface
{
    /**
     * @param UpdateHookStatusCommand $command
     */
    public function handle(UpdateHookStatusCommand $command)
    {
        $hookId = $command->getHookId()->getValue();
        $hook = new Hook($hookId);

        if ($hook->id !== $hookId) {
            throw new HookNotFoundException(sprintf('Hook with id "%s" was not found', $hookId));
        }

        $hook->active = ! $command->getStatus();
        if (!$hook->save()) {
            throw new CannotUpdateHookException(sprintf('Cannot update status for hook with id "%s"', $hookId));
        }
    }
}

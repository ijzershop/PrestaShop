<?php
/**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\Module\Ps_metrics\Presenter\Store;

use Context;
use PrestaShop\Module\Ps_metrics\Presenter\PresenterInterface;
use PrestaShop\Module\Ps_metrics\Presenter\Store\Context\ContextPresenter;
use PrestaShop\Module\Ps_metrics\Presenter\Store\Dashboard\DashboardPresenter;
use PrestaShop\Module\Ps_metrics\Presenter\Store\Settings\SettingsPresenter;
use Ps_metrics;

/**
 * Present the store to the vuejs app (vuex)
 */
class StorePresenter implements PresenterInterface
{
    /**
     * @var Ps_metrics
     */
    private $module;

    /**
     * @var Context
     */
    private $context;

    /**
     * @var array
     */
    private $store;

    /**
     * @var string
     */
    private $responseApiMessage;

    /**
     * @var int
     */
    private $countProperty;

    /**
     * @param string $responseApiMessage
     * @param int $countProperty
     */
    public function __construct(Ps_metrics $module, Context $context, array $store = null, $responseApiMessage, $countProperty)
    {
        // Allow to set a custom store for tests purpose
        if (null !== $store) {
            $this->store = $store;
        }

        $this->module = $module;
        $this->context = $context;
        $this->responseApiMessage = $responseApiMessage;
        $this->countProperty = $countProperty;
    }

    /**
     * Build the store required by vuex
     *
     * @return array
     */
    public function present()
    {
        if (null !== $this->store) {
            return $this->store;
        }

        $contextPresenter = (new ContextPresenter($this->module, $this->context))->present();

        // Load a presenter depending on the application to load (dashboard | settings)
        if ('dashboard' === $contextPresenter['context']['app']) {
            $this->store = array_merge(
                $contextPresenter,
                (new DashboardPresenter($this->module, $this->context))->present()
            );
        } else {
            $this->store = array_merge(
                $contextPresenter,
                (new SettingsPresenter($this->module, $this->context, $this->responseApiMessage, $this->countProperty))->present()
            );
        }

        return $this->store;
    }
}

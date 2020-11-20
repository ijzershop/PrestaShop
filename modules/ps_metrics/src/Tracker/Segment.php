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

namespace PrestaShop\Module\Ps_metrics\Tracker;

use PrestaShop\Module\Ps_metrics\Environment\SegmentEnv;

class Segment implements TrackerInterface
{
    /**
     * @var string
     */
    private $message = '';

    /**
     * @var array
     */
    private $options = [];

    /**
     * @var SegmentEnv
     */
    private $segmentEnv;

    /**
     * Segment constructor.
     *
     * @param SegmentEnv $segmentEnv
     */
    public function __construct(SegmentEnv $segmentEnv)
    {
        $this->segmentEnv = $segmentEnv;
        $this->init();
    }

    /**
     * Init segment client with the api key
     */
    private function init()
    {
        \Segment::init($this->segmentEnv->getSegmentApiKey());
    }

    /**
     * Track event on segment
     *
     * @return bool
     *
     * @throws \PrestaShopException
     */
    public function track()
    {
        if (empty($this->message)) {
            throw new \PrestaShopException('Message cannot be empty. Need to set it with setMessage() method.');
        }

        // Dispatch track depending on context shop
        $this->dispatchTrack();

        return true;
    }

    private function segmentTrack($userId)
    {
        $userAgent = $_SERVER['HTTP_USER_AGENT'];
        $ip = $_SERVER['REMOTE_ADDR'];
        $path = strtok($_SERVER['REQUEST_URI'], '?');
        $referer = $_SERVER['HTTP_REFERER'];
        $queryString = '?' . $_SERVER['QUERY_STRING'];
        $url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

        \Segment::track([
            'userId' => $userId,
            'event' => $this->message,
            'channel' => 'browser',
            'context' => [
                'ip' => $ip,
                'userAgent' => $userAgent,
                'locale' => \Context::getContext()->currentLocale,
                'page' => [
                    'referrer' => $referer,
                    'url' => $url,
                ],
            ],
            'properties' => array_merge([
                'module' => 'ps_metrics',
            ], $this->options),
        ]);

        \Segment::flush();
    }

    /**
     * Handle tracking differently depending on the shop context
     *
     * @return mixed
     */
    private function dispatchTrack()
    {
        $dictionary = [
            \Shop::CONTEXT_SHOP => function () {
                return $this->trackShop();
            },
            \Shop::CONTEXT_GROUP => function () {
                return $this->trackShopGroup();
            },
            \Shop::CONTEXT_ALL => function () {
                return $this->trackAllShops();
            },
        ];

        return call_user_func($dictionary[\Shop::getContext()]);
    }

    /**
     * Send track segment only for the current shop
     */
    private function trackShop()
    {
        $userId = \Context::getContext()->shop->domain;

        $this->segmentTrack($userId);
    }

    /**
     * Send track segment for each shop in the current shop group
     */
    private function trackShopGroup()
    {
        $shops = \Shop::getShops(true, \Shop::getContextShopGroupID());
        foreach ($shops as $shop) {
            $this->segmentTrack($shop['domain']);
        }
    }

    /**
     * Send track segment for all shops
     */
    private function trackAllShops()
    {
        $shops = \Shop::getShops();
        foreach ($shops as $shop) {
            $this->segmentTrack($shop['domain']);
        }
    }

    /**
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @param string $message
     */
    public function setMessage($message)
    {
        $this->message = $message;
    }

    /**
     * @return array
     */
    public function getOptions()
    {
        return $this->options;
    }

    /**
     * @param array $options
     */
    public function setOptions($options)
    {
        $this->options = $options;
    }
}

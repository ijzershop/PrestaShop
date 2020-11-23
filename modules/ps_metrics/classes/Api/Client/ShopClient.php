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

namespace PrestaShop\Module\Ps_metrics\Api\Client;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Ring\Exception\RingException;
use PrestaShopException;

class ShopClient
{
    /**
     * @var Client
     */
    private $client;

    /**
     * @var string
     */
    private $route;

    /**
     * Create the Guzzle Client with defined data
     *
     * @param string $baseUrl
     *
     * @return void
     */
    public function create($baseUrl)
    {
        $this->client = new Client([
            'base_url' => $baseUrl,
            'defaults' => [
                'timeout' => 10,
                'exceptions' => false,
                'verify' => false,
            ],
        ]);
    }

    /**
     * Wrapper of method get from guzzle client
     *
     * @return array|null return response or false if no response
     */
    protected function get()
    {
        try {
            $response = $this->client->get($this->getRoute());
        } catch (RequestException $exception) {
            return null;
        } catch (RingException $exception) {
            throw new PrestaShopException($exception->getMessage());
        }

        if (null === $response->getBody()) {
            throw new PrestaShopException('HTTP body response is empty');
        }

        return [
            'httpCode' => $response->getStatusCode(),
            'body' => $response->getBody()->getContents(),
        ];
    }

    /**
     * getRoute
     *
     * @return string
     */
    protected function getRoute()
    {
        return $this->route;
    }

    /**
     * setRoute
     *
     * @param string $route
     *
     * @return void
     */
    protected function setRoute($route)
    {
        $this->route = $route;
    }
}

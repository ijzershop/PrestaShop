<?php
/**
 * 2007-2020 PayPal
 *
 *  NOTICE OF LICENSE
 *
 *  This source file is subject to the Academic Free License (AFL 3.0)
 *  that is bundled with this package in the file LICENSE.txt.
 *  It is also available through the world-wide-web at this URL:
 *  http://opensource.org/licenses/afl-3.0.php
 *  If you did not receive a copy of the license and are unable to
 *  obtain it through the world-wide-web, please send an email
 *  to license@prestashop.com so we can send you a copy immediately.
 *
 *  DISCLAIMER
 *
 *  Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 *  versions in the future. If you wish to customize PrestaShop for your
 *  needs please refer to http://www.prestashop.com for more information.
 *
 *  @author 2007-2020 PayPal
 *  @author 202 ecommerce <tech@202-ecommerce.com>
 *  @copyright PayPal
 *  @license http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 */

namespace PaypalAddons\classes\API\Response;


class ResponseCaptureAuthorize extends Response
{
    /** @var string*/
    protected $idTransaction;

    /** @var string*/
    protected $status;

    /** @var string*/
    protected $dateTransaction;

    /**
     * @return string
     */
    public function getIdTransaction()
    {
        return $this->idTransaction;
    }

    /**
     * @param string $idTransaction
     */
    public function setIdTransaction($idTransaction)
    {
        $this->idTransaction = $idTransaction;
        return $this;
    }

    /**
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param string $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
        return $this;
    }

    /**
     * @return string
     */
    public function getDateTransaction()
    {
        return $this->dateTransaction;
    }

    /**
     * @param string $dateTransaction
     */
    public function setDateTransaction($dateTransaction)
    {
        $this->dateTransaction = $dateTransaction;
        return $this;
    }

    /**
     * @return string
     */
    public function getMessage()
    {
        $message = 'Authorizaton is captured; ';
        $message .= 'Transaction Id: ' . $this->getIdTransaction() . '; ';
        $message .= 'Status: ' . $this->getStatus() . ';';

        return $message;
    }
}

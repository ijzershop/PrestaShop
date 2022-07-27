<?php

use PrestaShop\PrestaShop\Adapter\SymfonyContainer;
use Symfony\Component\HttpFoundation\Request;

/**
 *
 */
class AdminPricemodifierPriceModificationController extends ModuleAdminController
{
    public function init()
    {
        $sfContainer = SymfonyContainer::getInstance();
        if (!is_null($sfContainer)) {
            $sfRouter = $sfContainer->get('router');
            Tools::redirectAdmin($sfRouter->generate('modernesmid_pricemodifier_price_modification_index'));
        }
    }

}

<?php
/**
 * Module upgrade: 1.0.9
 *
 * Registers the actionProductSearchAfter hook, needed for the GA4 events
 * view_item_list and select_item.
 *
 * These were built in hookActionFrontControllerSetVariables(), which fires inside
 * FrontController::assignGeneralPurposeVariables(). At that point $templateVars has no
 * 'listing' key yet -- the listing is assigned later, in
 * ProductListingFrontController::initContent(). So the items array was always empty,
 * view-item-list.js bailed out on its "no items" guard and view_item_list never reached
 * GA4 at all, while select_item reported the literal list name 'Categorie' for every
 * category page.
 *
 * actionProductSearchAfter fires after the search ran and carries both the presented
 * products and the listing label, so the item list can be built there instead.
 *
 * installHooks() is idempotent and also runs during install().
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

function upgrade_module_1_0_9(Module $module): bool
{
    return $module->installHooks();
}

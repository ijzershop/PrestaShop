<?php


class Pack extends PackCore
{

public static function getQuantity(
    $idProduct,
    $idProductAttribute = null,
    $cacheIsPack = null,
    CartCore $cart = null,
    $idCustomization = null
) {
    $idProduct = (int) $idProduct;
    $idProductAttribute = (int) $idProductAttribute;

    if (!self::isPack($idProduct)) {
        throw new PrestaShopException("Product with id $idProduct is not a pack");
    }

    // Initialize
    $product = new Product($idProduct, false);
    $packQuantity = 0;

    // We get the pack stock calculation type it has set up
    $packStockType = $product->pack_stock_type;
    $allPackStockType = [
        self::STOCK_TYPE_PACK_ONLY,
        self::STOCK_TYPE_PRODUCTS_ONLY,
        self::STOCK_TYPE_PACK_BOTH,
        self::STOCK_TYPE_DEFAULT,
    ];

    if (!in_array($packStockType, $allPackStockType)) {
        throw new PrestaShopException('Unknown pack stock type');
    }

    /*
     * Now, we have resolved how we will calculate the stock of this pack. It can be one of the following.
     *
     * STOCK_TYPE_PACK_ONLY	- pack 1pcs + product A 10pcs + product B 20pcs = 1pcs
     * STOCK_TYPE_PRODUCTS_ONLY - pack 1pcs + product A 10pcs + product B 20pcs = 10 pcs
     * STOCK_TYPE_PACK_BOTH - pack 1pcs + product A 10pcs + product B 20pcs = 1 pcs
     */



    // If no pack stock or shop default, set it from configuration
    if (empty($packStockType) || $packStockType == self::STOCK_TYPE_DEFAULT) {
        $packStockType = Configuration::get('PS_PACK_STOCK_TYPE');
    }

    // If the quantity of the pack depends only on the pack or both packs and products,
    // we need to load the quantity of the pack from stock_available table.
    if (in_array($packStockType, [self::STOCK_TYPE_PACK_ONLY, self::STOCK_TYPE_PACK_BOTH])) {
        $packQuantity = StockAvailable::getQuantityAvailableByProduct(
            $idProduct,
            $idProductAttribute
        );
    }
    // If the quantity of the pack depends on the products inside, or both pack and products,
    // we need to set the pack quantity to the lowest quantity of products inside.
    if (in_array($packStockType, [self::STOCK_TYPE_PACK_BOTH, self::STOCK_TYPE_PRODUCTS_ONLY])) {
        $items = array_values(Pack::getItems($idProduct, Configuration::get('PS_LANG_DEFAULT')));


        foreach ($items as $index => $item) {
            if((int)StockAvailable::outOfStock($item->id) != 0){
                // We get the real quantity of the product stock
                $availableQuantity = StockAvailable::getQuantityAvailableByProduct($idProduct, $idProductAttribute);
                $nbProductInCart = 0;
                if ($cart && empty(Order::getByCartId($cart->id))) {
                    $cartProduct = $cart->getProductQuantity($idProduct, $idProductAttribute, $idCustomization);
                    if (!empty($cartProduct['deep_quantity'])) {
                        $nbProductInCart = $cartProduct['deep_quantity'];
                    }
                }

                $nbPackAvailableForItem = (int) floor(($availableQuantity - $nbProductInCart) * $item->pack_quantity);
                $packQuantity = $nbPackAvailableForItem;
                continue;
            } else {
                $availableQuantity = Product::getQuantity($item->id, $item->id_pack_product_attribute ?: null, null, $cart, $idCustomization ? $idCustomization : null);
                $nbPackAvailableForItem = (int) floor($availableQuantity / $item->pack_quantity);
            }
            // Initialize packQuantity with the first product quantity
            // if pack decrement stock type is products only
            // @todo This is probably not needed because $packQuantity is always initialized to zero.
            if ($index === 0
                && $packStockType == self::STOCK_TYPE_PRODUCTS_ONLY
            ) {
                $packQuantity = $nbPackAvailableForItem;

                continue;
            }

            // If the quantity of the individual item is lower than what we currently calculated, it's our new quantity.
            if ($nbPackAvailableForItem < $packQuantity) {
                $packQuantity = $nbPackAvailableForItem;
            }


        }
    } elseif (!empty($cart)) {
        $cartProduct = $cart->getProductQuantity($idProduct, $idProductAttribute, $idCustomization);

        if (!empty($cartProduct['deep_quantity'])) {
            $packQuantity -= $cartProduct['deep_quantity'];
        }
    }

    return $packQuantity;
}


}

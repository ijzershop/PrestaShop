<?php
use DynamicEquation;
class Product extends ProductCore {

    public static function isDynamicProduct($product){
        if(is_array($product)){
            $id_product = $product['id_product'];
        } else {
            $id_product = $product->id;
        }
        $equation =   DynamicEquation::getEquationsByIdProduct($id_product);
        if(array_key_exists(0, $equation) && !empty($equation[0]->formula)){
            return true;
        }
        return false;
    }
}
?>

<?php

/**
 *
 */
class ProductController extends ProductControllerCore
{
    /**
     * Get and assign attributes combinations informations.
     */
    protected function assignAttributesCombinations()
    {
        $attributes_combinations = Product::getAttributesInformationsByProduct($this->product->id);
        if (is_array($attributes_combinations) && count($attributes_combinations)) {
            foreach ($attributes_combinations as &$ac) {
                foreach ($ac as &$val) {
                    if(is_null($val)){
                        continue;
                    }
                    $val = str_replace(Configuration::get('PS_ATTRIBUTE_ANCHOR_SEPARATOR'), '_', Tools::str2url(str_replace([',', '.'], '-', $val)));
                }
            }
        } else {
            $attributes_combinations = [];
        }
        $this->context->smarty->assign([
            'attributesCombinations' => $attributes_combinations,
            'attribute_anchor_separator' => Configuration::get('PS_ATTRIBUTE_ANCHOR_SEPARATOR'),
        ]);
    }
}

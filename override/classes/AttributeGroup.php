<?php

class AttributeGroup extends AttributeGroupCore
{
    /**
     * Get an list with all names of the saw and cut attribute groups
     * @param integer $idLang language id
     * @return array list of attribute group names
     */
    public static function getSawCutModuleAttributeGroupNames($idLang = 1)
    {
        $sawCutConf = unserialize(Configuration::get('SAWANDCUTMODULE'));

        $resultSawCut = Db::getInstance()->executeS('SELECT * FROM `' . _DB_PREFIX_ . 'attribute_group_lang` WHERE `id_attribute_group` = ' . (int)$sawCutConf['id_attribute_group_cut'] . ' AND `id_lang` = ' . (int)$idLang);
        $resultCut = Db::getInstance()->executeS('SELECT * FROM `' . _DB_PREFIX_ . 'attribute_group_lang` WHERE `id_attribute_group` = ' . (int)$sawCutConf['id_attribute_group'] . ' AND `id_lang` = ' . (int)$idLang);

        $attributeGroupNames = [];

        if ($resultSawCut) {
            array_push($attributeGroupNames, $resultSawCut[0]['name']);
            array_push($attributeGroupNames, $resultSawCut[0]['public_name']);
        }

        if ($resultCut) {
            array_push($attributeGroupNames, $resultCut[0]['name']);
            array_push($attributeGroupNames, $resultCut[0]['public_name']);
        }

        return $attributeGroupNames;
    }


    /**
     * get an single attribute group name
     * @param boolean $cutting is an cutting attribute for true, false for sawcut attribute
     * @param integer $idLang language id
     * @param string $column specifies the column name or public_name
     * @return string attribute group name
     */
    public static function getSawCutModuleAttributeGroupName($cutting = true, $idLang = 1, $column = 'public_name')
    {
        $sawCutConf = unserialize(Configuration::get('SAWANDCUTMODULE'));

        if ($cutting) {
            $result = Db::getInstance()->executeS('SELECT * FROM `' . _DB_PREFIX_ . 'attribute_group_lang` WHERE `id_attribute_group` = ' . (int)$sawCutConf['id_attribute_group_cut'] . ' AND `id_lang` = ' . (int)$idLang);
        } else {
            $result = Db::getInstance()->executeS('SELECT * FROM `' . _DB_PREFIX_ . 'attribute_group_lang` WHERE `id_attribute_group` = ' . (int)$sawCutConf['id_attribute_group'] . ' AND `id_lang` = ' . (int)$idLang);
        }

        return $result[0][$column];
    }


    /**
     * Strip attributes for cut saw module from product name in order line
     *
     * @param $productName
     * @param int $idLang
     * @return array|string|string[]|null
     */
    public static function stripSawCutModuleAttributeGroupName($productName, $idLang = 1)
    {
        $attributes_list = AttributeGroup::getSawCutModuleAttributeGroupNames($idLang);
        $filtered_name = $productName;
        if(is_array($attributes_list)){

            $attributes = implode('|',array_unique($attributes_list));
            $filtered_name = preg_replace(['/(- ('.$attributes.')\s*:\s*[a-zA-Z])/', '/(- ('.$attributes.'):\s*[a-zA-Z])/', '/(\(('.$attributes.'):\s*[a-zA-Z])\)/'], '', $productName);
        }
        return $filtered_name;
    }

}

?>

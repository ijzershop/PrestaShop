<?php
declare(strict_types=1);

/**
 *
 */
class AttributeGroup extends AttributeGroupCore
{
    /**
     * Get a list with all names of the saw and cut attribute groups
     * @param int $idLang language id
     * @return array list of attribute group names
     * @throws PrestaShopDatabaseException
     */
    public static function getSawCutModuleAttributeGroupNames(int $idLang = 1): array
    {
        $sawCutConf = unserialize(Configuration::get('SAWANDCUTMODULE'));
        $resultSawCut = false;
        $resultCut = false;
        $attributeGroupNames = [];
        
        if($sawCutConf){
            $resultSawCut = Db::getInstance()->executeS('SELECT * FROM `' . _DB_PREFIX_ . 'attribute_group_lang` WHERE `id_attribute_group` = ' . (int)$sawCutConf['id_attribute_group_cut'] . ' AND `id_lang` = ' . (int)$idLang);

            $resultCut = Db::getInstance()->executeS('SELECT * FROM `' . _DB_PREFIX_ . 'attribute_group_lang` WHERE `id_attribute_group` = ' . (int)$sawCutConf['id_attribute_group'] . ' AND `id_lang` = ' . (int)$idLang);


            if ($resultSawCut) {
                $attributeGroupNames[] = $resultSawCut[0]['name'];
                $attributeGroupNames[] = $resultSawCut[0]['public_name'];
            }

            if ($resultCut) {
                $attributeGroupNames[] = $resultCut[0]['name'];
                $attributeGroupNames[] = $resultCut[0]['public_name'];
            }
        } else {

        }

        return $attributeGroupNames;
    }


    /**
     * get a single attribute group name
     * @param bool $cutting is a cutting attribute for true, false for sawcut attribute
     * @param integer $idLang language id
     * @param string $column specifies the column name or public_name
     * @return string attribute group name
     */
    public static function getSawCutModuleAttributeGroupName($cutting = true, $idLang = 1, $column = 'public_name'): string
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
     * @throws PrestaShopDatabaseException
     */
    public static function stripSawCutModuleAttributeGroupName($productName, int $idLang = 1): array|string|null
    {
        $attributes_list = AttributeGroup::getSawCutModuleAttributeGroupNames($idLang);
        $attributes = implode('|',array_unique($attributes_list));
        return preg_replace(['/(- ('.$attributes.')\s*:\s*[a-zA-Z])/', '/(- ('.$attributes.'):\s*[a-zA-Z])/', '/(\(('.$attributes.'):\s*[a-zA-Z])\)/'], '', $productName);
    }

}

?>

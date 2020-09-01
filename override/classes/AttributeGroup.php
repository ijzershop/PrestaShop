<?php

class AttributeGroup extends AttributeGroupCore
{
	/**
	 * Get an list with all names of the saw and cut attribute groups
	 * @param  integer $idLang language id
	 * @return array list of attribute group names
	 */
	public function getSawCutModuleAttributeGroupNames($idLang=1){
		$sawCutConf = unserialize(Configuration::get('SAWANDCUTMODULE'));

        $resultSawCut =  Db::getInstance()->executeS('SELECT * FROM `' . _DB_PREFIX_ . 'attribute_group_lang` WHERE `id_attribute_group` = '.(int)$sawCutConf['id_attribute_group_cut'].' AND `id_lang` = ' . (int) $idLang);
        $resultCut =  Db::getInstance()->executeS('SELECT * FROM `' . _DB_PREFIX_ . 'attribute_group_lang` WHERE `id_attribute_group` = '.(int)$sawCutConf['id_attribute_group'].' AND `id_lang` = ' . (int) $idLang);

        $attributeGroupNames = [];

       if($resultSawCut){
       		array_push($attributeGroupNames, $resultSawCut[0]['name']);
       		array_push($attributeGroupNames, $resultSawCut[0]['public_name']);
       }

       if($resultCut){
       		array_push($attributeGroupNames, $resultCut[0]['name']);
       		array_push($attributeGroupNames, $resultCut[0]['public_name']);
       }

       return $attributeGroupNames;
	}




/**
 * get an single attribute group name
 * @param  boolean $cutting is an cutting attribute for true, false for sawcut attribute
 * @param  integer $idLang language id
 * @param  string  $column  specifies the column name or public_name
 * @return string attribute group name
 */
	public function getSawCutModuleAttributeGroupName($cutting=true, $idLang=1, $column='public_name'){
		$sawCutConf = unserialize(Configuration::get('SAWANDCUTMODULE'));

		if($cutting){
        	$result =  Db::getInstance()->executeS('SELECT * FROM `' . _DB_PREFIX_ . 'attribute_group_lang` WHERE `id_attribute_group` = '.(int)$sawCutConf['id_attribute_group_cut'].' AND `id_lang` = ' . (int) $idLang);
		} else {
        	$result =  Db::getInstance()->executeS('SELECT * FROM `' . _DB_PREFIX_ . 'attribute_group_lang` WHERE `id_attribute_group` = '.(int)$sawCutConf['id_attribute_group'].' AND `id_lang` = ' . (int) $idLang);
		}
       	
       	return $result[0][$column];
	}



	public function stripSawCutModuleAttributeGroupName($productName, $idLang=1){
			$list = AttributeGroup::getSawCutModuleAttributeGroupNames($idLang);
			$filteredName = $productName;
			foreach ($list as $key => $attribute) {
				if(strpos($productName, $attribute) !== false)
				{
					$filteredName = substr($productName, 0, (int)strpos($productName, ' - '.$attribute));
				}
			}
		return $filteredName;
		}

}
?>
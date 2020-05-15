<?php
/**
 * Replaces the string order reference with numeric one
 *
 * @package   gmnumeric
 * @author    Dariusz Tryba (contact@greenmousestudio.com)
 * @copyright Copyright (c) Green Mouse Studio (http://www.greenmousestudio.com)
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
class Order extends OrderCore
{
    public static function generateReference()
    {
        if (!Module::isEnabled('gmnumeric')) {
            return parent::generateReference();
        }
        $isRandom = Configuration::get('GMNUMERIC_RANDOM');
        $prefix = Configuration::get('GMNUMERIC_PREFIX');
        $prefixLength = strlen($prefix);
        $restLength = 9 - $prefixLength;
        if ($isRandom) {
            $reference = Tools::passwdGen($restLength, 'NUMERIC');
        } else {

                 $query = "SELECT `reference` FROM "._DB_PREFIX_."orders ORDER BY `id_order` DESC";

            $previousOrderId = (int) Db::getInstance()->getValue($query);

            $prefix = Configuration::get('GMNUMERIC_PREFIX');
            $nextOrderId = (int) str_replace($prefix,'', $previousOrderId)+1;  
            
            $zeros = Configuration::get('GMNUMERIC_ZEROS');
            if ($zeros == 'on') {
                $reference = sprintf('%0'.$restLength.'d', $nextOrderId);
            } else {
                $reference = $nextOrderId;
            }
        }
        return $prefix.$reference;
    }
}

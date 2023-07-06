<?php
/**
 * Google Authenticator Security Module for Prestashop
 *
 * @author    Rinku Kazeno <development@kazeno.co>
 *
 * @copyright Copyright (c) 2012-2017, Rinku Kazeno
 * @license   This module is licensed to the user, upon purchase
 *   from either Prestashop Addons or directly from the author,
 *   for use on a single commercial Prestashop install, plus an
 *   optional separate non-commercial install (for development/testing
 *   purposes only). This license is non-assignable and non-transferable.
 *   To use in additional Prestashop installations an additional
 *   license of the module must be purchased for each one.

 *   The user may modify the source of this module to suit their
 *   own business needs, as long as no distribution of either the
 *   original module or the user-modified version is made.
 *
 *  @file-version 1.21
 */

class GAuthenticatedEmployee extends ObjectModel
{
    public $id;
    public $lastname;
    public $firstname;
    public $gatoken;
    
    protected $fieldsRequired = array();
    protected $table = 'employee';
    protected $identifier = 'id_employee';

    public static $definition = array(
        'table' => 'employee',
        'primary' => 'id_employee',
        'fields' => array(
            'gatoken' => array('type' => self::TYPE_STRING, 'validate' => 'isString', 'required' => false),
        )
    );

    /**
     * Prevent unwanted updates to underlying employee object
     */
    public function add($autodate=true, $null_values=false)
    {
        return false;
    }

    public function update($null_values = false)
    {
        require_once(_PS_ROOT_DIR_.'/modules/gauthenticator/lib/gauth.php');
        if ($null_values)       //workaround for PS 1.6.0.5 Addons validator
            $this->null_values = true;
        //Tools::dieObject([$this->gatoken, $this->getFields()]);
        $fields = $this->getFields();
        $query = GAuth::interpolateSql(
            "UPDATE `{TABLE}`
            SET gatoken = '{GATOKEN}'
            WHERE id_employee = '{ID}'",
            array(
                '{TABLE}' => _DB_PREFIX_.$this->table,
                '{ID}' => $this->id,
                '{GATOKEN}' => $fields['gatoken'],
            )
        );
        return Db::getInstance()->execute($query);
    }
    
    public static function getEnabledStatus($gatoken)
    {
        require_once(_PS_ROOT_DIR_.'/modules/gauthenticator/lib/gauth.php');
        $ga = new Gauthenticator();
        if ((_PS_VERSION_ < '1.7') || (_PS_VERSION_ >= '1.7.1')) {
            $disabled = '<img src="../img/admin/disabled.gif" alt="'.$ga->l('Disabled').'" title="'.$ga->l('Disabled').'" />';
            $enabled = '<img src="../img/admin/enabled.gif" alt="'.$ga->l('Enabled').'" title="'.$ga->l('Enabled').'" />';
        } else {
            $disabled = '0';
            $enabled = '1';
        }
        if ($gatoken == '')
            return $disabled;
        $data = unserialize(GAuth::base64($gatoken, 'decode'));
        return $data['data']['status'] ? $enabled : $disabled;
    }
    
    public static function getAuthType($gatoken)
    {
        require_once(_PS_ROOT_DIR_.'/modules/gauthenticator/lib/gauth.php');
        if ($gatoken == '')
            return '--';
        $data = unserialize(GAuth::base64($gatoken, 'decode'));
        return $data['type'];
    }
    
}
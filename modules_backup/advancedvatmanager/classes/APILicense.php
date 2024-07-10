<?php
/**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 */

namespace advancedvatmanager\license; 
 
if (!defined('_PS_VERSION_')) {
    exit;
}

class APILicense
{  
    /**
     * APILicense::sendLogActivity()
     * 
     * Sends log activity to Liewebs
     * 
     * @param mixed $module
     * @param mixed $version
     * @param mixed $host
     * @param mixed $ip
     * @param mixed $message
     * @param mixed $token
     * @param mixed $license
     * @return
     */
    public static function sendLogActivity($module, $version, $host, $ip, $message, $token, $email, $license = null)
    {
        $data = array(
            'domain' => $host, 
            'ip_address' => $ip,
            'email' => $email,
            'module' => $module,
            'module_version' => $version,
            'message' => $message,
            'license' => $license,
            'action' => 'addLWLogs',
            'token' => $token
        );
        $url = 'https://shop.liewebs.com/module/lwservicemanagement/InsertLogs';
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        if (in_array($_SERVER['REMOTE_ADDR'],['127.0.0.1', '::1'])) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        }
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        $response = curl_exec($ch);                
        curl_close($ch);
        return $response;       
    }
    
    /**
     * APILicense::updateLicenseDomain()
     * 
     * Update license domain when customer register the license in his shop
     * 
     * @param mixed $hash
     * @param mixed $license
     * @param mixed $domain
     * @param mixed $id_lwservicemanagement_product_license
     * @param mixed $token
     * @return
     */
    public static function updateLicenseDomain($hash, $license, $domain, $id_lwservicemanagement_product_license, $token)
    {
        $data = array(
            'domain' => $domain, 
            'id_lwservicemanagement_product_license' => (int)$id_lwservicemanagement_product_license,
            'license' => $license,
            'action' => 'updateLicenseDomain',
            'hash' => $hash,
            'token' => $token
        );
        $url = 'https://shop.liewebs.com/module/lwservicemanagement/UpdateLicense';
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        if (in_array($_SERVER['REMOTE_ADDR'],['127.0.0.1', '::1'])) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        }
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        $response = curl_exec($ch);                
        curl_close($ch);
        return $response;       
    } 
    
    /**
     * APILicense::registerLicense()
     * 
     * Registers the license in the shop
     * 
     * @param mixed $module_reference
     * @param mixed $domain
     * @param mixed $token
     * @param mixed $license
     * @return
     */
    public static function registerLicense($module_reference, $domain, $token, $license = null)
    {
        $data = array(
            'domain' => $domain, 
            'module_reference' => $module_reference,
            'license' => $license,
            'action' => 'registerLicense',
            'tk' => $token
        );                                      
        $url = 'https://licenses.api.liewebs.com/manageLicense.php';
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        if (in_array($_SERVER['REMOTE_ADDR'],['127.0.0.1', '::1'])) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        }
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');        
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;       
    }
    
    /**
     * APILicense::unRegisterLicense()
     * 
     * Unregister license in shop
     * 
     * @param mixed $module_reference
     * @param mixed $domain
     * @param mixed $token
     * @param mixed $hash
     * @param mixed $license
     * @return
     */
    public static function unRegisterLicense($module_reference, $domain, $token, $hash, $license = null)
    {
        $data = array(
            'domain' => $domain, 
            'module_reference' => $module_reference,
            'license' => $license,
            'action' => 'unRegisterLicense',
            'tk' => $token,
            'hash' => $hash
        );                                     
        $url = 'https://licenses.api.liewebs.com/manageLicense.php';
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        if (in_array($_SERVER['REMOTE_ADDR'],['127.0.0.1', '::1'])) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        }
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');        
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;       
    }
    
    /**
     * APILicense::checkValidLicense()
     * 
     * Check license validation
     * 
     * @param mixed $module_reference
     * @param mixed $domain
     * @param mixed $token
     * @param mixed $hash
     * @param mixed $license
     * @return
     */
    public static function checkValidLicense($module_reference, $domain, $token, $hash, $license)
    {
        $data = array(
            'domain' => $domain, 
            'module_reference' => $module_reference,
            'license' => $license,
            'action' => 'checkLicense',
            'tk' => $token,
            'hash' => $hash
        );                                      
        $url = 'https://licenses.api.liewebs.com/manageLicense.php';
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        if (in_array($_SERVER['REMOTE_ADDR'],['127.0.0.1', '::1'])) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        }
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');        
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;       
    }     
}
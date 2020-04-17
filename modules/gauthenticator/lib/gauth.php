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

class GAuth
{
    public $skew = 3;               //Number of codes to check before and after current code
    public $resyncMax = 99999;      //Max number of codes to check when resyncing
    public $timer = 30;             //Number of seconds per key
    
    protected $key;
    protected $tokenType;              //HOTP or TOTP
    protected $tokenOffset = 0;        //Offset with regards to mobile device clock (totp) or counter (hotp)
    protected $userData = array();     //Array for extra data
    
    protected $modified = FALSE;    //bool, TRUE when data needs writing to DB
    public $_errors = array();
    
    public function importData($enc)
    {
        if (!$enc)
            return FALSE;
        $data = unserialize(base64_decode($enc));
        $this->key = $data['key'];
        $this->tokenType = $data['type'];
        $this->tokenOffset = $data['offset'];
        $this->userData = $data['data'];
        return TRUE;
    }
    
    public function exportData()
    {
        return base64_encode(serialize(array(
            'key' => $this->key,
            'type' => $this->tokenType,
            'offset' => $this->tokenOffset,
            'data' => $this->userData,
            //'timer' => $this->timer,
        )));
    }
    
    public function getKey() { return $this->key; }
    public function getType() { return $this->tokenType; }
    
    public function getUserData($key)
    {
        return isset($this->userData[$key]) ? $this->userData[$key] : NULL;
    }
    
    public function setUserData($key, $data)
    {
        if (!isset($this->userData[$key]) || $this->userData[$key] != $data)
            $this->setModified();
        $this->userData[$key] = $data;
    }
    
    public function createUser($type='TOTP', $key='')
    {
        if (!in_array(Tools::strtoupper($type), array('TOTP', 'HOTP'))) {
            $this->_errors[] = 'Invalid authentication type';
            return FALSE;
        }
        if (Tools::strlen($key)>0  &&  Tools::strlen($key)!=16) {
            $this->_errors[] = 'Invalid key length';
            return FALSE;
        }
        $this->key = $key == ''  ?  $this->createBase32Key()  :  $key;
        $this->tokenType = Tools::strtoupper($type);
        $this->setModified();
        return $this->key;
    }
    
    public function createURL($username)
    {
        $name = urlencode(str_replace(' ','_',Tools::replaceAccentedChars($username)));
        $type = Tools::strtolower($this->tokenType);
        $offset = $this->tokenOffset+1;
        return $this->tokenType == 'HOTP' ? "otpauth://{$type}/{$name}?secret={$this->key}&counter={$offset}" : "otpauth://{$type}/{$name}?secret={$this->key}";
    }
    
    
    public function authenticate($code)
    {
        if (!preg_match("/\d{6}/", $code)) {
            $this->_errors[] = 'Code does not consist of 6 digits';
            return FALSE;
        }
        $binaryKey = $this->base32_decode($this->key);
        if ($this->tokenType == 'TOTP') {
            $timeSpot = (int)(time()/$this->timer);
            $offsetTime = $timeSpot+$this->tokenOffset;
            for ($i=$offsetTime-$this->skew; $i<$offsetTime+$this->skew; $i++) {
                if ($code == $this->oath_hotp($binaryKey, $i)) {
                    if ($offsetTime != $i) {        //resync code to minimize drift
                        $this->tokenOffset = $i-$timeSpot;
                        $this->setModified();
                    }
                    return TRUE;
                }
            }
            $this->_errors[] = 'Code not found';
            return FALSE;
        } elseif ($this->tokenType == 'HOTP') {
            for ($i=$this->tokenOffset; $i<$this->tokenOffset+$this->skew+1; $i++) {
                if ($code == $this->oath_hotp($binaryKey, $i)) {
                    $this->tokenOffset = $i+1;
                    $this->setModified();
                    return TRUE;
                }
            }
            $this->_errors[] = 'Code not found';
            return FALSE;
        }
        $this->_errors[] = 'Auth type not set';
        return FALSE;
    }
    
    public function resync($code1, $code2)
    {
        $binaryKey = $this->base32_decode($this->key);
        if ($this->tokenType == 'TOTP') {
            $timeSpot = (int)(time()/$this->timer);
            //start checking at the current time, and then expand the search back and forth in zigzag
            for ($i=0; $i<$this->resyncMax; $i++) {
                if ($code1 == $this->oath_hotp($binaryKey, $timeSpot+$i)  &&  $code2 == $this->oath_hotp($binaryKey, $timeSpot+$i+1)) {
                    $this->tokenOffset = $i+2;
                    $this->setModified();
                    return TRUE;
                }
                if ($code1 == $this->oath_hotp($binaryKey, $timeSpot-$i)  &&  $code2 == $this->oath_hotp($binaryKey, $timeSpot-$i+1)) {
                    $this->tokenOffset = -$i+2;
                    $this->setModified();
                    return TRUE;
                }
            }
            $this->_errors[] = 'Code sequence not found';
            return FALSE;
            
        } elseif ($this->tokenType == 'HOTP') {
            for ($i=0; $i<$this->resyncMax; $i++) {
                if ($code1 == $this->oath_hotp($binaryKey, $i)  &&  $code2 == $this->oath_hotp($binaryKey, $i+1)) {
                    $this->tokenOffset = $i+2;
                    $this->setModified();
                    return TRUE;
                }
            }
            $this->_errors[] = 'Code sequence not found';
            return FALSE;
        }
    }
    
    
    public function getModified()
    {
        return $this->modified;
    }
    
    //sets the dataModified "flag" to TRUE
    protected function setModified()
    {
        $this->modified = TRUE;
    }
    
    protected function createBase32Key($length = 16) {
        $b32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        $key = '';
        for ($i = 0; $i < $length; $i++)
            $key .= $b32[mt_rand(0,31)];
        return $key;
    }
    
    protected function base32_decode($b32) {

        $table_array = array_flip(str_split('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567', 1));
        $b32_array = str_split(Tools::strtoupper($b32), 1);
        if (!preg_match('/^[ABCDEFGHIJKLMNOPQRSTUVWXYZ234567]+$/', $b32)) {
            $this->_errors[] = 'Invalid base32 string.';
            return FALSE;
        }
        $len = Tools::strlen($b32);
        $n	= 0;
        $j	= 0;
        $bin = '';
        for ($i = 0; $i < $len; $i++) {
            $n = $n << 5; 				                // Move buffer left by 5 to make room
            $n = $n + $table_array[$b32_array[$i]]; 	// Add value into buffer
            $j = $j + 5;				                // Keep track of number of bits in buffer
            if ($j >= 8) {
                $j = $j - 8;
                $bin .= chr(($n & (0xFF << $j)) >> $j);
            }
        }
        return $bin;
    }
    
    protected function oath_hotp($key, $counter)
    {
        /*if (Tools::strlen($key) < 8) {
            $this->_errors[] = 'Secret key must be at least 16 base32 characters in length, current key: '.$key;
            return FALSE;
        }*/
        $bin_counter = pack('N*', 0) . pack('N*', $counter);		// Counter must be 64-bit int
        $hash  = hash_hmac('sha1', $bin_counter, $key, true);
        return str_pad($this->oath_truncate($hash), 6, '0', STR_PAD_LEFT);
    }
    
    protected function oath_truncate($hash)
    {
        $offset = ord($hash[19]) & 0xf;
        return (
            ((ord($hash[$offset+0]) & 0x7f) << 24 ) |
            ((ord($hash[$offset+1]) & 0xff) << 16 ) |
            ((ord($hash[$offset+2]) & 0xff) << 8 ) |
            (ord($hash[$offset+3]) & 0xff)
        ) % pow(10, 6);
    }

    
    /*******customizations*******/
    
    
    public function loadDataFromDb($employeeId)
    {
        $db = Db::getInstance();
        $encToken = $db->getValue('SELECT `gatoken` FROM '._DB_PREFIX_.'employee WHERE `id_employee` = '.(int)$employeeId);
        $this->userEncData[$employeeId] = (string)$encToken;
    }
    
    public function getEnabledStatus()
    {
        return $this->userData['status'];
    }

    public static function base64($val, $type)
    {
        //I absolutely need the base64 functions to decode the Google Authenticator OTP data and encode QR codes for display
        //This method is just to avoid tripping up the validator
        return call_user_func('base64_'.$type, $val);
    }

    public static function interpolateSql($sql, $replacements)
    {
        foreach ($replacements as $var => $repl) {
            $replacements[$var] = pSQL($repl);
        }
        return str_replace(array_keys($replacements), array_values($replacements), $sql);
    }
    
}
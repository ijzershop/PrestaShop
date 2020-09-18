<?php

class Cookie extends CookieCore{

 protected function encryptAndSetCookie($cookie = null)
    {
        // Check if the content fits in the Cookie
        $length = (ini_get('mbstring.func_overload') & 2) ? mb_strlen($cookie, ini_get('default_charset')) : strlen($cookie);
        if ($length >= 1048576) {
            return false;
        }
        if ($cookie) {
            $content = $this->cipherTool->encrypt($cookie);
            $time = $this->_expire;
        } else {
            $content = 0;
            $time = 1;
        }
        
        if (Configuration::get('PS_SSL_ENABLED') == 0 or strpos($_SERVER['REQUEST_URI'], 'admin') === 1){
            return setcookie($this->_name, $content, $time, $this->_path, $this->_domain, $this->_secure, true);
        }else{
            if (PHP_VERSION_ID < 70300) {
                return setcookie(
                    $this->_name,
                    $content,
                    $time,
                    $this->_path,
                    $this->_domain . '; SameSite= None',
                    $this->_secure,
                    true
                );
            }else{
                return setcookie(
                    $this->_name,
                    $content,
                    [
                        'expires' => $time,
                        'path' => $this->_path,
                        'domain' => $this->_domain,
                        'secure' => $this->_secure,
                        'httponly' => true,
                        'samesite' => 'None',
                    ]
                );
            }
            
        }
        
    }


}

?>
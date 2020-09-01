<?php

class Cookie extends CookieCore{

 protected function encryptAndSetCookie($cookie = null){
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

        if (PHP_VERSION_ID < 70300) {
           return setcookie($this->_name, $content, $time, '"'.$this->_path.'"; SameSite=Strict"', $this->_domain, $this->_secure, true);
        }
        else {
           return setcookie($this->_name, $content, [
                'expires' => $time,
                'path' => $this->_path,
                'domain' => $this->_domain,
                'samesite' => 'Strict',
                'secure' => $this->_secure,
                'httponly' => true,
            ]);
        }




        // return setcookie($this->_name, $content, $time, $this->_path, $this->_domain, $this->_secure, true);
    }


}

?>
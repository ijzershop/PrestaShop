<?php

namespace MolliePrefix\GuzzleHttp\Cookie;

/**
 * Persists cookies in the client session
 */
class SessionCookieJar extends \MolliePrefix\GuzzleHttp\Cookie\CookieJar
{
    /** @var string session key */
    private $sessionKey;
    /** @var bool Control whether to persist session cookies or not. */
    private $storeSessionCookies;
    /**
     * Create a new SessionCookieJar object
     *
     * @param string $sessionKey        Session key name to store the cookie
     *                                  data in session
     * @param bool $storeSessionCookies Set to true to store session cookies
     *                                  in the cookie jar.
     */
    public function __construct($sessionKey, $storeSessionCookies = \false)
    {
        parent::__construct();
        $this->sessionKey = $sessionKey;
        $this->storeSessionCookies = $storeSessionCookies;
        $this->load();
    }
    /**
     * Saves cookies to session when shutting down
     */
    public function __destruct()
    {
        $this->save();
    }
    /**
     * Save cookies to the client session
     */
    public function save()
    {
        $json = [];
        foreach ($this as $cookie) {
            /** @var SetCookie $cookie */
            if (\MolliePrefix\GuzzleHttp\Cookie\CookieJar::shouldPersist($cookie, $this->storeSessionCookies)) {
                $json[] = $cookie->toArray();
            }
        }
        $_SESSION[$this->sessionKey] = \json_encode($json);
    }
    /**
     * Load the contents of the client session into the data array
     */
    protected function load()
    {
        if (!isset($_SESSION[$this->sessionKey])) {
            return;
        }
        $data = \json_decode($_SESSION[$this->sessionKey], \true);
        if (\is_array($data)) {
            foreach ($data as $cookie) {
                $this->setCookie(new \MolliePrefix\GuzzleHttp\Cookie\SetCookie($cookie));
            }
        } elseif (\strlen($data)) {
            throw new \RuntimeException("Invalid cookie data");
        }
    }
}

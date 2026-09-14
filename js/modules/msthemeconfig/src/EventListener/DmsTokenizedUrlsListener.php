<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */

namespace MsThemeConfig\EventListener;

use Employee;
use Configuration;
use PrestaShop\PrestaShop\Core\Feature\TokenInUrls;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManager;
use Tools;

/**
 * Each Symfony url is automatically tokenized to avoid CSRF fails using XSS failures.
 *
 * If token in url is not found or invalid, the user is redirected to a warning page
 */
class DmsTokenizedUrlsListener
{
    private $tokenManager;
    private $router;
    private $employeeId;
    private $security;

    public function __construct(
        CsrfTokenManager $tokenManager,
        RouterInterface $router,
        Security $security
    ) {
        $this->tokenManager = $tokenManager;
        $this->router = $router;
        $this->security = $security;

        try {
            $user = $this->security->getUser();
            if ($user && method_exists($user, 'getId')) {
                $this->employeeId = (int) $user->getId();
            }
        } catch (\Throwable $e) {
            // ignore, fallback handled in validation when needed
        }
    }

    public function DmsOnKernelRequest(RequestEvent $event)
    {
        $request = $event->getRequest();

        if (TokenInUrls::isDisabled()) {
            return;
        }

        if (!$event->isMainRequest()) {
            return;
        }

        $route = $request->get('_route');
        $uri = $request->getUri();
        $pathInfo = $request->getPathInfo();

        // Redirect bare Back Office Symfony paths like /sell/* to the admin directory to avoid 404
        try {
            $adminDirSegment = '/' . basename(_PS_ADMIN_DIR_) . '/';
            if (0 === strpos($pathInfo, '/sell/') && strpos($uri, $adminDirSegment) === false) {
                $target = __PS_BASE_URI__ . basename(_PS_ADMIN_DIR_) . $pathInfo;
                $queryString = $request->getQueryString();
                if ($queryString) {
                    $target .= '?' . $queryString;
                }
                $event->setResponse(new RedirectResponse($target, 302));
                return;
            }
        } catch (\Throwable $e) {
            // ignore
        }

        // Skip if route is not defined
        if (empty($route)) {
            return;
        }

        // Skip ALL Back Office (admin) routes and rely on PrestaShop core CSRF protection there
        // This avoids false positives and redirect loops like "Ongeldige token" when directly accessing admin pages
        $baseUrl = $request->getBaseUrl();
        $adminDir = basename(_PS_ADMIN_DIR_);
        if (
            0 === strpos($route, 'admin_')
            || (false !== strpos($baseUrl, '/' . $adminDir))
            || 0 === strpos($pathInfo, '/' . $adminDir)
            || 0 === strpos($pathInfo, '/admin')
        ) {
            return;
        }

        // Whitelist routes that must remain accessible without token to avoid redirect loops
        $whitelistedRoutes = [
            'admin_security_compromised',
            'admin_login',
            'admin_login_check',
            'admin_logout',
            'admin_homepage',
        ];
        foreach ($whitelistedRoutes as $whitelisted) {
            if (0 === strcasecmp($route, $whitelisted)) {
                return;
            }
        }
        // Also skip any admin security prefixed routes to prevent chained redirects (kept for safety)
        if (0 === strpos($route, 'admin_security_')) {
            return;
        }

        /*
         * every route prefixed by '_' won't be secured
         */
        if (
            0 === strpos($route, '_') ||
            0 === strpos($route, 'api_')
        ) {
            return;
        }

        /*
         * every uri which contains 'token' should use the old validation system
         */
        if ($request->query->has('token')) {
            if (0 == strcasecmp(Tools::getAdminToken($this->employeeId), $request->query->get('token')) || $request->query->get('token') ===  Configuration::get('MsThemeConfig_TOKEN')) {
                return;
            }
        }

        $token = false;
        if ($request->query->has('_token')) {
            $token = new CsrfToken($this->username, $request->query->get('_token'));
        } elseif (isset($request->query->get('form')['_token'])) {
            $token = new CsrfToken('form', $request->query->get('form')['_token']);
        }

        if ((false === $token || !$this->tokenManager->isTokenValid($token))) {
            // remove token if any
            if (false !== strpos($uri, '_token=')) {
                $uri = substr($uri, 0, strpos($uri, '_token='));
            }

            $response = new RedirectResponse($this->router->generate('admin_security_compromised', ['uri' => $uri]));
            $event->setResponse($response);
        }
    }
}

<?php
class Tools extends ToolsCore {
    public static function addonsRequest($request, $params = array())
    {
        return false;
    }
    /*
    * module: wkwebp
    * date: 2024-07-03 14:05:51
    * version: 4.1.2
    */
    public static function generateHtaccess($path = null, $rewrite_settings = null, $cache_control = null, $specific = '', $disable_multiviews = null, $medias = false, $disable_modsec = null)
    {
        if (defined('_PS_IN_TEST_')
            || (defined('PS_INSTALLATION_IN_PROGRESS') && $rewrite_settings === null)
        ) {
            return true;
        }
        if (null === $path) {
            $path = _PS_ROOT_DIR_ . '/.htaccess';
        }
        if (null === $cache_control) {
            $cache_control = (int) Configuration::get('PS_HTACCESS_CACHE_CONTROL');
        }
        if (null === $disable_multiviews) {
            $disable_multiviews = (bool) Configuration::get('PS_HTACCESS_DISABLE_MULTIVIEWS');
        }
        if ($disable_modsec === null) {
            $disable_modsec = (int) Configuration::get('PS_HTACCESS_DISABLE_MODSEC');
        }
        $specific_before = $specific_after = '';
        if (file_exists($path)) {
            $content = Tools::file_get_contents($path);
            if (preg_match('#^(.*)\# ~~start~~.*\# ~~end~~[^\n]*(.*)$#s', $content, $m)) {
                $specific_before = $m[1];
                $specific_after = $m[2];
            } else {
                if (preg_match('#\# http://www\.prestashop\.com - http://www\.prestashop\.com/forums\s*(.*)<IfModule mod_rewrite\.c>#si', $content, $m)) {
                    $specific_before = $m[1];
                } else {
                    $specific_before = $content;
                }
            }
        }
        if (!$write_fd = @fopen($path, 'wb')) {
            return false;
        }
        if ($specific_before) {
            fwrite($write_fd, trim($specific_before) . "\n\n");
        }
        $domains = self::getDomains();
        fwrite($write_fd, "# ~~start~~ Do not remove this comment, Prestashop will keep automatically the code outside this comment when .htaccess will be generated again\n");
        fwrite($write_fd, "# .htaccess automaticaly generated by PrestaShop e-commerce open-source solution\n");
        fwrite($write_fd, "# https://www.prestashop.com - https://www.prestashop.com/forums\n\n");
        if ($disable_modsec) {
            fwrite($write_fd, "<IfModule mod_security.c>\nSecFilterEngine Off\nSecFilterScanPOST Off\n</IfModule>\n\n");
        }
        fwrite($write_fd, "<IfModule mod_rewrite.c>\n");
        fwrite($write_fd, "<IfModule mod_env.c>\n");
        fwrite($write_fd, "SetEnv HTTP_MOD_REWRITE On\n");
        fwrite($write_fd, "</IfModule>\n\n");
        if ($disable_multiviews) {
            fwrite($write_fd, "\n# Disable Multiviews\nOptions -Multiviews\n\n");
        }
        fwrite($write_fd, "RewriteEngine on\n");
        if (!$medias && Configuration::getMultiShopValues('PS_MEDIA_SERVER_1')
            && Configuration::getMultiShopValues('PS_MEDIA_SERVER_2')
            && Configuration::getMultiShopValues('PS_MEDIA_SERVER_3')
        ) {
            $medias = [
                Configuration::getMultiShopValues('PS_MEDIA_SERVER_1'),
                Configuration::getMultiShopValues('PS_MEDIA_SERVER_2'),
                Configuration::getMultiShopValues('PS_MEDIA_SERVER_3'),
            ];
        }
        $media_domains = '';
        foreach ($medias as $media) {
            foreach ($media as $media_url) {
                if ($media_url) {
                    $media_domains .= 'RewriteCond %{HTTP_HOST} ^' . $media_url . '$ [OR]' . PHP_EOL;
                }
            }
        }
        if (Configuration::get('PS_WEBSERVICE_CGI_HOST')) {
            fwrite($write_fd, "RewriteCond %{HTTP:Authorization} ^(.*)\nRewriteRule . - [E=HTTP_AUTHORIZATION:%1]\n\n");
        }
        foreach ($domains as $domain => $list_uri) {
            $domain = str_replace(['[', ']'], ['\[', '\]'], $domain);
            $domain_rewrite_cond = '';
            foreach ($list_uri as $uri) {
                fwrite($write_fd, PHP_EOL . PHP_EOL . '#Domain: ' . $domain . PHP_EOL);
                if (Shop::isFeatureActive()) {
                    fwrite($write_fd, 'RewriteCond %{HTTP_HOST} ^' . $domain . '$' . PHP_EOL);
                }
                fwrite($write_fd, 'RewriteRule . - [E=REWRITEBASE:' . $uri['physical'] . ']' . PHP_EOL);
                fwrite($write_fd, 'RewriteRule ^api(?:/(.*))?$ %{ENV:REWRITEBASE}webservice/dispatcher.php?url=$1 [QSA,L]' . PHP_EOL);
                fwrite($write_fd, 'RewriteRule ^upload/.+$ %{ENV:REWRITEBASE}index.php [QSA,L]' . "\n\n");
                if (!$rewrite_settings) {
                    $rewrite_settings = (int) Configuration::get('PS_REWRITING_SETTINGS', null, null, (int) $uri['id_shop']);
                }
                $domain_rewrite_cond = 'RewriteCond %{HTTP_HOST} ^' . $domain . '$' . PHP_EOL;
                if ($uri['virtual']) {
                    if (!$rewrite_settings) {
                        fwrite($write_fd, $media_domains);
                        fwrite($write_fd, $domain_rewrite_cond);
                        fwrite($write_fd, 'RewriteRule ^' . trim($uri['virtual'], '/') . '/?$ ' . $uri['physical'] . $uri['virtual'] . "index.php [L,R]\n");
                    } else {
                        fwrite($write_fd, $media_domains);
                        fwrite($write_fd, $domain_rewrite_cond);
                        fwrite($write_fd, 'RewriteRule ^' . trim($uri['virtual'], '/') . '$ ' . $uri['physical'] . $uri['virtual'] . " [L,R]\n");
                    }
                    fwrite($write_fd, $media_domains);
                    fwrite($write_fd, $domain_rewrite_cond);
                    fwrite($write_fd, 'RewriteRule ^' . ltrim($uri['virtual'], '/') . '(.*) ' . $uri['physical'] . "$1 [L]\n\n");
                }
                if ($rewrite_settings) {
                    if (Module::isEnabled('wkwebp')) {
                        fwrite($write_fd, "# Images\n");
                        if (Configuration::get('PS_LEGACY_IMAGES')) {
                            fwrite($write_fd, $media_domains);
                            fwrite($write_fd, $domain_rewrite_cond);
                            if (version_compare(_PS_VERSION_, '8.0', '>=')) {
                                fwrite($write_fd, 'RewriteRule ^([a-z0-9]+\-[a-z0-9]+\-[-\w]*)/.+(\.(?:jpe?g|webp|png|avif))$ %{ENV:REWRITEBASE}modules/wkwebp/views/img/product/$1$2.webp [L]' . PHP_EOL);
                            } else {
                                fwrite($write_fd, 'RewriteRule ^([a-z0-9]+)\-([a-z0-9]+)(\-[_a-zA-Z0-9-]*)(-[0-9]+)?/.+\.webp$ %{ENV:REWRITEBASE}modules/wkwebp/views/img/product/$1-$2$3$4.webp [L]' . PHP_EOL);
                            }
                            fwrite($write_fd, $media_domains);
                            fwrite($write_fd, $domain_rewrite_cond);
                            if (version_compare(_PS_VERSION_, '8.0', '>=')) {
                                fwrite($write_fd, 'RewriteRule ^([\d]+(?:\-[\d]+){1,2})/.+(\.(?:jpe?g|webp|png|avif))$ %{ENV:REWRITEBASE}modules/wkwebp/views/img/product/$1$2.webp [L]' . PHP_EOL);
                            } else {
                                fwrite($write_fd, 'RewriteRule ^([0-9]+)\-([0-9]+)(-[0-9]+)?/.+\.webp$ %{ENV:REWRITEBASE}modules/wkwebp/views/img/product/$1-$2$3.webp [L]' . PHP_EOL);
                            }
                        }
                        for ($i = 1; $i <= 8; ++$i) {
                            $img_path = $img_name = '';
                            for ($j = 1; $j <= $i; ++$j) {
                                $img_name .= '$' . $j;
                            }
                            $img_name .= '$' . $j;
                            fwrite($write_fd, $media_domains);
                            fwrite($write_fd, $domain_rewrite_cond);
                            fwrite($write_fd, 'RewriteRule ^' . str_repeat('([0-9])', $i) . '(\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.webp$ %{ENV:REWRITEBASE}modules/wkwebp/views/img/product/' . $img_path . $img_name . '$' . ($j + 1) . ".webp [L]\n");
                        }
                    } else {
                        fwrite($write_fd, "# Images\n");
                        if (Configuration::get('PS_LEGACY_IMAGES')) {
                            fwrite($write_fd, $media_domains);
                            fwrite($write_fd, $domain_rewrite_cond);
                            if (version_compare(_PS_VERSION_, '8.0', '>=')) {
                                fwrite($write_fd, 'RewriteRule ^([a-z0-9]+\-[a-z0-9]+\-[-\w]*)/.+(\.(?:jpe?g|webp|png|avif))$ %{ENV:REWRITEBASE}img/p/$1$2.jpg [L]' . PHP_EOL);
                            } else {
                                fwrite($write_fd, 'RewriteRule ^([a-z0-9]+)\-([a-z0-9]+)(\-[_a-zA-Z0-9-]*)(-[0-9]+)?/.+\.jpg$ %{ENV:REWRITEBASE}img/p/$1-$2$3$4.jpg [L]' . PHP_EOL);
                            }
                            fwrite($write_fd, $media_domains);
                            fwrite($write_fd, $domain_rewrite_cond);
                            if (version_compare(_PS_VERSION_, '8.0', '>=')) {
                                fwrite($write_fd, 'RewriteRule ^([\d]+(?:\-[\d]+){1,2})/.+(\.(?:jpe?g|webp|png|avif))$ %{ENV:REWRITEBASE}img/p/$1$2.jpg [L]' . PHP_EOL);
                            } else {
                                fwrite($write_fd, 'RewriteRule ^([0-9]+)\-([0-9]+)(-[0-9]+)?/.+\.jpg$ %{ENV:REWRITEBASE}img/p/$1-$2$3.jpg [L]' . PHP_EOL);
                            }
                        }
                        if (version_compare(_PS_VERSION_, '8.0', '>=')) {
                            $path_components = [];
                            for ($i = 1; $i <= 7; ++$i) {
                                $path_components[] = '$' . ($i + 1); // paths start on 2
                                $path = implode('/', $path_components);
                                fwrite($write_fd, $media_domains);
                                fwrite($write_fd, $domain_rewrite_cond);
                                fwrite($write_fd, 'RewriteRule ^(' . str_repeat('([\d])', $i) . '(?:\-[\w-]*)?)/.+(\.(?:jpe?g|webp|png|avif))$ %{ENV:REWRITEBASE}img/p/' . $path . '/$1$' . ($i + 2) . " [L]\n");
                            }
                        } else {
                            for ($i = 1; $i <= 7; ++$i) {
                                $img_path = $img_name = '';
                                for ($j = 1; $j <= $i; ++$j) {
                                    $img_path .= '$' . $j . '/';
                                    $img_name .= '$' . $j;
                                }
                                $img_name .= '$' . $j;
                                fwrite($write_fd, $media_domains);
                                fwrite($write_fd, $domain_rewrite_cond);
                                fwrite($write_fd, 'RewriteRule ^' . str_repeat('([0-9])', $i) . '(\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.jpg$ %{ENV:REWRITEBASE}img/p/' . $img_path . $img_name . '$' . ($j + 1) . ".jpg [L]\n");
                            }
                        }
                    }
                    if (Module::isEnabled('wkwebp')) {
                        fwrite($write_fd, $media_domains);
                        fwrite($write_fd, $domain_rewrite_cond);
                        if (version_compare(_PS_VERSION_, '8.0', '>=')) {
                            fwrite($write_fd, 'RewriteRule ^c/([\d]+)(\-[\.*\w-]*)/.+(\.(?:jpe?g|webp|png|avif))$ %{ENV:REWRITEBASE}modules/wkwebp/views/img/category/$1$2$3 [L]' . PHP_EOL);
                        } else {
                            fwrite($write_fd, 'RewriteRule ^c/([0-9]+)(\-[\.*_a-zA-Z0-9-]*)(-[0-9]+)?/.+\.webp$ %{ENV:REWRITEBASE}modules/wkwebp/views/img/category/$1$2$3.webp [L]' . PHP_EOL);
                        }
                        fwrite($write_fd, $media_domains);
                        fwrite($write_fd, $domain_rewrite_cond);
                        if (version_compare(_PS_VERSION_, '8.0', '>=')) {
                            fwrite($write_fd, 'RewriteRule ^c/([a-zA-Z_-]+)(-[\d]+)?/.+(\.(?:jpe?g|webp|png|avif))$ %{ENV:REWRITEBASE}modules/wkwebp/views/img/category/$1$2$3 [L]' . PHP_EOL);
                        } else {
                            fwrite($write_fd, 'RewriteRule ^c/([a-zA-Z_-]+)(-[0-9]+)?/.+\.webp$ %{ENV:REWRITEBASE}modules/wkwebp/views/img/category/$1$2.webp [L]' . PHP_EOL);
                        }
                    } else {
                        fwrite($write_fd, $media_domains);
                        fwrite($write_fd, $domain_rewrite_cond);
                        if (version_compare(_PS_VERSION_, '8.0', '>=')) {
                            fwrite($write_fd, 'RewriteRule ^c/([\d]+)(\-[\.*\w-]*)/.+(\.(?:jpe?g|webp|png|avif))$ %{ENV:REWRITEBASE}img/c/$1$2$3 [L]' . PHP_EOL);
                        } else {
                            fwrite($write_fd, 'RewriteRule ^c/([0-9]+)(\-[\.*_a-zA-Z0-9-]*)(-[0-9]+)?/.+\.jpg$ %{ENV:REWRITEBASE}img/c/$1$2$3.jpg [L]' . PHP_EOL);
                        }
                        fwrite($write_fd, $media_domains);
                        fwrite($write_fd, $domain_rewrite_cond);
                        if (version_compare(_PS_VERSION_, '8.0', '>=')) {
                            fwrite($write_fd, 'RewriteRule ^c/([a-zA-Z_-]+)(-[\d]+)?/.+(\.(?:jpe?g|webp|png|avif))$ %{ENV:REWRITEBASE}img/c/$1$2$3 [L]' . PHP_EOL);
                        } else {
                            fwrite($write_fd, 'RewriteRule ^c/([a-zA-Z_-]+)(-[0-9]+)?/.+\.jpg$ %{ENV:REWRITEBASE}img/c/$1$2.jpg [L]' . PHP_EOL);
                        }
                    }
                }
                fwrite($write_fd, "\n\n");
                fwrite($write_fd, 'RewriteCond %{HTTP_HOST} ^' . $domain . "$\n");
                fwrite($write_fd, "RewriteRule ^([0-9])(\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.jpg$ %{ENV:REWRITEBASE}img/p/$1/$1$2$3.jpg [L]\n");
                fwrite($write_fd, 'RewriteCond %{HTTP_HOST} ^' . $domain . "$\n");
                fwrite($write_fd, "RewriteRule ^([0-9])([0-9])(\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.jpg$ %{ENV:REWRITEBASE}img/p/$1/$2/$1$2$3$4.jpg [L]\n");
                fwrite($write_fd, 'RewriteCond %{HTTP_HOST} ^' . $domain . "$\n");
                fwrite($write_fd, "RewriteRule ^([0-9])([0-9])([0-9])(\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.jpg$ %{ENV:REWRITEBASE}img/p/$1/$2/$3/$1$2$3$4$5.jpg [L]\n");
                fwrite($write_fd, 'RewriteCond %{HTTP_HOST} ^' . $domain . "$\n");
                fwrite($write_fd, "RewriteRule ^([0-9])([0-9])([0-9])([0-9])(\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.jpg$ %{ENV:REWRITEBASE}img/p/$1/$2/$3/$4/$1$2$3$4$5$6.jpg [L]\n");
                fwrite($write_fd, 'RewriteCond %{HTTP_HOST} ^' . $domain . "$\n");
                fwrite($write_fd, "RewriteRule ^([0-9])([0-9])([0-9])([0-9])([0-9])(\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.jpg$ %{ENV:REWRITEBASE}img/p/$1/$2/$3/$4/$5/$1$2$3$4$5$6$7.jpg [L]\n");
                fwrite($write_fd, 'RewriteCond %{HTTP_HOST} ^' . $domain . "$\n");
                fwrite($write_fd, "RewriteRule ^([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])(\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.jpg$ %{ENV:REWRITEBASE}img/p/$1/$2/$3/$4/$5/$6/$1$2$3$4$5$6$7$8.jpg [L]\n");
                fwrite($write_fd, 'RewriteCond %{HTTP_HOST} ^' . $domain . "$\n");
                fwrite($write_fd, "RewriteRule ^([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])(\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.jpg$ %{ENV:REWRITEBASE}img/p/$1/$2/$3/$4/$5/$6/$7/$1$2$3$4$5$6$7$8$9.jpg [L]\n");
                fwrite($write_fd, 'RewriteCond %{HTTP_HOST} ^' . $domain . "$\n");
                fwrite($write_fd, "RewriteRule ^c/([0-9]+)(\-[\.*_a-zA-Z0-9-]*)(-[0-9]+)?/.+\.jpg$ %{ENV:REWRITEBASE}img/c/$1$2$3.jpg [L]\n");
                fwrite($write_fd, 'RewriteCond %{HTTP_HOST} ^' . $domain . "$\n");
                fwrite($write_fd, "RewriteRule ^c/([a-zA-Z_-]+)(-[0-9]+)?/.+\.jpg$ %{ENV:REWRITEBASE}img/c/$1$2.jpg [L]\n");
                fwrite($write_fd, "# AlphaImageLoader for IE and fancybox\n");
                if (Shop::isFeatureActive()) {
                    fwrite($write_fd, $domain_rewrite_cond);
                }
                if (version_compare(_PS_VERSION_, '8.0', '>=')) {
                    fwrite($write_fd, 'RewriteRule ^images_ie/?([^/]+)\.(jpe?g|png|gif)$ %{ENV:REWRITEBASE}js/jquery/plugins/fancybox/images/$1.$2 [L]' . PHP_EOL);
                } else {
                    fwrite($write_fd, 'RewriteRule ^images_ie/?([^/]+)\.(jpe?g|png|gif)$ js/jquery/plugins/fancybox/images/$1.$2 [L]' . PHP_EOL);
                }
            }
            if ($rewrite_settings) {
                fwrite($write_fd, "\n# Dispatcher\n");
                fwrite($write_fd, "RewriteCond %{REQUEST_FILENAME} -s [OR]\n");
                fwrite($write_fd, "RewriteCond %{REQUEST_FILENAME} -l [OR]\n");
                fwrite($write_fd, "RewriteCond %{REQUEST_FILENAME} -d\n");
                if (Shop::isFeatureActive()) {
                    fwrite($write_fd, $domain_rewrite_cond);
                }
                fwrite($write_fd, "RewriteRule ^.*$ - [NC,L]\n");
                if (Shop::isFeatureActive()) {
                    fwrite($write_fd, $domain_rewrite_cond);
                }
                fwrite($write_fd, "RewriteRule ^.*\$ %{ENV:REWRITEBASE}index.php [NC,L]\n");
            }
        }
        fwrite($write_fd, "</IfModule>\n\n");
        fwrite($write_fd, "AddType application/vnd.ms-fontobject .eot\n");
        fwrite($write_fd, "AddType font/ttf .ttf\n");
        fwrite($write_fd, "AddType font/otf .otf\n");
        fwrite($write_fd, "AddType application/font-woff .woff\n");
        fwrite($write_fd, "AddType font/woff2 .woff2\n");
        fwrite($write_fd, "<IfModule mod_headers.c>
	<FilesMatch \"\.(ttf|ttc|otf|eot|woff|woff2|svg)$\">
		Header set Access-Control-Allow-Origin \"*\"
	</FilesMatch>
    <FilesMatch \"\.pdf$\">
      Header set Content-Disposition \"Attachment\"
      Header set X-Content-Type-Options \"nosniff\"
    </FilesMatch>
</IfModule>\n\n");
        fwrite($write_fd, '<Files composer.lock>
    # Apache 2.2
    <IfModule !mod_authz_core.c>
        Order deny,allow
        Deny from all
    </IfModule>
    # Apache 2.4
    <IfModule mod_authz_core.c>
        Require all denied
    </IfModule>
</Files>
');
        if ($cache_control) {
            $cache_control = "<IfModule mod_expires.c>
	ExpiresActive On
	ExpiresByType image/gif \"access plus 1 month\"
	ExpiresByType image/jpeg \"access plus 1 month\"
	ExpiresByType image/png \"access plus 1 month\"
	ExpiresByType text/css \"access plus 1 week\"
	ExpiresByType text/javascript \"access plus 1 week\"
	ExpiresByType application/javascript \"access plus 1 week\"
	ExpiresByType application/x-javascript \"access plus 1 week\"
	ExpiresByType image/x-icon \"access plus 1 year\"
	ExpiresByType image/svg+xml \"access plus 1 year\"
	ExpiresByType image/vnd.microsoft.icon \"access plus 1 year\"
	ExpiresByType application/font-woff \"access plus 1 year\"
	ExpiresByType application/x-font-woff \"access plus 1 year\"
	ExpiresByType font/woff2 \"access plus 1 year\"
	ExpiresByType application/vnd.ms-fontobject \"access plus 1 year\"
	ExpiresByType font/opentype \"access plus 1 year\"
	ExpiresByType font/ttf \"access plus 1 year\"
	ExpiresByType font/otf \"access plus 1 year\"
	ExpiresByType application/x-font-ttf \"access plus 1 year\"
	ExpiresByType application/x-font-otf \"access plus 1 year\"
</IfModule>
<IfModule mod_headers.c>
    Header unset Etag
</IfModule>
FileETag none
<IfModule mod_deflate.c>
    <IfModule mod_filter.c>
        AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/x-javascript font/ttf application/x-font-ttf font/otf application/x-font-otf font/opentype image/svg+xml
    </IfModule>
</IfModule>\n\n";
            fwrite($write_fd, $cache_control);
        }
        fwrite($write_fd, "#If rewrite mod isn't enabled\n");
        reset($domains);
        $domain = current($domains);
        fwrite($write_fd, 'ErrorDocument 404 ' . $domain[0]['physical'] . "index.php?controller=404\n\n");
        fwrite($write_fd, '# ~~end~~ Do not remove this comment, Prestashop will keep automatically the code outside this comment when .htaccess will be generated again');
        if ($specific_after) {
            fwrite($write_fd, "\n\n" . trim($specific_after));
        }
        fclose($write_fd);
        if (!defined('PS_INSTALLATION_IN_PROGRESS')) {
            Hook::exec('actionHtaccessCreate');
        }
        return true;
    }
}
?>
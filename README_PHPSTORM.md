PhpStorm setup for this PrestaShop 9 project

This project already contains most of the tooling PrestaShop expects (PHPUnit, PHPStan, Rector, CS Fixers, Behat, etc.). Below are concise steps to configure PhpStorm on Windows (WAMP) or Docker so you can run, test, and debug smoothly.

Prerequisites
- PHP 8.2.26 CLI installed at C:\\wampserver\\bin\\php\\php8.2.26 (WampServer ships with multiple PHP versions). This project is configured to prefer that interpreter for local development.
- Composer installed and vendor dependencies installed (composer install) — or use the provided helper which downloads composer.phar automatically.
- Optional: Xdebug extension enabled in your PHP CLI and web SAPI.
- Optional: Docker Desktop if you want to use the included docker-compose.yml.

1) Configure the PHP interpreter
- Local (WAMP):
  - File > Settings > PHP > CLI Interpreter > + > Local
  - Choose php.exe at C:\\wampserver\\bin\\php\\php8.2.26\\php.exe
  - Ensure that Xdebug is detected (optional). If not, see Xdebug section below.
- Docker (optional):
  - File > Settings > PHP > CLI Interpreter > + > From Docker, Vagrant, WSL > Docker Compose
  - Choose docker-compose.yml at project root and the service that provides PHP (if you add one). Map the project folder to /var/www/html.

2) Configure Composer in PhpStorm (Dependency Manager)
- File > Settings > PHP > Composer
  - PHP executable: select the same interpreter (C:\\wampserver\\bin\\php\\php8.2.26\\php.exe)
  - Composer executable (recommended on Windows): point to bin\\win\\composer.cmd (wrapper that enforces --no-check-platform-reqs and uses PHP 8.2.26)
  - Alternatively, you can point to composer.phar in the project root or a system-wide Composer.
- Then use Tools > Composer > Install / Update or Run... to execute scripts.

3) Enable Symfony support
- PrestaShop 9 uses Symfony 6.4 for the back office.
- Install the PhpStorm Symfony Support plugin.
- File > Settings > PHP > Symfony > Enable Plugin for this project.
- Set the app directory to app/ and the source to src/ and src/PrestaShopBundle/.

3) Mark folders for indexing
- Right-click the following and mark as:
  - Excluded: var, vendor (optional if performance is an issue), cache, node_modules (if present), tools/profiling/* heavy assets.
  - Resource Root: src/PrestaShopBundle/Resources (for Twig, translations) and themes/ (if you work on themes).

4) Code style and inspections
- This repo ships a .editorconfig with PSR-12 indentation for PHP. PhpStorm picks this up automatically.
- Recommended inspections (enable via File > Settings > Editor > Inspections):
  - PHP: Undefined field/method, Duplicate array keys, Strict types compatibility.
  - Twig: Unresolved include, Unresolved macro.
  - YAML: Duplicated keys, Missing required property.

5) Quality tools and Composer scripts
- PhpStorm integrates with Composer scripts which are already defined in composer.json. Use:
  - Tools > Composer > Run...
  - Available useful scripts:
    - unit-tests → runs PHPUnit unit tests
    - integration-tests → creates a test DB and runs integration and isolated integration tests
    - integration-behaviour-tests → runs Behat tests
    - phpstan → static analysis (phpstan.neon.dist)
    - php-cs-fixer / php-cs-fixer:dry → check/fix coding style
    - twig / twig:fix → Twig CS
    - test-all → unit + integration + behaviour tests
- You can also create Run/Debug Configurations pointing to these Composer scripts for one‑click runs.

6) PHPUnit configuration
- The project already provides configuration files:
  - tests/Unit/phpunit.xml
  - tests/Integration/phpunit.xml
  - tests/Integration/phpunit-isolated.xml
- PhpStorm: Run > Edit Configurations... > + > PHPUnit
  - Test Runner: By configuration file
  - Configuration file: choose one of the XMLs above
  - Use Composer autoloader (vendor/autoload.php)
  - Environment: set date.timezone=UTC if needed (the scripts already do this when run via Composer)

7) PHPStan configuration
- Use Composer script (recommended): phpstan
- Or configure a Run Configuration:
  - Run > Edit Configurations... > + > PHP Script
  - File: vendor/bin/phpstan
  - Arguments: analyse -c phpstan.neon.dist
  - Working directory: project root

8) Rector (optional during refactors)
- Use Composer scripts or add Run Configurations:
  - Dry run: vendor/bin/rector --config=rector.php --dry-run
  - Apply: vendor/bin/rector --config=rector.php

9) Xdebug setup (CLI and web)
- Enable Xdebug in your php.ini (CLI):
  - For PHP 8.1 on Windows, add to php.ini (paths may vary):
    zend_extension = xdebug
    xdebug.mode = debug
    xdebug.start_with_request = yes
    xdebug.client_port = 9003
  - Restart any PHP-FPM/Apache service if using web SAPI.
- PhpStorm: Run > Start Listening for PHP Debug Connections
- Path mappings:
  - If using local WAMP: project paths usually do not need mapping for CLI. For web debugging, map the Apache/Nginx document root to the project root.
  - If using Docker: set mappings so that /var/www/html (in container) maps to your local project root.
- Set a breakpoint in index.php or a controller (src/PrestaShopBundle/Controller/*) and start a debug session.

10) Database for Integration tests
- Scripts like integration-tests will create the test database automatically using tests/bin helpers. Ensure your local database credentials are set via environment variables or .env.local if required.

11) Useful tips
- Use the Symfony Console inside PhpStorm: Run > Edit Configurations... > + > PHP Script → bin/console with arguments, e.g. debug:router
- Enable Twig support: File > Settings > Languages & Frameworks > PHP > Twig
- Translations: Mark translations/ as Resource Root for better assistance.

No IDE files committed
- We deliberately do not commit .idea/ files. Use this guide to configure your PhpStorm locally.

Local domain setup (WampServer)
- Desired domain: modernesmid-webshop.local
- Steps:
  1) Edit C:\\Windows\\System32\\drivers\\etc\\hosts and add: 127.0.0.1 modernesmid-webshop.local
  2) In WampServer, add a VirtualHost that points modernesmid-webshop.local to your project root (C:\\wampserver\\www\\modernesmid-webshop). Use the Wamp tray: Your VirtualHosts > Add a VirtualHost.
  3) Restart all Wamp services.
- Then access http://modernesmid-webshop.local/ in your browser.

Troubleshooting
- If PhpStorm cannot find vendor/bin tools, ensure Composer dependencies are installed and your interpreter is set correctly.
- For Windows, prefer using the @php prefix (which composer.json already uses) to ensure the configured interpreter runs the tools.


Troubleshooting: "PHP: syntax error, unexpected '{' in composer.json"
- Cause: PhpStorm is trying to execute composer.json as if it were the Composer executable. This happens when the Composer settings point to composer.json instead of composer.phar or a system Composer.
- Fix:
  1) PhpStorm > File > Settings > PHP > Composer
  2) Composer executable: choose one of:
     - System composer (if you installed Composer for Windows), or
     - Path to composer.phar (click ... and select the composer.phar in your project root), or
     - Use our helper: run bin\\win\\composer-install.ps1 once; it downloads composer.phar into the project.
  3) PHP executable: select your PHP 8.1 CLI interpreter.
  4) Apply. Now Tools > Composer > Install should run correctly.

Troubleshooting: "The openssl extension is required for SSL/TLS protection"
- Cause: The PHP CLI used by Composer has OpenSSL disabled. Composer cannot download packages without TLS.
- Quick check (PowerShell):
  - powershell -ExecutionPolicy Bypass -File bin\\win\\php-env-check.ps1
  - Or: php -m | findstr /I openssl
- Enable OpenSSL in the correct php.ini for the CLI:
  1) Find the CLI php.ini path:
     - php -i | findstr /I "Loaded Configuration File"
  2) Open that php.ini and ensure:
     - extension_dir = "ext"
     - extension=openssl
  3) Also ensure these recommended extensions are enabled for PrestaShop: curl, intl, zip, mbstring, gd, dom, simplexml, fileinfo, json
  4) Save php.ini and retry Composer.
- WampServer tip:
  - Enabling extensions from the tray menu toggles the Apache/PHP module ini, not always the CLI ini. Always edit the CLI php.ini located inside your php.exe folder (e.g. C:\\wamp64\\bin\\php\\php8.1.x\\php.ini).
- Not recommended but possible: run Composer with --disable-tls true (at your own risk). Prefer enabling OpenSSL instead.

Using the helper scripts
- Environment check: powershell -ExecutionPolicy Bypass -File bin\\win\\php-env-check.ps1
- Install dependencies without global Composer/Path: powershell -ExecutionPolicy Bypass -File bin\\win\\composer-install.ps1
- These scripts detect php.exe (WampServer-friendly), verify required extensions, fetch composer.phar if missing, and run install.

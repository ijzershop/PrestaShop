#!/bin/sh

RET=1
while [ $RET -ne 0 ]; do
    echo "\n* Checking if $DB_SERVER is available..."
    mysql -h $DB_SERVER -P $DB_PORT -u $DB_USER -p$DB_PASSWD -e "status" > /dev/null 2>&1
    RET=$?

    if [ $RET -ne 0 ]; then
        echo "\n* Waiting for confirmation of MySQL service startup";
        sleep 5
    fi
done
    echo "\n* DB server $DB_SERVER is available, let's continue !"

# From now, stop at error
set -e

if [ ! -f ./config/settings.inc.php ] && [ ! -f ./install.lock ]; then

    echo "\n* Setting up install lock file..."
    touch ./install.lock

    echo "\n* Reapplying PrestaShop files for enabled volumes ...";

    if [ -d /tmp/data-ps/prestashop ]; then
        # init if empty
        echo "\n* Copying files from tmp directory ...";
        cp -n -R -T -p /tmp/data-ps/prestashop/ /var/www/html
    else
        echo "\n* No files to copy from tmp directory ...";
    fi

    if [ -f /tmp/defines_custom.inc.php ]; then
        cp -n -p /tmp/defines_custom.inc.php /var/www/html/config/defines_custom.inc.php
    fi

    if [ -d /tmp/pre-install-scripts/ ]; then
        echo "\n* Running pre-install script(s)..."

        for i in `ls /tmp/pre-install-scripts/`;do
            /tmp/pre-install-scripts/$i
        done
    else
        echo "\n* No pre-install script found, let's continue..."
    fi

    if [ $PS_FOLDER_INSTALL != "install" ] && [ -d /var/www/html/install ]; then
        echo "\n* Renaming install folder as $PS_FOLDER_INSTALL ...";
        mv /var/www/html/install /var/www/html/$PS_FOLDER_INSTALL/
    fi

    if [ $PS_FOLDER_ADMIN != "admin" ] && [ -d /var/www/html/admin ]; then
        echo "\n* Renaming admin folder as $PS_FOLDER_ADMIN ...";
        mv /var/www/html/admin /var/www/html/$PS_FOLDER_ADMIN/
    fi

    if [ $PS_HANDLE_DYNAMIC_DOMAIN = 1 ]; then
        cp /tmp/docker_updt_ps_domains.php /var/www/html
        sed -ie "s/DirectoryIndex\ index.php\ index.html/DirectoryIndex\ docker_updt_ps_domains.php\ index.php\ index.html/g" $APACHE_CONFDIR/conf-available/docker-php.conf
    fi

    if [ $PS_ERASE_DB = 1 ]; then
        echo "\n* Drop mysql database...";
        echo "\n* Dropping existing database $DB_NAME..."
        mysql -h $DB_SERVER -P $DB_PORT -u $DB_USER -p$DB_PASSWD -e "drop database if exists $DB_NAME;"
    fi

    if [ $PS_INSTALL_DB = 1 ]; then
        echo "\n* Create mysql database...";
        echo "\n* Creating database $DB_NAME..."
        mysqladmin -h $DB_SERVER -P $DB_PORT -u $DB_USER create $DB_NAME -p$DB_PASSWD --force;
    fi

    echo "\n* Installing PrestaShop, this may take a while ...";

    if [ "$PS_DOMAIN" = "<to be defined>" ]; then
        export PS_DOMAIN=$(hostname -i)
    fi

    echo "\n* Launching the installer script..."
    runuser -g www-data -u www-data -- php -d memory_limit=-1 /var/www/html/$PS_FOLDER_INSTALL/index_cli.php \
    --domain="$PS_DOMAIN" --db_server=$DB_SERVER:$DB_PORT --db_name="$DB_NAME" --db_user=$DB_USER \
    --db_password=$DB_PASSWD --prefix="$DB_PREFIX" --modules="$PS_MODULES" --firstname="John" --lastname="Doe" \
    --password=$ADMIN_PASSWD --email="$ADMIN_MAIL" --language=$PS_LANGUAGE --country=$PS_COUNTRY \
    --all_languages=$PS_ALL_LANGUAGES --newsletter=0 --send_email=0 --ssl=$PS_ENABLE_SSL --fixtures=0

    if [ $? -ne 0 ]; then
        echo 'warning: PrestaShop installation failed.'
    else
        echo "\n* Removing install folder..."
        rm -r /var/www/html/$PS_FOLDER_INSTALL/
    fi

    if [ -d /tmp/post-install-scripts/ ]; then
        echo "\n* Running post-install script(s)..."

        for i in `ls /tmp/post-install-scripts/`;do
            /tmp/post-install-scripts/$i
        done
    else
        echo "\n* No post-install script found, let's continue..."
    fi

    echo "\n* Setup completed, removing lock file..."
    rm ./install.lock

elif [ ! -f ./config/settings.inc.php ] && [ -f ./install.lock ]; then

    echo "\n* Another setup is currently running..."
    sleep 10
    exit 42

elif [ -f ./config/settings.inc.php ] && [ -f ./install.lock ]; then

    echo "\n* Shop seems setup but remaining install lock still present..."
    sleep 10
    exit 42

else
    echo "\n* PrestaShop Core already installed...";
fi

if [ $PS_DEMO_MODE -ne 0 ]; then
    echo "\n* Enabling DEMO mode ...";
    sed -ie "s/define('_PS_MODE_DEMO_', false);/define('_PS_MODE_DEMO_',\ true);/g" /var/www/html/config/defines.inc.php
fi

echo "\n* Disabling CSRF Tokens check ...";
sed -i '/public function isTokenValid/,/{/c\
public function isTokenValid(CsrfToken $token) {\
    return true;' /var/www/html/vendor/symfony/symfony/src/Symfony/Component/Security/Csrf/CsrfTokenManager.php

sed -i '/public function checkToken/,/{/c\
public function checkToken() {\
    return true;' /var/www/html/classes/controller/AdminController.php

sed -i 's/\$event->setResponse(\$response);/\/\/\$event->setResponse(\$response);/' /var/www/html/src/PrestaShopBundle/EventListener/TokenizedUrlsListener.php

sed -i "/\$cookie = new Cookie('psAdmin'/,/;/a\
\$cookie->id_employee = 1;\
\$cookie->profile = 1;" /var/www/html/config/config.inc.php

sed -i '/public function isLoggedBack/,/{/c\
public function isLoggedBack() {\
    return true;' /var/www/html/classes/Employee.php

echo "\n* Almost ! Starting web server now\n";

exec apache2-foreground

global.URL_FO = process.env.URL_FO || 'http://localhost/prestashop/';
global.URL_BO = process.env.URL_BO || `${global.URL_FO}admin-dev/`;
global.URL_INSTALL = process.env.URL_INSTALL || `${global.URL_FO}install-dev/`;
global.EMAIL = process.env.LOGIN || 'demo@prestashop.com';
global.PASSWD = process.env.PASSWD || 'prestashop_demo';
global.HEADLESS = process.env.HEADLESS || false;
global.browser = null;
global.SHOPNAME = process.env.SHOPNAME || 'Prestashop';
global.db_user = process.env.DB_USER || 'demops';
global.db_passwd = process.env.DB_PASSWD || 'bribri';
global.INSTALL_LANGUAGE = process.env.INSTALL_LANGUAGE || 'en';
global.INSTALL_COUNTRY = process.env.INSTALL_COUNTRY || 'fr';

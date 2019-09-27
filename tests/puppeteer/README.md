# PrestaShop Tests with Puppeteer

## How to install your environment

```bash
git clone https://github.com/PrestaShop/PrestaShop/
cd tests/puppeteer/
npm install
```
## Available command line parameters
| Parameter           | Description      |
|---------------------|----------------- |
| URL_FO              | URL of your PrestaShop website Front Office (default to **http://localhost:8080/**) |
| URL_BO              | URL of your PrestaShop website Back Office (default to **`URL_FO + admin-dev/`**) |
| URL_INSTALL         | URL of your PrestaShop website Front Office (default to **`URL_FO + install-dev/`**) |
| LOGIN               | LOGIN of your PrestaShop website (default to **`demo@prestashop.com`**) |
| PASSWD              | PASSWD of your PrestaShop website (default to **`prestashop_demo`**) |
| SHOPNAME            | Shop Name of tour PrestaShop (default to **`Prestashop`**) |
| DB_USER             | login user of your MySql (default to **`root`**) |
| DB_PASSWD           | Password for your MySql (default to **`empty`**) |
| HEADLESS            | Boolean to run tests in headless or not (default to **`true`**) |

## Sanity tests 
This campaign includes a non-exhaustive set of tests and it will ensure that the most important functions work.

### Launch all scripts
If you want to run all sanity tests, you can run the script **`campaigns/sanity/*`**

#### With default values

```bash
npm run sanity-tests
```

#### With custom values
You can add parameters that you need in the beginning of your command
```bash
HEADLESS=false URL_BO="Your_Shop_URL_BO" URL_FO="Your_Shop_URL_FO" npm run sanity-tests
```

### Stop tests when first step in failed
If you want to run all sanity tests, and stop tests when first step is failed, you can use the travis command for sanity tests

```bash
npm run sanity-travis
```

## LinkChecker
This script will detect not found and erroneous pages, by crawling your back office and front office


### Launch script
If you want to run the links checker test you can run the script **test/linkchecker.js**

#### With default values

```bash
npm run linkchecker
```

## Upgrade test
This test will upgrade Prestashop version with the Autoupgrade module

### Launch script
Before testing it, you should install Prestashop version to upgrade from
If you want to run this test, you can use command **specific-test**

#### With default values

```bash
# You need to set PS_VERSION to check after upgrade, default to 1.7.6.0 
PS_VERSION=1.7.6.0 TEST_PATH="upgrade/upgradeShop" npm run specific-test
```

Enjoy :wink: :v:

<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* __string_template__b0f1eb87735c2e6265d11e8edbcc1387 */
class __TwigTemplate_b19a088610f2466c2681eee786f3ee38 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
            'stylesheets' => [$this, 'block_stylesheets'],
            'extra_stylesheets' => [$this, 'block_extra_stylesheets'],
            'content_header' => [$this, 'block_content_header'],
            'content' => [$this, 'block_content'],
            'content_footer' => [$this, 'block_content_footer'],
            'sidebar_right' => [$this, 'block_sidebar_right'],
            'javascripts' => [$this, 'block_javascripts'],
            'extra_javascripts' => [$this, 'block_extra_javascripts'],
            'translate_javascripts' => [$this, 'block_translate_javascripts'],
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "__string_template__b0f1eb87735c2e6265d11e8edbcc1387"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "__string_template__b0f1eb87735c2e6265d11e8edbcc1387"));

        // line 1
        echo "<!DOCTYPE html>
<html lang=\"nl\">
<head>
  <meta charset=\"utf-8\">
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
<meta name=\"apple-mobile-web-app-capable\" content=\"yes\">
<meta name=\"robots\" content=\"NOFOLLOW, NOINDEX\">

<link rel=\"icon\" type=\"image/x-icon\" href=\"/img/favicon.ico\" />
<link rel=\"apple-touch-icon\" href=\"/themes/modernesmid_theme/assets/favicons/IJ_favicons/apple-icon-60x60.png\" />

<title>Bestellingen • Ijzershop</title>

  <script type=\"text/javascript\">
    var help_class_name = 'AdminOrders';
    var iso_user = 'nl';
    var lang_is_rtl = '0';
    var full_language_code = 'nl-nl';
    var full_cldr_language_code = 'nl-NL';
    var country_iso_code = 'NL';
    var _PS_VERSION_ = '8.2.0';
    var roundMode = 2;
    var youEditFieldFor = '';
    var storeName = \"Ijzershop\";
        var new_order_msg = 'Er is een nieuwe bestelling geplaatst in uw winkel.';
    var order_number_msg = 'Ordernummer: ';
    var total_msg = 'Totaal ';
    var from_msg = 'Van: ';
    var see_order_msg = 'Bekijk deze bestelling';
    var new_customer_msg = 'Een nieuwe klant heeft zich geregistreerd in uw winkel.';
    var customer_name_msg = 'Klant naam ';
    var new_msg = 'Er is een nieuw bericht in uw winkel geplaatst.';
    var see_msg = 'Lees het bericht';
    var token = '3879d0927f63975747ef1414bdcbcf8d';
    var currentIndex = 'index.php?controller=AdminOrders';
    var employee_token = 'f2c1c327dfcaf3e264611f2b0c958559';
    var choose_language_translate = 'Selecteer een taal:';
    var default_language = '1';
    var admin_modules_link = 'https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/modules/manage';
    var admin_notification_get_link = 'https://ngrok.ijzershop-test.nl/admin-dev/index.php/common/notifications';
    var admin_notification_push_link = adminNotificationPushLink = 'https://ngrok.ijzershop-test.nl/admin-dev/index.php/common/notifications/ack';
    var tab_modules_list = '';
    var update_success_msg = 'Bijwerken gesl";
        // line 43
        echo "aagd';
    var search_product_msg = 'Zoek een product';
  </script>



<link
      rel=\"preload\"
      href=\"/admin-dev/themes/new-theme/public/2d8017489da689caedc1.preload..woff2\"
      as=\"font\"
      crossorigin
    >
      <link href=\"/admin-dev/themes/new-theme/public/create_product_default_theme.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/admin-dev/themes/new-theme/public/theme.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/js/jquery/plugins/chosen/jquery.chosen.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/js/jquery/plugins/fancybox/jquery.fancybox.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/msthemeconfig/views/css/koopman-order-grid.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/psgdpr/views/css/overrideAddress.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/mollie/views/css/admin/order-list.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/dynamicproduct/lib/media/dist/assets/order_summary-D5m_MhNh.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/dynamicproduct/lib/media/dist/assets/order-JPscWui5.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/dynamicproduct/views/css/admin.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/mollie/views/css/admin/menu.css\" rel=\"stylesheet\" type=\"text/css\"/>
  
  <script type=\"text/javascript\">
var baseAdminDir = \"\\/admin-dev\\/\";
var baseDir = \"\\/\";
var changeFormLanguageUrl = \"https:\\/\\/ngrok.ijzershop-test.nl\\/admin-dev\\/index.php\\/configure\\/advanced\\/employees\\/change-form-language\";
var currency = {\"iso_code\":\"EUR\",\"sign\":\"\\u00e2\\u201a\\u00ac\",\"name\":\"Euro\",\"format\":null};
var currency_specifications = {\"symbol\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\u00d7\",\"\\u2030\",\"\\u221e\",\"NaN\"],\"currencyCode\":\"EUR\",\"currencySymbol\":\"\\u00e2\\u201a\\u00ac\",\"numberSymbols\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\u00d7\",\"\\u2030\",\"\\u221e\",\"NaN\"],\"positivePattern\":\"\\u00a4\\u00a0#,##0.00\",\"";
        // line 72
        echo "negativePattern\":\"\\u00a4\\u00a0-#,##0.00\",\"maxFractionDigits\":2,\"minFractionDigits\":2,\"groupingUsed\":true,\"primaryGroupSize\":3,\"secondaryGroupSize\":3};
var dp_id_module = \"377\";
var dp_id_order = 0;
var dp_module_link = \"https:\\/\\/ngrok.ijzershop-test.nl\\/admin-dev\\/index.php?controller=AdminModules&configure=dynamicproduct\";
var dp_orders = [1,3];
var dp_product_redirect = \"https:\\/\\/ngrok.ijzershop-test.nl\\/module\\/dynamicproduct\\/redirect?id_product=__ID_PRODUCT__&action=create_customization\";
var dp_product_settings = \"https:\\/\\/ngrok.ijzershop-test.nl\\/admin-dev\\/index.php?controller=DynamicProductSettings\";
var dp_public_path = \"https:\\/\\/ngrok.ijzershop-test.nl\\/modules\\/dynamicproduct\\/lib\\/media\\/dist\\/\";
var dp_translations = {\"3357\":\"if\",\"3555\":\"of\",\"65665\":\"Toevoegen\",\"65921\":\"Allemaal\",\"77124\":\"Max\",\"77362\":\"Min\",\"78208\":\"Nieuw\",\"2106261\":\"Copy\",\"2228070\":\"Grid\",\"2373894\":\"Laden\",\"2420395\":\"Naam\",\"2569629\":\"Opslaan\",\"2587372\":\"Step\",\"2603341\":\"Text\",\"2622298\":\"Type\",\"2641316\":\"Unit\",\"20170714\":\"Field groups\",\"42216636\":\"Show less\",\"42255992\":\"Show more\",\"42572887\":\"Maximum files\",\"46603408\":\"Greater than or equal\",\"60673783\":\"Calculation Order\",\"65193517\":\"Clear\",\"65203672\":\"Sluiten\",\"67634599\":\"Any change will have an effect on the configuration of _nb_ products.\",\"67875034\":\"Field\",\"69070285\":\"Grids\",\"70760763\":\"Image\",\"73174740\":\"Label\",\"78727453\":\"Range\",\"80208647\":\"Steps\",\"81768821\":\"Will show an error when no option is selected\",\"82420049\":\"Value\",\"94764465\":\"Checked by default\",\"96215082\":\"Export configuration to a file\",\"96634189\":\"empty\",\"112524536\":\"Any change will have an effect on the linked configurations.\",\"146608883\":\"Clear existing elements before copying\",\"168044563\":\"Prefix with a space if needed\",\"177208536\":\"Not recommended as it can slow down the cart page\",\"188877356\":\"Select a product\",\"190258903\":\"Important: The name must be a valid css class name\",\"209981527\":\"Control field\",\"213777395\":\"Use _Up__ \\/ _Down__ arrows and _Tab__ \\/ ";
        // line 80
        echo "_Shift__ _Tab__ to navigate between fields\",\"217062059\":\"Delete field formula\",\"225214028\":\"Import configuration from a file\",\"255574909\":\"Add a new condition\",\"309632339\":\"Add a new option\",\"335921277\":\"Select All\",\"337710188\":\"Delete all items\",\"341682506\":\"Example\",\"342988778\":\"Collapsible\",\"366478171\":\"Disabled days\",\"391613546\":\"This will **ALSO DELETE the original item**. Are you sure that you want to continue?\",\"403974246\":\"Display secondary value as option description\",\"414080266\":\"Max date\",\"415178366\":\"Opties\",\"448768363\":\"Refresh databases list\",\"472144411\":\"Price unit\",\"487485563\":\"Delete grid\",\"499705571\":\"No steps configured yet!\",\"501633139\":\"Display the calculated price in the category page\",\"502849757\":\"Actions\",\"512870211\":\"Remove field from favorites\",\"524754236\":\"Add a row\",\"539312109\":\"Formulas\",\"551803430\":\"PrestaShop fields\",\"556571664\":\"Available fields\",\"593819435\":\"Available groups\",\"616048556\":\"Save and close\",\"618203353\":\"Display dropzone\",\"635062501\":\"Interval\",\"641384524\":\"Load formula\",\"642864804\":\"If you choose to hide all fields for one or more combinations, make sure to disable the option &quot;Required customization&quot; above\",\"648178368\":\"Enable if the price depends on the cart quantity\",\"674841376\":\"This product has no field groups\",\"679767347\":\"Display secondary value as option price\",\"683837713\":\"Open in a new tab\",\"686245726\":\"Add interval field\",\"694222335\":\"Interval field\",\"707322317\":\"Instead of the currency symbol\",\"714420990\":\"Values (separate by comma, use dot for decimal values)\",\"717577136\":\"Edit summary\",\"723571741\":\"Click to edit formula\",\"733185705\":\"Calculation\",\"743137649\":\"Are you sure you want to delete the selected fields?\",\"747570142\":\"Weight formula\",\"751248134\":\"Edit description\",\"818934447\":\"Click to toggle the option visibility\",\"856190703\":\"The formula is valid\",\"863835572\":\"Import\\/Export configuration\",\"877234552\":\"This element was not found\",\"882649860\":\"Recalculate price in cart after each page view";
        echo "\",\"894228158\":\"Show in cart summary\",\"896194968\":\"Advanced configuration\",\"910258683\":\"Date after\\/before dd days\",\"936109071\":\"This name is a reserved Excel function name, please use another name\",\"941456859\":\"add a new field group\",\"942696557\":\"Display tax excluded prices\",\"955701460\":\"Delete interval field\",\"956903001\":\"Delete interval group\",\"957328081\":\"Expand condition (Shift + Click to expand all)\",\"967323594\":\"Unlink configurations\",\"987228486\":\"Formula\",\"1015824103\":\"The formula contains unknown fields\",\"1018815151\":\"Combination\",\"1023084919\":\"Select a field\",\"1028005612\":\"Enable the module for this product\",\"1035798281\":\"Unknown group\",\"1062605528\":\"Conditions\",\"1074180180\":\"No field groups configured yet!\",\"1092329901\":\"Insert as one step\",\"1092758090\":\"Allow multiselection\",\"1119619936\":\"Product Page\",\"1128817579\":\"Copy configuration\",\"1139462901\":\"Toggle all\",\"1142656251\":\"Condition\",\"1152371054\":\"Configure options visibility\",\"1201193478\":\"Display the &quot;Starting from&quot; label in the category page\",\"1224131978\":\"No custom execution order is configured, the default order will be used\",\"1265447825\":\"Minimize condition (Shift + Click to minimize all)\",\"1292109984\":\"Script name\",\"1299208205\":\"Delete this row\",\"1311260723\":\"Formula copied to clipboard\",\"1319091200\":\"Field Formula\",\"1327464299\":\"Recalculate price in cart when quantity changes\",\"1346468776\":\"Preview\",\"1365932015\":\"Steps Activation\",\"1378058502\":\"Delete condition\",\"1382863923\":\"Cost formula\",\"1385751734\":\"You can import\\/export a file containing the product configuration\",\"1473269982\":\"Groups Visibility\",\"1479721030\":\"Applies only if the product has a price of 0\",\"1499275331\":\"Settings\",\"1503955207\":\"The current formula is empty\",\"1506518963\":\"Insert step\",\"1507272505\":\"Demo mode enabled, only these types will be accepted\",\"1518498724\":\"Combinations\",\"1525066715\":\"Copy formula\",\"1529599611\":\"Add field column\",\"1539356550\":\"Cancel selection\",\"1543324436\":\"Row field\",\"1547472170\":\"Displaye";
        echo "d price\",\"1550611840\":\"Use a custom calculation order\",\"1589928967\":\"The new Calculation tab displays a unified interface to add and organize calculation items\",\"1606304409\":\"Show or Hide the fields based on the selected combination\",\"1611563307\":\"Interval formula\",\"1616172285\":\"This group has already been added\",\"1620484928\":\"Delete this item\",\"1620782841\":\"Delete this step\",\"1642806840\":\"Databases\",\"1652081830\":\"Click to toggle the field visibility\",\"1721653182\":\"Deselect All\",\"1741737838\":\"Click to insert an option\",\"1772226151\":\"If empty, then the field name will be used\",\"1781676314\":\"Display weight to customers\",\"1782805700\":\"Quantity (PrestaShop Quantity)\",\"1799432497\":\"CSS class name (optional)\",\"1816510966\":\"Display label\",\"1821258733\":\"Clear the current configuration\",\"1843498208\":\"Allow saving customization to profile\",\"1880571668\":\"Minimum width\",\"1887918305\":\"unlimited\",\"1890611904\":\"Custom suffix\",\"1907478750\":\"Linking will affect current and future products of selected category\",\"1926535580\":\"Remove this column\",\"1939070905\":\"Will show an error when set to 0\",\"1939937161\":\"Delete selected fields\",\"1962674479\":\"Use Ctrl + Enter to save formula\",\"1970866633\":\"Unlink configuration\",\"1990316837\":\"Are you sure to toggle all options?\",\"1991049567\":\"Hide in summary when unchecked\",\"2001303836\":\"Loading\",\"2005080793\":\"Fields Visibility\",\"2008912283\":\"Add condition group\",\"2011110042\":\"Annuleren\",\"2030152089\":\"Minimum height\",\"2050679770\":\"Replace field names with their respective values\",\"2076495866\":\"Insert all items\",\"2089680852\":\"Exporteren\",\"2104126169\":\"Fields\",\"2124186744\":\"Click to toggle the step visibility\",\"2141373940\":\"Groups\",\"-2057845645\":\"Field Formulas\",\"-1787898834\":\"Intervals\",\"-321013333\":\"Product original price\",\"-1173076394\":\"Product original weight\",\"-91109833\":\"The quantity selected by the customer\",\"-343092435\":\"You can configure the visibility of each field based on the selected combination. A hidden field will have a null value in the";
        echo " formula\",\"-360169678\":\"Visibility\",\"-984860935\":\"Proportions\",\"-1395957536\":\"Require all steps to be completed\",\"-258501236\":\"This step has already been added\",\"-2047922448\":\"Available steps\",\"-936937268\":\"Manage steps\",\"-1544869189\":\"Refresh\",\"-986386678\":\"add a new step\",\"-1020392531\":\"Start by inserting a step from the list above\",\"-1213154046\":\"Unknown step\",\"-1072973150\":\"Drag to reorder\",\"-1003134522\":\"There are no fields yet, add a new field in the fields tab.\",\"-1920372430\":\"Required customization\",\"-1640250765\":\"Hide quantity input\",\"-911095655\":\"Multiply price &amp; weight by quantity\",\"-319880804\":\"If activated, the displayed price &amp; weight on the product page will be multiplied by the quantity\",\"-1536078307\":\"Split summary by groups\",\"-567220177\":\"Per kilo, per litre\",\"-1105717282\":\"You can configure a displayed price if your product has a price of 0\",\"-350941306\":\"You may need to clear the cache after changing this setting\",\"-260281722\":\"Display customization cost in customization summary\",\"-72782714\":\"Copy configuration to clipboard\",\"-2100928571\":\"Import\",\"-839043195\":\"Import configuration from clipboard\",\"-266050175\":\"Export image links instead of encoding the images\",\"-970294887\":\"Results in a smaller file. Only enable if the images can be accessed from your target shop.\",\"-512299320\":\"Please select the elements you want to copy from the source product.\",\"-1440091513\":\"Equations\",\"-1295811629\":\"Combination Values\",\"-1569442514\":\"Combinations Visibility\",\"-1780637860\":\"Load configuration\",\"-1680464031\":\"Select a category\",\"-755060688\":\"Will use the same configuration in multiple products instead of copying it\",\"-969155480\":\"Link instead of copying\",\"-743709137\":\"Will not preserve the original configurations of the linked products\",\"-198824349\":\"Clear the configurations of linked products\",\"-77133620\":\"You can copy or link this configuration to all products of the selected category\",\"-97880005\":\"Will use the same configuration instead of copying ";
        echo "it\",\"-861552729\":\"Will not preserve the current configuration\",\"-814503541\":\"You can copy the selected product configuration to the current product\",\"-376014216\":\"Add a new proportion\",\"-1266890280\":\"Add an interval group\",\"-1739945662\":\"Values\",\"-167002208\":\"Interval condition\",\"-1983196248\":\"Less than\",\"-530681616\":\"+Infinity (no upper limit)\",\"-813310028\":\"Remove this condition group\",\"-1754233898\":\"Allows the customer to expand\\/collapse the group by clicking on the group label\",\"-1203478535\":\"Start collapsed\",\"-557346165\":\"Select the field that you want to add\",\"-1442032302\":\"Pick a field...\",\"-997806686\":\"This feature will duplicate the group based on the value of the selected field\",\"-1306471438\":\"Delete this group\",\"-626105070\":\"Insert field group\",\"-2074469771\":\"Manage field groups\",\"-912813020\":\"Add a grid\",\"-177830133\":\"Import CSV\",\"-1963285437\":\"Delete this column\",\"-1849538101\":\"Target field\",\"-1759411248\":\"Column field\",\"-1157161804\":\"Add a column\",\"-754551441\":\"Price formula\",\"-1451894031\":\"Quantity formula\",\"-874003249\":\"Some field names are duplicated. You can either rename them or delete them.\",\"-1522567076\":\"Add a new field\",\"-597373332\":\"Do you want to update the field name in all the product formulas?\",\"-2043405119\":\"Displayed\",\"-2133620278\":\"Hidden\",\"-871138304\":\"Load a field from favorites\",\"-907353161\":\"Load a field from common fields\",\"-400560676\":\"Insert a new field here\",\"-827747024\":\"Click to select fields\",\"-1162526551\":\"Field settings\",\"-192987258\":\"Summary\",\"-2066126138\":\"Delete image\",\"-1667496710\":\"Click to upload an image\",\"-2071596850\":\"Delete color\",\"-403094350\":\"Click to pick a color\",\"-56677412\":\"Omschrijving\",\"-455739515\":\"Secondary Value\",\"-1085510111\":\"Default\",\"-328495169\":\"Required\",\"-195866273\":\"Display value as option price\",\"-961591827\":\"Image height (px)\",\"-2110296218\":\"Display info in a popup\",\"-930467021\":\"Import images\",\"-812471947\":\"Initial value\",\"-2028851885\":\"Placeholder\",\"-124100328\":\"Min characters\",\"-781016378";
        echo "\":\"Max characters\",\"-563123098\":\"Hide in summary when empty or equal to zero\",\"-1281023549\":\"Display PrestaShop style buttons\",\"-1732758869\":\"Maximum size (MB)\",\"-786546228\":\"Allowed Extensions\",\"-1369255836\":\"Thumbnail size (px)\",\"-303839446\":\"Initial date\",\"-2027417515\":\"Current day\",\"-1362116388\":\"Min date\",\"-1052633864\":\"Comma separated.\",\"-901436182\":\"Sun: 1, Mon: 2, Tues: 3, Wed: 4, Thurs: 5, Fri: 6, Sat: 7\",\"-981640203\":\"The JSON code is not valid, please check the browser console.\",\"-1156506214\":\"JSON Config\",\"-829601945\":\"Initial color\",\"-1339063232\":\"View image\",\"-1754727903\":\"Upload\",\"-929869225\":\"Add field to favorites\",\"-772024966\":\"Remove field from common fields\",\"-43752491\":\"Set as common field\",\"-1470017715\":\"Duplicate this field\",\"-1208718378\":\"This will not delete the original field\",\"-1307672979\":\"Delete this field\",\"-2016607813\":\"Filter field formulas\",\"-1479771459\":\"Create a new field formula\",\"-505434665\":\"Click to edit\",\"-345562080\":\"Field formula\",\"-1561849983\":\"This calculation order is now replaced by the Calculation tab\",\"-198258289\":\"Add an execution item\",\"-1450803135\":\"deletes all execution items\",\"-1327547091\":\"Reset to default\",\"-1069635520\":\"Filter conditions\",\"-1840858600\":\"Create a new condition\",\"-27641343\":\"Click to toggle the group visibility\",\"-184663564\":\"Options visibility\",\"-1853217873\":\"Show the advanced settings\",\"-1733472447\":\"Condition formula\",\"-141573914\":\"Filter condition fields\",\"-1364207966\":\"Are you sure that you want to delete all items?\",\"-88887989\":\"Click to open the item\",\"-213492928\":\"Click to open the item tab\",\"-1997101839\":\"Hold shift to also delete the original item\",\"-1437454083\":\"Are you sure that you want to add all the items?\",\"-2068694494\":\"Insert selected items\",\"-1504585939\":\"No items were found, start by adding a new item below\",\"-1095166702\":\"Pick a custom color\",\"-2029223687\":\"Edit product\",\"-885795230\":\"Module configuration\",\"-865760232\":\"This configuration is linked to the product\",\"-209097655";
        echo "0\":\"Copy linked configuration\",\"-1627988830\":\"View original configuration\",\"-781361040\":\"This configuration is linked to _nb_ products\",\"-209324991\":\"Filter fields\",\"-859165076\":\"You can use multiple filters separated by spaces\",\"-1888060882\":\"Check formula\",\"-2478677\":\"Add formula to favorites\",\"-1433567116\":\"Are you sure you want to delete this item\",\"-135023574\":\"Could not copy formula to clipboard\",\"-1882967692\":\"Remove formula from presets\",\"-429764437\":\"No preset formulas. Click the star icon to add one.\",\"-1799625922\":\"Please enter a field name first\",\"-2132954502\":\"Create a new dynamic variable field\",\"-1783025135\":\"Field name\",\"-226074697\":\"Save new field\",\"-229417419\":\"Databases refreshed successfully\",\"-377760440\":\"Product attributes\",\"-590915474\":\"Product features\",\"-274987431\":\"Long press to use the secondary value\",\"-426186843\":\"Secondary value\"};
var dp_uri = \"\\/modules\\/dynamicproduct\\/\";
var isPsVersion177 = true;
var mollieHookAjaxUrl = \"https:\\/\\/ngrok.ijzershop-test.nl\\/admin-dev\\/index.php?controller=AdminMollieAjax\";
var molliePendingStatus = \"39\";
var number_specifications = {\"symbol\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\u00d7\",\"\\u2030\",\"\\u221e\",\"NaN\"],\"numberSymbols\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\u00d7\",\"\\u2030\",\"\\u221e\",\"NaN\"],\"positivePattern\":\"#,##0.###\",\"negativePattern\":\"-#,##0.###\",\"maxFractionDigits\":3,\"minFractionDigits\":0,\"groupingUsed\":true,\"primaryGroupSize\":3,\"secondaryGroupSize\":3};
var prestashop = {\"debug\":true};
var ps_module_dev = false;
var psgdprNoAddresses = \"Klantgegevens verwijderd door de offici\\u00eble GDPR-module.\";
var show_new_customers = \"1\";
var show_new_messages = \"1\";
var show_new_orders = \"1\";
</script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/main.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/multistore_dropdown.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/js/jquery/plugins/jquery.chosen.js\"></script>
<script type=\"text/javascr";
        // line 96
        echo "ipt\" src=\"/js/jquery/plugins/fancybox/jquery.fancybox.js\"></script>
<script type=\"text/javascript\" src=\"/js/admin.js?v=8.2.0\"></script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/cldr.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/js/tools.js?v=8.2.0\"></script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/create_product.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/modules/msthemeconfig/views/js/koopman.js\"></script>
<script type=\"text/javascript\" src=\"/modules/ps_emailalerts/js/admin/ps_emailalerts.js\"></script>
<script type=\"text/javascript\" src=\"/modules/psgdpr/views/js/overrideAddress.js\"></script>
<script type=\"text/javascript\" src=\"/modules/mollie/views/js/admin/order_list.js\"></script>
<script type=\"text/javascript\" src=\"/modules/mollie/views/js/admin/order_add.js\"></script>
<script type=\"text/javascript\" src=\"/modules/ps_faviconnotificationbo/views/js/favico.js\"></script>
<script type=\"text/javascript\" src=\"/modules/ps_faviconnotificationbo/views/js/ps_faviconnotificationbo.js\"></script>

  <script>
  if (undefined !== ps_faviconnotificationbo) {
    ps_faviconnotificationbo.initialize({
      backgroundColor: '#DF0067',
      textColor: '#ffffff',
      notificationGetUrl: 'https://ngrok.ijzershop-test.nl/admin-dev/index.php/common/notifications',
      CHECKBOX_ORDER: 0,
      CHECKBOX_CUSTOMER: 0,
      CHECKBOX_MESSAGE: 0,
      timer: 120000, // Refresh every 2 minutes
    });
  }
</script>
<script type=\"text/javascript\">
  (function () {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&configure=mollie&ajax=1&action=MollieMethodConfig', true);
    request.send();
    request = null;
  }());
</script>

<div class=\"form-group col-xl-12 hidden d-none\" id=\"mollie-email-send-group\">
    <div class=\"col-lg-3\"></div>
    <div class=\"col-lg-9 offset-sm-4\">
        <input type=\"checkbox\" name=\"m";
        // line 134
        echo "ollie-email-send\" checked>
        <label class=\"control-label\">Stuur een betalingsmail naar de klant. (Wordt verstuurd na het aanmaken van de bestelling)</label>
    </div>
</div>
<script type=\"module\" src=\"/modules/dynamicproduct/lib/media/dist/assets/order_summary-D2ZtWKVK.js\"></script>
<script type=\"module\" src=\"/modules/dynamicproduct/lib/media/dist/assets/order-DpqIUxoC.js\"></script>


";
        // line 142
        $this->displayBlock('stylesheets', $context, $blocks);
        $this->displayBlock('extra_stylesheets', $context, $blocks);
        echo "</head>";
        echo "

<body
  class=\"lang-nl adminorders multishop-enabled developer-mode\"
  data-base-url=\"/admin-dev/index.php\"  data-token=\"HeDHGfMQGawgiPDlkRNZVKRWGNBisWgJ9GCuGfzpEQA\">

  <header id=\"header\" class=\"d-print-none\">

    <nav id=\"header_infos\" class=\"main-header\">
      <button class=\"btn btn-primary-reverse onclick btn-lg unbind ajax-spinner\"></button>

            <i class=\"material-icons js-mobile-menu\">menu</i>
      <a id=\"header_logo\" class=\"logo float-left\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminDashboard\"></a>
      <span id=\"shop_version\">8.2.0</span>

      <div class=\"component\" id=\"quick-access-container\">
        <div class=\"dropdown quick-accesses\">
  <button class=\"btn btn-link btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" id=\"quick_select\">
    Snelle toegang
  </button>
  <div class=\"dropdown-menu\">
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=ordersexport&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
                 data-item=\"export orders\"
      >export orders</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/modules/manage?token=75aac5352e895b8456cd6fcb06269e79\"
                 data-item=\"GeÃ¯nstalleerde modules\"
      >GeÃ¯nstalleerde modules</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=msthemeconfig&amp;module_name=msthemeconfig&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
                 data-item=\"Module manager IJZERSHOP-THEME\"
      >Module manager IJZERSHOP-THEME</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/products/new?token=75aac5352e895b8456cd6fcb06269e7";
        // line 176
        echo "9\"
                 data-item=\"Nieuw product\"
      >Nieuw product</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/categories/new?token=75aac5352e895b8456cd6fcb06269e79\"
                 data-item=\"Nieuwe categorie\"
      >Nieuwe categorie</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCartRules&amp;addcart_rule&amp;token=819fda7058a64226f07ba72baf0c0919\"
                 data-item=\"Nieuwe voucher\"
      >Nieuwe voucher</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=ps_facetedsearch&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
                 data-item=\"Product filter\"
      >Product filter</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=seoexpert&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
                 data-item=\"seo expert\"
      >seo expert</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminStats&amp;module=statsforecast&amp;token=e74d58a885c40df26dc72f8ede2f24f9\"
                 data-item=\"Statistieken\"
      >Statistieken</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminStats&amp;module=statscheckup&amp;token=e74d58a885c40df26dc72f8ede2f24f9\"
                 data-item=\"Winkel evaluatie\"
      >Winkel evaluatie</a>
        <div class=\"dropdown-divider\"></div>
          <a id=\"quick-add-link\"
        class=\"dropdown-item js-quick-link\"
        href=\"#\"
        data-rand=\"93\"
        data-icon=\"icon-AdminParentOrders\"
        data-method=\"add\"
        data-url=\"index.php/sell/orders\"
      ";
        // line 211
        echo "  data-post-link=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminQuickAccesses\"
        data-prompt-text=\"Geef een naam aan deze shortcut:\"
        data-link=\"Bestellingen - Lijst\"
      >
        <i class=\"material-icons\">add_circle</i>
        Voeg de huidige pagina toe aan Snelle toegang
      </a>
        <a id=\"quick-manage-link\" class=\"dropdown-item\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminQuickAccesses\">
      <i class=\"material-icons\">settings</i>
      Beheer uw snelle toegang
    </a>
  </div>
</div>
      </div>
      <div class=\"component component-search\" id=\"header-search-container\">
        <div class=\"component-search-body\">
          <div class=\"component-search-top\">
            <form id=\"header_search\"
      class=\"bo_search_form dropdown-form js-dropdown-form collapsed\"
      method=\"post\"
      action=\"/admin-dev/index.php?controller=AdminSearch&amp;token=8507ff05f70daf45eadc51808e9590d1\"
      role=\"search\">
  <input type=\"hidden\" name=\"bo_search_type\" id=\"bo_search_type\" class=\"js-search-type\" />
    <div class=\"input-group\">
    <input type=\"text\" class=\"form-control js-form-search\" id=\"bo_query\" name=\"bo_query\" value=\"\" placeholder=\"Zoeken (bijv. productreferentie, klantnaam...)\" aria-label=\"Zoek veld\">
    <div class=\"input-group-append\">
      <button type=\"button\" class=\"btn btn-outline-secondary dropdown-toggle js-dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">
        Overal
      </button>
      <div class=\"dropdown-menu js-items-list\">
        <a class=\"dropdown-item\" data-item=\"Overal\" href=\"#\" data-value=\"0\" data-placeholder=\"Wat zoekt u?\" data-icon=\"icon-search\"><i class=\"material-icons\">search</i> Overal</a>
        <div class=\"dropdown-divider\"></div>
        <a class=\"dropdown-item\" data-item=\"Catalogus\" href=\"#\" data-value=\"1\" data-placeholder=\"Product naam, referentie, etc.\" data-icon=\"icon-book\"><i class=\"material-icons\">store_mall_dire";
        // line 243
        echo "ctory</i> Catalogus</a>
        <a class=\"dropdown-item\" data-item=\"Klanten op naam\" href=\"#\" data-value=\"2\" data-placeholder=\"Naam\" data-icon=\"icon-group\"><i class=\"material-icons\">group</i> Klanten op naam</a>
        <a class=\"dropdown-item\" data-item=\"Klanten op IP adres\" href=\"#\" data-value=\"6\" data-placeholder=\"123.45.67.89\" data-icon=\"icon-desktop\"><i class=\"material-icons\">desktop_mac</i> Klanten op IP adres</a>
        <a class=\"dropdown-item\" data-item=\"Bestellingen\" href=\"#\" data-value=\"3\" data-placeholder=\"Bestelling-ID\" data-icon=\"icon-credit-card\"><i class=\"material-icons\">shopping_basket</i> Bestellingen</a>
        <a class=\"dropdown-item\" data-item=\"Facturen\" href=\"#\" data-value=\"4\" data-placeholder=\"Factuur nummer\" data-icon=\"icon-book\"><i class=\"material-icons\">book</i> Facturen</a>
        <a class=\"dropdown-item\" data-item=\"Winkelwagens\" href=\"#\" data-value=\"5\" data-placeholder=\"Winkelwagen-ID\" data-icon=\"icon-shopping-cart\"><i class=\"material-icons\">shopping_cart</i> Winkelwagens</a>
        <a class=\"dropdown-item\" data-item=\"Modules\" href=\"#\" data-value=\"7\" data-placeholder=\"Modulenaam\" data-icon=\"icon-puzzle-piece\"><i class=\"material-icons\">extension</i> Modules</a>
      </div>
      <button class=\"btn btn-primary\" type=\"submit\"><span class=\"d-none\">ZOEKEN</span><i class=\"material-icons\">search</i></button>
    </div>
  </div>
</form>

<script type=\"text/javascript\">
 \$(document).ready(function(){
    \$('#bo_query').one('click', function() {
    \$(this).closest('form').removeClass('collapsed');
  });
});
</script>
            <button class=\"component-search-cancel d-none\">Annuleren</button>
          </div>

          <div class=\"component-search-quickaccess d-none\">
  <p class=\"component-search-title\">Snelle toegang</p>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=ordersexport&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
             data";
        // line 270
        echo "-item=\"export orders\"
    >export orders</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/modules/manage?token=75aac5352e895b8456cd6fcb06269e79\"
             data-item=\"GeÃ¯nstalleerde modules\"
    >GeÃ¯nstalleerde modules</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=msthemeconfig&amp;module_name=msthemeconfig&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
             data-item=\"Module manager IJZERSHOP-THEME\"
    >Module manager IJZERSHOP-THEME</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/products/new?token=75aac5352e895b8456cd6fcb06269e79\"
             data-item=\"Nieuw product\"
    >Nieuw product</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/categories/new?token=75aac5352e895b8456cd6fcb06269e79\"
             data-item=\"Nieuwe categorie\"
    >Nieuwe categorie</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCartRules&amp;addcart_rule&amp;token=819fda7058a64226f07ba72baf0c0919\"
             data-item=\"Nieuwe voucher\"
    >Nieuwe voucher</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=ps_facetedsearch&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
             data-item=\"Product filter\"
    >Product filter</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=seoexpert&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
             data-item=\"seo expert\"
    >seo expert</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzersho";
        // line 301
        echo "p-test.nl/admin-dev/index.php?controller=AdminStats&amp;module=statsforecast&amp;token=e74d58a885c40df26dc72f8ede2f24f9\"
             data-item=\"Statistieken\"
    >Statistieken</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminStats&amp;module=statscheckup&amp;token=e74d58a885c40df26dc72f8ede2f24f9\"
             data-item=\"Winkel evaluatie\"
    >Winkel evaluatie</a>
    <div class=\"dropdown-divider\"></div>
      <a id=\"quick-add-link\"
      class=\"dropdown-item js-quick-link\"
      href=\"#\"
      data-rand=\"36\"
      data-icon=\"icon-AdminParentOrders\"
      data-method=\"add\"
      data-url=\"index.php/sell/orders\"
      data-post-link=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminQuickAccesses\"
      data-prompt-text=\"Geef een naam aan deze shortcut:\"
      data-link=\"Bestellingen - Lijst\"
    >
      <i class=\"material-icons\">add_circle</i>
      Voeg de huidige pagina toe aan Snelle toegang
    </a>
    <a id=\"quick-manage-link\" class=\"dropdown-item\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminQuickAccesses\">
    <i class=\"material-icons\">settings</i>
    Beheer uw snelle toegang
  </a>
</div>
        </div>

        <div class=\"component-search-background d-none\"></div>
      </div>

              <div class=\"component hide-mobile-sm\" id=\"header-debug-mode-container\">
          <a class=\"link shop-state\"
             id=\"debug-mode\"
             data-toggle=\"pstooltip\"
             data-placement=\"bottom\"
             data-html=\"true\"
             title=\"<p class=&quot;text-left&quot;><strong>Je winkel bevindt zich in de foutopsporingsmodus.</strong></p><p class=&quot;text-left&quot;>Alle PHP-fouten en waarschuwingen worden getoond. Als u dit niet langer wilt zien, &lt;strong&gt;schakel deze modus uit&lt;/strong&gt;.</p>\"
             href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/performance/\"
        ";
        // line 341
        echo "  >
            <i class=\"material-icons\">bug_report</i>
            <span>Debug-modus</span>
          </a>
        </div>
      
                      <div class=\"component hide-mobile-sm\" id=\"header-maintenance-mode-container\">
          <a class=\"link shop-state\"
             id=\"maintenance-mode\"
             data-toggle=\"pstooltip\"
             data-placement=\"bottom\"
             data-html=\"true\"
             title=\"          &lt;p class=&quot;text-left text-nowrap&quot;&gt;
            &lt;strong&gt;Je winkel is in onderhoudsmodus.&lt;/strong&gt;
          &lt;/p&gt;
          &lt;p class=&quot;text-left&quot;&gt;
              Uw bezoekers en klanten hebben geen toegang tot uw winkel in de onderhoudsmodus.
          &lt;/p&gt;
          &lt;p class=&quot;text-left&quot;&gt;
              Ga naar Winkelinstellingen &amp;gt; Algemeen &amp;gt; tabblad Onderhoud om de onderhoudsinstellingen te beheren.
          &lt;/p&gt;
                      &lt;p class=&quot;text-left&quot;&gt;
              Beheerders hebben toegang tot de frontoffice van de winkel zonder hun IP-adres op te slaan.
            &lt;/p&gt;
                  \"
             href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/maintenance/\"
          >
            <i class=\"material-icons\"
              style=\"color: var(--green);\"
            >build</i>
            <span>Onderhoudsmodus</span>
          </a>
        </div>
      
      <div class=\"header-right\">
                          <div class=\"component header-right-component\" id=\"header-notifications-container\">
            <div id=\"notif\" class=\"notification-center dropdown dropdown-clickable\">
  <button class=\"btn notification js-notification dropdown-toggle\" data-toggle=\"dropdown\">
    <i class=\"material-icons\">notifications_none</i>
    <span id=\"notifications-total\" class=\"count hide\">0</span>
  </button>
  <div class=\"dropdown-menu dropdown-menu-right js-notifs_dropdown\">
    <div class=\"notifications\">
      <u";
        // line 384
        echo "l class=\"nav nav-tabs\" role=\"tablist\">
                          <li class=\"nav-item\">
            <a
              class=\"nav-link active\"
              id=\"orders-tab\"
              data-toggle=\"tab\"
              data-type=\"order\"
              href=\"#orders-notifications\"
              role=\"tab\"
            >
              Bestellingen<span id=\"_nb_new_orders_\"></span>
            </a>
          </li>
                                    <li class=\"nav-item\">
            <a
              class=\"nav-link \"
              id=\"customers-tab\"
              data-toggle=\"tab\"
              data-type=\"customer\"
              href=\"#customers-notifications\"
              role=\"tab\"
            >
              Klanten<span id=\"_nb_new_customers_\"></span>
            </a>
          </li>
                                    <li class=\"nav-item\">
            <a
              class=\"nav-link \"
              id=\"messages-tab\"
              data-toggle=\"tab\"
              data-type=\"customer_message\"
              href=\"#messages-notifications\"
              role=\"tab\"
            >
              Berichten<span id=\"_nb_new_messages_\"></span>
            </a>
          </li>
                        </ul>

      <!-- Tab panes -->
      <div class=\"tab-content\">
                          <div class=\"tab-pane active empty\" id=\"orders-notifications\" role=\"tabpanel\">
            <p class=\"no-notification\">
              Geen nieuwe bestellingen :(<br>
              Hebt u uw <strong><a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCarts&action=filterOnlyAbandonedCarts\">abandoned carts</a></strong> gecontroleerd?<br>Uw volgende bestelling zou zich daar kunnen bevinden!
            </p>
            <div class=\"notification-elements\"></div>
          </div>
                                    <div class=\"tab-pane  empty\" id=\"customers-notifications\" role=\"tabpanel\">
            <p class=\"no-notification\">
              Geen nieuwe klanten :(<br>
            ";
        // line 435
        echo "  Bent u actief op social media?
            </p>
            <div class=\"notification-elements\"></div>
          </div>
                                    <div class=\"tab-pane  empty\" id=\"messages-notifications\" role=\"tabpanel\">
            <p class=\"no-notification\">
              Geen nieuwe berichten.<br>
              Het lijkt erop dat al uw klanten tevreden zijn :)
            </p>
            <div class=\"notification-elements\"></div>
          </div>
                        </div>
    </div>
  </div>
</div>

  <script type=\"text/html\" id=\"order-notification-template\">
    <a class=\"notif\" href='order_url'>
      #_id_order_ -
      van <strong>_customer_name_</strong> (_iso_code_)_carrier_
      <strong class=\"float-sm-right\">_total_paid_</strong>
    </a>
  </script>

  <script type=\"text/html\" id=\"customer-notification-template\">
    <a class=\"notif\" href='customer_url'>
      #_id_customer_ - <strong>_customer_name_</strong>_company_ - geregistreerd <strong>_date_add_</strong>
    </a>
  </script>

  <script type=\"text/html\" id=\"message-notification-template\">
    <a class=\"notif\" href='message_url'>
    <span class=\"message-notification-status _status_\">
      <i class=\"material-icons\">fiber_manual_record</i> _status_
    </span>
      - <strong>_customer_name_</strong> (_company_) - <i class=\"material-icons\">access_time</i> _date_add_
    </a>
  </script>
          </div>
        
        <div class=\"component\" id=\"header-employee-container\">
          <div class=\"dropdown employee-dropdown\">
  <div class=\"rounded-circle person\" data-toggle=\"dropdown\">
    <i class=\"material-icons\">account_circle</i>
  </div>
  <div class=\"dropdown-menu dropdown-menu-right\">
    <div class=\"employee-wrapper-avatar\">
      <div class=\"employee-top\">
        <span class=\"employee-avatar\"><img class=\"avatar rounded-circle\" src=\"https://ngrok.ijzershop-test.nl/img/pr/default.jpg\" alt=\"Moderne\" /></span>
        <span class=\"employee_profile\">Welkom terug Moderne</span>
   ";
        // line 485
        echo "   </div>

      <a class=\"dropdown-item employee-link profile-link\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/employees/2/edit\">
      <i class=\"material-icons\">edit</i>
      <span>Uw profiel</span>
    </a>
    </div>

    <p class=\"divider\"></p>

                  <a class=\"dropdown-item \" href=\"https://accounts.distribution.prestashop.net?utm_source=ngrok.ijzershop-test.nl&utm_medium=back-office&utm_campaign=ps_accounts&utm_content=headeremployeedropdownlink\"  target=\"_blank\" rel=\"noopener noreferrer nofollow\">
            <i class=\"material-icons\">open_in_new</i> Beheer uw PrestaShop account
        </a>
                  <p class=\"divider\"></p>
            
    <a class=\"dropdown-item employee-link text-center\" id=\"header_logout\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminLogin&amp;logout=1\">
      <i class=\"material-icons d-lg-none\">power_settings_new</i>
      <span>Afmelden</span>
    </a>
  </div>
</div>
        </div>
              </div>
    </nav>
  </header>

  <nav class=\"nav-bar d-none d-print-none d-md-block\">
  <span class=\"menu-collapse\" data-toggle-url=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/employees/toggle-navigation\">
    <i class=\"material-icons rtl-flip\">chevron_left</i>
    <i class=\"material-icons rtl-flip\">chevron_left</i>
  </span>

  <div class=\"nav-bar-overflow\">
      <div class=\"logo-container\">
          <a id=\"header_logo\" class=\"logo float-left\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminDashboard\"></a>
          <span id=\"shop_version\" class=\"header-version\">8.2.0</span>
      </div>

      <ul class=\"main-menu\">
              
                    
                    
          
            <li class=\"link-levelone\" data-submenu=\"1\" id=\"tab-AdminDashboard\">
              <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminDashboard\" class=\"link\" >
                <i class=\"mat";
        // line 530
        echo "erial-icons\">trending_up</i> <span>Dashboard</span>
              </a>
            </li>

          
                      
                                          
                    
          
            <li class=\"category-title link-active\" data-submenu=\"2\" id=\"tab-SELL\">
                <span class=\"title\">Verkopen</span>
            </li>

                              
                  
                                                      
                                                          
                  <li class=\"link-levelone has_submenu link-active open ul-open\" data-submenu=\"3\" id=\"subtab-AdminParentOrders\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/orders/\" class=\"link\">
                      <i class=\"material-icons mi-shopping_basket\">shopping_basket</i>
                      <span>
                      Bestellingen
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_up
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-3\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo link-active\" data-submenu=\"4\" id=\"subtab-AdminOrders\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/orders/\" class=\"link\"> Bestellingen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <l";
        // line 569
        echo "i class=\"link-leveltwo\" data-submenu=\"5\" id=\"subtab-AdminInvoices\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/orders/invoices/\" class=\"link\"> Facturen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"6\" id=\"subtab-AdminSlip\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/orders/credit-slips/\" class=\"link\"> Creditnota&#039;s
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"7\" id=\"subtab-AdminDeliverySlip\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/orders/delivery-slips/\" class=\"link\"> Pakbonnen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"8\" id=\"subtab-AdminCarts\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCarts\" class=\"link\"> Winkelwagens
                                </a>
                              </li>

                                                                                                                                        
                              
                                                            
     ";
        // line 601
        echo "                         <li class=\"link-leveltwo\" data-submenu=\"475\" id=\"subtab-AdminOfferController\">
                                <a href=\"/admin-dev/index.php/modules/modernesmid/offerintegration/admin-offer\" class=\"link\"> Offerte aanmaken
                                </a>
                              </li>

                                                                                                                                                                                          </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"9\" id=\"subtab-AdminCatalog\">
                    <a href=\"/admin-dev/index.php/sell/catalog/products\" class=\"link\">
                      <i class=\"material-icons mi-store\">store</i>
                      <span>
                      Catalogus
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-9\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"10\" id=\"subtab-AdminProducts\">
                                <a href=\"/admin-dev/index.php/sell/catalog/products\" class=\"link\"> Producten
                                </a>
                              </li>

                                                                                  
                              
                  ";
        // line 633
        echo "                                          
                              <li class=\"link-leveltwo\" data-submenu=\"11\" id=\"subtab-AdminCategories\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/categories\" class=\"link\"> CategorieÃ«n
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"12\" id=\"subtab-AdminTracking\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/monitoring/\" class=\"link\"> Monitoring
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"13\" id=\"subtab-AdminParentAttributesGroups\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminAttributesGroups\" class=\"link\"> Kenmerken en functies
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"16\" id=\"subtab-AdminParentManufacturers\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/brands/\" class=\"link\"> Merken en leveranciers
                                </a>
                              </li>

                                                                                  
                ";
        // line 664
        echo "              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"19\" id=\"subtab-AdminAttachments\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/attachments/\" class=\"link\"> Bestanden
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"20\" id=\"subtab-AdminParentCartRules\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCartRules\" class=\"link\"> Kortingen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"23\" id=\"subtab-AdminStockManagement\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/stocks/\" class=\"link\"> Stocks
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"24\" id=\"subtab-AdminParentCustomer\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/customers/\" class=\"link\">
                      <i class=\"material-icons mi-account_circle\">account_circle</i>
                      <span>
                     ";
        // line 697
        echo " Klanten
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-24\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"25\" id=\"subtab-AdminCustomers\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/customers/\" class=\"link\"> Klanten
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"26\" id=\"subtab-AdminAddresses\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/modules/sell/addresses/\" class=\"link\"> Adressen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"27\" id=\"subtab-AdminOutstanding\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/outstanding/\" class=\"link\"> Openstaand
                                </a>
                              </li>

                                                                              </ul>
                                        </li>";
        // line 729
        echo "
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"28\" id=\"subtab-AdminParentCustomerThreads\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCustomerThreads\" class=\"link\">
                      <i class=\"material-icons mi-chat\">chat</i>
                      <span>
                      Klantenservice
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-28\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"29\" id=\"subtab-AdminCustomerThreads\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCustomerThreads\" class=\"link\"> Klantenservice
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"30\" id=\"subtab-AdminOrderMessage\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/customer-service/order-messages/\" class=\"link\"> Bestellingsberichten
                                </a>
                              </li>

                                                        ";
        // line 761
        echo "                          
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"31\" id=\"subtab-AdminReturn\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminReturn\" class=\"link\"> Retourzendingen
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"32\" id=\"subtab-AdminStats\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminStats\" class=\"link\">
                      <i class=\"material-icons mi-assessment\">assessment</i>
                      <span>
                      Statistieken
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"348\" id=\"subtab-AdminPricemodifier\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/modules/pricemodifier/price_modifications\" class=\"link\">
                      <i class=\"material-icons mi-style\">style</i>
                      <span>
                      Moderne Smid Price Modifier
                      </span>
             ";
        // line 796
        echo "                                       <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-348\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"349\" id=\"subtab-AdminPricemodifierPriceModification\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/modules/pricemodifier/price_modifications\" class=\"link\"> Price Modification
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                              
          
                      
                                          
                    
          
            <li class=\"category-title\" data-submenu=\"42\" id=\"tab-IMPROVE\">
                <span class=\"title\">Verbeteren</span>
            </li>

                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"43\" id=\"subtab-AdminParentModulesSf\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/modules/manage\" class=\"link\">
                      <i class=\"material-icons mi-extension\">extension</i>
                      <span>
                      Modules
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard";
        // line 832
        echo "_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-43\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"44\" id=\"subtab-AdminModulesSf\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/modules/manage\" class=\"link\"> Module manager
                                </a>
                              </li>

                                                                                                                                                                                              
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"474\" id=\"subtab-MsAdminThemeConfController\">
                                <a href=\"/admin-dev/index.php/modules/improve/modules/manage/action/configure/msthemeconfig\" class=\"link\"> Moderne Smid Thema Conf
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"693\" id=\"subtab-DpRedirect\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=DpRedirect\" class=\"link\"> Dynamic Product
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
";
        // line 863
        echo "                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"52\" id=\"subtab-AdminParentThemes\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/design/themes/\" class=\"link\">
                      <i class=\"material-icons mi-desktop_mac\">desktop_mac</i>
                      <span>
                      Design
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-52\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"138\" id=\"subtab-AdminThemesParent\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/design/themes/\" class=\"link\"> Thema en logo
                                </a>
                              </li>

                                                                                                                                        
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"55\" id=\"subtab-AdminParentMailTheme\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/design/mail_theme/\" class=\"link\"> Email thema
                                </a>
                              </li>

                                                                                  
        ";
        // line 894
        echo "                      
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"57\" id=\"subtab-AdminCmsContent\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/design/cms-pages/\" class=\"link\"> Pagina&#039;s
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"58\" id=\"subtab-AdminModulesPositions\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/design/modules/positions/\" class=\"link\"> Posities
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"59\" id=\"subtab-AdminImages\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminImages\" class=\"link\"> Afbeeldingsinstellingen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"125\" id=\"subtab-AdminLinkWidget\">
                                <a href=\"/admin-dev/index.php/modules/link-widget/list\" class=\"link\"> Link Widget
                                </a>
                              </li>

                                                                              </ul>
                            ";
        // line 926
        echo "            </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"60\" id=\"subtab-AdminParentShipping\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCarriers\" class=\"link\">
                      <i class=\"material-icons mi-local_shipping\">local_shipping</i>
                      <span>
                      Verzending
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-60\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"61\" id=\"subtab-AdminCarriers\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCarriers\" class=\"link\"> Vervoerders
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"62\" id=\"subtab-AdminShipping\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/shipping/preferences/\" class=\"link\"> Instellingen
                                </a>
                              </li>

                                                                          ";
        // line 958
        echo "    </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"63\" id=\"subtab-AdminParentPayment\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/payment/payment_methods\" class=\"link\">
                      <i class=\"material-icons mi-payment\">payment</i>
                      <span>
                      Betaling
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-63\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"64\" id=\"subtab-AdminPayment\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/payment/payment_methods\" class=\"link\"> Betaalmethoden
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"65\" id=\"subtab-AdminPaymentPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/payment/preferences\" class=\"link\"> Instellingen
                                </a>
                              </li>

                             ";
        // line 991
        echo "                                                 </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"66\" id=\"subtab-AdminInternational\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/international/localization/\" class=\"link\">
                      <i class=\"material-icons mi-language\">language</i>
                      <span>
                      Internationaal
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-66\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"67\" id=\"subtab-AdminParentLocalization\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/international/localization/\" class=\"link\"> Lokalisatie
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"72\" id=\"subtab-AdminParentCountries\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/international/zones/\" class=\"link\"> Locaties
                                </a>
   ";
        // line 1022
        echo "                           </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"76\" id=\"subtab-AdminParentTaxes\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/international/taxes/\" class=\"link\"> BTW
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"79\" id=\"subtab-AdminTranslations\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/international/translations/settings\" class=\"link\"> Vertalingen
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"131\" id=\"subtab-AdminEmarketing\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminEmarketing\" class=\"link\">
                      <i class=\"material-icons mi-track_changes\">track_changes</i>
                      <span>
                      Advertising
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </";
        // line 1055
        echo "a>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"627\" id=\"subtab-AdminMollieModule_MTR\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminMollieModule\" class=\"link\">
                      <i class=\"material-icons mi-mollie\">mollie</i>
                      <span>
                      Mollie
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-627\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"628\" id=\"subtab-AdminMollieModule\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminMollieModule\" class=\"link\"> Settings
                                </a>
                              </li>

                                                                                                                                                                                              
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"633\" id=\"subtab-AdminMollieSubscriptionOrdersParent\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminMollieSubscriptionOrdersParent\" cl";
        // line 1084
        echo "ass=\"link\"> Subscriptions
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"635\" id=\"subtab-AdminMollieSubscriptionFAQParent\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminMollieSubscriptionFAQParent\" class=\"link\"> Subscription FAQ
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"730\" id=\"subtab-AdminMollieLogsParent\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminMollieLogsParent\" class=\"link\"> Logs
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                              
          
                      
                                          
                    
          
            <li class=\"category-title\" data-submenu=\"80\" id=\"tab-CONFIGURE\">
                <span class=\"title\">Configureer</span>
            </li>

                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"81\" id=\"subtab-ShopParameters\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/preferences/preferences\" class=\"link\">
                      <i class=\"material-icons mi-settings\">settings</i>
 ";
        // line 1123
        echo "                     <span>
                      Winkelinstellingen
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-81\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"82\" id=\"subtab-AdminParentPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/preferences/preferences\" class=\"link\"> Algemeen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"85\" id=\"subtab-AdminParentOrderPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/order-preferences/\" class=\"link\"> Bestellingsinstellingen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"88\" id=\"subtab-AdminPPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/product-preferences/\" class=\"link\"> Producten
                                </a>
                  ";
        // line 1153
        echo "            </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"89\" id=\"subtab-AdminParentCustomerPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/customer-preferences/\" class=\"link\"> Klantinstellingen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"93\" id=\"subtab-AdminParentStores\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/contacts/\" class=\"link\"> Contact
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"96\" id=\"subtab-AdminParentMeta\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/seo-urls/\" class=\"link\"> Verkeer en SEO
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"100\" id=\"subtab-AdminParentSearchConf\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminSearchConf\" class=\"link\"> Zoeken
                             ";
        // line 1184
        echo "   </a>
                              </li>

                                                                                                                                    </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"103\" id=\"subtab-AdminAdvancedParameters\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/system-information/\" class=\"link\">
                      <i class=\"material-icons mi-settings_applications\">settings_applications</i>
                      <span>
                      Geavanceerde instellingen
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-103\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"104\" id=\"subtab-AdminInformation\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/system-information/\" class=\"link\"> Informatie
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"105\" id=\"subtab-AdminPerformance\">
                  ";
        // line 1216
        echo "              <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/performance/\" class=\"link\"> Prestaties
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"106\" id=\"subtab-AdminAdminPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/administration/\" class=\"link\"> Administratie
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"107\" id=\"subtab-AdminEmails\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/emails/\" class=\"link\"> E-mail
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"108\" id=\"subtab-AdminImport\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/import/\" class=\"link\"> Importeren
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"109\" id=\"subtab-AdminParentEmployees\">
       ";
        // line 1248
        echo "                         <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/employees/\" class=\"link\"> Medewerkers
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"113\" id=\"subtab-AdminParentRequestSql\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/sql-requests/\" class=\"link\"> Database
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"116\" id=\"subtab-AdminLogs\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/logs/\" class=\"link\"> Logboeken
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"117\" id=\"subtab-AdminWebservice\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/webservice-keys/\" class=\"link\"> Webservice
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"118\" id=\"subtab-AdminShopGroup\"";
        // line 1279
        echo ">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShopGroup\" class=\"link\"> Multistore
                                </a>
                              </li>

                                                                                                                                        
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"243\" id=\"subtab-AdminFeatureFlag\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/feature-flags/\" class=\"link\"> Experimental Feature
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"486\" id=\"subtab-AdminParentSecurity\">
                                <a href=\"/admin-dev/index.php/configure/advanced/security/\" class=\"link\"> Security
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"680\" id=\"subtab-AdminWebPConfiguration\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminWebPConfiguration\" class=\"link\"> WebP Converter
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                       ";
        // line 1312
        echo "                               
                  
                  <li class=\"link-levelone\" data-submenu=\"231\" id=\"subtab-AdminSelfUpgrade\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminSelfUpgrade\" class=\"link\">
                      <i class=\"material-icons mi-upgrade\">upgrade</i>
                      <span>
                      1-Click Upgrade
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                              
          
                      
                    
                    
          
            <li class=\"link-levelone\" data-submenu=\"589\" id=\"tab-AdvancedVatManager\">
              <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdvancedVatManager\" class=\"link\" >
                <i class=\"material-icons\">business_center</i> <span>Geavanceerde btw-manager</span>
              </a>
            </li>

          
                      
                                          
                    
          
            <li class=\"category-title\" data-submenu=\"652\" id=\"tab-AdvancedVatManagerParent\">
                <span class=\"title\">Advanced VAT Manager</span>
            </li>

                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"653\" id=\"subtab-AdminCustomersVatManager\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCustomersVatManager\" class=\"link\">
                      <i class=\"material-icons mi-credit_card\">credit_card</i>
                      <span>
         ";
        // line 1354
        echo "             Customer VAT Number Management
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"654\" id=\"subtab-AdminCustomersExemptionManager\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCustomersExemptionManager\" class=\"link\">
                      <i class=\"material-icons mi-group_add\">group_add</i>
                      <span>
                      Customer VAT Exemption Management
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"655\" id=\"subtab-AdminCustomersOrdersManager\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCustomersOrdersManager\" class=\"link\">
                      <i class=\"material-icons mi-shopping_cart\">shopping_cart</i>
                      <span>
                      Orders Management
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
            ";
        // line 1387
        echo "                                                        keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"656\" id=\"subtab-AdminCheckVAT\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCheckVAT\" class=\"link\">
                      <i class=\"material-icons mi-check_circle\">check_circle</i>
                      <span>
                      VAT Check Tool
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"657\" id=\"subtab-AdminAVMSettings\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminAVMSettings\" class=\"link\">
                      <i class=\"material-icons mi-tune\">tune</i>
                      <span>
                      Settings
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                              
         ";
        // line 1422
        echo " 
                  </ul>
  </div>
  
</nav>


<div class=\"header-toolbar d-print-none\">
        <div
        id=\"header-multishop\"
        class=\"header-multishop header-multishop-allshops header-multishop-dark\"
        data-all-shops=\"1\"                data-checkbox-notification=\"Om specifieke instellingen toe te passen op een winkel of een groep winkels, selecteert u de parameter die u wilt wijzigen, brengt u uw wijzigingen aan en slaat u op. \"
    >
      <div class=\"header-multishop-top-bar\">
        <div class=\"header-multishop-center js-header-multishop-open-modal\">
                      <svg width=\"81px\" height=\"30px\" viewBox=\"0 0 81 30\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">
  <defs>
    <path d=\"M6.548,0 L36.421,0 C38.378,0 40.056,1.309 40.528,3.208 L42.787,12.434 C43.324,14.588 42.83,16.805 41.453,18.536 C41.281,18.747 41.045,18.937 40.852,19.127 L40.852,30 L36.572,30 L36.572,21.047 C36.4,21.069 36.25,21.111 36.078,21.111 C34.206,21.111 32.507,20.352 31.259,19.106 C29.969,20.372 28.248,21.111 26.441,21.111 C24.506,21.111 22.786,20.352 21.516,19.148 C20.27,20.352 18.592,21.111 16.721,21.111 C14.764,21.111 13.043,20.372 11.753,19.106 C10.505,20.352 8.806,21.111 6.935,21.111 C6.763,21.111 6.612,21.069 6.441,21.047 L6.441,30 L2.139,30 L2.139,19.127 C1.945,18.916 1.709,18.747 1.537,18.515 C0.16,16.783 -0.312,14.588 0.204,12.434 L2.462,3.208 C2.914,1.33 4.613,0 6.548,0 Z M33.453,14.482 C33.604,15.854 34.744,16.888 36.056,16.888 C37.131,16.888 37.776,16.276 38.077,15.897 C38.636,15.2 38.831,14.314 38.615,13.426 L36.357,4.201 L32.207,4.223 L33.453,14.482 Z M23.646,14.124 C23.646,15.643 24.829,16.888 26.269,16.888 C27.151,16.888 27.84,16.572 28.312,16.024 C28.872,15.411 29.13,14.588 29.023,13.765 L27.862,4.223 L23.646,4.223 L23.646,14.124 Z M14.657,16.024 C15.172,16.572 15.839,16.888 16.57,16.888 C18.161,16.888 19.345,15.643 19.345,14.124 L19.345,4.223 L15.129,4.223 L13.947,13.765 C13.86,14.588 14.118,15.411 14";
        // line 1439
        echo ".657,16.024 Z M4.935,15.897 C5.215,16.276 5.881,16.888 6.935,16.888 C8.247,16.888 9.366,15.854 9.537,14.482 L10.786,4.223 L6.548,4.223 L4.376,13.426 C4.16,14.314 4.354,15.221 4.935,15.897 Z\" id=\"path-1\"></path>
  </defs>
  <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" opacity=\"0.6\">
    <g id=\"Group-9\">
      <g id=\"Group-3\" transform=\"translate(19.000000, 0.000000)\">
        <mask id=\"mask-2\" fill=\"black\">
          <use xlink:href=\"#path-1\"></use>
        </mask>
        <use id=\"Clip-2\" fill=\"black\" xlink:href=\"#path-1\"></use>
      </g>
      <g id=\"Group-8\" transform=\"translate(0.000000, 4.000000)\" fill=\"black\">
        <path d=\"M4.2258,11.7283 L6.0998,3.8023 L9.7558,3.8023 L8.6798,12.6373 C8.5318,13.8193 7.5658,14.7093 6.4338,14.7093 C5.5248,14.7093 4.9498,14.1833 4.7078,13.8553 C4.2068,13.2733 4.0398,12.4923 4.2258,11.7283 M2.2958,16.6373 L2.2958,25.9113 L6.0068,25.9113 L6.0068,18.2913 C6.1558,18.3093 6.2858,18.3453 6.4338,18.3453 C8.0488,18.3453 9.5138,17.6913 10.5898,16.6183 C11.7048,17.7093 13.1888,18.3453 14.8768,18.3453 C16.2248,18.3453 17.4538,17.8843 18.4508,17.1303 C18.0988,16.6513 17.1618,15.7283 16.5088,13.9473 C16.0798,14.4133 15.4638,14.7093 14.7468,14.7093 C14.1168,14.7093 13.5408,14.4373 13.0958,13.9643 C12.6318,13.4373 12.4098,12.7283 12.4838,12.0193 L13.5038,3.8023 L17.1408,3.8023 L17.1408,5.0093 C17.4468,3.5693 17.8188,1.9613 18.2638,0.1663 L6.0998,0.1663 C4.4298,0.1663 2.9638,1.3113 2.5748,2.9303 L0.6258,10.8743 C0.1808,12.7283 0.5888,14.6193 1.7768,16.1093 C1.9248,16.3103 2.1288,16.4553 2.2958,16.6373\" id=\"Fill-4\"></path>
        <path d=\"M75.1653,3.8025 L77.0393,11.7285 C77.2253,12.4915 77.0583,13.2735 76.5573,13.8555 C76.3153,14.1825 75.7403,14.7095 74.8313,14.7095 C73.6993,14.7095 72.7343,13.8195 72.5863,12.6375 L71.5103,3.8025 L75.1653,3.8025 Z M66.5193,14.7095 C65.8023,14.7095 65.1863,14.4135 64.7563,13.9475 C64.1033,15.7285 63.1663,16.6515 62.8143,17.1305 C63.8113,17.8845 65.0403,18.3455 66.3893,18.3455";
        // line 1451
        echo " C68.0773,18.3455 69.5613,17.7095 70.6753,16.6185 C71.7513,17.6915 73.2173,18.3455 74.8313,18.3455 C74.9793,18.3455 75.1093,18.3095 75.2583,18.2915 L75.2583,26.0025 L78.9693,26.0025 L78.9693,16.6365 C79.1363,16.4545 79.3403,16.3095 79.4883,16.1095 C80.6763,14.6185 81.0843,12.7285 80.6393,10.8745 L78.6903,2.9295 C78.3013,1.3115 76.8353,0.1665 75.1653,0.1665 L63.0013,0.1665 C63.4463,1.9615 63.8183,3.5695 64.1253,5.0095 L64.1253,3.8025 L67.7623,3.8025 L68.7823,12.0195 C68.8563,12.7285 68.6343,13.4375 68.1703,13.9645 C67.7253,14.4375 67.1493,14.7095 66.5193,14.7095 Z\" id=\"Fill-6\"></path>
      </g>
    </g>
  </g>
</svg>
          
          <h2 class=\"header-multishop-title\">
            Alle winkels
          </h2>

          <button class=\"header-multishop-button\">
            <i class=\"material-icons\">expand_more</i>
          </button>
        </div>
      </div>

      
      <div id=\"multishop-modal\" class=\"multishop-modal multishop-modal-hidden js-multishop-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"multishop-modal\" aria-hidden=\"true\">
        <div class=\"multishop-modal-dialog js-multishop-modal-dialog\" role=\"document\">
          <div class=\"multishop-modal-body\">
                                    <div class=\"multishop-modal-search-container\">
              <i class=\"material-icons\">search</i>
              <input type=\"text\" class=\"form-control multishop-modal-search js-multishop-modal-search\" placeholder=\"Zoek winkelnaam\" data-no-results=\"Geen resultaten gevonden voor\" data-searching=\"Zoeken naar\">
            </div>
                        
            <ul class=\"multishop-modal-group-list js-multishop-scrollbar\">
                                <li class=\"multishop-modal-all multishop-modal-item\">
                                      <i class=\"material-icons\">check</i>
                                    <a class=\"multishop-modal-all-name\" href=\"/admin-dev/index.php/sell/orders/?setShopContext=\">
                    <span>Alle winkels</span>
   ";
        // line 1481
        echo "               </a>
                </li>
                
                              <li class=\"multishop-modal-group-item multishop-modal-item first-group-item\">
                                    <span class=\"multishop-modal-color-container\">
                    <i class=\"material-icons\">check</i>
                    <a class=\"multishop-modal-color\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShopGroup&amp;id_shop_group=1&amp;updateshop_group=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                  </span>
                  <a class=\"multishop-modal-group-name\" href=\"/admin-dev/index.php/sell/orders/?setShopContext=g-1\">Groep Default</a>
                                  </li>

                                  <li class=\"multishop-modal-shop-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container\">
                        <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #ff0d2e;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=1&amp;updateshop=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/sell/orders/?setShopContext=s-1\">ngrok.ijzershop-test.nl</a>                    </div>
                                          <a class=\"multishop-modal-shop-view\" href=\"https://ngrok.ijzershop-test.nl/\" target=\"_blank\" rel=\"noreferrer\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
                                                          </li>
                                  <li class=\"multishop-modal-shop";
        // line 1501
        echo "-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container\">
                        <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #ce55ff;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=2&amp;updateshop=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/sell/orders/?setShopContext=s-2\">constructie.local</a>                    </div>
                                          <a class=\"multishop-modal-shop-view\" href=\"https://constructie.local/\" target=\"_blank\" rel=\"noreferrer\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
                                                          </li>
                                  <li class=\"multishop-modal-shop-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container\">
                        <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #d8ff1d;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=3&amp;updateshop=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/sell/orders/?setShopContext=s-3\">cortenwinkel.local</a>                    </div>
                                          <a class=\"multishop-modal-shop-view\" href=\"https://cortenwinkel.local/\" target=\"_bla";
        // line 1517
        echo "nk\" rel=\"noreferrer\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
                                                          </li>
                                  <li class=\"multishop-modal-shop-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container\">
                        <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #00ff00;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=4&amp;updateshop=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/sell/orders/?setShopContext=s-4\">cortenwinkel</a>                    </div>
                                          <a class=\"multishop-modal-shop-view\" href=\"https://cortenwinkel.local/\" target=\"_blank\" rel=\"noreferrer\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
                                                          </li>
                                          </ul>
          </div>
        </div>
      </div>
    </div>

    <script src=\"/admin-dev/themes/new-theme/public/multistore_header.bundle.js?8.2.0\"></script>
  
  <div class=\"container-fluid\">

    
      <nav aria-label=\"Breadcrumb\">
        <ol class=\"breadcrumb\">
                      <li class=\"breadcrumb-item\">Bestellingen</li>
          
                  </ol>
      </nav>
    

    <div class=\"title-row\">
      
  
      <h1 class=\"title\">
      Bestellingen    </h1>
  

      
        <div class=\"toolbar-icons\">
          <div class=\"wrapper\">
            
                                                          <a
                  class=\"btn btn-primary disabled auto-pointer-events po";
        // line 1559
        echo "inter\"                  id=\"page-header-desc-configuration-add\"
                  href=\"#\"                  title=\"U kunt deze functie alleen gebruiken in enkele winkel context. Switch context om het te gebruiken.\"                  data-toggle=\"pstooltip\"
                  data-placement=\"bottom\"                                  >
                  <i class=\"material-icons\">add_circle_outline</i>                  Voeg een nieuwe bestelling toe
                </a>
                                      
            
                              <a class=\"btn btn-outline-secondary btn-help btn-sidebar\" href=\"#\"
                   title=\"Help\"
                   data-toggle=\"sidebar\"
                   data-target=\"#right-sidebar\"
                   data-url=\"/admin-dev/index.php/common/sidebar/https%253A%252F%252Fhelp.prestashop-project.org%252Fnl%252Fdoc%252FAdminOrders%253Fversion%253D8.2.0%2526country%253Dnl/Help\"
                   id=\"product_form_open_help\"
                >
                  Help
                </a>
                                    </div>
        </div>

      
    </div>
  </div>

  
  
  <div class=\"btn-floating\">
    <button class=\"btn btn-primary collapsed\" data-toggle=\"collapse\" data-target=\".btn-floating-container\" aria-expanded=\"false\">
      <i class=\"material-icons\">add</i>
    </button>
    <div class=\"btn-floating-container collapse\">
      <div class=\"btn-floating-menu\">
        
                              <a
              class=\"btn btn-floating-item   pointer\"              id=\"page-header-desc-floating-configuration-add\"
              href=\"#\"              title=\"U kunt deze functie alleen gebruiken in enkele winkel context. Switch context om het te gebruiken.\"              data-toggle=\"pstooltip\"
              data-placement=\"bottom\"            >
              Voeg een nieuwe bestelling toe
              <i class=\"material-icons\">add_circle_outline</i>            </a>
                  
                              <a cl";
        // line 1598
        echo "ass=\"btn btn-floating-item btn-help btn-sidebar\" href=\"#\"
               title=\"Help\"
               data-toggle=\"sidebar\"
               data-target=\"#right-sidebar\"
               data-url=\"/admin-dev/index.php/common/sidebar/https%253A%252F%252Fhelp.prestashop-project.org%252Fnl%252Fdoc%252FAdminOrders%253Fversion%253D8.2.0%2526country%253Dnl/Help\"
            >
              Help
            </a>
                        </div>
    </div>
  </div>
  
</div>

<div id=\"main-div\">
          
      <div class=\"content-div  \">

        

                                                        
        <div id=\"ajax_confirmation\" class=\"alert alert-success\" style=\"display: none;\"></div>
<div id=\"content-message-box\"></div>


  ";
        // line 1623
        $this->displayBlock('content_header', $context, $blocks);
        $this->displayBlock('content', $context, $blocks);
        $this->displayBlock('content_footer', $context, $blocks);
        $this->displayBlock('sidebar_right', $context, $blocks);
        echo "

        

      </div>
    </div>

  <div id=\"non-responsive\" class=\"js-non-responsive\">
  <h1>Oh nee!</h1>
  <p class=\"mt-3\">
    De mobiele versie van deze pagina is nog niet beschikbaar.
  </p>
  <p class=\"mt-2\">
    Gebruik een desktop om deze pagina te openen tot deze voor mobiel is aangepast.
  </p>
  <p class=\"mt-2\">
    Dank u.
  </p>
  <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminDashboard\" class=\"btn btn-primary py-1 mt-3\">
    <i class=\"material-icons rtl-flip\">arrow_back</i>
    Terug
  </a>
</div>
  <div class=\"mobile-layer\"></div>

      <div id=\"footer\" class=\"bootstrap\">
    
</div>
  

      <div class=\"bootstrap\">
      
    </div>
  
";
        // line 1657
        $this->displayBlock('javascripts', $context, $blocks);
        $this->displayBlock('extra_javascripts', $context, $blocks);
        $this->displayBlock('translate_javascripts', $context, $blocks);
        echo "</body>";
        echo "
</html>";
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 142
    public function block_stylesheets($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "stylesheets"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "stylesheets"));

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    public function block_extra_stylesheets($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "extra_stylesheets"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "extra_stylesheets"));

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    // line 1623
    public function block_content_header($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content_header"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content_header"));

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    public function block_content_footer($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content_footer"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content_footer"));

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    public function block_sidebar_right($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "sidebar_right"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "sidebar_right"));

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    // line 1657
    public function block_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    public function block_extra_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "extra_javascripts"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "extra_javascripts"));

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    public function block_translate_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "translate_javascripts"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "translate_javascripts"));

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    public function getTemplateName()
    {
        return "__string_template__b0f1eb87735c2e6265d11e8edbcc1387";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  1944 => 1657,  1875 => 1623,  1840 => 142,  1825 => 1657,  1785 => 1623,  1758 => 1598,  1717 => 1559,  1673 => 1517,  1655 => 1501,  1633 => 1481,  1601 => 1451,  1587 => 1439,  1568 => 1422,  1531 => 1387,  1496 => 1354,  1452 => 1312,  1417 => 1279,  1384 => 1248,  1350 => 1216,  1316 => 1184,  1283 => 1153,  1251 => 1123,  1210 => 1084,  1179 => 1055,  1144 => 1022,  1111 => 991,  1076 => 958,  1042 => 926,  1008 => 894,  975 => 863,  942 => 832,  904 => 796,  867 => 761,  833 => 729,  799 => 697,  764 => 664,  731 => 633,  697 => 601,  663 => 569,  622 => 530,  575 => 485,  523 => 435,  470 => 384,  425 => 341,  383 => 301,  350 => 270,  321 => 243,  287 => 211,  250 => 176,  211 => 142,  201 => 134,  161 => 96,  137 => 80,  127 => 72,  96 => 43,  52 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("{{ '<!DOCTYPE html>
<html lang=\"nl\">
<head>
  <meta charset=\"utf-8\">
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
<meta name=\"apple-mobile-web-app-capable\" content=\"yes\">
<meta name=\"robots\" content=\"NOFOLLOW, NOINDEX\">

<link rel=\"icon\" type=\"image/x-icon\" href=\"/img/favicon.ico\" />
<link rel=\"apple-touch-icon\" href=\"/themes/modernesmid_theme/assets/favicons/IJ_favicons/apple-icon-60x60.png\" />

<title>Bestellingen • Ijzershop</title>

  <script type=\"text/javascript\">
    var help_class_name = \\'AdminOrders\\';
    var iso_user = \\'nl\\';
    var lang_is_rtl = \\'0\\';
    var full_language_code = \\'nl-nl\\';
    var full_cldr_language_code = \\'nl-NL\\';
    var country_iso_code = \\'NL\\';
    var _PS_VERSION_ = \\'8.2.0\\';
    var roundMode = 2;
    var youEditFieldFor = \\'\\';
    var storeName = \"Ijzershop\";
        var new_order_msg = \\'Er is een nieuwe bestelling geplaatst in uw winkel.\\';
    var order_number_msg = \\'Ordernummer: \\';
    var total_msg = \\'Totaal \\';
    var from_msg = \\'Van: \\';
    var see_order_msg = \\'Bekijk deze bestelling\\';
    var new_customer_msg = \\'Een nieuwe klant heeft zich geregistreerd in uw winkel.\\';
    var customer_name_msg = \\'Klant naam \\';
    var new_msg = \\'Er is een nieuw bericht in uw winkel geplaatst.\\';
    var see_msg = \\'Lees het bericht\\';
    var token = \\'3879d0927f63975747ef1414bdcbcf8d\\';
    var currentIndex = \\'index.php?controller=AdminOrders\\';
    var employee_token = \\'f2c1c327dfcaf3e264611f2b0c958559\\';
    var choose_language_translate = \\'Selecteer een taal:\\';
    var default_language = \\'1\\';
    var admin_modules_link = \\'https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/modules/manage\\';
    var admin_notification_get_link = \\'https://ngrok.ijzershop-test.nl/admin-dev/index.php/common/notifications\\';
    var admin_notification_push_link = adminNotificationPushLink = \\'https://ngrok.ijzershop-test.nl/admin-dev/index.php/common/notifications/ack\\';
    var tab_modules_list = \\'\\';
    var update_success_msg = \\'Bijwerken gesl' | raw }}{{ 'aagd\\';
    var search_product_msg = \\'Zoek een product\\';
  </script>



<link
      rel=\"preload\"
      href=\"/admin-dev/themes/new-theme/public/2d8017489da689caedc1.preload..woff2\"
      as=\"font\"
      crossorigin
    >
      <link href=\"/admin-dev/themes/new-theme/public/create_product_default_theme.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/admin-dev/themes/new-theme/public/theme.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/js/jquery/plugins/chosen/jquery.chosen.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/js/jquery/plugins/fancybox/jquery.fancybox.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/msthemeconfig/views/css/koopman-order-grid.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/psgdpr/views/css/overrideAddress.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/mollie/views/css/admin/order-list.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/dynamicproduct/lib/media/dist/assets/order_summary-D5m_MhNh.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/dynamicproduct/lib/media/dist/assets/order-JPscWui5.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/dynamicproduct/views/css/admin.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/mollie/views/css/admin/menu.css\" rel=\"stylesheet\" type=\"text/css\"/>
  
  <script type=\"text/javascript\">
var baseAdminDir = \"\\\\/admin-dev\\\\/\";
var baseDir = \"\\\\/\";
var changeFormLanguageUrl = \"https:\\\\/\\\\/ngrok.ijzershop-test.nl\\\\/admin-dev\\\\/index.php\\\\/configure\\\\/advanced\\\\/employees\\\\/change-form-language\";
var currency = {\"iso_code\":\"EUR\",\"sign\":\"\\\\u00e2\\\\u201a\\\\u00ac\",\"name\":\"Euro\",\"format\":null};
var currency_specifications = {\"symbol\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\\\u00d7\",\"\\\\u2030\",\"\\\\u221e\",\"NaN\"],\"currencyCode\":\"EUR\",\"currencySymbol\":\"\\\\u00e2\\\\u201a\\\\u00ac\",\"numberSymbols\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\\\u00d7\",\"\\\\u2030\",\"\\\\u221e\",\"NaN\"],\"positivePattern\":\"\\\\u00a4\\\\u00a0#,##0.00\",\"' | raw }}{{ 'negativePattern\":\"\\\\u00a4\\\\u00a0-#,##0.00\",\"maxFractionDigits\":2,\"minFractionDigits\":2,\"groupingUsed\":true,\"primaryGroupSize\":3,\"secondaryGroupSize\":3};
var dp_id_module = \"377\";
var dp_id_order = 0;
var dp_module_link = \"https:\\\\/\\\\/ngrok.ijzershop-test.nl\\\\/admin-dev\\\\/index.php?controller=AdminModules&configure=dynamicproduct\";
var dp_orders = [1,3];
var dp_product_redirect = \"https:\\\\/\\\\/ngrok.ijzershop-test.nl\\\\/module\\\\/dynamicproduct\\\\/redirect?id_product=__ID_PRODUCT__&action=create_customization\";
var dp_product_settings = \"https:\\\\/\\\\/ngrok.ijzershop-test.nl\\\\/admin-dev\\\\/index.php?controller=DynamicProductSettings\";
var dp_public_path = \"https:\\\\/\\\\/ngrok.ijzershop-test.nl\\\\/modules\\\\/dynamicproduct\\\\/lib\\\\/media\\\\/dist\\\\/\";
var dp_translations = {\"3357\":\"if\",\"3555\":\"of\",\"65665\":\"Toevoegen\",\"65921\":\"Allemaal\",\"77124\":\"Max\",\"77362\":\"Min\",\"78208\":\"Nieuw\",\"2106261\":\"Copy\",\"2228070\":\"Grid\",\"2373894\":\"Laden\",\"2420395\":\"Naam\",\"2569629\":\"Opslaan\",\"2587372\":\"Step\",\"2603341\":\"Text\",\"2622298\":\"Type\",\"2641316\":\"Unit\",\"20170714\":\"Field groups\",\"42216636\":\"Show less\",\"42255992\":\"Show more\",\"42572887\":\"Maximum files\",\"46603408\":\"Greater than or equal\",\"60673783\":\"Calculation Order\",\"65193517\":\"Clear\",\"65203672\":\"Sluiten\",\"67634599\":\"Any change will have an effect on the configuration of _nb_ products.\",\"67875034\":\"Field\",\"69070285\":\"Grids\",\"70760763\":\"Image\",\"73174740\":\"Label\",\"78727453\":\"Range\",\"80208647\":\"Steps\",\"81768821\":\"Will show an error when no option is selected\",\"82420049\":\"Value\",\"94764465\":\"Checked by default\",\"96215082\":\"Export configuration to a file\",\"96634189\":\"empty\",\"112524536\":\"Any change will have an effect on the linked configurations.\",\"146608883\":\"Clear existing elements before copying\",\"168044563\":\"Prefix with a space if needed\",\"177208536\":\"Not recommended as it can slow down the cart page\",\"188877356\":\"Select a product\",\"190258903\":\"Important: The name must be a valid css class name\",\"209981527\":\"Control field\",\"213777395\":\"Use _Up__ \\\\/ _Down__ arrows and _Tab__ \\\\/ ' | raw }}{{ '_Shift__ _Tab__ to navigate between fields\",\"217062059\":\"Delete field formula\",\"225214028\":\"Import configuration from a file\",\"255574909\":\"Add a new condition\",\"309632339\":\"Add a new option\",\"335921277\":\"Select All\",\"337710188\":\"Delete all items\",\"341682506\":\"Example\",\"342988778\":\"Collapsible\",\"366478171\":\"Disabled days\",\"391613546\":\"This will **ALSO DELETE the original item**. Are you sure that you want to continue?\",\"403974246\":\"Display secondary value as option description\",\"414080266\":\"Max date\",\"415178366\":\"Opties\",\"448768363\":\"Refresh databases list\",\"472144411\":\"Price unit\",\"487485563\":\"Delete grid\",\"499705571\":\"No steps configured yet!\",\"501633139\":\"Display the calculated price in the category page\",\"502849757\":\"Actions\",\"512870211\":\"Remove field from favorites\",\"524754236\":\"Add a row\",\"539312109\":\"Formulas\",\"551803430\":\"PrestaShop fields\",\"556571664\":\"Available fields\",\"593819435\":\"Available groups\",\"616048556\":\"Save and close\",\"618203353\":\"Display dropzone\",\"635062501\":\"Interval\",\"641384524\":\"Load formula\",\"642864804\":\"If you choose to hide all fields for one or more combinations, make sure to disable the option &quot;Required customization&quot; above\",\"648178368\":\"Enable if the price depends on the cart quantity\",\"674841376\":\"This product has no field groups\",\"679767347\":\"Display secondary value as option price\",\"683837713\":\"Open in a new tab\",\"686245726\":\"Add interval field\",\"694222335\":\"Interval field\",\"707322317\":\"Instead of the currency symbol\",\"714420990\":\"Values (separate by comma, use dot for decimal values)\",\"717577136\":\"Edit summary\",\"723571741\":\"Click to edit formula\",\"733185705\":\"Calculation\",\"743137649\":\"Are you sure you want to delete the selected fields?\",\"747570142\":\"Weight formula\",\"751248134\":\"Edit description\",\"818934447\":\"Click to toggle the option visibility\",\"856190703\":\"The formula is valid\",\"863835572\":\"Import\\\\/Export configuration\",\"877234552\":\"This element was not found\",\"882649860\":\"Recalculate price in cart after each page view' | raw }}{{ '\",\"894228158\":\"Show in cart summary\",\"896194968\":\"Advanced configuration\",\"910258683\":\"Date after\\\\/before dd days\",\"936109071\":\"This name is a reserved Excel function name, please use another name\",\"941456859\":\"add a new field group\",\"942696557\":\"Display tax excluded prices\",\"955701460\":\"Delete interval field\",\"956903001\":\"Delete interval group\",\"957328081\":\"Expand condition (Shift + Click to expand all)\",\"967323594\":\"Unlink configurations\",\"987228486\":\"Formula\",\"1015824103\":\"The formula contains unknown fields\",\"1018815151\":\"Combination\",\"1023084919\":\"Select a field\",\"1028005612\":\"Enable the module for this product\",\"1035798281\":\"Unknown group\",\"1062605528\":\"Conditions\",\"1074180180\":\"No field groups configured yet!\",\"1092329901\":\"Insert as one step\",\"1092758090\":\"Allow multiselection\",\"1119619936\":\"Product Page\",\"1128817579\":\"Copy configuration\",\"1139462901\":\"Toggle all\",\"1142656251\":\"Condition\",\"1152371054\":\"Configure options visibility\",\"1201193478\":\"Display the &quot;Starting from&quot; label in the category page\",\"1224131978\":\"No custom execution order is configured, the default order will be used\",\"1265447825\":\"Minimize condition (Shift + Click to minimize all)\",\"1292109984\":\"Script name\",\"1299208205\":\"Delete this row\",\"1311260723\":\"Formula copied to clipboard\",\"1319091200\":\"Field Formula\",\"1327464299\":\"Recalculate price in cart when quantity changes\",\"1346468776\":\"Preview\",\"1365932015\":\"Steps Activation\",\"1378058502\":\"Delete condition\",\"1382863923\":\"Cost formula\",\"1385751734\":\"You can import\\\\/export a file containing the product configuration\",\"1473269982\":\"Groups Visibility\",\"1479721030\":\"Applies only if the product has a price of 0\",\"1499275331\":\"Settings\",\"1503955207\":\"The current formula is empty\",\"1506518963\":\"Insert step\",\"1507272505\":\"Demo mode enabled, only these types will be accepted\",\"1518498724\":\"Combinations\",\"1525066715\":\"Copy formula\",\"1529599611\":\"Add field column\",\"1539356550\":\"Cancel selection\",\"1543324436\":\"Row field\",\"1547472170\":\"Displaye' | raw }}{{ 'd price\",\"1550611840\":\"Use a custom calculation order\",\"1589928967\":\"The new Calculation tab displays a unified interface to add and organize calculation items\",\"1606304409\":\"Show or Hide the fields based on the selected combination\",\"1611563307\":\"Interval formula\",\"1616172285\":\"This group has already been added\",\"1620484928\":\"Delete this item\",\"1620782841\":\"Delete this step\",\"1642806840\":\"Databases\",\"1652081830\":\"Click to toggle the field visibility\",\"1721653182\":\"Deselect All\",\"1741737838\":\"Click to insert an option\",\"1772226151\":\"If empty, then the field name will be used\",\"1781676314\":\"Display weight to customers\",\"1782805700\":\"Quantity (PrestaShop Quantity)\",\"1799432497\":\"CSS class name (optional)\",\"1816510966\":\"Display label\",\"1821258733\":\"Clear the current configuration\",\"1843498208\":\"Allow saving customization to profile\",\"1880571668\":\"Minimum width\",\"1887918305\":\"unlimited\",\"1890611904\":\"Custom suffix\",\"1907478750\":\"Linking will affect current and future products of selected category\",\"1926535580\":\"Remove this column\",\"1939070905\":\"Will show an error when set to 0\",\"1939937161\":\"Delete selected fields\",\"1962674479\":\"Use Ctrl + Enter to save formula\",\"1970866633\":\"Unlink configuration\",\"1990316837\":\"Are you sure to toggle all options?\",\"1991049567\":\"Hide in summary when unchecked\",\"2001303836\":\"Loading\",\"2005080793\":\"Fields Visibility\",\"2008912283\":\"Add condition group\",\"2011110042\":\"Annuleren\",\"2030152089\":\"Minimum height\",\"2050679770\":\"Replace field names with their respective values\",\"2076495866\":\"Insert all items\",\"2089680852\":\"Exporteren\",\"2104126169\":\"Fields\",\"2124186744\":\"Click to toggle the step visibility\",\"2141373940\":\"Groups\",\"-2057845645\":\"Field Formulas\",\"-1787898834\":\"Intervals\",\"-321013333\":\"Product original price\",\"-1173076394\":\"Product original weight\",\"-91109833\":\"The quantity selected by the customer\",\"-343092435\":\"You can configure the visibility of each field based on the selected combination. A hidden field will have a null value in the' | raw }}{{ ' formula\",\"-360169678\":\"Visibility\",\"-984860935\":\"Proportions\",\"-1395957536\":\"Require all steps to be completed\",\"-258501236\":\"This step has already been added\",\"-2047922448\":\"Available steps\",\"-936937268\":\"Manage steps\",\"-1544869189\":\"Refresh\",\"-986386678\":\"add a new step\",\"-1020392531\":\"Start by inserting a step from the list above\",\"-1213154046\":\"Unknown step\",\"-1072973150\":\"Drag to reorder\",\"-1003134522\":\"There are no fields yet, add a new field in the fields tab.\",\"-1920372430\":\"Required customization\",\"-1640250765\":\"Hide quantity input\",\"-911095655\":\"Multiply price &amp; weight by quantity\",\"-319880804\":\"If activated, the displayed price &amp; weight on the product page will be multiplied by the quantity\",\"-1536078307\":\"Split summary by groups\",\"-567220177\":\"Per kilo, per litre\",\"-1105717282\":\"You can configure a displayed price if your product has a price of 0\",\"-350941306\":\"You may need to clear the cache after changing this setting\",\"-260281722\":\"Display customization cost in customization summary\",\"-72782714\":\"Copy configuration to clipboard\",\"-2100928571\":\"Import\",\"-839043195\":\"Import configuration from clipboard\",\"-266050175\":\"Export image links instead of encoding the images\",\"-970294887\":\"Results in a smaller file. Only enable if the images can be accessed from your target shop.\",\"-512299320\":\"Please select the elements you want to copy from the source product.\",\"-1440091513\":\"Equations\",\"-1295811629\":\"Combination Values\",\"-1569442514\":\"Combinations Visibility\",\"-1780637860\":\"Load configuration\",\"-1680464031\":\"Select a category\",\"-755060688\":\"Will use the same configuration in multiple products instead of copying it\",\"-969155480\":\"Link instead of copying\",\"-743709137\":\"Will not preserve the original configurations of the linked products\",\"-198824349\":\"Clear the configurations of linked products\",\"-77133620\":\"You can copy or link this configuration to all products of the selected category\",\"-97880005\":\"Will use the same configuration instead of copying ' | raw }}{{ 'it\",\"-861552729\":\"Will not preserve the current configuration\",\"-814503541\":\"You can copy the selected product configuration to the current product\",\"-376014216\":\"Add a new proportion\",\"-1266890280\":\"Add an interval group\",\"-1739945662\":\"Values\",\"-167002208\":\"Interval condition\",\"-1983196248\":\"Less than\",\"-530681616\":\"+Infinity (no upper limit)\",\"-813310028\":\"Remove this condition group\",\"-1754233898\":\"Allows the customer to expand\\\\/collapse the group by clicking on the group label\",\"-1203478535\":\"Start collapsed\",\"-557346165\":\"Select the field that you want to add\",\"-1442032302\":\"Pick a field...\",\"-997806686\":\"This feature will duplicate the group based on the value of the selected field\",\"-1306471438\":\"Delete this group\",\"-626105070\":\"Insert field group\",\"-2074469771\":\"Manage field groups\",\"-912813020\":\"Add a grid\",\"-177830133\":\"Import CSV\",\"-1963285437\":\"Delete this column\",\"-1849538101\":\"Target field\",\"-1759411248\":\"Column field\",\"-1157161804\":\"Add a column\",\"-754551441\":\"Price formula\",\"-1451894031\":\"Quantity formula\",\"-874003249\":\"Some field names are duplicated. You can either rename them or delete them.\",\"-1522567076\":\"Add a new field\",\"-597373332\":\"Do you want to update the field name in all the product formulas?\",\"-2043405119\":\"Displayed\",\"-2133620278\":\"Hidden\",\"-871138304\":\"Load a field from favorites\",\"-907353161\":\"Load a field from common fields\",\"-400560676\":\"Insert a new field here\",\"-827747024\":\"Click to select fields\",\"-1162526551\":\"Field settings\",\"-192987258\":\"Summary\",\"-2066126138\":\"Delete image\",\"-1667496710\":\"Click to upload an image\",\"-2071596850\":\"Delete color\",\"-403094350\":\"Click to pick a color\",\"-56677412\":\"Omschrijving\",\"-455739515\":\"Secondary Value\",\"-1085510111\":\"Default\",\"-328495169\":\"Required\",\"-195866273\":\"Display value as option price\",\"-961591827\":\"Image height (px)\",\"-2110296218\":\"Display info in a popup\",\"-930467021\":\"Import images\",\"-812471947\":\"Initial value\",\"-2028851885\":\"Placeholder\",\"-124100328\":\"Min characters\",\"-781016378' | raw }}{{ '\":\"Max characters\",\"-563123098\":\"Hide in summary when empty or equal to zero\",\"-1281023549\":\"Display PrestaShop style buttons\",\"-1732758869\":\"Maximum size (MB)\",\"-786546228\":\"Allowed Extensions\",\"-1369255836\":\"Thumbnail size (px)\",\"-303839446\":\"Initial date\",\"-2027417515\":\"Current day\",\"-1362116388\":\"Min date\",\"-1052633864\":\"Comma separated.\",\"-901436182\":\"Sun: 1, Mon: 2, Tues: 3, Wed: 4, Thurs: 5, Fri: 6, Sat: 7\",\"-981640203\":\"The JSON code is not valid, please check the browser console.\",\"-1156506214\":\"JSON Config\",\"-829601945\":\"Initial color\",\"-1339063232\":\"View image\",\"-1754727903\":\"Upload\",\"-929869225\":\"Add field to favorites\",\"-772024966\":\"Remove field from common fields\",\"-43752491\":\"Set as common field\",\"-1470017715\":\"Duplicate this field\",\"-1208718378\":\"This will not delete the original field\",\"-1307672979\":\"Delete this field\",\"-2016607813\":\"Filter field formulas\",\"-1479771459\":\"Create a new field formula\",\"-505434665\":\"Click to edit\",\"-345562080\":\"Field formula\",\"-1561849983\":\"This calculation order is now replaced by the Calculation tab\",\"-198258289\":\"Add an execution item\",\"-1450803135\":\"deletes all execution items\",\"-1327547091\":\"Reset to default\",\"-1069635520\":\"Filter conditions\",\"-1840858600\":\"Create a new condition\",\"-27641343\":\"Click to toggle the group visibility\",\"-184663564\":\"Options visibility\",\"-1853217873\":\"Show the advanced settings\",\"-1733472447\":\"Condition formula\",\"-141573914\":\"Filter condition fields\",\"-1364207966\":\"Are you sure that you want to delete all items?\",\"-88887989\":\"Click to open the item\",\"-213492928\":\"Click to open the item tab\",\"-1997101839\":\"Hold shift to also delete the original item\",\"-1437454083\":\"Are you sure that you want to add all the items?\",\"-2068694494\":\"Insert selected items\",\"-1504585939\":\"No items were found, start by adding a new item below\",\"-1095166702\":\"Pick a custom color\",\"-2029223687\":\"Edit product\",\"-885795230\":\"Module configuration\",\"-865760232\":\"This configuration is linked to the product\",\"-209097655' | raw }}{{ '0\":\"Copy linked configuration\",\"-1627988830\":\"View original configuration\",\"-781361040\":\"This configuration is linked to _nb_ products\",\"-209324991\":\"Filter fields\",\"-859165076\":\"You can use multiple filters separated by spaces\",\"-1888060882\":\"Check formula\",\"-2478677\":\"Add formula to favorites\",\"-1433567116\":\"Are you sure you want to delete this item\",\"-135023574\":\"Could not copy formula to clipboard\",\"-1882967692\":\"Remove formula from presets\",\"-429764437\":\"No preset formulas. Click the star icon to add one.\",\"-1799625922\":\"Please enter a field name first\",\"-2132954502\":\"Create a new dynamic variable field\",\"-1783025135\":\"Field name\",\"-226074697\":\"Save new field\",\"-229417419\":\"Databases refreshed successfully\",\"-377760440\":\"Product attributes\",\"-590915474\":\"Product features\",\"-274987431\":\"Long press to use the secondary value\",\"-426186843\":\"Secondary value\"};
var dp_uri = \"\\\\/modules\\\\/dynamicproduct\\\\/\";
var isPsVersion177 = true;
var mollieHookAjaxUrl = \"https:\\\\/\\\\/ngrok.ijzershop-test.nl\\\\/admin-dev\\\\/index.php?controller=AdminMollieAjax\";
var molliePendingStatus = \"39\";
var number_specifications = {\"symbol\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\\\u00d7\",\"\\\\u2030\",\"\\\\u221e\",\"NaN\"],\"numberSymbols\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\\\u00d7\",\"\\\\u2030\",\"\\\\u221e\",\"NaN\"],\"positivePattern\":\"#,##0.###\",\"negativePattern\":\"-#,##0.###\",\"maxFractionDigits\":3,\"minFractionDigits\":0,\"groupingUsed\":true,\"primaryGroupSize\":3,\"secondaryGroupSize\":3};
var prestashop = {\"debug\":true};
var ps_module_dev = false;
var psgdprNoAddresses = \"Klantgegevens verwijderd door de offici\\\\u00eble GDPR-module.\";
var show_new_customers = \"1\";
var show_new_messages = \"1\";
var show_new_orders = \"1\";
</script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/main.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/multistore_dropdown.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/js/jquery/plugins/jquery.chosen.js\"></script>
<script type=\"text/javascr' | raw }}{{ 'ipt\" src=\"/js/jquery/plugins/fancybox/jquery.fancybox.js\"></script>
<script type=\"text/javascript\" src=\"/js/admin.js?v=8.2.0\"></script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/cldr.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/js/tools.js?v=8.2.0\"></script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/create_product.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/modules/msthemeconfig/views/js/koopman.js\"></script>
<script type=\"text/javascript\" src=\"/modules/ps_emailalerts/js/admin/ps_emailalerts.js\"></script>
<script type=\"text/javascript\" src=\"/modules/psgdpr/views/js/overrideAddress.js\"></script>
<script type=\"text/javascript\" src=\"/modules/mollie/views/js/admin/order_list.js\"></script>
<script type=\"text/javascript\" src=\"/modules/mollie/views/js/admin/order_add.js\"></script>
<script type=\"text/javascript\" src=\"/modules/ps_faviconnotificationbo/views/js/favico.js\"></script>
<script type=\"text/javascript\" src=\"/modules/ps_faviconnotificationbo/views/js/ps_faviconnotificationbo.js\"></script>

  <script>
  if (undefined !== ps_faviconnotificationbo) {
    ps_faviconnotificationbo.initialize({
      backgroundColor: \\'#DF0067\\',
      textColor: \\'#ffffff\\',
      notificationGetUrl: \\'https://ngrok.ijzershop-test.nl/admin-dev/index.php/common/notifications\\',
      CHECKBOX_ORDER: 0,
      CHECKBOX_CUSTOMER: 0,
      CHECKBOX_MESSAGE: 0,
      timer: 120000, // Refresh every 2 minutes
    });
  }
</script>
<script type=\"text/javascript\">
  (function () {
    var request = new XMLHttpRequest();
    request.open(\\'GET\\', \\'https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&configure=mollie&ajax=1&action=MollieMethodConfig\\', true);
    request.send();
    request = null;
  }());
</script>

<div class=\"form-group col-xl-12 hidden d-none\" id=\"mollie-email-send-group\">
    <div class=\"col-lg-3\"></div>
    <div class=\"col-lg-9 offset-sm-4\">
        <input type=\"checkbox\" name=\"m' | raw }}{{ 'ollie-email-send\" checked>
        <label class=\"control-label\">Stuur een betalingsmail naar de klant. (Wordt verstuurd na het aanmaken van de bestelling)</label>
    </div>
</div>
<script type=\"module\" src=\"/modules/dynamicproduct/lib/media/dist/assets/order_summary-D2ZtWKVK.js\"></script>
<script type=\"module\" src=\"/modules/dynamicproduct/lib/media/dist/assets/order-DpqIUxoC.js\"></script>


' | raw }}{% block stylesheets %}{% endblock %}{% block extra_stylesheets %}{% endblock %}</head>{{ '

<body
  class=\"lang-nl adminorders multishop-enabled developer-mode\"
  data-base-url=\"/admin-dev/index.php\"  data-token=\"HeDHGfMQGawgiPDlkRNZVKRWGNBisWgJ9GCuGfzpEQA\">

  <header id=\"header\" class=\"d-print-none\">

    <nav id=\"header_infos\" class=\"main-header\">
      <button class=\"btn btn-primary-reverse onclick btn-lg unbind ajax-spinner\"></button>

            <i class=\"material-icons js-mobile-menu\">menu</i>
      <a id=\"header_logo\" class=\"logo float-left\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminDashboard\"></a>
      <span id=\"shop_version\">8.2.0</span>

      <div class=\"component\" id=\"quick-access-container\">
        <div class=\"dropdown quick-accesses\">
  <button class=\"btn btn-link btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" id=\"quick_select\">
    Snelle toegang
  </button>
  <div class=\"dropdown-menu\">
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=ordersexport&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
                 data-item=\"export orders\"
      >export orders</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/modules/manage?token=75aac5352e895b8456cd6fcb06269e79\"
                 data-item=\"GeÃ¯nstalleerde modules\"
      >GeÃ¯nstalleerde modules</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=msthemeconfig&amp;module_name=msthemeconfig&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
                 data-item=\"Module manager IJZERSHOP-THEME\"
      >Module manager IJZERSHOP-THEME</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/products/new?token=75aac5352e895b8456cd6fcb06269e7' | raw }}{{ '9\"
                 data-item=\"Nieuw product\"
      >Nieuw product</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/categories/new?token=75aac5352e895b8456cd6fcb06269e79\"
                 data-item=\"Nieuwe categorie\"
      >Nieuwe categorie</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCartRules&amp;addcart_rule&amp;token=819fda7058a64226f07ba72baf0c0919\"
                 data-item=\"Nieuwe voucher\"
      >Nieuwe voucher</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=ps_facetedsearch&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
                 data-item=\"Product filter\"
      >Product filter</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=seoexpert&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
                 data-item=\"seo expert\"
      >seo expert</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminStats&amp;module=statsforecast&amp;token=e74d58a885c40df26dc72f8ede2f24f9\"
                 data-item=\"Statistieken\"
      >Statistieken</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminStats&amp;module=statscheckup&amp;token=e74d58a885c40df26dc72f8ede2f24f9\"
                 data-item=\"Winkel evaluatie\"
      >Winkel evaluatie</a>
        <div class=\"dropdown-divider\"></div>
          <a id=\"quick-add-link\"
        class=\"dropdown-item js-quick-link\"
        href=\"#\"
        data-rand=\"93\"
        data-icon=\"icon-AdminParentOrders\"
        data-method=\"add\"
        data-url=\"index.php/sell/orders\"
      ' | raw }}{{ '  data-post-link=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminQuickAccesses\"
        data-prompt-text=\"Geef een naam aan deze shortcut:\"
        data-link=\"Bestellingen - Lijst\"
      >
        <i class=\"material-icons\">add_circle</i>
        Voeg de huidige pagina toe aan Snelle toegang
      </a>
        <a id=\"quick-manage-link\" class=\"dropdown-item\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminQuickAccesses\">
      <i class=\"material-icons\">settings</i>
      Beheer uw snelle toegang
    </a>
  </div>
</div>
      </div>
      <div class=\"component component-search\" id=\"header-search-container\">
        <div class=\"component-search-body\">
          <div class=\"component-search-top\">
            <form id=\"header_search\"
      class=\"bo_search_form dropdown-form js-dropdown-form collapsed\"
      method=\"post\"
      action=\"/admin-dev/index.php?controller=AdminSearch&amp;token=8507ff05f70daf45eadc51808e9590d1\"
      role=\"search\">
  <input type=\"hidden\" name=\"bo_search_type\" id=\"bo_search_type\" class=\"js-search-type\" />
    <div class=\"input-group\">
    <input type=\"text\" class=\"form-control js-form-search\" id=\"bo_query\" name=\"bo_query\" value=\"\" placeholder=\"Zoeken (bijv. productreferentie, klantnaam...)\" aria-label=\"Zoek veld\">
    <div class=\"input-group-append\">
      <button type=\"button\" class=\"btn btn-outline-secondary dropdown-toggle js-dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">
        Overal
      </button>
      <div class=\"dropdown-menu js-items-list\">
        <a class=\"dropdown-item\" data-item=\"Overal\" href=\"#\" data-value=\"0\" data-placeholder=\"Wat zoekt u?\" data-icon=\"icon-search\"><i class=\"material-icons\">search</i> Overal</a>
        <div class=\"dropdown-divider\"></div>
        <a class=\"dropdown-item\" data-item=\"Catalogus\" href=\"#\" data-value=\"1\" data-placeholder=\"Product naam, referentie, etc.\" data-icon=\"icon-book\"><i class=\"material-icons\">store_mall_dire' | raw }}{{ 'ctory</i> Catalogus</a>
        <a class=\"dropdown-item\" data-item=\"Klanten op naam\" href=\"#\" data-value=\"2\" data-placeholder=\"Naam\" data-icon=\"icon-group\"><i class=\"material-icons\">group</i> Klanten op naam</a>
        <a class=\"dropdown-item\" data-item=\"Klanten op IP adres\" href=\"#\" data-value=\"6\" data-placeholder=\"123.45.67.89\" data-icon=\"icon-desktop\"><i class=\"material-icons\">desktop_mac</i> Klanten op IP adres</a>
        <a class=\"dropdown-item\" data-item=\"Bestellingen\" href=\"#\" data-value=\"3\" data-placeholder=\"Bestelling-ID\" data-icon=\"icon-credit-card\"><i class=\"material-icons\">shopping_basket</i> Bestellingen</a>
        <a class=\"dropdown-item\" data-item=\"Facturen\" href=\"#\" data-value=\"4\" data-placeholder=\"Factuur nummer\" data-icon=\"icon-book\"><i class=\"material-icons\">book</i> Facturen</a>
        <a class=\"dropdown-item\" data-item=\"Winkelwagens\" href=\"#\" data-value=\"5\" data-placeholder=\"Winkelwagen-ID\" data-icon=\"icon-shopping-cart\"><i class=\"material-icons\">shopping_cart</i> Winkelwagens</a>
        <a class=\"dropdown-item\" data-item=\"Modules\" href=\"#\" data-value=\"7\" data-placeholder=\"Modulenaam\" data-icon=\"icon-puzzle-piece\"><i class=\"material-icons\">extension</i> Modules</a>
      </div>
      <button class=\"btn btn-primary\" type=\"submit\"><span class=\"d-none\">ZOEKEN</span><i class=\"material-icons\">search</i></button>
    </div>
  </div>
</form>

<script type=\"text/javascript\">
 \$(document).ready(function(){
    \$(\\'#bo_query\\').one(\\'click\\', function() {
    \$(this).closest(\\'form\\').removeClass(\\'collapsed\\');
  });
});
</script>
            <button class=\"component-search-cancel d-none\">Annuleren</button>
          </div>

          <div class=\"component-search-quickaccess d-none\">
  <p class=\"component-search-title\">Snelle toegang</p>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=ordersexport&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
             data' | raw }}{{ '-item=\"export orders\"
    >export orders</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/modules/manage?token=75aac5352e895b8456cd6fcb06269e79\"
             data-item=\"GeÃ¯nstalleerde modules\"
    >GeÃ¯nstalleerde modules</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=msthemeconfig&amp;module_name=msthemeconfig&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
             data-item=\"Module manager IJZERSHOP-THEME\"
    >Module manager IJZERSHOP-THEME</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/products/new?token=75aac5352e895b8456cd6fcb06269e79\"
             data-item=\"Nieuw product\"
    >Nieuw product</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/categories/new?token=75aac5352e895b8456cd6fcb06269e79\"
             data-item=\"Nieuwe categorie\"
    >Nieuwe categorie</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCartRules&amp;addcart_rule&amp;token=819fda7058a64226f07ba72baf0c0919\"
             data-item=\"Nieuwe voucher\"
    >Nieuwe voucher</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=ps_facetedsearch&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
             data-item=\"Product filter\"
    >Product filter</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=seoexpert&amp;token=1adaa4d5033b9e6ed774af0f892437e1\"
             data-item=\"seo expert\"
    >seo expert</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzersho' | raw }}{{ 'p-test.nl/admin-dev/index.php?controller=AdminStats&amp;module=statsforecast&amp;token=e74d58a885c40df26dc72f8ede2f24f9\"
             data-item=\"Statistieken\"
    >Statistieken</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminStats&amp;module=statscheckup&amp;token=e74d58a885c40df26dc72f8ede2f24f9\"
             data-item=\"Winkel evaluatie\"
    >Winkel evaluatie</a>
    <div class=\"dropdown-divider\"></div>
      <a id=\"quick-add-link\"
      class=\"dropdown-item js-quick-link\"
      href=\"#\"
      data-rand=\"36\"
      data-icon=\"icon-AdminParentOrders\"
      data-method=\"add\"
      data-url=\"index.php/sell/orders\"
      data-post-link=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminQuickAccesses\"
      data-prompt-text=\"Geef een naam aan deze shortcut:\"
      data-link=\"Bestellingen - Lijst\"
    >
      <i class=\"material-icons\">add_circle</i>
      Voeg de huidige pagina toe aan Snelle toegang
    </a>
    <a id=\"quick-manage-link\" class=\"dropdown-item\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminQuickAccesses\">
    <i class=\"material-icons\">settings</i>
    Beheer uw snelle toegang
  </a>
</div>
        </div>

        <div class=\"component-search-background d-none\"></div>
      </div>

              <div class=\"component hide-mobile-sm\" id=\"header-debug-mode-container\">
          <a class=\"link shop-state\"
             id=\"debug-mode\"
             data-toggle=\"pstooltip\"
             data-placement=\"bottom\"
             data-html=\"true\"
             title=\"<p class=&quot;text-left&quot;><strong>Je winkel bevindt zich in de foutopsporingsmodus.</strong></p><p class=&quot;text-left&quot;>Alle PHP-fouten en waarschuwingen worden getoond. Als u dit niet langer wilt zien, &lt;strong&gt;schakel deze modus uit&lt;/strong&gt;.</p>\"
             href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/performance/\"
        ' | raw }}{{ '  >
            <i class=\"material-icons\">bug_report</i>
            <span>Debug-modus</span>
          </a>
        </div>
      
                      <div class=\"component hide-mobile-sm\" id=\"header-maintenance-mode-container\">
          <a class=\"link shop-state\"
             id=\"maintenance-mode\"
             data-toggle=\"pstooltip\"
             data-placement=\"bottom\"
             data-html=\"true\"
             title=\"          &lt;p class=&quot;text-left text-nowrap&quot;&gt;
            &lt;strong&gt;Je winkel is in onderhoudsmodus.&lt;/strong&gt;
          &lt;/p&gt;
          &lt;p class=&quot;text-left&quot;&gt;
              Uw bezoekers en klanten hebben geen toegang tot uw winkel in de onderhoudsmodus.
          &lt;/p&gt;
          &lt;p class=&quot;text-left&quot;&gt;
              Ga naar Winkelinstellingen &amp;gt; Algemeen &amp;gt; tabblad Onderhoud om de onderhoudsinstellingen te beheren.
          &lt;/p&gt;
                      &lt;p class=&quot;text-left&quot;&gt;
              Beheerders hebben toegang tot de frontoffice van de winkel zonder hun IP-adres op te slaan.
            &lt;/p&gt;
                  \"
             href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/maintenance/\"
          >
            <i class=\"material-icons\"
              style=\"color: var(--green);\"
            >build</i>
            <span>Onderhoudsmodus</span>
          </a>
        </div>
      
      <div class=\"header-right\">
                          <div class=\"component header-right-component\" id=\"header-notifications-container\">
            <div id=\"notif\" class=\"notification-center dropdown dropdown-clickable\">
  <button class=\"btn notification js-notification dropdown-toggle\" data-toggle=\"dropdown\">
    <i class=\"material-icons\">notifications_none</i>
    <span id=\"notifications-total\" class=\"count hide\">0</span>
  </button>
  <div class=\"dropdown-menu dropdown-menu-right js-notifs_dropdown\">
    <div class=\"notifications\">
      <u' | raw }}{{ 'l class=\"nav nav-tabs\" role=\"tablist\">
                          <li class=\"nav-item\">
            <a
              class=\"nav-link active\"
              id=\"orders-tab\"
              data-toggle=\"tab\"
              data-type=\"order\"
              href=\"#orders-notifications\"
              role=\"tab\"
            >
              Bestellingen<span id=\"_nb_new_orders_\"></span>
            </a>
          </li>
                                    <li class=\"nav-item\">
            <a
              class=\"nav-link \"
              id=\"customers-tab\"
              data-toggle=\"tab\"
              data-type=\"customer\"
              href=\"#customers-notifications\"
              role=\"tab\"
            >
              Klanten<span id=\"_nb_new_customers_\"></span>
            </a>
          </li>
                                    <li class=\"nav-item\">
            <a
              class=\"nav-link \"
              id=\"messages-tab\"
              data-toggle=\"tab\"
              data-type=\"customer_message\"
              href=\"#messages-notifications\"
              role=\"tab\"
            >
              Berichten<span id=\"_nb_new_messages_\"></span>
            </a>
          </li>
                        </ul>

      <!-- Tab panes -->
      <div class=\"tab-content\">
                          <div class=\"tab-pane active empty\" id=\"orders-notifications\" role=\"tabpanel\">
            <p class=\"no-notification\">
              Geen nieuwe bestellingen :(<br>
              Hebt u uw <strong><a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCarts&action=filterOnlyAbandonedCarts\">abandoned carts</a></strong> gecontroleerd?<br>Uw volgende bestelling zou zich daar kunnen bevinden!
            </p>
            <div class=\"notification-elements\"></div>
          </div>
                                    <div class=\"tab-pane  empty\" id=\"customers-notifications\" role=\"tabpanel\">
            <p class=\"no-notification\">
              Geen nieuwe klanten :(<br>
            ' | raw }}{{ '  Bent u actief op social media?
            </p>
            <div class=\"notification-elements\"></div>
          </div>
                                    <div class=\"tab-pane  empty\" id=\"messages-notifications\" role=\"tabpanel\">
            <p class=\"no-notification\">
              Geen nieuwe berichten.<br>
              Het lijkt erop dat al uw klanten tevreden zijn :)
            </p>
            <div class=\"notification-elements\"></div>
          </div>
                        </div>
    </div>
  </div>
</div>

  <script type=\"text/html\" id=\"order-notification-template\">
    <a class=\"notif\" href=\\'order_url\\'>
      #_id_order_ -
      van <strong>_customer_name_</strong> (_iso_code_)_carrier_
      <strong class=\"float-sm-right\">_total_paid_</strong>
    </a>
  </script>

  <script type=\"text/html\" id=\"customer-notification-template\">
    <a class=\"notif\" href=\\'customer_url\\'>
      #_id_customer_ - <strong>_customer_name_</strong>_company_ - geregistreerd <strong>_date_add_</strong>
    </a>
  </script>

  <script type=\"text/html\" id=\"message-notification-template\">
    <a class=\"notif\" href=\\'message_url\\'>
    <span class=\"message-notification-status _status_\">
      <i class=\"material-icons\">fiber_manual_record</i> _status_
    </span>
      - <strong>_customer_name_</strong> (_company_) - <i class=\"material-icons\">access_time</i> _date_add_
    </a>
  </script>
          </div>
        
        <div class=\"component\" id=\"header-employee-container\">
          <div class=\"dropdown employee-dropdown\">
  <div class=\"rounded-circle person\" data-toggle=\"dropdown\">
    <i class=\"material-icons\">account_circle</i>
  </div>
  <div class=\"dropdown-menu dropdown-menu-right\">
    <div class=\"employee-wrapper-avatar\">
      <div class=\"employee-top\">
        <span class=\"employee-avatar\"><img class=\"avatar rounded-circle\" src=\"https://ngrok.ijzershop-test.nl/img/pr/default.jpg\" alt=\"Moderne\" /></span>
        <span class=\"employee_profile\">Welkom terug Moderne</span>
   ' | raw }}{{ '   </div>

      <a class=\"dropdown-item employee-link profile-link\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/employees/2/edit\">
      <i class=\"material-icons\">edit</i>
      <span>Uw profiel</span>
    </a>
    </div>

    <p class=\"divider\"></p>

                  <a class=\"dropdown-item \" href=\"https://accounts.distribution.prestashop.net?utm_source=ngrok.ijzershop-test.nl&utm_medium=back-office&utm_campaign=ps_accounts&utm_content=headeremployeedropdownlink\"  target=\"_blank\" rel=\"noopener noreferrer nofollow\">
            <i class=\"material-icons\">open_in_new</i> Beheer uw PrestaShop account
        </a>
                  <p class=\"divider\"></p>
            
    <a class=\"dropdown-item employee-link text-center\" id=\"header_logout\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminLogin&amp;logout=1\">
      <i class=\"material-icons d-lg-none\">power_settings_new</i>
      <span>Afmelden</span>
    </a>
  </div>
</div>
        </div>
              </div>
    </nav>
  </header>

  <nav class=\"nav-bar d-none d-print-none d-md-block\">
  <span class=\"menu-collapse\" data-toggle-url=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/employees/toggle-navigation\">
    <i class=\"material-icons rtl-flip\">chevron_left</i>
    <i class=\"material-icons rtl-flip\">chevron_left</i>
  </span>

  <div class=\"nav-bar-overflow\">
      <div class=\"logo-container\">
          <a id=\"header_logo\" class=\"logo float-left\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminDashboard\"></a>
          <span id=\"shop_version\" class=\"header-version\">8.2.0</span>
      </div>

      <ul class=\"main-menu\">
              
                    
                    
          
            <li class=\"link-levelone\" data-submenu=\"1\" id=\"tab-AdminDashboard\">
              <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminDashboard\" class=\"link\" >
                <i class=\"mat' | raw }}{{ 'erial-icons\">trending_up</i> <span>Dashboard</span>
              </a>
            </li>

          
                      
                                          
                    
          
            <li class=\"category-title link-active\" data-submenu=\"2\" id=\"tab-SELL\">
                <span class=\"title\">Verkopen</span>
            </li>

                              
                  
                                                      
                                                          
                  <li class=\"link-levelone has_submenu link-active open ul-open\" data-submenu=\"3\" id=\"subtab-AdminParentOrders\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/orders/\" class=\"link\">
                      <i class=\"material-icons mi-shopping_basket\">shopping_basket</i>
                      <span>
                      Bestellingen
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_up
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-3\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo link-active\" data-submenu=\"4\" id=\"subtab-AdminOrders\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/orders/\" class=\"link\"> Bestellingen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <l' | raw }}{{ 'i class=\"link-leveltwo\" data-submenu=\"5\" id=\"subtab-AdminInvoices\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/orders/invoices/\" class=\"link\"> Facturen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"6\" id=\"subtab-AdminSlip\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/orders/credit-slips/\" class=\"link\"> Creditnota&#039;s
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"7\" id=\"subtab-AdminDeliverySlip\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/orders/delivery-slips/\" class=\"link\"> Pakbonnen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"8\" id=\"subtab-AdminCarts\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCarts\" class=\"link\"> Winkelwagens
                                </a>
                              </li>

                                                                                                                                        
                              
                                                            
     ' | raw }}{{ '                         <li class=\"link-leveltwo\" data-submenu=\"475\" id=\"subtab-AdminOfferController\">
                                <a href=\"/admin-dev/index.php/modules/modernesmid/offerintegration/admin-offer\" class=\"link\"> Offerte aanmaken
                                </a>
                              </li>

                                                                                                                                                                                          </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"9\" id=\"subtab-AdminCatalog\">
                    <a href=\"/admin-dev/index.php/sell/catalog/products\" class=\"link\">
                      <i class=\"material-icons mi-store\">store</i>
                      <span>
                      Catalogus
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-9\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"10\" id=\"subtab-AdminProducts\">
                                <a href=\"/admin-dev/index.php/sell/catalog/products\" class=\"link\"> Producten
                                </a>
                              </li>

                                                                                  
                              
                  ' | raw }}{{ '                                          
                              <li class=\"link-leveltwo\" data-submenu=\"11\" id=\"subtab-AdminCategories\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/categories\" class=\"link\"> CategorieÃ«n
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"12\" id=\"subtab-AdminTracking\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/monitoring/\" class=\"link\"> Monitoring
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"13\" id=\"subtab-AdminParentAttributesGroups\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminAttributesGroups\" class=\"link\"> Kenmerken en functies
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"16\" id=\"subtab-AdminParentManufacturers\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/brands/\" class=\"link\"> Merken en leveranciers
                                </a>
                              </li>

                                                                                  
                ' | raw }}{{ '              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"19\" id=\"subtab-AdminAttachments\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/attachments/\" class=\"link\"> Bestanden
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"20\" id=\"subtab-AdminParentCartRules\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCartRules\" class=\"link\"> Kortingen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"23\" id=\"subtab-AdminStockManagement\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/stocks/\" class=\"link\"> Stocks
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"24\" id=\"subtab-AdminParentCustomer\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/customers/\" class=\"link\">
                      <i class=\"material-icons mi-account_circle\">account_circle</i>
                      <span>
                     ' | raw }}{{ ' Klanten
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-24\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"25\" id=\"subtab-AdminCustomers\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/customers/\" class=\"link\"> Klanten
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"26\" id=\"subtab-AdminAddresses\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/modules/sell/addresses/\" class=\"link\"> Adressen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"27\" id=\"subtab-AdminOutstanding\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/outstanding/\" class=\"link\"> Openstaand
                                </a>
                              </li>

                                                                              </ul>
                                        </li>' | raw }}{{ '
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"28\" id=\"subtab-AdminParentCustomerThreads\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCustomerThreads\" class=\"link\">
                      <i class=\"material-icons mi-chat\">chat</i>
                      <span>
                      Klantenservice
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-28\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"29\" id=\"subtab-AdminCustomerThreads\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCustomerThreads\" class=\"link\"> Klantenservice
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"30\" id=\"subtab-AdminOrderMessage\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/customer-service/order-messages/\" class=\"link\"> Bestellingsberichten
                                </a>
                              </li>

                                                        ' | raw }}{{ '                          
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"31\" id=\"subtab-AdminReturn\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminReturn\" class=\"link\"> Retourzendingen
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"32\" id=\"subtab-AdminStats\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminStats\" class=\"link\">
                      <i class=\"material-icons mi-assessment\">assessment</i>
                      <span>
                      Statistieken
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"348\" id=\"subtab-AdminPricemodifier\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/modules/pricemodifier/price_modifications\" class=\"link\">
                      <i class=\"material-icons mi-style\">style</i>
                      <span>
                      Moderne Smid Price Modifier
                      </span>
             ' | raw }}{{ '                                       <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-348\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"349\" id=\"subtab-AdminPricemodifierPriceModification\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/modules/pricemodifier/price_modifications\" class=\"link\"> Price Modification
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                              
          
                      
                                          
                    
          
            <li class=\"category-title\" data-submenu=\"42\" id=\"tab-IMPROVE\">
                <span class=\"title\">Verbeteren</span>
            </li>

                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"43\" id=\"subtab-AdminParentModulesSf\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/modules/manage\" class=\"link\">
                      <i class=\"material-icons mi-extension\">extension</i>
                      <span>
                      Modules
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard' | raw }}{{ '_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-43\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"44\" id=\"subtab-AdminModulesSf\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/modules/manage\" class=\"link\"> Module manager
                                </a>
                              </li>

                                                                                                                                                                                              
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"474\" id=\"subtab-MsAdminThemeConfController\">
                                <a href=\"/admin-dev/index.php/modules/improve/modules/manage/action/configure/msthemeconfig\" class=\"link\"> Moderne Smid Thema Conf
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"693\" id=\"subtab-DpRedirect\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=DpRedirect\" class=\"link\"> Dynamic Product
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
' | raw }}{{ '                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"52\" id=\"subtab-AdminParentThemes\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/design/themes/\" class=\"link\">
                      <i class=\"material-icons mi-desktop_mac\">desktop_mac</i>
                      <span>
                      Design
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-52\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"138\" id=\"subtab-AdminThemesParent\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/design/themes/\" class=\"link\"> Thema en logo
                                </a>
                              </li>

                                                                                                                                        
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"55\" id=\"subtab-AdminParentMailTheme\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/design/mail_theme/\" class=\"link\"> Email thema
                                </a>
                              </li>

                                                                                  
        ' | raw }}{{ '                      
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"57\" id=\"subtab-AdminCmsContent\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/design/cms-pages/\" class=\"link\"> Pagina&#039;s
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"58\" id=\"subtab-AdminModulesPositions\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/design/modules/positions/\" class=\"link\"> Posities
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"59\" id=\"subtab-AdminImages\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminImages\" class=\"link\"> Afbeeldingsinstellingen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"125\" id=\"subtab-AdminLinkWidget\">
                                <a href=\"/admin-dev/index.php/modules/link-widget/list\" class=\"link\"> Link Widget
                                </a>
                              </li>

                                                                              </ul>
                            ' | raw }}{{ '            </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"60\" id=\"subtab-AdminParentShipping\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCarriers\" class=\"link\">
                      <i class=\"material-icons mi-local_shipping\">local_shipping</i>
                      <span>
                      Verzending
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-60\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"61\" id=\"subtab-AdminCarriers\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCarriers\" class=\"link\"> Vervoerders
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"62\" id=\"subtab-AdminShipping\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/shipping/preferences/\" class=\"link\"> Instellingen
                                </a>
                              </li>

                                                                          ' | raw }}{{ '    </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"63\" id=\"subtab-AdminParentPayment\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/payment/payment_methods\" class=\"link\">
                      <i class=\"material-icons mi-payment\">payment</i>
                      <span>
                      Betaling
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-63\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"64\" id=\"subtab-AdminPayment\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/payment/payment_methods\" class=\"link\"> Betaalmethoden
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"65\" id=\"subtab-AdminPaymentPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/payment/preferences\" class=\"link\"> Instellingen
                                </a>
                              </li>

                             ' | raw }}{{ '                                                 </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"66\" id=\"subtab-AdminInternational\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/international/localization/\" class=\"link\">
                      <i class=\"material-icons mi-language\">language</i>
                      <span>
                      Internationaal
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-66\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"67\" id=\"subtab-AdminParentLocalization\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/international/localization/\" class=\"link\"> Lokalisatie
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"72\" id=\"subtab-AdminParentCountries\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/international/zones/\" class=\"link\"> Locaties
                                </a>
   ' | raw }}{{ '                           </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"76\" id=\"subtab-AdminParentTaxes\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/international/taxes/\" class=\"link\"> BTW
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"79\" id=\"subtab-AdminTranslations\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/international/translations/settings\" class=\"link\"> Vertalingen
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"131\" id=\"subtab-AdminEmarketing\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminEmarketing\" class=\"link\">
                      <i class=\"material-icons mi-track_changes\">track_changes</i>
                      <span>
                      Advertising
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </' | raw }}{{ 'a>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"627\" id=\"subtab-AdminMollieModule_MTR\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminMollieModule\" class=\"link\">
                      <i class=\"material-icons mi-mollie\">mollie</i>
                      <span>
                      Mollie
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-627\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"628\" id=\"subtab-AdminMollieModule\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminMollieModule\" class=\"link\"> Settings
                                </a>
                              </li>

                                                                                                                                                                                              
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"633\" id=\"subtab-AdminMollieSubscriptionOrdersParent\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminMollieSubscriptionOrdersParent\" cl' | raw }}{{ 'ass=\"link\"> Subscriptions
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"635\" id=\"subtab-AdminMollieSubscriptionFAQParent\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminMollieSubscriptionFAQParent\" class=\"link\"> Subscription FAQ
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"730\" id=\"subtab-AdminMollieLogsParent\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminMollieLogsParent\" class=\"link\"> Logs
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                              
          
                      
                                          
                    
          
            <li class=\"category-title\" data-submenu=\"80\" id=\"tab-CONFIGURE\">
                <span class=\"title\">Configureer</span>
            </li>

                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"81\" id=\"subtab-ShopParameters\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/preferences/preferences\" class=\"link\">
                      <i class=\"material-icons mi-settings\">settings</i>
 ' | raw }}{{ '                     <span>
                      Winkelinstellingen
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-81\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"82\" id=\"subtab-AdminParentPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/preferences/preferences\" class=\"link\"> Algemeen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"85\" id=\"subtab-AdminParentOrderPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/order-preferences/\" class=\"link\"> Bestellingsinstellingen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"88\" id=\"subtab-AdminPPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/product-preferences/\" class=\"link\"> Producten
                                </a>
                  ' | raw }}{{ '            </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"89\" id=\"subtab-AdminParentCustomerPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/customer-preferences/\" class=\"link\"> Klantinstellingen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"93\" id=\"subtab-AdminParentStores\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/contacts/\" class=\"link\"> Contact
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"96\" id=\"subtab-AdminParentMeta\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/seo-urls/\" class=\"link\"> Verkeer en SEO
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"100\" id=\"subtab-AdminParentSearchConf\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminSearchConf\" class=\"link\"> Zoeken
                             ' | raw }}{{ '   </a>
                              </li>

                                                                                                                                    </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"103\" id=\"subtab-AdminAdvancedParameters\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/system-information/\" class=\"link\">
                      <i class=\"material-icons mi-settings_applications\">settings_applications</i>
                      <span>
                      Geavanceerde instellingen
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-103\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"104\" id=\"subtab-AdminInformation\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/system-information/\" class=\"link\"> Informatie
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"105\" id=\"subtab-AdminPerformance\">
                  ' | raw }}{{ '              <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/performance/\" class=\"link\"> Prestaties
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"106\" id=\"subtab-AdminAdminPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/administration/\" class=\"link\"> Administratie
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"107\" id=\"subtab-AdminEmails\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/emails/\" class=\"link\"> E-mail
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"108\" id=\"subtab-AdminImport\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/import/\" class=\"link\"> Importeren
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"109\" id=\"subtab-AdminParentEmployees\">
       ' | raw }}{{ '                         <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/employees/\" class=\"link\"> Medewerkers
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"113\" id=\"subtab-AdminParentRequestSql\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/sql-requests/\" class=\"link\"> Database
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"116\" id=\"subtab-AdminLogs\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/logs/\" class=\"link\"> Logboeken
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"117\" id=\"subtab-AdminWebservice\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/webservice-keys/\" class=\"link\"> Webservice
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"118\" id=\"subtab-AdminShopGroup\"' | raw }}{{ '>
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShopGroup\" class=\"link\"> Multistore
                                </a>
                              </li>

                                                                                                                                        
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"243\" id=\"subtab-AdminFeatureFlag\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/feature-flags/\" class=\"link\"> Experimental Feature
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"486\" id=\"subtab-AdminParentSecurity\">
                                <a href=\"/admin-dev/index.php/configure/advanced/security/\" class=\"link\"> Security
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"680\" id=\"subtab-AdminWebPConfiguration\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminWebPConfiguration\" class=\"link\"> WebP Converter
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                       ' | raw }}{{ '                               
                  
                  <li class=\"link-levelone\" data-submenu=\"231\" id=\"subtab-AdminSelfUpgrade\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminSelfUpgrade\" class=\"link\">
                      <i class=\"material-icons mi-upgrade\">upgrade</i>
                      <span>
                      1-Click Upgrade
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                              
          
                      
                    
                    
          
            <li class=\"link-levelone\" data-submenu=\"589\" id=\"tab-AdvancedVatManager\">
              <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdvancedVatManager\" class=\"link\" >
                <i class=\"material-icons\">business_center</i> <span>Geavanceerde btw-manager</span>
              </a>
            </li>

          
                      
                                          
                    
          
            <li class=\"category-title\" data-submenu=\"652\" id=\"tab-AdvancedVatManagerParent\">
                <span class=\"title\">Advanced VAT Manager</span>
            </li>

                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"653\" id=\"subtab-AdminCustomersVatManager\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCustomersVatManager\" class=\"link\">
                      <i class=\"material-icons mi-credit_card\">credit_card</i>
                      <span>
         ' | raw }}{{ '             Customer VAT Number Management
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"654\" id=\"subtab-AdminCustomersExemptionManager\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCustomersExemptionManager\" class=\"link\">
                      <i class=\"material-icons mi-group_add\">group_add</i>
                      <span>
                      Customer VAT Exemption Management
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"655\" id=\"subtab-AdminCustomersOrdersManager\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCustomersOrdersManager\" class=\"link\">
                      <i class=\"material-icons mi-shopping_cart\">shopping_cart</i>
                      <span>
                      Orders Management
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
            ' | raw }}{{ '                                                        keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"656\" id=\"subtab-AdminCheckVAT\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminCheckVAT\" class=\"link\">
                      <i class=\"material-icons mi-check_circle\">check_circle</i>
                      <span>
                      VAT Check Tool
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"657\" id=\"subtab-AdminAVMSettings\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminAVMSettings\" class=\"link\">
                      <i class=\"material-icons mi-tune\">tune</i>
                      <span>
                      Settings
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                              
         ' | raw }}{{ ' 
                  </ul>
  </div>
  
</nav>


<div class=\"header-toolbar d-print-none\">
        <div
        id=\"header-multishop\"
        class=\"header-multishop header-multishop-allshops header-multishop-dark\"
        data-all-shops=\"1\"                data-checkbox-notification=\"Om specifieke instellingen toe te passen op een winkel of een groep winkels, selecteert u de parameter die u wilt wijzigen, brengt u uw wijzigingen aan en slaat u op. \"
    >
      <div class=\"header-multishop-top-bar\">
        <div class=\"header-multishop-center js-header-multishop-open-modal\">
                      <svg width=\"81px\" height=\"30px\" viewBox=\"0 0 81 30\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">
  <defs>
    <path d=\"M6.548,0 L36.421,0 C38.378,0 40.056,1.309 40.528,3.208 L42.787,12.434 C43.324,14.588 42.83,16.805 41.453,18.536 C41.281,18.747 41.045,18.937 40.852,19.127 L40.852,30 L36.572,30 L36.572,21.047 C36.4,21.069 36.25,21.111 36.078,21.111 C34.206,21.111 32.507,20.352 31.259,19.106 C29.969,20.372 28.248,21.111 26.441,21.111 C24.506,21.111 22.786,20.352 21.516,19.148 C20.27,20.352 18.592,21.111 16.721,21.111 C14.764,21.111 13.043,20.372 11.753,19.106 C10.505,20.352 8.806,21.111 6.935,21.111 C6.763,21.111 6.612,21.069 6.441,21.047 L6.441,30 L2.139,30 L2.139,19.127 C1.945,18.916 1.709,18.747 1.537,18.515 C0.16,16.783 -0.312,14.588 0.204,12.434 L2.462,3.208 C2.914,1.33 4.613,0 6.548,0 Z M33.453,14.482 C33.604,15.854 34.744,16.888 36.056,16.888 C37.131,16.888 37.776,16.276 38.077,15.897 C38.636,15.2 38.831,14.314 38.615,13.426 L36.357,4.201 L32.207,4.223 L33.453,14.482 Z M23.646,14.124 C23.646,15.643 24.829,16.888 26.269,16.888 C27.151,16.888 27.84,16.572 28.312,16.024 C28.872,15.411 29.13,14.588 29.023,13.765 L27.862,4.223 L23.646,4.223 L23.646,14.124 Z M14.657,16.024 C15.172,16.572 15.839,16.888 16.57,16.888 C18.161,16.888 19.345,15.643 19.345,14.124 L19.345,4.223 L15.129,4.223 L13.947,13.765 C13.86,14.588 14.118,15.411 14' | raw }}{{ '.657,16.024 Z M4.935,15.897 C5.215,16.276 5.881,16.888 6.935,16.888 C8.247,16.888 9.366,15.854 9.537,14.482 L10.786,4.223 L6.548,4.223 L4.376,13.426 C4.16,14.314 4.354,15.221 4.935,15.897 Z\" id=\"path-1\"></path>
  </defs>
  <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" opacity=\"0.6\">
    <g id=\"Group-9\">
      <g id=\"Group-3\" transform=\"translate(19.000000, 0.000000)\">
        <mask id=\"mask-2\" fill=\"black\">
          <use xlink:href=\"#path-1\"></use>
        </mask>
        <use id=\"Clip-2\" fill=\"black\" xlink:href=\"#path-1\"></use>
      </g>
      <g id=\"Group-8\" transform=\"translate(0.000000, 4.000000)\" fill=\"black\">
        <path d=\"M4.2258,11.7283 L6.0998,3.8023 L9.7558,3.8023 L8.6798,12.6373 C8.5318,13.8193 7.5658,14.7093 6.4338,14.7093 C5.5248,14.7093 4.9498,14.1833 4.7078,13.8553 C4.2068,13.2733 4.0398,12.4923 4.2258,11.7283 M2.2958,16.6373 L2.2958,25.9113 L6.0068,25.9113 L6.0068,18.2913 C6.1558,18.3093 6.2858,18.3453 6.4338,18.3453 C8.0488,18.3453 9.5138,17.6913 10.5898,16.6183 C11.7048,17.7093 13.1888,18.3453 14.8768,18.3453 C16.2248,18.3453 17.4538,17.8843 18.4508,17.1303 C18.0988,16.6513 17.1618,15.7283 16.5088,13.9473 C16.0798,14.4133 15.4638,14.7093 14.7468,14.7093 C14.1168,14.7093 13.5408,14.4373 13.0958,13.9643 C12.6318,13.4373 12.4098,12.7283 12.4838,12.0193 L13.5038,3.8023 L17.1408,3.8023 L17.1408,5.0093 C17.4468,3.5693 17.8188,1.9613 18.2638,0.1663 L6.0998,0.1663 C4.4298,0.1663 2.9638,1.3113 2.5748,2.9303 L0.6258,10.8743 C0.1808,12.7283 0.5888,14.6193 1.7768,16.1093 C1.9248,16.3103 2.1288,16.4553 2.2958,16.6373\" id=\"Fill-4\"></path>
        <path d=\"M75.1653,3.8025 L77.0393,11.7285 C77.2253,12.4915 77.0583,13.2735 76.5573,13.8555 C76.3153,14.1825 75.7403,14.7095 74.8313,14.7095 C73.6993,14.7095 72.7343,13.8195 72.5863,12.6375 L71.5103,3.8025 L75.1653,3.8025 Z M66.5193,14.7095 C65.8023,14.7095 65.1863,14.4135 64.7563,13.9475 C64.1033,15.7285 63.1663,16.6515 62.8143,17.1305 C63.8113,17.8845 65.0403,18.3455 66.3893,18.3455' | raw }}{{ ' C68.0773,18.3455 69.5613,17.7095 70.6753,16.6185 C71.7513,17.6915 73.2173,18.3455 74.8313,18.3455 C74.9793,18.3455 75.1093,18.3095 75.2583,18.2915 L75.2583,26.0025 L78.9693,26.0025 L78.9693,16.6365 C79.1363,16.4545 79.3403,16.3095 79.4883,16.1095 C80.6763,14.6185 81.0843,12.7285 80.6393,10.8745 L78.6903,2.9295 C78.3013,1.3115 76.8353,0.1665 75.1653,0.1665 L63.0013,0.1665 C63.4463,1.9615 63.8183,3.5695 64.1253,5.0095 L64.1253,3.8025 L67.7623,3.8025 L68.7823,12.0195 C68.8563,12.7285 68.6343,13.4375 68.1703,13.9645 C67.7253,14.4375 67.1493,14.7095 66.5193,14.7095 Z\" id=\"Fill-6\"></path>
      </g>
    </g>
  </g>
</svg>
          
          <h2 class=\"header-multishop-title\">
            Alle winkels
          </h2>

          <button class=\"header-multishop-button\">
            <i class=\"material-icons\">expand_more</i>
          </button>
        </div>
      </div>

      
      <div id=\"multishop-modal\" class=\"multishop-modal multishop-modal-hidden js-multishop-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"multishop-modal\" aria-hidden=\"true\">
        <div class=\"multishop-modal-dialog js-multishop-modal-dialog\" role=\"document\">
          <div class=\"multishop-modal-body\">
                                    <div class=\"multishop-modal-search-container\">
              <i class=\"material-icons\">search</i>
              <input type=\"text\" class=\"form-control multishop-modal-search js-multishop-modal-search\" placeholder=\"Zoek winkelnaam\" data-no-results=\"Geen resultaten gevonden voor\" data-searching=\"Zoeken naar\">
            </div>
                        
            <ul class=\"multishop-modal-group-list js-multishop-scrollbar\">
                                <li class=\"multishop-modal-all multishop-modal-item\">
                                      <i class=\"material-icons\">check</i>
                                    <a class=\"multishop-modal-all-name\" href=\"/admin-dev/index.php/sell/orders/?setShopContext=\">
                    <span>Alle winkels</span>
   ' | raw }}{{ '               </a>
                </li>
                
                              <li class=\"multishop-modal-group-item multishop-modal-item first-group-item\">
                                    <span class=\"multishop-modal-color-container\">
                    <i class=\"material-icons\">check</i>
                    <a class=\"multishop-modal-color\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShopGroup&amp;id_shop_group=1&amp;updateshop_group=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                  </span>
                  <a class=\"multishop-modal-group-name\" href=\"/admin-dev/index.php/sell/orders/?setShopContext=g-1\">Groep Default</a>
                                  </li>

                                  <li class=\"multishop-modal-shop-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container\">
                        <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #ff0d2e;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=1&amp;updateshop=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/sell/orders/?setShopContext=s-1\">ngrok.ijzershop-test.nl</a>                    </div>
                                          <a class=\"multishop-modal-shop-view\" href=\"https://ngrok.ijzershop-test.nl/\" target=\"_blank\" rel=\"noreferrer\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
                                                          </li>
                                  <li class=\"multishop-modal-shop' | raw }}{{ '-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container\">
                        <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #ce55ff;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=2&amp;updateshop=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/sell/orders/?setShopContext=s-2\">constructie.local</a>                    </div>
                                          <a class=\"multishop-modal-shop-view\" href=\"https://constructie.local/\" target=\"_blank\" rel=\"noreferrer\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
                                                          </li>
                                  <li class=\"multishop-modal-shop-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container\">
                        <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #d8ff1d;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=3&amp;updateshop=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/sell/orders/?setShopContext=s-3\">cortenwinkel.local</a>                    </div>
                                          <a class=\"multishop-modal-shop-view\" href=\"https://cortenwinkel.local/\" target=\"_bla' | raw }}{{ 'nk\" rel=\"noreferrer\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
                                                          </li>
                                  <li class=\"multishop-modal-shop-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container\">
                        <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #00ff00;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=4&amp;updateshop=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/sell/orders/?setShopContext=s-4\">cortenwinkel</a>                    </div>
                                          <a class=\"multishop-modal-shop-view\" href=\"https://cortenwinkel.local/\" target=\"_blank\" rel=\"noreferrer\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
                                                          </li>
                                          </ul>
          </div>
        </div>
      </div>
    </div>

    <script src=\"/admin-dev/themes/new-theme/public/multistore_header.bundle.js?8.2.0\"></script>
  
  <div class=\"container-fluid\">

    
      <nav aria-label=\"Breadcrumb\">
        <ol class=\"breadcrumb\">
                      <li class=\"breadcrumb-item\">Bestellingen</li>
          
                  </ol>
      </nav>
    

    <div class=\"title-row\">
      
  
      <h1 class=\"title\">
      Bestellingen    </h1>
  

      
        <div class=\"toolbar-icons\">
          <div class=\"wrapper\">
            
                                                          <a
                  class=\"btn btn-primary disabled auto-pointer-events po' | raw }}{{ 'inter\"                  id=\"page-header-desc-configuration-add\"
                  href=\"#\"                  title=\"U kunt deze functie alleen gebruiken in enkele winkel context. Switch context om het te gebruiken.\"                  data-toggle=\"pstooltip\"
                  data-placement=\"bottom\"                                  >
                  <i class=\"material-icons\">add_circle_outline</i>                  Voeg een nieuwe bestelling toe
                </a>
                                      
            
                              <a class=\"btn btn-outline-secondary btn-help btn-sidebar\" href=\"#\"
                   title=\"Help\"
                   data-toggle=\"sidebar\"
                   data-target=\"#right-sidebar\"
                   data-url=\"/admin-dev/index.php/common/sidebar/https%253A%252F%252Fhelp.prestashop-project.org%252Fnl%252Fdoc%252FAdminOrders%253Fversion%253D8.2.0%2526country%253Dnl/Help\"
                   id=\"product_form_open_help\"
                >
                  Help
                </a>
                                    </div>
        </div>

      
    </div>
  </div>

  
  
  <div class=\"btn-floating\">
    <button class=\"btn btn-primary collapsed\" data-toggle=\"collapse\" data-target=\".btn-floating-container\" aria-expanded=\"false\">
      <i class=\"material-icons\">add</i>
    </button>
    <div class=\"btn-floating-container collapse\">
      <div class=\"btn-floating-menu\">
        
                              <a
              class=\"btn btn-floating-item   pointer\"              id=\"page-header-desc-floating-configuration-add\"
              href=\"#\"              title=\"U kunt deze functie alleen gebruiken in enkele winkel context. Switch context om het te gebruiken.\"              data-toggle=\"pstooltip\"
              data-placement=\"bottom\"            >
              Voeg een nieuwe bestelling toe
              <i class=\"material-icons\">add_circle_outline</i>            </a>
                  
                              <a cl' | raw }}{{ 'ass=\"btn btn-floating-item btn-help btn-sidebar\" href=\"#\"
               title=\"Help\"
               data-toggle=\"sidebar\"
               data-target=\"#right-sidebar\"
               data-url=\"/admin-dev/index.php/common/sidebar/https%253A%252F%252Fhelp.prestashop-project.org%252Fnl%252Fdoc%252FAdminOrders%253Fversion%253D8.2.0%2526country%253Dnl/Help\"
            >
              Help
            </a>
                        </div>
    </div>
  </div>
  
</div>

<div id=\"main-div\">
          
      <div class=\"content-div  \">

        

                                                        
        <div id=\"ajax_confirmation\" class=\"alert alert-success\" style=\"display: none;\"></div>
<div id=\"content-message-box\"></div>


  ' | raw }}{% block content_header %}{% endblock %}{% block content %}{% endblock %}{% block content_footer %}{% endblock %}{% block sidebar_right %}{% endblock %}{{ '

        

      </div>
    </div>

  <div id=\"non-responsive\" class=\"js-non-responsive\">
  <h1>Oh nee!</h1>
  <p class=\"mt-3\">
    De mobiele versie van deze pagina is nog niet beschikbaar.
  </p>
  <p class=\"mt-2\">
    Gebruik een desktop om deze pagina te openen tot deze voor mobiel is aangepast.
  </p>
  <p class=\"mt-2\">
    Dank u.
  </p>
  <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminDashboard\" class=\"btn btn-primary py-1 mt-3\">
    <i class=\"material-icons rtl-flip\">arrow_back</i>
    Terug
  </a>
</div>
  <div class=\"mobile-layer\"></div>

      <div id=\"footer\" class=\"bootstrap\">
    
</div>
  

      <div class=\"bootstrap\">
      
    </div>
  
' | raw }}{% block javascripts %}{% endblock %}{% block extra_javascripts %}{% endblock %}{% block translate_javascripts %}{% endblock %}</body>{{ '
</html>' | raw }}", "__string_template__b0f1eb87735c2e6265d11e8edbcc1387", "");
    }
}

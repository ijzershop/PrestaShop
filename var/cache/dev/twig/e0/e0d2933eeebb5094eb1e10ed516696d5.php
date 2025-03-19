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

/* __string_template__ab79a7f5c5ec6d7475c88c67514bc005 */
class __TwigTemplate_29f0bfa042c0719fe64748fd90906c2e extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "__string_template__ab79a7f5c5ec6d7475c88c67514bc005"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "__string_template__ab79a7f5c5ec6d7475c88c67514bc005"));

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

<title>Order instellingen • Ijzershop</title>

  <script type=\"text/javascript\">
    var help_class_name = 'AdminOrderPreferences';
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
    var token = '091f9e274b20af17fc89ee603991f273';
    var currentIndex = 'index.php?controller=AdminOrderPreferences';
    var employee_token = 'f2c1c327dfcaf3e264611f2b0c958559';
    var choose_language_translate = 'Selecteer een taal:';
    var default_language = '1';
    var admin_modules_link = 'https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/modules/manage';
    var admin_notification_get_link = 'https://ngrok.ijzershop-test.nl/admin-dev/index.php/common/notifications';
    var admin_notification_push_link = adminNotificationPushLink = 'https://ngrok.ijzershop-test.nl/admin-dev/index.php/common/notifications/ack';
    var tab_modules_list = '';
    var update_suc";
        // line 43
        echo "cess_msg = 'Bijwerken geslaagd';
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
      <link href=\"/modules/dynamicproduct/views/css/admin.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/mollie/views/css/admin/menu.css\" rel=\"stylesheet\" type=\"text/css\"/>
  
  <script type=\"text/javascript\">
var baseAdminDir = \"\\/admin-dev\\/\";
var baseDir = \"\\/\";
var changeFormLanguageUrl = \"https:\\/\\/ngrok.ijzershop-test.nl\\/admin-dev\\/index.php\\/configure\\/advanced\\/employees\\/change-form-language\";
var currency = {\"iso_code\":\"EUR\",\"sign\":\"\\u00e2\\u201a\\u00ac\",\"name\":\"Euro\",\"format\":null};
var currency_specifications = {\"symbol\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\u00d7\",\"\\u2030\",\"\\u221e\",\"NaN\"],\"currencyCode\":\"EUR\",\"currencySymbol\":\"\\u00e2\\u201a\\u00ac\",\"numberSymbols\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\u00d7\",\"\\u2030\",\"\\u221e\",\"NaN\"],\"positivePattern\":\"\\u00a4\\u00a0#,##0.00\",\"negativePattern\":\"\\u00a4\\u00a0-#,##0.00\",\"maxFractionDigits\":2,\"minFractionDigits\":2,\"groupingUsed\":true,\"primaryGroupSize\":3,\"secondaryGroupSize\":3};
var dp_id_module = \"377\";
var dp_module_link = \"https:\\/\\/ngrok.ijzershop-test.nl\\/admin-dev\\/index.php?controller=AdminModules&configure=dynamicproduct\";
var dp_public_path = \"https:\\/\\/ngrok.ijzershop-test.nl\\/modules\\/dynamicproduct\\/lib\\/media\\/dist\\/\";
var dp_translations = {\"3357\":\"if\",\"3555\":\"of\",\"65665\":\"Toevoegen\",\"65921\":\"Allemaal\",\"77124\":\"Max\",\"77362\":\"Min\",\"78208\":";
        // line 71
        echo "\"Nieuw\",\"2106261\":\"Copy\",\"2228070\":\"Grid\",\"2373894\":\"Laden\",\"2420395\":\"Naam\",\"2569629\":\"Opslaan\",\"2587372\":\"Step\",\"2603341\":\"Text\",\"2622298\":\"Type\",\"2641316\":\"Unit\",\"20170714\":\"Field groups\",\"42216636\":\"Show less\",\"42255992\":\"Show more\",\"42572887\":\"Maximum files\",\"46603408\":\"Greater than or equal\",\"60673783\":\"Calculation Order\",\"65193517\":\"Clear\",\"65203672\":\"Sluiten\",\"67634599\":\"Any change will have an effect on the configuration of _nb_ products.\",\"67875034\":\"Field\",\"69070285\":\"Grids\",\"70760763\":\"Image\",\"73174740\":\"Label\",\"78727453\":\"Range\",\"80208647\":\"Steps\",\"81768821\":\"Will show an error when no option is selected\",\"82420049\":\"Value\",\"94764465\":\"Checked by default\",\"96215082\":\"Export configuration to a file\",\"96634189\":\"empty\",\"112524536\":\"Any change will have an effect on the linked configurations.\",\"146608883\":\"Clear existing elements before copying\",\"168044563\":\"Prefix with a space if needed\",\"177208536\":\"Not recommended as it can slow down the cart page\",\"188877356\":\"Select a product\",\"190258903\":\"Important: The name must be a valid css class name\",\"209981527\":\"Control field\",\"213777395\":\"Use _Up__ \\/ _Down__ arrows and _Tab__ \\/ _Shift__ _Tab__ to navigate between fields\",\"217062059\":\"Delete field formula\",\"225214028\":\"Import configuration from a file\",\"255574909\":\"Add a new condition\",\"309632339\":\"Add a new option\",\"335921277\":\"Select All\",\"337710188\":\"Delete all items\",\"341682506\":\"Example\",\"342988778\":\"Collapsible\",\"366478171\":\"Disabled days\",\"391613546\":\"This will **ALSO DELETE the original item**. Are you sure that you want to continue?\",\"403974246\":\"Display secondary value as option description\",\"414080266\":\"Max date\",\"415178366\":\"Opties\",\"448768363\":\"Refresh databases list\",\"472144411\":\"Price unit\",\"487485563\":\"Delete grid\",\"499705571\":\"No steps configured yet!\",\"501633139\":\"Display the calculated price in the category page\",\"502849757\":\"Actions\",\"512870211\":\"Remove field from favorites\",\"524754236\":\"Add a row\",\"539312109\":\"Formulas\",\"551803430\":\"Pres";
        echo "taShop fields\",\"556571664\":\"Available fields\",\"593819435\":\"Available groups\",\"616048556\":\"Save and close\",\"618203353\":\"Display dropzone\",\"635062501\":\"Interval\",\"641384524\":\"Load formula\",\"642864804\":\"If you choose to hide all fields for one or more combinations, make sure to disable the option &quot;Required customization&quot; above\",\"648178368\":\"Enable if the price depends on the cart quantity\",\"674841376\":\"This product has no field groups\",\"679767347\":\"Display secondary value as option price\",\"683837713\":\"Open in a new tab\",\"686245726\":\"Add interval field\",\"694222335\":\"Interval field\",\"707322317\":\"Instead of the currency symbol\",\"714420990\":\"Values (separate by comma, use dot for decimal values)\",\"717577136\":\"Edit summary\",\"723571741\":\"Click to edit formula\",\"733185705\":\"Calculation\",\"743137649\":\"Are you sure you want to delete the selected fields?\",\"747570142\":\"Weight formula\",\"751248134\":\"Edit description\",\"818934447\":\"Click to toggle the option visibility\",\"856190703\":\"The formula is valid\",\"863835572\":\"Import\\/Export configuration\",\"877234552\":\"This element was not found\",\"882649860\":\"Recalculate price in cart after each page view\",\"894228158\":\"Show in cart summary\",\"896194968\":\"Advanced configuration\",\"910258683\":\"Date after\\/before dd days\",\"936109071\":\"This name is a reserved Excel function name, please use another name\",\"941456859\":\"add a new field group\",\"942696557\":\"Display tax excluded prices\",\"955701460\":\"Delete interval field\",\"956903001\":\"Delete interval group\",\"957328081\":\"Expand condition (Shift + Click to expand all)\",\"967323594\":\"Unlink configurations\",\"987228486\":\"Formula\",\"1015824103\":\"The formula contains unknown fields\",\"1018815151\":\"Combination\",\"1023084919\":\"Select a field\",\"1028005612\":\"Enable the module for this product\",\"1035798281\":\"Unknown group\",\"1062605528\":\"Conditions\",\"1074180180\":\"No field groups configured yet!\",\"1092329901\":\"Insert as one step\",\"1092758090\":\"Allow multiselection\",\"1119619936\":\"Product Page\",\"1128817579\":\"Copy c";
        echo "onfiguration\",\"1139462901\":\"Toggle all\",\"1142656251\":\"Condition\",\"1152371054\":\"Configure options visibility\",\"1201193478\":\"Display the &quot;Starting from&quot; label in the category page\",\"1224131978\":\"No custom execution order is configured, the default order will be used\",\"1265447825\":\"Minimize condition (Shift + Click to minimize all)\",\"1292109984\":\"Script name\",\"1299208205\":\"Delete this row\",\"1311260723\":\"Formula copied to clipboard\",\"1319091200\":\"Field Formula\",\"1327464299\":\"Recalculate price in cart when quantity changes\",\"1346468776\":\"Preview\",\"1365932015\":\"Steps Activation\",\"1378058502\":\"Delete condition\",\"1382863923\":\"Cost formula\",\"1385751734\":\"You can import\\/export a file containing the product configuration\",\"1473269982\":\"Groups Visibility\",\"1479721030\":\"Applies only if the product has a price of 0\",\"1499275331\":\"Settings\",\"1503955207\":\"The current formula is empty\",\"1506518963\":\"Insert step\",\"1507272505\":\"Demo mode enabled, only these types will be accepted\",\"1518498724\":\"Combinations\",\"1525066715\":\"Copy formula\",\"1529599611\":\"Add field column\",\"1539356550\":\"Cancel selection\",\"1543324436\":\"Row field\",\"1547472170\":\"Displayed price\",\"1550611840\":\"Use a custom calculation order\",\"1589928967\":\"The new Calculation tab displays a unified interface to add and organize calculation items\",\"1606304409\":\"Show or Hide the fields based on the selected combination\",\"1611563307\":\"Interval formula\",\"1616172285\":\"This group has already been added\",\"1620484928\":\"Delete this item\",\"1620782841\":\"Delete this step\",\"1642806840\":\"Databases\",\"1652081830\":\"Click to toggle the field visibility\",\"1721653182\":\"Deselect All\",\"1741737838\":\"Click to insert an option\",\"1772226151\":\"If empty, then the field name will be used\",\"1781676314\":\"Display weight to customers\",\"1782805700\":\"Quantity (PrestaShop Quantity)\",\"1799432497\":\"CSS class name (optional)\",\"1816510966\":\"Display label\",\"1821258733\":\"Clear the current configuration\",\"1843498208\":\"Allow saving customization to profile\",\"18";
        echo "80571668\":\"Minimum width\",\"1887918305\":\"unlimited\",\"1890611904\":\"Custom suffix\",\"1907478750\":\"Linking will affect current and future products of selected category\",\"1926535580\":\"Remove this column\",\"1939070905\":\"Will show an error when set to 0\",\"1939937161\":\"Delete selected fields\",\"1962674479\":\"Use Ctrl + Enter to save formula\",\"1970866633\":\"Unlink configuration\",\"1990316837\":\"Are you sure to toggle all options?\",\"1991049567\":\"Hide in summary when unchecked\",\"2001303836\":\"Loading\",\"2005080793\":\"Fields Visibility\",\"2008912283\":\"Add condition group\",\"2011110042\":\"Annuleren\",\"2030152089\":\"Minimum height\",\"2050679770\":\"Replace field names with their respective values\",\"2076495866\":\"Insert all items\",\"2089680852\":\"Exporteren\",\"2104126169\":\"Fields\",\"2124186744\":\"Click to toggle the step visibility\",\"2141373940\":\"Groups\",\"-2057845645\":\"Field Formulas\",\"-1787898834\":\"Intervals\",\"-321013333\":\"Product original price\",\"-1173076394\":\"Product original weight\",\"-91109833\":\"The quantity selected by the customer\",\"-343092435\":\"You can configure the visibility of each field based on the selected combination. A hidden field will have a null value in the formula\",\"-360169678\":\"Visibility\",\"-984860935\":\"Proportions\",\"-1395957536\":\"Require all steps to be completed\",\"-258501236\":\"This step has already been added\",\"-2047922448\":\"Available steps\",\"-936937268\":\"Manage steps\",\"-1544869189\":\"Refresh\",\"-986386678\":\"add a new step\",\"-1020392531\":\"Start by inserting a step from the list above\",\"-1213154046\":\"Unknown step\",\"-1072973150\":\"Drag to reorder\",\"-1003134522\":\"There are no fields yet, add a new field in the fields tab.\",\"-1920372430\":\"Required customization\",\"-1640250765\":\"Hide quantity input\",\"-911095655\":\"Multiply price &amp; weight by quantity\",\"-319880804\":\"If activated, the displayed price &amp; weight on the product page will be multiplied by the quantity\",\"-1536078307\":\"Split summary by groups\",\"-567220177\":\"Per kilo, per litre\",\"-1105717282\":\"You can configure a displayed pric";
        echo "e if your product has a price of 0\",\"-350941306\":\"You may need to clear the cache after changing this setting\",\"-260281722\":\"Display customization cost in customization summary\",\"-72782714\":\"Copy configuration to clipboard\",\"-2100928571\":\"Import\",\"-839043195\":\"Import configuration from clipboard\",\"-266050175\":\"Export image links instead of encoding the images\",\"-970294887\":\"Results in a smaller file. Only enable if the images can be accessed from your target shop.\",\"-512299320\":\"Please select the elements you want to copy from the source product.\",\"-1440091513\":\"Equations\",\"-1295811629\":\"Combination Values\",\"-1569442514\":\"Combinations Visibility\",\"-1780637860\":\"Load configuration\",\"-1680464031\":\"Select a category\",\"-755060688\":\"Will use the same configuration in multiple products instead of copying it\",\"-969155480\":\"Link instead of copying\",\"-743709137\":\"Will not preserve the original configurations of the linked products\",\"-198824349\":\"Clear the configurations of linked products\",\"-77133620\":\"You can copy or link this configuration to all products of the selected category\",\"-97880005\":\"Will use the same configuration instead of copying it\",\"-861552729\":\"Will not preserve the current configuration\",\"-814503541\":\"You can copy the selected product configuration to the current product\",\"-376014216\":\"Add a new proportion\",\"-1266890280\":\"Add an interval group\",\"-1739945662\":\"Values\",\"-167002208\":\"Interval condition\",\"-1983196248\":\"Less than\",\"-530681616\":\"+Infinity (no upper limit)\",\"-813310028\":\"Remove this condition group\",\"-1754233898\":\"Allows the customer to expand\\/collapse the group by clicking on the group label\",\"-1203478535\":\"Start collapsed\",\"-557346165\":\"Select the field that you want to add\",\"-1442032302\":\"Pick a field...\",\"-997806686\":\"This feature will duplicate the group based on the value of the selected field\",\"-1306471438\":\"Delete this group\",\"-626105070\":\"Insert field group\",\"-2074469771\":\"Manage field groups\",\"-912813020\":\"Add a grid\",\"-177830133\":\"Im";
        echo "port CSV\",\"-1963285437\":\"Delete this column\",\"-1849538101\":\"Target field\",\"-1759411248\":\"Column field\",\"-1157161804\":\"Add a column\",\"-754551441\":\"Price formula\",\"-1451894031\":\"Quantity formula\",\"-874003249\":\"Some field names are duplicated. You can either rename them or delete them.\",\"-1522567076\":\"Add a new field\",\"-597373332\":\"Do you want to update the field name in all the product formulas?\",\"-2043405119\":\"Displayed\",\"-2133620278\":\"Hidden\",\"-871138304\":\"Load a field from favorites\",\"-907353161\":\"Load a field from common fields\",\"-400560676\":\"Insert a new field here\",\"-827747024\":\"Click to select fields\",\"-1162526551\":\"Field settings\",\"-192987258\":\"Summary\",\"-2066126138\":\"Delete image\",\"-1667496710\":\"Click to upload an image\",\"-2071596850\":\"Delete color\",\"-403094350\":\"Click to pick a color\",\"-56677412\":\"Omschrijving\",\"-455739515\":\"Secondary Value\",\"-1085510111\":\"Default\",\"-328495169\":\"Required\",\"-195866273\":\"Display value as option price\",\"-961591827\":\"Image height (px)\",\"-2110296218\":\"Display info in a popup\",\"-930467021\":\"Import images\",\"-812471947\":\"Initial value\",\"-2028851885\":\"Placeholder\",\"-124100328\":\"Min characters\",\"-781016378\":\"Max characters\",\"-563123098\":\"Hide in summary when empty or equal to zero\",\"-1281023549\":\"Display PrestaShop style buttons\",\"-1732758869\":\"Maximum size (MB)\",\"-786546228\":\"Allowed Extensions\",\"-1369255836\":\"Thumbnail size (px)\",\"-303839446\":\"Initial date\",\"-2027417515\":\"Current day\",\"-1362116388\":\"Min date\",\"-1052633864\":\"Comma separated.\",\"-901436182\":\"Sun: 1, Mon: 2, Tues: 3, Wed: 4, Thurs: 5, Fri: 6, Sat: 7\",\"-981640203\":\"The JSON code is not valid, please check the browser console.\",\"-1156506214\":\"JSON Config\",\"-829601945\":\"Initial color\",\"-1339063232\":\"View image\",\"-1754727903\":\"Upload\",\"-929869225\":\"Add field to favorites\",\"-772024966\":\"Remove field from common fields\",\"-43752491\":\"Set as common field\",\"-1470017715\":\"Duplicate this field\",\"-1208718378\":\"This will not delete the original field\",\"-1307672979\":\"Delete this fiel";
        echo "d\",\"-2016607813\":\"Filter field formulas\",\"-1479771459\":\"Create a new field formula\",\"-505434665\":\"Click to edit\",\"-345562080\":\"Field formula\",\"-1561849983\":\"This calculation order is now replaced by the Calculation tab\",\"-198258289\":\"Add an execution item\",\"-1450803135\":\"deletes all execution items\",\"-1327547091\":\"Reset to default\",\"-1069635520\":\"Filter conditions\",\"-1840858600\":\"Create a new condition\",\"-27641343\":\"Click to toggle the group visibility\",\"-184663564\":\"Options visibility\",\"-1853217873\":\"Show the advanced settings\",\"-1733472447\":\"Condition formula\",\"-141573914\":\"Filter condition fields\",\"-1364207966\":\"Are you sure that you want to delete all items?\",\"-88887989\":\"Click to open the item\",\"-213492928\":\"Click to open the item tab\",\"-1997101839\":\"Hold shift to also delete the original item\",\"-1437454083\":\"Are you sure that you want to add all the items?\",\"-2068694494\":\"Insert selected items\",\"-1504585939\":\"No items were found, start by adding a new item below\",\"-1095166702\":\"Pick a custom color\",\"-2029223687\":\"Edit product\",\"-885795230\":\"Module configuration\",\"-865760232\":\"This configuration is linked to the product\",\"-2090976550\":\"Copy linked configuration\",\"-1627988830\":\"View original configuration\",\"-781361040\":\"This configuration is linked to _nb_ products\",\"-209324991\":\"Filter fields\",\"-859165076\":\"You can use multiple filters separated by spaces\",\"-1888060882\":\"Check formula\",\"-2478677\":\"Add formula to favorites\",\"-1433567116\":\"Are you sure you want to delete this item\",\"-135023574\":\"Could not copy formula to clipboard\",\"-1882967692\":\"Remove formula from presets\",\"-429764437\":\"No preset formulas. Click the star icon to add one.\",\"-1799625922\":\"Please enter a field name first\",\"-2132954502\":\"Create a new dynamic variable field\",\"-1783025135\":\"Field name\",\"-226074697\":\"Save new field\",\"-229417419\":\"Databases refreshed successfully\",\"-377760440\":\"Product attributes\",\"-590915474\":\"Product features\",\"-274987431\":\"Long press to use the secondary value\",\"-42";
        echo "6186843\":\"Secondary value\"};
var number_specifications = {\"symbol\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\u00d7\",\"\\u2030\",\"\\u221e\",\"NaN\"],\"numberSymbols\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\u00d7\",\"\\u2030\",\"\\u221e\",\"NaN\"],\"positivePattern\":\"#,##0.###\",\"negativePattern\":\"-#,##0.###\",\"maxFractionDigits\":3,\"minFractionDigits\":0,\"groupingUsed\":true,\"primaryGroupSize\":3,\"secondaryGroupSize\":3};
var prestashop = {\"debug\":true};
var ps_module_dev = false;
var show_new_customers = \"1\";
var show_new_messages = \"1\";
var show_new_orders = \"1\";
</script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/main.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/multistore_dropdown.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/js/jquery/plugins/jquery.chosen.js\"></script>
<script type=\"text/javascript\" src=\"/js/jquery/plugins/fancybox/jquery.fancybox.js\"></script>
<script type=\"text/javascript\" src=\"/js/admin.js?v=8.2.0\"></script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/cldr.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/js/tools.js?v=8.2.0\"></script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/create_product.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/modules/ps_emailalerts/js/admin/ps_emailalerts.js\"></script>
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


";
        // line 106
        $this->displayBlock('stylesheets', $context, $blocks);
        $this->displayBlock('extra_stylesheets', $context, $blocks);
        echo "</head>";
        echo "

<body
  class=\"lang-nl adminorderpreferences multishop-enabled developer-mode\"
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
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/products/new?token=75aac5352e895b8456cd6";
        // line 140
        echo "fcb06269e79\"
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
        data-rand=\"36\"
        data-icon=\"icon-AdminParentOrderPreferences\"
        data-method=\"add\"
        data-url=\"index.php";
        // line 174
        echo "/configure/shop/order-preferences\"
        data-post-link=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminQuickAccesses\"
        data-prompt-text=\"Geef een naam aan deze shortcut:\"
        data-link=\"Bestellingsinstellingen - Lijst\"
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
        <a class=\"dropdown-item\" data-item=\"Catalogus\" href=\"#\" data-value=\"1\" data-placeholder=\"Product naam, referentie, etc.\" data-icon=\"";
        // line 207
        echo "icon-book\"><i class=\"material-icons\">store_mall_directory</i> Catalogus</a>
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
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=ordersexport&amp;token";
        // line 233
        echo "=1adaa4d5033b9e6ed774af0f892437e1\"
             data-item=\"export orders\"
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
      <a class=\"dropdown-item";
        // line 264
        echo " quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminStats&amp;module=statsforecast&amp;token=e74d58a885c40df26dc72f8ede2f24f9\"
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
      data-rand=\"70\"
      data-icon=\"icon-AdminParentOrderPreferences\"
      data-method=\"add\"
      data-url=\"index.php/configure/shop/order-preferences\"
      data-post-link=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminQuickAccesses\"
      data-prompt-text=\"Geef een naam aan deze shortcut:\"
      data-link=\"Bestellingsinstellingen - Lijst\"
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
             href=";
        // line 304
        echo "\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/performance/\"
          >
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
  <div class=\"d";
        // line 346
        echo "ropdown-menu dropdown-menu-right js-notifs_dropdown\">
    <div class=\"notifications\">
      <ul class=\"nav nav-tabs\" role=\"tablist\">
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
                                    <div class=\"tab-pane  empty\" id=\"customers-notifications\" role=\"tabpanel\">";
        // line 396
        echo "
            <p class=\"no-notification\">
              Geen nieuwe klanten :(<br>
              Bent u actief op social media?
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
        <span class=\"employee-avatar\"><img class=\"avatar rounded-circle\" src=\"https://ngrok.ijzershop-test.nl/img/pr/default.jpg\" ";
        // line 447
        echo "alt=\"Moderne\" /></span>
        <span class=\"employee_profile\">Welkom terug Moderne</span>
      </div>

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
              <a href=\"https://ngrok.ijzershop-test.";
        // line 493
        echo "nl/admin-dev/index.php?controller=AdminDashboard\" class=\"link\" >
                <i class=\"material-icons\">trending_up</i> <span>Dashboard</span>
              </a>
            </li>

          
                      
                                          
                    
          
            <li class=\"category-title\" data-submenu=\"2\" id=\"tab-SELL\">
                <span class=\"title\">Verkopen</span>
            </li>

                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"3\" id=\"subtab-AdminParentOrders\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/orders/\" class=\"link\">
                      <i class=\"material-icons mi-shopping_basket\">shopping_basket</i>
                      <span>
                      Bestellingen
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-3\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"4\" id=\"subtab-AdminOrders\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/orders/\" class=\"link\"> Bestellingen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                         ";
        // line 533
        echo "     <li class=\"link-leveltwo\" data-submenu=\"5\" id=\"subtab-AdminInvoices\">
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
        // line 564
        echo " 
                              <li class=\"link-leveltwo\" data-submenu=\"475\" id=\"subtab-AdminOfferController\">
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
        // line 597
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
        // line 628
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
        // line 661
        echo "        Klanten
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
                                      ";
        // line 693
        echo "  </li>
                                              
                  
                                                      
                  
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
        // line 725
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
        // line 760
        echo "                                              <i class=\"material-icons sub-tabs-arrow\">
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
                                                                    k";
        // line 796
        echo "eyboard_arrow_down
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
        // line 826
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
        // line 858
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
        // line 890
        echo "                   </li>
                                              
                  
                                                      
                  
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
        // line 922
        echo "           </ul>
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
        // line 955
        echo "                                                        </ul>
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
                                <";
        // line 985
        echo "/a>
                              </li>

                                                                                  
                              
                                                            
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
                                       ";
        // line 1019
        echo "     </a>
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
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminMollieSubscriptionOrdersPar";
        // line 1048
        echo "ent\" class=\"link\"> Subscriptions
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
                              
          
                      
                                          
                    
          
            <li class=\"category-title link-active\" data-submenu=\"80\" id=\"tab-CONFIGURE\">
                <span class=\"title\">Configureer</span>
            </li>

                              
                  
                                                      
                                                          
                  <li class=\"link-levelone has_submenu link-active open ul-open\" data-submenu=\"81\" id=\"subtab-ShopParameters\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/preferences/preferences\" clas";
        // line 1085
        echo "s=\"link\">
                      <i class=\"material-icons mi-settings\">settings</i>
                      <span>
                      Winkelinstellingen
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_up
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-81\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"82\" id=\"subtab-AdminParentPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/preferences/preferences\" class=\"link\"> Algemeen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo link-active\" data-submenu=\"85\" id=\"subtab-AdminParentOrderPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/order-preferences/\" class=\"link\"> Bestellingsinstellingen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"88\" id=\"subtab-AdminPPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/product";
        // line 1115
        echo "-preferences/\" class=\"link\"> Producten
                                </a>
                              </li>

                                                                                  
                              
                                                            
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
                                <a href=\"https://ngrok.ijzershop-test.nl/admi";
        // line 1147
        echo "n-dev/index.php?controller=AdminSearchConf\" class=\"link\"> Zoeken
                                </a>
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

                                                                                  
                              
                                                            
                             ";
        // line 1179
        echo " <li class=\"link-leveltwo\" data-submenu=\"105\" id=\"subtab-AdminPerformance\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/performance/\" class=\"link\"> Prestaties
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

                                                                                  
                              
                                                            
                      ";
        // line 1211
        echo "        <li class=\"link-leveltwo\" data-submenu=\"109\" id=\"subtab-AdminParentEmployees\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/employees/\" class=\"link\"> Medewerkers
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

                                                                                  
                              
                                                            
       ";
        // line 1243
        echo "                       <li class=\"link-leveltwo\" data-submenu=\"118\" id=\"subtab-AdminShopGroup\">
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
                                        <";
        // line 1273
        echo "/li>
                                              
                  
                                                      
                  
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
                      <";
        // line 1316
        echo "i class=\"material-icons mi-credit_card\">credit_card</i>
                      <span>
                      Customer VAT Number Management
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
            ";
        // line 1350
        echo "                                        <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
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
                                         ";
        // line 1383
        echo "   </a>
                                        </li>
                              
          
                  </ul>
  </div>
  
</nav>


<div class=\"header-toolbar d-print-none\">
        <div
        id=\"header-multishop\"
        class=\"header-multishop header-multishop-bright\"
        data-shop-id=\"1\"                data-checkbox-notification=\"Om specifieke instellingen toe te passen op een winkel of een groep winkels, selecteert u de parameter die u wilt wijzigen, brengt u uw wijzigingen aan en slaat u op. \"
    >
      <div class=\"header-multishop-top-bar\" style=\"background-color: #ff0d2e;\">
        <div class=\"header-multishop-center js-header-multishop-open-modal\">
                      <svg width=\"43px\" height=\"30px\" viewBox=\"0 0 43 30\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">
  <defs>
    <rect id=\"path-1\" x=\"0\" y=\"0\" width=\"51\" height=\"36\"></rect>
  </defs>
  <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" opacity=\"0.599844\">
    <g id=\"storefront-24px-(1)\" transform=\"translate(-4.000000, -6.000000)\">
      <g id=\"Shape\">
        <mask id=\"mask-2\" fill=\"white\">
          <use xlink:href=\"#path-1\"></use>
        </mask>
        <g id=\"Mask\"></g>
        <path d=\"M46.787234,18.4344444 L44.5290073,9.20888889 C44.0558551,7.30888889 42.3783153,6 40.4211856,6 L10.5480733,6 C8.61245052,6 6.91340382,7.33 6.46175849,9.20888889 L4.20353187,18.4344444 C3.68736578,20.5877778 4.16051803,22.7833333 5.53696092,24.5144444 C5.70901628,24.7466667 5.94559241,24.9155556 6.13915469,25.1266667 L6.13915469,39.7777778 C6.13915469,42.1 8.07477751,44 10.4405387,44 L40.5502271,44 C42.9159883,44 44.8516111,42.1 44.8516111,39.7777778 L44.8516111,25.1266667 C45.0451734,24.9366667 45.2817495,24.7466667 45.4538049,24.5355556 C46.8302478,22.8044444 47.324907,20.5877778 46.787234,18.4344444 Z M40.3566648,10.2011111 L42.6148914,19.4266667 C42.8299606,20.3133333 42.6363984,21.2 42.0772184,21.8966667 C41.77612";
        // line 1412
        echo "15,22.2766667 41.1309139,22.8888889 40.0555679,22.8888889 C38.7436458,22.8888889 37.603779,21.8544444 37.4532306,20.4822222 L36.2058292,10.2222222 L40.3566648,10.2011111 Z M27.6460749,10.2222222 L31.8614313,10.2222222 L33.022805,19.7644444 C33.1303396,20.5877778 32.8722566,21.4111111 32.3130766,22.0233333 C31.8399244,22.5722222 31.1517029,22.8888889 30.2699192,22.8888889 C28.8289556,22.8888889 27.6460749,21.6433333 27.6460749,20.1233333 L27.6460749,10.2222222 Z M17.9464539,19.7644444 L19.1293345,10.2222222 L23.3446909,10.2222222 L23.3446909,20.1233333 C23.3446909,21.6433333 22.1618103,22.8888889 20.5702982,22.8888889 C19.8390629,22.8888889 19.1723484,22.5722222 18.6561823,22.0233333 C18.1185093,21.4111111 17.8604262,20.5877778 17.9464539,19.7644444 Z M8.37587439,19.4266667 L10.5480733,10.2222222 L14.7849366,10.2222222 L13.5375353,20.4822222 C13.3654799,21.8544444 12.24712,22.8888889 10.9351979,22.8888889 C9.88135881,22.8888889 9.21464428,22.2766667 8.93505432,21.8966667 C8.35436747,21.2211111 8.16080519,20.3133333 8.37587439,19.4266667 Z M10.4405387,39.7777778 L10.4405387,27.0477778 C10.6125941,27.0688889 10.7631425,27.1111111 10.9351979,27.1111111 C12.8063,27.1111111 14.5053467,26.3511111 15.752748,25.1055556 C17.0431633,26.3722222 18.7637169,27.1111111 20.7208466,27.1111111 C22.5919487,27.1111111 24.2694885,26.3511111 25.5168898,25.1477778 C26.7857981,26.3511111 28.5063517,27.1111111 30.4419746,27.1111111 C32.2485559,27.1111111 33.9691095,26.3722222 35.2595247,25.1055556 C36.5069261,26.3511111 38.2059728,27.1111111 40.0770748,27.1111111 C40.2491302,27.1111111 40.3996786,27.0688889 40.571734,27.0477778 L40.571734,39.7777778 L10.4405387,39.7777778 Z\" fill=\"white\" fill-rule=\"nonzero\" mask=\"url(#mask-2)\"></path>
      </g>
    </g>
  </g>
</svg>
          
          <h2 class=\"header-multishop-title\">
            ngrok.ijzershop-test.nl
          </h2>

          <button class=\"header-multishop-button\">
            <i class=\"material-icons\">expand_more</i>
          <";
        // line 1424
        echo "/button>
        </div>
      </div>

              <div class=\"header-multishop-right\">
                    <a class=\"header-multishop-view-action\" href=\"https://ngrok.ijzershop-test.nl/\" target=\"_blank\" rel=\"nofollow\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
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
                                      <span class=\"multishop-modal-color\" style=\"background-color:#25b9d7;\"></span>
                                    <a class=\"multishop-modal-all-name\" href=\"/admin-dev/index.php/configure/shop/order-preferences/?setShopContext=\">
                    <span>Alle winkels</span>
                  </a>
                </li>
                
                              <li class=\"multishop-modal-group-item multishop-modal-item first-group-item\">
                                    <span class=\"multishop-modal-color-container\">
                    <i class=\"material-icons\">check</i>
                    <a class=\"multishop-modal-color\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShopGroup&amp;id_shop_group=1&amp;updateshop_group=1\" data-toggle=\"popove";
        // line 1451
        echo "r\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                  </span>
                  <a class=\"multishop-modal-group-name\" href=\"/admin-dev/index.php/configure/shop/order-preferences/?setShopContext=g-1\">Groep Default</a>
                                  </li>

                                  <li class=\"multishop-modal-shop-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container multishop-modal-color-check\">
                        <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #ff0d2e;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=1&amp;updateshop=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/configure/shop/order-preferences/?setShopContext=s-1\">ngrok.ijzershop-test.nl</a>                    </div>
                                          <a class=\"multishop-modal-shop-view\" href=\"https://ngrok.ijzershop-test.nl/\" target=\"_blank\" rel=\"noreferrer\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
                                                          </li>
                                  <li class=\"multishop-modal-shop-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container\">
                        <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #ce55ff;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=2&amp;updatesho";
        // line 1469
        echo "p=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/configure/shop/order-preferences/?setShopContext=s-2\">constructie.local</a>                    </div>
                                          <a class=\"multishop-modal-shop-view\" href=\"https://constructie.local/\" target=\"_blank\" rel=\"noreferrer\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
                                                          </li>
                                  <li class=\"multishop-modal-shop-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container\">
                        <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #d8ff1d;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=3&amp;updateshop=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/configure/shop/order-preferences/?setShopContext=s-3\">cortenwinkel.local</a>                    </div>
                                          <a class=\"multishop-modal-shop-view\" href=\"https://cortenwinkel.local/\" target=\"_blank\" rel=\"noreferrer\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
                                                          </li>
                                  <li class=\"multishop-modal-shop-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container\">
  ";
        // line 1486
        echo "                      <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #00ff00;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=4&amp;updateshop=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/configure/shop/order-preferences/?setShopContext=s-4\">cortenwinkel</a>                    </div>
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
                      <li class=\"breadcrumb-item\">Bestellingsinstellingen</li>
          
                  </ol>
      </nav>
    

    <div class=\"title-row\">
      
          <h1 class=\"title\">
            Order instellingen          </h1>
      

      
        <div class=\"toolbar-icons\">
          <div class=\"wrapper\">
            
                        
            
                              <a class=\"btn btn-outline-secondary btn-help btn-sidebar\" href=\"#\"
                   title=\"Help\"
                   data-toggle=\"sidebar\"
                   data-target=\"#right-sidebar\"
                   data-url=\"/admin-dev/index.php/common/sidebar/https%253A%252F%252Fhelp.prestashop-project.org%252Fnl%252Fdoc%252FAdminOrderPreferences%253Fversion%253D8.2.0%2526country%253Dnl/Help\"
               ";
        // line 1528
        echo "    id=\"product_form_open_help\"
                >
                  Help
                </a>
                                    </div>
        </div>

      
    </div>
  </div>

  
      <div class=\"page-head-tabs\" id=\"head_tabs\">
      <ul class=\"nav nav-pills\">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <li class=\"nav-item\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/order-preferences/\" id=\"subtab-AdminOrderPreferences\" class=\"nav-link tab active current\" data-submenu=\"86\">
                      Be";
        // line 1544
        echo "stellingsinstellingen
                      <span class=\"notification-container\">
                        <span class=\"notification-counter\"></span>
                      </span>
                    </a>
                  </li>
                                                                <li class=\"nav-item\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminStatuses\" id=\"subtab-AdminStatuses\" class=\"nav-link tab \" data-submenu=\"87\">
                      Statussen
                      <span class=\"notification-container\">
                        <span class=\"notification-counter\"></span>
                      </span>
                    </a>
                  </li>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </ul>
    </div>
  
  <div class=\"btn-floating\">
    <button class=\"btn btn-primary collapsed\" data-toggle=\"collapse\" data-target=\".btn-floating-container\" aria-expanded=\"false\">
      <i class=\"material-icons\">add</i>
    </button>
    <div class=\"btn-floating-container collapse\">
      <div class=\"btn-floating-menu\">
        
        
                              <a class=\"btn btn-floating-item btn-help btn-sidebar\" href=\"#\"
               title=\"Help\"
               data-toggle=\"sidebar\"
               data-target=\"#right-sidebar\"
               data-url=\"/admin-dev/index.php/common/sidebar/https%";
        // line 1573
        echo "253A%252F%252Fhelp.prestashop-project.org%252Fnl%252Fdoc%252FAdminOrderPreferences%253Fversion%253D8.2.0%2526country%253Dnl/Help\"
            >
              Help
            </a>
                        </div>
    </div>
  </div>
  
</div>

<div id=\"main-div\">
          
      <div class=\"content-div  with-tabs\">

        

                                                        
        <div id=\"ajax_confirmation\" class=\"alert alert-success\" style=\"display: none;\"></div>
<div id=\"content-message-box\"></div>


  ";
        // line 1594
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
        // line 1628
        $this->displayBlock('javascripts', $context, $blocks);
        $this->displayBlock('extra_javascripts', $context, $blocks);
        $this->displayBlock('translate_javascripts', $context, $blocks);
        echo "</body>";
        echo "
</html>";
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 106
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

    // line 1594
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

    // line 1628
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
        return "__string_template__ab79a7f5c5ec6d7475c88c67514bc005";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  1912 => 1628,  1843 => 1594,  1808 => 106,  1793 => 1628,  1753 => 1594,  1730 => 1573,  1699 => 1544,  1681 => 1528,  1637 => 1486,  1618 => 1469,  1598 => 1451,  1569 => 1424,  1555 => 1412,  1524 => 1383,  1489 => 1350,  1453 => 1316,  1408 => 1273,  1376 => 1243,  1342 => 1211,  1308 => 1179,  1274 => 1147,  1240 => 1115,  1208 => 1085,  1169 => 1048,  1138 => 1019,  1102 => 985,  1070 => 955,  1035 => 922,  1001 => 890,  967 => 858,  933 => 826,  901 => 796,  863 => 760,  826 => 725,  792 => 693,  758 => 661,  723 => 628,  690 => 597,  655 => 564,  622 => 533,  580 => 493,  532 => 447,  479 => 396,  427 => 346,  383 => 304,  341 => 264,  308 => 233,  280 => 207,  245 => 174,  209 => 140,  170 => 106,  126 => 71,  96 => 43,  52 => 1,);
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

<title>Order instellingen • Ijzershop</title>

  <script type=\"text/javascript\">
    var help_class_name = \\'AdminOrderPreferences\\';
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
    var token = \\'091f9e274b20af17fc89ee603991f273\\';
    var currentIndex = \\'index.php?controller=AdminOrderPreferences\\';
    var employee_token = \\'f2c1c327dfcaf3e264611f2b0c958559\\';
    var choose_language_translate = \\'Selecteer een taal:\\';
    var default_language = \\'1\\';
    var admin_modules_link = \\'https://ngrok.ijzershop-test.nl/admin-dev/index.php/improve/modules/manage\\';
    var admin_notification_get_link = \\'https://ngrok.ijzershop-test.nl/admin-dev/index.php/common/notifications\\';
    var admin_notification_push_link = adminNotificationPushLink = \\'https://ngrok.ijzershop-test.nl/admin-dev/index.php/common/notifications/ack\\';
    var tab_modules_list = \\'\\';
    var update_suc' | raw }}{{ 'cess_msg = \\'Bijwerken geslaagd\\';
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
      <link href=\"/modules/dynamicproduct/views/css/admin.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/modules/mollie/views/css/admin/menu.css\" rel=\"stylesheet\" type=\"text/css\"/>
  
  <script type=\"text/javascript\">
var baseAdminDir = \"\\\\/admin-dev\\\\/\";
var baseDir = \"\\\\/\";
var changeFormLanguageUrl = \"https:\\\\/\\\\/ngrok.ijzershop-test.nl\\\\/admin-dev\\\\/index.php\\\\/configure\\\\/advanced\\\\/employees\\\\/change-form-language\";
var currency = {\"iso_code\":\"EUR\",\"sign\":\"\\\\u00e2\\\\u201a\\\\u00ac\",\"name\":\"Euro\",\"format\":null};
var currency_specifications = {\"symbol\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\\\u00d7\",\"\\\\u2030\",\"\\\\u221e\",\"NaN\"],\"currencyCode\":\"EUR\",\"currencySymbol\":\"\\\\u00e2\\\\u201a\\\\u00ac\",\"numberSymbols\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\\\u00d7\",\"\\\\u2030\",\"\\\\u221e\",\"NaN\"],\"positivePattern\":\"\\\\u00a4\\\\u00a0#,##0.00\",\"negativePattern\":\"\\\\u00a4\\\\u00a0-#,##0.00\",\"maxFractionDigits\":2,\"minFractionDigits\":2,\"groupingUsed\":true,\"primaryGroupSize\":3,\"secondaryGroupSize\":3};
var dp_id_module = \"377\";
var dp_module_link = \"https:\\\\/\\\\/ngrok.ijzershop-test.nl\\\\/admin-dev\\\\/index.php?controller=AdminModules&configure=dynamicproduct\";
var dp_public_path = \"https:\\\\/\\\\/ngrok.ijzershop-test.nl\\\\/modules\\\\/dynamicproduct\\\\/lib\\\\/media\\\\/dist\\\\/\";
var dp_translations = {\"3357\":\"if\",\"3555\":\"of\",\"65665\":\"Toevoegen\",\"65921\":\"Allemaal\",\"77124\":\"Max\",\"77362\":\"Min\",\"78208\":' | raw }}{{ '\"Nieuw\",\"2106261\":\"Copy\",\"2228070\":\"Grid\",\"2373894\":\"Laden\",\"2420395\":\"Naam\",\"2569629\":\"Opslaan\",\"2587372\":\"Step\",\"2603341\":\"Text\",\"2622298\":\"Type\",\"2641316\":\"Unit\",\"20170714\":\"Field groups\",\"42216636\":\"Show less\",\"42255992\":\"Show more\",\"42572887\":\"Maximum files\",\"46603408\":\"Greater than or equal\",\"60673783\":\"Calculation Order\",\"65193517\":\"Clear\",\"65203672\":\"Sluiten\",\"67634599\":\"Any change will have an effect on the configuration of _nb_ products.\",\"67875034\":\"Field\",\"69070285\":\"Grids\",\"70760763\":\"Image\",\"73174740\":\"Label\",\"78727453\":\"Range\",\"80208647\":\"Steps\",\"81768821\":\"Will show an error when no option is selected\",\"82420049\":\"Value\",\"94764465\":\"Checked by default\",\"96215082\":\"Export configuration to a file\",\"96634189\":\"empty\",\"112524536\":\"Any change will have an effect on the linked configurations.\",\"146608883\":\"Clear existing elements before copying\",\"168044563\":\"Prefix with a space if needed\",\"177208536\":\"Not recommended as it can slow down the cart page\",\"188877356\":\"Select a product\",\"190258903\":\"Important: The name must be a valid css class name\",\"209981527\":\"Control field\",\"213777395\":\"Use _Up__ \\\\/ _Down__ arrows and _Tab__ \\\\/ _Shift__ _Tab__ to navigate between fields\",\"217062059\":\"Delete field formula\",\"225214028\":\"Import configuration from a file\",\"255574909\":\"Add a new condition\",\"309632339\":\"Add a new option\",\"335921277\":\"Select All\",\"337710188\":\"Delete all items\",\"341682506\":\"Example\",\"342988778\":\"Collapsible\",\"366478171\":\"Disabled days\",\"391613546\":\"This will **ALSO DELETE the original item**. Are you sure that you want to continue?\",\"403974246\":\"Display secondary value as option description\",\"414080266\":\"Max date\",\"415178366\":\"Opties\",\"448768363\":\"Refresh databases list\",\"472144411\":\"Price unit\",\"487485563\":\"Delete grid\",\"499705571\":\"No steps configured yet!\",\"501633139\":\"Display the calculated price in the category page\",\"502849757\":\"Actions\",\"512870211\":\"Remove field from favorites\",\"524754236\":\"Add a row\",\"539312109\":\"Formulas\",\"551803430\":\"Pres' | raw }}{{ 'taShop fields\",\"556571664\":\"Available fields\",\"593819435\":\"Available groups\",\"616048556\":\"Save and close\",\"618203353\":\"Display dropzone\",\"635062501\":\"Interval\",\"641384524\":\"Load formula\",\"642864804\":\"If you choose to hide all fields for one or more combinations, make sure to disable the option &quot;Required customization&quot; above\",\"648178368\":\"Enable if the price depends on the cart quantity\",\"674841376\":\"This product has no field groups\",\"679767347\":\"Display secondary value as option price\",\"683837713\":\"Open in a new tab\",\"686245726\":\"Add interval field\",\"694222335\":\"Interval field\",\"707322317\":\"Instead of the currency symbol\",\"714420990\":\"Values (separate by comma, use dot for decimal values)\",\"717577136\":\"Edit summary\",\"723571741\":\"Click to edit formula\",\"733185705\":\"Calculation\",\"743137649\":\"Are you sure you want to delete the selected fields?\",\"747570142\":\"Weight formula\",\"751248134\":\"Edit description\",\"818934447\":\"Click to toggle the option visibility\",\"856190703\":\"The formula is valid\",\"863835572\":\"Import\\\\/Export configuration\",\"877234552\":\"This element was not found\",\"882649860\":\"Recalculate price in cart after each page view\",\"894228158\":\"Show in cart summary\",\"896194968\":\"Advanced configuration\",\"910258683\":\"Date after\\\\/before dd days\",\"936109071\":\"This name is a reserved Excel function name, please use another name\",\"941456859\":\"add a new field group\",\"942696557\":\"Display tax excluded prices\",\"955701460\":\"Delete interval field\",\"956903001\":\"Delete interval group\",\"957328081\":\"Expand condition (Shift + Click to expand all)\",\"967323594\":\"Unlink configurations\",\"987228486\":\"Formula\",\"1015824103\":\"The formula contains unknown fields\",\"1018815151\":\"Combination\",\"1023084919\":\"Select a field\",\"1028005612\":\"Enable the module for this product\",\"1035798281\":\"Unknown group\",\"1062605528\":\"Conditions\",\"1074180180\":\"No field groups configured yet!\",\"1092329901\":\"Insert as one step\",\"1092758090\":\"Allow multiselection\",\"1119619936\":\"Product Page\",\"1128817579\":\"Copy c' | raw }}{{ 'onfiguration\",\"1139462901\":\"Toggle all\",\"1142656251\":\"Condition\",\"1152371054\":\"Configure options visibility\",\"1201193478\":\"Display the &quot;Starting from&quot; label in the category page\",\"1224131978\":\"No custom execution order is configured, the default order will be used\",\"1265447825\":\"Minimize condition (Shift + Click to minimize all)\",\"1292109984\":\"Script name\",\"1299208205\":\"Delete this row\",\"1311260723\":\"Formula copied to clipboard\",\"1319091200\":\"Field Formula\",\"1327464299\":\"Recalculate price in cart when quantity changes\",\"1346468776\":\"Preview\",\"1365932015\":\"Steps Activation\",\"1378058502\":\"Delete condition\",\"1382863923\":\"Cost formula\",\"1385751734\":\"You can import\\\\/export a file containing the product configuration\",\"1473269982\":\"Groups Visibility\",\"1479721030\":\"Applies only if the product has a price of 0\",\"1499275331\":\"Settings\",\"1503955207\":\"The current formula is empty\",\"1506518963\":\"Insert step\",\"1507272505\":\"Demo mode enabled, only these types will be accepted\",\"1518498724\":\"Combinations\",\"1525066715\":\"Copy formula\",\"1529599611\":\"Add field column\",\"1539356550\":\"Cancel selection\",\"1543324436\":\"Row field\",\"1547472170\":\"Displayed price\",\"1550611840\":\"Use a custom calculation order\",\"1589928967\":\"The new Calculation tab displays a unified interface to add and organize calculation items\",\"1606304409\":\"Show or Hide the fields based on the selected combination\",\"1611563307\":\"Interval formula\",\"1616172285\":\"This group has already been added\",\"1620484928\":\"Delete this item\",\"1620782841\":\"Delete this step\",\"1642806840\":\"Databases\",\"1652081830\":\"Click to toggle the field visibility\",\"1721653182\":\"Deselect All\",\"1741737838\":\"Click to insert an option\",\"1772226151\":\"If empty, then the field name will be used\",\"1781676314\":\"Display weight to customers\",\"1782805700\":\"Quantity (PrestaShop Quantity)\",\"1799432497\":\"CSS class name (optional)\",\"1816510966\":\"Display label\",\"1821258733\":\"Clear the current configuration\",\"1843498208\":\"Allow saving customization to profile\",\"18' | raw }}{{ '80571668\":\"Minimum width\",\"1887918305\":\"unlimited\",\"1890611904\":\"Custom suffix\",\"1907478750\":\"Linking will affect current and future products of selected category\",\"1926535580\":\"Remove this column\",\"1939070905\":\"Will show an error when set to 0\",\"1939937161\":\"Delete selected fields\",\"1962674479\":\"Use Ctrl + Enter to save formula\",\"1970866633\":\"Unlink configuration\",\"1990316837\":\"Are you sure to toggle all options?\",\"1991049567\":\"Hide in summary when unchecked\",\"2001303836\":\"Loading\",\"2005080793\":\"Fields Visibility\",\"2008912283\":\"Add condition group\",\"2011110042\":\"Annuleren\",\"2030152089\":\"Minimum height\",\"2050679770\":\"Replace field names with their respective values\",\"2076495866\":\"Insert all items\",\"2089680852\":\"Exporteren\",\"2104126169\":\"Fields\",\"2124186744\":\"Click to toggle the step visibility\",\"2141373940\":\"Groups\",\"-2057845645\":\"Field Formulas\",\"-1787898834\":\"Intervals\",\"-321013333\":\"Product original price\",\"-1173076394\":\"Product original weight\",\"-91109833\":\"The quantity selected by the customer\",\"-343092435\":\"You can configure the visibility of each field based on the selected combination. A hidden field will have a null value in the formula\",\"-360169678\":\"Visibility\",\"-984860935\":\"Proportions\",\"-1395957536\":\"Require all steps to be completed\",\"-258501236\":\"This step has already been added\",\"-2047922448\":\"Available steps\",\"-936937268\":\"Manage steps\",\"-1544869189\":\"Refresh\",\"-986386678\":\"add a new step\",\"-1020392531\":\"Start by inserting a step from the list above\",\"-1213154046\":\"Unknown step\",\"-1072973150\":\"Drag to reorder\",\"-1003134522\":\"There are no fields yet, add a new field in the fields tab.\",\"-1920372430\":\"Required customization\",\"-1640250765\":\"Hide quantity input\",\"-911095655\":\"Multiply price &amp; weight by quantity\",\"-319880804\":\"If activated, the displayed price &amp; weight on the product page will be multiplied by the quantity\",\"-1536078307\":\"Split summary by groups\",\"-567220177\":\"Per kilo, per litre\",\"-1105717282\":\"You can configure a displayed pric' | raw }}{{ 'e if your product has a price of 0\",\"-350941306\":\"You may need to clear the cache after changing this setting\",\"-260281722\":\"Display customization cost in customization summary\",\"-72782714\":\"Copy configuration to clipboard\",\"-2100928571\":\"Import\",\"-839043195\":\"Import configuration from clipboard\",\"-266050175\":\"Export image links instead of encoding the images\",\"-970294887\":\"Results in a smaller file. Only enable if the images can be accessed from your target shop.\",\"-512299320\":\"Please select the elements you want to copy from the source product.\",\"-1440091513\":\"Equations\",\"-1295811629\":\"Combination Values\",\"-1569442514\":\"Combinations Visibility\",\"-1780637860\":\"Load configuration\",\"-1680464031\":\"Select a category\",\"-755060688\":\"Will use the same configuration in multiple products instead of copying it\",\"-969155480\":\"Link instead of copying\",\"-743709137\":\"Will not preserve the original configurations of the linked products\",\"-198824349\":\"Clear the configurations of linked products\",\"-77133620\":\"You can copy or link this configuration to all products of the selected category\",\"-97880005\":\"Will use the same configuration instead of copying it\",\"-861552729\":\"Will not preserve the current configuration\",\"-814503541\":\"You can copy the selected product configuration to the current product\",\"-376014216\":\"Add a new proportion\",\"-1266890280\":\"Add an interval group\",\"-1739945662\":\"Values\",\"-167002208\":\"Interval condition\",\"-1983196248\":\"Less than\",\"-530681616\":\"+Infinity (no upper limit)\",\"-813310028\":\"Remove this condition group\",\"-1754233898\":\"Allows the customer to expand\\\\/collapse the group by clicking on the group label\",\"-1203478535\":\"Start collapsed\",\"-557346165\":\"Select the field that you want to add\",\"-1442032302\":\"Pick a field...\",\"-997806686\":\"This feature will duplicate the group based on the value of the selected field\",\"-1306471438\":\"Delete this group\",\"-626105070\":\"Insert field group\",\"-2074469771\":\"Manage field groups\",\"-912813020\":\"Add a grid\",\"-177830133\":\"Im' | raw }}{{ 'port CSV\",\"-1963285437\":\"Delete this column\",\"-1849538101\":\"Target field\",\"-1759411248\":\"Column field\",\"-1157161804\":\"Add a column\",\"-754551441\":\"Price formula\",\"-1451894031\":\"Quantity formula\",\"-874003249\":\"Some field names are duplicated. You can either rename them or delete them.\",\"-1522567076\":\"Add a new field\",\"-597373332\":\"Do you want to update the field name in all the product formulas?\",\"-2043405119\":\"Displayed\",\"-2133620278\":\"Hidden\",\"-871138304\":\"Load a field from favorites\",\"-907353161\":\"Load a field from common fields\",\"-400560676\":\"Insert a new field here\",\"-827747024\":\"Click to select fields\",\"-1162526551\":\"Field settings\",\"-192987258\":\"Summary\",\"-2066126138\":\"Delete image\",\"-1667496710\":\"Click to upload an image\",\"-2071596850\":\"Delete color\",\"-403094350\":\"Click to pick a color\",\"-56677412\":\"Omschrijving\",\"-455739515\":\"Secondary Value\",\"-1085510111\":\"Default\",\"-328495169\":\"Required\",\"-195866273\":\"Display value as option price\",\"-961591827\":\"Image height (px)\",\"-2110296218\":\"Display info in a popup\",\"-930467021\":\"Import images\",\"-812471947\":\"Initial value\",\"-2028851885\":\"Placeholder\",\"-124100328\":\"Min characters\",\"-781016378\":\"Max characters\",\"-563123098\":\"Hide in summary when empty or equal to zero\",\"-1281023549\":\"Display PrestaShop style buttons\",\"-1732758869\":\"Maximum size (MB)\",\"-786546228\":\"Allowed Extensions\",\"-1369255836\":\"Thumbnail size (px)\",\"-303839446\":\"Initial date\",\"-2027417515\":\"Current day\",\"-1362116388\":\"Min date\",\"-1052633864\":\"Comma separated.\",\"-901436182\":\"Sun: 1, Mon: 2, Tues: 3, Wed: 4, Thurs: 5, Fri: 6, Sat: 7\",\"-981640203\":\"The JSON code is not valid, please check the browser console.\",\"-1156506214\":\"JSON Config\",\"-829601945\":\"Initial color\",\"-1339063232\":\"View image\",\"-1754727903\":\"Upload\",\"-929869225\":\"Add field to favorites\",\"-772024966\":\"Remove field from common fields\",\"-43752491\":\"Set as common field\",\"-1470017715\":\"Duplicate this field\",\"-1208718378\":\"This will not delete the original field\",\"-1307672979\":\"Delete this fiel' | raw }}{{ 'd\",\"-2016607813\":\"Filter field formulas\",\"-1479771459\":\"Create a new field formula\",\"-505434665\":\"Click to edit\",\"-345562080\":\"Field formula\",\"-1561849983\":\"This calculation order is now replaced by the Calculation tab\",\"-198258289\":\"Add an execution item\",\"-1450803135\":\"deletes all execution items\",\"-1327547091\":\"Reset to default\",\"-1069635520\":\"Filter conditions\",\"-1840858600\":\"Create a new condition\",\"-27641343\":\"Click to toggle the group visibility\",\"-184663564\":\"Options visibility\",\"-1853217873\":\"Show the advanced settings\",\"-1733472447\":\"Condition formula\",\"-141573914\":\"Filter condition fields\",\"-1364207966\":\"Are you sure that you want to delete all items?\",\"-88887989\":\"Click to open the item\",\"-213492928\":\"Click to open the item tab\",\"-1997101839\":\"Hold shift to also delete the original item\",\"-1437454083\":\"Are you sure that you want to add all the items?\",\"-2068694494\":\"Insert selected items\",\"-1504585939\":\"No items were found, start by adding a new item below\",\"-1095166702\":\"Pick a custom color\",\"-2029223687\":\"Edit product\",\"-885795230\":\"Module configuration\",\"-865760232\":\"This configuration is linked to the product\",\"-2090976550\":\"Copy linked configuration\",\"-1627988830\":\"View original configuration\",\"-781361040\":\"This configuration is linked to _nb_ products\",\"-209324991\":\"Filter fields\",\"-859165076\":\"You can use multiple filters separated by spaces\",\"-1888060882\":\"Check formula\",\"-2478677\":\"Add formula to favorites\",\"-1433567116\":\"Are you sure you want to delete this item\",\"-135023574\":\"Could not copy formula to clipboard\",\"-1882967692\":\"Remove formula from presets\",\"-429764437\":\"No preset formulas. Click the star icon to add one.\",\"-1799625922\":\"Please enter a field name first\",\"-2132954502\":\"Create a new dynamic variable field\",\"-1783025135\":\"Field name\",\"-226074697\":\"Save new field\",\"-229417419\":\"Databases refreshed successfully\",\"-377760440\":\"Product attributes\",\"-590915474\":\"Product features\",\"-274987431\":\"Long press to use the secondary value\",\"-42' | raw }}{{ '6186843\":\"Secondary value\"};
var number_specifications = {\"symbol\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\\\u00d7\",\"\\\\u2030\",\"\\\\u221e\",\"NaN\"],\"numberSymbols\":[\",\",\".\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\\\u00d7\",\"\\\\u2030\",\"\\\\u221e\",\"NaN\"],\"positivePattern\":\"#,##0.###\",\"negativePattern\":\"-#,##0.###\",\"maxFractionDigits\":3,\"minFractionDigits\":0,\"groupingUsed\":true,\"primaryGroupSize\":3,\"secondaryGroupSize\":3};
var prestashop = {\"debug\":true};
var ps_module_dev = false;
var show_new_customers = \"1\";
var show_new_messages = \"1\";
var show_new_orders = \"1\";
</script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/main.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/multistore_dropdown.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/js/jquery/plugins/jquery.chosen.js\"></script>
<script type=\"text/javascript\" src=\"/js/jquery/plugins/fancybox/jquery.fancybox.js\"></script>
<script type=\"text/javascript\" src=\"/js/admin.js?v=8.2.0\"></script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/cldr.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/js/tools.js?v=8.2.0\"></script>
<script type=\"text/javascript\" src=\"/admin-dev/themes/new-theme/public/create_product.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/modules/ps_emailalerts/js/admin/ps_emailalerts.js\"></script>
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


' | raw }}{% block stylesheets %}{% endblock %}{% block extra_stylesheets %}{% endblock %}</head>{{ '

<body
  class=\"lang-nl adminorderpreferences multishop-enabled developer-mode\"
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
         href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/catalog/products/new?token=75aac5352e895b8456cd6' | raw }}{{ 'fcb06269e79\"
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
        data-rand=\"36\"
        data-icon=\"icon-AdminParentOrderPreferences\"
        data-method=\"add\"
        data-url=\"index.php' | raw }}{{ '/configure/shop/order-preferences\"
        data-post-link=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminQuickAccesses\"
        data-prompt-text=\"Geef een naam aan deze shortcut:\"
        data-link=\"Bestellingsinstellingen - Lijst\"
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
        <a class=\"dropdown-item\" data-item=\"Catalogus\" href=\"#\" data-value=\"1\" data-placeholder=\"Product naam, referentie, etc.\" data-icon=\"' | raw }}{{ 'icon-book\"><i class=\"material-icons\">store_mall_directory</i> Catalogus</a>
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
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminModules&amp;configure=ordersexport&amp;token' | raw }}{{ '=1adaa4d5033b9e6ed774af0f892437e1\"
             data-item=\"export orders\"
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
      <a class=\"dropdown-item' | raw }}{{ ' quick-row-link\"
       href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminStats&amp;module=statsforecast&amp;token=e74d58a885c40df26dc72f8ede2f24f9\"
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
      data-rand=\"70\"
      data-icon=\"icon-AdminParentOrderPreferences\"
      data-method=\"add\"
      data-url=\"index.php/configure/shop/order-preferences\"
      data-post-link=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminQuickAccesses\"
      data-prompt-text=\"Geef een naam aan deze shortcut:\"
      data-link=\"Bestellingsinstellingen - Lijst\"
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
             href=' | raw }}{{ '\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/performance/\"
          >
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
  <div class=\"d' | raw }}{{ 'ropdown-menu dropdown-menu-right js-notifs_dropdown\">
    <div class=\"notifications\">
      <ul class=\"nav nav-tabs\" role=\"tablist\">
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
                                    <div class=\"tab-pane  empty\" id=\"customers-notifications\" role=\"tabpanel\">' | raw }}{{ '
            <p class=\"no-notification\">
              Geen nieuwe klanten :(<br>
              Bent u actief op social media?
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
        <span class=\"employee-avatar\"><img class=\"avatar rounded-circle\" src=\"https://ngrok.ijzershop-test.nl/img/pr/default.jpg\" ' | raw }}{{ 'alt=\"Moderne\" /></span>
        <span class=\"employee_profile\">Welkom terug Moderne</span>
      </div>

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
              <a href=\"https://ngrok.ijzershop-test.' | raw }}{{ 'nl/admin-dev/index.php?controller=AdminDashboard\" class=\"link\" >
                <i class=\"material-icons\">trending_up</i> <span>Dashboard</span>
              </a>
            </li>

          
                      
                                          
                    
          
            <li class=\"category-title\" data-submenu=\"2\" id=\"tab-SELL\">
                <span class=\"title\">Verkopen</span>
            </li>

                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"3\" id=\"subtab-AdminParentOrders\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/orders/\" class=\"link\">
                      <i class=\"material-icons mi-shopping_basket\">shopping_basket</i>
                      <span>
                      Bestellingen
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-3\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"4\" id=\"subtab-AdminOrders\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/sell/orders/\" class=\"link\"> Bestellingen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                         ' | raw }}{{ '     <li class=\"link-leveltwo\" data-submenu=\"5\" id=\"subtab-AdminInvoices\">
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

                                                                                                                                        
                              
                                                           ' | raw }}{{ ' 
                              <li class=\"link-leveltwo\" data-submenu=\"475\" id=\"subtab-AdminOfferController\">
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
              ' | raw }}{{ '        Klanten
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
                                      ' | raw }}{{ '  </li>
                                              
                  
                                                      
                  
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
      ' | raw }}{{ '                                              <i class=\"material-icons sub-tabs-arrow\">
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
                                                                    k' | raw }}{{ 'eyboard_arrow_down
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
                     ' | raw }}{{ '                   </li>
                                              
                  
                                                      
                  
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

                                                                   ' | raw }}{{ '           </ul>
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

                      ' | raw }}{{ '                                                        </ul>
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
                                <' | raw }}{{ '/a>
                              </li>

                                                                                  
                              
                                                            
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
                                       ' | raw }}{{ '     </a>
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
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminMollieSubscriptionOrdersPar' | raw }}{{ 'ent\" class=\"link\"> Subscriptions
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
                              
          
                      
                                          
                    
          
            <li class=\"category-title link-active\" data-submenu=\"80\" id=\"tab-CONFIGURE\">
                <span class=\"title\">Configureer</span>
            </li>

                              
                  
                                                      
                                                          
                  <li class=\"link-levelone has_submenu link-active open ul-open\" data-submenu=\"81\" id=\"subtab-ShopParameters\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/preferences/preferences\" clas' | raw }}{{ 's=\"link\">
                      <i class=\"material-icons mi-settings\">settings</i>
                      <span>
                      Winkelinstellingen
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_up
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-81\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"82\" id=\"subtab-AdminParentPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/preferences/preferences\" class=\"link\"> Algemeen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo link-active\" data-submenu=\"85\" id=\"subtab-AdminParentOrderPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/order-preferences/\" class=\"link\"> Bestellingsinstellingen
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"88\" id=\"subtab-AdminPPreferences\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/product' | raw }}{{ '-preferences/\" class=\"link\"> Producten
                                </a>
                              </li>

                                                                                  
                              
                                                            
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
                                <a href=\"https://ngrok.ijzershop-test.nl/admi' | raw }}{{ 'n-dev/index.php?controller=AdminSearchConf\" class=\"link\"> Zoeken
                                </a>
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

                                                                                  
                              
                                                            
                             ' | raw }}{{ ' <li class=\"link-leveltwo\" data-submenu=\"105\" id=\"subtab-AdminPerformance\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/performance/\" class=\"link\"> Prestaties
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

                                                                                  
                              
                                                            
                      ' | raw }}{{ '        <li class=\"link-leveltwo\" data-submenu=\"109\" id=\"subtab-AdminParentEmployees\">
                                <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/advanced/employees/\" class=\"link\"> Medewerkers
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

                                                                                  
                              
                                                            
       ' | raw }}{{ '                       <li class=\"link-leveltwo\" data-submenu=\"118\" id=\"subtab-AdminShopGroup\">
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
                                        <' | raw }}{{ '/li>
                                              
                  
                                                      
                  
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
                      <' | raw }}{{ 'i class=\"material-icons mi-credit_card\">credit_card</i>
                      <span>
                      Customer VAT Number Management
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
            ' | raw }}{{ '                                        <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
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
                                         ' | raw }}{{ '   </a>
                                        </li>
                              
          
                  </ul>
  </div>
  
</nav>


<div class=\"header-toolbar d-print-none\">
        <div
        id=\"header-multishop\"
        class=\"header-multishop header-multishop-bright\"
        data-shop-id=\"1\"                data-checkbox-notification=\"Om specifieke instellingen toe te passen op een winkel of een groep winkels, selecteert u de parameter die u wilt wijzigen, brengt u uw wijzigingen aan en slaat u op. \"
    >
      <div class=\"header-multishop-top-bar\" style=\"background-color: #ff0d2e;\">
        <div class=\"header-multishop-center js-header-multishop-open-modal\">
                      <svg width=\"43px\" height=\"30px\" viewBox=\"0 0 43 30\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">
  <defs>
    <rect id=\"path-1\" x=\"0\" y=\"0\" width=\"51\" height=\"36\"></rect>
  </defs>
  <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" opacity=\"0.599844\">
    <g id=\"storefront-24px-(1)\" transform=\"translate(-4.000000, -6.000000)\">
      <g id=\"Shape\">
        <mask id=\"mask-2\" fill=\"white\">
          <use xlink:href=\"#path-1\"></use>
        </mask>
        <g id=\"Mask\"></g>
        <path d=\"M46.787234,18.4344444 L44.5290073,9.20888889 C44.0558551,7.30888889 42.3783153,6 40.4211856,6 L10.5480733,6 C8.61245052,6 6.91340382,7.33 6.46175849,9.20888889 L4.20353187,18.4344444 C3.68736578,20.5877778 4.16051803,22.7833333 5.53696092,24.5144444 C5.70901628,24.7466667 5.94559241,24.9155556 6.13915469,25.1266667 L6.13915469,39.7777778 C6.13915469,42.1 8.07477751,44 10.4405387,44 L40.5502271,44 C42.9159883,44 44.8516111,42.1 44.8516111,39.7777778 L44.8516111,25.1266667 C45.0451734,24.9366667 45.2817495,24.7466667 45.4538049,24.5355556 C46.8302478,22.8044444 47.324907,20.5877778 46.787234,18.4344444 Z M40.3566648,10.2011111 L42.6148914,19.4266667 C42.8299606,20.3133333 42.6363984,21.2 42.0772184,21.8966667 C41.77612' | raw }}{{ '15,22.2766667 41.1309139,22.8888889 40.0555679,22.8888889 C38.7436458,22.8888889 37.603779,21.8544444 37.4532306,20.4822222 L36.2058292,10.2222222 L40.3566648,10.2011111 Z M27.6460749,10.2222222 L31.8614313,10.2222222 L33.022805,19.7644444 C33.1303396,20.5877778 32.8722566,21.4111111 32.3130766,22.0233333 C31.8399244,22.5722222 31.1517029,22.8888889 30.2699192,22.8888889 C28.8289556,22.8888889 27.6460749,21.6433333 27.6460749,20.1233333 L27.6460749,10.2222222 Z M17.9464539,19.7644444 L19.1293345,10.2222222 L23.3446909,10.2222222 L23.3446909,20.1233333 C23.3446909,21.6433333 22.1618103,22.8888889 20.5702982,22.8888889 C19.8390629,22.8888889 19.1723484,22.5722222 18.6561823,22.0233333 C18.1185093,21.4111111 17.8604262,20.5877778 17.9464539,19.7644444 Z M8.37587439,19.4266667 L10.5480733,10.2222222 L14.7849366,10.2222222 L13.5375353,20.4822222 C13.3654799,21.8544444 12.24712,22.8888889 10.9351979,22.8888889 C9.88135881,22.8888889 9.21464428,22.2766667 8.93505432,21.8966667 C8.35436747,21.2211111 8.16080519,20.3133333 8.37587439,19.4266667 Z M10.4405387,39.7777778 L10.4405387,27.0477778 C10.6125941,27.0688889 10.7631425,27.1111111 10.9351979,27.1111111 C12.8063,27.1111111 14.5053467,26.3511111 15.752748,25.1055556 C17.0431633,26.3722222 18.7637169,27.1111111 20.7208466,27.1111111 C22.5919487,27.1111111 24.2694885,26.3511111 25.5168898,25.1477778 C26.7857981,26.3511111 28.5063517,27.1111111 30.4419746,27.1111111 C32.2485559,27.1111111 33.9691095,26.3722222 35.2595247,25.1055556 C36.5069261,26.3511111 38.2059728,27.1111111 40.0770748,27.1111111 C40.2491302,27.1111111 40.3996786,27.0688889 40.571734,27.0477778 L40.571734,39.7777778 L10.4405387,39.7777778 Z\" fill=\"white\" fill-rule=\"nonzero\" mask=\"url(#mask-2)\"></path>
      </g>
    </g>
  </g>
</svg>
          
          <h2 class=\"header-multishop-title\">
            ngrok.ijzershop-test.nl
          </h2>

          <button class=\"header-multishop-button\">
            <i class=\"material-icons\">expand_more</i>
          <' | raw }}{{ '/button>
        </div>
      </div>

              <div class=\"header-multishop-right\">
                    <a class=\"header-multishop-view-action\" href=\"https://ngrok.ijzershop-test.nl/\" target=\"_blank\" rel=\"nofollow\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
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
                                      <span class=\"multishop-modal-color\" style=\"background-color:#25b9d7;\"></span>
                                    <a class=\"multishop-modal-all-name\" href=\"/admin-dev/index.php/configure/shop/order-preferences/?setShopContext=\">
                    <span>Alle winkels</span>
                  </a>
                </li>
                
                              <li class=\"multishop-modal-group-item multishop-modal-item first-group-item\">
                                    <span class=\"multishop-modal-color-container\">
                    <i class=\"material-icons\">check</i>
                    <a class=\"multishop-modal-color\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShopGroup&amp;id_shop_group=1&amp;updateshop_group=1\" data-toggle=\"popove' | raw }}{{ 'r\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                  </span>
                  <a class=\"multishop-modal-group-name\" href=\"/admin-dev/index.php/configure/shop/order-preferences/?setShopContext=g-1\">Groep Default</a>
                                  </li>

                                  <li class=\"multishop-modal-shop-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container multishop-modal-color-check\">
                        <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #ff0d2e;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=1&amp;updateshop=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/configure/shop/order-preferences/?setShopContext=s-1\">ngrok.ijzershop-test.nl</a>                    </div>
                                          <a class=\"multishop-modal-shop-view\" href=\"https://ngrok.ijzershop-test.nl/\" target=\"_blank\" rel=\"noreferrer\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
                                                          </li>
                                  <li class=\"multishop-modal-shop-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container\">
                        <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #ce55ff;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=2&amp;updatesho' | raw }}{{ 'p=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/configure/shop/order-preferences/?setShopContext=s-2\">constructie.local</a>                    </div>
                                          <a class=\"multishop-modal-shop-view\" href=\"https://constructie.local/\" target=\"_blank\" rel=\"noreferrer\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
                                                          </li>
                                  <li class=\"multishop-modal-shop-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container\">
                        <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #d8ff1d;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=3&amp;updateshop=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/configure/shop/order-preferences/?setShopContext=s-3\">cortenwinkel.local</a>                    </div>
                                          <a class=\"multishop-modal-shop-view\" href=\"https://cortenwinkel.local/\" target=\"_blank\" rel=\"noreferrer\">Bekijk mijn winkel <i class=\"material-icons\">visibility</i></a>
                                                          </li>
                                  <li class=\"multishop-modal-shop-item multishop-modal-item\">
                                        <div class=\"multishop-modal-item-left\">
                      <span class=\"multishop-modal-color-container\">
  ' | raw }}{{ '                      <i class=\"material-icons\">check</i>
                        <a class=\"multishop-modal-color\" style=\"background-color: #00ff00;\" href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminShop&amp;shop_id=4&amp;updateshop=1\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Wijzig kleur\" data-original-title=\"\" title=\"\"></a>
                      </span>
                      <a class=\"multishop-modal-shop-name\" href=\"/admin-dev/index.php/configure/shop/order-preferences/?setShopContext=s-4\">cortenwinkel</a>                    </div>
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
                      <li class=\"breadcrumb-item\">Bestellingsinstellingen</li>
          
                  </ol>
      </nav>
    

    <div class=\"title-row\">
      
          <h1 class=\"title\">
            Order instellingen          </h1>
      

      
        <div class=\"toolbar-icons\">
          <div class=\"wrapper\">
            
                        
            
                              <a class=\"btn btn-outline-secondary btn-help btn-sidebar\" href=\"#\"
                   title=\"Help\"
                   data-toggle=\"sidebar\"
                   data-target=\"#right-sidebar\"
                   data-url=\"/admin-dev/index.php/common/sidebar/https%253A%252F%252Fhelp.prestashop-project.org%252Fnl%252Fdoc%252FAdminOrderPreferences%253Fversion%253D8.2.0%2526country%253Dnl/Help\"
               ' | raw }}{{ '    id=\"product_form_open_help\"
                >
                  Help
                </a>
                                    </div>
        </div>

      
    </div>
  </div>

  
      <div class=\"page-head-tabs\" id=\"head_tabs\">
      <ul class=\"nav nav-pills\">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <li class=\"nav-item\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php/configure/shop/order-preferences/\" id=\"subtab-AdminOrderPreferences\" class=\"nav-link tab active current\" data-submenu=\"86\">
                      Be' | raw }}{{ 'stellingsinstellingen
                      <span class=\"notification-container\">
                        <span class=\"notification-counter\"></span>
                      </span>
                    </a>
                  </li>
                                                                <li class=\"nav-item\">
                    <a href=\"https://ngrok.ijzershop-test.nl/admin-dev/index.php?controller=AdminStatuses\" id=\"subtab-AdminStatuses\" class=\"nav-link tab \" data-submenu=\"87\">
                      Statussen
                      <span class=\"notification-container\">
                        <span class=\"notification-counter\"></span>
                      </span>
                    </a>
                  </li>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </ul>
    </div>
  
  <div class=\"btn-floating\">
    <button class=\"btn btn-primary collapsed\" data-toggle=\"collapse\" data-target=\".btn-floating-container\" aria-expanded=\"false\">
      <i class=\"material-icons\">add</i>
    </button>
    <div class=\"btn-floating-container collapse\">
      <div class=\"btn-floating-menu\">
        
        
                              <a class=\"btn btn-floating-item btn-help btn-sidebar\" href=\"#\"
               title=\"Help\"
               data-toggle=\"sidebar\"
               data-target=\"#right-sidebar\"
               data-url=\"/admin-dev/index.php/common/sidebar/https%' | raw }}{{ '253A%252F%252Fhelp.prestashop-project.org%252Fnl%252Fdoc%252FAdminOrderPreferences%253Fversion%253D8.2.0%2526country%253Dnl/Help\"
            >
              Help
            </a>
                        </div>
    </div>
  </div>
  
</div>

<div id=\"main-div\">
          
      <div class=\"content-div  with-tabs\">

        

                                                        
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
</html>' | raw }}", "__string_template__ab79a7f5c5ec6d7475c88c67514bc005", "");
    }
}

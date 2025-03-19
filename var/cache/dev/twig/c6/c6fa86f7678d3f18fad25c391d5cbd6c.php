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

/* @Modules/msthemeconfig/views/templates/admin/view.html.twig */
class __TwigTemplate_9b2120b045dbaa35d9e151d6f3df0b3e extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->blocks = [
            'content' => [$this, 'block_content'],
            'javascripts' => [$this, 'block_javascripts'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 32
        return "@PrestaShop/Admin/layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@Modules/msthemeconfig/views/templates/admin/view.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@Modules/msthemeconfig/views/templates/admin/view.html.twig"));

        // line 26
        $context["use_regular_h1_structure"] = false;
        // line 28
        ob_start();
        // line 29
        echo "  ";
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/header.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 29)->display($context);
        $context["layoutTitle"] = ('' === $tmp = ob_get_clean()) ? '' : new Markup($tmp, $this->env->getCharset());
        // line 178
        $context["js_translatable"] = twig_array_merge(["The product was successfully added." => $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("The product was successfully added.", [], "Admin.Notifications.Success"), "The product was successfully removed." => $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("The product was successfully removed.", [], "Admin.Notifications.Success"), "[1] products were successfully added." => $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("[1] products were successfully added.", [], "Admin.Notifications.Success"), "[1] products were successfully removed." => $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("[1] products were successfully removed.", [], "Admin.Notifications.Success")],         // line 183
(isset($context["js_translatable"]) || array_key_exists("js_translatable", $context) ? $context["js_translatable"] : (function () { throw new RuntimeError('Variable "js_translatable" does not exist.', 183, $this->source); })()));
        // line 32
        $this->parent = $this->loadTemplate("@PrestaShop/Admin/layout.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 32);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 35
    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        // line 36
        echo "  <style type=\"text/css\">
    .customer_search_input{
      min-width: 600px;
    }
    .ui-menu.customer_search_input li{
      cursor: pointer;
    }
    .ui-menu.customer_search_input{
      background-color: #fff;
      list-style: none;
    }
  </style>

  <div id=\"order-view-page\"
       data-order-title=\"";
        // line 50
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Order", [], "Admin.Global"), "html", null, true);
        echo " #";
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 50, $this->source); })()), "id", [], "any", false, false, false, 50), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 50, $this->source); })()), "reference", [], "any", false, false, false, 50), "html", null, true);
        echo "\">
    <div class=\"row d-print-none\">
      ";
        // line 52
        $context["displayAdminOrderTopHookContent"] = $this->extensions['PrestaShopBundle\Twig\HookExtension']->renderHook("displayAdminOrderTop", ["id_order" => twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 52, $this->source); })()), "id", [], "any", false, false, false, 52)]);
        // line 53
        echo "
      ";
        // line 54
        if (((isset($context["displayAdminOrderTopHookContent"]) || array_key_exists("displayAdminOrderTopHookContent", $context) ? $context["displayAdminOrderTopHookContent"] : (function () { throw new RuntimeError('Variable "displayAdminOrderTopHookContent" does not exist.', 54, $this->source); })()) != "")) {
            // line 55
            echo "        <div class=\"col-md-12\">
          ";
            // line 56
            echo (isset($context["displayAdminOrderTopHookContent"]) || array_key_exists("displayAdminOrderTopHookContent", $context) ? $context["displayAdminOrderTopHookContent"] : (function () { throw new RuntimeError('Variable "displayAdminOrderTopHookContent" does not exist.', 56, $this->source); })());
            echo "
        </div>
      ";
        }
        // line 59
        echo "      <div class=\"order-actions w-100 navbar p-3\">
        ";
        // line 60
        $this->loadTemplate("@Modules/msthemeconfig/views/templates/admin/order_actions.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 60)->display($context);
        // line 61
        echo "      </div>
    </div>

    <div class=\"row d-none d-print-block mb-4\">
      <div class=\"col-md-12\">
        ";
        // line 66
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/print_order_statistics.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 66)->display($context);
        // line 67
        echo "      </div>
    </div>

    <div class=\"row mb-4\">
      <div class=\"col-12 d-none \" id=\"orderProductsModificationPosition\"></div>
    </div>

    <div class=\"row d-none d-print-block mb-4\">
      <div class=\"col-md-12\">
        ";
        // line 76
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/print_title.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 76)->display($context);
        // line 77
        echo "      </div>
    </div>

    <div class=\"product-row row\">
      <div class=\"col-md-4 left-column\">
        ";
        // line 82
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/customer.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 82)->display($context);
        // line 83
        echo "
        ";
        // line 84
        echo $this->extensions['PrestaShopBundle\Twig\HookExtension']->renderHook("displayAdminOrderSide", ["id_order" => twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 84, $this->source); })()), "id", [], "any", false, false, false, 84)]);
        echo "
        ";
        // line 85
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/messages.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 85)->display($context);
        // line 86
        echo "
        ";
        // line 87
        echo $this->extensions['PrestaShopBundle\Twig\HookExtension']->renderHook("displayAdminOrderSideBottom", ["id_order" => twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 87, $this->source); })()), "id", [], "any", false, false, false, 87)]);
        echo "
      </div>

      <div class=\"col-md-8 d-print-block right-column\">
        <div id=\"orderProductsOriginalPosition\">
          ";
        // line 92
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/products.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 92)->display($context);
        // line 93
        echo "        </div>
        ";
        // line 94
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/details.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 94)->display($context);
        // line 95
        echo "
        ";
        // line 96
        echo $this->extensions['PrestaShopBundle\Twig\HookExtension']->renderHook("displayAdminOrderMain", ["id_order" => twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 96, $this->source); })()), "id", [], "any", false, false, false, 96)]);
        echo "
        ";
        // line 97
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/payments.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 97)->display($context);
        // line 98
        echo "
        ";
        // line 99
        echo $this->extensions['PrestaShopBundle\Twig\HookExtension']->renderHook("displayAdminOrderMainBottom", ["id_order" => twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 99, $this->source); })()), "id", [], "any", false, false, false, 99)]);
        echo "
      </div>
    </div>

    ";
        // line 103
        if ( !twig_test_empty(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 103, $this->source); })()), "sources", [], "any", false, false, false, 103), "sources", [], "any", false, false, false, 103))) {
            // line 104
            echo "      <div class=\"product-row row\">
        <div class=\"col-md-12 left-column\">
          ";
            // line 106
            $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/sources.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 106)->display($context);
            // line 107
            echo "        </div>
      </div>
    ";
        }
        // line 110
        echo "
    ";
        // line 111
        if ( !twig_test_empty(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 111, $this->source); })()), "linkedOrders", [], "any", false, false, false, 111), "linkedOrders", [], "any", false, false, false, 111))) {
            // line 112
            echo "      ";
            $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/linked_orders.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 112)->display($context);
            // line 113
            echo "    ";
        }
        // line 114
        echo "
    ";
        // line 115
        echo $this->extensions['PrestaShopBundle\Twig\HookExtension']->renderHook("displayAdminOrder", ["id_order" => twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 115, $this->source); })()), "id", [], "any", false, false, false, 115)]);
        echo "

    ";
        // line 117
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/Modal/add_order_discount_modal.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 117)->display($context);
        // line 118
        echo "    ";
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/Modal/update_shipping_modal.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 118)->display($context);
        // line 119
        echo "    ";
        if (( !(null === twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 119, $this->source); })()), "customer", [], "any", false, false, false, 119)) && (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 119, $this->source); })()), "customer", [], "any", false, false, false, 119), "id", [], "any", false, false, false, 119) != 0))) {
            // line 120
            echo "      ";
            $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/Modal/update_customer_address_modal.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 120)->display($context);
            // line 121
            echo "    ";
        }
        // line 122
        echo "
    ";
        // line 123
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/Modal/view_all_messages_modal.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 123)->display($context);
        // line 124
        echo "    ";
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/Modal/view_product_pack_modal.html.twig", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", 124)->display($context);
        // line 125
        echo "  </div>
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    // line 128
    public function block_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        // line 129
        echo "  ";
        $this->displayParentBlock("javascripts", $context, $blocks);
        echo "

  <script src=\"";
        // line 131
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\AssetExtension']->getAssetUrl("themes/new-theme/public/order_view.bundle.js"), "html", null, true);
        echo "\"></script>

  <script type=\"text/javascript\">


    \$(document).ready(function(){
      \$('.total_amount_refund_checkbox').on('click', function(){
          let orderDetailId = \$(this).attr('data-id');
          let cancelElem = \$('#cancel_product_amount_'+orderDetailId);
          cancelElem.toggleClass('disabled');
          cancelElem.attr('readonly',!cancelElem.attr('readonly'));
      });



      \$('#selectCustomerToMigrate').autocomplete({
        \"classes\": {
          \"ui-autocomplete\": \"customer_search_input\"
        },
      \"minLength\":3,
        \"source\": function( request, response ) {
          \$.ajax( {
            method:'post',
            url: '/index.php?fc=module&module=msthemeconfig&controller=ajax',
            data: {
              action: 'search_customer',
              ajax: true,
              token: \"";
        // line 158
        echo twig_escape_filter($this->env, (isset($context["searchToken"]) || array_key_exists("searchToken", $context) ? $context["searchToken"] : (function () { throw new RuntimeError('Variable "searchToken" does not exist.', 158, $this->source); })()), "html", null, true);
        echo "\",
              list_limit: 15,
              customer_search: request.term,
            },
            success: function( data ) {
              let d = JSON.parse(data);
              response(\$.map(d.customers, function (value, key) {
                return {
                  label: value.fullname_and_email,
                  value: value.email + '#' + value.id_customer
                };
              }));
            }
          } );
        }
      });
    });
  </script>
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    public function getTemplateName()
    {
        return "@Modules/msthemeconfig/views/templates/admin/view.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  315 => 158,  285 => 131,  279 => 129,  269 => 128,  258 => 125,  255 => 124,  253 => 123,  250 => 122,  247 => 121,  244 => 120,  241 => 119,  238 => 118,  236 => 117,  231 => 115,  228 => 114,  225 => 113,  222 => 112,  220 => 111,  217 => 110,  212 => 107,  210 => 106,  206 => 104,  204 => 103,  197 => 99,  194 => 98,  192 => 97,  188 => 96,  185 => 95,  183 => 94,  180 => 93,  178 => 92,  170 => 87,  167 => 86,  165 => 85,  161 => 84,  158 => 83,  156 => 82,  149 => 77,  147 => 76,  136 => 67,  134 => 66,  127 => 61,  125 => 60,  122 => 59,  116 => 56,  113 => 55,  111 => 54,  108 => 53,  106 => 52,  97 => 50,  81 => 36,  71 => 35,  60 => 32,  58 => 183,  57 => 178,  53 => 29,  51 => 28,  49 => 26,  36 => 32,);
    }

    public function getSourceContext()
    {
        return new Source("{#**
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
 *#}

{% set use_regular_h1_structure = false %}

{% set layoutTitle %}
  {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/header.html.twig' %}
{% endset %}

{% extends '@PrestaShop/Admin/layout.html.twig' %}


{% block content %}
  <style type=\"text/css\">
    .customer_search_input{
      min-width: 600px;
    }
    .ui-menu.customer_search_input li{
      cursor: pointer;
    }
    .ui-menu.customer_search_input{
      background-color: #fff;
      list-style: none;
    }
  </style>

  <div id=\"order-view-page\"
       data-order-title=\"{{ 'Order'|trans({}, 'Admin.Global') }} #{{ orderForViewing.id }} {{ orderForViewing.reference }}\">
    <div class=\"row d-print-none\">
      {% set displayAdminOrderTopHookContent = renderhook('displayAdminOrderTop', {'id_order': orderForViewing.id}) %}

      {% if displayAdminOrderTopHookContent != '' %}
        <div class=\"col-md-12\">
          {{ displayAdminOrderTopHookContent|raw }}
        </div>
      {% endif %}
      <div class=\"order-actions w-100 navbar p-3\">
        {% include '@Modules/msthemeconfig/views/templates/admin/order_actions.html.twig' %}
      </div>
    </div>

    <div class=\"row d-none d-print-block mb-4\">
      <div class=\"col-md-12\">
        {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/print_order_statistics.html.twig' %}
      </div>
    </div>

    <div class=\"row mb-4\">
      <div class=\"col-12 d-none \" id=\"orderProductsModificationPosition\"></div>
    </div>

    <div class=\"row d-none d-print-block mb-4\">
      <div class=\"col-md-12\">
        {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/print_title.html.twig' %}
      </div>
    </div>

    <div class=\"product-row row\">
      <div class=\"col-md-4 left-column\">
        {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/customer.html.twig' %}

        {{ renderhook('displayAdminOrderSide', {'id_order': orderForViewing.id}) }}
        {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/messages.html.twig' %}

        {{ renderhook('displayAdminOrderSideBottom', {'id_order': orderForViewing.id}) }}
      </div>

      <div class=\"col-md-8 d-print-block right-column\">
        <div id=\"orderProductsOriginalPosition\">
          {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/products.html.twig' %}
        </div>
        {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/details.html.twig' %}

        {{ renderhook('displayAdminOrderMain', {'id_order': orderForViewing.id}) }}
        {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/payments.html.twig' %}

        {{ renderhook('displayAdminOrderMainBottom', {'id_order': orderForViewing.id}) }}
      </div>
    </div>

    {% if orderForViewing.sources.sources is not empty %}
      <div class=\"product-row row\">
        <div class=\"col-md-12 left-column\">
          {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/sources.html.twig' %}
        </div>
      </div>
    {% endif %}

    {% if orderForViewing.linkedOrders.linkedOrders is not empty %}
      {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/linked_orders.html.twig' %}
    {% endif %}

    {{ renderhook('displayAdminOrder', {'id_order': orderForViewing.id}) }}

    {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/Modal/add_order_discount_modal.html.twig' %}
    {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/Modal/update_shipping_modal.html.twig' %}
    {% if orderForViewing.customer is not null and orderForViewing.customer.id != 0 %}
      {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/Modal/update_customer_address_modal.html.twig' %}
    {% endif %}

    {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/Modal/view_all_messages_modal.html.twig' %}
    {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/Modal/view_product_pack_modal.html.twig' %}
  </div>
{% endblock %}

{% block javascripts %}
  {{ parent() }}

  <script src=\"{{ asset('themes/new-theme/public/order_view.bundle.js') }}\"></script>

  <script type=\"text/javascript\">


    \$(document).ready(function(){
      \$('.total_amount_refund_checkbox').on('click', function(){
          let orderDetailId = \$(this).attr('data-id');
          let cancelElem = \$('#cancel_product_amount_'+orderDetailId);
          cancelElem.toggleClass('disabled');
          cancelElem.attr('readonly',!cancelElem.attr('readonly'));
      });



      \$('#selectCustomerToMigrate').autocomplete({
        \"classes\": {
          \"ui-autocomplete\": \"customer_search_input\"
        },
      \"minLength\":3,
        \"source\": function( request, response ) {
          \$.ajax( {
            method:'post',
            url: '/index.php?fc=module&module=msthemeconfig&controller=ajax',
            data: {
              action: 'search_customer',
              ajax: true,
              token: \"{{ searchToken }}\",
              list_limit: 15,
              customer_search: request.term,
            },
            success: function( data ) {
              let d = JSON.parse(data);
              response(\$.map(d.customers, function (value, key) {
                return {
                  label: value.fullname_and_email,
                  value: value.email + '#' + value.id_customer
                };
              }));
            }
          } );
        }
      });
    });
  </script>
{% endblock %}

{% set js_translatable = {
  \"The product was successfully added.\": 'The product was successfully added.'|trans({}, 'Admin.Notifications.Success'),
  \"The product was successfully removed.\": 'The product was successfully removed.'|trans({}, 'Admin.Notifications.Success'),
  \"[1] products were successfully added.\": '[1] products were successfully added.'|trans({}, 'Admin.Notifications.Success'),
  \"[1] products were successfully removed.\": '[1] products were successfully removed.'|trans({}, 'Admin.Notifications.Success'),
}|merge(js_translatable)
%}
", "@Modules/msthemeconfig/views/templates/admin/view.html.twig", "C:\\wampserver\\www\\ijzershop8.local\\modules\\msthemeconfig\\views\\templates\\admin\\view.html.twig");
    }
}

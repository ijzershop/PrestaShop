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

/* @Modules/msthemeconfig/views/templates/admin/index.html.twig */
class __TwigTemplate_32c0b7ecd51c408227be18b228ba0508 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->blocks = [
            'content' => [$this, 'block_content'],
            'orders_kpi' => [$this, 'block_orders_kpi'],
            'order_grid_row' => [$this, 'block_order_grid_row'],
            'javascripts' => [$this, 'block_javascripts'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 26
        return "@PrestaShop/Admin/layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@Modules/msthemeconfig/views/templates/admin/index.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@Modules/msthemeconfig/views/templates/admin/index.html.twig"));

        $this->parent = $this->loadTemplate("@PrestaShop/Admin/layout.html.twig", "@Modules/msthemeconfig/views/templates/admin/index.html.twig", 26);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 28
    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        // line 29
        echo "  <input type=\"hidden\" id=\"employee-profile-id\" value=\"";
        echo twig_escape_filter($this->env, (isset($context["idProfile"]) || array_key_exists("idProfile", $context) ? $context["idProfile"] : (function () { throw new RuntimeError('Variable "idProfile" does not exist.', 29, $this->source); })()), "html", null, true);
        echo "\">
  <style type=\"text/css\">
    ";
        // line 31
        echo twig_escape_filter($this->env, (isset($context["extraStyling"]) || array_key_exists("extraStyling", $context) ? $context["extraStyling"] : (function () { throw new RuntimeError('Variable "extraStyling" does not exist.', 31, $this->source); })()), "html", null, true);
        echo "
  </style>

  <!-- Modal Trello Api Card create-->
  <div class=\"modal fade\" id=\"trelloModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"trelloModalLabel\">
    <div class=\"modal-dialog modal-lg\" role=\"document\">
      <div class=\"modal-content\">
        <div class=\"modal-header\">
          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>
          <h4 class=\"modal-title\" id=\"trelloModalLabel\">Nieuwe trello kaart aanmaken voor werkplaats werkzaamheid?</h4>
        </div>
        <div class=\"modal-body\">
          <input type=\"hidden\" id=\"trello_type\" value=\"\"/>
          <input type=\"hidden\" id=\"trello_order\" value=\"\"/>
          <div class=\"form-group\">
            Titel van de kaart
            <input type=\"text\" name=\"trello_card_title\" id=\"trello_card_title\" class=\"form-control\"/>
          </div>
          <div class=\"form-group\">
            Beschrijving van de kaart
            <textarea name=\"trello_card_descr\" id=\"trello_card_descr\" class=\"form-control\" rows=\"10\"></textarea>
          </div>
          <div class=\"form-group\">
            Kaart laan op werkplaats bord op trello
            <select name=\"trello_card_lane\" id=\"trello_card_lane\" class=\"form-control\">
              <option value=\"605614064ff5a60d98104cdc\" selected>Werkzaamheden Venusweg</option>
              <option value=\"6056142466bcab423fe5be3d\">Werkzaamheden Ceresweg</option>
              <option value=\"6056143bc967238904c8c195\">Uitvoering</option>
            </select>
          </div>
        </div>
        <div class=\"modal-footer\">
          <button type=\"button\" id=\"trelloActionClose\" class=\"btn btn-danger\" data-dismiss=\"modal\">Anuleren</button>
          <button type=\"button\" id=\"trelloActionOnlyStatus\" class=\"btn btn-primary\">Nee, alleen status omzetten</button>
          <button type=\"button\" id=\"trelloActionStatusAndCard\" class=\"btn btn-primary\">Ja, status omzetten en kaart aanmaken</button>
        </div>
      </div>
    </div>
  </div>


<!-- Modal Trello Api Card create-->
<div class=\"modal fade\" id=\"updateAddressModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"updateAddressModalLabel\">
  <div class=\"modal-dialog modal-lg\" role=\"document\">
    <div class=\"modal-content\">
      <div class=\"modal-header\">
        <h5 class=\"modal-title\" id=\"updateAddressModal\"></h5>
        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
          <span aria-hidden=\"true\">&times;</span>
        </button>
      </div>
      <div class=\"modal-body\">
      </div>
    </div>
  </div>
</div>


  ";
        // line 89
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/change_orders_status_modal.html.twig", "@Modules/msthemeconfig/views/templates/admin/index.html.twig", 89)->display($context);
        // line 90
        echo "
  ";
        // line 91
        $this->displayBlock('orders_kpi', $context, $blocks);
        // line 105
        echo "
  ";
        // line 106
        $this->displayBlock('order_grid_row', $context, $blocks);
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    // line 91
    public function block_orders_kpi($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "orders_kpi"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "orders_kpi"));

        // line 92
        echo "    <div class=\"row\">
      <div class=\"col-md-12\">
        <div class=\"\">
          <div class=\"orders-kpi\">
            ";
        // line 96
        echo $this->env->getRuntime('Symfony\Bridge\Twig\Extension\HttpKernelRuntime')->renderFragment(Symfony\Bridge\Twig\Extension\HttpKernelExtension::controller("PrestaShopBundle:Admin\\Common:renderKpiRow", ["kpiRow" =>         // line 98
(isset($context["orderKpi"]) || array_key_exists("orderKpi", $context) ? $context["orderKpi"] : (function () { throw new RuntimeError('Variable "orderKpi" does not exist.', 98, $this->source); })())]));
        // line 99
        echo "
          </div>
        </div>
      </div>
    </div>
  ";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    // line 106
    public function block_order_grid_row($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "order_grid_row"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "order_grid_row"));

        // line 107
        echo "    <div class=\"row\">
      <div class=\"col-12\">
        <button class=\"btn btn-lg btn-warning float-right\" id=\"dag-afsluiting\">Dagafsluiting Koopman Transmission</button>
      </div>
      <div class=\"col-12\">
        ";
        // line 112
        $this->loadTemplate("@PrestaShop/Admin/Common/Grid/grid_panel.html.twig", "@Modules/msthemeconfig/views/templates/admin/index.html.twig", 112)->display(twig_array_merge($context, ["grid" => (isset($context["orderGrid"]) || array_key_exists("orderGrid", $context) ? $context["orderGrid"] : (function () { throw new RuntimeError('Variable "orderGrid" does not exist.', 112, $this->source); })())]));
        // line 113
        echo "      </div>
    </div>
  ";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    // line 119
    public function block_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        // line 120
        echo "  <script type=\"text/javascript\">


    document.onkeydown = function (evt) {

      if(evt.code === 'Enter' ||
        evt.keyCode === 13){
        if(evt.target.id === 'order_reference' ||
          evt.target.id === 'order_customer' ||
          evt.target.id === 'order_email' ||
          evt.target.id === 'order_postcode' ||
          evt.target.id === 'order_total_paid_tax_incl' ||
          evt.target.id === 'order_payment' ||
          evt.target.id === 'order_date_add_from' ||
          evt.target.id === 'order_date_add_to' ||
          evt.target.id === 'order_osname'){
          document.querySelector(\"[name='order[actions][search]']\").click();
        } else {
          return false;
        }
      }
    };

  </script>

  ";
        // line 145
        $this->displayParentBlock("javascripts", $context, $blocks);
        echo "

  <script src=\"";
        // line 147
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\AssetExtension']->getAssetUrl("themes/default/js/bundle/pagination.js"), "html", null, true);
        echo "\"></script>
  <script src=\"";
        // line 148
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\AssetExtension']->getAssetUrl("themes/new-theme/public/order.bundle.js"), "html", null, true);
        echo "\"></script>
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    public function getTemplateName()
    {
        return "@Modules/msthemeconfig/views/templates/admin/index.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  269 => 148,  265 => 147,  260 => 145,  233 => 120,  223 => 119,  211 => 113,  209 => 112,  202 => 107,  192 => 106,  177 => 99,  175 => 98,  174 => 96,  168 => 92,  158 => 91,  148 => 106,  145 => 105,  143 => 91,  140 => 90,  138 => 89,  77 => 31,  71 => 29,  61 => 28,  38 => 26,);
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

{% extends '@PrestaShop/Admin/layout.html.twig' %}

{% block content %}
  <input type=\"hidden\" id=\"employee-profile-id\" value=\"{{ idProfile }}\">
  <style type=\"text/css\">
    {{ extraStyling }}
  </style>

  <!-- Modal Trello Api Card create-->
  <div class=\"modal fade\" id=\"trelloModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"trelloModalLabel\">
    <div class=\"modal-dialog modal-lg\" role=\"document\">
      <div class=\"modal-content\">
        <div class=\"modal-header\">
          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>
          <h4 class=\"modal-title\" id=\"trelloModalLabel\">Nieuwe trello kaart aanmaken voor werkplaats werkzaamheid?</h4>
        </div>
        <div class=\"modal-body\">
          <input type=\"hidden\" id=\"trello_type\" value=\"\"/>
          <input type=\"hidden\" id=\"trello_order\" value=\"\"/>
          <div class=\"form-group\">
            Titel van de kaart
            <input type=\"text\" name=\"trello_card_title\" id=\"trello_card_title\" class=\"form-control\"/>
          </div>
          <div class=\"form-group\">
            Beschrijving van de kaart
            <textarea name=\"trello_card_descr\" id=\"trello_card_descr\" class=\"form-control\" rows=\"10\"></textarea>
          </div>
          <div class=\"form-group\">
            Kaart laan op werkplaats bord op trello
            <select name=\"trello_card_lane\" id=\"trello_card_lane\" class=\"form-control\">
              <option value=\"605614064ff5a60d98104cdc\" selected>Werkzaamheden Venusweg</option>
              <option value=\"6056142466bcab423fe5be3d\">Werkzaamheden Ceresweg</option>
              <option value=\"6056143bc967238904c8c195\">Uitvoering</option>
            </select>
          </div>
        </div>
        <div class=\"modal-footer\">
          <button type=\"button\" id=\"trelloActionClose\" class=\"btn btn-danger\" data-dismiss=\"modal\">Anuleren</button>
          <button type=\"button\" id=\"trelloActionOnlyStatus\" class=\"btn btn-primary\">Nee, alleen status omzetten</button>
          <button type=\"button\" id=\"trelloActionStatusAndCard\" class=\"btn btn-primary\">Ja, status omzetten en kaart aanmaken</button>
        </div>
      </div>
    </div>
  </div>


<!-- Modal Trello Api Card create-->
<div class=\"modal fade\" id=\"updateAddressModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"updateAddressModalLabel\">
  <div class=\"modal-dialog modal-lg\" role=\"document\">
    <div class=\"modal-content\">
      <div class=\"modal-header\">
        <h5 class=\"modal-title\" id=\"updateAddressModal\"></h5>
        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
          <span aria-hidden=\"true\">&times;</span>
        </button>
      </div>
      <div class=\"modal-body\">
      </div>
    </div>
  </div>
</div>


  {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/change_orders_status_modal.html.twig' %}

  {% block orders_kpi %}
    <div class=\"row\">
      <div class=\"col-md-12\">
        <div class=\"\">
          <div class=\"orders-kpi\">
            {{ render(controller(
              'PrestaShopBundle:Admin\\\\Common:renderKpiRow',
              { 'kpiRow': orderKpi }
            )) }}
          </div>
        </div>
      </div>
    </div>
  {% endblock %}

  {% block order_grid_row %}
    <div class=\"row\">
      <div class=\"col-12\">
        <button class=\"btn btn-lg btn-warning float-right\" id=\"dag-afsluiting\">Dagafsluiting Koopman Transmission</button>
      </div>
      <div class=\"col-12\">
        {% include '@PrestaShop/Admin/Common/Grid/grid_panel.html.twig' with {'grid': orderGrid} %}
      </div>
    </div>
  {% endblock %}
{% endblock %}


{% block javascripts %}
  <script type=\"text/javascript\">


    document.onkeydown = function (evt) {

      if(evt.code === 'Enter' ||
        evt.keyCode === 13){
        if(evt.target.id === 'order_reference' ||
          evt.target.id === 'order_customer' ||
          evt.target.id === 'order_email' ||
          evt.target.id === 'order_postcode' ||
          evt.target.id === 'order_total_paid_tax_incl' ||
          evt.target.id === 'order_payment' ||
          evt.target.id === 'order_date_add_from' ||
          evt.target.id === 'order_date_add_to' ||
          evt.target.id === 'order_osname'){
          document.querySelector(\"[name='order[actions][search]']\").click();
        } else {
          return false;
        }
      }
    };

  </script>

  {{ parent() }}

  <script src=\"{{ asset('themes/default/js/bundle/pagination.js') }}\"></script>
  <script src=\"{{ asset('themes/new-theme/public/order.bundle.js') }}\"></script>
{% endblock %}
", "@Modules/msthemeconfig/views/templates/admin/index.html.twig", "C:\\wampserver\\www\\ijzershop8.local\\modules\\msthemeconfig\\views\\templates\\admin\\index.html.twig");
    }
}

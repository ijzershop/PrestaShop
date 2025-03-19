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

/* @Modules/ps_mbo/views/templates/admin/controllers/module_catalog/catalog.html.twig */
class __TwigTemplate_982676302bb010483d0508ed1567ce2b extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->blocks = [
            'javascripts' => [$this, 'block_javascripts'],
            'stylesheets' => [$this, 'block_stylesheets'],
            'content' => [$this, 'block_content'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 19
        return "@PrestaShop/Admin/Module/common.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@Modules/ps_mbo/views/templates/admin/controllers/module_catalog/catalog.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@Modules/ps_mbo/views/templates/admin/controllers/module_catalog/catalog.html.twig"));

        $this->parent = $this->loadTemplate("@PrestaShop/Admin/Module/common.html.twig", "@Modules/ps_mbo/views/templates/admin/controllers/module_catalog/catalog.html.twig", 19);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 21
    public function block_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        // line 22
        echo "    ";
        $this->displayParentBlock("javascripts", $context, $blocks);
        echo "
    <script type=\"application/javascript\" src=\"";
        // line 23
        echo twig_escape_filter($this->env, (isset($context["cdc_error_templating_url"]) || array_key_exists("cdc_error_templating_url", $context) ? $context["cdc_error_templating_url"] : (function () { throw new RuntimeError('Variable "cdc_error_templating_url" does not exist.', 23, $this->source); })()), "html", null, true);
        echo "\"></script>

    ";
        // line 25
        if ((array_key_exists("cdc_script_not_found", $context) && ((isset($context["cdc_script_not_found"]) || array_key_exists("cdc_script_not_found", $context) ? $context["cdc_script_not_found"] : (function () { throw new RuntimeError('Variable "cdc_script_not_found" does not exist.', 25, $this->source); })()) === true))) {
            // line 26
            echo "      <script type=\"application/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["cdc_error_url"]) || array_key_exists("cdc_error_url", $context) ? $context["cdc_error_url"] : (function () { throw new RuntimeError('Variable "cdc_error_url" does not exist.', 26, $this->source); })()), "html", null, true);
            echo "\"></script>
    ";
        } else {
            // line 28
            echo "      <script type=\"application/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["cdc_url"]) || array_key_exists("cdc_url", $context) ? $context["cdc_url"] : (function () { throw new RuntimeError('Variable "cdc_url" does not exist.', 28, $this->source); })()), "html", null, true);
            echo "\"></script>
    ";
        }
        // line 30
        echo "
    <script>
      var psAccountLoaded = false;
    </script>
    ";
        // line 34
        if ((array_key_exists("urlAccountsCdn", $context) &&  !twig_test_empty((isset($context["urlAccountsCdn"]) || array_key_exists("urlAccountsCdn", $context) ? $context["urlAccountsCdn"] : (function () { throw new RuntimeError('Variable "urlAccountsCdn" does not exist.', 34, $this->source); })())))) {
            // line 35
            echo "      ";
            // line 36
            echo "      <script src=\"";
            echo twig_escape_filter($this->env, (isset($context["urlAccountsCdn"]) || array_key_exists("urlAccountsCdn", $context) ? $context["urlAccountsCdn"] : (function () { throw new RuntimeError('Variable "urlAccountsCdn" does not exist.', 36, $this->source); })()), "html", null, true);
            echo "\" rel=preload></script>
      <script>
        if (window?.psaccountsVue) {
          window?.psaccountsVue?.init();
          psAccountLoaded = true;
        }
      </script>
    ";
        }
        // line 44
        echo "
    <script>
      if (typeof window.mboCdc == undefined || typeof window.mboCdc == \"undefined\") {
        if (typeof renderCdcError === 'function') {
          window.\$(document).ready(function() {
            renderCdcError(\$('#cdc-container'));
          });
        }
      } else {
        const renderModules = window.mboCdc.renderModules

        const context = ";
        // line 55
        echo json_encode((isset($context["shop_context"]) || array_key_exists("shop_context", $context) ? $context["shop_context"] : (function () { throw new RuntimeError('Variable "shop_context" does not exist.', 55, $this->source); })()));
        echo ";

        if (psAccountLoaded) {
          context.accounts_component_loaded = true;
        }

        renderModules(context, '#cdc-container')
      }
    </script>
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    // line 66
    public function block_stylesheets($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "stylesheets"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "stylesheets"));

        // line 67
        echo "  ";
        $this->displayParentBlock("stylesheets", $context, $blocks);
        echo "
  <link rel=\"stylesheet\" href=\"";
        // line 68
        echo twig_escape_filter($this->env, (isset($context["cdc_error_templating_css"]) || array_key_exists("cdc_error_templating_css", $context) ? $context["cdc_error_templating_css"] : (function () { throw new RuntimeError('Variable "cdc_error_templating_css" does not exist.', 68, $this->source); })()), "html", null, true);
        echo "\" type=\"text/css\" media=\"all\">
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    // line 71
    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        // line 72
        echo "  <prestashop-accounts style=\"display: none;\"></prestashop-accounts>

  <div class=\"mbo-catalog-wrapper cdc-container\" id=\"cdc-container\" data-error-path=\"";
        // line 74
        echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("admin_mbo_module_cdc_error");
        echo "\"></div>

    ";
        // line 76
        $this->loadTemplate("@Modules/ps_mbo/views/templates/admin/controllers/module_catalog/includes/modal_import.html.twig", "@Modules/ps_mbo/views/templates/admin/controllers/module_catalog/catalog.html.twig", 76)->display(twig_array_merge($context, ["level" => (isset($context["level"]) || array_key_exists("level", $context) ? $context["level"] : (function () { throw new RuntimeError('Variable "level" does not exist.', 76, $this->source); })()), "errorMessage" => (isset($context["errorMessage"]) || array_key_exists("errorMessage", $context) ? $context["errorMessage"] : (function () { throw new RuntimeError('Variable "errorMessage" does not exist.', 76, $this->source); })())]));
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    public function getTemplateName()
    {
        return "@Modules/ps_mbo/views/templates/admin/controllers/module_catalog/catalog.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  195 => 76,  190 => 74,  186 => 72,  176 => 71,  164 => 68,  159 => 67,  149 => 66,  129 => 55,  116 => 44,  104 => 36,  102 => 35,  100 => 34,  94 => 30,  88 => 28,  82 => 26,  80 => 25,  75 => 23,  70 => 22,  60 => 21,  37 => 19,);
    }

    public function getSourceContext()
    {
        return new Source("{#**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 *#}
{% extends '@PrestaShop/Admin/Module/common.html.twig' %}

{% block javascripts %}
    {{ parent() }}
    <script type=\"application/javascript\" src=\"{{ cdc_error_templating_url }}\"></script>

    {% if cdc_script_not_found is defined and cdc_script_not_found is same as(true) %}
      <script type=\"application/javascript\" src=\"{{ cdc_error_url }}\"></script>
    {% else %}
      <script type=\"application/javascript\" src=\"{{ cdc_url }}\"></script>
    {% endif %}

    <script>
      var psAccountLoaded = false;
    </script>
    {% if urlAccountsCdn is defined and urlAccountsCdn is not empty %}
      {# PrestaShop Account #}
      <script src=\"{{ urlAccountsCdn }}\" rel=preload></script>
      <script>
        if (window?.psaccountsVue) {
          window?.psaccountsVue?.init();
          psAccountLoaded = true;
        }
      </script>
    {% endif %}

    <script>
      if (typeof window.mboCdc == undefined || typeof window.mboCdc == \"undefined\") {
        if (typeof renderCdcError === 'function') {
          window.\$(document).ready(function() {
            renderCdcError(\$('#cdc-container'));
          });
        }
      } else {
        const renderModules = window.mboCdc.renderModules

        const context = {{ shop_context|json_encode()|raw }};

        if (psAccountLoaded) {
          context.accounts_component_loaded = true;
        }

        renderModules(context, '#cdc-container')
      }
    </script>
{% endblock %}

{% block stylesheets %}
  {{ parent() }}
  <link rel=\"stylesheet\" href=\"{{ cdc_error_templating_css }}\" type=\"text/css\" media=\"all\">
{% endblock %}

{% block content %}
  <prestashop-accounts style=\"display: none;\"></prestashop-accounts>

  <div class=\"mbo-catalog-wrapper cdc-container\" id=\"cdc-container\" data-error-path=\"{{ path('admin_mbo_module_cdc_error') }}\"></div>

    {% include '@Modules/ps_mbo/views/templates/admin/controllers/module_catalog/includes/modal_import.html.twig' with { 'level' : level, 'errorMessage' : errorMessage } %}
{% endblock %}
", "@Modules/ps_mbo/views/templates/admin/controllers/module_catalog/catalog.html.twig", "C:\\wampserver\\www\\ijzershop8.local\\modules\\ps_mbo\\views\\templates\\admin\\controllers\\module_catalog\\catalog.html.twig");
    }
}

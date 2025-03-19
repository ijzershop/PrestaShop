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

/* @Modules/msthemeconfig/views/PrestaShop/Admin/Common/Grid/Columns/Content/koopman_buttons.html.twig */
class __TwigTemplate_77f49a185760f07432a0a5d76260c70f extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@Modules/msthemeconfig/views/PrestaShop/Admin/Common/Grid/Columns/Content/koopman_buttons.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@Modules/msthemeconfig/views/PrestaShop/Admin/Common/Grid/Columns/Content/koopman_buttons.html.twig"));

        // line 1
        if (((twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 1, $this->source); })()), "carrier", [], "any", false, false, false, 1) === twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 1, $this->source); })()), "options", [], "any", false, false, false, 1), "stateCarrier", [], "any", false, false, false, 1), "shipping", [], "any", false, false, false, 1)) || (twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 1, $this->source); })()), "carrier", [], "any", false, false, false, 1) === twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 1, $this->source); })()), "options", [], "any", false, false, false, 1), "stateCarrier", [], "any", false, false, false, 1), "added", [], "any", false, false, false, 1)))) {
            // line 2
            echo "  ";
            // line 3
            echo "  <button type=\"button\" class=\"btn btn-primary print-button ";
            if ((twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 3, $this->source); })()), "total_order_weight", [], "any", false, false, false, 3) > 115)) {
                echo " disabled ";
            }
            echo "\"
          ";
            // line 4
            if ((twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 4, $this->source); })()), "total_order_weight", [], "any", false, false, false, 4) > 115)) {
                echo "disabled";
            }
            echo " data-order=\"";
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 4, $this->source); })()), "id_order", [], "any", false, false, false, 4), "html", null, true);
            echo "\"><img
      src=\"/upload/print-sharp-thin.svg\" alt=\"Collie\"></button>
  ";
            // line 7
            echo "  <div class=\"btn-group dropleft\">
    <button class=\"btn btn-primary dropdown-toggle dropdown-pallet-button dropleft\" type=\"button\" id=\"dropdownPalletMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">
      <img
        src=\"/upload/forklift-thin.svg\" alt=\"Pallet Label\">
    </button>
    <div class=\"dropdown-menu\" aria-labelledby=\"dropdownPalletMenuButton\">
      <a class=\"dropdown-item\" href=\"javascript:void(0)\">X</a>
      <a class=\"dropdown-item standaard-pallet-button\" data-order=\"";
            // line 14
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 14, $this->source); })()), "id_order", [], "any", false, false, false, 14), "html", null, true);
            echo "\" href=\"#\">Standaard</a>
      <a class=\"dropdown-item plaat-pallet-button\" data-order=\"";
            // line 15
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 15, $this->source); })()), "id_order", [], "any", false, false, false, 15), "html", null, true);
            echo "\" href=\"#\">Plaat</a>
      <a class=\"dropdown-item balk-pallet-button\" data-order=\"";
            // line 16
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 16, $this->source); })()), "id_order", [], "any", false, false, false, 16), "html", null, true);
            echo "\" href=\"#\">Balk</a>
    </div>
  </div>
";
        }
        // line 20
        echo "  ";
        // line 21
        echo "  ";
        // line 22
        echo "  ";
        if ((twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 22, $this->source); })()), "carrier", [], "any", false, false, false, 22) === twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 22, $this->source); })()), "options", [], "any", false, false, false, 22), "stateCarrier", [], "any", false, false, false, 22), "pickup", [], "any", false, false, false, 22))) {
            // line 23
            echo "    ";
            // line 24
            echo "    ";
            if ( !(twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 24, $this->source); })()), "current_state", [], "any", false, false, false, 24) === twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 24, $this->source); })()), "options", [], "any", false, false, false, 24), "stateType", [], "any", false, false, false, 24), "pickup", [], "any", false, false, false, 24))) {
                // line 25
                echo "      ";
                // line 26
                echo "      <div class=\"cc-koopman aftehalen-btn btn text-dark\" data-order=\"";
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 26, $this->source); })()), "id_order", [], "any", false, false, false, 26), "html", null, true);
                echo "\" title=\"Af te halen\">
        <input id=\"aftehalen_";
                // line 27
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 27, $this->source); })()), "id_order", [], "any", false, false, false, 27), "html", null, true);
                echo "\" type=\"radio\" name=\"af-halen-pakket\" value=\"aftehalen\"/>
        <label class=\"type-cc w-100 aftehalen\" for=\"aftehalen_";
                // line 28
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 28, $this->source); })()), "id_order", [], "any", false, false, false, 28), "html", null, true);
                echo "\">Afhalen</label>
      </div>
    ";
            } else {
                // line 31
                echo "      <div class=\"cc-koopman  afgehaald-btn btn\" data-order=\"";
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 31, $this->source); })()), "id_order", [], "any", false, false, false, 31), "html", null, true);
                echo "\" title=\"Afgehaald\">
        <input id=\"afgehaald_";
                // line 32
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 32, $this->source); })()), "id_order", [], "any", false, false, false, 32), "html", null, true);
                echo "\" type=\"radio\" name=\"afgehaald-pakket\" value=\"afgehaald\"/>
        <label class=\"type-cc w-100 afgehaald\" for=\"afgehaald_";
                // line 33
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 33, $this->source); })()), "id_order", [], "any", false, false, false, 33), "html", null, true);
                echo "\">Opgehaald</label>
      </div>
    ";
            }
            // line 36
            echo "  ";
        }
        // line 37
        echo "  ";
        // line 38
        echo "  ";
        if ((twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 38, $this->source); })()), "carrier", [], "any", false, false, false, 38) === twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 38, $this->source); })()), "options", [], "any", false, false, false, 38), "stateCarrier", [], "any", false, false, false, 38), "added", [], "any", false, false, false, 38))) {
            // line 40
            echo "    ";
            if (!twig_in_filter(twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 40, $this->source); })()), "current_state", [], "any", false, false, false, 40), twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 40, $this->source); })()), "options", [], "any", false, false, false, 40), "stateType", [], "any", false, false, false, 40), "added", [], "any", false, false, false, 40))) {
                // line 41
                echo "      <div class=\"cc-koopman toegevoegd-btn btn\" data-order=\"";
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 41, $this->source); })()), "id_order", [], "any", false, false, false, 41), "html", null, true);
                echo "\" title=\"Toegevoegd\">
        <input id=\"toegevoegd_";
                // line 42
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 42, $this->source); })()), "id_order", [], "any", false, false, false, 42), "html", null, true);
                echo "\" type=\"radio\" name=\"toegevoegd-aan-pakket\" value=\"toegevoegd\"/>
        <label class=\"type-cc w-100 toegevoegd\" for=\"toegevoegd_";
                // line 43
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 43, $this->source); })()), "id_order", [], "any", false, false, false, 43), "html", null, true);
                echo "\">Toegevoegd</label>
      </div>
    ";
            }
            // line 46
            echo "  ";
        }
        // line 47
        echo "  ";
        // line 48
        echo "  ";
        // line 49
        echo "  ";
        if ( !(twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 49, $this->source); })()), "current_state", [], "any", false, false, false, 49) === twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 49, $this->source); })()), "options", [], "any", false, false, false, 49), "stateType", [], "any", false, false, false, 49), "waiting", [], "any", false, false, false, 49))) {
            // line 50
            echo "    <div class=\"cc-koopman backorder-btn btn\"
         data-order=\"";
            // line 51
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 51, $this->source); })()), "id_order", [], "any", false, false, false, 51), "html", null, true);
            echo "\" title=\"Status wijzigen naar achtend op vooraad\">
      <input id=\"backorder_";
            // line 52
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 52, $this->source); })()), "id_order", [], "any", false, false, false, 52), "html", null, true);
            echo "\" type=\"radio\" name=\"backorder-pakket\" value=\"backorder\"/>
      <label class=\"type-cc backorder\" for=\"backorder_";
            // line 53
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 53, $this->source); })()), "id_order", [], "any", false, false, false, 53), "html", null, true);
            echo "\">
        Hold
      </label>
    </div>
  ";
        }
        // line 58
        echo "  ";
        // line 59
        echo "  ";
        // line 60
        echo "  ";
        if ( !(twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 60, $this->source); })()), "current_state", [], "any", false, false, false, 60) === twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 60, $this->source); })()), "options", [], "any", false, false, false, 60), "stateType", [], "any", false, false, false, 60), "workshop", [], "any", false, false, false, 60))) {
            // line 61
            echo "    <div data-toggle=\"modal\" data-target=\"#trelloModal\" class=\"cc-koopman workshop-btn btn\"
         data-order=\"";
            // line 62
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 62, $this->source); })()), "id_order", [], "any", false, false, false, 62), "html", null, true);
            echo "\" title=\"Status wijzigen naar werkplaats\">
      <input id=\"workshop_";
            // line 63
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 63, $this->source); })()), "id_order", [], "any", false, false, false, 63), "html", null, true);
            echo "\" type=\"radio\" name=\"workshop-pakket\" value=\"workshop\"/>
      <label class=\"type-cc workshop\" for=\"workshop_";
            // line 64
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 64, $this->source); })()), "id_order", [], "any", false, false, false, 64), "html", null, true);
            echo "\">
        Werkplaats
      </label>
    </div>
  ";
        }
        // line 69
        echo "  ";
        // line 70
        echo "  ";
        if ( !(twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 70, $this->source); })()), "current_state", [], "any", false, false, false, 70) === twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 70, $this->source); })()), "options", [], "any", false, false, false, 70), "stateType", [], "any", false, false, false, 70), "shipping", [], "any", false, false, false, 70))) {
            // line 71
            echo "    <div class=\"cc-koopman beingprepared-btn btn btn-warning\"
         data-order=\"";
            // line 72
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 72, $this->source); })()), "id_order", [], "any", false, false, false, 72), "html", null, true);
            echo "\" title=\"Status wijzigen naar word voorbereid\">
      <input id=\"beingprepared_";
            // line 73
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 73, $this->source); })()), "id_order", [], "any", false, false, false, 73), "html", null, true);
            echo "\" type=\"radio\" name=\"beingprepared-pakket\" value=\"beingprepared\"/>
      <label class=\"type-cc beingprepared\" for=\"beingprepared_";
            // line 74
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 74, $this->source); })()), "id_order", [], "any", false, false, false, 74), "html", null, true);
            echo "\">
        In Behandeling
      </label>
    </div>
  ";
        }
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    public function getTemplateName()
    {
        return "@Modules/msthemeconfig/views/PrestaShop/Admin/Common/Grid/Columns/Content/koopman_buttons.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  228 => 74,  224 => 73,  220 => 72,  217 => 71,  214 => 70,  212 => 69,  204 => 64,  200 => 63,  196 => 62,  193 => 61,  190 => 60,  188 => 59,  186 => 58,  178 => 53,  174 => 52,  170 => 51,  167 => 50,  164 => 49,  162 => 48,  160 => 47,  157 => 46,  151 => 43,  147 => 42,  142 => 41,  139 => 40,  136 => 38,  134 => 37,  131 => 36,  125 => 33,  121 => 32,  116 => 31,  110 => 28,  106 => 27,  101 => 26,  99 => 25,  96 => 24,  94 => 23,  91 => 22,  89 => 21,  87 => 20,  80 => 16,  76 => 15,  72 => 14,  63 => 7,  54 => 4,  47 => 3,  45 => 2,  43 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("{% if record.carrier is same as column.options.stateCarrier.shipping or record.carrier is same as column.options.stateCarrier.added %}
  {# collie label button #}
  <button type=\"button\" class=\"btn btn-primary print-button {% if record.total_order_weight > 115 %} disabled {% endif %}\"
          {% if record.total_order_weight > 115 %}disabled{% endif %} data-order=\"{{ record.id_order }}\"><img
      src=\"/upload/print-sharp-thin.svg\" alt=\"Collie\"></button>
  {# Pallet label button #}
  <div class=\"btn-group dropleft\">
    <button class=\"btn btn-primary dropdown-toggle dropdown-pallet-button dropleft\" type=\"button\" id=\"dropdownPalletMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">
      <img
        src=\"/upload/forklift-thin.svg\" alt=\"Pallet Label\">
    </button>
    <div class=\"dropdown-menu\" aria-labelledby=\"dropdownPalletMenuButton\">
      <a class=\"dropdown-item\" href=\"javascript:void(0)\">X</a>
      <a class=\"dropdown-item standaard-pallet-button\" data-order=\"{{ record.id_order }}\" href=\"#\">Standaard</a>
      <a class=\"dropdown-item plaat-pallet-button\" data-order=\"{{ record.id_order }}\" href=\"#\">Plaat</a>
      <a class=\"dropdown-item balk-pallet-button\" data-order=\"{{ record.id_order }}\" href=\"#\">Balk</a>
    </div>
  </div>
{% endif %}
  {#  Status buttons #}
  {#     Pickup Carrier #}
  {% if record.carrier is same as column.options.stateCarrier.pickup %}
    {#  Afgehaald State  #}
    {% if record.current_state is not same as column.options.stateType.pickup %}
      {#  Af te halen State  #}
      <div class=\"cc-koopman aftehalen-btn btn text-dark\" data-order=\"{{ record.id_order }}\" title=\"Af te halen\">
        <input id=\"aftehalen_{{ record.id_order }}\" type=\"radio\" name=\"af-halen-pakket\" value=\"aftehalen\"/>
        <label class=\"type-cc w-100 aftehalen\" for=\"aftehalen_{{ record.id_order }}\">Afhalen</label>
      </div>
    {% else %}
      <div class=\"cc-koopman  afgehaald-btn btn\" data-order=\"{{ record.id_order }}\" title=\"Afgehaald\">
        <input id=\"afgehaald_{{ record.id_order }}\" type=\"radio\" name=\"afgehaald-pakket\" value=\"afgehaald\"/>
        <label class=\"type-cc w-100 afgehaald\" for=\"afgehaald_{{ record.id_order }}\">Opgehaald</label>
      </div>
    {% endif %}
  {% endif %}
  {# Toevoegen button #}
  {% if record.carrier is same as column.options.stateCarrier.added %}
{#      Toevoegen State#}
    {% if record.current_state not in column.options.stateType.added %}
      <div class=\"cc-koopman toegevoegd-btn btn\" data-order=\"{{ record.id_order }}\" title=\"Toegevoegd\">
        <input id=\"toegevoegd_{{ record.id_order }}\" type=\"radio\" name=\"toegevoegd-aan-pakket\" value=\"toegevoegd\"/>
        <label class=\"type-cc w-100 toegevoegd\" for=\"toegevoegd_{{ record.id_order }}\">Toegevoegd</label>
      </div>
    {% endif %}
  {% endif %}
  {# backorder button #}
  {#  Backorder Waiting State  #}
  {% if record.current_state is not same as column.options.stateType.waiting %}
    <div class=\"cc-koopman backorder-btn btn\"
         data-order=\"{{ record.id_order }}\" title=\"Status wijzigen naar achtend op vooraad\">
      <input id=\"backorder_{{ record.id_order }}\" type=\"radio\" name=\"backorder-pakket\" value=\"backorder\"/>
      <label class=\"type-cc backorder\" for=\"backorder_{{ record.id_order }}\">
        Hold
      </label>
    </div>
  {% endif %}
  {# Toevoegen button #}
  {#  Send to Workshop State  #}
  {% if record.current_state is not same as column.options.stateType.workshop %}
    <div data-toggle=\"modal\" data-target=\"#trelloModal\" class=\"cc-koopman workshop-btn btn\"
         data-order=\"{{ record.id_order }}\" title=\"Status wijzigen naar werkplaats\">
      <input id=\"workshop_{{ record.id_order }}\" type=\"radio\" name=\"workshop-pakket\" value=\"workshop\"/>
      <label class=\"type-cc workshop\" for=\"workshop_{{ record.id_order }}\">
        Werkplaats
      </label>
    </div>
  {% endif %}
  {#  Being prepared State  #}
  {% if record.current_state is not same as column.options.stateType.shipping %}
    <div class=\"cc-koopman beingprepared-btn btn btn-warning\"
         data-order=\"{{ record.id_order }}\" title=\"Status wijzigen naar word voorbereid\">
      <input id=\"beingprepared_{{ record.id_order }}\" type=\"radio\" name=\"beingprepared-pakket\" value=\"beingprepared\"/>
      <label class=\"type-cc beingprepared\" for=\"beingprepared_{{ record.id_order }}\">
        In Behandeling
      </label>
    </div>
  {% endif %}
", "@Modules/msthemeconfig/views/PrestaShop/Admin/Common/Grid/Columns/Content/koopman_buttons.html.twig", "C:\\wampserver\\www\\ijzershop8.local\\modules\\msthemeconfig\\views\\PrestaShop\\Admin\\Common\\Grid\\Columns\\Content\\koopman_buttons.html.twig");
    }
}

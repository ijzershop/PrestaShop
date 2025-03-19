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

/* @PrestaShop/Admin/Common/Grid/Actions/Row/shipping_state_action.html.twig */
class __TwigTemplate_0ee25663aa0480593b46c5efacfd7309 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Common/Grid/Actions/Row/shipping_state_action.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Common/Grid/Actions/Row/shipping_state_action.html.twig"));

        // line 2
        echo " ";
        if (twig_in_filter(twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 2, $this->source); })()), "current_state", [], "any", false, false, false, 2), twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["action"]) || array_key_exists("action", $context) ? $context["action"] : (function () { throw new RuntimeError('Variable "action" does not exist.', 2, $this->source); })()), "options", [], "any", false, false, false, 2), "acceptedStates", [], "any", false, false, false, 2))) {
            // line 3
            echo "
  <button type=\"button\"
          class=\"btn tooltip-link js-link-row-action dropdown-item inline-dropdown-item showShippingState\"
          data-order-id=\"";
            // line 6
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 6, $this->source); })()), "id_order", [], "any", false, false, false, 6), "html", null, true);
            echo "\"
          data-order-reference=\"";
            // line 7
            if ((twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 7, $this->source); })()), "added_to_order", [], "any", false, false, false, 7) == "")) {
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 7, $this->source); })()), "reference", [], "any", false, false, false, 7), "html", null, true);
            } else {
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 7, $this->source); })()), "added_to_order", [], "any", false, false, false, 7), "html", null, true);
            }
            echo "\"
          data-order-added-reference=\"";
            // line 8
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 8, $this->source); })()), "added_to_order", [], "any", false, false, false, 8), "html", null, true);
            echo "\"
          data-toggle=\"pstooltip\"
          data-placement=\"top\"
          data-original-title=\"";
            // line 11
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["action"]) || array_key_exists("action", $context) ? $context["action"] : (function () { throw new RuntimeError('Variable "action" does not exist.', 11, $this->source); })()), "options", [], "any", false, false, false, 11), "label", [], "any", false, false, false, 11), "html", null, true);
            echo "\">
    <span class=\"material-icons\">schedule_send</span>
  </button>
";
        }
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    public function getTemplateName()
    {
        return "@PrestaShop/Admin/Common/Grid/Actions/Row/shipping_state_action.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  69 => 11,  63 => 8,  55 => 7,  51 => 6,  46 => 3,  43 => 2,);
    }

    public function getSourceContext()
    {
        return new Source("{# modules/msthemeconfig/views/PrestaShop/Admin/Common/Grid/Actions/Row/shipping_state_action.html.twig #}
 {% if record.current_state in action.options.acceptedStates %}

  <button type=\"button\"
          class=\"btn tooltip-link js-link-row-action dropdown-item inline-dropdown-item showShippingState\"
          data-order-id=\"{{ record.id_order }}\"
          data-order-reference=\"{% if record.added_to_order == \"\" %}{{ record.reference }}{% else %}{{ record.added_to_order }}{% endif %}\"
          data-order-added-reference=\"{{ record.added_to_order }}\"
          data-toggle=\"pstooltip\"
          data-placement=\"top\"
          data-original-title=\"{{ action.options.label }}\">
    <span class=\"material-icons\">schedule_send</span>
  </button>
{% endif %}
", "@PrestaShop/Admin/Common/Grid/Actions/Row/shipping_state_action.html.twig", "C:\\wampserver\\www\\ijzershop8.local\\modules\\msthemeconfig\\views\\PrestaShop\\Admin\\Common\\Grid\\Actions\\Row\\shipping_state_action.html.twig");
    }
}

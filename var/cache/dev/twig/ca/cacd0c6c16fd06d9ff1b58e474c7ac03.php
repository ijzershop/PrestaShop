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

/* @PrestaShop/Admin/Common/Grid/Columns/Content/koopman_retour_button.html.twig */
class __TwigTemplate_f9ca41e9151b766709cf811142242f28 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Common/Grid/Columns/Content/koopman_retour_button.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Common/Grid/Columns/Content/koopman_retour_button.html.twig"));

        // line 2
        echo "<div class=\"text-center\">
  ";
        // line 3
        if (twig_in_filter(twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 3, $this->source); })()), "current_state", [], "any", false, false, false, 3), twig_get_array_keys_filter(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 3, $this->source); })()), "options", [], "any", false, false, false, 3), "acceptedStates", [], "any", false, false, false, 3)))) {
            // line 4
            echo "    ";
            if (twig_in_filter(twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 4, $this->source); })()), "current_state", [], "any", false, false, false, 4), twig_get_array_keys_filter(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 4, $this->source); })()), "options", [], "any", false, false, false, 4), "createdStates", [], "any", false, false, false, 4)))) {
                // line 5
                echo "      <span class=\"material-icons text-success\">done</span>
    ";
            } else {
                // line 7
                echo "      <button type=\"button\" class=\"btn btn-secondary createRetour\" data-order-id=\"";
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 7, $this->source); })()), "id_order", [], "any", false, false, false, 7), "html", null, true);
                echo "\">";
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 7, $this->source); })()), "options", [], "any", false, false, false, 7), "label", [], "any", false, false, false, 7), "html", null, true);
                echo "</button>
    ";
            }
            // line 9
            echo "  ";
        } else {
            // line 10
            echo "    <span class=\"material-icons text-danger\">close</span>
  ";
        }
        // line 12
        echo "</div>
";
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    public function getTemplateName()
    {
        return "@PrestaShop/Admin/Common/Grid/Columns/Content/koopman_retour_button.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  70 => 12,  66 => 10,  63 => 9,  55 => 7,  51 => 5,  48 => 4,  46 => 3,  43 => 2,);
    }

    public function getSourceContext()
    {
        return new Source("{# modules/msthemeconfig/views/PrestaShop/Admin/Common/Grid/Columns/Content/koopman_retour_button.html.twig #}
<div class=\"text-center\">
  {% if record.current_state in column.options.acceptedStates|keys %}
    {% if record.current_state in column.options.createdStates|keys %}
      <span class=\"material-icons text-success\">done</span>
    {% else %}
      <button type=\"button\" class=\"btn btn-secondary createRetour\" data-order-id=\"{{ record.id_order }}\">{{ column.options.label }}</button>
    {% endif %}
  {% else %}
    <span class=\"material-icons text-danger\">close</span>
  {% endif %}
</div>
", "@PrestaShop/Admin/Common/Grid/Columns/Content/koopman_retour_button.html.twig", "C:\\wampserver\\www\\ijzershop8.local\\modules\\msthemeconfig\\views\\PrestaShop\\Admin\\Common\\Grid\\Columns\\Content\\koopman_retour_button.html.twig");
    }
}

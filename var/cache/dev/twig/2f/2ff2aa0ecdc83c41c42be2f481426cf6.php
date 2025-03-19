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

/* @PrestaShop/Admin/Common/Grid/Columns/Content/koopman_label_button_2.html.twig */
class __TwigTemplate_1854da513ae6822b79ba5ce040223387 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Common/Grid/Columns/Content/koopman_label_button_2.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Common/Grid/Columns/Content/koopman_label_button_2.html.twig"));

        // line 2
        echo "<div class=\"col-12\" style=\"min-width: 900px;\">
  <div class=\"text-center\">
    <div class=\"w-100\">
      <div class=\"badge badge-important koopman-current-status-badge status_";
        // line 5
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 5, $this->source); })()), "current_state", [], "any", false, false, false, 5), "html", null, true);
        echo "\"
           style=\"background-color: ";
        // line 6
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 6, $this->source); })()), "color", [], "any", false, false, false, 6), "html", null, true);
        echo ";\">
        ";
        // line 7
        if ((twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 7, $this->source); })()), "carrier", [], "any", false, false, false, 7) === twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 7, $this->source); })()), "options", [], "any", false, false, false, 7), "stateCarrier", [], "any", false, false, false, 7), "shipping", [], "any", false, false, false, 7))) {
            // line 8
            echo "          <i class=\"koopman-current-status-badge-label\">";
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 8, $this->source); })()), "options", [], "any", false, false, false, 8), "stateCarrier", [], "any", false, false, false, 8), "shipping_label", [], "any", false, false, false, 8), "html", null, true);
            echo "</i> |
          <b> ";
            // line 9
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 9, $this->source); })()), "osname", [], "any", false, false, false, 9), "html", null, true);
            echo " </b>
        ";
        } elseif ((twig_get_attribute($this->env, $this->source,         // line 10
(isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 10, $this->source); })()), "carrier", [], "any", false, false, false, 10) === twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 10, $this->source); })()), "options", [], "any", false, false, false, 10), "stateCarrier", [], "any", false, false, false, 10), "pickup", [], "any", false, false, false, 10))) {
            // line 11
            echo "          <i class=\"koopman-current-status-badge-label\">";
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 11, $this->source); })()), "options", [], "any", false, false, false, 11), "stateCarrier", [], "any", false, false, false, 11), "pickup_label", [], "any", false, false, false, 11), "html", null, true);
            echo "</i> |
          <b> ";
            // line 12
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 12, $this->source); })()), "osname", [], "any", false, false, false, 12), "html", null, true);
            echo " </b>
        ";
        } elseif ((twig_get_attribute($this->env, $this->source,         // line 13
(isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 13, $this->source); })()), "carrier", [], "any", false, false, false, 13) === twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 13, $this->source); })()), "options", [], "any", false, false, false, 13), "stateCarrier", [], "any", false, false, false, 13), "added", [], "any", false, false, false, 13))) {
            // line 14
            echo "          <i class=\"koopman-current-status-badge-label\">";
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 14, $this->source); })()), "options", [], "any", false, false, false, 14), "stateCarrier", [], "any", false, false, false, 14), "added_label", [], "any", false, false, false, 14), "html", null, true);
            echo "</i> |
          <b> ";
            // line 15
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 15, $this->source); })()), "osname", [], "any", false, false, false, 15), "html", null, true);
            echo " </b>
        ";
        } else {
            // line 17
            echo "          <i class=\"koopman-current-status-badge-label\"></i> | <b> ";
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 17, $this->source); })()), "osname", [], "any", false, false, false, 17), "html", null, true);
            echo " </b>
        ";
        }
        // line 19
        echo "        <span
          class=\"calculated_weight float-right ";
        // line 20
        if ((twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 20, $this->source); })()), "color", [], "any", false, false, false, 20) == "#34209E")) {
            echo " text-white ";
        } else {
            echo " text-dark ";
        }
        echo "\">
          ";
        // line 21
        echo twig_escape_filter($this->env, twig_number_format_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 21, $this->source); })()), "total_order_weight", [], "any", false, false, false, 21), 2), "html", null, true);
        echo "<sub>Kg</sub>
        </span>
      </div>
    </div>
    <div class=\"row  bg-warning text-white\">
      <div class=\"col-4 text-left\">Zending Nummer(s)</div>
      <div class=\"col-8 tracking_number\" data-reference=\"";
        // line 27
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 27, $this->source); })()), "reference", [], "any", false, false, false, 27), "html", null, true);
        echo "\"> ";
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 27, $this->source); })()), "shipping_number", [], "any", false, false, false, 27), "html", null, true);
        echo " </div>
    </div>
    <div class=\"row\">
      <div class=\"col-12 p-0\">
        ";
        // line 32
        echo "        <table class=\"table table-condensed w-100 collie-table\" data-row-id=\"";
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 32, $this->source); })()), "id_order", [], "any", false, false, false, 32), "html", null, true);
        echo "\">
          <tbody>
          ";
        // line 35
        echo "          ";
        $context["max_collie_count"] = 5;
        // line 36
        echo "          ";
        $context["collie_counter"] = 0;
        // line 37
        echo "          ";
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 37, $this->source); })()), "collie_data", [], "any", false, false, false, 37));
        $context['loop'] = [
          'parent' => $context['_parent'],
          'index0' => 0,
          'index'  => 1,
          'first'  => true,
        ];
        if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof \Countable)) {
            $length = count($context['_seq']);
            $context['loop']['revindex0'] = $length - 1;
            $context['loop']['revindex'] = $length;
            $context['loop']['length'] = $length;
            $context['loop']['last'] = 1 === $length;
        }
        foreach ($context['_seq'] as $context["_key"] => $context["collie"]) {
            // line 38
            echo "            ";
            if ((twig_get_attribute($this->env, $this->source, $context["collie"], "qty", [], "any", false, false, false, 38) > 0)) {
                // line 39
                echo "              ";
                $context["max_collie_count"] = ((isset($context["max_collie_count"]) || array_key_exists("max_collie_count", $context) ? $context["max_collie_count"] : (function () { throw new RuntimeError('Variable "max_collie_count" does not exist.', 39, $this->source); })()) - 1);
                // line 40
                echo "              ";
                $context["collie_counter"] = ((isset($context["collie_counter"]) || array_key_exists("collie_counter", $context) ? $context["collie_counter"] : (function () { throw new RuntimeError('Variable "collie_counter" does not exist.', 40, $this->source); })()) + 1);
                // line 41
                echo "              <tr>
                <td ";
                // line 42
                if ((twig_get_attribute($this->env, $this->source, $context["collie"], "weight", [], "any", false, false, false, 42) > 115)) {
                    echo " class=\"disabled\" ";
                }
                echo ">
                  <nav class=\"collie-nav collieTypeSelect\" aria-label=\"\">
                    <ul class=\"pagination pagination-lg mb-0\">
                      <li data-row-id=\"";
                // line 45
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 45, $this->source); })()), "id_order", [], "any", false, false, false, 45), "html", null, true);
                echo "\" data-index=\"";
                echo twig_escape_filter($this->env, (isset($context["collie_counter"]) || array_key_exists("collie_counter", $context) ? $context["collie_counter"] : (function () { throw new RuntimeError('Variable "collie_counter" does not exist.', 45, $this->source); })()), "html", null, true);
                echo "\"
                          class=\"page-item ";
                // line 46
                if ((twig_get_attribute($this->env, $this->source, $context["collie"], "name", [], "any", false, false, false, 46) == "envelope")) {
                    echo "active";
                }
                echo "\" data-type=\"envelope\"><a
                          class=\"page-link\"
                          href=\"#\"><img
                            src=\"/upload/koopman/icons/envelope.svg\" alt=\"Envelop\"></a></li>
                      <li data-row-id=\"";
                // line 50
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 50, $this->source); })()), "id_order", [], "any", false, false, false, 50), "html", null, true);
                echo "\" data-index=\"";
                echo twig_escape_filter($this->env, (isset($context["collie_counter"]) || array_key_exists("collie_counter", $context) ? $context["collie_counter"] : (function () { throw new RuntimeError('Variable "collie_counter" does not exist.', 50, $this->source); })()), "html", null, true);
                echo "\"
                          class=\"page-item ";
                // line 51
                if ((twig_get_attribute($this->env, $this->source, $context["collie"], "name", [], "any", false, false, false, 51) == "plaat")) {
                    echo "active";
                }
                echo "\" data-type=\"plaat\"><a
                          class=\"page-link\" href=\"#\"
                        ><img
                            src=\"/upload/koopman/icons/plaat.svg\" alt=\"Plaat\"></a></li>
                      <li data-row-id=\"";
                // line 55
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 55, $this->source); })()), "id_order", [], "any", false, false, false, 55), "html", null, true);
                echo "\" data-index=\"";
                echo twig_escape_filter($this->env, (isset($context["collie_counter"]) || array_key_exists("collie_counter", $context) ? $context["collie_counter"] : (function () { throw new RuntimeError('Variable "collie_counter" does not exist.', 55, $this->source); })()), "html", null, true);
                echo "\"
                          class=\"page-item ";
                // line 56
                if ((twig_get_attribute($this->env, $this->source, $context["collie"], "name", [], "any", false, false, false, 56) == "1-meter")) {
                    echo "active";
                }
                echo "\" data-type=\"1-meter\"><a
                          class=\"page-link\"
                          href=\"#\"
                        ><img
                            src=\"/upload/koopman/icons/1m.svg\" alt=\"Plaat\"></a></li>
                      <li data-row-id=\"";
                // line 61
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 61, $this->source); })()), "id_order", [], "any", false, false, false, 61), "html", null, true);
                echo "\" data-index=\"";
                echo twig_escape_filter($this->env, (isset($context["collie_counter"]) || array_key_exists("collie_counter", $context) ? $context["collie_counter"] : (function () { throw new RuntimeError('Variable "collie_counter" does not exist.', 61, $this->source); })()), "html", null, true);
                echo "\"
                          class=\"page-item  ";
                // line 62
                if ((twig_get_attribute($this->env, $this->source, $context["collie"], "name", [], "any", false, false, false, 62) == "2-meter")) {
                    echo "active";
                }
                echo "\" data-type=\"2-meter\"><a
                          class=\"page-link\"
                          href=\"#\"><img
                            src=\"/upload/koopman/icons/2m.svg\" alt=\"Plaat\"></a></li>
                    </ul>
                  </nav>
                </td>
                <td class=\"font-weight-bold\" style=\"min-width: 150px;\">";
                // line 69
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["collie"], "size", [], "any", false, false, false, 69), "html", null, true);
                echo "</td>
                <td class=\"font-weight-bold\" style=\"min-width: 75px;\">";
                // line 70
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["collie"], "weight", [], "any", false, false, false, 70), "html", null, true);
                echo "Kg</td>
                ";
                // line 71
                if (((isset($context["collie_counter"]) || array_key_exists("collie_counter", $context) ? $context["collie_counter"] : (function () { throw new RuntimeError('Variable "collie_counter" does not exist.', 71, $this->source); })()) == 1)) {
                    // line 72
                    echo "                  <td style=\"width:120px;vertical-align: top;text-align: center\" rowspan=\"5\">
                    <input type=\"hidden\" value=\"";
                    // line 73
                    echo twig_escape_filter($this->env, json_encode(twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 73, $this->source); })()), "collie_data", [], "any", false, false, false, 73)), "html", null, true);
                    echo "\"
                           data-row-id=\"";
                    // line 74
                    echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 74, $this->source); })()), "id_order", [], "any", false, false, false, 74), "html", null, true);
                    echo "\" name=\"selected_collie_values\"
                           class=\"selected_collie_values\">

                    ";
                    // line 77
                    $this->loadTemplate("@Modules/msthemeconfig/views/PrestaShop/Admin/Common/Grid/Columns/Content/koopman_buttons.html.twig", "@PrestaShop/Admin/Common/Grid/Columns/Content/koopman_label_button_2.html.twig", 77)->display(twig_array_merge($context, ["record" =>                     // line 78
(isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 78, $this->source); })()), "column" =>                     // line 79
(isset($context["column"]) || array_key_exists("column", $context) ? $context["column"] : (function () { throw new RuntimeError('Variable "column" does not exist.', 79, $this->source); })())]));
                    // line 80
                    echo "                  </td>
                ";
                }
                // line 82
                echo "              </tr>
            ";
            }
            // line 84
            echo "          ";
            ++$context['loop']['index0'];
            ++$context['loop']['index'];
            $context['loop']['first'] = false;
            if (isset($context['loop']['length'])) {
                --$context['loop']['revindex0'];
                --$context['loop']['revindex'];
                $context['loop']['last'] = 0 === $context['loop']['revindex0'];
            }
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['collie'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 85
        echo "          ";
        // line 86
        echo "          ";
        // line 87
        echo "          ";
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(range(1, (isset($context["max_collie_count"]) || array_key_exists("max_collie_count", $context) ? $context["max_collie_count"] : (function () { throw new RuntimeError('Variable "max_collie_count" does not exist.', 87, $this->source); })())));
        foreach ($context['_seq'] as $context["_key"] => $context["i"]) {
            // line 88
            echo "            <tr>
              <td class=\"border-0\" colspan=\"3\">
              </td>
            </tr>
          ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['i'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 93
        echo "          </tbody>
          <tfoot>
          <tr class=\"footer\">
            <td style=\"padding:5px 0!important;\">
              <div class=\"col\">
                <div class=\"input-group total_collies\">
                  <div class=\"input-group-prepend\">
                    <button class=\"btn btn-success ";
        // line 100
        if ((twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 100, $this->source); })()), "total_collies", [], "any", false, false, false, 100) <= 1)) {
            echo "disabled-btn";
        }
        echo "\"
                            ";
        // line 101
        if ((twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 101, $this->source); })()), "total_collies", [], "any", false, false, false, 101) <= 1)) {
            echo "disabled";
        }
        echo " data-row-id=\"";
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 101, $this->source); })()), "id_order", [], "any", false, false, false, 101), "html", null, true);
        echo "\"
                            data-method=\"collie\" data-type=\"minus\" type=\"button\">-
                    </button>
                  </div>
                  <input type=\"text\" class=\"form-control\" placeholder=\"Collies\" aria-label=\"Totaal Collies\"
                         aria-describedby=\"total-collies\" data-row-id=\"";
        // line 106
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 106, $this->source); })()), "id_order", [], "any", false, false, false, 106), "html", null, true);
        echo "\"
                         value=\"";
        // line 107
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 107, $this->source); })()), "total_collies", [], "any", false, false, false, 107), "html", null, true);
        echo "  Collie(s)\">
                  <div class=\"input-group-append\">
                    <button class=\"btn btn-success ";
        // line 109
        if ((twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 109, $this->source); })()), "total_collies", [], "any", false, false, false, 109) >= 5)) {
            echo "disabled-btn";
        }
        echo "\"
                            ";
        // line 110
        if ((twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 110, $this->source); })()), "total_collies", [], "any", false, false, false, 110) >= 5)) {
            echo "disabled";
        }
        echo " data-row-id=\"";
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 110, $this->source); })()), "id_order", [], "any", false, false, false, 110), "html", null, true);
        echo "\"
                            data-method=\"collie\"
                            data-type=\"plus\" type=\"button\">+
                    </button>
                  </div>
                </div>
              </div>
            </td>
            <td style=\"padding:5px 0!important;\" colspan=\"3\">
              <div class=\"col\">
                <div class=\"input-group w-auto float-right total_weight\">
                  <div class=\"input-group-prepend\">
                    <button class=\"btn btn-primary\" data-row-id=\"";
        // line 122
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 122, $this->source); })()), "id_order", [], "any", false, false, false, 122), "html", null, true);
        echo "\" data-method=\"weight\"
                            data-type=\"minus\" type=\"button\">-
                    </button>
                  </div>
                  <input type=\"text\" class=\"form-control\" placeholder=\"Gewicht\" aria-label=\"Totaal Gewicht\"
                         aria-describedby=\"total_weight\" data-row-id=\"";
        // line 127
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 127, $this->source); })()), "id_order", [], "any", false, false, false, 127), "html", null, true);
        echo "\"
                         value=\"";
        // line 128
        echo twig_escape_filter($this->env, twig_number_format_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 128, $this->source); })()), "total_order_weight", [], "any", false, false, false, 128), 2), "html", null, true);
        echo " Kg\">
                  <div class=\"input-group-append\">
                    <button class=\"btn btn-primary\" data-row-id=\"";
        // line 130
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["record"]) || array_key_exists("record", $context) ? $context["record"] : (function () { throw new RuntimeError('Variable "record" does not exist.', 130, $this->source); })()), "id_order", [], "any", false, false, false, 130), "html", null, true);
        echo "\" data-method=\"weight\"
                            data-type=\"plus\" type=\"button\">+
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</div>
";
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    public function getTemplateName()
    {
        return "@PrestaShop/Admin/Common/Grid/Columns/Content/koopman_label_button_2.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  385 => 130,  380 => 128,  376 => 127,  368 => 122,  349 => 110,  343 => 109,  338 => 107,  334 => 106,  322 => 101,  316 => 100,  307 => 93,  297 => 88,  292 => 87,  290 => 86,  288 => 85,  274 => 84,  270 => 82,  266 => 80,  264 => 79,  263 => 78,  262 => 77,  256 => 74,  252 => 73,  249 => 72,  247 => 71,  243 => 70,  239 => 69,  227 => 62,  221 => 61,  211 => 56,  205 => 55,  196 => 51,  190 => 50,  181 => 46,  175 => 45,  167 => 42,  164 => 41,  161 => 40,  158 => 39,  155 => 38,  137 => 37,  134 => 36,  131 => 35,  125 => 32,  116 => 27,  107 => 21,  99 => 20,  96 => 19,  90 => 17,  85 => 15,  80 => 14,  78 => 13,  74 => 12,  69 => 11,  67 => 10,  63 => 9,  58 => 8,  56 => 7,  52 => 6,  48 => 5,  43 => 2,);
    }

    public function getSourceContext()
    {
        return new Source("{# modules/msthemeconfig/views/PrestaShop/Admin/Common/Grid/Columns/Content/koopman_label_button_2.html.twig #}
<div class=\"col-12\" style=\"min-width: 900px;\">
  <div class=\"text-center\">
    <div class=\"w-100\">
      <div class=\"badge badge-important koopman-current-status-badge status_{{ record.current_state }}\"
           style=\"background-color: {{ record.color }};\">
        {% if record.carrier is same as column.options.stateCarrier.shipping %}
          <i class=\"koopman-current-status-badge-label\">{{ column.options.stateCarrier.shipping_label }}</i> |
          <b> {{ record.osname }} </b>
        {% elseif record.carrier is same as column.options.stateCarrier.pickup %}
          <i class=\"koopman-current-status-badge-label\">{{ column.options.stateCarrier.pickup_label }}</i> |
          <b> {{ record.osname }} </b>
        {% elseif record.carrier is same as column.options.stateCarrier.added %}
          <i class=\"koopman-current-status-badge-label\">{{ column.options.stateCarrier.added_label }}</i> |
          <b> {{ record.osname }} </b>
        {% else %}
          <i class=\"koopman-current-status-badge-label\"></i> | <b> {{ record.osname }} </b>
        {% endif %}
        <span
          class=\"calculated_weight float-right {% if record.color == '#34209E' %} text-white {% else %} text-dark {% endif %}\">
          {{ record.total_order_weight|number_format(2) }}<sub>Kg</sub>
        </span>
      </div>
    </div>
    <div class=\"row  bg-warning text-white\">
      <div class=\"col-4 text-left\">Zending Nummer(s)</div>
      <div class=\"col-8 tracking_number\" data-reference=\"{{ record.reference }}\"> {{ record.shipping_number }} </div>
    </div>
    <div class=\"row\">
      <div class=\"col-12 p-0\">
        {#   Table   #}
        <table class=\"table table-condensed w-100 collie-table\" data-row-id=\"{{ record.id_order }}\">
          <tbody>
          {#        Loop collie rows #}
          {% set max_collie_count = 5 %}
          {% set collie_counter = 0 %}
          {% for collie in record.collie_data %}
            {% if collie.qty > 0 %}
              {% set max_collie_count = max_collie_count-1 %}
              {% set collie_counter = collie_counter+1 %}
              <tr>
                <td {% if collie.weight > 115 %} class=\"disabled\" {% endif %}>
                  <nav class=\"collie-nav collieTypeSelect\" aria-label=\"\">
                    <ul class=\"pagination pagination-lg mb-0\">
                      <li data-row-id=\"{{ record.id_order }}\" data-index=\"{{ collie_counter }}\"
                          class=\"page-item {% if collie.name == 'envelope' %}active{% endif %}\" data-type=\"envelope\"><a
                          class=\"page-link\"
                          href=\"#\"><img
                            src=\"/upload/koopman/icons/envelope.svg\" alt=\"Envelop\"></a></li>
                      <li data-row-id=\"{{ record.id_order }}\" data-index=\"{{ collie_counter }}\"
                          class=\"page-item {% if collie.name == 'plaat' %}active{% endif %}\" data-type=\"plaat\"><a
                          class=\"page-link\" href=\"#\"
                        ><img
                            src=\"/upload/koopman/icons/plaat.svg\" alt=\"Plaat\"></a></li>
                      <li data-row-id=\"{{ record.id_order }}\" data-index=\"{{ collie_counter }}\"
                          class=\"page-item {% if collie.name == '1-meter' %}active{% endif %}\" data-type=\"1-meter\"><a
                          class=\"page-link\"
                          href=\"#\"
                        ><img
                            src=\"/upload/koopman/icons/1m.svg\" alt=\"Plaat\"></a></li>
                      <li data-row-id=\"{{ record.id_order }}\" data-index=\"{{ collie_counter }}\"
                          class=\"page-item  {% if collie.name == '2-meter' %}active{% endif %}\" data-type=\"2-meter\"><a
                          class=\"page-link\"
                          href=\"#\"><img
                            src=\"/upload/koopman/icons/2m.svg\" alt=\"Plaat\"></a></li>
                    </ul>
                  </nav>
                </td>
                <td class=\"font-weight-bold\" style=\"min-width: 150px;\">{{ collie.size }}</td>
                <td class=\"font-weight-bold\" style=\"min-width: 75px;\">{{ collie.weight }}Kg</td>
                {% if collie_counter == 1 %}
                  <td style=\"width:120px;vertical-align: top;text-align: center\" rowspan=\"5\">
                    <input type=\"hidden\" value=\"{{ record.collie_data|json_encode() }}\"
                           data-row-id=\"{{ record.id_order }}\" name=\"selected_collie_values\"
                           class=\"selected_collie_values\">

                    {% include '@Modules/msthemeconfig/views/PrestaShop/Admin/Common/Grid/Columns/Content/koopman_buttons.html.twig' with {
                      'record': record,
                      'column': column} %}
                  </td>
                {% endif %}
              </tr>
            {% endif %}
          {% endfor %}
          {#        End Loop collie rows #}
          {# Then add empty rows to reach 5 total rows #}
          {% for i in 1..max_collie_count %}
            <tr>
              <td class=\"border-0\" colspan=\"3\">
              </td>
            </tr>
          {% endfor %}
          </tbody>
          <tfoot>
          <tr class=\"footer\">
            <td style=\"padding:5px 0!important;\">
              <div class=\"col\">
                <div class=\"input-group total_collies\">
                  <div class=\"input-group-prepend\">
                    <button class=\"btn btn-success {% if record.total_collies <= 1 %}disabled-btn{% endif %}\"
                            {% if record.total_collies <= 1 %}disabled{% endif %} data-row-id=\"{{ record.id_order }}\"
                            data-method=\"collie\" data-type=\"minus\" type=\"button\">-
                    </button>
                  </div>
                  <input type=\"text\" class=\"form-control\" placeholder=\"Collies\" aria-label=\"Totaal Collies\"
                         aria-describedby=\"total-collies\" data-row-id=\"{{ record.id_order }}\"
                         value=\"{{ record.total_collies }}  Collie(s)\">
                  <div class=\"input-group-append\">
                    <button class=\"btn btn-success {% if record.total_collies >= 5 %}disabled-btn{% endif %}\"
                            {% if record.total_collies >= 5 %}disabled{% endif %} data-row-id=\"{{ record.id_order }}\"
                            data-method=\"collie\"
                            data-type=\"plus\" type=\"button\">+
                    </button>
                  </div>
                </div>
              </div>
            </td>
            <td style=\"padding:5px 0!important;\" colspan=\"3\">
              <div class=\"col\">
                <div class=\"input-group w-auto float-right total_weight\">
                  <div class=\"input-group-prepend\">
                    <button class=\"btn btn-primary\" data-row-id=\"{{ record.id_order }}\" data-method=\"weight\"
                            data-type=\"minus\" type=\"button\">-
                    </button>
                  </div>
                  <input type=\"text\" class=\"form-control\" placeholder=\"Gewicht\" aria-label=\"Totaal Gewicht\"
                         aria-describedby=\"total_weight\" data-row-id=\"{{ record.id_order }}\"
                         value=\"{{ record.total_order_weight|number_format(2) }} Kg\">
                  <div class=\"input-group-append\">
                    <button class=\"btn btn-primary\" data-row-id=\"{{ record.id_order }}\" data-method=\"weight\"
                            data-type=\"plus\" type=\"button\">+
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</div>
", "@PrestaShop/Admin/Common/Grid/Columns/Content/koopman_label_button_2.html.twig", "C:\\wampserver\\www\\ijzershop8.local\\modules\\msthemeconfig\\views\\PrestaShop\\Admin\\Common\\Grid\\Columns\\Content\\koopman_label_button_2.html.twig");
    }
}

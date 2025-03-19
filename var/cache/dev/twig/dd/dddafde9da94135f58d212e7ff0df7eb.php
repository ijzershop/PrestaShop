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

/* @PrestaShop/Admin/Sell/Order/Order/Blocks/View/discount_list.html.twig */
class __TwigTemplate_f87ae5f3287ab7fb3d56e37e288dfa50 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Sell/Order/Order/Blocks/View/discount_list.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Sell/Order/Order/Blocks/View/discount_list.html.twig"));

        // line 25
        echo "<div class=\"col-md-12\">
  <table class=\"table discountList";
        // line 26
        if (twig_test_empty((isset($context["discounts"]) || array_key_exists("discounts", $context) ? $context["discounts"] : (function () { throw new RuntimeError('Variable "discounts" does not exist.', 26, $this->source); })()))) {
            echo " d-none";
        }
        echo "\">
    <thead>
    <tr>
      <th>";
        // line 29
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Name", [], "Admin.Global"), "html", null, true);
        echo "</th>
      <th>";
        // line 30
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Verekend met producten (en mogelijk verzending)", [], "Admin.Global"), "html", null, true);
        echo "</th>
      <th class=\"text-right\">";
        // line 31
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Voucher waarde", [], "Admin.Global"), "html", null, true);
        echo "</th>
      <th class=\"text-right d-print-none\">";
        // line 32
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Actions", [], "Admin.Global"), "html", null, true);
        echo "</th>
    </tr>
    </thead>
    <tbody>
    ";
        // line 36
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["discounts"]) || array_key_exists("discounts", $context) ? $context["discounts"] : (function () { throw new RuntimeError('Variable "discounts" does not exist.', 36, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["discount"]) {
            // line 37
            echo "      <tr>
        <td class=\"discountList-name\">";
            // line 38
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["discount"], "name", [], "any", false, false, false, 38), "html", null, true);
            echo "</td>
        <td>
          ";
            // line 40
            if (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, $context["discount"], "amountRaw", [], "any", false, false, false, 40), "greaterThan", [0 => $this->extensions['PrestaShopBundle\Twig\Extension\NumberExtension']->createNumber(0)], "method", false, false, false, 40)) {
                echo "-";
            }
            // line 41
            echo "          ";
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["discount"], "reduction_amount_formatted_tax_excl", [], "any", false, false, false, 41), "html", null, true);
            echo "
        </td>
        <td class=\"text-right d-print-none\">
          ";
            // line 44
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["discount"], "orig_reduction_amount_formatted", [], "any", false, false, false, 44), "html", null, true);
            echo "
        </td>
        <td class=\"text-right d-print-none\">
          <a class=\"delete-cart-rule btn btn-text\"
             href=\"";
            // line 48
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("admin_orders_remove_cart_rule", ["orderId" => (isset($context["orderId"]) || array_key_exists("orderId", $context) ? $context["orderId"] : (function () { throw new RuntimeError('Variable "orderId" does not exist.', 48, $this->source); })()), "orderCartRuleId" => twig_get_attribute($this->env, $this->source, $context["discount"], "orderCartRuleId", [], "any", false, false, false, 48)]), "html", null, true);
            echo "\">
            <i class=\"material-icons\">delete</i>
          </a>
        </td>
      </tr>
    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['discount'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 54
        echo "    </tbody>
  </table>
</div>
";
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    public function getTemplateName()
    {
        return "@PrestaShop/Admin/Sell/Order/Order/Blocks/View/discount_list.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  115 => 54,  103 => 48,  96 => 44,  89 => 41,  85 => 40,  80 => 38,  77 => 37,  73 => 36,  66 => 32,  62 => 31,  58 => 30,  54 => 29,  46 => 26,  43 => 25,);
    }

    public function getSourceContext()
    {
        return new Source("{# **
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
 * #}
<div class=\"col-md-12\">
  <table class=\"table discountList{% if discounts is empty %} d-none{% endif %}\">
    <thead>
    <tr>
      <th>{{ 'Name'|trans({}, 'Admin.Global') }}</th>
      <th>{{ 'Verekend met producten (en mogelijk verzending)'|trans({}, 'Admin.Global') }}</th>
      <th class=\"text-right\">{{ 'Voucher waarde'|trans({}, 'Admin.Global') }}</th>
      <th class=\"text-right d-print-none\">{{ 'Actions'|trans({}, 'Admin.Global') }}</th>
    </tr>
    </thead>
    <tbody>
    {% for discount in discounts %}
      <tr>
        <td class=\"discountList-name\">{{ discount.name }}</td>
        <td>
          {% if discount.amountRaw.greaterThan(number(0)) %}-{% endif %}
          {{ discount.reduction_amount_formatted_tax_excl }}
        </td>
        <td class=\"text-right d-print-none\">
          {{ discount.orig_reduction_amount_formatted }}
        </td>
        <td class=\"text-right d-print-none\">
          <a class=\"delete-cart-rule btn btn-text\"
             href=\"{{ path('admin_orders_remove_cart_rule', {'orderId': orderId, 'orderCartRuleId': discount.orderCartRuleId}) }}\">
            <i class=\"material-icons\">delete</i>
          </a>
        </td>
      </tr>
    {% endfor %}
    </tbody>
  </table>
</div>
", "@PrestaShop/Admin/Sell/Order/Order/Blocks/View/discount_list.html.twig", "C:\\wampserver\\www\\ijzershop8.local\\modules\\msthemeconfig\\views\\PrestaShop\\Admin\\Sell\\Order\\Order\\Blocks\\View\\discount_list.html.twig");
    }
}

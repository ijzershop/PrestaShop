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

/* @PrestaShop/Admin/Sell/Order/Order/Blocks/View/products.html.twig */
class __TwigTemplate_d68f27f700af762b5cdab4d95f4c7fe2 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Sell/Order/Order/Blocks/View/products.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Sell/Order/Order/Blocks/View/products.html.twig"));

        // line 25
        echo "
";
        // line 26
        $context["isColumnLocationDisplayed"] = false;
        // line 27
        $context["isColumnRefundedDisplayed"] = false;
        // line 28
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(twig_slice($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 28, $this->source); })()), "products", [], "any", false, false, false, 28), "products", [], "any", false, false, false, 28), 0, (isset($context["paginationNum"]) || array_key_exists("paginationNum", $context) ? $context["paginationNum"] : (function () { throw new RuntimeError('Variable "paginationNum" does not exist.', 28, $this->source); })())));
        foreach ($context['_seq'] as $context["_key"] => $context["product"]) {
            // line 29
            echo "  ";
            if ( !twig_test_empty(twig_get_attribute($this->env, $this->source, $context["product"], "location", [], "any", false, false, false, 29))) {
                // line 30
                echo "    ";
                $context["isColumnLocationDisplayed"] = true;
                // line 31
                echo "  ";
            }
            // line 32
            echo "  ";
            if ((twig_get_attribute($this->env, $this->source, $context["product"], "quantityRefunded", [], "any", false, false, false, 32) > 0)) {
                // line 33
                echo "    ";
                $context["isColumnRefundedDisplayed"] = true;
                // line 34
                echo "  ";
            }
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['product'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 36
        echo "
<div class=\"card\" id=\"orderProductsPanel\">
  <div class=\"card-header\">
    <h3 class=\"card-header-title\">
      ";
        // line 40
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Products", [], "Admin.Global"), "html", null, true);
        echo " (<span
        id=\"orderProductsPanelCount\">";
        // line 41
        echo twig_escape_filter($this->env, twig_length_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 41, $this->source); })()), "products", [], "any", false, false, false, 41), "products", [], "any", false, false, false, 41)), "html", null, true);
        echo "</span>)
    </h3>
  </div>

  <div class=\"card-body\">
    <div class=\"spinner-order-products-container\" id=\"orderProductsLoading\" style=\"display:none;\">
      <div class=\"spinner spinner-primary\"></div>
    </div>
    ";
        // line 49
        $context["formOptions"] = ["attr" => ["data-order-id" => twig_get_attribute($this->env, $this->source,         // line 51
(isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 51, $this->source); })()), "id", [], "any", false, false, false, 51), "data-is-delivered" => twig_get_attribute($this->env, $this->source,         // line 52
(isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 52, $this->source); })()), "isDelivered", [], "any", false, false, false, 52), "data-is-tax-included" => twig_get_attribute($this->env, $this->source,         // line 53
(isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 53, $this->source); })()), "isTaxIncluded", [], "any", false, false, false, 53), "data-discounts-amount" => twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source,         // line 54
(isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 54, $this->source); })()), "prices", [], "any", false, false, false, 54), "discountsAmountRaw", [], "any", false, false, false, 54), "data-price-specification" => json_encode(        // line 55
(isset($context["priceSpecification"]) || array_key_exists("priceSpecification", $context) ? $context["priceSpecification"] : (function () { throw new RuntimeError('Variable "priceSpecification" does not exist.', 55, $this->source); })()))]];
        // line 58
        echo "    ";
        echo         $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->renderBlock((isset($context["cancelProductForm"]) || array_key_exists("cancelProductForm", $context) ? $context["cancelProductForm"] : (function () { throw new RuntimeError('Variable "cancelProductForm" does not exist.', 58, $this->source); })()), 'form_start', (isset($context["formOptions"]) || array_key_exists("formOptions", $context) ? $context["formOptions"] : (function () { throw new RuntimeError('Variable "formOptions" does not exist.', 58, $this->source); })()));
        echo "
    <table class=\"table\" id=\"orderProductsTable\" data-currency-precision=\"";
        // line 59
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["orderCurrency"]) || array_key_exists("orderCurrency", $context) ? $context["orderCurrency"] : (function () { throw new RuntimeError('Variable "orderCurrency" does not exist.', 59, $this->source); })()), "precision", [], "any", false, false, false, 59), "html", null, true);
        echo "\">
      <thead>
      <tr>
        <th>
          <p>";
        // line 63
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Product", [], "Admin.Global"), "html", null, true);
        echo "</p>
        </th>
        <th></th>
        <th>
          <p class=\"mb-0\">";
        // line 67
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Price per unit", [], "Admin.Advparameters.Feature"), "html", null, true);
        echo "</p>
          <small class=\"text-muted\">";
        // line 68
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 68, $this->source); })()), "taxMethod", [], "any", false, false, false, 68), "html", null, true);
        echo "</small>
        </th>
        <th>
          <p>";
        // line 71
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Quantity", [], "Admin.Global"), "html", null, true);
        echo "</p>
        </th>
        <th class=\"cellProductLocation";
        // line 73
        if ( !(isset($context["isColumnLocationDisplayed"]) || array_key_exists("isColumnLocationDisplayed", $context) ? $context["isColumnLocationDisplayed"] : (function () { throw new RuntimeError('Variable "isColumnLocationDisplayed" does not exist.', 73, $this->source); })())) {
            echo " d-none";
        }
        echo "\">
          <p>";
        // line 74
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Stock location", [], "Admin.Orderscustomers.Feature"), "html", null, true);
        echo "</p>
        </th>
        <th class=\"cellProductRefunded";
        // line 76
        if ( !(isset($context["isColumnRefundedDisplayed"]) || array_key_exists("isColumnRefundedDisplayed", $context) ? $context["isColumnRefundedDisplayed"] : (function () { throw new RuntimeError('Variable "isColumnRefundedDisplayed" does not exist.', 76, $this->source); })())) {
            echo " d-none";
        }
        echo "\">
          <p>";
        // line 77
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Refunded", [], "Admin.Orderscustomers.Feature"), "html", null, true);
        echo "</p>
        </th>
        <th ";
        // line 79
        if ( !(isset($context["isAvailableQuantityDisplayed"]) || array_key_exists("isAvailableQuantityDisplayed", $context) ? $context["isAvailableQuantityDisplayed"] : (function () { throw new RuntimeError('Variable "isAvailableQuantityDisplayed" does not exist.', 79, $this->source); })())) {
            echo "class=\"d-none\"";
        }
        echo ">
          <p>";
        // line 80
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Available", [], "Admin.Global"), "html", null, true);
        echo "</p>
        </th>
        <th>
          <p class=\"mb-0\">";
        // line 83
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Total", [], "Admin.Global"), "html", null, true);
        echo "</p>
          <small class=\"text-muted\">";
        // line 84
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 84, $this->source); })()), "taxMethod", [], "any", false, false, false, 84), "html", null, true);
        echo "</small>
        </th>
        ";
        // line 86
        if (twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 86, $this->source); })()), "hasInvoice", [], "method", false, false, false, 86)) {
            // line 87
            echo "          <th>
            <p>";
            // line 88
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Invoice", [], "Admin.Global"), "html", null, true);
            echo "</p>
          </th>
        ";
        }
        // line 91
        echo "        ";
        if ( !twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 91, $this->source); })()), "delivered", [], "any", false, false, false, 91)) {
            // line 92
            echo "          <th class=\"text-right product_actions d-print-none\">
            <p>";
            // line 93
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Actions", [], "Admin.Global"), "html", null, true);
            echo "</p>
          </th>
        ";
        }
        // line 96
        echo "        <th class=\"text-center cancel-product-element\">
          <p>";
        // line 97
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Partial refund", [], "Admin.Orderscustomers.Feature"), "html", null, true);
        echo "</p>
        </th>
      </tr>
      </thead>
      <tbody>
      ";
        // line 102
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/product_list.html.twig", "@PrestaShop/Admin/Sell/Order/Order/Blocks/View/products.html.twig", 102)->display($context);
        // line 103
        echo "      ";
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/add_product_row.html.twig", "@PrestaShop/Admin/Sell/Order/Order/Blocks/View/products.html.twig", 103)->display($context);
        // line 104
        echo "      ";
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/edit_product_row.html.twig", "@PrestaShop/Admin/Sell/Order/Order/Blocks/View/products.html.twig", 104)->display($context);
        // line 105
        echo "      </tbody>
    </table>

    <div class=\"row mb-3\">
      <div class=\"col-md-6 text-left d-print-none order-product-pagination\">
        <div class=\"form-group row\">
          <label for=\"paginator_select_page_limit\"
                 class=\"col-form-label ml-3\">";
        // line 112
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Items per page:", [], "Admin.Catalog.Feature"), "html", null, true);
        echo "</label>
          <div class=\"col\">
            <select id=\"orderProductsTablePaginationNumberSelector\" class=\"pagination-link custom-select\">
              ";
        // line 115
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["paginationNumOptions"]) || array_key_exists("paginationNumOptions", $context) ? $context["paginationNumOptions"] : (function () { throw new RuntimeError('Variable "paginationNumOptions" does not exist.', 115, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["numPageOption"]) {
            // line 116
            echo "                <option
                  value=\"";
            // line 117
            echo twig_escape_filter($this->env, $context["numPageOption"], "html", null, true);
            echo "\"";
            if (($context["numPageOption"] == (isset($context["paginationNum"]) || array_key_exists("paginationNum", $context) ? $context["paginationNum"] : (function () { throw new RuntimeError('Variable "paginationNum" does not exist.', 117, $this->source); })()))) {
                echo " selected";
            }
            echo ">";
            echo twig_escape_filter($this->env, $context["numPageOption"], "html", null, true);
            echo "</option>
              ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['numPageOption'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 119
        echo "            </select>
          </div>
        </div>
        ";
        // line 122
        $context["numPages"] = twig_round(max((twig_length_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 122, $this->source); })()), "products", [], "any", false, false, false, 122), "products", [], "any", false, false, false, 122)) / (isset($context["paginationNum"]) || array_key_exists("paginationNum", $context) ? $context["paginationNum"] : (function () { throw new RuntimeError('Variable "paginationNum" does not exist.', 122, $this->source); })())), 1), 0, "ceil");
        // line 123
        echo "        <nav
          aria-label=\"Products Navigation\"";
        // line 124
        if ((twig_length_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 124, $this->source); })()), "products", [], "any", false, false, false, 124), "products", [], "any", false, false, false, 124)) <= (isset($context["paginationNum"]) || array_key_exists("paginationNum", $context) ? $context["paginationNum"] : (function () { throw new RuntimeError('Variable "paginationNum" does not exist.', 124, $this->source); })()))) {
            echo " class=\"d-none\"";
        }
        // line 125
        echo "          id=\"orderProductsNavPagination\">
          <ul class=\"pagination\" id=\"orderProductsTablePagination\" data-num-per-page=\"";
        // line 126
        echo twig_escape_filter($this->env, (isset($context["paginationNum"]) || array_key_exists("paginationNum", $context) ? $context["paginationNum"] : (function () { throw new RuntimeError('Variable "paginationNum" does not exist.', 126, $this->source); })()), "html", null, true);
        echo "\"
              data-num-pages=\"";
        // line 127
        echo twig_escape_filter($this->env, (isset($context["numPages"]) || array_key_exists("numPages", $context) ? $context["numPages"] : (function () { throw new RuntimeError('Variable "numPages" does not exist.', 127, $this->source); })()), "html", null, true);
        echo "\">
            <li class=\"page-item disabled\" id=\"orderProductsTablePaginationPrev\">
              <a class=\"page-link\" href=\"javascript:void(0);\" aria-label=\"Previous\">
                <span aria-hidden=\"true\">&laquo;</span>
                <span class=\"sr-only\">Previous</span>
              </a>
            </li>
            ";
        // line 134
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(range(1, (isset($context["numPages"]) || array_key_exists("numPages", $context) ? $context["numPages"] : (function () { throw new RuntimeError('Variable "numPages" does not exist.', 134, $this->source); })())));
        foreach ($context['_seq'] as $context["_key"] => $context["numPage"]) {
            // line 135
            echo "              <li class=\"page-item";
            if (($context["numPage"] == 1)) {
                echo " active";
            }
            echo "\">
                <span class=\"page-link\"
                      data-order-id=\"";
            // line 137
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 137, $this->source); })()), "id", [], "any", false, false, false, 137), "html", null, true);
            echo "\"
                      data-page=\"";
            // line 138
            echo twig_escape_filter($this->env, $context["numPage"], "html", null, true);
            echo "\">";
            echo twig_escape_filter($this->env, $context["numPage"], "html", null, true);
            echo "</span>
              </li>
            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['numPage'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 141
        echo "            <li class=\"page-item d-none\"><span class=\"page-link\" data-order-id=\"";
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 141, $this->source); })()), "id", [], "any", false, false, false, 141), "html", null, true);
        echo "\"
                                               data-page=\"\"></span></li>
            <li class=\"page-item\" id=\"orderProductsTablePaginationNext\">
              <a class=\"page-link\" href=\"javascript:void(0);\" aria-label=\"Next\">
                <span aria-hidden=\"true\">&raquo;</span>
                <span class=\"sr-only\">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class=\"col-md-6 text-right discount-action\">
        ";
        // line 153
        if ( !twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 153, $this->source); })()), "delivered", [], "any", false, false, false, 153)) {
            // line 154
            echo "          <button type=\"button\" class=\"btn btn-outline-secondary js-product-action-btn mr-3\" id=\"addProductBtn\">
            <i class=\"material-icons\">add_circle_outline</i>
            ";
            // line 156
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Add a product", [], "Admin.Orderscustomers.Feature"), "html", null, true);
            echo "
          </button>
        ";
        }
        // line 159
        echo "        <button type=\"button\" class=\"btn btn-outline-secondary js-product-action-btn\" data-toggle=\"modal\"
                data-target=\"#addOrderDiscountModal\">
          <i class=\"material-icons\">confirmation_number</i>
          ";
        // line 162
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Add a discount", [], "Admin.Orderscustomers.Feature"), "html", null, true);
        echo "
        </button>
      </div>

      ";
        // line 166
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/discount_list.html.twig", "@PrestaShop/Admin/Sell/Order/Order/Blocks/View/products.html.twig", 166)->display(twig_array_merge($context, ["discounts" => twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source,         // line 167
(isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 167, $this->source); })()), "discounts", [], "any", false, false, false, 167), "discounts", [], "any", false, false, false, 167), "orderId" => twig_get_attribute($this->env, $this->source,         // line 168
(isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 168, $this->source); })()), "id", [], "any", false, false, false, 168)]));
        // line 170
        echo "
      <div class=\"col-md-12\">
        <div class=\"col-md-12\">
          <div class=\"info-block\">
            <div class=\"row\">
              <div class=\"col-sm text-center\">
                <p class=\"text-muted mb-0\"><strong>";
        // line 176
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Products", [], "Admin.Global"), "html", null, true);
        echo "</strong></p>
                <strong id=\"orderProductsTotal\">";
        // line 177
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 177, $this->source); })()), "prices", [], "any", false, false, false, 177), "productsPriceFormatted", [], "any", false, false, false, 177), "html", null, true);
        echo "</strong>
              </div>

              <div id=\"order-shipping-total-container\"
                   class=\"col-sm text-center";
        // line 181
        if ( !twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 181, $this->source); })()), "prices", [], "any", false, false, false, 181), "shippingPriceRaw", [], "any", false, false, false, 181), "greaterThan", [0 => $this->extensions['PrestaShopBundle\Twig\Extension\NumberExtension']->createNumber(0)], "method", false, false, false, 181)) {
            echo " d-none";
        }
        echo "\">
                <p class=\"text-muted mb-0\"><strong>";
        // line 182
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Shipping", [], "Admin.Catalog.Feature"), "html", null, true);
        echo "</strong></p>
                <div class=\"shipping-price\">
                  <strong id=\"orderShippingTotal\">";
        // line 184
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 184, $this->source); })()), "prices", [], "any", false, false, false, 184), "shippingPriceFormatted", [], "any", false, false, false, 184), "html", null, true);
        echo "</strong>
                  <br/>
                  <br/>
                  <div
                    class=\"cancel-product-element shipping-refund-amount";
        // line 188
        if (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 188, $this->source); })()), "prices", [], "any", false, false, false, 188), "shippingRefundableAmountRaw", [], "any", false, false, false, 188), "lowerOrEqualThan", [0 => $this->extensions['PrestaShopBundle\Twig\Extension\NumberExtension']->createNumber(0)], "method", false, false, false, 188)) {
            echo " hidden";
        }
        echo "\">
                    <div class=\"input-group\">
                      ";
        // line 190
        echo $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->searchAndRenderBlock(twig_get_attribute($this->env, $this->source, (isset($context["cancelProductForm"]) || array_key_exists("cancelProductForm", $context) ? $context["cancelProductForm"] : (function () { throw new RuntimeError('Variable "cancelProductForm" does not exist.', 190, $this->source); })()), "shipping_amount", [], "any", false, false, false, 190), 'widget');
        echo "
                      <div class=\"input-group-append\">
                        <div class=\"input-group-text\">";
        // line 192
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["orderCurrency"]) || array_key_exists("orderCurrency", $context) ? $context["orderCurrency"] : (function () { throw new RuntimeError('Variable "orderCurrency" does not exist.', 192, $this->source); })()), "symbol", [], "any", false, false, false, 192), "html", null, true);
        echo "</div>
                      </div>
                    </div>
                    <small class=\"text-center\">(max ";
        // line 195
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 195, $this->source); })()), "prices", [], "any", false, false, false, 195), "shippingRefundableAmountFormatted", [], "any", false, false, false, 195), "html", null, true);
        echo " incl.
                      btw)</small>
                  </div>
                </div>
              </div>

              <div id=\"order-discounts-total-container\"
                   class=\"col-sm text-center";
        // line 202
        if ( !twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 202, $this->source); })()), "prices", [], "any", false, false, false, 202), "discountsAmountRaw", [], "any", false, false, false, 202), "greaterThan", [0 => $this->extensions['PrestaShopBundle\Twig\Extension\NumberExtension']->createNumber(0)], "method", false, false, false, 202)) {
            echo " d-none";
        }
        echo "\">
                <p class=\"text-muted mb-0\"><strong>";
        // line 203
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Discounts", [], "Admin.Global"), "html", null, true);
        echo "</strong></p>
                <strong id=\"orderDiscountsTotal\">-";
        // line 204
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 204, $this->source); })()), "prices", [], "any", false, false, false, 204), "originalReductionAmountFormatted", [], "any", false, false, false, 204), "html", null, true);
        echo "</strong>
              </div>

              ";
        // line 208
        echo "              ";
        // line 209
        echo "              ";
        // line 210
        echo "              ";
        // line 211
        echo "              ";
        // line 212
        echo "
              ";
        // line 213
        if (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 213, $this->source); })()), "prices", [], "any", false, false, false, 213), "wrappingPriceRaw", [], "any", false, false, false, 213), "greaterThan", [0 => $this->extensions['PrestaShopBundle\Twig\Extension\NumberExtension']->createNumber(0)], "method", false, false, false, 213)) {
            // line 214
            echo "                <div class=\"col-sm text-center\">
                  <p class=\"text-muted mb-0\">
                    <strong>";
            // line 216
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Wrapping", [], "Admin.Orderscustomers.Feature"), "html", null, true);
            echo "</strong></p>
                  <strong id=\"orderWrappingTotal\">";
            // line 217
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 217, $this->source); })()), "prices", [], "any", false, false, false, 217), "wrappingPriceFormatted", [], "any", false, false, false, 217), "html", null, true);
            echo "</strong>
                </div>
              ";
        }
        // line 220
        echo "
              ";
        // line 221
        if ( !twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 221, $this->source); })()), "taxIncluded", [], "any", false, false, false, 221)) {
            // line 222
            echo "                <div class=\"col-sm text-center\">
                  <p class=\"text-muted mb-0\"><strong>";
            // line 223
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Taxes", [], "Admin.Global"), "html", null, true);
            echo "</strong></p>
                  <strong id=\"orderTaxesTotal\">";
            // line 224
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 224, $this->source); })()), "prices", [], "any", false, false, false, 224), "taxesAmountFormatted", [], "any", false, false, false, 224), "html", null, true);
            echo "</strong>
                </div>
              ";
        }
        // line 227
        echo "
              <div class=\"col-sm text-center\">
                <p class=\"text-muted mb-0\"><strong>";
        // line 229
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Total", [], "Admin.Global"), "html", null, true);
        echo "</strong></p>
                <span class=\"badge rounded badge-dark font-size-100\"
                      id=\"orderTotal\">";
        // line 231
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 231, $this->source); })()), "prices", [], "any", false, false, false, 231), "totalAmountFormatted", [], "any", false, false, false, 231), "html", null, true);
        echo "</span>
              </div>

              <div class=\"col-sm text-center\">
                <p class=\"text-muted mb-0\">
                  <strong>";
        // line 236
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Terugbetaald/Voucher", [], "Admin.Global"), "html", null, true);
        echo "</strong></p>
                <span class=\"badge rounded badge-dark font-size-100\"
                      id=\"orderTotal\">";
        // line 238
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 238, $this->source); })()), "prices", [], "any", false, false, false, 238), "remainderTotalAmount", [], "any", false, false, false, 238), "html", null, true);
        echo "</span>
              </div>
            </div>
          </div>
        </div>

        <div class=\"col-md-12\">
          <p class=\"mb-0 mt-1 text-center text-muted\">
            <small>
              ";
        // line 247
        echo $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("For this customer group, prices are displayed as: [1]%tax_method%[/1]", ["%tax_method%" => twig_get_attribute($this->env, $this->source,         // line 248
(isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 248, $this->source); })()), "taxMethod", [], "any", false, false, false, 248), "[1]" => "<strong>", "[/1]" => "</strong>"], "Admin.Orderscustomers.Notification");
        // line 251
        echo ".

              ";
        // line 253
        if ( !$this->extensions['PrestaShopBundle\Twig\LayoutExtension']->getConfiguration("PS_ORDER_RETURN")) {
            // line 254
            echo "                <strong>";
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Merchandise returns are disabled", [], "Admin.Orderscustomers.Notification"), "html", null, true);
            echo "</strong>
              ";
        }
        // line 256
        echo "            </small>
          </p>
          <div class=\"cancel-product-element refund-checkboxes-container\">
            <div class=\"cancel-product-element form-group restock-products\">
              ";
        // line 260
        echo $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->searchAndRenderBlock(twig_get_attribute($this->env, $this->source, (isset($context["cancelProductForm"]) || array_key_exists("cancelProductForm", $context) ? $context["cancelProductForm"] : (function () { throw new RuntimeError('Variable "cancelProductForm" does not exist.', 260, $this->source); })()), "restock", [], "any", false, false, false, 260), 'widget');
        echo "
            </div>
            <div class=\"cancel-product-element form-group refund-credit-slip\">
              ";
        // line 263
        echo $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->searchAndRenderBlock(twig_get_attribute($this->env, $this->source, (isset($context["cancelProductForm"]) || array_key_exists("cancelProductForm", $context) ? $context["cancelProductForm"] : (function () { throw new RuntimeError('Variable "cancelProductForm" does not exist.', 263, $this->source); })()), "credit_slip", [], "any", false, false, false, 263), 'widget');
        echo "
            </div>
            <div class=\"cancel-product-element form-group refund-voucher\">
              ";
        // line 266
        echo $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->searchAndRenderBlock(twig_get_attribute($this->env, $this->source, (isset($context["cancelProductForm"]) || array_key_exists("cancelProductForm", $context) ? $context["cancelProductForm"] : (function () { throw new RuntimeError('Variable "cancelProductForm" does not exist.', 266, $this->source); })()), "voucher", [], "any", false, false, false, 266), 'widget');
        echo "
            </div>
            <div
              class=\"cancel-product-element shipping-refund";
        // line 269
        if (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 269, $this->source); })()), "prices", [], "any", false, false, false, 269), "shippingRefundableAmountRaw", [], "any", false, false, false, 269), "lowerOrEqualThan", [0 => $this->extensions['PrestaShopBundle\Twig\Extension\NumberExtension']->createNumber(0)], "method", false, false, false, 269)) {
            echo " hidden";
        }
        echo "\" ";
        if (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 269, $this->source); })()), "prices", [], "any", false, false, false, 269), "shippingRefundableAmountRaw", [], "any", false, false, false, 269), "lowerOrEqualThan", [0 => $this->extensions['PrestaShopBundle\Twig\Extension\NumberExtension']->createNumber(0)], "method", false, false, false, 269)) {
            echo " style=\"display: none;\" ";
        }
        echo ">
              <div class=\"form-group\">
                ";
        // line 271
        echo $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->searchAndRenderBlock(twig_get_attribute($this->env, $this->source, (isset($context["cancelProductForm"]) || array_key_exists("cancelProductForm", $context) ? $context["cancelProductForm"] : (function () { throw new RuntimeError('Variable "cancelProductForm" does not exist.', 271, $this->source); })()), "shipping", [], "any", false, false, false, 271), 'widget');
        echo "
                <small class=\"shipping-refund-amount\">(";
        // line 272
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 272, $this->source); })()), "prices", [], "any", false, false, false, 272), "shippingRefundableAmountFormatted", [], "any", false, false, false, 272), "html", null, true);
        echo "
                  )</small>
              </div>
            </div>
            <div
              class=\"cancel-product-element form-group voucher-refund-type";
        // line 277
        if (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 277, $this->source); })()), "prices", [], "any", false, false, false, 277), "discountsAmountRaw", [], "any", false, false, false, 277), "lowerOrEqualThan", [0 => $this->extensions['PrestaShopBundle\Twig\Extension\NumberExtension']->createNumber(0)], "method", false, false, false, 277)) {
            echo " hidden";
        }
        echo "\" ";
        if (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 277, $this->source); })()), "prices", [], "any", false, false, false, 277), "discountsAmountRaw", [], "any", false, false, false, 277), "lowerOrEqualThan", [0 => $this->extensions['PrestaShopBundle\Twig\Extension\NumberExtension']->createNumber(0)], "method", false, false, false, 277)) {
            echo " style=\"display: none;\" ";
        }
        echo ">
              ";
        // line 278
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("This order has been partially paid by voucher. Choose the amount you want to refund:", [], "Admin.Orderscustomers.Feature"), "html", null, true);
        echo "
              ";
        // line 279
        echo $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->searchAndRenderBlock(twig_get_attribute($this->env, $this->source, (isset($context["cancelProductForm"]) || array_key_exists("cancelProductForm", $context) ? $context["cancelProductForm"] : (function () { throw new RuntimeError('Variable "cancelProductForm" does not exist.', 279, $this->source); })()), "voucher_refund_type", [], "any", false, false, false, 279), 'widget');
        echo "
              <div class=\"voucher-refund-type-negative-error\">
                ";
        // line 281
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Error. You cannot refund a negative amount.", [], "Admin.Orderscustomers.Notification"), "html", null, true);
        echo "
              </div>
            </div>
          </div>
        </div>
        <div class=\"cancel-product-element form-submit text-right\">
          ";
        // line 287
        echo $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->searchAndRenderBlock(twig_get_attribute($this->env, $this->source, (isset($context["cancelProductForm"]) || array_key_exists("cancelProductForm", $context) ? $context["cancelProductForm"] : (function () { throw new RuntimeError('Variable "cancelProductForm" does not exist.', 287, $this->source); })()), "cancel", [], "any", false, false, false, 287), 'widget');
        echo "
          ";
        // line 288
        echo $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->searchAndRenderBlock(twig_get_attribute($this->env, $this->source, (isset($context["cancelProductForm"]) || array_key_exists("cancelProductForm", $context) ? $context["cancelProductForm"] : (function () { throw new RuntimeError('Variable "cancelProductForm" does not exist.', 288, $this->source); })()), "save", [], "any", false, false, false, 288), 'widget');
        echo "
        </div>
      </div>
    </div>
    ";
        // line 292
        echo         $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->renderBlock((isset($context["cancelProductForm"]) || array_key_exists("cancelProductForm", $context) ? $context["cancelProductForm"] : (function () { throw new RuntimeError('Variable "cancelProductForm" does not exist.', 292, $this->source); })()), 'form_end');
        echo "
  </div>
</div>

";
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    public function getTemplateName()
    {
        return "@PrestaShop/Admin/Sell/Order/Order/Blocks/View/products.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  622 => 292,  615 => 288,  611 => 287,  602 => 281,  597 => 279,  593 => 278,  583 => 277,  575 => 272,  571 => 271,  560 => 269,  554 => 266,  548 => 263,  542 => 260,  536 => 256,  530 => 254,  528 => 253,  524 => 251,  522 => 248,  521 => 247,  509 => 238,  504 => 236,  496 => 231,  491 => 229,  487 => 227,  481 => 224,  477 => 223,  474 => 222,  472 => 221,  469 => 220,  463 => 217,  459 => 216,  455 => 214,  453 => 213,  450 => 212,  448 => 211,  446 => 210,  444 => 209,  442 => 208,  436 => 204,  432 => 203,  426 => 202,  416 => 195,  410 => 192,  405 => 190,  398 => 188,  391 => 184,  386 => 182,  380 => 181,  373 => 177,  369 => 176,  361 => 170,  359 => 168,  358 => 167,  357 => 166,  350 => 162,  345 => 159,  339 => 156,  335 => 154,  333 => 153,  317 => 141,  306 => 138,  302 => 137,  294 => 135,  290 => 134,  280 => 127,  276 => 126,  273 => 125,  269 => 124,  266 => 123,  264 => 122,  259 => 119,  245 => 117,  242 => 116,  238 => 115,  232 => 112,  223 => 105,  220 => 104,  217 => 103,  215 => 102,  207 => 97,  204 => 96,  198 => 93,  195 => 92,  192 => 91,  186 => 88,  183 => 87,  181 => 86,  176 => 84,  172 => 83,  166 => 80,  160 => 79,  155 => 77,  149 => 76,  144 => 74,  138 => 73,  133 => 71,  127 => 68,  123 => 67,  116 => 63,  109 => 59,  104 => 58,  102 => 55,  101 => 54,  100 => 53,  99 => 52,  98 => 51,  97 => 49,  86 => 41,  82 => 40,  76 => 36,  69 => 34,  66 => 33,  63 => 32,  60 => 31,  57 => 30,  54 => 29,  50 => 28,  48 => 27,  46 => 26,  43 => 25,);
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

{% set isColumnLocationDisplayed = false %}
{% set isColumnRefundedDisplayed = false %}
{% for product in orderForViewing.products.products|slice(0, paginationNum) %}
  {% if product.location is not empty %}
    {% set isColumnLocationDisplayed = true %}
  {% endif %}
  {% if product.quantityRefunded > 0 %}
    {% set isColumnRefundedDisplayed = true %}
  {% endif %}
{% endfor %}

<div class=\"card\" id=\"orderProductsPanel\">
  <div class=\"card-header\">
    <h3 class=\"card-header-title\">
      {{ 'Products'|trans({}, 'Admin.Global') }} (<span
        id=\"orderProductsPanelCount\">{{ orderForViewing.products.products|length }}</span>)
    </h3>
  </div>

  <div class=\"card-body\">
    <div class=\"spinner-order-products-container\" id=\"orderProductsLoading\" style=\"display:none;\">
      <div class=\"spinner spinner-primary\"></div>
    </div>
    {% set formOptions = {
      'attr': {
        'data-order-id': orderForViewing.id,
        'data-is-delivered': orderForViewing.isDelivered,
        'data-is-tax-included': orderForViewing.isTaxIncluded,
        'data-discounts-amount': orderForViewing.prices.discountsAmountRaw,
        'data-price-specification': priceSpecification|json_encode
      }
    } %}
    {{ form_start(cancelProductForm, formOptions) }}
    <table class=\"table\" id=\"orderProductsTable\" data-currency-precision=\"{{ orderCurrency.precision }}\">
      <thead>
      <tr>
        <th>
          <p>{{ 'Product'|trans({}, 'Admin.Global') }}</p>
        </th>
        <th></th>
        <th>
          <p class=\"mb-0\">{{ 'Price per unit'|trans({}, 'Admin.Advparameters.Feature') }}</p>
          <small class=\"text-muted\">{{ orderForViewing.taxMethod }}</small>
        </th>
        <th>
          <p>{{ 'Quantity'|trans({}, 'Admin.Global') }}</p>
        </th>
        <th class=\"cellProductLocation{% if not isColumnLocationDisplayed %} d-none{% endif %}\">
          <p>{{ 'Stock location'|trans({}, 'Admin.Orderscustomers.Feature') }}</p>
        </th>
        <th class=\"cellProductRefunded{% if not isColumnRefundedDisplayed %} d-none{% endif %}\">
          <p>{{ 'Refunded'|trans({}, 'Admin.Orderscustomers.Feature') }}</p>
        </th>
        <th {% if not isAvailableQuantityDisplayed %}class=\"d-none\"{% endif %}>
          <p>{{ 'Available'|trans({}, 'Admin.Global') }}</p>
        </th>
        <th>
          <p class=\"mb-0\">{{ 'Total'|trans({}, 'Admin.Global') }}</p>
          <small class=\"text-muted\">{{ orderForViewing.taxMethod }}</small>
        </th>
        {% if orderForViewing.hasInvoice() %}
          <th>
            <p>{{ 'Invoice'|trans({}, 'Admin.Global') }}</p>
          </th>
        {% endif %}
        {% if not orderForViewing.delivered %}
          <th class=\"text-right product_actions d-print-none\">
            <p>{{ 'Actions'|trans({}, 'Admin.Global') }}</p>
          </th>
        {% endif %}
        <th class=\"text-center cancel-product-element\">
          <p>{{ 'Partial refund'|trans({}, 'Admin.Orderscustomers.Feature') }}</p>
        </th>
      </tr>
      </thead>
      <tbody>
      {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/product_list.html.twig' %}
      {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/add_product_row.html.twig' %}
      {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/edit_product_row.html.twig' %}
      </tbody>
    </table>

    <div class=\"row mb-3\">
      <div class=\"col-md-6 text-left d-print-none order-product-pagination\">
        <div class=\"form-group row\">
          <label for=\"paginator_select_page_limit\"
                 class=\"col-form-label ml-3\">{{ \"Items per page:\"|trans({}, 'Admin.Catalog.Feature') }}</label>
          <div class=\"col\">
            <select id=\"orderProductsTablePaginationNumberSelector\" class=\"pagination-link custom-select\">
              {% for numPageOption in paginationNumOptions %}
                <option
                  value=\"{{ numPageOption }}\"{% if numPageOption == paginationNum %} selected{% endif %}>{{ numPageOption }}</option>
              {% endfor %}
            </select>
          </div>
        </div>
        {% set numPages = max(orderForViewing.products.products|length / paginationNum, 1)|round(0, 'ceil') %}
        <nav
          aria-label=\"Products Navigation\"{% if orderForViewing.products.products|length <= paginationNum %} class=\"d-none\"{% endif %}
          id=\"orderProductsNavPagination\">
          <ul class=\"pagination\" id=\"orderProductsTablePagination\" data-num-per-page=\"{{ paginationNum }}\"
              data-num-pages=\"{{ numPages }}\">
            <li class=\"page-item disabled\" id=\"orderProductsTablePaginationPrev\">
              <a class=\"page-link\" href=\"javascript:void(0);\" aria-label=\"Previous\">
                <span aria-hidden=\"true\">&laquo;</span>
                <span class=\"sr-only\">Previous</span>
              </a>
            </li>
            {% for numPage in 1..numPages %}
              <li class=\"page-item{% if numPage==1 %} active{% endif %}\">
                <span class=\"page-link\"
                      data-order-id=\"{{ orderForViewing.id }}\"
                      data-page=\"{{ numPage }}\">{{ numPage }}</span>
              </li>
            {% endfor %}
            <li class=\"page-item d-none\"><span class=\"page-link\" data-order-id=\"{{ orderForViewing.id }}\"
                                               data-page=\"\"></span></li>
            <li class=\"page-item\" id=\"orderProductsTablePaginationNext\">
              <a class=\"page-link\" href=\"javascript:void(0);\" aria-label=\"Next\">
                <span aria-hidden=\"true\">&raquo;</span>
                <span class=\"sr-only\">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class=\"col-md-6 text-right discount-action\">
        {% if not orderForViewing.delivered %}
          <button type=\"button\" class=\"btn btn-outline-secondary js-product-action-btn mr-3\" id=\"addProductBtn\">
            <i class=\"material-icons\">add_circle_outline</i>
            {{ 'Add a product'|trans({}, 'Admin.Orderscustomers.Feature') }}
          </button>
        {% endif %}
        <button type=\"button\" class=\"btn btn-outline-secondary js-product-action-btn\" data-toggle=\"modal\"
                data-target=\"#addOrderDiscountModal\">
          <i class=\"material-icons\">confirmation_number</i>
          {{ 'Add a discount'|trans({}, 'Admin.Orderscustomers.Feature') }}
        </button>
      </div>

      {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/discount_list.html.twig' with {
        'discounts': orderForViewing.discounts.discounts,
        'orderId': orderForViewing.id
      } %}

      <div class=\"col-md-12\">
        <div class=\"col-md-12\">
          <div class=\"info-block\">
            <div class=\"row\">
              <div class=\"col-sm text-center\">
                <p class=\"text-muted mb-0\"><strong>{{ 'Products'|trans({}, 'Admin.Global') }}</strong></p>
                <strong id=\"orderProductsTotal\">{{ orderForViewing.prices.productsPriceFormatted }}</strong>
              </div>

              <div id=\"order-shipping-total-container\"
                   class=\"col-sm text-center{% if not orderForViewing.prices.shippingPriceRaw.greaterThan((number(0))) %} d-none{% endif %}\">
                <p class=\"text-muted mb-0\"><strong>{{ 'Shipping'|trans({}, 'Admin.Catalog.Feature') }}</strong></p>
                <div class=\"shipping-price\">
                  <strong id=\"orderShippingTotal\">{{ orderForViewing.prices.shippingPriceFormatted }}</strong>
                  <br/>
                  <br/>
                  <div
                    class=\"cancel-product-element shipping-refund-amount{% if orderForViewing.prices.shippingRefundableAmountRaw.lowerOrEqualThan(number(0)) %} hidden{% endif %}\">
                    <div class=\"input-group\">
                      {{ form_widget(cancelProductForm.shipping_amount) }}
                      <div class=\"input-group-append\">
                        <div class=\"input-group-text\">{{ orderCurrency.symbol }}</div>
                      </div>
                    </div>
                    <small class=\"text-center\">(max {{ orderForViewing.prices.shippingRefundableAmountFormatted }} incl.
                      btw)</small>
                  </div>
                </div>
              </div>

              <div id=\"order-discounts-total-container\"
                   class=\"col-sm text-center{% if not orderForViewing.prices.discountsAmountRaw.greaterThan((number(0))) %} d-none{% endif %}\">
                <p class=\"text-muted mb-0\"><strong>{{ 'Discounts'|trans({}, 'Admin.Global') }}</strong></p>
                <strong id=\"orderDiscountsTotal\">-{{ orderForViewing.prices.originalReductionAmountFormatted }}</strong>
              </div>

              {#              <div id=\"order-discounts-total-container\" #}
              {#                   class=\"col-sm text-center{% if not orderForViewing.prices.discountsAmountRaw.greaterThan((number(0))) %} d-none{% endif %}\"> #}
              {#                <p class=\"text-muted mb-0\"><strong>{{ 'Voucher total'|trans({}, 'Admin.Global') }}</strong></p> #}
              {#                <strong id=\"orderDiscountsTotal\">-{{ orderForViewing.prices.originalReductionAmountFormatted }}</strong> #}
              {#              </div> #}

              {% if orderForViewing.prices.wrappingPriceRaw.greaterThan(number(0)) %}
                <div class=\"col-sm text-center\">
                  <p class=\"text-muted mb-0\">
                    <strong>{{ 'Wrapping'|trans({}, 'Admin.Orderscustomers.Feature') }}</strong></p>
                  <strong id=\"orderWrappingTotal\">{{ orderForViewing.prices.wrappingPriceFormatted }}</strong>
                </div>
              {% endif %}

              {% if not orderForViewing.taxIncluded %}
                <div class=\"col-sm text-center\">
                  <p class=\"text-muted mb-0\"><strong>{{ 'Taxes'|trans({}, 'Admin.Global') }}</strong></p>
                  <strong id=\"orderTaxesTotal\">{{ orderForViewing.prices.taxesAmountFormatted }}</strong>
                </div>
              {% endif %}

              <div class=\"col-sm text-center\">
                <p class=\"text-muted mb-0\"><strong>{{ 'Total'|trans({}, 'Admin.Global') }}</strong></p>
                <span class=\"badge rounded badge-dark font-size-100\"
                      id=\"orderTotal\">{{ orderForViewing.prices.totalAmountFormatted }}</span>
              </div>

              <div class=\"col-sm text-center\">
                <p class=\"text-muted mb-0\">
                  <strong>{{ 'Terugbetaald/Voucher'|trans({}, 'Admin.Global') }}</strong></p>
                <span class=\"badge rounded badge-dark font-size-100\"
                      id=\"orderTotal\">{{ orderForViewing.prices.remainderTotalAmount }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class=\"col-md-12\">
          <p class=\"mb-0 mt-1 text-center text-muted\">
            <small>
              {{ 'For this customer group, prices are displayed as: [1]%tax_method%[/1]'|trans({
                '%tax_method%': orderForViewing.taxMethod,
                '[1]': '<strong>',
                '[/1]': '</strong>'
              }, 'Admin.Orderscustomers.Notification')|raw }}.

              {% if not configuration('PS_ORDER_RETURN') %}
                <strong>{{ 'Merchandise returns are disabled'|trans({}, 'Admin.Orderscustomers.Notification') }}</strong>
              {% endif %}
            </small>
          </p>
          <div class=\"cancel-product-element refund-checkboxes-container\">
            <div class=\"cancel-product-element form-group restock-products\">
              {{ form_widget(cancelProductForm.restock) }}
            </div>
            <div class=\"cancel-product-element form-group refund-credit-slip\">
              {{ form_widget(cancelProductForm.credit_slip) }}
            </div>
            <div class=\"cancel-product-element form-group refund-voucher\">
              {{ form_widget(cancelProductForm.voucher) }}
            </div>
            <div
              class=\"cancel-product-element shipping-refund{% if orderForViewing.prices.shippingRefundableAmountRaw.lowerOrEqualThan(number(0)) %} hidden{% endif %}\" {% if orderForViewing.prices.shippingRefundableAmountRaw.lowerOrEqualThan(number(0)) %} style=\"display: none;\" {% endif %}>
              <div class=\"form-group\">
                {{ form_widget(cancelProductForm.shipping) }}
                <small class=\"shipping-refund-amount\">({{ orderForViewing.prices.shippingRefundableAmountFormatted }}
                  )</small>
              </div>
            </div>
            <div
              class=\"cancel-product-element form-group voucher-refund-type{% if orderForViewing.prices.discountsAmountRaw.lowerOrEqualThan(number(0)) %} hidden{% endif %}\" {% if orderForViewing.prices.discountsAmountRaw.lowerOrEqualThan(number(0)) %} style=\"display: none;\" {% endif %}>
              {{ 'This order has been partially paid by voucher. Choose the amount you want to refund:'|trans({}, 'Admin.Orderscustomers.Feature') }}
              {{ form_widget(cancelProductForm.voucher_refund_type) }}
              <div class=\"voucher-refund-type-negative-error\">
                {{ 'Error. You cannot refund a negative amount.'|trans({}, 'Admin.Orderscustomers.Notification') }}
              </div>
            </div>
          </div>
        </div>
        <div class=\"cancel-product-element form-submit text-right\">
          {{ form_widget(cancelProductForm.cancel) }}
          {{ form_widget(cancelProductForm.save) }}
        </div>
      </div>
    </div>
    {{ form_end(cancelProductForm) }}
  </div>
</div>

", "@PrestaShop/Admin/Sell/Order/Order/Blocks/View/products.html.twig", "C:\\wampserver\\www\\ijzershop8.local\\modules\\msthemeconfig\\views\\PrestaShop\\Admin\\Sell\\Order\\Order\\Blocks\\View\\products.html.twig");
    }
}

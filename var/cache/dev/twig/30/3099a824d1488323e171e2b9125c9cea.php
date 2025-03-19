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

/* @Modules/msthemeconfig/views/templates/admin/order_actions.html.twig */
class __TwigTemplate_5b422ed1bfa6669ba1d8282848b83937 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
            'javascripts' => [$this, 'block_javascripts'],
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@Modules/msthemeconfig/views/templates/admin/order_actions.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@Modules/msthemeconfig/views/templates/admin/order_actions.html.twig"));

        // line 25
        echo "
<div class=\"col-12 pl-0 pr-0 navbar\">

  ";
        // line 28
        echo         $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->renderBlock((isset($context["updateOrderStatusActionBarForm"]) || array_key_exists("updateOrderStatusActionBarForm", $context) ? $context["updateOrderStatusActionBarForm"] : (function () { throw new RuntimeError('Variable "updateOrderStatusActionBarForm" does not exist.', 28, $this->source); })()), 'form_start', ["action" => $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("admin_orders_update_status", ["orderId" => twig_get_attribute($this->env, $this->source,         // line 29
(isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 29, $this->source); })()), "id", [], "any", false, false, false, 29)]), "attr" => ["id" => "update_order_status_action_form", "class" => "form-inline"]]);
        // line 34
        echo "

  <div class=\"input-group\">
    ";
        // line 37
        $context["backgroundColor"] = "#ffffff";
        // line 38
        echo "    ";
        $context["isBright"] = true;
        // line 39
        echo "    ";
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["updateOrderStatusActionBarForm"]) || array_key_exists("updateOrderStatusActionBarForm", $context) ? $context["updateOrderStatusActionBarForm"] : (function () { throw new RuntimeError('Variable "updateOrderStatusActionBarForm" does not exist.', 39, $this->source); })()), "new_order_status_id", [], "any", false, false, false, 39), "vars", [], "any", false, false, false, 39), "choices", [], "any", false, false, false, 39));
        foreach ($context['_seq'] as $context["_key"] => $context["choice"]) {
            // line 40
            echo "      ";
            if ((twig_get_attribute($this->env, $this->source, $context["choice"], "value", [], "any", false, false, false, 40) == twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["updateOrderStatusActionBarForm"]) || array_key_exists("updateOrderStatusActionBarForm", $context) ? $context["updateOrderStatusActionBarForm"] : (function () { throw new RuntimeError('Variable "updateOrderStatusActionBarForm" does not exist.', 40, $this->source); })()), "new_order_status_id", [], "any", false, false, false, 40), "vars", [], "any", false, false, false, 40), "data", [], "any", false, false, false, 40))) {
                // line 41
                echo "

        ";
                // line 43
                $context["backgroundColor"] = twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, $context["choice"], "attr", [], "any", false, false, false, 43), "data-background-color", [], "array", false, false, false, 43);
                // line 44
                echo "        ";
                $context["isBright"] = twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, $context["choice"], "attr", [], "any", false, false, false, 44), "data-is-bright", [], "array", false, false, false, 44);
                // line 45
                echo "      ";
            }
            // line 46
            echo "    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['choice'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 47
        echo "    ";
        // line 48
        echo "    ";
        echo $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->searchAndRenderBlock(twig_get_attribute($this->env, $this->source, (isset($context["updateOrderStatusActionBarForm"]) || array_key_exists("updateOrderStatusActionBarForm", $context) ? $context["updateOrderStatusActionBarForm"] : (function () { throw new RuntimeError('Variable "updateOrderStatusActionBarForm" does not exist.', 48, $this->source); })()), "new_order_status_id", [], "any", false, false, false, 48), 'widget', ["attr" => ["class" => "select-status-colored form-control", "style" => "border-color: {{ backgroundColor }}", "data-width" => "300px"], "choices" => twig_array_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source,         // line 54
(isset($context["updateOrderStatusActionBarForm"]) || array_key_exists("updateOrderStatusActionBarForm", $context) ? $context["updateOrderStatusActionBarForm"] : (function () { throw new RuntimeError('Variable "updateOrderStatusActionBarForm" does not exist.', 54, $this->source); })()), "new_order_status_id", [], "any", false, false, false, 54), "vars", [], "any", false, false, false, 54), "choices", [], "any", false, false, false, 54), function ($__choice__) use ($context, $macros) { $context["choice"] = $__choice__; return twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["choice"]) || array_key_exists("choice", $context) ? $context["choice"] : (function () { throw new RuntimeError('Variable "choice" does not exist.', 54, $this->source); })()), "attr", [], "any", false, false, false, 54), "visible_in_select_box", [], "array", false, false, false, 54); }), "id" => "update_order_status_action_input"]);
        // line 56
        echo "
    ";
        // line 58
        echo "    <div class=\"input-group-append\">
      <button class=\"btn btn-action\"
              id=\"update_order_status_action_btn\"
              disabled
              data-order-status-id=\"";
        // line 62
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 62, $this->source); })()), "history", [], "any", false, false, false, 62), "currentOrderStatusId", [], "any", false, false, false, 62), "html", null, true);
        echo "\"
      >
        ";
        // line 64
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Update status", [], "Admin.Orderscustomers.Feature"), "html", null, true);
        echo "
      </button>
    </div>
  </div>

  <div class=\"d-none\">
    ";
        // line 70
        echo $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->searchAndRenderBlock((isset($context["updateOrderStatusActionBarForm"]) || array_key_exists("updateOrderStatusActionBarForm", $context) ? $context["updateOrderStatusActionBarForm"] : (function () { throw new RuntimeError('Variable "updateOrderStatusActionBarForm" does not exist.', 70, $this->source); })()), 'rest');
        echo "
  </div>
  ";
        // line 72
        echo         $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->renderBlock((isset($context["updateOrderStatusActionBarForm"]) || array_key_exists("updateOrderStatusActionBarForm", $context) ? $context["updateOrderStatusActionBarForm"] : (function () { throw new RuntimeError('Variable "updateOrderStatusActionBarForm" does not exist.', 72, $this->source); })()), 'form_end');
        echo "






  ";
        // line 80
        echo "  <form class=\"order-actions-shipping-status\">
    <div class=\"input-group\">
      <button type=\"button\" id=\"showDeliverySlipMessageBtn\" data-order-id=\"";
        // line 82
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["order"]) || array_key_exists("order", $context) ? $context["order"] : (function () { throw new RuntimeError('Variable "order" does not exist.', 82, $this->source); })()), "id", [], "any", false, false, false, 82), "html", null, true);
        echo "\" data-toggle=\"modal\"
              data-target=\"#showDeliverySlipMessageModal\"
              class=\"btn btn-action\">
        <i class=\"material-icons\">local_shipping</i>
        ";
        // line 86
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Pakbon Bericht", [], "Admin.Orderscustomers.Feature"), "html", null, true);
        echo "
      </button>
    </div>
  </form>



  ";
        // line 94
        echo "  <form class=\"order-actions-resend-order-conf\">
    <div class=\"input-group\">
      <button type=\"button\" id=\"resendOrderMessageBtn\" data-order-id=\"";
        // line 96
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["order"]) || array_key_exists("order", $context) ? $context["order"] : (function () { throw new RuntimeError('Variable "order" does not exist.', 96, $this->source); })()), "id", [], "any", false, false, false, 96), "html", null, true);
        echo "\" class=\"btn btn-action\">
        <i class=\"material-icons\">send</i>
        ";
        // line 98
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Mail bevestiging", [], "Admin.Orderscustomers.Feature"), "html", null, true);
        echo "
      </button>
    </div>
  </form>


  ";
        // line 105
        echo "
  ";
        // line 107
        echo "  <form class=\"order-action-desired-delivery-date mt-3\">
    <div class=\"input-group\">
      <input class=\"form-control\" type=\"date\" min=\"";
        // line 109
        echo twig_escape_filter($this->env, twig_date_format_filter($this->env, "now", "Y/m/d"), "html", null, true);
        echo "\" name=\"desired_delivery_date\"
             id=\"desired_delivery_date\"
             value=\"";
        // line 111
        if ((twig_get_attribute($this->env, $this->source, (isset($context["order"]) || array_key_exists("order", $context) ? $context["order"] : (function () { throw new RuntimeError('Variable "order" does not exist.', 111, $this->source); })()), "desired_delivery_date", [], "any", false, false, false, 111) == "0000-00-00")) {
            echo twig_escape_filter($this->env, twig_date_format_filter($this->env, "now", "Y/m/d"), "html", null, true);
        } else {
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["order"]) || array_key_exists("order", $context) ? $context["order"] : (function () { throw new RuntimeError('Variable "order" does not exist.', 111, $this->source); })()), "desired_delivery_date", [], "any", false, false, false, 111), "html", null, true);
        }
        echo "\"
             aria-describedby=\"desiredDeliveryHelpBlock\">
      <div class=\"input-group-append\">
        <button type=\"button\" id=\"clearDesiredDeliveryDate\" class=\"btn btn-primary\">Clear</button>
        <button type=\"button\" id=\"submitDesiredDeliveryDate\" class=\"btn btn-success\">Submit</button>
      </div>
    </div>
    <small id=\"desiredDeliveryHelpBlock\" class=\"form-text text-muted\">Gewenste leverdatum voor bestelling</small>
  </form>

  ";
        // line 122
        echo "  <form class=\"order-actions-migrate-to-customer mt-3\" id=\"migrateToCustomer\">
    <div class=\"input-group ui-widget\">
      <input type=\"text\" class=\"form-control\" style=\"width:150px;\" id=\"selectCustomerToMigrate\"
             placeholder=\"Selecteer een klant\" aria-describedby=\"switchOrderToUserHelpBlock\">
      <div class=\"input-group-append\">
        <button type=\"button\" id=\"migrateOrder\" class=\"btn btn-secondary btn-primary\"><i class=\"material-icons\">transfer_within_a_station</i>
        </button>
      </div>
    </div>
    <small id=\"switchOrderToUserHelpBlock\" class=\"form-text text-muted\">Koppel bestelling aan andere gebruiker</small>
  </form>


</div>
</div>

<div class=\"col-12 pl-0 pr-0 navbar\">
  ";
        // line 139
        if (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 139, $this->source); })()), "documents", [], "any", false, false, false, 139), "canGenerateInvoice", [], "any", false, false, false, 139)) {
            // line 140
            echo "    <form class=\"order-actions-invoice\">
      <div class=\"input-group\">
        <a href=\"";
            // line 142
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("admin_orders_generate_invoice_pdf", ["orderId" => twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 142, $this->source); })()), "id", [], "any", false, false, false, 142)]), "html", null, true);
            echo "\"
           class=\"btn btn-action\">
          <i class=\"material-icons\">receipt</i>
          ";
            // line 145
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("View invoice", [], "Admin.Orderscustomers.Feature"), "html", null, true);
            echo "
        </a>
      </div>
    </form>
  ";
        }
        // line 150
        echo "
  <form class=\"order-actions-print\">
    <div class=\"input-group\">
      <button type=\"button\" class=\"btn btn-action js-print-order-view-page\">
        <i class=\"material-icons\" aria-hidden=\"true\">print</i>
        ";
        // line 155
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Print order", [], "Admin.Orderscustomers.Feature"), "html", null, true);
        echo "
      </button>
    </div>
  </form>

  ";
        // line 160
        if (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 160, $this->source); })()), "documents", [], "any", false, false, false, 160), "canGenerateDeliverySlip", [], "any", false, false, false, 160)) {
            // line 161
            echo "    <form class=\"order-actions-delivery\">
      <div class=\"input-group\">
        <a href=\"";
            // line 163
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("admin_orders_generate_delivery_slip_pdf", ["orderId" => twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 163, $this->source); })()), "id", [], "any", false, false, false, 163)]), "html", null, true);
            echo "\"
           class=\"btn btn-action\">
          <i class=\"material-icons\">local_shipping</i>
          ";
            // line 166
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("View delivery slip", [], "Admin.Orderscustomers.Feature"), "html", null, true);
            echo "
        </a>
      </div>
    </form>
  ";
        }
        // line 171
        echo "

  ";
        // line 174
        echo "  <form class=\"order-actions-shipping-status\">
    <div class=\"input-group\">
      <button type=\"button\" id=\"showShippingStatusBtn\" data-history=\"";
        // line 176
        echo twig_escape_filter($this->env, json_encode((isset($context["history"]) || array_key_exists("history", $context) ? $context["history"] : (function () { throw new RuntimeError('Variable "history" does not exist.', 176, $this->source); })())), "html", null, true);
        echo "\"
              data-order-reference=\"";
        // line 177
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 177, $this->source); })()), "reference", [], "any", false, false, false, 177), "html", null, true);
        echo "\" data-toggle=\"modal\"
              data-target=\"#showShippingStatusModal\"
              class=\"btn btn-action\">
        <i class=\"material-icons\">local_shipping</i>
        ";
        // line 181
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Verzend Status", [], "Admin.Orderscustomers.Feature"), "html", null, true);
        echo "
      </button>
    </div>
  </form>

  ";
        // line 186
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/View/extra_order_button_actions.html.twig", "@Modules/msthemeconfig/views/templates/admin/order_actions.html.twig", 186)->display($context);
        // line 187
        echo "
  ";
        // line 188
        if ((isset($context["merchandiseReturnEnabled"]) || array_key_exists("merchandiseReturnEnabled", $context) ? $context["merchandiseReturnEnabled"] : (function () { throw new RuntimeError('Variable "merchandiseReturnEnabled" does not exist.', 188, $this->source); })())) {
            // line 189
            echo "    ";
            if (twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 189, $this->source); })()), "isDelivered", [], "method", false, false, false, 189)) {
                // line 190
                echo "      <button class=\"btn-secondary btn btn-action return-product-display\"
              type=\"button\"";
                // line 191
                if ( !twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 191, $this->source); })()), "isRefundable", [], "method", false, false, false, 191)) {
                    echo " disabled";
                }
                echo ">
        <i class=\"material-icons\">swap_horiz</i>
        ";
                // line 193
                echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Return products", [], "Admin.Orderscustomers.Feature"), "html", null, true);
                echo "
      </button>
    ";
            } elseif ((twig_get_attribute($this->env, $this->source,             // line 195
(isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 195, $this->source); })()), "hasBeenPaid", [], "method", false, false, false, 195) || twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 195, $this->source); })()), "hasPayments", [], "method", false, false, false, 195))) {
                // line 196
                echo "      <button class=\"btn-secondary btn btn-action standard-refund-display\"
              type=\"button\"";
                // line 197
                if ( !twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 197, $this->source); })()), "isRefundable", [], "method", false, false, false, 197)) {
                    echo " disabled";
                }
                echo ">
        <i class=\"material-icons\">swap_horiz</i>
        ";
                // line 199
                echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Standard refund", [], "Admin.Orderscustomers.Feature"), "html", null, true);
                echo "
      </button>
    ";
            } else {
                // line 202
                echo "      <button class=\"btn-secondary btn btn-action cancel-product-display\" type=\"button\">
        ";
                // line 203
                echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Cancel products", [], "Admin.Orderscustomers.Feature"), "html", null, true);
                echo "
      </button>
    ";
            }
            // line 206
            echo "  ";
        }
        // line 207
        echo "
  ";
        // line 208
        if ((twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 208, $this->source); })()), "hasBeenPaid", [], "method", false, false, false, 208) || twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 208, $this->source); })()), "hasPayments", [], "method", false, false, false, 208))) {
            // line 209
            echo "    <button class=\"btn-secondary btn btn-action partial-refund-display\"
            type=\"button\"";
            // line 210
            if ( !twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 210, $this->source); })()), "isRefundable", [], "method", false, false, false, 210)) {
                echo " disabled";
            }
            echo ">
      <i class=\"material-icons\">swap_horiz</i>
      ";
            // line 212
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Partial refund", [], "Admin.Orderscustomers.Feature"), "html", null, true);
            echo "
    </button>
  ";
        }
        // line 215
        echo "
  ";
        // line 216
        $this->loadTemplate("@Modules/msthemeconfig/views/templates/admin/order_navigation.html.twig", "@Modules/msthemeconfig/views/templates/admin/order_actions.html.twig", 216)->display($context);
        // line 217
        echo "
</div>


";
        // line 222
        echo "

";
        // line 225
        echo "<div class=\"modal fade\" id=\"showShippingStatus\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"showShippingStatus\"
     aria-hidden=\"true\">
  <div class=\"modal-dialog\" role=\"document\">
    <div class=\"modal-content\">
      <div class=\"modal-header\">
        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
          <span aria-hidden=\"true\">&times;</span>
        </button>
      </div>
      <div class=\"modal-body\">
        <div class=\"loading-icon\" style=\"display:none;\"></div>
      </div>
      <div class=\"modal-footer\">
        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Sluiten</button>
      </div>
    </div>
  </div>
</div>
";
        // line 244
        echo "

";
        // line 247
        echo "<div class=\"modal fade\" id=\"showDeliverySlipMessageModal\" tabindex=\"-1\" role=\"dialog\"
     aria-labelledby=\"showDeliverySlipMessage\" aria-hidden=\"true\">
  <div class=\"modal-dialog\" role=\"document\">
    <div class=\"modal-content\">
      <div class=\"modal-header\"><h4>Pakbon Bericht</h4>
        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
          <span aria-hidden=\"true\">&times;</span>
        </button>
      </div>
      <form id=\"delivery-slip-message-form\">
        <div class=\"modal-body\">
        </div>
      </form>
      <div class=\"modal-footer\">
        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Sluiten</button>
        <button type=\"button\" id=\"save-delivery-message-btn\" class=\"btn btn-success\">Opslaan</button>
      </div>
    </div>
  </div>
</div>
";
        // line 268
        $this->displayBlock('javascripts', $context, $blocks);
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    public function block_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        // line 269
        echo "  <script type=\"text/javascript\">
    \$(document).ready(function () {

      \$('#resendOrderMessageBtn').on('click', function (event) {
        event.preventDefault();
        \$.ajax({
          type: 'GET',
          url: 'index.php?ajax=1&controller=AdminOrders&action=resendOrderMessage&token=' + token,
          data: {id_order: ";
        // line 277
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 277, $this->source); })()), "id", [], "any", false, false, false, 277), "html", null, true);
        echo "},
          success: function (r) {
            r = JSON.parse(r);
            if (r.success) {
              \$.growl({title: \"Order bevestiging opnieuw verzonden naar klant!\", message: r.msg});
              window.location.reload(true);
            } else {
              \$.growl.error({title: \"Er ging wat mis bij het opnieuw verzenden van de order bevestiging!\", message: r.msg});
            }
          }
        });
      });


      \$('#migrateOrder').on('click', function (event) {
        event.preventDefault();
        var customerEmail = \$('#selectCustomerToMigrate').val().split('#');

        var postdata = {
          customer_email: customerEmail[0],
          customer: customerEmail[1],
          order: ";
        // line 298
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 298, $this->source); })()), "id", [], "any", false, false, false, 298), "html", null, true);
        echo "
        };
        \$.ajax({
          type: 'GET',
          url: 'index.php?ajax=1&controller=AdminOrders&action=migrateOrderToCustomer&token=' + token,
          data: postdata,
          success: function (r) {
            r = JSON.parse(r);
            if (r.success) {
              \$.growl({title: \"Geslaagd!\", message: r.msg});
              window.location.reload(true);
            } else {
              \$.growl.error({title: \"Fout!\", message: r.msg});
            }
          }
        });
      });


      \$('#submitDesiredDeliveryDate').on('click', function (event) {
        event.preventDefault();
        var date = \$('#desired_delivery_date').val();
        \$.ajax({
          type: 'GET',
          url: 'index.php?ajax=1&controller=AdminOrders&action=setDesiredDeliveryDate&token=' + token,
          data: {date: date, id_order: ";
        // line 323
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 323, $this->source); })()), "id", [], "any", false, false, false, 323), "html", null, true);
        echo "},
          success: function (r) {
            r = JSON.parse(r);
            if (r.success) {
              \$.growl({title: \"Gewenste leverdatum ingesteld!\", message: r.msg});
              window.location.reload(true);
            } else {
              \$.growl.error({title: \"Fout bij instellen gewenste leverdatum!\", message: r.msg});
            }
          }
        });
      });

      \$('#clearDesiredDeliveryDate').on('click', function (event) {
        event.preventDefault();
        \$('#desired_delivery_date').val(null);
        \$.ajax({
          type: 'GET',
          url: 'index.php?ajax=1&controller=AdminOrders&action=setDesiredDeliveryDate&token=' + token,
          data: {date: null, id_order: ";
        // line 342
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["orderForViewing"]) || array_key_exists("orderForViewing", $context) ? $context["orderForViewing"] : (function () { throw new RuntimeError('Variable "orderForViewing" does not exist.', 342, $this->source); })()), "id", [], "any", false, false, false, 342), "html", null, true);
        echo "},
          success: function (r) {
            r = JSON.parse(r);
            if (r.success) {
              \$.growl({
                title: \"Gewenste leverdatum gewijzigd!\",
                message: 'Leverdatum is geleegd, deze word niet meer op de pakbon getoond'
              });
              window.location.reload(true);
            } else {
              \$.growl.error({title: \"Fout bij legen van leverdatum!\", message: r.msg});
            }
          }
        });
      });


      \$('#showShippingStatusBtn').on('click', function (event) {
        event.preventDefault();
        \$('#showShippingStatus').modal('show');
        \$('#showShippingStatus .loading-icon').show();
        var ref = \$(this).attr('data-order-reference');
        \$.ajax({
          url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1',
          type: 'GET',
          data: {
            reference: ref,
            method: 'orderstatus',
            ajax: true,
            render_template: true
          },
        }).done((e) => {
          \$('#showShippingStatus .modal-body').html(e);

        });
      });


      \$('#showDeliverySlipMessageBtn').on('click', function (event) {
        event.preventDefault();
        \$('#showDeliverySlipMessageModal').modal('show');
        var ref = \$(this).attr('data-order-id');
        \$.ajax({
          url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1',
          type: 'GET',
          data: {
            id: ref,
            method: 'delivery_message',
            ajax: true,
            render_template: true
          },
        }).done((e) => {
          \$('#showDeliverySlipMessageModal .modal-body').html(e);

        });
      });


      \$('#save-delivery-message-btn').on('click', function (event) {
        event.preventDefault();
        let orderId = \$('form#delivery-slip-message-form [name=\"id_order\"]').val();
        let deliverySlipMessage = \$('form#delivery-slip-message-form [name=\"delivery_slip_message\"]').val();
        let idDeliverySlipMessage = \$('form#delivery-slip-message-form [name=\"id_message\"]').val();
        let idCustomer = \$('form#delivery-slip-message-form [name=\"id_customer\"]').val();
        let idCart = \$('form#delivery-slip-message-form [name=\"id_cart\"]').val();

        let postdata = {
          id_order: orderId,
          id_message: idDeliverySlipMessage,
          message: deliverySlipMessage,
          customer: idCustomer,
          cart: idCart,
          ajax: true,
          method: 'save_delivery_message'
        };
        \$.ajax({
          type: 'GET',
          url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1',
          data: postdata,
          success: function (r) {
            r = JSON.parse(r);
            console.log(r)

            if (r.success) {
              \$.growl({title: \"Geslaagd!\", message: r.msg});
              window.location.reload(true);
            } else {
              \$.growl.error({title: \"Fout!\", message: r.msg});
            }
          }
        });
      });


    });
  </script>
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

    }

    public function getTemplateName()
    {
        return "@Modules/msthemeconfig/views/templates/admin/order_actions.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  541 => 342,  519 => 323,  491 => 298,  467 => 277,  457 => 269,  438 => 268,  416 => 247,  412 => 244,  392 => 225,  388 => 222,  382 => 217,  380 => 216,  377 => 215,  371 => 212,  364 => 210,  361 => 209,  359 => 208,  356 => 207,  353 => 206,  347 => 203,  344 => 202,  338 => 199,  331 => 197,  328 => 196,  326 => 195,  321 => 193,  314 => 191,  311 => 190,  308 => 189,  306 => 188,  303 => 187,  301 => 186,  293 => 181,  286 => 177,  282 => 176,  278 => 174,  274 => 171,  266 => 166,  260 => 163,  256 => 161,  254 => 160,  246 => 155,  239 => 150,  231 => 145,  225 => 142,  221 => 140,  219 => 139,  200 => 122,  183 => 111,  178 => 109,  174 => 107,  171 => 105,  162 => 98,  157 => 96,  153 => 94,  143 => 86,  136 => 82,  132 => 80,  122 => 72,  117 => 70,  108 => 64,  103 => 62,  97 => 58,  94 => 56,  92 => 54,  90 => 48,  88 => 47,  82 => 46,  79 => 45,  76 => 44,  74 => 43,  70 => 41,  67 => 40,  62 => 39,  59 => 38,  57 => 37,  52 => 34,  50 => 29,  49 => 28,  44 => 25,);
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

<div class=\"col-12 pl-0 pr-0 navbar\">

  {{ form_start(updateOrderStatusActionBarForm, {
    'action': path('admin_orders_update_status', {'orderId': orderForViewing.id}),
    'attr': {
      'id': 'update_order_status_action_form',
      'class': 'form-inline'
    }
  }) }}

  <div class=\"input-group\">
    {% set backgroundColor = '#ffffff' %}
    {% set isBright = true %}
    {% for choice in updateOrderStatusActionBarForm.new_order_status_id.vars.choices %}
      {% if choice.value == updateOrderStatusActionBarForm.new_order_status_id.vars.data %}


        {% set backgroundColor = choice.attr['data-background-color'] %}
        {% set isBright = choice.attr['data-is-bright'] %}
      {% endif %}
    {% endfor %}
    {#    <span class=\"select-status{% if isBright %} is-bright{% endif %}\" id=\"update_order_status_action_input_wrapper\" style=\"background-color:{{ backgroundColor }};\"> #}
    {{ form_widget(updateOrderStatusActionBarForm.new_order_status_id, {
      'attr': {
        'class': 'select-status-colored form-control',
        'style': 'border-color: {{ backgroundColor }}',
        'data-width': '300px'
      },
      'choices': updateOrderStatusActionBarForm.new_order_status_id.vars.choices|filter(choice => choice.attr['visible_in_select_box']),
      'id': 'update_order_status_action_input',
    }) }}
    {#    </span> #}
    <div class=\"input-group-append\">
      <button class=\"btn btn-action\"
              id=\"update_order_status_action_btn\"
              disabled
              data-order-status-id=\"{{ orderForViewing.history.currentOrderStatusId }}\"
      >
        {{ 'Update status'|trans({}, 'Admin.Orderscustomers.Feature') }}
      </button>
    </div>
  </div>

  <div class=\"d-none\">
    {{ form_rest(updateOrderStatusActionBarForm) }}
  </div>
  {{ form_end(updateOrderStatusActionBarForm) }}






  {# Pakbon bericht #}
  <form class=\"order-actions-shipping-status\">
    <div class=\"input-group\">
      <button type=\"button\" id=\"showDeliverySlipMessageBtn\" data-order-id=\"{{ order.id }}\" data-toggle=\"modal\"
              data-target=\"#showDeliverySlipMessageModal\"
              class=\"btn btn-action\">
        <i class=\"material-icons\">local_shipping</i>
        {{ 'Pakbon Bericht'|trans({}, 'Admin.Orderscustomers.Feature') }}
      </button>
    </div>
  </form>



  {# HerVerzend Order Bevestiging Mail #}
  <form class=\"order-actions-resend-order-conf\">
    <div class=\"input-group\">
      <button type=\"button\" id=\"resendOrderMessageBtn\" data-order-id=\"{{ order.id }}\" class=\"btn btn-action\">
        <i class=\"material-icons\">send</i>
        {{ 'Mail bevestiging'|trans({}, 'Admin.Orderscustomers.Feature') }}
      </button>
    </div>
  </form>


  {# Start add buttons to order view #}

  {# Start desired delivery date #}
  <form class=\"order-action-desired-delivery-date mt-3\">
    <div class=\"input-group\">
      <input class=\"form-control\" type=\"date\" min=\"{{ \"now\"|date(\"Y/m/d\") }}\" name=\"desired_delivery_date\"
             id=\"desired_delivery_date\"
             value=\"{% if order.desired_delivery_date == '0000-00-00' %}{{ \"now\"|date(\"Y/m/d\") }}{% else %}{{ order.desired_delivery_date }}{% endif %}\"
             aria-describedby=\"desiredDeliveryHelpBlock\">
      <div class=\"input-group-append\">
        <button type=\"button\" id=\"clearDesiredDeliveryDate\" class=\"btn btn-primary\">Clear</button>
        <button type=\"button\" id=\"submitDesiredDeliveryDate\" class=\"btn btn-success\">Submit</button>
      </div>
    </div>
    <small id=\"desiredDeliveryHelpBlock\" class=\"form-text text-muted\">Gewenste leverdatum voor bestelling</small>
  </form>

  {# Migrate Customer Button #}
  <form class=\"order-actions-migrate-to-customer mt-3\" id=\"migrateToCustomer\">
    <div class=\"input-group ui-widget\">
      <input type=\"text\" class=\"form-control\" style=\"width:150px;\" id=\"selectCustomerToMigrate\"
             placeholder=\"Selecteer een klant\" aria-describedby=\"switchOrderToUserHelpBlock\">
      <div class=\"input-group-append\">
        <button type=\"button\" id=\"migrateOrder\" class=\"btn btn-secondary btn-primary\"><i class=\"material-icons\">transfer_within_a_station</i>
        </button>
      </div>
    </div>
    <small id=\"switchOrderToUserHelpBlock\" class=\"form-text text-muted\">Koppel bestelling aan andere gebruiker</small>
  </form>


</div>
</div>

<div class=\"col-12 pl-0 pr-0 navbar\">
  {% if orderForViewing.documents.canGenerateInvoice %}
    <form class=\"order-actions-invoice\">
      <div class=\"input-group\">
        <a href=\"{{ path('admin_orders_generate_invoice_pdf', {'orderId': orderForViewing.id}) }}\"
           class=\"btn btn-action\">
          <i class=\"material-icons\">receipt</i>
          {{ 'View invoice'|trans({}, 'Admin.Orderscustomers.Feature') }}
        </a>
      </div>
    </form>
  {% endif %}

  <form class=\"order-actions-print\">
    <div class=\"input-group\">
      <button type=\"button\" class=\"btn btn-action js-print-order-view-page\">
        <i class=\"material-icons\" aria-hidden=\"true\">print</i>
        {{ 'Print order'|trans({}, 'Admin.Orderscustomers.Feature') }}
      </button>
    </div>
  </form>

  {% if orderForViewing.documents.canGenerateDeliverySlip %}
    <form class=\"order-actions-delivery\">
      <div class=\"input-group\">
        <a href=\"{{ path('admin_orders_generate_delivery_slip_pdf', {'orderId': orderForViewing.id}) }}\"
           class=\"btn btn-action\">
          <i class=\"material-icons\">local_shipping</i>
          {{ 'View delivery slip'|trans({}, 'Admin.Orderscustomers.Feature') }}
        </a>
      </div>
    </form>
  {% endif %}


  {# Shipping Status Button #}
  <form class=\"order-actions-shipping-status\">
    <div class=\"input-group\">
      <button type=\"button\" id=\"showShippingStatusBtn\" data-history=\"{{ history|json_encode }}\"
              data-order-reference=\"{{ orderForViewing.reference }}\" data-toggle=\"modal\"
              data-target=\"#showShippingStatusModal\"
              class=\"btn btn-action\">
        <i class=\"material-icons\">local_shipping</i>
        {{ 'Verzend Status'|trans({}, 'Admin.Orderscustomers.Feature') }}
      </button>
    </div>
  </form>

  {% include '@PrestaShop/Admin/Sell/Order/Order/Blocks/View/extra_order_button_actions.html.twig' %}

  {% if merchandiseReturnEnabled %}
    {% if orderForViewing.isDelivered() %}
      <button class=\"btn-secondary btn btn-action return-product-display\"
              type=\"button\"{% if not orderForViewing.isRefundable() %} disabled{% endif %}>
        <i class=\"material-icons\">swap_horiz</i>
        {{ 'Return products'|trans({}, 'Admin.Orderscustomers.Feature') }}
      </button>
    {% elseif orderForViewing.hasBeenPaid() or orderForViewing.hasPayments() %}
      <button class=\"btn-secondary btn btn-action standard-refund-display\"
              type=\"button\"{% if not orderForViewing.isRefundable() %} disabled{% endif %}>
        <i class=\"material-icons\">swap_horiz</i>
        {{ 'Standard refund'|trans({}, 'Admin.Orderscustomers.Feature') }}
      </button>
    {% else %}
      <button class=\"btn-secondary btn btn-action cancel-product-display\" type=\"button\">
        {{ 'Cancel products'|trans({}, 'Admin.Orderscustomers.Feature') }}
      </button>
    {% endif %}
  {% endif %}

  {% if orderForViewing.hasBeenPaid() or orderForViewing.hasPayments() %}
    <button class=\"btn-secondary btn btn-action partial-refund-display\"
            type=\"button\"{% if not orderForViewing.isRefundable() %} disabled{% endif %}>
      <i class=\"material-icons\">swap_horiz</i>
      {{ 'Partial refund'|trans({}, 'Admin.Orderscustomers.Feature') }}
    </button>
  {% endif %}

  {% include '@Modules/msthemeconfig/views/templates/admin/order_navigation.html.twig' %}

</div>


{# End add buttons to order view #}


{#  ShippingStatusModal Start  #}
<div class=\"modal fade\" id=\"showShippingStatus\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"showShippingStatus\"
     aria-hidden=\"true\">
  <div class=\"modal-dialog\" role=\"document\">
    <div class=\"modal-content\">
      <div class=\"modal-header\">
        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
          <span aria-hidden=\"true\">&times;</span>
        </button>
      </div>
      <div class=\"modal-body\">
        <div class=\"loading-icon\" style=\"display:none;\"></div>
      </div>
      <div class=\"modal-footer\">
        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Sluiten</button>
      </div>
    </div>
  </div>
</div>
{#  ShippingStatusModal End  #}


{#  DeliverySlipMessageModal Start  #}
<div class=\"modal fade\" id=\"showDeliverySlipMessageModal\" tabindex=\"-1\" role=\"dialog\"
     aria-labelledby=\"showDeliverySlipMessage\" aria-hidden=\"true\">
  <div class=\"modal-dialog\" role=\"document\">
    <div class=\"modal-content\">
      <div class=\"modal-header\"><h4>Pakbon Bericht</h4>
        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
          <span aria-hidden=\"true\">&times;</span>
        </button>
      </div>
      <form id=\"delivery-slip-message-form\">
        <div class=\"modal-body\">
        </div>
      </form>
      <div class=\"modal-footer\">
        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Sluiten</button>
        <button type=\"button\" id=\"save-delivery-message-btn\" class=\"btn btn-success\">Opslaan</button>
      </div>
    </div>
  </div>
</div>
{#  DeliverySlipMessageModal End  #}
{% block javascripts %}
  <script type=\"text/javascript\">
    \$(document).ready(function () {

      \$('#resendOrderMessageBtn').on('click', function (event) {
        event.preventDefault();
        \$.ajax({
          type: 'GET',
          url: 'index.php?ajax=1&controller=AdminOrders&action=resendOrderMessage&token=' + token,
          data: {id_order: {{ orderForViewing.id }}},
          success: function (r) {
            r = JSON.parse(r);
            if (r.success) {
              \$.growl({title: \"Order bevestiging opnieuw verzonden naar klant!\", message: r.msg});
              window.location.reload(true);
            } else {
              \$.growl.error({title: \"Er ging wat mis bij het opnieuw verzenden van de order bevestiging!\", message: r.msg});
            }
          }
        });
      });


      \$('#migrateOrder').on('click', function (event) {
        event.preventDefault();
        var customerEmail = \$('#selectCustomerToMigrate').val().split('#');

        var postdata = {
          customer_email: customerEmail[0],
          customer: customerEmail[1],
          order: {{ orderForViewing.id }}
        };
        \$.ajax({
          type: 'GET',
          url: 'index.php?ajax=1&controller=AdminOrders&action=migrateOrderToCustomer&token=' + token,
          data: postdata,
          success: function (r) {
            r = JSON.parse(r);
            if (r.success) {
              \$.growl({title: \"Geslaagd!\", message: r.msg});
              window.location.reload(true);
            } else {
              \$.growl.error({title: \"Fout!\", message: r.msg});
            }
          }
        });
      });


      \$('#submitDesiredDeliveryDate').on('click', function (event) {
        event.preventDefault();
        var date = \$('#desired_delivery_date').val();
        \$.ajax({
          type: 'GET',
          url: 'index.php?ajax=1&controller=AdminOrders&action=setDesiredDeliveryDate&token=' + token,
          data: {date: date, id_order: {{ orderForViewing.id }}},
          success: function (r) {
            r = JSON.parse(r);
            if (r.success) {
              \$.growl({title: \"Gewenste leverdatum ingesteld!\", message: r.msg});
              window.location.reload(true);
            } else {
              \$.growl.error({title: \"Fout bij instellen gewenste leverdatum!\", message: r.msg});
            }
          }
        });
      });

      \$('#clearDesiredDeliveryDate').on('click', function (event) {
        event.preventDefault();
        \$('#desired_delivery_date').val(null);
        \$.ajax({
          type: 'GET',
          url: 'index.php?ajax=1&controller=AdminOrders&action=setDesiredDeliveryDate&token=' + token,
          data: {date: null, id_order: {{ orderForViewing.id }}},
          success: function (r) {
            r = JSON.parse(r);
            if (r.success) {
              \$.growl({
                title: \"Gewenste leverdatum gewijzigd!\",
                message: 'Leverdatum is geleegd, deze word niet meer op de pakbon getoond'
              });
              window.location.reload(true);
            } else {
              \$.growl.error({title: \"Fout bij legen van leverdatum!\", message: r.msg});
            }
          }
        });
      });


      \$('#showShippingStatusBtn').on('click', function (event) {
        event.preventDefault();
        \$('#showShippingStatus').modal('show');
        \$('#showShippingStatus .loading-icon').show();
        var ref = \$(this).attr('data-order-reference');
        \$.ajax({
          url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1',
          type: 'GET',
          data: {
            reference: ref,
            method: 'orderstatus',
            ajax: true,
            render_template: true
          },
        }).done((e) => {
          \$('#showShippingStatus .modal-body').html(e);

        });
      });


      \$('#showDeliverySlipMessageBtn').on('click', function (event) {
        event.preventDefault();
        \$('#showDeliverySlipMessageModal').modal('show');
        var ref = \$(this).attr('data-order-id');
        \$.ajax({
          url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1',
          type: 'GET',
          data: {
            id: ref,
            method: 'delivery_message',
            ajax: true,
            render_template: true
          },
        }).done((e) => {
          \$('#showDeliverySlipMessageModal .modal-body').html(e);

        });
      });


      \$('#save-delivery-message-btn').on('click', function (event) {
        event.preventDefault();
        let orderId = \$('form#delivery-slip-message-form [name=\"id_order\"]').val();
        let deliverySlipMessage = \$('form#delivery-slip-message-form [name=\"delivery_slip_message\"]').val();
        let idDeliverySlipMessage = \$('form#delivery-slip-message-form [name=\"id_message\"]').val();
        let idCustomer = \$('form#delivery-slip-message-form [name=\"id_customer\"]').val();
        let idCart = \$('form#delivery-slip-message-form [name=\"id_cart\"]').val();

        let postdata = {
          id_order: orderId,
          id_message: idDeliverySlipMessage,
          message: deliverySlipMessage,
          customer: idCustomer,
          cart: idCart,
          ajax: true,
          method: 'save_delivery_message'
        };
        \$.ajax({
          type: 'GET',
          url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1',
          data: postdata,
          success: function (r) {
            r = JSON.parse(r);
            console.log(r)

            if (r.success) {
              \$.growl({title: \"Geslaagd!\", message: r.msg});
              window.location.reload(true);
            } else {
              \$.growl.error({title: \"Fout!\", message: r.msg});
            }
          }
        });
      });


    });
  </script>
{% endblock %}
", "@Modules/msthemeconfig/views/templates/admin/order_actions.html.twig", "C:\\wampserver\\www\\ijzershop8.local\\modules\\msthemeconfig\\views\\templates\\admin\\order_actions.html.twig");
    }
}

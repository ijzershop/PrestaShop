/******/!function(e){function i(r){if(t[r])return t[r].exports;var c=t[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,i),c.l=!0,c.exports}// webpackBootstrap
/******/
var t={};i.m=e,i.c=t,i.i=function(e){return e},i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)},i.p="",i(i.s=380)}({189:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r=t(229);(0,window.$)(function(){new r.a})},229:function(e,i,t){"use strict";function r(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}var c=function(){function e(e,i){for(var t=0;t<i.length;t++){var r=i[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(i,t,r){return t&&e(i.prototype,t),r&&e(i,r),i}}(),a=window.$,o=function(){function e(){r(this,e),this.prefixCreateForm="form_step2_specific_price_",this.prefixEditForm="form_modal_",this.$createPriceFormDefaultValues=new Object,this.storePriceFormDefaultValues(),this.loadAndDisplayExistingSpecificPricesList(),this.configureAddPriceFormBehavior(),this.configureEditPriceModalBehavior(),this.configureDeletePriceButtonsBehavior()}return c(e,[{key:"loadAndDisplayExistingSpecificPricesList",value:function(){var e=this,i=a("#js-specific-price-list"),t=i.attr("data").replace(/list\/\d+/,"list/"+this.getProductId());a.ajax({type:"GET",url:t}).done(function(t){var r=i.find("tbody");r.find("tr").remove(),t.length>0?i.removeClass("hide"):i.addClass("hide");var c=e.renderSpecificPricesListingAsHtml(t);r.append(c)})}},{key:"renderSpecificPricesListingAsHtml",value:function(e){var i="",t=this;return a.each(e,function(e,r){var c=a("#js-specific-price-list").attr("data-action-delete").replace(/delete\/\d+/,"delete/"+r.id_specific_price),o=t.renderSpecificPriceRow(r,c);i+=o}),i}},{key:"renderSpecificPriceRow",value:function(e,i){var t=e.id_specific_price;return"<tr><td>"+e.rule_name+"</td><td>"+e.attributes_name+"</td><td>"+e.currency+"</td><td>"+e.country+"</td><td>"+e.group+"</td><td>"+e.customer+"</td><td>"+e.fixed_price+"</td><td>"+e.impact+"</td><td>"+e.period+"</td><td>"+e.from_quantity+"</td><td>"+(e.can_delete?'<a href="'+i+'" class="js-delete delete btn tooltip-link delete pl-0 pr-0"><i class="material-icons">delete</i></a>':"")+"</td><td>"+(e.can_edit?'<a href="#" data-specific-price-id="'+t+'" class="js-edit edit btn tooltip-link delete pl-0 pr-0"><i class="material-icons">edit</i></a>':"")+"</td></tr>"}},{key:"configureAddPriceFormBehavior",value:function(){var e=this,i=this.getPrefixSelector(!0);a("#specific_price_form .js-cancel").click(function(){e.resetCreatePriceFormDefaultValues(),a("#specific_price_form").collapse("hide")}),a("#specific_price_form .js-save").on("click",function(){return e.submitCreatePriceForm()}),a("#js-open-create-specific-price-form").on("click",function(){return e.loadAndFillOptionsForSelectCombinationInput(!0)}),a(i+"sp_reduction_type").change(function(){return e.showSpecificPriceTaxFieldIfEligible(!0)}),a(i+"leave_bprice").on("click",function(){return e.enableSpecificPriceFieldIfEligible(!0)}),a(i+"sp_reduction_type").on("change",function(){return e.enableSpecificPriceTaxFieldIfEligible(!0)})}},{key:"configureEditPriceFormInsideModalBehavior",value:function(){var e=this,i=this.getPrefixSelector(!1);a("#form_modal_cancel").click(function(){return e.closeEditPriceModalAndRemoveForm()}),a("#form_modal_save").click(function(){return e.submitEditPriceForm()}),this.loadAndFillOptionsForSelectCombinationInput(!1),a(i+"sp_reduction_type").change(function(){return e.showSpecificPriceTaxFieldIfEligible(!1)}),a(i+"leave_bprice").on("click",function(){return e.enableSpecificPriceFieldIfEligible(!1)}),a(i+"sp_reduction_type").on("change",function(){return e.enableSpecificPriceTaxFieldIfEligible(!1)}),this.reinitializeDatePickers(),this.initializeLeaveBPriceField(!1)}},{key:"reinitializeDatePickers",value:function(){a(".datepicker input").datetimepicker({format:"YYYY-MM-DD"})}},{key:"initializeLeaveBPriceField",value:function(e){var i=this.getPrefixSelector(e);""!=a(i+"sp_price").val()&&(a(i+"sp_price").prop("disabled",!1),a(i+"leave_bprice").prop("checked",!1))}},{key:"configureEditPriceModalBehavior",value:function(){var e=this;a(document).on("click","#js-specific-price-list .js-edit",function(i){i.preventDefault();var t=a(i.currentTarget).data("specificPriceId");e.openEditPriceModalAndLoadForm(t)})}},{key:"configureDeletePriceButtonsBehavior",value:function(){var e=this;a(document).on("click","#js-specific-price-list .js-delete",function(i){i.preventDefault(),e.deleteSpecificPrice(i.currentTarget)})}},{key:"submitCreatePriceForm",value:function(){var e=this,i=a("#specific_price_form").attr("data-action"),t=a("#specific_price_form input, #specific_price_form select, #form_id_product").serialize();a("#specific_price_form .js-save").attr("disabled","disabled"),a.ajax({type:"POST",url:i,data:t}).done(function(i){showSuccessMessage(translate_javascripts["Form update success"]),e.resetCreatePriceFormDefaultValues(),a("#specific_price_form").collapse("hide"),e.loadAndDisplayExistingSpecificPricesList(),a("#specific_price_form .js-save").removeAttr("disabled")}).fail(function(e){showErrorMessage(e.responseJSON),a("#specific_price_form .js-save").removeAttr("disabled")})}},{key:"submitEditPriceForm",value:function(){var e=this,i=a("#edit-specific-price-modal-form").attr("data-action"),t=a("#edit-specific-price-modal-form").data("specificPriceId"),r=i.replace(/update\/\d+/,"update/"+t),c=a("#edit-specific-price-modal-form input, #edit-specific-price-modal-form select, #form_id_product").serialize();a("#edit-specific-price-modal-form .js-save").attr("disabled","disabled"),a.ajax({type:"POST",url:r,data:c}).done(function(i){showSuccessMessage(translate_javascripts["Form update success"]),e.closeEditPriceModalAndRemoveForm(),e.loadAndDisplayExistingSpecificPricesList(),a("#edit-specific-price-modal-form .js-save").removeAttr("disabled")}).fail(function(e){showErrorMessage(e.responseJSON),a("#edit-specific-price-modal-form .js-save").removeAttr("disabled")})}},{key:"deleteSpecificPrice",value:function(e){var i=this;modalConfirmation.create(translate_javascripts["This will delete the specific price. Do you wish to proceed?"],null,{onContinue:function(){var t=a(e).attr("href");a(e).attr("disabled","disabled"),a.ajax({type:"GET",url:t}).done(function(t){i.loadAndDisplayExistingSpecificPricesList(),showSuccessMessage(t),a(e).removeAttr("disabled")}).fail(function(i){showErrorMessage(i.responseJSON),a(e).removeAttr("disabled")})}}).show()}},{key:"storePriceFormDefaultValues",value:function(){var e=this.$createPriceFormDefaultValues;a("#specific_price_form").find("select,input").each(function(i,t){e[a(t).attr("id")]=a(t).val()}),a("#specific_price_form").find("input:checkbox").each(function(i,t){e[a(t).attr("id")]=a(t).prop("checked")}),this.$createPriceFormDefaultValues=e}},{key:"loadAndFillOptionsForSelectCombinationInput",value:function(e){var i=this.getPrefixSelector(e),t=a(i+"sp_id_product_attribute"),r=t.attr("data-action").replace(/product-combinations\/\d+/,"product-combinations/"+this.getProductId());a.ajax({type:"GET",url:r}).done(function(e){t.find("option:gt(0)").remove(),a.each(e,function(e,i){t.append('<option value="'+i.id+'">'+i.name+"</option>")}),"0"!=t.data("selectedAttribute")&&t.val(t.data("selectedAttribute")).trigger("change")})}},{key:"showSpecificPriceTaxFieldIfEligible",value:function(e){var i=this.getPrefixSelector(e);"percentage"===a(i+"sp_reduction_type").val()?a(i+"sp_reduction_tax").hide():a(i+"sp_reduction_tax").show()}},{key:"resetCreatePriceFormDefaultValues",value:function(){var e=this.$createPriceFormDefaultValues;a("#specific_price_form").find("input").each(function(i,t){a(t).val(e[a(t).attr("id")])}),a("#specific_price_form").find("select").each(function(i,t){a(t).val(e[a(t).attr("id")]).change()}),a("#specific_price_form").find("input:checkbox").each(function(e,i){a(i).prop("checked",!0)})}},{key:"enableSpecificPriceFieldIfEligible",value:function(e){var i=this.getPrefixSelector(e);a(i+"sp_price").prop("disabled",a(i+"leave_bprice").is(":checked")).val("")}},{key:"enableSpecificPriceTaxFieldIfEligible",value:function(e){var i=this.getPrefixSelector(e),t=a("#select2-"+i+"sp_reduction_tax-container").parent().parent();"amount"===a(i+"sp_reduction_type").val()?t.show():t.hide()}},{key:"openEditPriceModalAndLoadForm",value:function(e){var i=this,t=a("#js-specific-price-list").data("actionEdit").replace(/get-form\/\d+/,"get-form/"+e);a("#edit-specific-price-modal").modal("show"),a.ajax({type:"GET",url:t}).done(function(t){i.insertEditSpecificPriceFormIntoModal(t),a("#edit-specific-price-modal-form").data("specificPriceId",e),i.configureEditPriceFormInsideModalBehavior()}).fail(function(e){showErrorMessage(e.responseJSON)})}},{key:"closeEditPriceModalAndRemoveForm",value:function(){a("#edit-specific-price-modal").modal("hide"),a("#edit-specific-price-modal-form").empty()}},{key:"insertEditSpecificPriceFormIntoModal",value:function(e){var i=a("#edit-specific-price-modal-form");i.empty(),i.append(e)}},{key:"getProductId",value:function(){return a("#form_id_product").val()}},{key:"getPrefixSelector",value:function(e){return 1==e?"#"+this.prefixCreateForm:"#"+this.prefixEditForm}}]),e}();i.a=o},380:function(e,i,t){e.exports=t(189)}});
!function(e){function t(o){if(n[o])return n[o].exports;var s=n[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=315)}({19:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=window.$,r=function(){function e(t){var n=this;return o(this,e),this.$container=a(t),this.$container.on("click",".js-input-wrapper",function(e){var t=a(e.currentTarget);n._toggleChildTree(t)}),this.$container.on("click",".js-toggle-choice-tree-action",function(e){var t=a(e.currentTarget);n._toggleTree(t)}),{enableAutoCheckChildren:function(){return n.enableAutoCheckChildren()},enableAllInputs:function(){return n.enableAllInputs()},disableAllInputs:function(){return n.disableAllInputs()}}}return s(e,[{key:"enableAutoCheckChildren",value:function(){this.$container.on("change",'input[type="checkbox"]',function(e){var t=a(e.currentTarget);t.closest("li").find('ul input[type="checkbox"]').prop("checked",t.is(":checked"))})}},{key:"enableAllInputs",value:function(){this.$container.find("input").removeAttr("disabled")}},{key:"disableAllInputs",value:function(){this.$container.find("input").attr("disabled","disabled")}},{key:"_toggleChildTree",value:function(e){var t=e.closest("li");if(t.hasClass("expanded"))return void t.removeClass("expanded").addClass("collapsed");t.hasClass("collapsed")&&t.removeClass("collapsed").addClass("expanded")}},{key:"_toggleTree",value:function(e){var t=e.closest(".js-choice-tree-container"),n=e.data("action"),o={addClass:{expand:"expanded",collapse:"collapsed"},removeClass:{expand:"collapsed",collapse:"expanded"},nextAction:{expand:"collapse",collapse:"expand"},text:{expand:"collapsed-text",collapse:"expanded-text"},icon:{expand:"collapsed-icon",collapse:"expanded-icon"}};t.find("li").each(function(e,t){var s=a(t);s.hasClass(o.removeClass[n])&&s.removeClass(o.removeClass[n]).addClass(o.addClass[n])}),e.data("action",o.nextAction[n]),e.find(".material-icons").text(e.data(o.icon[n])),e.find(".js-toggle-text").text(e.data(o.text[n]))}}]),e}();t.a=r},249:function(e,t,n){"use strict";(function(e){function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=n(19),a=n(297),r=n(299),i=n(314),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=function(){function t(){return o(this,t),this.shopChoiceTreeSelector=i.a.shopChoiceTree,this.shopChoiceTree=new s.a(this.shopChoiceTreeSelector),this.employeeProfileSelector=i.a.profileSelect,this.tabsDropdownSelector=i.a.defaultPageSelect,this.shopChoiceTree.enableAutoCheckChildren(),new a.a(i.a.addonsConnectForm,i.a.addonsLoginButton),new r.a(i.a.changePasswordInputsBlock,i.a.showChangePasswordBlockButton,i.a.hideChangePasswordBlockButton,i.a.generatePasswordButton,i.a.oldPasswordInput,i.a.newPasswordInput,i.a.confirmNewPasswordInput,i.a.generatedPasswordDisplayInput,i.a.passwordStrengthFeedbackContainer),this._initEvents(),this._toggleShopTree(),{}}return c(t,[{key:"_initEvents",value:function(){var t=this,n=e(this.employeeProfileSelector),o=n.data("get-tabs-url");e(document).on("change",this.employeeProfileSelector,function(){return t._toggleShopTree()}),e(document).on("change",this.employeeProfileSelector,function(n){e.get(o,{profileId:e(n.currentTarget).val()},function(e){t._reloadTabsDropdown(e)},"json")})}},{key:"_reloadTabsDropdown",value:function(t){var n=e(this.tabsDropdownSelector);n.empty();for(var o in t)if(t[o].children.length>0&&t[o].name){var s=this._createOptionGroup(t[o].name);for(var a in t[o].children)t[o].children[a].name&&s.append(this._createOption(t[o].children[a].name,t[o].children[a].id_tab));n.append(s)}else t[o].name&&n.append(this._createOption(t[o].name,t[o].id_tab))}},{key:"_toggleShopTree",value:function(){var t=e(this.employeeProfileSelector),n=t.data("admin-profile");e(this.shopChoiceTreeSelector).closest(".form-group").toggleClass("d-none",t.val()==n)}},{key:"_createOptionGroup",value:function(t){return e('<optgroup label="'+t+'">')}},{key:"_createOption",value:function(t,n){return e('<option value="'+n+'">'+t+"</option>")}}]),t}();t.a=l}).call(t,n(4))},297:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=window.$,r=function(){function e(t,n){return o(this,e),this.addonsConnectFormSelector=t,this.$loadingSpinner=a(n),this._initEvents(),{}}return s(e,[{key:"_initEvents",value:function(){var e=this;a("body").on("submit",this.addonsConnectFormSelector,function(t){var n=a(t.currentTarget);t.preventDefault(),t.stopPropagation(),e._connect(n.attr("action"),n.serialize())})}},{key:"_connect",value:function(e,t){var n=this;a.ajax({method:"POST",url:e,dataType:"json",data:t,beforeSend:function(){n.$loadingSpinner.show(),a('button.btn[type="submit"]',n.addonsConnectFormSelector).hide()}}).then(function(e){1===e.success?location.reload():(a.growl.error({message:e.message}),n.$loadingSpinner.hide(),a('button.btn[type="submit"]',n.addonsConnectFormSelector).fadeIn())},function(){a.growl.error({message:a(n.addonsConnectFormSelector).data("error-message")}),n.$loadingSpinner.hide(),a('button.btn[type="submit"]',n.addonsConnectFormSelector).show()})}}]),e}();t.a=r},298:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=window.$,r=function(){function e(t){var n=this,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return o(this,e),this.minLength=s.minLength||8,this.$feedbackContainer=a(t),{watchPasswordStrength:function(e){return n.watchPasswordStrength(e)},generatePassword:function(e){return n.generatePassword(e)}}}return s(e,[{key:"watchPasswordStrength",value:function(e){var t=this;a.passy.requirements.length.min=this.minLength,a.passy.requirements.characters="DIGIT",e.each(function(e,n){var o=a("<span>");o.insertAfter(a(n)),a(n).passy(function(e,n){t._displayFeedback(o,e,n)})})}},{key:"generatePassword",value:function(e){e.passy("generate",this.minLength)}},{key:"_displayFeedback",value:function(e,t,n){var o=this._getPasswordStrengthFeedback(t);e.text(o.message),e.removeClass("text-danger text-warning text-success"),e.addClass(o.elementClass),e.toggleClass("d-none",!n)}},{key:"_getPasswordStrengthFeedback",value:function(e){switch(e){case a.passy.strength.LOW:return{message:this.$feedbackContainer.find(".strength-low").text(),elementClass:"text-danger"};case a.passy.strength.MEDIUM:return{message:this.$feedbackContainer.find(".strength-medium").text(),elementClass:"text-warning"};case a.passy.strength.HIGH:return{message:this.$feedbackContainer.find(".strength-high").text(),elementClass:"text-success"};case a.passy.strength.EXTREME:return{message:this.$feedbackContainer.find(".strength-extreme").text(),elementClass:"text-success"}}throw"Invalid password strength indicator."}}]),e}();t.a=r},299:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=n(298),a=n(302),r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=window.$,c=function(){function e(t,n,r,c,l,d,u,h,p){return o(this,e),this.$inputsBlock=i(t),this.showButtonSelector=n,this.hideButtonSelector=r,this.generatePasswordButtonSelector=c,this.oldPasswordInputSelector=l,this.newPasswordInputSelector=d,this.confirmNewPasswordInputSelector=u,this.generatedPasswordDisplaySelector=h,this.$newPasswordInputs=this.$inputsBlock.find(this.newPasswordInputSelector),this.$copyPasswordInputs=this.$inputsBlock.find(this.confirmNewPasswordInputSelector).add(this.generatedPasswordDisplaySelector),this.$submittableInputs=this.$inputsBlock.find(this.oldPasswordInputSelector).add(this.newPasswordInputSelector).add(this.confirmNewPasswordInputSelector),this.passwordHandler=new s.a(p),this.passwordValidator=new a.a(this.newPasswordInputSelector,this.confirmNewPasswordInputSelector),this._hideInputsBlock(),this._initEvents(),{}}return r(e,[{key:"_initEvents",value:function(){var e=this;i(document).on("click",this.showButtonSelector,function(t){e._hide(i(t.currentTarget)),e._showInputsBlock()}),i(document).on("click",this.hideButtonSelector,function(){e._hideInputsBlock(),e._show(i(e.showButtonSelector))}),this.passwordHandler.watchPasswordStrength(this.$newPasswordInputs),i(document).on("click",this.generatePasswordButtonSelector,function(){e.passwordHandler.generatePassword(e.$newPasswordInputs),e.$copyPasswordInputs.val(e.$newPasswordInputs.val()),e._checkPasswordValidity()}),i(document).on("keyup",this.newPasswordInputSelector+","+this.confirmNewPasswordInputSelector,function(){e._checkPasswordValidity()}),i(document).on("submit",i(this.oldPasswordInputSelector).closest("form"),function(t){i(e.oldPasswordInputSelector).is(":disabled")||e.passwordValidator.isPasswordValid()||t.preventDefault()})}},{key:"_checkPasswordValidity",value:function(){var e=i(this.newPasswordInputSelector).parent().find(".form-text"),t=i(this.confirmNewPasswordInputSelector).parent().find(".form-text");e.text(this._getPasswordLengthValidationMessage()).toggleClass("text-danger",!this.passwordValidator.isPasswordLengthValid()),t.text(this._getPasswordConfirmationValidationMessage()).toggleClass("text-danger",!this.passwordValidator.isPasswordMatchingConfirmation())}},{key:"_getPasswordConfirmationValidationMessage",value:function(){return this.passwordValidator.isPasswordMatchingConfirmation()?"":i(this.confirmNewPasswordInputSelector).data("invalid-password")}},{key:"_getPasswordLengthValidationMessage",value:function(){return this.passwordValidator.isPasswordTooShort()?i(this.newPasswordInputSelector).data("password-too-short"):this.passwordValidator.isPasswordTooLong()?i(this.newPasswordInputSelector).data("password-too-long"):""}},{key:"_showInputsBlock",value:function(){this._show(this.$inputsBlock),this.$submittableInputs.removeAttr("disabled"),this.$submittableInputs.attr("required","required")}},{key:"_hideInputsBlock",value:function(){this._hide(this.$inputsBlock),this.$submittableInputs.attr("disabled","disabled"),this.$submittableInputs.removeAttr("required"),this.$inputsBlock.find("input").val(""),this.$inputsBlock.find(".form-text").text("")}},{key:"_hide",value:function(e){e.addClass("d-none")}},{key:"_show",value:function(e){e.removeClass("d-none")}}]),e}();t.a=c},302:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};o(this,e),this.newPasswordInput=document.querySelector(t),this.confirmPasswordInput=document.querySelector(n),this.minPasswordLength=s.minPasswordLength||8,this.maxPasswordLength=s.maxPasswordLength||255}return s(e,[{key:"isPasswordValid",value:function(){return!(this.confirmPasswordInput&&!this.isPasswordMatchingConfirmation())&&this.isPasswordLengthValid()}},{key:"isPasswordLengthValid",value:function(){return!this.isPasswordTooShort()&&!this.isPasswordTooLong()}},{key:"isPasswordMatchingConfirmation",value:function(){if(!this.confirmPasswordInput)throw"Confirm password input is not provided for the password validator.";return""===this.confirmPasswordInput.value||this.newPasswordInput.value===this.confirmPasswordInput.value}},{key:"isPasswordTooShort",value:function(){return this.newPasswordInput.value.length<this.minPasswordLength}},{key:"isPasswordTooLong",value:function(){return this.newPasswordInput.value.length>this.maxPasswordLength}}]),e}();t.a=a},314:function(e,t,n){"use strict";/**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
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
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
t.a={shopChoiceTree:"#employee_shop_association",profileSelect:"#employee_profile",defaultPageSelect:"#employee_default_page",addonsConnectForm:"#addons-connect-form",addonsLoginButton:"#addons_login_btn",changePasswordInputsBlock:".js-change-password-block",showChangePasswordBlockButton:".js-change-password",hideChangePasswordBlockButton:".js-change-password-cancel",generatePasswordButton:"#employee_change_password_generate_password_button",oldPasswordInput:"#employee_change_password_old_password",newPasswordInput:"#employee_change_password_new_password_first",confirmNewPasswordInput:"#employee_change_password_new_password_second",generatedPasswordDisplayInput:"#employee_change_password_generated_password",passwordStrengthFeedbackContainer:".js-password-strength-feedback"}},315:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){var t=n(249);/**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
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
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
e(function(){new t.a})}.call(t,n(4))},4:function(e,t){e.exports=jQuery}});
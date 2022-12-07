{*
* 2007-2020 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*}

<link href="/modules/msthemeconfig/node_modules/select2/dist/css/select2.min.css" rel="stylesheet" />

<div class="panel">
  <h3><i class="icon icon-credit-card"></i> {l s='Moderne Smid BV Theme Configurator' mod='msthemeconfig'} <button class="btn btn-xs btn-link collapsed pull-right" data-toggle="collapse" data-target="#info-config" type="button" role="tab" aria-controls="info-config" aria-selected="true"> <i class="material-icons">visibility</i></button></h3>
  <div class="collapse"  id="info-config" role="tabpanel" aria-labelledby="info-config" tabindex="0">
  <p>
    <strong>{l s='This module adds extra settings for the ModerneSmid Theme!' mod='msthemeconfig'}</strong><br />
    {l s='Please enter the needed configurations to use the Moderne Smid BV Theme.' mod='msthemeconfig'}<br />
    <br />
    {l s='To use pre-formatted snippets you can create your own bootstrap html snippets in the snippets-manager.' mod='msthemeconfig'}
    <br />
    {l s='The snippets are grouped into categories these categories are shown as different tabs in the snippet dialog' mod='msthemeconfig'}
    <br />
    <br />
    {l s='The Snippets manager allows to:' mod='msthemeconfig'}
    <ul>
      <li>{l s='add/remove categories & snippets' mod='msthemeconfig'}</li>
      <li>{l s='edit the categories names' mod='msthemeconfig'}</li>
      <li>{l s='edit the snippets names & code' mod='msthemeconfig'}</li>
      <li>{l s='re-order the categories & snippets' mod='msthemeconfig'}</li>
    </ul>
    {l s='The snippets are available in the editor snippets dialog.' mod='msthemeconfig'}
    <br>
    <a target="_blank" href="/js/tiny_mce/plugins/bootstrap/snippets/snippets-manager.html">{l s='To go to the snippets editor click here' mod='msthemeconfig'}</a><br />
  </p>
  </div>
</div>

<style type="text/css">
.tab-btn{
  margin: 5px 0;
  padding:  5px;
}

.card{
  width: 100%;
  padding:0 15px 15px 15px;
  display: inline-block;
}

.card-header{
  text-align: right;
  font-size: 1em;
  border-bottom: 1px solid #cccccc;
  font-weight: bold;
}

.star{
  font-size: 1.6em;
  font-weight: bold;
  vertical-align: middle;
}

.card-sub-header{
  color:#ffffff;
  background-color: #0a6aa1;
  font-size: 1.6em;
  font-weight: bold;
  line-height: 1.2em;
  border-bottom: 1px solid #cccccc;
  margin-bottom: 5px;
}
.margin-top-1{
  margin-top: 1em!important;
}
.margin-top-2{
  margin-top: 2em!important;
}

button .toggle-panel{
  color:#ffffff;
  font-size: 1.6em;
  line-height: 0;
  text-decoration: none;
}

button .toggle-panel:before{
  content: '-';
}

button.collapsed .toggle-panel:before{
  content: '+';
}

.select2-container {
  min-width: 100%!important;
}

.bootstrap .collapse.in {
  display: block;
}

#home_categories_sorted li{
  padding: 5px;
  border: 1px solid grey;
  background-color: lightgrey;
  cursor: grab;
}
</style>

<div class="panel">
  <div class="d-flex align-items-start row">
    <div class="nav flex-column col-xs-3" id="modernesmid-config-tab" role="tablist" aria-orientation="vertical">
      {if 'home'|in_array:$employee_access}
        <button class="tab-btn btn btn-primary col-xs-12 nav-link btn-lg active" data-panel="home" id="v-pills-home-tab" data-toggle="pill" data-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Algemeen</button>
      {/if}
      {if 'pages'|in_array:$employee_access}
        <button class="tab-btn btn btn-primary col-xs-12 nav-link btn-lg" data-panel="pages" id="v-pills-pages-tab" data-toggle="pill" data-target="#v-pills-pages" type="button" role="tab" aria-controls="v-pills-pages" aria-selected="false">Pagina's</button>
      {/if}
      {if 'footer'|in_array:$employee_access}
        <button class="tab-btn btn btn-primary col-xs-12 nav-link btn-lg" data-panel="footer" id="v-pills-footer-tab" data-toggle="pill" data-target="#v-pills-footer" type="button" role="tab" aria-controls="v-pills-footer" aria-selected="false">Footer</button>
      {/if}
      {if 'email'|in_array:$employee_access}
        <button class="tab-btn btn btn-primary col-xs-12 nav-link btn-lg" data-panel="email" id="v-pills-email-tab" data-toggle="pill" data-target="#v-pills-email" type="button" role="tab" aria-controls="v-pills-email" aria-selected="false">Email</button>
      {/if}
      {if 'alert'|in_array:$employee_access}
        <button class="tab-btn btn btn-primary col-xs-12 nav-link btn-lg" data-panel="alert" id="v-pills-alert-tab" data-toggle="pill" data-target="#v-pills-alert" type="button" role="tab" aria-controls="v-pills-alert" aria-selected="false">Alert</button>
      {/if}
      {if 'config'|in_array:$employee_access}
        <button class="tab-btn btn btn-primary col-xs-12 nav-link btn-lg" data-panel="config-main" id="v-pills-config-main-tab" data-toggle="pill" data-target="#v-pills-config-main" type="button" role="tab" aria-controls="v-pills-config-main" aria-selected="false">Algemene Configuratie</button>
      {/if}
      {if 'config'|in_array:$employee_access}
        <button class="tab-btn btn btn-primary col-xs-12 nav-link btn-lg" data-panel="config-user" id="v-pills-config-user-tab" data-toggle="pill" data-target="#v-pills-config-user" type="button" role="tab" aria-controls="v-pills-config-user" aria-selected="false">Gebruiker Configuratie</button>
      {/if}
      {if 'kiyoh'|in_array:$employee_access}
        <button class="tab-btn btn btn-primary col-xs-12 nav-link btn-lg" data-panel="kiyoh" id="v-pills-kiyoh-tab" data-toggle="pill" data-target="#v-pills-kiyoh" type="button" role="tab" aria-controls="v-pills-kiyoh" aria-selected="false">Kiyoh</button>
      {/if}
      {if 'koopman'|in_array:$employee_access}
        <button class="tab-btn btn btn-primary col-xs-12 nav-link btn-lg" data-panel="koopman" id="v-pills-koopman-tab" data-toggle="pill" data-target="#v-pills-koopman" type="button" role="tab" aria-controls="v-pills-koopman" aria-selected="false">Koopman</button>
      {/if}
      {if 'services'|in_array:$employee_access}
        <button class="tab-btn btn btn-primary col-xs-12 nav-link btn-lg" data-panel="services" id="v-pills-services-tab" data-toggle="pill" data-target="#v-pills-services" type="button" role="tab" aria-controls="v-pills-services" aria-selected="false">Diensten & Api's</button>
      {/if}
      {if 'dev'|in_array:$employee_access}
        <button class="tab-btn btn btn-primary col-xs-12 nav-link btn-lg" data-panel="dev" id="v-pills-dev-tab" data-toggle="pill" data-target="#v-pills-dev" type="button" role="tab" aria-controls="v-pills-dev" aria-selected="false">Development</button>
      {/if}
    </div>
    <form method="POST" action="">
    <div class="tab-content col-xs-9" id="modernesmid-config-tab-content">
      {if 'home'|in_array:$employee_access}
      <div class="tab-pane fade active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0"></div>
      {/if}
      {if 'pages'|in_array:$employee_access}
      <div class="tab-pane fade" id="v-pills-pages" role="tabpanel" aria-labelledby="v-pills-pages-tab" tabindex="0"></div>
      {/if}
      {if 'alert'|in_array:$employee_access}
      <div class="tab-pane fade" id="v-pills-alert" role="tabpanel" aria-labelledby="v-pills-alert-tab" tabindex="0"></div>
      {/if}
      {if 'main'|in_array:$employee_access}
      <div class="tab-pane fade" id="v-pills-config-main" role="tabpanel" aria-labelledby="v-pills-config-main-tab" tabindex="0"></div>
      {/if}
      {if 'user'|in_array:$employee_access}
      <div class="tab-pane fade" id="v-pills-config-user" role="tabpanel" aria-labelledby="v-pills-config-user-tab" tabindex="0"></div>
      {/if}
      {if 'dev'|in_array:$employee_access}
      <div class="tab-pane fade" id="v-pills-dev" role="tabpanel" aria-labelledby="v-pills-dev-tab" tabindex="0"></div>
      {/if}
      {if 'email'|in_array:$employee_access}
      <div class="tab-pane fade" id="v-pills-email" role="tabpanel" aria-labelledby="v-pills-email-tab" tabindex="0"></div>
      {/if}
      {if 'footer'|in_array:$employee_access}
      <div class="tab-pane fade" id="v-pills-footer" role="tabpanel" aria-labelledby="v-pills-footer-tab" tabindex="0"></div>
      {/if}
      {if 'kiyoh'|in_array:$employee_access}
      <div class="tab-pane fade" id="v-pills-kiyoh" role="tabpanel" aria-labelledby="v-pills-kiyoh-tab" tabindex="0"></div>
      {/if}
      {if 'koopman'|in_array:$employee_access}
      <div class="tab-pane fade" id="v-pills-koopman" role="tabpanel" aria-labelledby="v-pills-koopman-tab" tabindex="0"></div>
      {/if}
      {if 'services'|in_array:$employee_access}
      <div class="tab-pane fade" id="v-pills-services" role="tabpanel" aria-labelledby="v-pills-services-tab" tabindex="0"></div>
      {/if}
    </div>
    <div class="col-xs-12">
      <input type="hidden" value="1" name="submitModerneSmidThemeModuleConfigurator"/>
      <button class="btn btn-lg collapsed pull-right" type="submit"> Wijzigen </button>
    </div>
    </form>
  </div>



</div>


{block name="javascript_bottom"}
    {{ parent() }}
  <script src="/admin-dev/themes/new-theme/public/admin.bundle.js"></script>
{*  <script src="/admin-dev/themes/new-theme/public/msthemeconfig_admin.bundle.js"></script>*}
  <script src="/modules/msthemeconfig/node_modules/select2/dist/js/select2.min.js"></script>
  <script src="/modules/msthemeconfig/views/js/msthemeconfig.js"></script>
  <script type="application/javascript">
      {literal}
      var debugModerneSmidThemeConfigurator = false;
    $(document).ready(function() {
      function setSortable($parentFormElement){
        var selectedArray = [];
        if($parentFormElement.find('ol').length === 0){
          $parentFormElement.append('<ol id="home_categories_sorted" class="col-xs-8 col-xs-offset-4 ui-sortable"></ol><input type="hidden" name="MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED" id="MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED"/>');
        } else {
          $('#home_categories_sorted').html('');
        }
        $('#MSTHEMECONFIG_HOMEPAGE_CATEGORIES option:selected').each(function(index, val) {
          $('#home_categories_sorted').append('<li data-id="'+val.value+'">'+val.textContent+'</li>');
          if(debugModerneSmidThemeConfigurator){
            selectedArray.push({'id': val.value, 'text': val.textContent});
          } else {
            selectedArray.push(val.value);
          }
          $('#MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED').val(JSON.stringify(selectedArray));
        });
        $('#home_categories_sorted').sortable({
          update: function( event, ui ) {
            var selectedArray = [];
            $('#home_categories_sorted li').each(function(index, el) {
              if(debugModerneSmidThemeConfigurator){
                selectedArray.push({'id': el.dataset.id, 'text': el.outerText});
              } else {
                selectedArray.push(el.dataset.id);
              }
              $('#MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED').val(JSON.stringify(selectedArray));
            });
          }
        });
      }
      $('#MSTHEMECONFIG_HOMEPAGE_CATEGORIES').on('change', function(event) {
        event.preventDefault();
        var $parentFormElement = $(this).parents('.form-group');
        setSortable($parentFormElement);
      });



      function setEmailInputList($parentFormElement){
        if($parentFormElement.find('ol').length === 0){
          $parentFormElement.append('<style type="text/css"> #extra_email_settings li{padding: 5px; border: 1px solid grey;} </style>');
          $parentFormElement.append('<ol id="extra_email_settings" class="col-xs-12 list-unstyled"></ol>');
        } else {
          $('#extra_email_settings').html('');
        }

        var jsonVal = $('#MSTHEMECONFIG_ORDERSTATE_SENDMAIL_JSON').val();
        if(typeof jsonVal !== 'undefined' && jsonVal !== ''){
          var existsingData = JSON.parse(jsonVal);
          if(existsingData !== null){
            for (var i = 0; i < existsingData.length; i++) {
              var statusText = $('#MSTHEMECONFIG_ORDERSTATE_SENDMAIL option[value='+existsingData[i].id_order_state+']').text();
              var statusId = existsingData[i].id_order_state;
              var statusFirstEmail = existsingData[i].first_email_order_state;
              var statusSecondEmail = existsingData[i].second_email_order_state;

              $('#extra_email_settings').append('<li data-id="'+statusId+'"><div class="row" data-id="'+statusId+'"> <div class="form-group col-xs-12" data-tab-id="email"><div class="form-group text-center" data-tab-id="email"><h2>Orderstatus: '+statusText+'</h2></div> </div><div class="form-group col-xs-5" data-tab-id="email"> <label class="control-label col-lg-3"> Eerste email adres <input type="hidden" name="SENDMAIL_ORDER_STATUS[]" value="'+statusId+'"> </label> <div class="col-lg-9"> <div class="input-group"> <span class="input-group-addon"> <i class="icon-envelope"></i> </span> <input type="text" name="SENDMAIL_ORDER_STATUS_FIRST_EMAIL[]" value="'+statusFirstEmail+'" class=""> </div><p class="help-block"> Voeg een email adres toe waaraan de pakbon gezonden moet worden by order status wijziging </p></div></div><div class="form-group col-xs-5" data-tab-id="email"> <label class="control-label col-lg-3"> Tweede email adres </label> <div class="col-lg-9"> <div class="input-group"> <span class="input-group-addon"> <i class="icon-envelope"></i> </span> <input type="text" name="SENDMAIL_ORDER_STATUS_SECOND_EMAIL[]" value="'+statusSecondEmail+'" class=""> </div><p class="help-block"> Voeg een email adres toe waaraan de pakbon email CC moet worden </p></div></div><div class="form-group col-xs-2" data-tab-id="email"><label class="control-label col-lg-3"></label><div class="col-lg-9"><a class="btn btn-danger trash-sendmail-row" data-id="'+statusId+'"><i class="icon-trash"></i></a></div></div></li>');
            }
          }
        }
      }

      function setEmailInputRow($parentFormElement, statusText, statusId){
        $('#extra_email_settings').append('<li data-id="'+statusId+'"><div class="row" data-id="'+statusId+'"> <div class="form-group col-xs-12" data-tab-id="email"><div class="form-group text-center" data-tab-id="email"><h2>Orderstatus: '+statusText+'</h2></div> </div><div class="form-group col-xs-5" data-tab-id="email"> <label class="control-label col-lg-3"> Eerste email adres <input type="hidden" name="SENDMAIL_ORDER_STATUS[]" value="'+statusId+'"> </label> <div class="col-lg-9"> <div class="input-group"> <span class="input-group-addon"> <i class="icon-envelope"></i> </span> <input type="text" name="SENDMAIL_ORDER_STATUS_FIRST_EMAIL[]" value="" class=""> </div><p class="help-block"> Voeg een email adres toe waaraan de pakbon gezonden moet worden by order status wijziging </p></div></div><div class="form-group col-xs-5" data-tab-id="email"> <label class="control-label col-lg-3"> Tweede email adres </label> <div class="col-lg-9"> <div class="input-group"> <span class="input-group-addon"> <i class="icon-envelope"></i> </span> <input type="text" name="SENDMAIL_ORDER_STATUS_SECOND_EMAIL[]" value="" class=""> </div><p class="help-block"> Voeg een email adres toe waaraan de pakbon email CC moet worden</p></div></div><div class="form-group col-xs-2" data-tab-id="email"><label class="control-label col-lg-3"></label><div class="col-lg-9"><a class="btn btn-danger trash-sendmail-row" data-id="'+statusId+'"><i class="icon-trash"></i></a></div></div></li>');
      }

      $(document).on('select2:select', '#MSTHEMECONFIG_ORDERSTATE_SENDMAIL', function(event) {

        event.preventDefault();
        var text = event.params.data.text;
        var value = event.params.data.id;
        var $parentFormElement = $(this).closest('.form-group');
        var exists = false;
        $('ol#extra_email_settings li').each(function(index, el) {
          if($(el).attr('data-id') === value){
            exists = true;
            return;
          }
        });

        if(!exists){
          setEmailInputRow($parentFormElement, text, value);
        }
      });

      $(document).on('click', '.trash-sendmail-row', function(event) {
        event.preventDefault();
        var id  = $(this).attr('data-id');
        $('#extra_email_settings li[data-id="'+id+'"]').remove();
      });

      /**
       * Update styling of config form
       */
      $('.nav.nav-tabs').addClass('nav-pills nav-stacked col-sm-3').removeClass('nav-tabs');
      $('.tab-content').addClass('col-sm-9');
      $('#fieldset_0').addClass('row');
      $('.panel-footer').addClass('col-xs-12');
      $('.form-wrapper').css('max-width','100%');

  {/literal}

      $('.nav#modernesmid-config-tab button').on('show.bs.tab', function (event) {
        let panel = $(event.target).attr('data-panel');

        $.ajax({
          url: '{$ajax_url}' + panel,
        }).done(function (e) {
          $('#v-pills-' + panel).html(e);

          setSortable($('.form-group[data-tab-id="main"]').first());
          setEmailInputList($('.form-group[data-tab-id="email"]'));

          //Select2 input without ajax call
          $('.select2-native-input').each(function (elem, index) {
            $(this).select2();
          });
          //Select2 input with ajax call
          $('.select2-data-input').each(function (elem, index) {
            let domElem = $(this);
            let dataType = domElem.attr('data-type');
            let multiple = domElem.get(0).hasAttribute('multiple');

            if (multiple) {
              $(this).select2({
                width: '100%',
                multiple: true,
                ajax: {
                  cache: true,
                  url: '{$select2_url}' + dataType,
                  dataType: 'json',
                  data: function (params) {
                    return {
                      search: params.term,
                    };
                  }
                }
              });
            } else {
              $(this).select2({
                width: '100%',
                ajax: {
                  cache: true,
                  url: '{$select2_url}' + dataType,
                  dataType: 'json',
                  data: function (params) {
                    return {
                      search: params.term,
                    };
                  }
                }
              });
            }
          });
        });
      });
    });


      $(document).ready(function() {
        window.prestashop.component.initComponents([
          'TranslatableField',
          'TinyMCEEditor',
          'TranslatableInput',
        ]);
      });

  </script>

{/block}


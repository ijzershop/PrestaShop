{**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
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
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
<div class="footer-container bg-light pt-1">
  <div class="container-fluid">
    <div class="bg-light">
      <div class="container-fluid d-none d-sm-none d-md-block">
          {block name='header-info-block'}
              {include file="custom_blocks/zekerheden-banner.tpl"}
          {/block}
      </div>
    {block name='footer-info-block'}
      {include file="custom_blocks/footer-info-top.tpl"}
    {/block}

    {block name='footer-info-block'}
      {include file="custom_blocks/footer-info-bottom.tpl"}
    {/block}
    </div>
    <div class="row bg-footer align-middle">
      <div class="container">
        <div class="row">
          <div class="col-12 d-flex d-sm-flex d-lg-none">
            <img class="mx-auto pt-2 lazyload" rel="preload" as="image" width="50px" data-src="/themes/modernesmid_theme/assets/img/200818_Betalingsmethoden_YS_R01.svg" alt="{l s="payment options" d='Shop.Theme.Global'}" title="{l s="payment options from this shop" d='Shop.Theme.Global'}">
          </div>
          <div class="col-12 col-lg-9">
            <p class="text-center text-lg-left">
              {block name='copyright_link'}
                <br>
                <span class="d-inline mr-2"><button type="button" id="customerInfBtn" class="btn btn-outline-light p-1"><i class="fasl fa-info-circle"></i></button></span>
                <a rel="nofollow" class="text-white">
                  {l s='%copyright% %year% %modernesmid% | %kvknummer% | %btw%' sprintf=['%modernesmid%' => 'De Moderne Smid BV', '%kvknummer%' => 'KvK nummer: 075220555', '%btw%' => 'BTW nr.: NL860193421B01', '%year%' => 'Y'|date, '%copyright%' => '©'] d='Shop.Theme.Global'}
                </a>
              {/block}
            </p>
          </div>
          <div class="d-none d-lg-block col-lg-3">
            <img class="float-right pt-2" rel="preload" as="image" width="50px" src="/themes/modernesmid_theme/assets/img/200818_Betalingsmethoden_YS_R01.svg" alt="{l s="payment options" d='Shop.Theme.Global'}" title="{l s="payment options from this shop" d='Shop.Theme.Global'}">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="privacyConfirmModal" tabindex="-1" role="dialog" aria-labelledby="privacyConfirmModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="privacyConfirmModalLabel">Privacy Bericht</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body"><h6 class="w-100">Weet u zeker dat u uw bezoek informatie wilt ophalen?</h6>
        De informatie die u wilt ophalen bevat privacy gevoelige informatie.<br> Deze informatie kunt u zelf door sturen naar onze administratie.<br/>
        Uiteraard wordt dit <strong>niet</strong> bewaard op onze server <br/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Sluiten</button>
        <button type="button" class="btn btn-primary" id="confirmPrivacy">OK</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="customerInfoModal" tabindex="-1" role="dialog" aria-labelledby="customerInfoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="customerInfoModalLabel">Uw bezoek informatie</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style="overflow:scroll;max-height:75vh">
      <div id="customerInfoContent"></div>
      <div>
        <div class="row mb-2">
          <div class="col-4 font-weight-bold">
            <label  for="extra_info">Extra informatie</label>
          </div>
          <div class="col-8">
            <input type="hidden" id="customer_info" value=""/>
            <textarea  class="w-100" id="extra_info_priv" rows="10"></textarea>
          </div>
        </div>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary float-left" data-dismiss="modal">Sluiten</button>
        <button type="button" id="send_customer_data_email" class="btn btn-success">Verstuur</button>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">

  document.querySelector('#customerInfBtn').addEventListener('click', () => {
    $('#privacyConfirmModal').modal('show');
  });


  document.querySelector('#send_customer_data_email').addEventListener('click', () => {
    let customerInfo = document.querySelector('#customer_info').value;
    sendCustomerInfo(JSON.parse(customerInfo));
  });

  // Function to detect device type
  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "Tablet";
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return "Mobile";
    }
    return "Desktop";
  }

  document.querySelector('#confirmPrivacy').addEventListener('click', () => {
    $('#privacyConfirmModal').modal('hide');


    let getProductList = prestashop.cart.products;
    let productList = '';
    for (let i = 0; i < getProductList.length; i++) {
      let customization = getProductList[i].customizations;
      let cust = '';

        if(customization.length > 0) {
          cust = '- ' + customization[0]['fields'][0]['text'];
        }

        productList += ' - ' + getProductList[i].name + cust + '<br/> ';
    }

    const customerInfo = {
      // Customer Data
      'Gast': '{Context::getContext()->customer->is_guest}',
      'Klant ID': '{Context::getContext()->customer->id}',
      'Klant Naam': '{Context::getContext()->customer->firstname }'+ ' ' + '{Context::getContext()->customer->lastname}',
      'Klant Email': '{Context::getContext()->customer->email}',

      // Cart/Order Data
      'Winkelagen ID': '{Context::getContext()->cart->id}',
      'Product aantal': '{Context::getContext()->cart->getProducts()|count}',
      'Producten': productList,

      'Bestelbedrag': '€ {Context::getContext()->cart->getOrderTotal()}',
      'Valuta': '{Context::getContext()->currency->iso_code}',

      'Land': '{Context::getContext()->country->name[1]}',
      'Landcode': '{Context::getContext()->country->iso_code}',
      'Taal': '{Context::getContext()->language->language_code}',

      'Apparaat': getDeviceType(),
      'Browser': navigator.userAgent,
      'Build': navigator.buildID,
      'Platform': navigator.platform,
      'Scherm formaat': window.screen.width+'px / '+window.screen.height+'px',
      'IP Adres': '{Tools::getRemoteAddr()}',
      'Vanuit console': '{Tools::isPHPCLI()}',
      'Tijdzone': Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    const infoHtml = Object.entries(customerInfo)
      .filter(([, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => '<div class="row mb-2"><div class="col-4 font-weight-bold">'+ key +':</div><div class="col-8">'+ value +'</div></div>')
      .join('');

    document.querySelector('#customerInfoContent').innerHTML = infoHtml;
    document.querySelector('#customer_info').value = JSON.stringify(customerInfo);
    $('#customerInfoModal').modal('show');
  });

  // Send customer info via AJAX
  function sendCustomerInfo(customerInfo) {
    customerInfo['Extra Info'] = document.querySelector('#extra_info_priv').value;

    $.ajax({
      url:  '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1',
      type: 'POST',
      data: {
        action: 'sendCustomerInfoToAdministration',
        customerData: JSON.stringify(customerInfo),
        ajax: true
      },
      success: function(response) {
        // Handle response from server
        let data = JSON.parse(response);
        $('#customerInfoContent').html('');
        if (data.success) {
          // Show success message in modal

          $('#customerInfoContent').prepend('<div class="col-12 p-4 alert-success mt-3">Bedankt!, Uw informatie is verzonden naar onze administratie. U kunt nu deze modal sluiten.</div>');
        } else {
          $('#customerInfoContent').prepend('<div class="col-12 p-4  alert-danger mt-3">Informatie verzenden mislukt!</div>');
        }
      }
    });
  }

</script>

{hook h='displayFooter'}

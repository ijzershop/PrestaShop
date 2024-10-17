{extends file='layouts/layout-both-columns.tpl'}
{block name="content"}
  <script type="application/javascript">
    let offerCode = "{{$offer.access_code}}";
    let offerEmail = "{{$offer.email}}";
    let min_item = '{l s='Please select at least one product'}';
    let max_item = '{l s='You cannot add more than %d product(s) to the product comparison'}';
  </script>

  <style>
    .block-category-inner{
      height: 70px;
      opacity: 0.4;
      overflow: hidden;
      -webkit-transition: all .3s linear;
      -moz-transition: all .3s linear;
      -o-transition: all .3s linear;
      transition: all .3s linear;
    }

    .block-category-inner.active{
      height: auto;
      opacity: 1;
      -webkit-transition: all .3s linear;
      -moz-transition: all .3s linear;
      -o-transition: all .3s linear;
      transition: all .3s linear;
    }
    #toggle-cat-description span{
      min-width: 50%;
      display: inline-block;
    }

    #toggle-cat-description:hover{
      background-color: rgba(59, 86, 173, 1);
      color: #ffffff;
    }
    #toggle-cat-description{
      color: rgba(59, 86, 173, 0.5);
      padding: 5px 0px;
    }
  </style>

<div class="card mt-3" id="offer_card_access">
  <div class="card-header text-center"><h1>{l s='Uw offerte'}</h1></div>
  <div class="card-body">
    <p class="col-12 col-sm-8 mx-auto">Uw offerte staat klaar, vul uw gegevens in om de offerte te kunnen bekijken. Deze kunt u terugvinden in de offerte mail die u van ons heeft ontvangen.</p>
  <form class="mx-auto col-12 col-sm-8">
    <div class="form-group row">
      <label for="access_email" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" id="access_email" placeholder="Email" autocomplete=off>
        <small id="access_email_help_text" class="form-text text-muted">
          Vul hier uw email adres in waarop u de offerte mail heeft ontvangen.
        </small>
      </div>
    </div>
    <div class="form-group row">
      <label for="access_code" class="col-sm-2 col-form-label">Code</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="access_code" placeholder="Code" style="text-transform:uppercase" autocomplete=off>
        <small id="access_code_help_text" class="form-text text-muted">
          Vul hier de toegangscode in. Deze vind u in de offerte mail die van ons heeft ontvangen.
        </small>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-sm-12">
        <button type="button" class="btn btn-primary col-12 disabled" disabled id="show_offer_btn">Toon mijn offerte</button>
      </div>
    </div>
  </form>
  </div>
</div>



  <div class="mt-3 d-none" id="offer_card">
    <div id="js-product-list-header" class="col-12 pr-3 pl-3  pr-lg-0 pl-lg-0 ">
      <h2 class="h2 mb-4 text-center">{$offer.name}</h2>
      <div id="block-category-inner" class="block-category-inner row">
        <div class="col-12">
          <div id="category-description" class="text-muted table-responsive">
            <table class="table table-condensed table-striped table-hover w-100">
              <tr>
                <th class="col-auto">Verloopdatum</th>
                <td class="col">
                  {if {$date_exp_days} > 0}
                    {l s='De offerte '} {l s='vervalt over'} <span class="badge rounded-pill bg-primary text-white"> <b>{$date_exp_days}</b> {if $date_exp_days == 1}{l s='dag op'}{else}{l s='dagen op'}{/if} <b>{date('d-m-Y', strtotime($date_exp))}</b></span>
                  {else}
                    {l s='De offerte is verlopen op '} <span class="badge rounded-pill bg-danger text-white"> <b>{date('d-m-Y', strtotime($date_exp))}</b></span>
                  {/if}
                </td>
              </tr>

              <tr>
                <th class="col-auto">Wat te doen?</th>
                <td class="col">
                 <ul class="p-0 pl-2">
                   <li>Vul het gewenste aantal in</li>
                   <li>Plaats in uw winkelwagen</li>
                   <li>Voeg eventueel extra producten toe</li>
                   <li>Bestel & betaal</li>
                 </ul>
                </td>
              </tr>

              <tr>
                <th class="col-auto">Aanmaakdatum</th>
                <td class="col">{date('d-m-Y', strtotime($offer.date_add))}</td>
              </tr>
              <tr>
                <th class="col-auto">Referentie</th>
                <td class="col">{$reference}</td>
              </tr>
              <tr>
                <th class="col-auto">Unieke code</th>
                <td class="col">{$offer.code}</td>
              </tr>
              {if $offer.message}
              <tr>
                <th>Bericht</th>
                <td>
                  {html_entity_decode($offer.message) nofilter}
                </td>
              </tr>
              {/if}
            </table>
          </div>
        </div>
      </div>
      <div class="row text-center"><a href="#" class="w-100 display-4 text-decoration-none" id="toggle-cat-description" data-shown="0" onclick="toggleCategoryDescr(this)"> <i class="fasl fa-chevron-down"></i>  <span>Toon meer informatie</span>  <i class="fasl fa-chevron-down"></i> </a></div>
    </div>

    <div id="js-product-list" class="row">
      <div class="products col-12 p-0 pl-3 pr-3 pl-md-4 pr-md-4 pl-lg-3 pr-lg-3">
        {foreach from=$products key="index" item="product"}
          {block name='product_miniature'}
            {include file='catalog/_partials/miniatures/listing-product.tpl' index=$index product=$product}
          {/block}
        {/foreach}
      </div>


    <div class="w-100 mt-3">
      <div class="col-12 p-4 bg-info">
        {include file='themes/modernesmid_theme/templates/custom_blocks/category_footer.tpl'}
      </div>
    </div>
    </div>


    <script type="text/javascript">
      function toggleCategoryDescr(e){
        if(document.getElementById('block-category-inner').classList.contains('active')){
          document.getElementById('block-category-inner').classList.remove('active');
          document.getElementById('toggle-cat-description').innerHTML = '<i class="fasl fa-chevron-down"></i>  <span>Toon meer informatie</span> <i class="fasl fa-chevron-down"></i>';
        } else {
          document.getElementById('block-category-inner').classList.add('active');
          document.getElementById('toggle-cat-description').innerHTML = '<i class="fasl fa-chevron-up"></i> <span>Verberg Informatie</span> <i class="fasl fa-chevron-up"></i> ';
        }


      }
    </script>
{/block}

  {block name="hook_before_body_closing_tag"}
<script type="text/javascript">
let comparator_max_item = '{if isset($comparator_max_item)}{$comparator_max_item}{else}0{/if}';
let comparedProductsIds = '{if isset($comparator_max_item)}{$compared_products}{else}[]{/if}';


let accessElem = document.getElementById('access_code');
let emailElem = document.getElementById('access_email');

if(offerCode === localStorage.getItem('offerAccessCode')){
  document.getElementById('offer_card').classList.toggle('d-none');
  document.getElementById('offer_card_access').classList.toggle('d-none');
} else {


  emailElem.addEventListener('keyup',function(e){
    return checkValidAccessData();
  });

  emailElem.addEventListener('paste',function(e){
    return checkValidAccessData();
  });

  emailElem.addEventListener('drop',function(e){
    return checkValidAccessData();
  });

  emailElem.addEventListener('change',function(e){
    return checkValidAccessData();
  });


  accessElem.addEventListener('keyup',function(e){
    return checkValidAccessData();
  });

  accessElem.addEventListener('paste',function(e){
    return checkValidAccessData();
  });

  accessElem.addEventListener('drop',function(e){
    return checkValidAccessData();
  });

  accessElem.addEventListener('change',function(e){
    return checkValidAccessData();
  });

  let checkValidAccessData  = function(e){
    if(emailElem.value.trim() === offerEmail){
      emailElem.classList.add('is-valid');
    } else {
      emailElem.classList.remove('is-valid');
    }

    if(accessElem.value.toUpperCase().trim() === offerCode){
      accessElem.classList.add('is-valid');
    } else {
      accessElem.classList.remove('is-valid');
    }

    let subButton = document.getElementById('show_offer_btn');
    if(emailElem.value.trim() === offerEmail && accessElem.value.toUpperCase().trim() === offerCode){
      subButton.classList.remove('disabled');
      subButton.disabled = false;
    } else {
      subButton.classList.add('disabled');
      subButton.disabled = true;
    }
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let changeEvent = new Event('change');
  if(urlParams.has('email')){
    emailElem.value = decodeURI(urlParams.get('email'));
    emailElem.dispatchEvent(changeEvent);
  }

  if(urlParams.has('access_code')){
    accessElem.value = urlParams.get('access_code');
    accessElem.dispatchEvent(changeEvent);
  }
}
document.getElementById('show_offer_btn').addEventListener('click', function(e){
  localStorage.setItem('offerAccessCode', document.getElementById('access_code').value);
  document.getElementById('offer_card').classList.toggle('d-none');
  document.getElementById('offer_card_access').classList.toggle('d-none');
});

  if(accessElem.classList.contains('is-valid') && emailElem.classList.contains('is-valid')){
    let clickEvent = new Event('click');
    document.getElementById('show_offer_btn').dispatchEvent(clickEvent);
  }
</script>
{/block}










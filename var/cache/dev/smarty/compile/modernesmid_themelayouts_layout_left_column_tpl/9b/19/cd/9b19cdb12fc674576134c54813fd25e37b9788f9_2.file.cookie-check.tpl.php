<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:44
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\custom_blocks\cookie-check.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342fcdc5200_51580934',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '9b19cdb12fc674576134c54813fd25e37b9788f9' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\custom_blocks\\cookie-check.tpl',
      1 => 1720689092,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a342fcdc5200_51580934 (Smarty_Internal_Template $_smarty_tpl) {
?><aside class="modal fade show" style="<?php if ($_smarty_tpl->tpl_vars['consent_cookie']->value == '1') {?>display:none;<?php } else { ?>display:block;z-index:999;<?php }?>" id="cookiesModal" tabindex="-1" role="dialog" aria-labelledby="cookiesModal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg container" role="document">
    <div class="modal-content">
      <div class="modal-header p  d-none d-md-block">
        <img loading="lazy" class="logo w-25 d-none d-md-block" src="<?php ob_start();
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['logo'], ENT_QUOTES, 'UTF-8');
$_prefixVariable1 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable1, ENT_QUOTES, 'UTF-8');?>
" alt="Ijzershop">
      </div>
      <div data-id="cookie-primary" class="d-block">
        <div class="modal-body">
          <h5 class="mb-3 text-black modal-title">Wij gebruiken Cookies</h5>
          <p class="text-black" style="font-size:14px;">Wij gebruiken cookies op deze website om content en advertenties te personaliseren. Daarnaast kunnen socialmedia features hiermee geladen worden en analyseren wij de interacties van onze bezoekers. We delen deze informatie met onze analytics en socialmedia partners en adverteerders. Zij kunnen deze data combineren met data die ze al hebben verzameld. Een lijst met alle cookies en de functies hiervan vindt u in onze <a href="/content/11-privacyverklaring" title="privacy verklaring">privacyverklaring.</a></p>
        </div>
        <div class="modal-footer" style="min-height: 125px;">
          <a type="button" class="btn btn-primary col-12 col-md-6"  id="cookie-accept">Accepteren</a>
          <a type="button" class="btn btn-outline-secondary col-12 col-md-6" id="cookie-change">Instellingen aanpassen</a>
        </div>
      </div>
      <div data-id="cookie-secondary" class="d-none">
        <div class="modal-body">
          <div class="d-flex align-items-center">
            <div>
              <h6 class="mb-1 text-black">Noodzakelijk</h6>
              <p class="mr-4 text-black">Deze cookies zijn essentieel om de website goed te laten functioneren. Ze stellen je in staat om door de website te navigeren en de functies ervan te gebruiken</p>
            </div>
            <div>
              <input class="cookie-input" id="necessary" disabled name="necessary" type="checkbox" checked />
              <div class="cookie-toggle">
                <div class="cookie-bubble"></div>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div>
              <h6 class="mb-1 text-black">Analytics</h6>
              <p class="mr-4 text-black">Deze cookies verzamelen informatie over hoe bezoekers de website gebruiken, zoals welke pagina's het vaakst worden bezocht. Deze gegevens helpen ons de website te verbeteren en aan te passen aan de behoefte van onze bezoekers.</p>
            </div>
            <div>
              <input class="cookie-input" id="analytics" disabled name="analytics" type="checkbox" checked />
              <div class="cookie-toggle">
                <div class="cookie-bubble"></div>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div>
              <h6 class="mb-1 text-black">Marketing</h6>
              <p class="mr-4 text-black">Deze cookies worden gebruikt om advertenties relevanter voor jou te maken en je interesses beter te begrijpen. Ze worden ook gebruikt om de doeltreffendheid van advertentiecampagnes te meten.</p>
            </div>
            <label>
              <input class="cookie-input" id="marketing" name="marketing" type="checkbox" checked />
              <div class="cookie-toggle">
                <div class="cookie-bubble"></div>
              </div>
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <a type="button" class="btn btn-outline-secondary col-12 col-md-6" id="cookie-accept-change">Aanpassingen accepteren</a>
        </div>
      </div>
    </div>
  </div>
</aside>
<?php }
}

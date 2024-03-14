<aside class="modal fade show" style="{if $consent_cookie == '1'}display:none;z-index:-1;{else}display:block;z-index:999;{/if}" id="cookiesModal" tabindex="-1" role="dialog" aria-labelledby="cookiesModal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg container" rol="document">
    <div class="modal-content">
      <div class="modal-header p  d-none d-md-block">
        <img loading="lazy" class="logo w-25 d-none d-md-block" src="{{$shop.logo}}" alt="Ijzershop">
      </div>
      <div data-id="cookie-primary" class="">
        <div class="modal-body">
          <h5 class="mb-3 text-black modal-title">Wij gebruiken Cookies</h5>
          <p class="text-black" style="font-size:14px;">Wij gebruiken cookies op deze website om content en advertenties te personaliseren. Daarnaast kunnen social media features hiermee geladen worden en analyseren wij de interacties van onze bezoekers. We delen deze informatie met onze analytics en social media partners en adverteerders. Zij kunnen deze data combineren met data die ze al hebben verzameld. Een lisjt met alle cookies en de functies hiervan vindt u in onze <a href="/content/11-privacyverklaring" title="privacy verklaring">privacyverklaring.</a></p>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-outline-secondary float-right w-47" id="cookie-change">Instellingen aanpassen</button>
          <button type="button" class="btn btn-primary float-left w-47"  id="cookie-accept">Accepteren</button>
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
        <div class="modal-footer justify-content-between m-col-rev">
          <button type="button" class="btn btn-primary w-47 float-left" id="cookie-accept-2">Accepteren</button>
          <button type="button" class="btn btn-outline-secondary float-right w-47" id="cookie-accept-change">Aanpassingen accepteren</button>
        </div>
      </div>
    </div>
  </div>
</aside>

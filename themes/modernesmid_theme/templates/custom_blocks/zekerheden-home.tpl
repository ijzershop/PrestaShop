<style type="text/css">
  .home-info-photo-2{
    position: absolute;
    top: 65px;
    width: 165px;
    right: -10px;
    z-index: 1;
  }

  .home-info-photo-1{
    position: absolute;
    top: 65px;
    width: 172px;
    left: -22px;
    z-index: 1;
  }
</style>



<div class="row mb-3 pl-0 pr-0">
    {*      Start Blok Offers        *}
  <div class="d-none d-md-flex col-6 p-1 pl-0">
    <div class="card m-1 border-0 mb-2 w-100">
      <div class="card-header p-0" style="background-color: #3b56ad;">
        <div class="card-title mx-auto mb-1 mt-1">
          <h4 class="text-white text-center mb-1 mt-1"> Online bestellen</h4></div>
      </div>
      <div class="card-body p-0 border-left border-right">
        <img src="/themes/modernesmid_theme/assets/img/tako_home.png" alt="" class="home-info-photo-1" style="">
        <ul class="list-group list-group-flush p-0 text-right" style="color: #3b56ad">
          <li style="cursor:pointer;font-size:14px;" data-toggle="modal" data-target="#home-info-modal-order" data-item="verzendkosten-order" class="list-group-item font-weight-bold h6 p-2 mb-0">€ 10 incl. btw verzendkosten per bestelling</li>
          <li style="cursor:pointer;font-size:14px;" data-toggle="modal" data-target="#home-info-modal-order" data-item="zaagsnede-order" class="list-group-item font-weight-bold h6 p-2 mb-0">Eerste zaagsnede of knip gratis</li>
          <li style="cursor:pointer;font-size:14px;" data-toggle="modal" data-target="#home-info-modal-order" data-item="morgen-geleverd-order" class="list-group-item font-weight-bold h6 p-2 mb-0">Voor 15:00 besteld morgen in huis</li>
          <li style="cursor:pointer;font-size:14px;" data-toggle="modal" data-target="#home-info-modal-order" data-item="geen-verborgen-kosten-order" class="list-group-item font-weight-bold h6 p-2 mb-0">Geen verborgen kosten achteraf</li>
          <li style="cursor:pointer;font-size:14px;" data-toggle="modal" data-target="#home-info-modal-order" data-item="uit-vooraad-order" class="list-group-item font-weight-bold h6 p-2 mb-0">Uit vooraad geleverd</li>
          <li style="cursor:pointer;font-size:14px;" data-toggle="modal" data-target="#home-info-modal-order" data-item="rest-materiaal-order" class="list-group-item font-weight-bold h6 p-2 mb-0">Rest materiaal altijd meegeleverd</li>
        </ul>
      </div>
      <div class="btn-group btn-group-justified">
        <a href="#" target="_blank"  class="btn btn-secondary btn-success" style="border-top-right-radius: 0;">Stel een vraag</a>
      </div>
    </div>
  </div>


  <!-- Modal -->
  <div class="modal fade" id="home-info-modal-order" tabindex="-1" aria-labelledby="orderInfoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body text-wrap">
          <button type="button" class="close text-danger" data-dismiss="modal" aria-label="Close" style="font-size:4em;position:absolute;right: 0;top:-9px;">
            <span aria-hidden="true">&times;</span>
          </button>
          <blockquote class="blockquote text-center d-none">
            Alles wat wij aanbieden is via onze webshop verkrijgbaar. Ook word ook alles uit eigen vooraad geleverd. Wilt graag afhalen? Geen probleem, u kunt gewoon langskomen en bestellen aan de balie.</blockquote>
          <p>
          <div id="accordion-order">
            <div class="card mb-1">
              <div class="card-header" id="morgen-geleverd-heading">
                <h5 class="mb-0">
                  <button class="btn btn-link font-weight-bold pl-0 " data-toggle="collapse" data-target="#morgen-geleverd-order" aria-expanded="true" aria-controls="collapseOne">Voor 15:00 besteld morgen in huis</button>
                </h5>
              </div>

              <div id="morgen-geleverd-order" class="collapse" aria-labelledby="morgen-geleverd-heading" data-parent="#accordion-order">
                <div class="card-body">
                  <h6>Wij beantwoorden uw offerte aanvraag binnen één dag.</h6>
                  <p>Ons aanbod sturen wij u per email toe, hierin staat een link waarmee u de offerte direct in onze webshop kunt bestellen en afrekenen.</p>
                  <p>Het bewerken van materialen moet worden ingepland in onze werkplaats waardoor de levertijd soms kan oplopen naar 5-7 werkdagen.
                    Welke informatie hebben wij voor een offerte aanvraag nodig?</p>
                  <p>
                    > Maak een duidelijke overzichtelijke lijst<br/>
                    > Specificeer om welke materialen het gaat<br/>
                    > Vermeld alle maten in millimeters<br/>
                    > Gebruik geen overzichtstekening maar gebruik detailtekeningen<br/>
                    > Wij bieden geen draagkracht berekeningen dus geven geen bindend advies voor materiaal keuze. <br/>
                  </p>

                  <h6>Bekijk onze mogelijkheden</h6>
                  <p>Wij adviseren u om eerst onze pagina Constructiewerk te bekijken, hier staan alle mogelijkheden van de Ijzershop.nl voor het bewerken van metaal omschreven. U kunt bij de Ijzershop.nl terecht voor zagen, lassen, boren zetten en knippen van metalen. Niet alle materialen kunnen door ons worden bewerkt.<br/><a href="#">> Bekijk onze pagina constructiewerk voor meer informatie</a></p>

                  <h6>Bekijk ook de vragen van andere klanten</h6>
                  <p>Op onze pagina 'Veel gestelde vragen' kunt u de antwoorden terug vinden op vragen die eerder door andere klanten zijn gesteld, wellicht kunt u hier ook al het antwoord op uw vragen vinden.
                    <a href="#">> Bekijk onze pagina met veel gestelde vragen</a></p>
                </div>
              </div>
            </div>
            <div class="card mb-1">
              <div class="card-header" id="uit-vooraad-heading">
                <h5 class="mb-0">
                  <button class="btn btn-link font-weight-bold pl-0  collapsed" data-toggle="collapse" data-target="#uit-vooraad-order" aria-expanded="false" aria-controls="collapseTwo">
                    Uit vooraad geleverd
                  </button>
                </h5>
              </div>
              <div id="uit-vooraad-order" class="collapse" aria-labelledby="uit-vooraad-heading" data-parent="#accordion-order">
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
            <div class="card mb-1">
              <div class="card-header" id="verzendkosten-heading">
                <h5 class="mb-0">
                  <button class="btn btn-link font-weight-bold pl-0  collapsed" data-toggle="collapse" data-target="#verzendkosten-order" aria-expanded="false" aria-controls="collapseThree">
                    € 10 incl. btw verzendkosten per bestelling
                  </button>
                </h5>
              </div>
              <div id="verzendkosten-order" class="collapse" aria-labelledby="verzendkosten-heading" data-parent="#accordion-order">
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
            <div class="card mb-1">
              <div class="card-header" id="rest-materiaal-heading">
                <h5 class="mb-0">
                  <button class="btn btn-link font-weight-bold pl-0  collapsed" data-toggle="collapse" data-target="#rest-materiaal-order" aria-expanded="false" aria-controls="collapseThree">
                    Rest materiaal altijd meegeleverd
                  </button>
                </h5>
              </div>
              <div id="rest-materiaal-order" class="collapse" aria-labelledby="rest-materiaal-heading" data-parent="#accordion-order">
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
            <div class="card mb-1">
              <div class="card-header" id="zaagsnede-heading">
                <h5 class="mb-0">
                  <button class="btn btn-link font-weight-bold pl-0  collapsed" data-toggle="collapse" data-target="#zaagsnede-order" aria-expanded="false" aria-controls="collapseThree">
                    Eerste zaagsnede of knip gratis
                  </button>
                </h5>
              </div>
              <div id="zaagsnede-order" class="collapse" aria-labelledby="zaagsnede-heading" data-parent="#accordion-order">
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
            <div class="card mb-1">
              <div class="card-header" id="kosten-heading">
                <h5 class="mb-0">
                  <button class="btn btn-link font-weight-bold pl-0  collapsed" data-toggle="collapse" data-target="#geen-verborgen-kosten-order" aria-expanded="false" aria-controls="collapseThree">
                    Geen verborgen kosten achteraf
                  </button>
                </h5>
              </div>
              <div id="geen-verborgen-kosten-order" class="collapse" aria-labelledby="kosten-heading" data-parent="#accordion-order">
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
          </div>



          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Sluiten</button>
          <button type="button" class="btn btn-success">Stel een vraag</button>
        </div>
      </div>
    </div>
  </div>

    {*      End Blok Offers        *}





    {*      Start Blok Offers        *}
  <div class="d-none d-md-flex col-6 p-1 pr-0">
    <div class="card m-1 border-0 mb-2 w-100">
      <div class="card-header p-0" style="background-color: #3b56ad;">
        <div class="card-title mx-auto mb-1 mt-1">
          <h4 class="text-white text-center mb-1 mt-1"> Maatwerk of Offerte</h4></div>
      </div>
      <div class="card-body p-0 border-left border-right">
        <img src="/themes/modernesmid_theme/assets/img/robin_home.png" alt="" class="home-info-photo-2" style="">
        <ul class="list-group list-group-flush p-0 text-left" style="color: #3b56ad">
          <li style="cursor:pointer;font-size:14px;" data-toggle="modal" data-target="#home-info-modal-offer" data-item="reactie-1-dag-offerte" class="list-group-item font-weight-bold h6 p-2 mb-0">Reactie binnen 1 dag</li>
          <li style="cursor:pointer;font-size:14px;" data-toggle="modal" data-target="#home-info-modal-offer" data-item="offerte-aanbod-offerte" class="list-group-item font-weight-bold h6 p-2 mb-0">Offerte aanbod direct online bestellen</li>
          <li style="cursor:pointer;font-size:14px;" data-toggle="modal" data-target="#home-info-modal-offer" data-item="vakman-advies-offerte"  class="list-group-item font-weight-bold h6 p-2 mb-0">Altijd advies door een vakman</li>
          <li style="cursor:pointer;font-size:14px;" data-toggle="modal" data-target="#home-info-modal-offer" data-item="constructie-werk-offerte"  class="list-group-item font-weight-bold h6 p-2 mb-0">Constructiewerk op maat</li>
          <li style="cursor:pointer;font-size:14px;" data-toggle="modal" data-target="#home-info-modal-offer" data-item="bewerkingen-offerte"  class="list-group-item font-weight-bold h6 p-2 mb-0">Zagen, Knippen, Lassen etc. mogelijk</li>
          <li style="cursor:pointer;font-size:14px;" data-toggle="modal" data-target="#home-info-modal-offer" data-item="max-lengte-offerte"  class="list-group-item font-weight-bold h6 p-2 mb-0">Max. lengte te verzenden is 2000mm </li>
        </ul>
      </div>
      <div class="btn-group btn-group-justified">
        <a href="#" target="_blank"  class="btn btn-secondary btn-success" style="border-top-right-radius: 0;">Offerte aanvragen</a>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="home-info-modal-offer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body text-wrap">
          <button type="button" class="close text-danger" data-dismiss="modal" aria-label="Close" style="font-size:4em;position:absolute;right: 0;top:-9px;">
            <span aria-hidden="true">&times;</span>
          </button>
          <blockquote class="blockquote text-center d-none">
            Kunt u niet vinden wat u zoekt in onze webshop of wilt u materiaal op basis van een tekening bestellen.<br/>
            Neem dan eens contact met ons op, we helpen u graag verder.
          </blockquote>
          <p>
          <div id="accordion-offer">
            <div class="card mb-1">
              <div class="card-header" id="reactie-1-dag-offerte-heading">
                <h5 class="mb-0">
                  <button class="btn btn-link font-weight-bold pl-0 " data-toggle="collapse" data-target="#reactie-1-dag-offerte" aria-expanded="true" aria-controls="collapseOne">Reactie binnen één dag</button>
                </h5>
              </div>
              <div id="reactie-1-dag-offerte" class="collapse show" aria-labelledby="reactie-1-dag-offerte-heading" data-parent="#accordion-offer">
                <div class="card-body">
                  <h6>Wij beantwoorden uw offerte aanvraag binnen één dag.</h6>
                  <p>Ons aanbod sturen wij u per email toe, hierin staat een link waarmee u de offerte direct in onze webshop kunt bestellen en afrekenen.</p>
                  <p>Het bewerken van materialen moet worden ingepland in onze werkplaats waardoor de levertijd soms kan oplopen naar 5-7 werkdagen.
                    Welke informatie hebben wij voor een offerte aanvraag nodig?</p>
                  <p>
                    > Maak een duidelijke overzichtelijke lijst<br/>
                    > Specificeer om welke materialen het gaat<br/>
                    > Vermeld alle maten in millimeters<br/>
                    > Gebruik geen overzichtstekening maar gebruik detailtekeningen<br/>
                    > Wij bieden geen draagkracht berekeningen dus geven geen bindend advies voor materiaal keuze. <br/>
                  </p>

                  <h6>Bekijk onze mogelijkheden</h6>
                  <p>Wij adviseren u om eerst onze pagina Constructiewerk te bekijken, hier staan alle mogelijkheden van de Ijzershop.nl voor het bewerken van metaal omschreven. U kunt bij de Ijzershop.nl terecht voor zagen, lassen, boren zetten en knippen van metalen. Niet alle materialen kunnen door ons worden bewerkt.
                    <a href="#">> Bekijk onze pagina constructiewerk voor meer informatie</a></p>

                  <h6>Bekijk ook de vragen van andere klanten</h6>
                  <p>Op onze pagina 'Veel gestelde vragen' kunt u de antwoorden terug vinden op vragen die eerder door andere klanten zijn gesteld, wellicht kunt u hier ook al het antwoord op uw vragen vinden.
                    <a href="#">> Bekijk onze pagina met veel gestelde vragen</a></p>
                </div>
              </div>
            </div>
            <div class="card mb-1">
              <div class="card-header" id="offerte-aanbod-offerte-heading">
                <h5 class="mb-0">
                  <button class="btn btn-link font-weight-bold pl-0  collapsed" data-toggle="collapse" data-target="#offerte-aanbod-offerte" aria-expanded="false" aria-controls="collapseTwo">
                    Offerte aanbod direct online bestellen
                  </button>
                </h5>
              </div>
              <div id="offerte-aanbod-offerte" class="collapse" aria-labelledby="offerte-aanbod-offerte-heading" data-parent="#accordion-offer">
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
            <div class="card mb-1">
              <div class="card-header" id="constructie-werk-offerte-heading">
                <h5 class="mb-0">
                  <button class="btn btn-link font-weight-bold pl-0  collapsed" data-toggle="collapse" data-target="#constructie-werk-offerte" aria-expanded="false" aria-controls="collapseThree">
                    Constructiewerk op maat
                  </button>
                </h5>
              </div>
              <div id="constructie-werk-offerte" class="collapse" aria-labelledby="constructie-werk-offerte-heading" data-parent="#accordion-offer">
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
          <div class="card mb-1">
              <div class="card-header" id="vakman-advies-offerte-heading">
                <h5 class="mb-0">
                  <button class="btn btn-link font-weight-bold pl-0  collapsed" data-toggle="collapse" data-target="#vakman-advies-offerte" aria-expanded="false" aria-controls="collapseThree">
                    Altijd advies door een vakman
                  </button>
                </h5>
              </div>
              <div id="vakman-advies-offerte" class="collapse" aria-labelledby="vakman-advies-offerte-heading" data-parent="#accordion-offer">
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
          <div class="card mb-1">
              <div class="card-header" id="bewerkingen-offerte-heading">
                <h5 class="mb-0">
                  <button class="btn btn-link font-weight-bold pl-0  collapsed" data-toggle="collapse" data-target="#bewerkingen-offerte" aria-expanded="false" aria-controls="collapseThree">
                    Zagen, Knippen, Lassen etc. mogelijk
                  </button>
                </h5>
              </div>
              <div id="bewerkingen-offerte" class="collapse" aria-labelledby="bewerkingen-offerte-heading" data-parent="#accordion-offer">
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
          <div class="card mb-1">
              <div class="card-header" id="max-lengte-offerte-heading">
                <h5 class="mb-0">
                  <button class="btn btn-link font-weight-bold pl-0  collapsed" data-toggle="collapse" data-target="#max-lengte-offerte" aria-expanded="false" aria-controls="collapseThree">
                    Max. lengte te verzenden is 2000mm
                  </button>
                </h5>
              </div>
              <div id="max-lengte-offerte" class="collapse" aria-labelledby="max-lengte-offerte-heading" data-parent="#accordion-offer">
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
          </div>



          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Sluiten</button>
          <button type="button" class="btn btn-success">Offerte aanvragen</button>
        </div>
      </div>
    </div>
  </div>

    {*      End Blok Offers        *}
</div>

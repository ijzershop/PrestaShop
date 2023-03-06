/* global $ */
$(function() {
  var $searchWidget = $('.search_widget');
  var $searchBox = $searchWidget.find('input[type=text]');
  var searchURL = $searchWidget.attr('data-search-controller-url');

  $.widget('prestashop.psBlockSearchAutocomplete', $.ui.autocomplete, {
    options: {
      messages: {
        noResults: "Geen producten gevonden.",
        results: function (amount) {
          return amount + (amount > 1 ? " producten zijn" : " product is") +
            " beschikbaar, gebruik ⬆/⬇ om te navigeren.";
        }
      }
    },
    close: function (event, ui) {
      if (!$("ul.ui-autocomplete").is(":visible")) {
        $("ul.ui-autocomplete").show();
      }
    },
    _renderItem: function (ul, product) {
      var searchBarWidth = '465px';
      var orderable = checkIsOrderable(product);

      if(product.value === 'x'){
        return $("<li>")
          .append($("<a>")
            .append($("<table width='" + searchBarWidth + "'>")
              .append($("<tr>")
                .append($("<td class='no-result-msg'>").text(product.label).addClass("category text-center"))
                ))).appendTo(ul);
      }

      if(orderable){
        return $("<li>")
          .append($("<a>")
            .append($("<table width='" + searchBarWidth + "'>")
              .append($("<tr>")
              .append($("<td width='60px'>").html('<img src="' + product.cover.small.url + '" class="searchResultItem" width="50px" height="auto"> ').addClass("category text-center"))
              .append($("<td style='vertical-align:middle'>").html(' <b>' + product.name + '</b>').addClass("product"))
              .append($("<td style='width:50px;text-align:right;' width='50px'>").html(product.price).addClass("product price"))
              .append($("<td style='width:50px;text-align:right;' width='50px'>").html('<a href="' + prestashop.urls.pages.cart + '?token=' + prestashop.static_token + '" data-button-action="add-to-cart" data-product-id="' + product.id_product + '" class="btn-sm btn-success add-to-cart searchAddToCart ml-1 text-center text-white"><i class="fasr fa-cart-shopping" data-product-id="' + product.id_product + '"></i></a>').addClass("product price text-center"))
            ))).appendTo(ul);

      } else {
        return $("<li>")
          .append($("<a>")
            .append($("<table width='" + searchBarWidth + "'>")
              .append($("<tr>")
              .append($("<td width='60px'>").html('<img src="' + product.cover.small.url + '" class="searchResultItem" width="50px" height="auto"> ').addClass("category text-center"))
              .append($("<td style='vertical-align:middle'>").html(' <b>' + product.name + '</b><br/><small>' + product.description_short + '</small><br/><small class="text-warning">Dit product is momenteel niet op vooraad</small>').addClass("product"))
              .append($("<td style='width:50px;text-align:right;' width='50px'>").html(product.price).addClass("product price"))
              .append($("<td style='width:50px;text-align:right;' width='50px'>").html('<a href="javascript:void(0)" style="opacity: 0.65;pointer-events:none;cursor:not-allowed;" class="btn-sm btn-success disabled ml-1 text-center text-white" data-product-id="' + product.id_product + '" aria-disabled="true" role="button"><i class="fasr fa-cart-shopping" data-product-id="' + product.id_product + '"></i></a>').addClass("product price text-center"))
            ))).appendTo(ul);
      }
    }
  });

  /**
   * Autocomplete function search boxes
   */


  $searchBox.psBlockSearchAutocomplete({
    position: {
      my: "left-15% top+9",
    },
    source: function (query, response) {
      let searchTerm = sanitizeSearchString(query.term);
      this.element[0].value = searchTerm;

      $.post(searchURL, {
        s: searchTerm,
        resultsPerPage: 10
      }, null, 'json')
        .then(function (resp) {
          $('form.header-search-box span.ui-helper-hidden-accessible').css('clip', 'unset');

          if(resp.products.length > 0){
            response(resp.products);
          } else {
            response([{url:'/zoeken?s='+searchTerm+'&controller=search', value:'x', label: 'Er zijn op basis van uw zoek criteria geen producten gevonden in ons assortiment.'}]);
          }
        })
        .fail(response);
    },
    select: function (event, ui) {

      let eventTarget = event.originalEvent.originalEvent.target;
      if (typeof eventTarget !== "undefined") {
        let eventTargetName = eventTarget.tagName.toLowerCase();
        if (eventTargetName !== 'svg' && eventTargetName !== 'path' && eventTargetName !== 'a') {
          var url = ui.item.url;
          window.location.href = url;
        }
      }
    },
      search: function() {
        document.querySelectorAll('svg.fa-search').forEach(function(e){
          e.classList.add('rotate-center');
        });
      },
      response: function( event, ui ) {
        document.querySelectorAll('svg.fa-search').forEach(function(e){
          e.classList.remove('rotate-center');
        });
      },
    open: function(e){

      console.log($(e.target).parents('.side_panel').length);
      if($(e.target).parents('.side_panel').length){
        //is in side panel
        $('.ui-autocomplete').css({
          'width': '465px',
          'left': '2',
        }); // HERE
      } else {

        //is in navbar
        $('.ui-autocomplete').css('width', '465px'); // HERE

      }
    }
  });
  // // Hide searchbox at outside click
  // var mouse_is_inside = true;
  // $('#main-menu-bar .search_widget').on('hover',function () {
  //   mouse_is_inside = true;
  // }, function () {
  //   mouse_is_inside = false;
  // });
  //
  // $("body").on('mouseup',function () {
  //   if (!mouse_is_inside) {
  //     $('form.header-search-box span.ui-helper-hidden-accessible').css('clip', 'rect(0 0 0 0)');
  //     $('ul.ui-autocomplete').hide();
  //   }
  // });
  /**
   * Sanitize the search string so only letters numbers and whitespaces are accepted
   * @param searchTerm
   * @returns {*}
   */
  let sanitizeSearchString = function (searchTerm) {
    const regex = /([^a-zA-Z0-9\s-]+)/g;
    let str = searchTerm.replace(regex, ' ');
    return str;
  }


  let checkIsOrderable = function(product){
    var conf = prestashop.configuration;

    if(!product){
      return false;
    }

    if(Number(conf.is_catalog) == 0){
      if(Number(conf.stock_management) == 1){
        if(Number(product.quantity) < Number(product.minimal_quantity)){
          switch(Number(product.out_of_stock)){
          case 0:
            return false;
            break;
          case 1:
            return true;
            break;
          case 2:
            if(Number(conf.order_out_of_stock) == 0){
              return false;
            } else {
              //Bestelbaar desondanks niet op vooraad
              return true;
            }
            break;
          }
        } else {
          //Er is nog genoeg vooraad
          return true;
        }
      } else {
        //Vooraadbeheer is uit alles is bestelbaar
        return true;
      }
    } else {
      //Is catalogus modes, niets is bestelbaar
      return false;
    }
  }
});

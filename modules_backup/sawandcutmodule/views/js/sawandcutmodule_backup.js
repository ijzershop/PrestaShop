function renderMoneyString(price) {
    const formatter = new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    });
    return formatter.format(price);
}

$(document).ready(function() {

    $(document).on('click', '.show-hide-info .icon-info', function(event) {
        event.preventDefault();
        var id = $(this).data('id');
        $('#' + id).toggle();
    });

    $(document).on('click', '#show-hide-price-specification', function(event) {
        var checked = $(this).prop('checked');
        if (checked) {
            $('#price-specification').show();
        } else {
            $('#price-specification').hide();
        }
    });


    //Cut modal specific
    function findFirstEmptyChunk(width, length) {
        $('input.form-control.chunks').each(function(index, el) {
            var cutId = getCurrentCutId();
            var parentId = getCurrentParentId();
            if ($(this).val().length === 0) {
                var index = $(this).attr('data-knippen');
                $('#chunk-' + index + '-width').val(width);
                $('#chunk-' + index + '-length').val(length);
                if (index !== 0) {
                    var prevIndex = index - 1;
                    $('#chunk-' + prevIndex + '-length').closest('.form-group').find('.remove-cut').hide();
                }
                $('#chunk-' + index + '-length').closest('.form-group').find('.extra-cut').show();
                $('#chunk-' + index + '-length').closest('.form-group').find('.remove-cut').show();
                $('#chunk-' + index + '-length').closest('.form-group').find('.extra-cut').attr('data-width', width);
                $('#chunk-' + index + '-length').closest('.form-group').find('.extra-cut').attr('data-length', length);
                $('#chunk-' + index + '-length').closest('.form-group').find('.remove-cut').attr('data-parentid', parentId);
                $('#chunk-' + index + '-length').closest('.form-group').find('.extra-cut').attr('data-parentid', parentId);
                $('#chunk-' + index + '-length').closest('.form-group').find('.cutprice-span').css('color', '#000');
                var newCutArray = {};
                newCutArray['parent'] = parentId;
                newCutArray['cut'] = cutId;
                newCutArray['width'] = width;
                newCutArray['clength'] = length;
                newCutArray['orientation'] = $('[name="platecutting-orientation"]:checked').attr('id').replace('platecutting-orientation-', '');
                addToCutsArray(newCutArray);
                return false;
            }
        });
    }

    function findFirstEmptyOrCreateRemainder(width, length, parent, cut) {
        var index = $('form.platecutting #current_cut_id').val();
        var cutsJson = $('form.platecutting #cuts_array').val();
        var oldParent = $('#cutNow').attr('data-parentid');
        var oldCut = $('#cutNow').attr('data-cutid');
        var val = $('[name="platecutting-orientation"]:checked').attr('id');

        if (parent !== null && cut !== null) {
            var exists = $('.setCutValues[data-parentid="' + oldParent + '"][data-cutid="' + oldCut + '"]');

            if (cutsJson.includes('"parent":"' + oldParent + '","cut":"' + oldCut + '","width":' + width + ',"clength":' + length)) {
                exists.show();
            } else {
                if ($('input.form-control.remainder').first().val() === "0x0") {
                    $('input.form-control.remainder').first().val(width + 'x' + length);
                } else {
                    var htmlBlock = '<div class="form-group row remainder-row"><div class="col-sm-4 platecuts-remainder"><label for="platecuts-remainder">Restplaat (&plusmn; 5mm)</label></div>';
                    htmlBlock += '<div class="col-sm-7"><div class="input-group">';
                    htmlBlock += '<input type="text" class="form-control remainder" name="remainder[]" data-remainderid="' + parent + '" id="remainder-' + index + '" value="' + width + 'x' + length + '" readonly>';
                    htmlBlock += '<div class="input-group-append"><div class="input-group-text p-1">mm</div>';
                    htmlBlock += '<div class="input-group-text p-1"><button data-index="' + index + '" class="radius-0 radius-right extra-cut remainder-cut btn btn-success" data-remainderid="' + parent + '"><i class="fa fa-cut"></i></button></div></div></div></div>';
                    $('.remainder-row').last().after(htmlBlock);
                }
            }
        } else {
            var width = parseInt($('input[name="platecutwidth"]').attr('max'));
            var length = parseInt($('input[name="platecutlength"]').val());
            if ($('input.form-control.remainder').first().val() == 0) {
                $('input.form-control.remainder').first().val(width + 'x' + length);
            } else {
                var htmlBlock = '<div class="form-group row remainder-row"><div class="col-sm-4 platecuts-remainder"><label for="platecuts-remainder">Restplaat (&plusmn; 5mm)</label></div>';
                htmlBlock += '<div class="col-sm-7"><div class="input-group">';
                htmlBlock += '<input type="text" class="form-control remainder" name="remainder[]" id="remainder-' + index + '" value="' + width + 'x' + length + '" readonly>';
                htmlBlock += '<div class="input-group-append"><div class="input-group-text p-1">mm</div>';
                htmlBlock += '<div class="input-group-text p-1"><button data-index="' + index + '" class="radius-0 radius-right extra-cut remainder-cut btn btn-success"><i class="fa fa-cut"></i></button></div></div></div></div>';
                $('.remainder-row').last().after(htmlBlock);
            }
        }
    }

    $(document).on('change', '[name="platecutting-orientation"]', function(event) {
        event.preventDefault();
        var width = $('.platecutwidth.text').attr('data-width');
        var length = $('.platecutlength.text').attr('data-length');
        var val = $('[name="platecutting-orientation"]:checked').attr('id');

        if (val === "platecutting-orientation-landscape") {
            $('#orientation-img').attr('src', '/modules/sawandcutmodule/views/img/landscape.jpg');
            $('span.platecutlength.orientation.text').removeClass('portrait').addClass('landscape');
            $('span.platecutwidth.orientation.text').removeClass('portrait').addClass('landscape');

            $('input[name="platecutwidth"]').prop('disabled', true);
            $('input[name="platecutlength"]').prop('disabled', false);
        }
        if (val === "platecutting-orientation-portrait") {
            $('#orientation-img').attr('src', '/modules/sawandcutmodule/views/img/portrait.jpg');
            $('span.platecutlength.orientation.text').removeClass('landscape').addClass('portrait');
            $('span.platecutwidth.orientation.text').removeClass('landscape').addClass('portrait');

            $('input[name="platecutwidth"]').prop('disabled', false);
            $('input[name="platecutlength"]').prop('disabled', true);
        }
        removeCutErrors();
    });

    function getCurrentParentId(event) {
        var currentParentId = $('form.platecutting #current_parent_id').val();
        return currentParentId;
    }

    function setCurrentParentId(id) {
        $('form.platecutting #current_parent_id').val(id);
        return true;
    }

    function getCurrentCutId() {
        var currentCutId = $('form.platecutting #current_cut_id').val();
        return currentCutId;
    }

    function setCurrentCutId(event) {
        var currentCutId = $('form.platecutting #current_cut_id').val();
        var cutIdLength = currentCutId.split('.').length - 1;

        if (event !== null) {
            var newCutId = currentCutId;
            //from cutlist
            if (event.target.className.includes('setCutValues')) {
                var currentCutId = event.target.dataset.cutid + '.0';
            } else if (event.target.className.includes('remainder-cut')) {
                //console.log(['remainderCut', event]);
            } else {
                switch (cutIdLength) {
                    case 0:
                        currentCutId = parseInt(currentCutId) + 1;
                        break;
                    default:
                        var currentArray = currentCutId.split('.');
                        var decId = currentArray.pop();
                        currentArray.push(parseInt(decId) + 1);
                        currentCutId = currentArray.join('.');
                        break;
                }
            }
        }
        $('form.platecutting #current_cut_id').val(currentCutId);
        return currentCutId;
    }

    function getTotalCuts() {
        var cutsJson = $('form.platecutting #cuts_array').val();
        var length = 0;
        if (cutsJson !== "") {
            var cutsArray = JSON.parse(cutsJson);
            length = cutsArray.length
        }
        return length;
    }

    function addToCutsArray(cutArray) {
        var cutsJson = $('form.platecutting #cuts_array').val();
        if (cutsJson !== "") {
            cutsJson = JSON.parse(cutsJson);
            cutsJson.push(cutArray);
        } else {
            cutsJson = new Array();
            cutsJson.push(cutArray);
        }
        $('form.platecutting #cuts_array').val(JSON.stringify(cutsJson));
    }

    function removeFromCutsArray(cutId, parentId) {
        var cutsJson = $('form.platecutting #cuts_array').val();
        var cutsArray = JSON.parse(cutsJson);
        for (var i = cutsArray.length - 1; i >= 0; i--) {
            var prevIndex = i - 1;

            if (cutsArray[i]['cut'] === cutId) {

                $('#cutNow').attr('data-parentid', parentId);
                $('#cutNow').attr('data-cutid', cutId);
                $('form.platecutting #current_cut_id').val(cutId);

                // TODO Set new values
                if (!$('.remainder-row').is(':visible')) {
                    //not visible, add to current values
                    if (cutsArray[i]['orientation'] === 'portrait') {
                        var newWidth = parseInt(cutsArray[i]['width']) + parseInt($('input[name="platecutwidth"]').attr('max'));
                        var newLength = parseInt($('input[name="platecutlength"]').attr('max'));
                    } else {
                        var newWidth = parseInt($('input[name="platecutwidth"]').attr('max'));
                        var newLength = parseInt(cutsArray[i]['clength']) + parseInt($('input[name="platecutlength"]').attr('max'));
                    }
                    setNewCutValues(newWidth, newLength, parentId, cutId - 1);
                } else {
                    //visible add to matching parent cut id

                    console.log(['setCutValues', parentId, cutId, length, newWidth, newLength]);
                }
                cutsArray.splice(i);
                $('form.platecutting #cuts_array').val(JSON.stringify(cutsArray));
                $('.chunk[data-knippen="' + i + '"]').val('');
                $('.setCutValues[data-index="' + i + '"]').hide();
                $('.removeLastChanges[data-index="' + i + '"]').hide();
                $('.removeLastChanges[data-index="' + prevIndex + '"]').show();
                $('#chunk-' + i + '-length').closest('.form-group').find('.cutprice-span').css('color', '#ccc');
                console.log('remove cut', cutsArray);
                calculateCuts(this);
                return;
            }
        }
    }

    function setNewCutValues(width, length, parent, cut) {
        $('#cutNow').attr({
            'data-parentid': parent,
            'data-cutid': cut
        });
        $('.platecutwidth.text').attr('data-width', width);
        $('.platecutwidth.text').text(width);
        $('.platecutlength.text').attr('data-length', length);
        $('.platecutlength.text').text(length);

        $('input[name="platecutwidth"]').attr('max', width);
        $('input[name="platecutwidth"]').val(width);
        $('input[name="platecutlength"]').attr('max', length);
        $('input[name="platecutlength"]').val(length);
    }

    $(document).on('click', '#cutNow', function(event) {
        event.preventDefault();
        var currentCut = parseInt($('#cutNow').attr('data-cut'));
        $('#cutNow').attr('data-cut', currentCut + 1);
        var orientation = $('[name="platecutting-orientation"]:checked').attr('id');
        var customWidth = parseInt($('input[name="platecutwidth"]').val());
        var customLength = parseInt($('input[name="platecutlength"]').val());

        var width = parseInt($('input[name="platecutwidth"]').attr('max'));
        var length = parseInt($('input[name="platecutlength"]').attr('max'));
        var minCutSize = parseInt($('input[name="platecutwidth"]').attr('data-mincutsize'));

        if (isNaN(customLength)) customLength = 0;
        if (getTotalCuts() < 7) {

            if (orientation == 'platecutting-orientation-portrait') {
                if (customWidth < minCutSize) {
                    var messages = [];
                    messages[0] = [];
                    messages[0]['field'] = 'platecutwidth';
                    messages[0]['message'] = "De minimale knipmaat is " + minCutSize + " mm";
                    showCutErrors('.platecutting', messages);
                } else {
                    if (customWidth <= width) {
                        if (customWidth === width) {
                            var messages = [];
                            messages[0] = [];
                            messages[0]['field'] = 'platecutwidth';
                            messages[0]['message'] = "Uw knipmaat is even groot als de plaat zelf, knippen is niet nodig voor " + width + " mm";
                            showCutErrors('.platecutting', messages);
                        } else {
                            if ((width - customWidth) < minCutSize) {
                                var messages = [];
                                messages[0] = [];
                                messages[0]['field'] = 'platecutwidth';
                                messages[0]['message'] = "Uw restplaat is kleiner dan de minimale knipmaat van " + minCutSize + " mm";
                                showCutErrors('.platecutting', messages);
                            } else {
                                findFirstEmptyChunk(customWidth, length);
                                setCurrentCutId(event);
                                var newWidth = width - customWidth;
                                setNewCutValues(newWidth, length);
                                removeCutErrors();
                            }
                        }
                    } else {
                        var messages = [];
                        messages[0] = [];
                        messages[0]['field'] = 'platecutwidth';
                        messages[0]['message'] = "Maximale lengte overschreden,  maximale length is " + width + " mm";
                        showCutErrors('.platecutting', messages);
                    }
                }
                $('input[name="platecutwidth"]').select();
            } else {
                if (customLength < minCutSize) {
                    var messages = [];
                    messages[0] = [];
                    messages[0]['field'] = 'platecutlength';
                    messages[0]['message'] = "De minimale knipmaat is " + minCutSize + " mm";
                    showCutErrors('.platecutting', messages);
                } else {
                    if (customLength <= length) {
                        if (customLength === length) {
                            var messages = [];
                            messages[0] = [];
                            messages[0]['field'] = 'platecutlength';
                            messages[0]['message'] = "Uw knipmaat is even groot als de plaat zelf, knippen is niet nodig voor " + length + " mm";
                            showCutErrors('.platecutting', messages);
                        } else {
                            if ((length - customLength) < minCutSize) {
                                var messages = [];
                                messages[0] = [];
                                messages[0]['field'] = 'platecutlength';
                                messages[0]['message'] = "Uw restplaat is kleiner dan de minimale knipmaat van " + minCutSize + " mm";
                                showCutErrors('.platecutting', messages);
                            } else {
                                findFirstEmptyChunk(width, customLength);
                                setCurrentCutId(event);
                                var newLength = length - customLength;
                                setNewCutValues(width, newLength);
                                removeCutErrors();
                            }
                        }
                    } else {
                        var messages = [];
                        messages[0] = [];
                        messages[0]['field'] = 'platecutlength';
                        messages[0]['message'] = "Maximale lengte overschreden,  maximale length is " + length + " mm";
                        showCutErrors('.platecutting', messages);
                    }
                }
                $('input[name="platecutlength"]').select();
            }
            calculateCuts(this);
        } else {
            var messages = [];
            messages[0] = [];
            messages[0]['field'] = 'platecutwidth';
            messages[0]['message'] = "U heeft het maximaal aantal knippen bereikt, wilt u meer knippen vraag dan om een offerte.";
            showCutErrors('.platecutting', messages);
        }
    });

    $(document).on('click', '.remainder-cut', function(event) {
        event.preventDefault();
        var remainderValue = $(this).siblings('input.remainder').val();
        var remainder = remainderValue.split('x');
        $(this).parents('.form-group.remainder-row').remove();

        var width = parseInt($('input[name="platecutwidth"]').attr('max'));
        var length = parseInt($('input[name="platecutlength"]').attr('max'));

        if (parseInt(remainder[0]) > parseInt(remainder[1])) {
            var newWidth = parseInt(remainder[1]);
            var newLength = parseInt(remainder[0]);
        } else {
            var newWidth = parseInt(remainder[0]);
            var newLength = parseInt(remainder[1]);
        }

        if (!$('.remainder-row').is(':visible')) {
            $('.remainder-row').show();
        }
        findFirstEmptyOrCreateRemainder(width, length);
        setCurrentCutId(event);
        setNewCutValues(newWidth, newLength);
    });

    $(document).on('click', '.setCutValues', function(event) {
        event.preventDefault();
        $(this).siblings('.removeLastChanges').hide();
        $(this).hide();

        var orientation = $('[name="platecutting-orientation"]:checked').attr('id');

        var width = parseInt($('input[name="platecutwidth"]').attr('max'));
        var length = parseInt($('input[name="platecutlength"]').attr('max'));
        var newWidth = parseInt($(this).attr('data-width'));
        var newLength = parseInt($(this).attr('data-length'));
        var newParentId = $(this).attr('data-cutid');
        var oldParentId = $(this).attr('data-parentid');



        if (!$('.remainder-row').is(':visible')) {
            $('.remainder-row').show();
        }

        findFirstEmptyOrCreateRemainder(width, length, oldParentId, newParentId);
        setCurrentParentId(newParentId);
        setCurrentCutId(event);
        setNewCutValues(newWidth, newLength, oldParentId, newParentId);
    });

    $(document).on('click', '.removeLastChanges', function(event) {
        event.preventDefault();
        var cutId = $(this).attr('data-cutid');
        var parentId = $(this).attr('data-parentid');

        removeFromCutsArray(cutId, parentId);
    });

    function showCutErrors(form, messages) {
        if (messages && messages.length > 0) {
            messages.forEach(function(message) {
                if (message.field) {
                    formgroup = $(form).find('[name="' + message.field + '"]').closest('.form-group');
                    $(formgroup).addClass('has-error');
                    $('.' + message.field + '.error-message').html('<span>' + message.message + ' </span>');
                }
            });
            // $('form.platecutting button').prop('disabled', true);
        }
    }

    function removeCutErrors() {
        $('.error-message').html('');
        $('.form-group.has-error').removeClass('has-error');
        $('form.platecutting button').prop('disabled', false);
    }

    function calculateCuts() {
        var cutsArray = [];
        var remainderArray = [];

        console.log($('form.platecutting #cuts_array').val());
        var cutsArray = JSON.parse($('form.platecutting #cuts_array').val());
        $('.row.remainder-row').each(function(remainderIndex, el) {
            var size = $(this).find('input.remainder').val();
            if (size !== '0x0') {
                remainderArray.push(size);
            }
        });
        remainderArray.push($('input.platecutwidth').first().val() + 'x' + $('input.platecutlength').first().val());
        var quantity = $('form.platecutting input#quantity').val();
        var product_id = $('form.platecutting input#product-id').val();
        var data = {
            'product_id': product_id,
            'quantity': quantity,
            'cuts': cutsArray,
            'remainder': remainderArray,
        }

        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=calculatecutted&data=' + JSON.stringify(data) + '&ajax=true',
            dataType: "json",
            success: function(json) {
                //console.log(json);
                removeCutErrors();
                //Display any messages
                if (json.messages && json.messages.length > 0) {
                    showCutErrors(form, json.messages);
                }

                $('#product_price span').html(renderMoneyString(json.price));
                $('#product_price_pre input').val(json.product_price);
                $('#product_price_pre span').html(renderMoneyString(json.product_price));
                $('#total_product_price_excl span').html(renderMoneyString(json.product_price));
                $('#total_product_price_incl span').html(renderMoneyString(json.product_price_incl));

                $('#subtotal_incl_pre input').val(json.subtotal_incl);
                $('#subtotal_incl_pre span').html(renderMoneyString(json.subtotal_incl));

                if (json.product_reduction > 0) {
                    $('#cut_discount_price span').html(renderMoneyString('-' + json.product_reduction));
                    $('#tr_cut_discount_price').show();
                } else {
                    $('#cut_discount_price span').html(renderMoneyString('-' + json.product_reduction));
                    $('#tr_cut_discount_price').hide();
                }

                $('form.platecutting').find('#total_tax').html(renderMoneyString(json.product_tax));
                $('form.platecutting').find('#subtotal_incl').html(renderMoneyString(json.subtotal_incl));
                $('form.platecutting').find('#subtotal_excl').html(renderMoneyString(json.subtotal_excl));
                $('form.platecutting').find('#cut_price').html(renderMoneyString(json.cut_price));
                $('form.platecutting').find('#plate-check').val(json.order_description);

                var orderArray = json.order_description.split('|');
                var orderList = '';

                for (var i = 0; i < orderArray.length; i++) {
                    orderList += '<li>- ' + orderArray[i].replace('x', ' x ');
                    if (orderArray.length - 1 != i) {
                        orderList += ' mm</li>';
                    } else {
                        orderList += '</li>';
                    }
                }
                $('form.platecutting').find('ul.plate-check').html('').append(orderList);
            },
            error: function(json) {
                console.log('Error occured during validation, pleae contact administrator.');
            }
        });
    }
    $(document).on('change', 'form.platecutting #quantity', function(event) {
        event.preventDefault();
        calculateCuts();
    });

    $(document).on('click', '#cut-modal button.platecuttingAddToCart', function(e) {
        var cutsArray = [];
        var remainderArray = [];
        console.log($('form.platecutting #cuts_array'));
        var cutsArray = JSON.parse($('form.platecutting #cuts_array').val());
        $('.row.remainder-row').each(function(remainderIndex, el) {
            var size = $(this).find('input.remainder').val();
            if (size !== '0x0') {
                remainderArray.push(size);
            }
        });
        remainderArray.push($('input.platecutwidth').first().val() + 'x' + $('input.platecutlength').first().val());

        var quantity = $('form.platecutting input#quantity').val();
        var product_id = $('form.platecutting input#product-id').val();
        var data = {
            'product_id': product_id,
            'quantity': quantity,
            'cuts': cutsArray,
            'remainder': remainderArray,
        }

        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=addcuttedtocart&data=' + JSON.stringify(data) + '&ajax=true',
            dataType: "json",
            success: function(json) {
                //Display any messages
                if (json.messages && json.messages.length > 0) {
                    cutModule.clearErrors(form);
                    cutModule.showErrors(form, json.messages);
                    cutModule.updateValues(form, json);
                } else {
                    prestashop.emit('updateCart', {
                        reason: json
                    });

                    // $('#cut-modal').modal('hide');
                    product = $('a[data-id-product="' + json.id_product + '"]');
                    product.tooltip('show');
                    setTimeout(function() {
                        product.tooltip('hide');
                    }, 7000);
                }
            }
        });
    });
    $(document).on('click', 'button.cut-button', function(e) {
        $('#cut-modal').html('<div id="spinner"><span class="icon icon-cog icon-spin"></span></div>');
        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=getcutmodal&product=' + $(this).data('product-id') + '&ajax=true',
            success: function(html) {
                $('#cut-modal').html(html);
                // $('#cut-modal').modal('show');
            }
        });
    });
    // $(document).on('click', '#cut-modal [data-dismiss="modal"]', function() {
    //     $('#cut-modal').modal('hide');
    // });

    //Staffel form
    $(document).on('click', 'button.staffel-button', function(e) {
        $('#staffel-modal').html('<div id="spinner"><span class="icon icon-cog icon-spin"></span></div>');
        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=getstaffelmodal&product=' + $(this).data('product-id') + '&ajax=true',
            success: function(html) {
                $('#staffel-modal').html(html);
                // $('#staffel-modal').modal('show');
            }
        });
    });
    // $(document).on('click', '#staffel-modal [data-dismiss="modal"]', function() {
    //     $('#staffel-modal').modal('hide');
    // });

    $(document).on('change', 'form.staffelform #quantity', function(event) {
        event.preventDefault();
        calculateStaffel();
    });

    function calculateStaffel() {
        var quantity = $('form.staffelform input#quantity').val();
        var product_id = $('form.staffelform input#product-id').val();
        var data = {
            'product_id': product_id,
            'quantity': quantity
        };

        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=calculatestaffel&data=' + JSON.stringify(data) + '&ajax=true',
            dataType: "json",
            success: function(json) {
                $('#price_excl_no_addition span').html(renderMoneyString(json.product_price_incl));
                $('#price_excl_no_addition input').val(json.product_price_incl);
                $('#staffel_discount_price span.subtotal-inc-price').html(renderMoneyString(json.total_reduction));
                $('#total_price_excl span.subtotal-inc-price').html(renderMoneyString(json.subtotal_excl));
                $('#total_price_incl span.subtotal-inc-price').html(renderMoneyString(json.subtotal_incl));
            },
            error: function(json) {
                console.log('Error occured during validation, pleae contact administrator.');
            }
        });
    }

        $('#staffel-modal').on('click', 'button.addToCart', function(e) {
        productId = $(this).closest('form').find('input.product-id').val();
        form = $(this).closest('form');

        var quantity = $('form.staffelform input#quantity').val();
        var product_id = $('form.staffelform input#product-id').val();
        var data = {
            'product_id': product_id,
            'quantity': quantity
        }


        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=addstaffeltocart&data=' + JSON.stringify(data) + '&ajax=true',
            dataType: "json",
            success: function(json) {
                
                    prestashop.emit('updateCart', {
                        reason: json
                    });

                    $('#staffel-modal').modal('hide');
                    product = $('a[data-id-product="' + json.id_product + '"]');
                    product.tooltip('show');
                    setTimeout(function() {
                        product.tooltip('hide');
                    }, 7000);
            }
        });
    });
    //end staffelform
});

$(document).ready(function() {
    // Saw Modal specific
    $('#saw-modal').on('click', 'button.addToCart', function(e) {
        productId = $(this).closest('form').find('input.product-id').val();
        form = $(this).closest('form');
        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=addtocart&' + $(this).parents('form.sawform').serialize() + '&ajax=true',
            dataType: "json",
            success: function(json) {
                //Display any messages
                if (json.messages && json.messages.length > 0) {
                    sawModule.clearErrors(form);
                    sawModule.showErrors(form, json.messages);
                    sawModule.updateValues(form, json);
                } else {
                    prestashop.emit('updateCart', {
                        reason: json
                    });

                    $('#saw-modal').modal('hide');
                    product = $('a[data-id-product="' + json.id_product + '"]');
                    product.tooltip('show');
                    setTimeout(function() {
                        product.tooltip('hide');
                    }, 7000);
                }
            }
        });
    });

    $('button.saw-button').on('click', function(e) {
        $('#saw-modal').html('<div id="spinner"><span class="icon icon-cog icon-spin"></span></div>');
        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=getmodal&product=' + $(this).data('product-id') + '&ajax=true',
            success: function(html) {
                $('#saw-modal').html(html);
               // $('#saw-modal').modal('show');
            }
        });
    });

    var inputChangeDelay;
    $('#saw-modal').on('keyup', 'input[type=number]', function(e) {
        elem = $(this);
        clearTimeout(inputChangeDelay);
        inputChangeDelay = setTimeout(function() {
            sawModule.validateValues(elem);
        }, 1000);
    });
    $('#saw-modal').on('blur', 'input[type=number]', function(e) {
        clearTimeout(inputChangeDelay);
        sawModule.validateValues(this);
        clearTimeout(inputChangeDelay);
    });

    //Fix for bootstrap 3.0 modals. Can't dismiss modal more than once.
    // $('#saw-modal').on('click', '[data-dismiss="modal"]', function() {
    //     $('#saw-modal').modal('hide');
    // });

    var sawModule = {
        validateValues: function(elem) {
            var valueArray = [];
            $('input.chunk[type=number]').each(function(index, el) {
                if (parseInt(el.value) > 0) {
                    valueArray.push(el.value);
                } else {
                    valueArray.push(null);
                    $(el).parents('.form-group').children('.input-price').removeClass('chosen');
                }
            });

            valueArray.sort(function(a, b) {
                return b - a;
            });
            $('input.chunk[type=number]').each(function(index, el) {
                el.value = valueArray[index];
                if (valueArray[index] > 0) {
                    $(el).parents('.form-group').children('.input-price').addClass('chosen');
                }
            });

            form = $(elem).parents('form.sawform');
            $.ajax({
                url: url,
                type: 'GET',
                data: 'method=calculate&' + form.serialize() + '&ajax=true',
                dataType: "json",
                success: function(json) {
                    // //console.log(json);
                    sawModule.clearErrors(form);
                    //Display any messages
                    if (json.messages && json.messages.length > 0) {
                        sawModule.showErrors(form, json.messages);
                    }
                    sawModule.updateValues(form, json);
                },
                error: function(json) {
                    //console.log('Error occured during validation, pleae contact administrator.');
                }
            });
        },
        clearErrors: function(form) {
            //Clear all previous messages (if present)
            $(form).find('.message-container').html('');
            $(form).find('.form-group').each(function() {
                $(this).removeClass('form-error');
                $(this).find('.error-message').html('');
            })
        },
        showErrors: function(form, messages) {
            //Display any messages
            if (messages && messages.length > 0) {
                messages.forEach(function(message) {
                    if (message.field) {
                        formgroup = $(form).find('#' + message.field).closest('.form-group');
                        $(formgroup).addClass('form-error');
                        $(formgroup).find('.error-message').append('<span>' + message.message + ' </span>');
                    } else {
                        $(form).find('.message-container').append('<div class="alert alert-warning alert-dismissible" role="alert">' + message.message + '</div>');
                    }
                });
            }
        },
        updateValues: function(form, json) {
            $('#product_price span').html(renderMoneyString(json.price));
            $('#product_price_pre input').val(json.product_price);
            $('#product_price_pre span.subtotal-inc-price').html(renderMoneyString(json.product_price));
            $('#total_product_price_excl span.subtotal-inc-price').html(renderMoneyString(json.product_price));
            $('#total_product_price_incl span.subtotal-inc-price').html(renderMoneyString(json.product_price_incl));

            $('#subtotal_incl_pre input').val(json.subtotal_incl);
            $('#subtotal_incl_pre span.subtotal-inc-price').html(renderMoneyString(json.subtotal_incl));

            if (json.product_reduction > 0) {
                $('#saw_discount_price span.subtotal-inc-price').html(renderMoneyString('-' + json.product_reduction));
                $('#tr_saw_discount_price').show();
            } else {
                $('#saw_discount_price span.subtotal-inc-price').html(renderMoneyString('-' + json.product_reduction));
                $('#tr_saw_discount_price').hide();
            }

            $(form).find('#total_tax').html(renderMoneyString(json.product_tax));

            $(form).find('#subtotal_incl').html(renderMoneyString(json.subtotal_incl));
            $(form).find('#subtotal_excl').html(renderMoneyString(json.subtotal_excl));

            $(form).find('#remainder').val(json.remainder);

            $(form).find('#saw_price').html(renderMoneyString(json.saw_price));
            $(form).find('#saw-check').val($("<div>").html(json.order_description).text());
            $(form).find('#saw-loss').text(json.loss);
        }
    };
});
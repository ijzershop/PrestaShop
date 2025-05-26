/**
* NOTICE OF LICENSE
*
* All right is reserved,
* Please go through LICENSE.txt file inside our module
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade this module to newer
* versions in the future. If you wish to customize this module for your
* needs please refer to CustomizationPolicy.txt file inside our module for more information.
*
* @author Webkul IN
* @copyright since 2010 Webkul
* @license LICENSE.txt
*/

var realGenerated = 0;
var increamentPercent = 0;
var toGenerated = 0;
var processedImageCount = 0;
var selectedImageCount = 0;


$(document).ready(function () {
      toggleFormGroups();
      $(document).on("change", 'input[name="WK_WEBP_ENABLE_MODULE"]', function () {
        toggleFormGroups();
      });

    var deleteSuccessShown = false

    function deleteProductImages(progressBar, newProgWidth, convPr)
    {
        $.ajax({
            url: webPconfig,
            type: 'POST',
            cache: false,
            asyn: true,
            data: {
                current: convPr,
                productTypeDel: 1,
                status: status,
                ajax: true,
                action: 'ConvertProductImage',
            },
        beforeSend: function(){
            progressBar = convPr;
        },
        success: function(data) {
                $('#webPProgress').css('background-color', '#ff4c4c');
                pr = convPr--;
                if (pr < progressBar) {
                    $('#product_imagesBadge').addClass('badge badge-warning');
                }
                if (pr == progressBar) {
                    $('#product_imagesBadge').removeClass('badge badge-warning');
                    $('#product_imagesBadge').addClass('badge badge-success');
                }
                if (pr == 0) {
                    $('#product_imagesBadge').removeClass('badge badge-success');
                    $('#product_imagesBadge').addClass('badge badge-danger');
                }
                if (pr >= 0) {
                    $('#product_imagesNumber').text(pr);
                }
                var totalConverted = getConvertedTotal();
                $('#all_imagesNumber').text(totalConverted);
                if ($('#all_imagesNumber').text() < totalImages) {
                    $('#all_imagesBadge').removeClass('badge badge-danger');
                    $('#all_imagesBadge').addClass('badge badge-warning');
                }
                if ($('#all_imagesNumber').text() == 0) {
                    $('#all_imagesBadge').removeClass('badge badge-warning');
                    $('#all_imagesBadge').removeClass('badge badge-success');
                    $('#all_imagesBadge').addClass('badge badge-danger');
                }
                newProgWidth += (100/progressBar);
                width = Math.round(newProgWidth*2)/2;
                if (newProgWidth > 100 || width > 100) {
                    newProgWidth = 100;
                    width = 100;
                    if (!deleteSuccessShown) {
                        $.growl.notice({
                            title: '',
                            size: 'large',
                            message: wkDeleteMessage,
                        })
                        deleteSuccessShown = true;
                    }
                    setTimeout(window.location.reload(), 1000);
                }
                $('#webPProgress').css('width', newProgWidth+'%');
                var imageToDelete = checkDeleteProcess(imageToDelete);
                if (pr != 0) {
                    deleteProductImages(progressBar, newProgWidth, convPr)
                }
        }
        });
    }

    function getConvertedTotal()
    {
        return (parseInt($('#ps_slider_imagesNumber').text())
            + parseInt($('#cms_imagesNumber').text())
            + parseInt($('#carrier_imagesNumber').text())
            + parseInt($('#cat_imagesNumber').text())
            + parseInt($('#store_imagesNumber').text())
            + parseInt($('#product_imagesNumber').text())
            + parseInt($('#sup_imagesNumber').text())
            + parseInt($('#manu_imagesNumber').text()));
    }
    function isJSONString(str) {
        if (typeof str !== 'string') {
          return false;
        }

        try {
          JSON.parse(str);
          return true;
        } catch (e) {
          return false;
        }
      }

    function generatedPaginatedProcess(limit, totalIteration, currentIteration, newProgWidth, returnStatus)
    {
        var newProgWidth = 0;

        if (currentIteration <= totalIteration) {
            $.ajax({
                url: webPconfig,
                type: 'POST',
                cache: false,
                async: true,
                data: {
                    limit: limit,
                    totalIteration: totalIteration,
                    currentIteration: currentIteration,
                    ajax: true,
                    action: 'convertOnlyProductImage',
                    regenerate: $('#regenerate').is(':checked') ? 1 : 0,
                },
                success: function(data) {
                    if(isJSONString(data)) {
                        resp = JSON.parse(data);
                        if (resp.success) {
                            currentIteration += 1;
                            $('#product_imagesNumber').val(resp.totalConverted).text(resp.totalConverted)
                            $('#all_imagesNumber').val($('#all_imagesNumber').val() + resp.currentConverted)
                            // updateProgressBar(resp.currentConverted);
                            checkGenerateProcess(resp.currentConverted)
                            generatedPaginatedProcess(limit, totalIteration, currentIteration, newProgWidth, returnStatus);
                        } else {
                            return $.growl.warning({
                                title: "",
                                size: "large",
                                message: already_generated_product
                            });
                        }
                    } else {
                        return $.growl.error({
                            title: "",
                            size: "large",
                            message: need_to_refresh
                        });
                    }
                },
            });
        } else {
            returnStatus(true);
        }
    }



    function getValuesForProgress()
    {
        var checked = 0;
        var todivide = 0;
        $.each($("input[name='convertImage']:checked"), function(){
            if ($(this).val() == 'store_images') {
                if ($('#regenerate').is(':checked')) {
                    todivide += totalStore;
                } else {
                    todivide += totalRemainStore;
                }
            }
            if ($(this).val() == 'sup_images') {
                if ($('#regenerate').is(':checked')) {
                    todivide += totalSup;
                } else {
                    todivide += totalRemainSupplier;
                }
            }
            if ($(this).val() == 'manu_images') {
                if ($('#regenerate').is(':checked')) {
                    todivide += totalManu;
                } else {
                    todivide += totalRemainManufacturer;
                }
            }
            if ($(this).val() == 'cat_images') {
                if ($('#regenerate').is(':checked')) {
                    todivide += totalCat;
                } else {
                    todivide += totalRemainCat;
                }
            }
            if ($(this).val() == 'ps_slider_images') {
                if ($('#regenerate').is(':checked')) {
                    todivide += totalPsSlider;
                } else {
                    todivide += remainPsSliderCount;
                }
            }
            if ($(this).val() == 'carrier_images') {
                if ($('#regenerate').is(':checked')) {
                    todivide += totalCarrier;
                } else {
                    todivide += remainCarrier;
                }
            }
            if ($(this).val() == 'cms_images') {
                if ($('#regenerate').is(':checked')) {
                    todivide += totalCms;
                } else {
                    todivide += remainCmsCount;
                }
            }
            if ($(this).val() == 'product_images') {
                // if ($('#regenerate').is(':checked')) {
                //     imageData = JSON.parse(imageDetail);
                // } else {
                //     imageData = JSON.parse(remainingProductImages);
                // }

                // var allproductsimages = wkDataToGroup(imageData, 1);
                // todivide += allproductsimages.length;
                // todivide += JSON.parse(imageDetail).length;
            }
        });
        var breakIntoParts = (total, divide) => Array.from({length: divide}, (_,i) => i < total%divide ? ~~(total/divide)+1 : ~~(total/divide));
        euqalParts = breakIntoParts(100, todivide);
        var eql = [];
        eql = euqalParts;
        var newProgressParam = displayLoading(1, todivide);
        var initial = parseFloat(newWidth);
        return {todivide, newWidth, newProgressParam, initial, eql}
    }

    function updateProgressBar(data)
    {
        values = getValuesForProgress()
        var totalConverted = getConvertedTotal();
        var convImages = parseInt($('#all_imagesNumber').text());
        if (convImages == 0) {
            $('input[name=WK_WEBP_REMAINING]').closest('.form-group').hide();
            $('#deleteImagesBtn').hide();
            $('#configuration_form_submit_btn').hide();
        }
        if (convImages > 0) {
            $('#deleteImagesBtn').show();
            $('#configuration_form_submit_btn').show();
        }

        var wid = ++values.newProgWidth;
        initial = values.initial;
        initial += parseFloat(values.newProgressParam);
        initial += parseFloat($('#webPProgress').attr('data-width'))
        if (initial > 100) {
            initial = 100;
        }
        // eql.shift();

        // $('#webPProgress').css('width', initial+'%');
        // $('#webPProgress').attr('data-width', initial);
        var n = parseInt(data);

        prod = parseInt($('#product_imagesNumber').text());
        if ($('#regenerate').is(':checked')) {
            if ($('#product_imagesTotal').attr('value') == $('#product_imagesNumber').text()) {
                prod = 0;
            } else {
                prod = parseInt($('#product_imagesNumber').text());
            }
        } else {
            prod = parseInt($('#product_imagesNumber').text());
        }

        prod += n;

        $('#product_imagesNumber').text(prod);
        if (prod < $('#product_imagesTotal').attr('value')) {
            $('#product_imagesBadge').removeClass('badge badge-danger');
            $('#product_imagesBadge').removeClass('badge badge-success');
            $('#product_imagesBadge').addClass('badge badge-warning');
        }

        if (prod == $('#product_imagesTotal').attr('value')) {
            $('#product_imagesBadge').removeClass('badge badge-warning');
            $('#product_imagesBadge').addClass('badge badge-success');
        }

        $('#webPProgress').css('background-color', '#4cbb6c');
        $('#all_imagesNumber').text(getConvertedTotal());
        if ($('#all_imagesNumber').text() < totalImages) {
            $('#all_imagesBadge').removeClass('badge badge-danger');
            $('#all_imagesBadge').removeClass('badge badge-success');
            $('#all_imagesBadge').addClass('badge badge-warning');
        }
        if ($('#all_imagesNumber').text() == totalImages) {
            $('#all_imagesBadge').removeClass('badge badge-warning');
            $('#all_imagesBadge').addClass('badge badge-success');
        }
    }

    setTimeout(() => {
        $('.webpcron').parent().removeClass('col-lg-8 col-lg-offset-3').addClass('col-lg-12')
    })
    $('#convertImagesBtn').removeClass('btn-default').addClass('btn-info').css('margin-right', '10px');
    if ($('input[name=WK_WEBP_REMAINING]')) {
        $('input[name=WK_WEBP_REMAINING]').closest('.form-group').hide();
    }

    $(".image_box").on('click', function() {
        if ($(".image_box").length == $(".image_box:checked").length)
        {
            $('#all_images').prop('checked', 'checked')
        } else {
            $('#all_images').removeAttr('checked')
        }
    })

    $('#WK_WEBP_REMAINING_on').attr('checked', 'checked');
    if (typeof(WK_WEBP_JPEG_SPECIFIC) == 'undefined' || WK_WEBP_JPEG_SPECIFIC != 1) {
        $('input[name=WK_WEBP_JPEG_SPECIFIC]').closest('.form-group').nextAll('.form-group').slice(0, 4).hide();
    }
    if (typeof(WK_WEBP_PNG_SPECIFIC) == 'undefined'|| WK_WEBP_PNG_SPECIFIC != 1) {
        $('input[name=WK_WEBP_PNG_SPECIFIC]').closest('.form-group').nextAll('.form-group').slice(0, 4).hide();
    }
    $('input[name=WK_WEBP_PNG_SPECIFIC]').on('change', function(){
        if ($(this).val() == 0) {
            $('input[name=WK_WEBP_PNG_SPECIFIC]').closest('.form-group').nextAll('.form-group').slice(0, 4).hide(200);
        } else {
            $('input[name=WK_WEBP_PNG_SPECIFIC]').closest('.form-group').nextAll('.form-group').slice(0, 4).show(200);
        }

    });
    if (parseInt($('#sup_imagesTotal').attr('value')) == 0) {
        $('#sup_images').attr('disabled', 'disabled');
    }
    if (parseInt($('#product_imagesTotal').attr('value')) == 0) {
        $('#product_images').attr('disabled', 'disabled');
    }
    if (parseInt($('#cat_images').attr('value')) == 0) {
        $('#sup_images').attr('disabled', 'disabled');
    }
    if (parseInt($('#manu_imagesTotal').attr('value')) == 0) {
        $('#manu_images').attr('disabled', 'disabled');
    }
    if (parseInt($('#store_imagesTotal').attr('value')) == 0) {
        $('#store_images').attr('disabled', 'disabled');
    }
    if (parseInt($('#ps_slider_imagesTotal').attr('value')) == 0) {
        $('#ps_slider_images').attr('disabled', 'disabled');
    }
    if (parseInt($('#carrier_imagesTotal').attr('value')) == 0) {
        $('#carrier_images').attr('disabled', 'disabled');
    }
    if (parseInt($('#cms_imagesTotal').attr('value')) == 0) {
        $('#cms_images').attr('disabled', 'disabled');
    }
    $('input[name=WK_WEBP_JPEG_SPECIFIC]').on('change', function(){
        if ($(this).val() == 0) {
            $('input[name=WK_WEBP_JPEG_SPECIFIC]').closest('.form-group').nextAll('.form-group').slice(0, 4).hide(200);
        } else {
            $('input[name=WK_WEBP_JPEG_SPECIFIC]').closest('.form-group').nextAll('.form-group').slice(0, 4).show(200);
        }

    });
    //remaining image conversion
    var convertedImages = parseInt($('#all_imagesNumber').attr('value'));
    var totalImages = parseInt($('#all_imagesTotal').attr('value'));
    if (convertedImages <= 0) {
        $('input[name=WK_WEBP_REMAINING]').closest('.form-group').hide();
        $('#deleteImagesBtn').hide();
        // $('#configuration_form_submit_btn').hide();
    }
    if (convertedImages > 0) {
        $('#deleteImagesBtn').show();
        $('#configuration_form_submit_btn').show();
        $('.panel-heading .alert-danger').hide();
    }
    if (convertedImages < totalImages) {
        var existing = 1;
        $('input[name=WK_WEBP_REMAINING]').on('change', function(){
            if ($(this).val() == 1) {
                existing = 1;
            }
            if ($(this).val() == 0) {
                existing = 0;
            }
        });
    } else {
        $('input[name=WK_WEBP_REMAINING]').closest('.form-group').hide();
    }
    //image generation
    var euqalParts = [];
    var newWidth = 0;
    $('#convertImagesBtn').click(function(e){
        realGenerated = getTotalImagesData().total;
        increamentPercent = parseFloat(100 / realGenerated);
        increamentPercent = Math.round(increamentPercent * 100) / 100
        if (!getTotalImagesData().checked) {
            $.growl.warning({
                title: "",
                size: "large",
                message: selectImages
            });
            return false;
        }
        if (getTotalImagesData().total <= 0) {
            $.growl.warning({
                title: "",
                size: "large",
                message: all_already_generated
            });
            return false;
        }

        $('#webPProgress').css('width', '0%');
        $('#webPProgress').attr('data-width', 0);
        e.preventDefault();
        if (typeof(BinaryAvailable) == 'undefined' || !BinaryAvailable) {
            $.growl.error({
                title: "",
                size: "large",
                message: binaryUploadError
            });
            return false;
        }

        let progressParams = getValuesForProgress();
        todivide = progressParams.todivide;
        newWidth = progressParams.newWidth;
        newProgressParam = progressParams.newProgressParam;
        initial = progressParams.initial;
        eql = progressParams.eql;

        let productGen = false;
        let catGen = false;
        let storeGen = false;
        let cmsGen = false;
        let suppGen = false;
        let manufGen = false;
        let sliderGen = false;
        let carrierGen = false;
        $.each($("input[name='convertImage']:checked"), function(){
            checked = 1;
            $('.progress').css('display', 'block');
            if ($(this).val() == 'product_images' && !$(this).is(':disabled')) {
                productGen = true;
            }

            if ($(this).val() == 'cms_images' && !$(this).is(':disabled')) {
                cmsGen = true;
            }

            if ($(this).val() == 'carrier_images' && !$(this).is(':disabled')) {
                carrierGen = true;
            }
            if ($(this).val() == 'ps_slider_images' && !$(this).is(':disabled')) {
                sliderGen = true;
            }

            if ($(this).val() == 'store_images' && !$(this).is(':disabled')) {
                storeGen = true;
            }
            if ($(this).val() == 'sup_images' && !$(this).is(':disabled')) {
                suppGen = true;
            }
            if ($(this).val() == 'manu_images' && !$(this).is(':disabled')) {
                manufGen = true;
            }
            if ($(this).val() == 'cat_images' && !$(this).is(':disabled')) {
                catGen = true;
            }
        });

        if (productGen) {
            generateProductImage(() => {
                if (catGen) {
                    convCat = 0;
                    var newProgWidth = 0;
                    var newProgWidth = 0;
                    if ($('#regenerate').is(':checked')) {
                        allCategoryDetail = JSON.parse(allCategory);
                        regenerate = true;
                    } else {
                        regenerate = false;
                        allCategoryDetail = JSON.parse(remainCat);
                        if (allCategoryDetail.length == 0) {
                            $('.progress').css('display', 'none');
                            setTimeout(() => {
                                location.reload();
                            }, 1500);
                            return $.growl.warning({title: '', message: already_generated_category});
                        }
                    }

                    var cat = parseInt($('#cat_imagesNumber').text());

                    for  (var i = 0; i < allCategoryDetail.length; i++) {
                        catIndex = i;
                        generateCategoryImage(allCategoryDetail, newProgressParam, newProgWidth, totalCat, totalImages, i, initial, eql, cat, catIndex);
                    }
                }

                if (storeGen) {
                    convSt = 0;
                    var newProgWidth = 0;
                    storesData = JSON.parse(stores);
                    if ($('#regenerate').is(':checked')) {
                        storesData = JSON.parse(stores);
                        regenerate = true;
                    } else {
                        regenerate = false;
                        storesData = JSON.parse(remainStore);
                        if (storesData.length == 0) {
                            return $.growl.warning({title: '', message: already_generated_store});
                        }
                    }

                    // $('#all_imagesNumber').text(parseInt($('#all_imagesNumber').text() - storesData.length));
                    // if (existing == 1) {
                    //     var str = parseInt($('#store_imagesNumber').text());
                    //     var progressBar = totalStore - str;
                    // } else {
                    //     var str = 0;
                    //     var progressBar = totalStore;
                    // }

                    for (var i = 0; i < storesData.length; i++) {
                        storeIndex = i;
                        generateStoreImage(storesData, newProgressParam, newProgWidth, totalStore, totalImages, i, initial, eql, str, storeIndex)
                    }
                }

                if (suppGen) {
                    convSu = 0;
                    supplierData = JSON.parse(supplier);
                    var newProgWidth = 0;
                    if ($('#regenerate').is(':checked')) {
                        supplierData = JSON.parse(supplier);
                        regenerate = true;
                    } else {
                        regenerate = false;
                        supplierData = JSON.parse(remainSupplier);
                        if (supplierData.length == 0) {
                            return $.growl.warning({title: '', message: already_generated_supplier});
                        }
                    }
                    var sup = parseInt($('#sup_imagesNumber').text());

                    for  (var i = 0; i < supplierData.length; i++) {
                        supIndex = i
                        generateSupplierImage(
                            supplierData,
                            newProgWidth,
                            newProgressParam,
                            initial,
                            totalSup,
                            totalImages,
                            i,
                            eql,
                            sup,
                            supIndex
                        );
                    }
                }

                if (manufGen) {
                    convManu = 0;
                    var newProgWidth = 0;
                    var newProgWidth = 0;
                    manufactureListData = JSON.parse(manufactureList);

                    if ($('#regenerate').is(':checked')) {
                        manufactureListData = JSON.parse(manufactureList);
                        regenerate = true;
                    } else {
                        regenerate = false;
                        manufactureListData = JSON.parse(remainManufacturer);
                        if (manufactureListData.length == 0) {
                            return $.growl.warning({title: '', message: already_generated_manufacturer});
                        }
                    }

                    var manu = parseInt($('#manu_imagesNumber').text());

                    for  (var i = 0; i < manufactureListData.length; i++) {
                        manuIndex = i;
                        generateManufacturerImage(manufactureListData, newProgWidth, newProgressParam, initial, totalManu, totalImages, i, eql, manu, manuIndex)
                    }
                }

                if (cmsGen) {
                    convSt = 0;
                    var newProgWidth = 0;

                    if ($('#regenerate').is(':checked')) {
                        cmsDataArr = JSON.parse(cmsData);
                    } else {
                        cmsDataArr = JSON.parse(remainCmsData);
                        if (cmsDataArr.length == 0) {
                            return $.growl.warning({title: '', message: already_generated_cms});
                        }
                    }
                    if (existing == 1) {
                        var str = parseInt($('#cms_imagesNumber').text());
                        var progressBar = convPsSlider - str;
                    } else {
                        var str = 0;
                        var progressBar = convPsSlider;
                    }

                    for (var i = 0; i < cmsDataArr.length; i++) {
                        cmsIndex = i;
                        generateCmsImage(cmsDataArr, newProgressParam, newProgWidth, totalCms, totalImages, i, initial, eql, str, cmsIndex, existing)
                    }
                }

                if (sliderGen) {
                    convSt = 0;
                    var newProgWidth = 0;

                    if ($('#regenerate').is(':checked')) {
                        psSliderDataArr = JSON.parse(psSliderData);
                    } else {
                        psSliderDataArr = JSON.parse(remainPsSliderData);
                        if (psSliderDataArr.length == 0) {
                            return $.growl.warning({title: '', message: already_generated_slider});
                        }
                    }
                    var str = parseInt($('#ps_slider_imagesNumber').text());
                    var progressBar = convPsSlider - str;

                    for (var i = 0; i < psSliderDataArr.length; i++) {
                        sliderIndex = i;
                        generateSliderImage(psSliderDataArr, newProgressParam, newProgWidth, totalPsSlider, totalImages, i, initial, eql, str, sliderIndex)
                    }
                }

                if (carrierGen) {
                    convSt = 0;
                    var newProgWidth = 0;
                    if ($('#regenerate').is(':checked')) {
                        carrierDataArr = JSON.parse(carrierData);
                    } else {
                        carrierDataArr = JSON.parse(remainCarrierData);
                        if (carrierDataArr.length == 0) {
                            return $.growl.warning({title: '', message: already_generated_carrier});
                        }
                    }
                    for (var i = 0; i < carrierDataArr.length; i++) {
                        carrierIndex = i;
                        generateCarrierImage(carrierDataArr, newProgressParam, newProgWidth, totalCarrier, totalImages, i, initial, eql, str, carrierIndex)
                    }
                }
            })
        } else {
            if (catGen) {
                convCat = 0;
                var newProgWidth = 0;
                var newProgWidth = 0;
                if ($('#regenerate').is(':checked')) {
                    allCategoryDetail = JSON.parse(allCategory);
                    regenerate = true;
                } else {
                    regenerate = false;
                    allCategoryDetail = JSON.parse(remainCat);
                    if (allCategoryDetail.length == 0) {
                        return $.growl.warning({title: '', message: already_generated_category});
                    }
                }

                var cat = parseInt($('#cat_imagesNumber').text());

                for  (var i = 0; i < allCategoryDetail.length; i++) {
                    catIndex = i;
                    generateCategoryImage(allCategoryDetail, newProgressParam, newProgWidth, totalCat, totalImages, i, initial, eql, cat, catIndex);
                }
            }

            if (storeGen) {
                convSt = 0;
                var newProgWidth = 0;
                storesData = JSON.parse(stores);
                if ($('#regenerate').is(':checked')) {
                    storesData = JSON.parse(stores);
                    regenerate = true;
                } else {
                    regenerate = false;
                    storesData = JSON.parse(remainStore);
                    if (storesData.length == 0) {
                        return $.growl.warning({title: '', message: already_generated_store});
                    }
                }

                // $('#all_imagesNumber').text(parseInt($('#all_imagesNumber').text() - storesData.length));
                // if (existing == 1) {
                //     var str = parseInt($('#store_imagesNumber').text());
                //     var progressBar = totalStore - str;
                // } else {
                //     var str = 0;
                //     var progressBar = totalStore;
                // }

                for (var i = 0; i < storesData.length; i++) {
                    storeIndex = i;
                    generateStoreImage(storesData, newProgressParam, newProgWidth, totalStore, totalImages, i, initial, eql, str, storeIndex)
                }
            }

            if (suppGen) {
                convSu = 0;
                supplierData = JSON.parse(supplier);
                var newProgWidth = 0;
                if ($('#regenerate').is(':checked')) {
                    supplierData = JSON.parse(supplier);
                    regenerate = true;
                } else {
                    regenerate = false;
                    supplierData = JSON.parse(remainSupplier);
                    if (supplierData.length == 0) {
                        return $.growl.warning({title: '', message: already_generated_supplier});
                    }
                }
                var sup = parseInt($('#sup_imagesNumber').text());

                for  (var i = 0; i < supplierData.length; i++) {
                    supIndex = i
                    generateSupplierImage(
                        supplierData,
                        newProgWidth,
                        newProgressParam,
                        initial,
                        totalSup,
                        totalImages,
                        i,
                        eql,
                        sup,
                        supIndex
                    );
                }
            }

            if (manufGen) {
                convManu = 0;
                var newProgWidth = 0;
                var newProgWidth = 0;
                manufactureListData = JSON.parse(manufactureList);

                if ($('#regenerate').is(':checked')) {
                    manufactureListData = JSON.parse(manufactureList);
                    regenerate = true;
                } else {
                    regenerate = false;
                    manufactureListData = JSON.parse(remainManufacturer);
                    if (manufactureListData.length == 0) {
                        return $.growl.warning({title: '', message: already_generated_manufacturer});
                    }
                }

                var manu = parseInt($('#manu_imagesNumber').text());

                for  (var i = 0; i < manufactureListData.length; i++) {
                    manuIndex = i;
                    generateManufacturerImage(manufactureListData, newProgWidth, newProgressParam, initial, totalManu, totalImages, i, eql, manu, manuIndex)
                }
            }

            if (cmsGen) {
                convSt = 0;
                var newProgWidth = 0;

                if ($('#regenerate').is(':checked')) {
                    cmsDataArr = JSON.parse(cmsData);
                } else {
                    cmsDataArr = JSON.parse(remainCmsData);
                    if (cmsDataArr.length == 0) {
                        return $.growl.warning({title: '', message: already_generated_cms});
                    }
                }
                if (existing == 1) {
                    var str = parseInt($('#cms_imagesNumber').text());
                    var progressBar = convPsSlider - str;
                } else {
                    var str = 0;
                    var progressBar = convPsSlider;
                }

                for (var i = 0; i < cmsDataArr.length; i++) {
                    cmsIndex = i;
                    generateCmsImage(cmsDataArr, newProgressParam, newProgWidth, totalCms, totalImages, i, initial, eql, str, cmsIndex, existing)
                }
            }

            if (sliderGen) {
                convSt = 0;
                var newProgWidth = 0;

                if ($('#regenerate').is(':checked')) {
                    psSliderDataArr = JSON.parse(psSliderData);
                } else {
                    psSliderDataArr = JSON.parse(remainPsSliderData);
                    if (psSliderDataArr.length == 0) {
                        return $.growl.warning({title: '', message: already_generated_slider});
                    }
                }
                var str = parseInt($('#ps_slider_imagesNumber').text());
                var progressBar = convPsSlider - str;

                for (var i = 0; i < psSliderDataArr.length; i++) {
                    sliderIndex = i;
                    generateSliderImage(psSliderDataArr, newProgressParam, newProgWidth, totalPsSlider, totalImages, i, initial, eql, str, sliderIndex)
                }
            }

            if (carrierGen) {
                convSt = 0;
                var newProgWidth = 0;
                if ($('#regenerate').is(':checked')) {
                    carrierDataArr = JSON.parse(carrierData);
                } else {
                    carrierDataArr = JSON.parse(remainCarrierData);
                    if (carrierDataArr.length == 0) {
                        return $.growl.warning({title: '', message: already_generated_carrier});
                    }
                }
                for (var i = 0; i < carrierDataArr.length; i++) {
                    carrierIndex = i;
                    generateCarrierImage(carrierDataArr, newProgressParam, newProgWidth, totalCarrier, totalImages, i, initial, eql, str, carrierIndex)
                }
            }
        }

        if (checked == 0) {
            $.growl.error({
                title: "",
                size: "large",
                message: selectImages
            });
        }
    });


    const generateProductImage = (processOtherImages) =>
    {
        if ($('#regenerate').is(':checked')) {
            totalProductImages = parseInt(totalProductImages);
        } else {
            totalProductImages = parseInt(remainingProductImagesCount);
        }

        var product_limit = 1;   // Number of products per request
        var totalIteration = Math.ceil(totalProductImages/product_limit);
        var currentIteration = 1;
        generatedPaginatedProcess(product_limit, totalIteration, currentIteration, 1, (status) => {
            processOtherImages()
        })
    }


    function generateCategoryImage(allCategoryDetail, newProgressParam, newProgWidth, totalCat, totalImages, i, initial, eql, cat, catIndex)
    {
        setTimeout(() => {
            $.ajax({
                url: webPconfig,
                type: 'POST',
                cache: false,
                async: false,
                data: {
                    idCategory: allCategoryDetail[i].id_category,
                    //name: allCategoryDetail[i].name,
                    categoryType: 1,
                    status: status,
                    existing: existing,
                    ajax: true,
                    action: 'ConvertProductImage',
                },
                success: function(data) {
                    var totalConverted = getConvertedTotal();
                    var convImages = parseInt($('#all_imagesNumber').text());
                    if (convImages == 0) {
                        $('input[name=WK_WEBP_REMAINING]').closest('.form-group').hide();
                        $('#deleteImagesBtn').hide();
                        $('#configuration_form_submit_btn').hide();
                    }
                    if (convImages > 0) {
                        $('#deleteImagesBtn').show();
                        $('#configuration_form_submit_btn').show();
                    }

                    var wid = ++newProgWidth;
                    initial += parseFloat(newProgressParam);
                    cat = parseInt($('#cat_imagesNumber').text());
                    initial += parseFloat($('#webPProgress').attr('data-width'))


                    if (initial > 100) {
                        initial = 100;
                    }

                    eql.shift();
                    // $('#webPProgress').css('width', initial+'%');
                    // $('#webPProgress').attr('data-width', initial);
                    // if (data == 1) {
                        var n = parseInt(1);

                        cat = parseInt($('#cat_imagesNumber').text());
                        if ($('#regenerate').is(':checked')) {
                            if ($('#cat_imagesTotal').attr('value') == $('#cat_imagesNumber').text()) {
                                cat = 0;
                            } else {
                                cat = parseInt($('#cat_imagesNumber').text());
                            }
                        } else {
                            str = parseInt($('#cat_imagesNumber').text());
                        }

                        cat += n;

                        $('#cat_imagesNumber').text(cat);
                        if (cat < totalCat) {
                            $('#cat_imagesBadge').removeClass('badge badge-danger');
                            $('#cat_imagesBadge').addClass('badge badge-warning');
                        }
                        if (cat == totalCat) {
                            $('#cat_imagesBadge').removeClass('badge badge-danger');
                            $('#cat_imagesBadge').removeClass('badge badge-warning');
                            $('#cat_imagesBadge').addClass('badge badge-success');
                        }

                        $('#all_imagesNumber').text(getConvertedTotal());
                        if ($('#all_imagesNumber').text() < totalImages) {
                            $('#all_imagesBadge').removeClass('badge badge-danger');
                            $('#all_imagesBadge').addClass('badge badge-warning');
                        }
                        if ($('#all_imagesNumber').text() == totalImages) {
                            $('#all_imagesBadge').removeClass('badge badge-warning');
                            $('#all_imagesBadge').addClass('badge badge-success');
                        }

                        if (checkGenerateProcess(1) == 0) {
                            window.location.reload();
                        }
                    // }
                }
            });
        }, 100)
    }


    function generateManufacturerImage(manufactureListData, newProgWidth, newProgressParam, initial, totalManu, totalImages, i, eql, manu, manuIndex)
    {
        setTimeout(()=> {
            $.ajax({
                url: webPconfig,
                type: 'POST',
                cache: false,
                async: false,
                data: {
                    idManu: manufactureListData[i].id_manufacturer,
                    manuType: 1,
                    existing: existing,
                    ajax: true,
                    action: 'ConvertProductImage',
                },
            success: function(data) {
                $('.progress-text').text(processedImageCount);

                var totalConverted = getConvertedTotal();
                var convImages = parseInt($('#all_imagesNumber').text());
                var wid = ++newProgWidth;

                var convImages = parseInt($('#all_imagesNumber').text());
                if (convImages == 0) {
                    $('input[name=WK_WEBP_REMAINING]').closest('.form-group').hide();
                    $('#deleteImagesBtn').hide();
                    $('#configuration_form_submit_btn').hide();
                }
                if (convImages > 0) {
                    $('#deleteImagesBtn').show();
                    $('#configuration_form_submit_btn').show();
                }

                initial += parseFloat(newProgressParam);
                initial += parseFloat($('#webPProgress').attr('data-width'));

                if (initial > 100) {
                    initial = 100;
                }
                eql.shift();
                // $('#webPProgress').css('width', initial+'%');
                // $('#webPProgress').attr('data-width', initial);
                // if (data == 1) {
                    var n = parseInt(1);

                    if ($('#regenerate').is(':checked')) {
                        if ($('#manu_imagesTotal').attr('value') == $('#manu_imagesNumber').text()) {
                            manu = 0;
                        } else {
                            manu = parseInt($('#manu_imagesNumber').text());
                        }
                    } else {
                        manu = parseInt($('#manu_imagesNumber').text());
                    }

                    manu += n;

                    $('#manu_imagesNumber').text(manu);

                    if (manu < totalManu) {
                        $('#manu_imagesBadge').removeClass('badge badge-danger');
                        $('#manu_imagesBadge').addClass('badge badge-warning');
                    }
                    if (manu == totalManu) {
                        $('#manu_imagesBadge').removeClass('badge badge-danger');
                        $('#manu_imagesBadge').removeClass('badge badge-warning');
                        $('#manu_imagesBadge').addClass('badge badge-success');
                    }
                    $('#webPProgress').css('background-color', '#4cbb6c');
                    $('#all_imagesNumber').text(getConvertedTotal());
                    if ($('#all_imagesNumber').text() < totalImages) {
                        $('#all_imagesBadge').removeClass('badge badge-danger');
                        $('#all_imagesBadge').addClass('badge badge-warning');
                    }
                    if ($('#all_imagesNumber').text() == totalImages) {
                        $('#all_imagesBadge').removeClass('badge badge-warning');
                        $('#all_imagesBadge').addClass('badge badge-success');
                    }

                    if (checkGenerateProcess(1) == 0) {
                        window.location.reload();
                    }
                // }
            }
            });
        }, 100);
    }



    function generateSupplierImage(supplierData, newProgWidth, newProgressParam, initial, totalSup, totalImages, i, eql, sup, supIndex, regenerate)
    {
        setTimeout(() => {
            $.ajax({
                url: webPconfig,
                type: 'POST',
                cache: false,
                async: false,
                data: {
                    idSupplier: supplierData[i].id_supplier,
                    supplierType: 1,
                    existing: existing,
                    status: status,
                    ajax: true,
                    action: 'ConvertProductImage',
                },
            success: function(data) {
                var totalConverted = getConvertedTotal();
                var convImages = parseInt($('#all_imagesNumber').text());
                var wid = ++newProgWidth;
                if (convImages == 0) {
                    $('input[name=WK_WEBP_REMAINING]').closest('.form-group').hide();
                    $('#deleteImagesBtn').hide();
                    $('#configuration_form_submit_btn').hide();
                }
                if (convImages > 0) {
                    $('#deleteImagesBtn').show();
                    $('#configuration_form_submit_btn').show();
                }

                initial += parseFloat(newProgressParam);
                initial += parseFloat($('#webPProgress').attr('data-width'))

                if (initial > 100) {
                    initial = 100;
                }
                eql.shift();
                // $('#webPProgress').css('width', initial+'%');
                // $('#webPProgress').attr('data-width', initial);
                // if (data == 1) {
                    var n = parseInt(1);
                    if ($('#regenerate').is(':checked')) {
                        if (i > 0) {
                            sup = parseInt($('#sup_imagesNumber').text());
                        } else {
                            sup = 0;
                        }
                    } else {
                        sup = parseInt($('#sup_imagesNumber').text());
                    }

                    sup += n;

                    $('#sup_imagesNumber').text(sup);
                    if (sup < totalSup) {
                        $('#sup_imagesBadge').removeClass('badge badge-danger');
                        $('#sup_imagesBadge').addClass('badge badge-warning');
                    }
                    if (sup == totalSup) {
                        $('#sup_imagesBadge').removeClass('badge badge-danger');
                        $('#sup_imagesBadge').removeClass('badge badge-warning');
                        $('#sup_imagesBadge').addClass('badge badge-success');
                    }
                    $('#webPProgress').css('background-color', '#4cbb6c');
                    $('#all_imagesNumber').text(getConvertedTotal());
                    if ($('#all_imagesNumber').text() < totalImages) {
                        $('#all_imagesBadge').removeClass('badge badge-danger');
                        $('#all_imagesBadge').addClass('badge badge-warning');
                    }
                    if ($('#all_imagesNumber').text() == totalImages) {
                        $('#all_imagesBadge').removeClass('badge badge-warning');
                        $('#all_imagesBadge').addClass('badge badge-success');
                    }
                    if (checkGenerateProcess(1) == 0) {
                        window.location.reload();
                    }
                // }
            }
            });
        }, 100);
    }


    function generateStoreImage(
        storesData,
        newProgressParam,
        newProgWidth,
        totalStore,
        totalImages,
        i,
        initial,
        eql,
        str,
        storeIndex
    ) {
        setTimeout(()=> {
            $.ajax({
                url: webPconfig,
                type: 'POST',
                cache: false,
                async: false,
                data: {
                    idStore: storesData[i].id_store,
                    storeType: 1,
                    existing: existing,
                    status: status,
                    ajax: true,
                    action: 'ConvertProductImage',
                },
            success: function(data) {
                var wid = ++newProgWidth;
                initial += parseFloat(newProgressParam);
                initial += parseFloat($('#webPProgress').attr('data-width'))

                if (initial > 100) {
                    initial = 100;
                }
                // eql.shift();
                // $('#webPProgress').css('width', initial+'%');
                // $('#webPProgress').attr('data-width', initial);

                var totalConverted = getConvertedTotal();
                if (data == 1) {

                    var n = parseInt(1);
                    if ($('#regenerate').is(':checked')) {
                        if (i > 0) {
                            str = parseInt($('#store_imagesNumber').text());
                        } else {
                            str = 0;
                        }
                    } else {
                        str = parseInt($('#store_imagesNumber').text());
                    }

                    str += n;

                    $('#store_imagesNumber').text(str);
                    if (str < totalStore) {
                        $('#store_imagesBadge').removeClass('badge badge-danger');
                        $('#store_imagesBadge').addClass('badge badge-warning');
                    }
                    if (str == totalStore) {
                        $('#store_imagesBadge').removeClass('badge badge-danger');
                        $('#store_imagesBadge').removeClass('badge badge-warning');
                        $('#store_imagesBadge').addClass('badge badge-success');
                    }
                    $('#webPProgress').css('background-color', '#4cbb6c');

                    $('#all_imagesNumber').text(getConvertedTotal());
                    if ($('#all_imagesNumber').text() < totalImages) {
                        $('#all_imagesBadge').removeClass('badge badge-danger');
                        $('#all_imagesBadge').addClass('badge badge-warning');
                    }
                    if ($('#all_imagesNumber').text() == totalImages) {
                        $('#all_imagesBadge').removeClass('badge badge-warning');
                        $('#all_imagesBadge').addClass('badge badge-success');
                    }
                    if (checkGenerateProcess(1) == 0) {
                        window.location.reload();
                    }
                }
            }
            });
        }, 100)
    }

    function generateCmsImage(
        cmsData,
        newProgressParam,
        newProgWidth,
        totalCms,
        totalImages,
        i,
        initial,
        eql,
        str,
        cmsIndex,
        existing
    ) {
        setTimeout(()=> {
            $.ajax({
                url: webPconfig,
                type: 'POST',
                cache: false,
                async: false,
                data: {
                    cms: cmsData[i],
                    cmsType: 1,
                    existing: existing,
                    status: status,
                    ajax: true,
                    action: 'ConvertProductImage',
                },
            success: function(data) {
                var wid = ++newProgWidth;
                initial += parseFloat(newProgressParam);
                initial += parseFloat($('#webPProgress').attr('data-width'))

                if (initial > 100) {
                    initial = 100;
                }
                eql.shift();
                // $('#webPProgress').css('width', initial+'%');
                // $('#webPProgress').attr('data-width', initial);

                var totalConverted =  getConvertedTotal();
                // if (data == 1) {

                    var n = parseInt(1);
                    if ($('#regenerate').is(':checked')) {
                        if (i > 0) {
                            str = parseInt($('#cms_imagesNumber').text());
                        } else {
                            str = 0;
                        }
                    } else {
                        str = parseInt($('#cms_imagesNumber').text());
                    }

                    str += n;

                    $('#cms_imagesNumber').text(str);
                    if (str < totalCms) {
                        $('#cms_imagesBadge').removeClass('badge badge-danger');
                        $('#cms_imagesBadge').addClass('badge badge-warning');
                    }
                    if (str == totalCms) {
                        $('#cms_imagesBadge').removeClass('badge badge-danger');
                        $('#cms_imagesBadge').removeClass('badge badge-warning');
                        $('#cms_imagesBadge').addClass('badge badge-success');
                    }
                    $('#webPProgress').css('background-color', '#4cbb6c');
                    $('#all_imagesNumber').text(getConvertedTotal());
                    if ($('#all_imagesNumber').text() < totalImages) {
                        $('#all_imagesBadge').removeClass('badge badge-danger');
                        $('#all_imagesBadge').addClass('badge badge-warning');
                    }
                    if ($('#all_imagesNumber').text() == totalImages) {
                        $('#all_imagesBadge').removeClass('badge badge-warning');
                        $('#all_imagesBadge').addClass('badge badge-success');
                    }

                    if (checkGenerateProcess(1) == 0) {
                        window.location.reload();
                    }
                // }
            }
            });
        }, 100)
    }

    function generateSliderImage(
        psSliderDataArr,
        newProgressParam,
        newProgWidth,
        totalPsSlider,
        totalImages,
        i,
        initial,
        eql,
        str,
        storeIndex
    ) {
        setTimeout(()=> {
            $.ajax({
                url: webPconfig,
                type: 'POST',
                cache: false,
                async: false,
                data: {
                    slider: psSliderDataArr[i],
                    sliderType: 1,
                    existing: existing,
                    status: status,
                    ajax: true,
                    action: 'ConvertProductImage',
                },
            success: function(data) {
                var wid = ++newProgWidth;
                initial += parseFloat(newProgressParam);
                initial += parseFloat($('#webPProgress').attr('data-width'))

                if (initial > 100 || (psSliderDataArr.length - 1 == i)) {
                    initial = 100;
                }
                eql.shift();
                // $('#webPProgress').css('width', initial+'%');
                // $('#webPProgress').attr('data-width', initial);

                var totalConverted =  getConvertedTotal();
                if (data == 1) {

                    var n = parseInt(1);
                    if ($('#regenerate').is(':checked')) {
                        if (i > 0) {
                            str = parseInt($('#ps_slider_imagesNumber').text());
                        } else {
                            str = 0;
                        }
                    } else {
                        str = parseInt($('#ps_slider_imagesNumber').text());
                    }

                    str += n;
                    processedImageCount += n;
                    $('.progress-text').text(processedImageCount);

                    $('#ps_slider_imagesNumber').text(str);
                    if (str < totalPsSlider) {
                        $('#ps_slider_imagesBadge').removeClass('badge badge-danger');
                        $('#ps_slider_imagesBadge').addClass('badge badge-warning');
                    }
                    if (str == totalPsSlider) {
                        $('#ps_slider_imagesBadge').removeClass('badge badge-danger');
                        $('#ps_slider_imagesBadge').removeClass('badge badge-warning');
                        $('#ps_slider_imagesBadge').addClass('badge badge-success');
                    }
                    $('#webPProgress').css('background-color', '#4cbb6c');
                    $('#all_imagesNumber').text(getConvertedTotal());
                    if ($('#all_imagesNumber').text() < totalImages) {
                        $('#all_imagesBadge').removeClass('badge badge-danger');
                        $('#all_imagesBadge').addClass('badge badge-warning');
                    }
                    if ($('#all_imagesNumber').text() == totalImages) {
                        $('#all_imagesBadge').removeClass('badge badge-warning');
                        $('#all_imagesBadge').addClass('badge badge-success');
                    }
                    if (checkGenerateProcess(1) == 0) {
                        window.location.reload();
                    }
                }
            }
            });
        }, 100)
    }

    function generateCarrierImage(
        carrierData,
        newProgressParam,
        newProgWidth,
        totalCarrier,
        totalImages,
        i,
        initial,
        eql,
        str,
        storeIndex
    ) {
        setTimeout(()=> {
            $.ajax({
                url: webPconfig,
                type: 'POST',
                cache: false,
                async: false,
                data: {
                    carrier: carrierData[i]['id_carrier'],
                    carrierType: 1,
                    existing: existing,
                    status: status,
                    ajax: true,
                    action: 'ConvertProductImage',
                },
            success: function(data) {
                var wid = ++newProgWidth;
                initial += parseFloat(newProgressParam);
                initial += parseFloat($('#webPProgress').attr('data-width'))

                if (initial > 100) {
                    initial = 100;
                }
                eql.shift();
                // $('#webPProgress').css('width', initial+'%');
                // $('#webPProgress').attr('data-width', initial);

                var totalConverted =  getConvertedTotal();
                if (data == 1) {

                    var n = parseInt(1);
                    if ($('#regenerate').is(':checked')) {
                        if (i > 0) {
                            str = parseInt($('#carrier_imagesNumber').text());
                        } else {
                            str = 0;
                        }
                    } else {
                        str = parseInt($('#carrier_imagesNumber').text());
                    }


                    str += n;
                    processedImageCount += n;
                    $('.progress-text').text(processedImageCount);

                    $('#carrier_imagesNumber').text(str);
                    if (str < totalCarrier) {
                        $('#carrier_imagesBadge').removeClass('badge badge-danger');
                        $('#carrier_imagesBadge').addClass('badge badge-warning');
                    }
                    if (str == totalCarrier) {
                        $('#carrier_imagesBadge').removeClass('badge badge-danger');
                        $('#carrier_imagesBadge').removeClass('badge badge-warning');
                        $('#carrier_imagesBadge').addClass('badge badge-success');
                    }
                    $('#webPProgress').css('background-color', '#4cbb6c');
                    $('#all_imagesNumber').text(getConvertedTotal());
                    if ($('#all_imagesNumber').text() < totalImages) {
                        $('#all_imagesBadge').removeClass('badge badge-danger');
                        $('#all_imagesBadge').addClass('badge badge-warning');
                    }
                    if ($('#all_imagesNumber').text() == totalImages) {
                        $('#all_imagesBadge').removeClass('badge badge-warning');
                        $('#all_imagesBadge').addClass('badge badge-success');
                    }

                    if (checkGenerateProcess(1) == 0) {
                        window.location.reload();
                    }
                }
            }
            });
        }, 100)
    }



    //image deletion
    $('#deleteImagesBtn').click(function(e){
        if (confirm(areYouConfirm)) {
            e.preventDefault();
            if ($("input[name='convertImage']:checked").length <= 0) {
                $.growl.error({
                    title: "",
                    size: "large",
                    message: selectImagesForDelete
                });
                return false;
            }
            var imageToDelete = getTotalImagesData().generated;
            if(imageToDelete == 0 || typeof imageToDelete == 'undefined' || Number.isNaN(imageToDelete)) {
                $.growl.error({
                    title: "",
                    size: "large",
                    message: deleteMsg
                });
                return false;
            }
            $.each($("input[name='convertImage']:checked"), function(){
                $('.progress').css('display', 'block');
                var totalConv = parseInt($('#all_imagesNumber').text());
                    if ($(this).val() == 'store_images' && !$(this).is(':disabled')) {
                        convSt = totalStore;
                        var progressBar = 0;
                        var newProgWidth = 0;
                        storesData = JSON.parse(stores);
                        for  (var i = 0; i < storesData.length; i++) {
                            $.ajax({
                                url: webPconfig,
                                type: 'POST',
                                cache: false,
                                data: {
                                    idStore: storesData[i].id_store,
                                    storeTypeDel: 1,
                                    status: status,
                                    ajax: true,
                                    action: 'ConvertProductImage',
                                },
                            beforeSend: function(){
                                progressBar = totalConvStore;
                            },
                            success: function(data) {
                                if (data == 1) {
                                    $('#webPProgress').css('background-color', '#ff4c4c');
                                    st = --convSt;
                                    if (st < progressBar) {
                                        $('#store_imagesBadge').addClass('badge badge-warning');
                                    }
                                    if (st == 0) {
                                        $('#store_imagesBadge').removeClass('badge badge-warning');
                                        $('#store_imagesBadge').removeClass('badge badge-success');
                                        $('#store_imagesBadge').addClass('badge badge-danger');
                                    }
                                    if (st >= 0) {
                                        $('#store_imagesNumber').text(st);
                                    }
                                    var totalConverted = getConvertedTotal();
                                    $('#all_imagesNumber').text(totalConverted);
                                    if ($('#all_imagesNumber').text() < totalImages) {
                                        $('#all_imagesBadge').removeClass('badge badge-danger');
                                        $('#all_imagesBadge').addClass('badge badge-warning');
                                    }
                                    if ($('#all_imagesNumber').text() == 0) {
                                        $('#all_imagesBadge').removeClass('badge badge-warning');
                                        $('#all_imagesBadge').removeClass('badge badge-success');
                                        $('#all_imagesBadge').addClass('badge badge-danger');
                                    }
                                    newProgWidth += Math.round((100/progressBar));
                                    width = Math.round(newProgWidth*2)/2;
                                    if (newProgWidth > 100 || width > 100) {
                                        newProgWidth = 100;
                                        width = 100;
                                    }
                                    $('#webPProgress').css('width', newProgWidth+'%');
                                    // $('#webPProgress').text(width+'%');
                                    imageToDelete = checkDeleteProcess(imageToDelete);
                                }
                            }
                            });
                        }
                    }
                    if ($(this).val() == 'sup_images' && !$(this).is(':disabled')) {
                        convSu = totalSup;
                        supplierData = JSON.parse(supplier);
                        var progressBar = 0;
                        var newProgWidth = 0;
                        var newTotal = 0;
                        for  (var i = 0; i < supplierData.length; i++) {
                            $.ajax({
                                url: webPconfig,
                                type: 'POST',
                                cache: false,
                                data: {
                                    idSupplier: supplierData[i].id_supplier,
                                    supplierTypeDel: 1,
                                    status: status,
                                    ajax: true,
                                    action: 'ConvertProductImage',
                                },
                            beforeSend: function(){
                                progressBar = totalConvSup;
                            },
                            success: function(data) {
                                if (data == 1) {

                                    $('#webPProgress').css('background-color', '#ff4c4c');
                                    su = --convSu;
                                    if (su < progressBar) {
                                        $('#sup_imagesBadge').addClass('badge badge-warning');
                                    }
                                    if (su == progressBar) {
                                        $('#sup_imagesBadge').removeClass('badge badge-warning');
                                        $('#sup_imagesBadge').addClass('badge badge-success');
                                    }
                                    if (su == 0) {
                                        $('#sup_imagesBadge').removeClass('badge badge-success');
                                        $('#sup_imagesBadge').addClass('badge badge-danger');
                                    }
                                    if (su >= 0) {
                                        $('#sup_imagesNumber').text(su);
                                    }
                                    var totalConverted = getConvertedTotal();
                                    $('#all_imagesNumber').text(totalConverted);
                                    if ($('#all_imagesNumber').text() < totalImages) {
                                        $('#all_imagesBadge').removeClass('badge badge-danger');
                                        $('#all_imagesBadge').addClass('badge badge-warning');
                                    }
                                    if ($('#all_imagesNumber').text() == 0) {
                                        $('#all_imagesBadge').removeClass('badge badge-warning');
                                        $('#all_imagesBadge').removeClass('badge badge-success');
                                        $('#all_imagesBadge').addClass('badge badge-danger');
                                    }
                                    newProgWidth += Math.round((100/progressBar));
                                    width = Math.round(newProgWidth*2)/2;
                                    if (newProgWidth > 100 || width > 100) {
                                        newProgWidth = 100;
                                        width = 100;
                                    }
                                    $('#webPProgress').css('width', newProgWidth+'%');
                                    imageToDelete = checkDeleteProcess(imageToDelete);
                                }
                            }
                            });
                        }
                    }
                    if ($(this).val() == 'manu_images' && !$(this).is(':disabled')) {
                        convManu = totalManu;
                        var progressBar = 0;
                        var newProgWidth = 0;
                        manufactureListData = JSON.parse(manufactureList);
                        for  (var i = 0; i < manufactureListData.length; i++) {
                            $.ajax({
                                url: webPconfig,
                                type: 'POST',
                                cache: false,
                                data: {
                                    idManu: manufactureListData[i].id_manufacturer,
                                    manuTypeDel: 1,
                                    status: status,
                                    ajax: true,
                                    action: 'ConvertProductImage',
                                },
                            beforeSend: function(){
                                progressBar = totalConvManu;
                            },
                            success: function(data) {
                                if (data == 1) {
                                    $('#webPProgress').css('background-color', '#ff4c4c');
                                    manu = --convManu;
                                    if (manu < progressBar) {
                                        $('#manu_imagesBadge').addClass('badge badge-warning');
                                    }
                                    if (manu == progressBar) {
                                        $('#manu_imagesBadge').removeClass('badge badge-warning');
                                        $('#manu_imagesBadge').addClass('badge badge-success');
                                    }
                                    if (manu == 0) {
                                        $('#manu_imagesBadge').removeClass('badge badge-success');
                                        $('#manu_imagesBadge').addClass('badge badge-danger');
                                    }
                                    if (manu >= 0) {
                                        $('#manu_imagesNumber').text(manu);
                                    }
                                    var totalConverted = getConvertedTotal();
                                    $('#all_imagesNumber').text(totalConverted);
                                    if ($('#all_imagesNumber').text() < totalImages) {
                                        $('#all_imagesBadge').removeClass('badge badge-danger');
                                        $('#all_imagesBadge').addClass('badge badge-warning');
                                    }
                                    if ($('#all_imagesNumber').text() == 0) {
                                        $('#all_imagesBadge').removeClass('badge badge-warning');
                                        $('#all_imagesBadge').removeClass('badge badge-success');
                                        $('#all_imagesBadge').addClass('badge badge-danger');
                                    }
                                    newProgWidth += Math.round((100/progressBar));
                                    width = Math.round(newProgWidth*2)/2;
                                    if (newProgWidth > 100 || width > 100) {
                                        newProgWidth = 100;
                                        width = 100;
                                    }
                                    $('#webPProgress').css('width', newProgWidth+'%');
                                    imageToDelete = checkDeleteProcess(imageToDelete);
                                }
                            }
                            });
                        }
                    }
                    if ($(this).val() == 'cat_images' && !$(this).is(':disabled')) {
                        convCat = totalCat;
                        var progressBar = 0;
                        var newProgWidth = 0;
                        allCategoryDetail = JSON.parse(allCategory);
                        for  (var i = 0; i < allCategoryDetail.length; i++) {
                            $.ajax({
                                url: webPconfig,
                                type: 'POST',
                                cache: false,
                                data: {
                                    idCategory: allCategoryDetail[i].id_category,
                                    //name: allCategoryDetail[i].name,
                                    categoryTypeDel: 1,
                                    status: status,
                                    ajax: true,
                                    action: 'ConvertProductImage',
                                },
                            beforeSend: function(){
                                progressBar = totalConvCat;
                            },
                            success: function(data) {
                                if (data == 1) {
                                    $('#webPProgress').css('background-color', '#ff4c4c');
                                    cat = --convCat;
                                    if (cat < progressBar) {
                                        $('#cat_imagesBadge').addClass('badge badge-warning');
                                    }
                                    if (cat == progressBar) {
                                        $('#cat_imagesBadge').removeClass('badge badge-warning');
                                        $('#cat_imagesBadge').addClass('badge badge-success');
                                    }
                                    if (cat == 0) {
                                        $('#cat_imagesBadge').removeClass('badge badge-success');
                                        $('#cat_imagesBadge').addClass('badge badge-danger');
                                    }
                                    if (cat >= 0) {
                                        $('#cat_imagesNumber').text(cat);
                                    }
                                    var totalConverted = getConvertedTotal();
                                    $('#all_imagesNumber').text(totalConverted);
                                    if ($('#all_imagesNumber').text() < totalImages) {
                                        $('#all_imagesBadge').removeClass('badge badge-danger');
                                        $('#all_imagesBadge').addClass('badge badge-warning');
                                    }
                                    if ($('#all_imagesNumber').text() == 0) {
                                        $('#all_imagesBadge').removeClass('badge badge-warning');
                                        $('#all_imagesBadge').removeClass('badge badge-success');
                                        $('#all_imagesBadge').addClass('badge badge-danger');
                                    }
                                    newProgWidth += (100/progressBar);
                                    width = Math.round(newProgWidth*2)/2;
                                    if (newProgWidth > 100 || width > 100) {
                                        newProgWidth = 100;
                                        width = 100;
                                    }
                                    $('#webPProgress').css('width', newProgWidth+'%');
                                    imageToDelete = checkDeleteProcess(imageToDelete);
                                }
                            }
                            });
                        }
                    }
                    if ($(this).val() == 'ps_slider_images' && !$(this).is(':disabled')) {
                        convPsSlider = totalPsSlider;
                        var progressBar = 0;
                        var newProgWidth = 0;
                        psSliderData = JSON.parse(psSliderData);
                        for  (var i = 0; i < psSliderData.length; i++) {
                            $.ajax({
                                url: webPconfig,
                                type: 'POST',
                                cache: false,
                                data: {
                                    slider: psSliderData[i],
                                    sliderTypeDel: 1,
                                    status: status,
                                    ajax: true,
                                    action: 'ConvertProductImage',
                                },
                            beforeSend: function(){
                                progressBar = convPsSlider;
                            },
                            success: function(data) {
                                if (data == 1) {
                                    $('#webPProgress').css('background-color', '#ff4c4c');
                                    ps_slider = --convPsSlider;
                                    if (ps_slider < progressBar) {
                                        $('#ps_slider_imagesBadge').addClass('badge badge-warning');
                                    }
                                    if (ps_slider == progressBar) {
                                        $('#ps_slider_imagesBadge').removeClass('badge badge-warning');
                                        $('#ps_slider_imagesBadge').addClass('badge badge-success');
                                    }
                                    if (ps_slider == 0) {
                                        $('#ps_slider_imagesBadge').removeClass('badge badge-success');
                                        $('#ps_slider_imagesBadge').addClass('badge badge-danger');
                                    }
                                    if (ps_slider >= 0) {
                                        $('#ps_slider_imagesNumber').text(ps_slider);
                                    }
                                    var totalConverted = getConvertedTotal();
                                    $('#all_imagesNumber').text(totalConverted);
                                    if ($('#all_imagesNumber').text() < totalImages) {
                                        $('#all_imagesBadge').removeClass('badge badge-danger');
                                        $('#all_imagesBadge').addClass('badge badge-warning');
                                    }
                                    if ($('#all_imagesNumber').text() == 0) {
                                        $('#all_imagesBadge').removeClass('badge badge-warning');
                                        $('#all_imagesBadge').removeClass('badge badge-success');
                                        $('#all_imagesBadge').addClass('badge badge-danger');
                                    }
                                    newProgWidth += (100/progressBar);
                                    width = Math.round(newProgWidth*2)/2;
                                    if (newProgWidth > 100 || width > 100) {
                                        newProgWidth = 100;
                                        width = 100;
                                    }
                                    $('#webPProgress').css('width', newProgWidth+'%');
                                    imageToDelete = checkDeleteProcess(imageToDelete);
                                }
                            }
                            });
                        }
                    }
                    if ($(this).val() == 'carrier_images') {
                        convCarrier = totalCarrier;
                        var progressBar = 0;
                        var newProgWidth = 0;
                        carrierData = JSON.parse(carrierData);
                        for  (var i = 0; i < carrierData.length; i++) {
                            $.ajax({
                                url: webPconfig,
                                type: 'POST',
                                cache: false,
                                data: {
                                    carrier: carrierData[i]['id_carrier'],
                                    carrierTypeDel: 1,
                                    status: status,
                                    ajax: true,
                                    action: 'ConvertProductImage',
                                },
                            beforeSend: function(){
                                progressBar = convCarrier;
                            },
                            success: function(data) {
                                if (data == 1) {
                                    $('#webPProgress').css('background-color', '#ff4c4c');
                                    carrier = --convCarrier;
                                    if (carrier < progressBar) {
                                        $('#carrier_imagesBadge').addClass('badge badge-warning');
                                    }
                                    if (carrier == progressBar) {
                                        $('#carrier_imagesBadge').removeClass('badge badge-warning');
                                        $('#carrier_imagesBadge').addClass('badge badge-success');
                                    }
                                    if (carrier == 0) {
                                        $('#carrier_imagesBadge').removeClass('badge badge-success');
                                        $('#carrier_imagesBadge').addClass('badge badge-danger');
                                    }
                                    if (carrier >= 0) {
                                        $('#carrier_imagesNumber').text(carrier);
                                    }
                                    var totalConverted = getConvertedTotal();
                                    $('#all_imagesNumber').text(totalConverted);
                                    if ($('#all_imagesNumber').text() < totalImages) {
                                        $('#all_imagesBadge').removeClass('badge badge-danger');
                                        $('#all_imagesBadge').addClass('badge badge-warning');
                                    }
                                    if ($('#all_imagesNumber').text() == 0) {
                                        $('#all_imagesBadge').removeClass('badge badge-warning');
                                        $('#all_imagesBadge').removeClass('badge badge-success');
                                        $('#all_imagesBadge').addClass('badge badge-danger');
                                    }
                                    newProgWidth += (100/progressBar);
                                    width = Math.round(newProgWidth*2)/2;
                                    if (newProgWidth > 100 || width > 100) {
                                        newProgWidth = 100;
                                        width = 100;
                                    }
                                    $('#webPProgress').css('width', newProgWidth+'%');
                                    imageToDelete = checkDeleteProcess(imageToDelete);
                                }
                            }
                            });
                        }
                    }
                    if ($(this).val() == 'cms_images' && !$(this).is(':disabled')) {
                        convCms = totalCms;
                        var progressBar = 0;
                        var newProgWidth = 0;
                        cmsData = JSON.parse(cmsData);
                        for  (var i = 0; i < cmsData.length; i++) {
                            $.ajax({
                                url: webPconfig,
                                type: 'POST',
                                cache: false,
                                data: {
                                    cms: cmsData[i],
                                    cmsTypeDel: 1,
                                    status: status,
                                    ajax: true,
                                    action: 'ConvertProductImage',
                                },
                            beforeSend: function(){
                                progressBar = convCms;
                            },
                            success: function(data) {
                                if (data == 1) {
                                    $('#webPProgress').css('background-color', '#ff4c4c');
                                    cms = --convCms;
                                    if (cms < progressBar) {
                                        $('#cms_imagesBadge').addClass('badge badge-warning');
                                    }
                                    if (cms == progressBar) {
                                        $('#cms_imagesBadge').removeClass('badge badge-warning');
                                        $('#cms_imagesBadge').addClass('badge badge-success');
                                    }
                                    if (cms == 0) {
                                        $('#cms_imagesBadge').removeClass('badge badge-success');
                                        $('#cms_imagesBadge').addClass('badge badge-danger');
                                    }
                                    if (cms >= 0) {
                                        $('#cms_imagesNumber').text(cms);
                                    }
                                    var totalConverted = getConvertedTotal();
                                    $('#all_imagesNumber').text(totalConverted);
                                    if ($('#all_imagesNumber').text() < totalImages) {
                                        $('#all_imagesBadge').removeClass('badge badge-danger');
                                        $('#all_imagesBadge').addClass('badge badge-warning');
                                    }
                                    if ($('#all_imagesNumber').text() == 0) {
                                        $('#all_imagesBadge').removeClass('badge badge-warning');
                                        $('#all_imagesBadge').removeClass('badge badge-success');
                                        $('#all_imagesBadge').addClass('badge badge-danger');
                                    }
                                    newProgWidth += (100/progressBar);
                                    width = Math.round(newProgWidth*2)/2;
                                    if (newProgWidth > 100 || width > 100) {
                                        newProgWidth = 100;
                                        width = 100;
                                    }
                                    $('#webPProgress').css('width', newProgWidth+'%');
                                    imageToDelete = checkDeleteProcess(imageToDelete);
                                }
                            }
                            });
                        }
                    }

                    if ($(this).val() == 'product_images' && !$(this).is(':disabled')) {
                        var progressBar = 0;
                        var newProgWidth = 0;
                        convPr = totalConvProduct;
                        deleteProductImages(progressBar, newProgWidth, convPr);
                    }

            });
        }

        return false;
    });


    $('input[name=convertImage]').prop('checked', true);
    $("#all_images").on('click',function(){
        if ($(this).is(':checked')) {
            $('input[name=convertImage]').prop('checked', true);
        } else {
            $('input[name=convertImage]').prop('checked', false);
        }
    });

});

function wkDataToGroup(wk_data, wk_elements) {
    var wk_data_group = [],
        i, k;

    for (i = 0, k = -1; i < wk_data.length; i++) {
        if (i % wk_elements === 0) {
            k++;
            wk_data_group[k] = [];
        }

        wk_data_group[k].push(wk_data[i]);
    }

    return wk_data_group;
}

function displayLoading(array_length, count)
{
    percent = (parseFloat(((array_length * 100) / count).toFixed(2))).toFixed(2);

    return percent;

}


function getTotalImagesData()
{
    let total = 0;
    let cmsDataArr = 0;
    let carrierDataArr = 0;
    let psSliderDataArr = 0;
    let storesDataArr = 0;
    let supplierData = 0;
    let manufactureListData = 0;
    let allCategoryDetail = 0;
    let imageData = 0;
    let checked = false;
    let generated = 0;
    $.each($("input[name='convertImage']:checked"), function(){
        if ($(this).val() == 'cms_images') {
            if ($('#regenerate').is(':checked') && !$(this).is(':disabled')) {
                cmsDataArr = parseJSONSafely(cmsData);
            } else {
                cmsDataArr = parseJSONSafely(remainCmsData);
            }
            generated += parseJSONSafely(cmsData).length - parseJSONSafely(remainCmsData).length;
            total += cmsDataArr.length;
            checked = true;
        }

        if ($(this).val() == 'carrier_images' && !$(this).is(':disabled')) {
            if ($('#regenerate').is(':checked')) {
                carrierDataArr = parseJSONSafely(carrierData);
            } else {
                carrierDataArr = parseJSONSafely(remainCarrierData);
            }
            total += carrierDataArr.length;
            generated += parseJSONSafely(carrierData).length - parseJSONSafely(remainCarrierData).length;
            checked = true;
        }
        if ($(this).val() == 'ps_slider_images' && !$(this).is(':disabled')) {
            if ($('#regenerate').is(':checked')) {
                psSliderDataArr = parseJSONSafely(psSliderData);
            } else {
                psSliderDataArr = parseJSONSafely(remainPsSliderData);
            }
            total += psSliderDataArr.length;
            generated += parseJSONSafely(psSliderData).length - parseJSONSafely(remainPsSliderData).length;
            checked = true;

        }
        if ($(this).val() == 'store_images' && !$(this).is(':disabled')) {
            if ($('#regenerate').is(':checked')) {
                storesDataArr = parseJSONSafely(stores);
            } else {
                storesDataArr = parseJSONSafely(remainStore);
            }
            total += storesDataArr.length;
            generated += parseJSONSafely(stores).length - parseJSONSafely(remainStore).length;
            checked = true;

        }
        if ($(this).val() == 'sup_images' && !$(this).is(':disabled')) {
            if ($('#regenerate').is(':checked')) {
                supplierData = parseJSONSafely(supplier);
            } else {
                supplierData = parseJSONSafely(remainSupplier);
            }
            generated += parseJSONSafely(supplier).length - parseJSONSafely(remainSupplier).length;
            total += supplierData.length;
            checked = true;

        }
        if ($(this).val() == 'manu_images' && !$(this).is(':disabled')) {
            if ($('#regenerate').is(':checked')) {
                manufactureListData = parseJSONSafely(manufactureList);
            } else {
                manufactureListData = parseJSONSafely(remainManufacturer);
            }
            generated += parseJSONSafely(manufactureList).length - parseJSONSafely(remainManufacturer).length;
            total += manufactureListData.length;
            checked = true;

        }
        if ($(this).val() == 'cat_images' && !$(this).is(':disabled')) {
            if ($('#regenerate').is(':checked')) {
                allCategoryDetail = parseJSONSafely(allCategory);
                regenerate = true;
            } else {
                regenerate = false;
                allCategoryDetail = parseJSONSafely(remainCat);
            }
            generated += parseJSONSafely(allCategory).length - parseJSONSafely(remainCat).length;
            total += allCategoryDetail.length;
            checked = true;

        }
        if ($(this).val() == 'product_images' && !$(this).is(':disabled')) {
            // if ($('#regenerate').is(':checked')) {
            //     imageData = JSON.parse(imageDetail);
            // } else {
            //     imageData = JSON.parse(remainingProductImages);
            // }
            total += parseInt(totalProductImages);
            generated += parseInt(totalProductImages) - parseInt(remainingProductImagesCount);
            checked = true;
        }
    });
    if (total == 0) {
        $('.progress').css('display', 'none');
    } else {
        $('progress').css('display', 'block');
    }
    // console.log({checked, total, generated})
    return {checked, total, generated};
}

function parseJSONSafely(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        // console.error('Error parsing JSON:', error);
        return 0;
    }
}

function checkDeleteProcess(imageToDelete)
{
    if (imageToDelete <= 0) {
        imageToDelete = 0; // Image count is already zero or negative
    } else {
        imageToDelete -=1;
    }
    if (imageToDelete == 0) {
        $.growl.notice({
            title: "",
            size: "large",
            message: deleteMsg
        });
        window.location.reload();
    } else {
        $('#deleteImagesBtn').attr('disabled','disabled');
        $('#convertImagesBtn').attr('disabled','disabled');
    }
    // console.log(imageToDelete)

    return imageToDelete;
}

function checkGenerateProcess(dec)
{
    realGenerated = realGenerated - dec;
    let pro = parseFloat($('.progress-text-webp').text());
    totalPercentImg =  increamentPercent + pro
    totalPercentImg = Number(totalPercentImg.toFixed(2));
    $('.progress-text-webp').text(totalPercentImg);
    $('#webPProgress').css('width', increamentPercent + pro+'%');
    $('#webPProgress').attr('data-width', increamentPercent + pro);
    $('.progressbar-text').show();
    if (realGenerated == 0) {
        $('#webPProgress').css('width', '100%');
        $('.progress-text-webp').text(100);

        $.growl.notice({
            title: "",
            size: "large",
            message: success_generate
        });
        // window.location.reload();
    } else {
        $('#deleteImagesBtn').attr('disabled','disabled');
        $('#convertImagesBtn').attr('disabled','disabled');
    }

    return realGenerated;
}

function toggleFormGroups() {
    let show_image_in_webp = $('input[name="WK_WEBP_ENABLE_MODULE"]:checked').val();
    let form_groups_logo = $(".wk-shop-logo");
    if (show_image_in_webp == "1") {
        form_groups_logo.show();
    } else {
        form_groups_logo.hide();
    }
}
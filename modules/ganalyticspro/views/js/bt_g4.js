/**
 * Google Analytics : GA4 and Universal-Analytics
 *
 * @author    businesstech.fr <modules@businesstech.fr> - https://www.businesstech.fr/
 * @copyright Business Tech - https://www.businesstech.fr/
 * @license   see file: LICENSE.txt
 *
 *           ____    _______
 *          |  _ \  |__   __|
 *          | |_) |    | |
 *          |  _ <     | |
 *          | |_) |    | |
 *          |____/     |_|
 */

$(document).ready(function () {

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    // Use case consent mode
    if (btGapTag.bUseConsent == true) {

        // Handle the consent on click
        function handleConsent() {
            $.ajax({
                type: "POST",
                url: btGapTag.ajaxUrl,
                dataType: "json",
                data: {
                    ajax: 1,
                    action: "updateConsent",
                    token: btGapTag.token,
                },
                success: function (jsonData, textStatus, jqXHR) {
                    // Use case to send directly the event after the ajax and not wait the page reload
                    // Init the tag after the consent
                    gtag("js", new Date());
                    gtag("config", btGapTag.gaId, {
                        'cookie_update': false
                    });

                    gtag("consent", "default", {
                        ad_storage: "granted",
                        analytics_storage: "granted",
                    });

                    if (btGapTag.bEnableUa != false && btGapTag.sUAcode != "") {
                        gtag("config", btGapTag.sUAcode);
                    }
                },
            });
        }

        // use case not consent has been done
        if (btGapTag.iConsentConsentLvl == 0) {

            gtag("js", new Date());
            gtag("config", btGapTag.gaId);

            gtag("consent", "default", {
                ad_storage: "denied",
                analytics_storage: "denied",
            });

            if (btGapTag.referer != null) {
                gtag('set', 'page_referrer', btGapTag.referer);
            }

            if (btGapTag.bEnableUa != false && btGapTag.sUAcode != "") {
                gtag("config", btGapTag.sUAcode);
            }

        } else if (btGapTag.iConsentConsentLvl == 1) {
            gtag("js", new Date());
            gtag("config", btGapTag.gaId);

            gtag("consent", "default", {
                ad_storage: "denied",
                analytics_storage: "granted",
            });

            if (btGapTag.referer != null) {
                gtag('set', 'page_referrer', btGapTag.referer);
            }

            if (btGapTag.bEnableUa != false && btGapTag.sUAcode != "") {
                gtag("config", btGapTag.sUAcode);
            }

        } else if (btGapTag.iConsentConsentLvl == 2) {

            gtag("js", new Date());
            gtag("config", btGapTag.gaId);

            gtag("consent", "default", {
                ad_storage: "granted",
                analytics_storage: "denied",
            });

            if (btGapTag.referer != null) {
                gtag('set', 'page_referrer', btGapTag.referer);
            }

            if (btGapTag.bEnableUa != false && btGapTag.sUAcode != "") {
                gtag("config", btGapTag.sUAcode);
            }

        } else if (btGapTag.iConsentConsentLvl == 3) {

            gtag("js", new Date());
            gtag("config", btGapTag.gaId);

            gtag("consent", "default", {
                ad_storage: "granted",
                analytics_storage: "granted",
            });

            if (btGapTag.referer != null) {
                gtag('set', 'page_referrer', btGapTag.referer);
            }

            if (btGapTag.bEnableUa != false && btGapTag.sUAcode != "") {
                gtag("config", btGapTag.sUAcode);
            }
        }

        // Use case to delete acb cookie referrer
        if (btGapTag.acbIsInstalled == true) {
            $.ajax({
                type: "POST",
                url: btGapTag.ajaxUrl,
                dataType: "json",
                data: {
                    ajax: 1,
                    action: "removedAcbReferrer",
                    token: btGapTag.token,
                },
            });
        }

        // use case trigger click on accept cookies
        if (btGapTag.bConsentHtmlElement != "") {
            $(btGapTag.bConsentHtmlElement).on("click", function (event) {
                handleConsent();
            });
        }
        // use case trigger click on accept cookies
        if (btGapTag.bConsentHtmlElementSecond != "") {
            $(btGapTag.bConsentHtmlElementSecond).on("click", function (event) {
                handleConsent();
            });
        }
    } else {
        gtag("js", new Date());
        gtag("config", btGapTag.gaId);

        gtag("consent", "default", {
            ad_storage: "granted",
            analytics_storage: "granted",
        });

        if (btGapTag.bEnableUa != false && btGapTag.sUAcode != "") {
            gtag("config", btGapTag.sUAcode);
        }
    }

    // if refund has been detected
    if (btGapTag.bRefund == true) {
        $.ajax({
            type: "POST",
            url: btGapTag.ajaxUrl,
            dataType: "json",
            data: {
                ajax: 1,
                action: "sendRefund",
                token: btGapTag.token,
            },
            success: function (jsonData, textStatus, jqXHR) {
                jsonData.refunds.forEach(function (data) {
                    gtag("event", "refund", {
                        currency: "" + data.currency + "",
                        value: data.value,
                        transaction_id: data.transaction_id,
                        // coupon: jsonData.coupon,
                        shipping: data.shipping,
                        shipping: data.tax,
                    });
                });
            },
        });
    }

    // Use case for partial refund
    if (btGapTag.bPartialRefund == true) {
        $.ajax({
            type: "POST",
            url: btGapTag.ajaxUrl,
            dataType: "json",
            data: {
                ajax: 1,
                action: "sendPartialRefund",
                token: btGapTag.token,
            },
            success: function (jsonData, textStatus, jqXHR) {
                jsonData.refunds_partial.forEach(function (data) {
                    if (data.has_product == false) {
                        gtag("event", "refund", {
                            currency: "" + data.refund_data.currency + "",
                            value: data.refund_data.value,
                            transaction_id: data.refund_data.transaction_id,
                            shipping: data.refund_data.shipping,
                            shipping: data.refund_data.tax,
                        });
                    } else {
                        gtag("event", "refund", {
                            currency: "" + data.refund_data.currency + "",
                            value: data.refund_data.value,
                            transaction_id: data.refund_data.transaction_id,
                            shipping: data.refund_data.shipping,
                            shipping: data.refund_data.tax,
                            items: data.product,
                        });
                    }
                });
            },
        });
    }

    if (typeof btGapTag.tagContent.tracking_type !== "undefined" && typeof btGapTag.tagContent.contents !== "undefined") {
        // Handle the case for category page
        if (btGapTag.tagContent.tracking_type.value == "view_item_list") {
            let aData = [];
            if (btGapTag.tagContent.contents.value != []) {
                btGapTag.tagContent.contents.value.forEach(function (data) {
                    aData.push(data);
                });
            }

            gtag("event", "view_item_list", {
                item_list_id: "" + btGapTag.tagContent.content_name.value + "",
                item_list_name: "" + btGapTag.tagContent.content_name.value + "",
                items: aData,
            });

            // Use case click on product on page list
            $(btGapTag.elementCategoryProduct).each(function (index) {
                $(this).on("click", function (event) {
                    $.ajax({
                        type: "POST",
                        url: btGapTag.ajaxUrl,
                        dataType: "json",
                        data: {
                            ajax: 1,
                            action: "selectItem",
                            iProductId: $(this).attr("data-id-product"),
                            token: btGapTag.token,
                        },
                        success: function (jsonData, textStatus, jqXHR) {
                            gtag("event", "select_item", {
                                item_list_id: "" + btGapTag.tagContent.content_name.value + "",
                                item_list_name: "" + btGapTag.tagContent.content_name.value + "",
                                items: jsonData.data,
                            });
                        },
                    });
                });
            });

            // Use case add to wish list for page list pages
            $(btGapTag.elementWishCat).each(function (index) {
                $(this).on("click", function (event) {
                    $.ajax({
                        type: "POST",
                        url: btGapTag.ajaxUrl,
                        dataType: "json",
                        data: {
                            ajax: 1,
                            action: "selectItem",
                            iProductId: $(this).attr("data-id-product"),
                            token: btGapTag.token,
                        },
                        success: function (jsonData, textStatus, jqXHR) {
                            gtag("event", "add_to_wishlist", {
                                item_list_id: "" + btGapTag.tagContent.content_name.value + "",
                                item_list_name: "" + btGapTag.tagContent.content_name.value + "",
                                items: jsonData.data,
                            });
                        },
                    });
                });
            });
        }

        // Handle the product page tag
        if (btGapTag.tagContent.tracking_type.value == "view_item") {
            let aData = [];
            btGapTag.tagContent.contents.value.forEach(function (data) {
                aData.push(data);
            });

            gtag("event", "view_item", {
                currency: "" + btGapTag.tagContent.currency.value + "",
                value: btGapTag.tagContent.value.value,
                items: aData,
            });

            $(btGapTag.elementWishProd).on("click", function (event) {
                gtag("event", "add_to_wishlist", {
                    currency: "" + btGapTag.tagContent.currency.value + "",
                    value: btGapTag.tagContent.value.value,
                    items: aData,
                });
            });
        }

        if (typeof prestashop !== 'undefined') {
            prestashop.on(
                'updatedProduct',
                function (event) {
                    if (event) {
                        $.ajax({
                            type: "POST",
                            url: btGapTag.ajaxUrl,
                            dataType: "json",
                            data: {
                                ajax: 1,
                                action: "updateCombination",
                                id_product_attribute: event.id_product_attribute,
                                id_product: $('input[name="id_product"').val(),
                                token: btGapTag.token,
                            },
                            success: function (jsonData, textStatus, jqXHR) {
                                gtag("event", "view_item", {
                                    currency: "" + jsonData.currency + "",
                                    value: jsonData.value,
                                    items: jsonData.data,
                                });
                            },
                        });
                    }
                }
            );

            prestashop.on(
                'clickQuickView',
                function (event) {
                    if (event) {
                        $.ajax({
                            type: "POST",
                            url: btGapTag.ajaxUrl,
                            dataType: "json",
                            data: {
                                ajax: 1,
                                action: "updateQuickView",
                                id_product_attribute: event.dataset.idProductAttribute,
                                id_product: event.dataset.idProduct,
                                token: btGapTag.token,
                            },
                            success: function (jsonData, textStatus, jqXHR) {
                                gtag("event", "view_item", {
                                    currency: "" + jsonData.currency + "",
                                    value: jsonData.value,
                                    items: jsonData.data,
                                });
                            },
                        });
                    }
                }
            );
        }

        if (typeof prestashop !== 'undefined') {
            prestashop.on(
                'updateCart',
                function (event) {
                    if (event && event.reason && event.reason.linkAction == "add-to-cart") {
                        $.ajax({
                            type: "POST",
                            url: btGapTag.ajaxUrl,
                            dataType: "json",
                            data: {
                                ajax: 1,
                                action: "cartPageList",
                                id_product: event.reason.idProduct,
                                id_product_attribute: event.reason.idProductAttribute,
                                token: btGapTag.token,
                            },
                            success: function (jsonData, textStatus, jqXHR) {
                                gtag("event", "add_to_cart", {
                                    currency: "" + jsonData.currency + "",
                                    value: jsonData.value,
                                    items: jsonData.data,
                                });
                            },
                        });
                    }
                }
            );
        }

        if (typeof prestashop !== 'undefined') {
            prestashop.on(
                'updateCart',
                function (event) {
                    if (event && event.reason && event.reason.linkAction == "delete-from-cart") {
                        $.ajax({
                            type: "POST",
                            url: btGapTag.ajaxUrl,
                            dataType: "json",
                            data: {
                                ajax: 1,
                                action: "removeCart",
                                iProductId: event.reason.idProduct,
                                token: btGapTag.token,
                            },
                            success: function (jsonData, textStatus, jqXHR) {
                                gtag("event", "remove_from_cart", {
                                    currency: "" + jsonData.currency + "",
                                    value: jsonData.value,
                                    items: jsonData.data,
                                });
                            },
                        });
                    }
                }
            );
        }

        // Handle the promotion category page
        if (btGapTag.tagContent.tracking_type.value == "view_promotion") {
            let aData = [];
            btGapTag.tagContent.contents.value.forEach(function (data) {
                aData.push(data);
            });

            gtag("event", "view_promotion", {
                item_list_id: "" + btGapTag.tagContent.content_name.value + "",
                item_list_name: "" + btGapTag.tagContent.content_name.value + "",
                items: aData,
            });

            // Use case click on product on page list
            $(btGapTag.elementCategoryProduct).each(function (index) {
                $(this).on("click", function (event) {
                    $.ajax({
                        type: "POST",
                        url: btGapTag.ajaxUrl,
                        dataType: "json",
                        data: {
                            ajax: 1,
                            action: "selectPromotion",
                            iProductId: $(this).attr("data-id-product"),
                            token: btGapTag.token,
                        },
                        success: function (jsonData, textStatus, jqXHR) {
                            gtag("event", "select_promotion", {
                                item_list_id: "" + btGapTag.tagContent.content_name.value + "",
                                item_list_name: "" + btGapTag.tagContent.content_name.value + "",
                                items: jsonData.data,
                            });
                        },
                    });
                });
            });
        }

        //Handle the add to Cart page
        if (typeof btGapTag.tagContent.contents !== "undefined") {
            if (btGapTag.tagContent.tracking_type.value == "view_cart") {
                let aData = [];
                btGapTag.tagContent.contents.value.forEach(function (data) {
                    aData.push(data);
                });

                gtag("event", "view_cart", {
                    currency: "" + btGapTag.tagContent.currency.value + "",
                    value: btGapTag.tagContent.value.value,
                    items: aData,
                });
            }
        }

        // Use case begin checkout
        if (btGapTag.tagContent.tracking_type.value == "begin_checkout") {
            let aData = [];
            if (btGapTag.tagContent.contents.value != []) {
                btGapTag.tagContent.contents.value.forEach(function (data) {
                    aData.push(data);
                });
            }

            gtag("event", "begin_checkout", {
                currency: "" + btGapTag.tagContent.currency.value + "",
                value: btGapTag.tagContent.value.value,
                coupon: btGapTag.tagContent.coupon_name.value,
                items: aData,
            });
        }

        // Use case add shipping
        if (btGapTag.tagContent.tracking_type.value == "add_shipping_info") {
            let aData = [];
            var carrier = "";

            if (btGapTag.tagContent.contents.value != []) {
                btGapTag.tagContent.contents.value.forEach(function (data) {
                    aData.push(data);
                });
            }

            // Handle the carrier data for tag on click update
            $(btGapTag.elementShipping).each(function (index) {
                $(this).on("click", function (event) {
                    $.ajax({
                        type: "POST",
                        url: btGapTag.ajaxUrl,
                        dataType: "json",
                        data: {
                            ajax: 1,
                            action: "sendCarrier",
                            idCarrier: $(this).val(),
                            token: btGapTag.token,
                        },
                        success: function (jsonData, textStatus, jqXHR) {
                            gtag("event", "add_shipping_info", {
                                currency: "" + btGapTag.tagContent.currency.value + "",
                                value: btGapTag.tagContent.value.value,
                                coupon: btGapTag.tagContent.coupon_name.value,
                                shipping_tier: jsonData.sCarrierName,
                                items: aData,
                            });
                        },
                    });
                });
            });

            // Send the default carrier on the page load
            $.ajax({
                type: "POST",
                url: btGapTag.ajaxUrl,
                dataType: "json",
                data: {
                    ajax: 1,
                    action: "sendCarrier",
                    idCarrier: $(btGapTag.elementShipping + ":checked").val(),
                    token: btGapTag.token,
                },
                success: function (jsonData, textStatus, jqXHR) {
                    gtag("event", "add_shipping_info", {
                        currency: "" + btGapTag.tagContent.currency.value + "",
                        value: btGapTag.tagContent.value.value,
                        coupon: btGapTag.tagContent.coupon_name.value,
                        shipping_tier: jsonData.sCarrierName,
                        items: aData,
                    });
                },
            });
        }

        // Use case add payment method
        if (btGapTag.tagContent.tracking_type.value == "add_payment_info") {
            let aData = [];
            if (btGapTag.tagContent.contents.value != []) {
                btGapTag.tagContent.contents.value.forEach(function (data) {
                    aData.push(data);
                });
            }

            // Handle the carrier data for tag on click update
            $(btGapTag.elementPayment).each(function (index) {
                $(this).on("click", function (event) {
                    gtag("event", "add_payment_info", {
                        currency: "" + btGapTag.tagContent.currency.value + "",
                        value: btGapTag.tagContent.value.value,
                        coupon: btGapTag.tagContent.coupon_name.value,
                        payment_type: $('label[for="' + $(this).attr("id") + '"]')
                            .text()
                            .trim(),
                        items: aData,
                    });
                });
            });
        }

        // Use case purchase event

        if (btGapTag.tagContent.tracking_type.value == "purchase") {
            let aData = [];
            if (btGapTag.tagContent.contents.value != []) {
                btGapTag.tagContent.contents.value.forEach(function (data) {
                    aData.push(data);
                });
            }

            gtag("event", "purchase", {
                currency: "" + btGapTag.tagContent.currency.value + "",
                value: btGapTag.tagContent.value.value,
                transaction_id: btGapTag.tagContent.content_id.value,
                coupon: btGapTag.tagContent.coupon_name.value,
                shipping: btGapTag.tagContent.value_shipping.value,
                tax: btGapTag.tagContent.value_tax.value,
                items: aData,
            });
        }

        // Use case generate_lead
        if (btGapTag.tagContent.tracking_type.value == "generate_lead") {
            gtag("event", "generate_lead");
        }

        // Use case generate_lead
        if (btGapTag.tagContent.tracking_type.value == "search") {
            gtag("event", "search", {
                search_term: btGapTag.tagContent.content_name.value,
            });
        }

        $(btGapTag.elementlogin).on("click", function (event) {
            gtag("event", "login", {
                method: "Website direct",
            });
        });

        $(btGapTag.elementsignup).on("click", function (event) {
            gtag("event", "sign_up", {
                method: "Website direct",
            });
        });

        $("video.pvr-video-player").each(function (index) {
            $(this).on("click", function (event) {
                gtag("event", "video_start");
            });
        });
    }
});

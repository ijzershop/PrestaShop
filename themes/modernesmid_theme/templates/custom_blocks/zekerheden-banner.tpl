<div class="container {if Configuration::get('MSTHEMECONFIG_FIRST_BOX_ACTIVE', true) || Configuration::get('MSTHEMECONFIG_SECOND_BOX_ACTIVE', true) || Configuration::get('MSTHEMECONFIG_THIRD_BOX_ACTIVE', true) || Configuration::get('MSTHEMECONFIG_FOURTH_BOX_ACTIVE', true) || Configuration::get('MSTHEMECONFIG_FIFTH_BOX_ACTIVE', true)}border-bottom pb-4 mt-4 {/if}">
    <div class="row">
        <div class="col-md-12">
            <div class="row hidden-md-down zekerheden-banner-container">
                <!-- Levering -->
                {if Configuration::get('MSTHEMECONFIG_FIRST_BOX_ACTIVE', true)}
                <div class="col certainty">
                    <div class="row">
                        <div class="pr-0 certainty-icon text-right pl-0">
                            <a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_FIRST_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}" class="zekerheden-banner-img" title="{Configuration::get('MSTHEMECONFIG_BANNER_FIRST_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}">
                                <img rel="preload" is="image" data-src="https://ijzershop.nl/upload/{Configuration::get('MSTHEMECONFIG_BANNER_FIRST_IMAGE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" alt="{Configuration::get('MSTHEMECONFIG_BANNER_FIRST_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" class="hover_effect_target img-fluid lazyload"/>
                            </a>
                        </div>
                        <div class="col-8 pl-0 pr-0 certainty-text">
                            <div class="sttext_item_content">
                                <span>
                                    <span>
                                        <a class="text-decoration-none" href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_FIRST_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}">
                                            <span class="zekerheden-banner-text text-dark">{Configuration::get('MSTHEMECONFIG_BANNER_FIRST_TEXT',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}</span>
                                        </a>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/if}
                <!-- Levering -->
                {if Configuration::get('MSTHEMECONFIG_SECOND_BOX_ACTIVE', true)}
                <div class="col certainty">
                    <div class="row">
                        <div class="pr-0 certainty-icon text-right">
                            <a href="/{Configuration::get('MSTHEMECONFIG_BANNER_SECOND_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" class="zekerheden-banner-img" title="{Configuration::get('MSTHEMECONFIG_BANNER_SECOND_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}">
                                <img rel="preload" is="image" data-src="https://ijzershop.nl/upload/{Configuration::get('MSTHEMECONFIG_BANNER_SECOND_IMAGE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" alt="{Configuration::get('MSTHEMECONFIG_BANNER_SECOND_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" class="hover_effect_target img-fluid lazyload"/>
                            </a>
                        </div>
                        <div class="col-8 pl-0 pr-0 certainty-text">
                            <div class="sttext_item_content">
                                <span>
                                    <span>
                                        <a class="text-decoration-none" href="/{Configuration::get('MSTHEMECONFIG_BANNER_SECOND_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}">
                                            <span class="zekerheden-banner-text text-dark">{Configuration::get('MSTHEMECONFIG_BANNER_SECOND_TEXT',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}</span>
                                        </a>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/if}
                <!-- Diensten -->
                {if Configuration::get('MSTHEMECONFIG_THIRD_BOX_ACTIVE', true)}
                <div class="col certainty">
                    <div class="row">
                        <div class="pr-0 certainty-icon text-right">
                            <a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_THIRD_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}" class="zekerheden-banner-img" title="{Configuration::get('MSTHEMECONFIG_BANNER_THIRD_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}">
                                <img rel="preload" is="image" data-src="https://ijzershop.nl/upload/{Configuration::get('MSTHEMECONFIG_BANNER_THIRD_IMAGE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" alt="{Configuration::get('MSTHEMECONFIG_BANNER_THIRD_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" class="hover_effect_target img-fluid lazyload"/>
                            </a>
                        </div>
                        <div class="col-8 pl-0 pr-0 certainty-text">
                            <div class="sttext_item_content">
                                <span>
                                    <span>
                                        <a class="text-decoration-none" href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_THIRD_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}">
                                            <span class="zekerheden-banner-text text-dark">{Configuration::get('MSTHEMECONFIG_BANNER_THIRD_TEXT',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}</span>
                                        </a>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/if}
                <!-- Verzending -->
                {if Configuration::get('MSTHEMECONFIG_FOURTH_BOX_ACTIVE', true)}
                <div class="col certainty">
                    <div class="row">
                        <div class="pr-0 certainty-icon text-right">
                            {* TODO add shippinng method selet to template module, get visitor carrier and set shipping price *}
                            {assign var="transmissionCarrier" value=Carrier::getCarrierByReference(2,Context::getContext()->cookie->id_lang)}
                            {* By changing zone the banner item gets updated belgium is 9, Germany 10 *}
                          {if Context::getContext()->country->id_country === '3'}
                              {assign var="customerCountry" value="België"}
                          {else}
                              {assign var="customerCountry" value="Nederland"}
                          {/if}
                                    {if Context::getContext()->cookie->price_vat_settings_incl === "true"}
                                        {assign var="defaultShippingPrice" value=$transmissionCarrier->getMaxDeliveryPriceByPrice(Context::getContext()->country->id_zone)*1.21}
                                        {assign var="shippingPrice" value=number_format(Tools::convertPrice($defaultShippingPrice),0,',','.')}
                                    {else}
                                        {assign var="defaultShippingPrice" value=$transmissionCarrier->getMaxDeliveryPriceByPrice(Context::getContext()->country->id_zone)}
                                        {assign var="shippingPrice" value=number_format(Tools::convertPrice($defaultShippingPrice),2,',','.')}
                                    {/if}

                                    {if is_array($customerCountry)}
                                        {assign var="customerCountry" value=$customerCountry[1]}
                                    {/if}
                            <a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}" class="zekerheden-banner-img" title="{sprintf(Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id), $customerCountry, $shippingPrice)}">
                                <img rel="preload" is="image" data-src="https://ijzershop.nl/upload/{Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_IMAGE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" alt="{sprintf(Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id), $customerCountry, $shippingPrice)}" class="hover_effect_target img-fluid lazyload"/>
                            </a>
                        </div>
                        <div class="col-8 pl-0 pr-0 certainty-text">
                            <div class="sttext_item_content">
                                <span>
                                    <span>
                                        <a class="text-decoration-none" href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}">
                                            <span class="zekerheden-banner-text text-dark">
                                            {sprintf(Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_TEXT',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id), $customerCountry, $shippingPrice)}</span>
                                        </a>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/if}
                <!-- Advies -->
                {if Configuration::get('MSTHEMECONFIG_FIFT_BOX_ACTIVE', true)}
                <div class="col certainty">
                    <div class="row">
                        <div class="pr-0 certainty-icon text-right">
                            <a href="/{Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" class="zekerheden-banner-img" title="{Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}">
                                <img rel="preload" is="image" data-src="https://ijzershop.nl/upload/{Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_IMAGE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" alt="{Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" class="hover_effect_target img-fluid lazyload"/>
                            </a>
                        </div>
                        <div class="col-8 pl-0 pr-0 certainty-text">
                            <div class="sttext_item_content">
                                <span>
                                    <span>
                                        <a class="text-decoration-none" href="/{Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}">
                                            <span class="zekerheden-banner-text text-dark">{Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_TEXT',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}</span>
                                        </a>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
              {/if}
            </div>
        </div>
    </div>
</div>

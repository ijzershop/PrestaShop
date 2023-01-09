<div class="container {if Configuration::get('MSTHEMECONFIG_FIRST_BOX_ACTIVE', true) || Configuration::get('MSTHEMECONFIG_SECOND_BOX_ACTIVE', true) || Configuration::get('MSTHEMECONFIG_THIRD_BOX_ACTIVE', true) || Configuration::get('MSTHEMECONFIG_FOURTH_BOX_ACTIVE', true) || Configuration::get('MSTHEMECONFIG_FIFTH_BOX_ACTIVE', true)}border-bottom pb-4 mt-4 {/if}">
    <div class="row">
        <div class="col-md-12">
            <div class="row hidden-md-down zekerheden-banner-container">
                <!-- Levering -->
                {if Configuration::get('MSTHEMECONFIG_FIRST_BOX_ACTIVE', true)}
                <div class="col certainty">
                    <div class="row">
                        <div class="col-4 pr-0 certainty-icon">
                            <a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_FIRST_LINK'))}" class="zekerheden-banner-img" title="{Configuration::get('MSTHEMECONFIG_BANNER_FIRST_TITLE')}">
                                <img rel="preload" is="image" src="/upload/{Configuration::get('MSTHEMECONFIG_BANNER_FIRST_IMAGE')}" alt="{Configuration::get('MSTHEMECONFIG_BANNER_FIRST_TITLE')}" class="hover_effect_target img-fluid">
                            </a>
                        </div>
                        <div class="col-8 pl-0 pr-0 certainty-text">
                            <div class="sttext_item_content">
                                <span>
                                    <span>
                                        <a class="text-decoration-none" href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_FIRST_LINK'))}">
                                            <span class="zekerheden-banner-text text-dark">{Configuration::get('MSTHEMECONFIG_BANNER_FIRST_TEXT')}</span>
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
                        <div class="col-4 pr-0 certainty-icon">
                            <a href="/{Configuration::get('MSTHEMECONFIG_BANNER_SECOND_LINK')}" class="zekerheden-banner-img" title="{Configuration::get('MSTHEMECONFIG_BANNER_SECOND_TITLE')}">
                                <img rel="preload" is="image" src="/upload/{Configuration::get('MSTHEMECONFIG_BANNER_SECOND_IMAGE')}" alt="{Configuration::get('MSTHEMECONFIG_BANNER_SECOND_TITLE')}" class="hover_effect_target img-fluid">
                            </a>
                        </div>
                        <div class="col-8 pl-0 pr-0 certainty-text">
                            <div class="sttext_item_content">
                                <span>
                                    <span>
                                        <a class="text-decoration-none" href="/{Configuration::get('MSTHEMECONFIG_BANNER_SECOND_LINK')}">
                                            <span class="zekerheden-banner-text text-dark">{Configuration::get('MSTHEMECONFIG_BANNER_SECOND_TEXT')}</span>
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
                        <div class="col-4 pr-0 certainty-icon">
                            <a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_THIRD_LINK'))}" class="zekerheden-banner-img" title="{Configuration::get('MSTHEMECONFIG_BANNER_THIRD_TITLE')}">
                                <img rel="preload" is="image" src="/upload/{Configuration::get('MSTHEMECONFIG_BANNER_THIRD_IMAGE')}" alt="{Configuration::get('MSTHEMECONFIG_BANNER_THIRD_TITLE')}" class="hover_effect_target img-fluid">
                            </a>
                        </div>
                        <div class="col-8 pl-0 pr-0 certainty-text">
                            <div class="sttext_item_content">
                                <span>
                                    <span>
                                        <a class="text-decoration-none" href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_THIRD_LINK'))}">
                                            <span class="zekerheden-banner-text text-dark">{Configuration::get('MSTHEMECONFIG_BANNER_THIRD_TEXT')}</span>
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
                        <div class="col-4 pr-0 certainty-icon">
                            {* TODO add shippinng method selet to template module, get visitor carrier and set shipping price *}
                            {assign var="transmissionCarrier" value=Carrier::getCarrierByReference(2,Context::getContext()->cookie->id_lang)}
                            {* By changing zone the banner item gets updated belgium is 9, Germany 10 *}
                                {assign var="customerCountry" value=Context::getContext()->country->name}
                                {assign var="defaultShippingPrice" value=$transmissionCarrier->getMaxDeliveryPriceByPrice(Context::getContext()->country->id_zone)}
                                    {if is_array($customerCountry)}
                                        {assign var="customerCountry" value=$customerCountry[1]}
                                    {/if}
                            <a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_LINK'))}" class="zekerheden-banner-img" title="{sprintf(Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_TITLE'), $customerCountry, number_format(Tools::convertPrice($defaultShippingPrice),2,',','.'))}">
                                <img rel="preload" is="image" src="/upload/{Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_IMAGE')}" alt="{sprintf(Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_TITLE'), $customerCountry, number_format(Tools::convertPrice($defaultShippingPrice),2,',','.'))}" class="hover_effect_target img-fluid">
                            </a>
                        </div>
                        <div class="col-8 pl-0 pr-0 certainty-text">
                            <div class="sttext_item_content">
                                <span>
                                    <span>
                                        <a class="text-decoration-none" href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_LINK'))}">
                                            <span class="zekerheden-banner-text text-dark">
                                        {sprintf(Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_TEXT'), $customerCountry, number_format(Tools::convertPrice($defaultShippingPrice),2,',','.'))}</span>
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
                        <div class="col-4 pr-0 certainty-icon">
                            <a href="/{Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_LINK')}" class="zekerheden-banner-img" title="{Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_TITLE')}">
                                <img rel="preload" is="image" src="/upload/{Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_IMAGE')}" alt="{Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_TITLE')}" class="hover_effect_target img-fluid">
                            </a>
                        </div>
                        <div class="col-8 pl-0 pr-0 certainty-text">
                            <div class="sttext_item_content">
                                <span>
                                    <span>
                                        <a class="text-decoration-none" href="/{Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_LINK')}">
                                            <span class="zekerheden-banner-text text-dark">{Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_TEXT')}</span>
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

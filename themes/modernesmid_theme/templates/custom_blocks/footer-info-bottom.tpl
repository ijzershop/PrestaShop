<div class="container mt-4 mb-4 pl-0 pr-0">
    <div class="row">
            <section class="d-none d-sm-none d-md-flex col-12">
                    <!-- MODULE st easy content -->
                    <div class="row d-sm-none d-md-flex mx-auto w-100">
                    {if Configuration::get('MSTHEMECONFIG_FIRST_FOOTERBOTTOM_BOX_ACTIVE', true)}
                        <div class="col">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-4 pr-0 certainty-icon text-right">
                                                <a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIRST_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}" class="footer-info-bottom-icon text-decoration-none" title="{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIRST_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}">
                                                    <img rel="preload" is="image" data-src="{{$urls.base_url}}upload/{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIRST_IMAGE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" alt="{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIRST_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" class="hover_effect_target img-fluid lazyload">
                                                </a>
                                            </div>
                                            <div class="col-8 pl-0 certainty-text">
                                                <a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIRST_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}" class="footer-info-bottom-icon text-decoration-none" title="{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIRST_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}">
                                                    <span style="color: #777777;">{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIRST_TEXT',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                      {/if}
                    {if Configuration::get('MSTHEMECONFIG_SECOND_FOOTERBOTTOM_BOX_ACTIVE', true)}
                        <div class="col">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-4 pr-0 certainty-icon text-right">
                                                <a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_SECOND_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}" class="footer-info-bottom-icon text-decoration-none" title="{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_SECOND_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}">
                                                    <img rel="preload" is="image" data-src="{{$urls.base_url}}upload/{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_SECOND_IMAGE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" alt="{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_SECOND_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" class="hover_effect_target img-fluid lazyload">
                                                </a>
                                            </div>
                                            <div class="col-8 pl-0 pr-0 certainty-text">
                                                <a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_SECOND_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}" class="footer-info-bottom-icon text-decoration-none" title="{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_SECOND_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}">
                                                    <span style="color: #777777;">{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_SECOND_TEXT',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    {/if}
                    {if Configuration::get('MSTHEMECONFIG_THIRD_FOOTERBOTTOM_BOX_ACTIVE', true)}
                        <div class="col">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-12 certainty-icon text-center">
                                                <a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_THIRD_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}" class="footer-info-bottom-icon text-decoration-none" title="{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_THIRD_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}">
                                                    <img rel="preload" is="image" data-src="{{$urls.base_url}}upload/{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_THIRD_IMAGE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" alt="{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_THIRD_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" class="hover_effect_target img-fluid lazyload">
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    {/if}
                    {if Configuration::get('MSTHEMECONFIG_FOURTH_FOOTERBOTTOM_BOX_ACTIVE', true)}
                      <div class="col">
                        <div class="row">
                          <div class="col-12">
                            <div class="row">
                              <div class="col-12 certainty-icon text-center">
                                <a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FOURTH_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}" class="footer-info-bottom-icon text-decoration-none" title="{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FOURTH_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}">
                                  <img style="opacity:.8;" rel="preload" is="image" data-src="{{$urls.base_url}}upload/{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FOURTH_IMAGE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" alt="{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FOURTH_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" class="hover_effect_target img-fluid lazyload">
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    {/if}
                    {if Configuration::get('MSTHEMECONFIG_FIFTH_FOOTERBOTTOM_BOX_ACTIVE', true)}
                        <div class="col">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-4 pr-0 certainty-icon text-right">
                                                <a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}" class="footer-info-bottom-icon text-decoration-none" title="{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}">
                                                    <img rel="preload" is="image" data-src="{{$urls.base_url}}upload/{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_IMAGE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" alt="{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" class="hover_effect_target img-fluid lazyload">
                                                </a>
                                            </div>
                                            <div class="col-8 pl-0 pr-0 certainty-text">
                                                <a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_LINK',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}" class="footer-info-bottom-icon text-decoration-none" title="{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_TITLE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}">
                                                    <span style="color: #777777;">{Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_TEXT',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    {/if}
                    </div>
            </section>
    </div>
</div>

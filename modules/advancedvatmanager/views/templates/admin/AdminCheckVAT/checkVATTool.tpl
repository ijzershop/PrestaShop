{**
 * 2017-2023 liewebs - Prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2023 www.liewebs.com - Liewebs
 * 	@module Advanced VAT Manager
 *}

<div id="checkVAT_container" class="panel col-lg-12">
    <div class="panel-heading">
        <i class="fal fa-shield-check"></i> <span class="panel-heading-title">{l s='Check VAT Tool' mod='advancedvatmanager'}</span>
    </div>
    <div class="row col-lg-12">
        <p class="checkVAT_description">{l s='You can check VAT numbers in VIES, GOV.UK or Norway system through this utility. If the VAT number is valid, you will get all the information related to the registration of this VAT number (Company name, address...).' mod='advancedvatmanager'}</p>
        <br />
        <div class="checkVAT_container">
            <div class="col-lg-3 checkVAT_form">
                <div class="form-group">
                    <label for="vat_number"><i class="fal fa-id-card"></i> {l s='VAT number' mod='advancedvatmanager'}</label>
                    <input type="text" class="form-control" name="vat_number" id="vat_number" aria-describedby="vat_number" placeholder="{l s='Insert VAT number...' mod='advancedvatmanager'}">
                    <small id="field_desc" class="form-text text-muted"></small>
                </div>
                <label for="vat_select">{l s='Select type of number:' mod='advancedvatmanager'}</label>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="vat_select" id="eu_uk_vat" value="eu_uk_vat">
                  <label class="form-check-label" for="eu_uk_vat">{l s='European or UK VAT number' mod='advancedvatmanager'}</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="vat_select" id="norw_vat" value="norw_vat">
                  <label class="form-check-label" for="norw_vat">{l s='Norway company identification number' mod='advancedvatmanager'}</label>
                </div>
                <br />
                <button id="checkVAT_btn" class="btn btn-info"><i class="fal fa-check-circle"></i> {l s='Check VAT' mod='advancedvatmanager'}</button>
            </div>
            <div class="col-lg-9 checkVAT_results_container" style="padding-left: 50px;">
                <div style="display:none;" class="loading_container">
                    <div class="loader_center"></div>
                    <h4>{l s='Checking...' mod='advancedvatmanager'}</h4>
                </div>
            
                <div style="display:none" class="vat-result">
                    <div style="display:none" class="valid"><i class="far fa-check-circle"></i> <span class="valid_message"></span></div>
                    <div style="display:none" class="invalid"><i class="far fa-times-circle"></i> <span class="invalid_message"></span></div>            
                    <table class="table table-striped">
                        <tbody>
                            <tr>
                                <td><span class="title_list">{l s='VAT number:' mod='advancedvatmanager'}</span></td>
                                <td><span class="vat_number"></span></td>
                            </tr>
                            <tr>
                                <td><span class="title_list">{l s='Country ISO:' mod='advancedvatmanager'}</span></td>
                                <td><span class="country_iso"></span></td>
                            </tr>
                            <tr>
                                <td><span class="title_list">{l s='Country:' mod='advancedvatmanager'}</span></td>
                                <td><span class="country"></span></td>
                            </tr>
                            <tr>
                                <td><span class="title_list">{l s='Company:' mod='advancedvatmanager'}</span></td>
                                <td><span class="company"></span></td>
                            </tr>
                            <tr>
                                <td><span class="title_list">{l s='Address:' mod='advancedvatmanager'}</span></td>
                                <td><span class="address"></span></td>
                            </tr>
                            <tr>
                                <td><span class="title_list">{l s='Website' mod='advancedvatmanager'}</span></td>
                                <td><span class="website"></span></td>
                            </tr>
                            <tr>
                                <td><span class="title_list">{l s='Request date:' mod='advancedvatmanager'}</span></td>
                                <td><span class="request_date"></span></td>
                            </tr>
                            <tr>
                                <td><span class="title_list">{l s='System:' mod='advancedvatmanager'}</span></td>
                                <td><span class="check_system"></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
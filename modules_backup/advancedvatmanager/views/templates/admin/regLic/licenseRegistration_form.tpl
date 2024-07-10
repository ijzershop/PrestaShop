{**
 * 2017-2022 liewebs - Prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2022 www.liewebs.com - Liewebs
 * 	@module Advanced VAT Manager
 *}
 
<div class="alert alert-info">
    {l s='By purchasing this module, you are subject to comply with the license policy of use. In the event that any type of fraud, piracy, or illegal action that violates the license is detected, we will immediately deactivate the license that is the object of the illegal action. Liewebs will reserve the right to take legal action depending on the severity of the action.' mod='advancedvatmanager'}<br /><br />
    {l s='You can read license conditions by clicking on following button:' mod='advancedvatmanager'}<br /><br />
    <button type="button" class="btn btn-default" data-toggle="modal" data-target="#licenseModal">{l s='License agreement' mod='advancedvatmanager'}</button>
</div>
<div class="panel licenseRegistrationForm">
    <h3><i class="fal fa-key"></i> {l s='Module activation' mod='advancedvatmanager'}</h3>
    <p>{l s='In order to use this module in your store, you have to activate the use license. Insert the license code you received when purchasing the product.' mod='advancedvatmanager'}</p>
    <p>{l s='Only one license can be registered per domain. If the license you want to use has already been registered on another domain, you will need to change the domain registration in your customer account from where you purchased the module. If you have any questions about licenses, you can contact our customer service by sending us an email to' mod='advancedvatmanager'} <a href="mailto:soporte@liewebs.com"><strong>soporte@liewebs.com</strong></a></p>
    <form action="" method="POST">
        <div class="row">
            <div class="form-group col-lg-4">
                <label for="license">{l s='LICENSE CODE' mod='advancedvatmanager'}</label>
                <input name="LWLicense" type="text" class="form-control" id="licenseRegistration" aria-describedby="license" placeholder="{l s='Enter code' mod='advancedvatmanager'}" maxlength="29" value="{Configuration::get('ADVANCEDVATMANAGER_LICENSE')}" required/>
                <small id="license" class="form-text text-muted">{l s='The license coder contains five series of five characters separated by hyphens. (Ex: XXXXX-XXXXX-XXXXX-XXXXX)' mod='advancedvatmanager'}</small>
            </div>
        </div>
        <div class="row">
            <button class="btn btn-primary" type="submit" name="submitLicenseRegistration" value="1"><i class="fal fa-key"></i>&nbsp;{l s='Register license' mod='advancedvatmanager'}</button>
        </div>
    </form>
</div>
<!-- Modal -->
<div class="modal fade" id="licenseModal" tabindex="-1" role="dialog" aria-labelledby="licenseModalTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
        {$license_content nofilter}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">{l s='Close' mod='advancedvatmanager'}</button>
      </div>
    </div>
  </div>
</div>
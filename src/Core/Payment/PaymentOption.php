<?php
/**
 * 2007-2015 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2015 PrestaShop SA
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
namespace PrestaShop\PrestaShop\Core\Payment;

/**
 * We define 4 types of payment options:
 *
 * - the "offline" kind: simple URL to call + information to display (e.g. bankwire, cheque)
 * - the "external" kind: simple URL to call, but payment processed on PSP's website (e.g. simple paypal)
 * - the "embedded" kind: you write your credit card info in a form that is on your site and not inside an iframe (e.g. stripe)
 * - the "iframe" kind: payment form is displayed on your website but inside an iframe (e.g. atos)
 */
class PaymentOption
{
    /**
     * This text will be displayed
     * in the payment option selection widget.
     * @var string
     */
    private $callToActionText;

    /**
     * Additional information to display to the customer.
     * This is free HTML, and may be used by modules such as
     * bankwire to display to which account the bank transfer should be made.
     *
     * @var string
     */
    private $additionalInformation;

    /**
     * The URL to a picture to display in the
     * payment option selection widget.
     *
     * @var string
     */
    private $logo;

    /**
     * The URL to which the request to process the
     * payment must be made.
     *
     * @var string
     */
    private $action;

    /**
     * An associative array of additional parameters to use when sending
     * the request to $action,
     * e.g. if  $action is "http://payment-provider.example.com/process",
     * 			$method is "GET"
     *      	and $inputs is ['customerName' => 'bob']
     *      then the request will be made to:
     *      	"http://payment-provider.example.com/process?customerName=bob"
     *
     * @var array
     */
    private $inputs;

    /**
     * Custom HTML to display e.g. a form where
     * you write your credit card number.
     * The HTML MUST NOT contain a submit button, as
     * the Core will submit the form.
     *
     * @var string
     */
    private $form;

    /**
     * Custom HTML containing an iframe with the
     * payment confirmation widget for modules like ATOS.
     *
     * @var string
     */
    private $iframe;

    /**
     * For internal reasons, the name of the module
     * that provided this option.
     * Is this still necessary?
     *
     * @var string
     */
    private $moduleName;

    /**
     * Return Call to Action Text
     * @return string
     */
    public function getCallToActionText()
    {
        return $this->callToActionText;
    }

    /**
     * Set Call To Action Text
     * @param $callToActionText
     * @return $this
     */
    public function setCallToActionText($callToActionText)
    {
        $this->callToActionText = $callToActionText;
        return $this;
    }

    /**
     * Return Additional Information
     * @return string
     */
    public function getAdditionalInformation()
    {
        return $this->additionalInformation;
    }

    /**
     * Set Additional Information
     * @param $additionalInformation
     * @return $this
     */
    public function setAdditionalInformation($additionalInformation)
    {
        $this->additionalInformation = $additionalInformation;
        return $this;
    }

    /**
     * Return logo path
     * @return string
     */
    public function getLogo()
    {
        return $this->logo;
    }

    /**
     * Set logo path
     * @param $logo
     * @return $this
     */
    public function setLogo($logo)
    {
        $this->logo = $logo;
        return $this;
    }

    /**
     * Return action to perform (POST/GET)
     * @return string
     */
    public function getAction()
    {
        return $this->action;
    }


    /**
     * Set action to be performed by this option
     * @param $action
     * @return $this
     */
    public function setAction($action)
    {
        $this->action = $action;
        return $this;
    }

    /**
     * Return inputs contained in this payment option
     * @return mixed
     */
    public function getInputs()
    {
        return $this->inputs;
    }

    /**
     * Set inputs for this payment option
     * @param $inputs
     * @return $this
     */
    public function setInputs($inputs)
    {
        $this->inputs = $inputs;
        return $this;
    }

    /**
     * Get payment option form
     * @return mixed
     */
    public function getForm()
    {
        return $this->form;
    }

    /**
     * Set payment option form
     * @param $form
     * @return $this
     */
    public function setForm($form)
    {
        $this->form = $form;
        return $this;
    }

    /**
     * Get related module name to this payment option
     * @return string
     */
    public function getModuleName()
    {
        return $this->moduleName;
    }

    /**
     * Set related module name to this payment option
     * @param $moduleName
     * @return $this
     */
    public function setModuleName($moduleName)
    {
        $this->moduleName = $moduleName;
        return $this;
    }

    public function toArray()
    {
        return [
            'action' => $this->action,
            'form' => $this->form,
            'inputs' => $this->inputs,
            'logo' => $this->logo,
            'additionalInformation' => $this->additionalInformation,
            'call_to_action_text' => $this->callToActionText
        ];
    }

    /**
     * Legacy options were specified this way:
     * - either an array with a top level property 'cta_text'
     * 	and then the other properties
     * - or a numerically indexed array or arrays as described above
     * Since this was a mess, this method is provided to convert them.
     * It takes as input a legacy option (in either form) and always
     * returns an array of instances of PrestaShop\PrestaShop\Core\Payment\PaymentOption
     */
    public static function convertLegacyOption(array $legacyOption)
    {
        if (!$legacyOption) {
            return;
        }

        if (array_key_exists('cta_text', $legacyOption)) {
            $legacyOption = array($legacyOption);
        }

        $newOptions = array();

        $defaults = array(
            'additionalInformation' => null,
            'action' => null,
            'form' => null,
            'method' => null,
            'inputs' => array(),
            'logo' => null
        );

        foreach ($legacyOption as $option) {
            $option = array_merge($defaults, $option);

            $newOption = new self();
            $newOption->setCallToActionText($option['cta_text'])
                      ->setAdditionalInformation($option['additionalInformation'])
                      ->setAction($option['action'])
                      ->setForm($option['form'])
                      ->setInputs($option['inputs'])
                      ->setLogo($option['logo']);

            $newOptions[] = $newOption;
        }

        return $newOptions;
    }
}

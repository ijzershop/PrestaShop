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
 *  @author 	PrestaShop SA <contact@prestashop.com>
 *  @copyright  2007-2015 PrestaShop SA
 *  @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */

/**
 * @since 1.5
 */
class PDFCore
{
    public $filename;
    public $pdf_renderer;
    public $objects;
    public $template;
    public $send_bulk_flag = false;

    const TEMPLATE_INVOICE = 'Invoice';
    const TEMPLATE_ORDER_RETURN = 'OrderReturn';
    const TEMPLATE_ORDER_SLIP = 'OrderSlip';
    const TEMPLATE_DELIVERY_SLIP = 'DeliverySlip';
    const TEMPLATE_SUPPLY_ORDER_FORM = 'SupplyOrderForm';

    /**
     * @param $objects
     * @param $template
     * @param $smarty
     * @param string $orientation
     */
    public function __construct($objects, $template, $smarty, $orientation = 'P')
    {
        $this->pdf_renderer = new PDFGenerator((bool)Configuration::get('PS_PDF_USE_CACHE'), $orientation);
        $this->template = $template;
        $this->smarty = $smarty;

        $this->objects = $objects;
        if (!($objects instanceof Iterator) && !is_array($objects)) {
            $this->objects = array($objects);
        }
        
        if (count($this->objects)>1) { // when bulk mode only
            $class_name = 'HTMLTemplate'.$this->template;
            if (class_exists($class_name)) {
                $classMethod = new ReflectionMethod($class_name,'__construct');
                $argumentCount = count($classMethod->getParameters());
                if ($argumentCount == 3) { // For Core templates (and other if exists) that accepts optional third param $bulk_mode
                    $this->send_bulk_flag = true;
                }
            }
        }
    }

    /**
     * Render PDF
     *
     * @param bool $display
     * @return mixed
     * @throws PrestaShopException
     */
    public function render($display = true)
    {
        $render = false;
        $this->pdf_renderer->setFontForLang(Context::getContext()->language->iso_code);
        foreach ($this->objects as $object) {
            $template = $this->getTemplateObject($object);
            if (!$template) {
                continue;
            }

            if (empty($this->filename)) {
                $this->filename = $template->getFilename();
                if (count($this->objects) > 1) {
                    $this->filename = $template->getBulkFilename();
                }
            }

            $template->assignHookData($object);

            $this->pdf_renderer->createHeader($template->getHeader());
            $this->pdf_renderer->createFooter($template->getFooter());
            $this->pdf_renderer->createContent($template->getContent());
            $this->pdf_renderer->writePage();
            $render = true;

            unset($template);
        }

        if ($render) {
            // clean the output buffer
            if (ob_get_level() && ob_get_length() > 0) {
                ob_clean();
            }
            return $this->pdf_renderer->render($this->filename, $display);
        }
    }

    /**
     * Get correct PDF template classes
     *
     * @param mixed $object
     * @return HTMLTemplate|false
     * @throws PrestaShopException
     */
    public function getTemplateObject($object)
    {
        $class = false;
        $class_name = 'HTMLTemplate'.$this->template;

        if (class_exists($class_name)) {
            if ($this->send_bulk_flag) {
                $class = new $class_name($object, $this->smarty, true);
            } else {
                $class = new $class_name($object, $this->smarty);
            }

            if (!($class instanceof HTMLTemplate)) {
                throw new PrestaShopException('Invalid class. It should be an instance of HTMLTemplate');
            }
        }

        return $class;
    }
}

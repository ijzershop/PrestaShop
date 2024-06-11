<?php
/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.txt
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to a newer
 * versions in the future. If you wish to customize this module for your
 * needs please refer to CustomizationPolicy.txt file inside our module for more information.
 *
 * @author Webkul IN
 * @copyright Since 2010 Webkul
 * @license https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */
if (!defined('_PS_VERSION_')) {
    exit;
}
class Ps_ImageSliderOverride extends Ps_ImageSlider
{
    public function getWidgetVariables($hookName = null, array $configuration = [])
    {
        $slides = $this->getSlides(true);
        if (Module::isEnabled('wkwebp')
            && Configuration::get('WK_WEBP_ENABLE_MODULE')
            && !Context::getContext()->cookie->wk_webp_safari
        ) {
            if ($slides) {
                foreach ($slides as &$slide) {
                    $file = pathinfo($slide['image']);
                    $slideName = $file['filename'];
                    if (file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/ps_slider/' . $slideName . '.webp')) {
                        $slide['image'] = $slideName . '.webp';
                        $slide['image_url'] = Tools::getShopDomainSsl(true, true) . __PS_BASE_URI__ .
                        '/modules/wkwebp/views/img/ps_slider/' . $slideName . '.webp';
                    }
                }
            }
        }
        if (is_array($slides)) {
            foreach ($slides as &$slide) {
                $slide['sizes'] = @getimagesize(__DIR__ . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $slide['image']);
                if (isset($slide['sizes'][3]) && $slide['sizes'][3]) {
                    $slide['size'] = $slide['sizes'][3];
                }
            }
        }
        $config = $this->getConfigFieldsValues();
        return [
            'homeslider' => [
                'speed' => $config['HOMESLIDER_SPEED'],
                'pause' => $config['HOMESLIDER_PAUSE_ON_HOVER'] ? 'hover' : '',
                'wrap' => $config['HOMESLIDER_WRAP'] ? 'true' : 'false',
                'slides' => $slides,
            ],
        ];
    }
}

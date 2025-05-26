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

class CmsController extends CmsControllerCore
{
    /**
     * Assign template vars related to page content.
     *
     * @see FrontController::initContent()
     */
    public function initContent()
    {
        if ($this->assignCase == 1) {
            $cmsVar = $this->objectPresenter->present($this->cms);

            $filteredCmsContent = Hook::exec(
                'filterCmsContent',
                ['object' => $cmsVar],
                $id_module = null,
                $array_return = false,
                $check_exceptions = true,
                $use_push = false,
                $id_shop = null,
                $chain = true
            );
            if (!empty($filteredCmsContent['object'])) {
                $cmsVar = $filteredCmsContent['object'];
            }

            if (Module::isEnabled('wkwebp')
                && Configuration::get('WK_WEBP_ENABLE_MODULE')
                && !Context::getContext()->cookie->wk_webp_safari
            ) {
                $matches = [];
                preg_match_all('/<img src\s*=\s*"(.+?)"/', $cmsVar['content'], $matches);
                if ($matches) {
                    foreach ($matches[1] as $match) {
                        $file = pathinfo($match);
                        $cmsName = $file['filename'];
                        if (file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/cms/' . urldecode($cmsName) . '.webp')) {
                            $dest = Tools::getShopDomainSsl(true, true) . __PS_BASE_URI__ .
                            '/modules/wkwebp/views/img/cms/' . $cmsName . '.webp';

                            $cmsVar['content'] = str_replace($match, $dest, $cmsVar['content']);
                        }
                    }
                }
            }

            $this->context->smarty->assign([
                'cms' => $cmsVar,
            ]);

            if ($this->cms->indexation == 0) {
                $this->context->smarty->assign('nobots', true);
            }

            $this->setTemplate(
                'cms/page',
                ['entity' => 'cms', 'id' => $this->cms->id]
            );
        } elseif ($this->assignCase == 2) {
            $cmsCategoryVar = $this->getTemplateVarCategoryCms();

            $filteredCmsCategoryContent = Hook::exec(
                'filterCmsCategoryContent',
                ['object' => $cmsCategoryVar],
                $id_module = null,
                $array_return = false,
                $check_exceptions = true,
                $use_push = false,
                $id_shop = null,
                $chain = true
            );
            if (!empty($filteredCmsCategoryContent['object'])) {
                $cmsCategoryVar = $filteredCmsCategoryContent['object'];
            }

            $this->context->smarty->assign($cmsCategoryVar);
            $this->setTemplate('cms/category');
        }
        parent::initContent();
    }
}

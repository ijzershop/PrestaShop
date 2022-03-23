<?php
declare(strict_types=1);

namespace ModernesmidPriceModifier\Controller\Admin;

use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;
use PrestaShopBundle\Security\Annotation\AdminSecurity;
use Symfony\Component\HttpFoundation\Response;

/**
 *
 */
class AdminPriceModifierController extends FrameworkBundleAdminController
{
    public const TAB_CLASS_NAME = 'ModerneSmidAdminPriceModifier';
    /**
     *
     * @return Response
     */
    public function indexAction(): Response
    {
        return $this->render('@Modules/modernesmid_price_modifier/views/templates/admin/price_modifier_index.html.twig');
    }
}

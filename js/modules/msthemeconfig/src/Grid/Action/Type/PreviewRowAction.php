<?php
namespace MsThemeConfig\Grid\Action\Type;

use PrestaShop\PrestaShop\Core\Grid\Action\Row\AbstractRowAction;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * PreviewRowAction class.
 */
final class PreviewRowAction extends AbstractRowAction
{
    /**
     * {@inheritdoc}
     */
    public function getType(): string
    {
        return 'preview_row_action';
    }

    /**
     * {@inheritdoc}
     */
    protected function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setDefaults([
                'use_inline_display' => true,
                'icon_expand' => 'keyboard_arrow_down',
                'icon_collapse' => 'keyboard_arrow_up',
                'preview_data_route' => 'admin_orders_preview',
                'preview_route_params' => [
                    'orderId' => 'id_order',
                ],
            ])
            ->setRequired([
                'label',
            ])
            ->setAllowedTypes('label', 'string')
            ->setAllowedTypes('icon_expand', 'string')
            ->setAllowedTypes('icon_collapse', 'string')
            ->setAllowedTypes('preview_data_route', 'string')
            ->setAllowedTypes('preview_route_params', 'array');
    }
}

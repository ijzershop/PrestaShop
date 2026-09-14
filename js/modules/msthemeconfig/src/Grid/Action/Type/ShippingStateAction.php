<?php
namespace MsThemeConfig\Grid\Action\Type;

use PrestaShop\PrestaShop\Core\Grid\Action\Row\AbstractRowAction;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * It extends AbstractGridAction,
 * but you can also implement \PrestaShop\PrestaShop\Core\Grid\Action\GridActionInterface
 * if for some reason you want to avoid using the abstract class
 */
final class ShippingStateAction extends AbstractRowAction
{
    /**
     * {@inheritdoc}
     */
    public function getType(): string
    {
        return 'shipping_state_action';
    }

    /**
     * {@inheritdoc}
     */
    protected function configureOptions(OptionsResolver $resolver)
    {
        /**
         * options passed to the resolver will be available in the Grid action
         * and also in the template responsible of rendering the action.
         */
        $resolver
            ->setDefaults([
                'use_inline_display' => true,
            ])
            ->setRequired([
                'label',
                'acceptedStates'
            ])
            ->setAllowedTypes('label', 'string')
            ->setAllowedTypes('acceptedStates', 'array');
    }
}

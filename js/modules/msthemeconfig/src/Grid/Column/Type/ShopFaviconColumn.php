<?php
declare(strict_types=1);

namespace MsThemeConfig\Grid\Column\Type;

use PrestaShop\PrestaShop\Core\Grid\Column\AbstractColumn;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class ShopFaviconColumn
 */
final class ShopFaviconColumn extends AbstractColumn
{
    /**
     * {@inheritdoc}
     */
    public function getType(): string
    {
        return 'shop_favicon';
    }

    /**
     * {@inheritdoc}
     */
    protected function configureOptions(OptionsResolver $resolver)
    {
        parent::configureOptions($resolver);

        $resolver
            ->setRequired([
                'shop_id_field',
                'shop_name_field',
            ])
            ->setAllowedTypes('shop_id_field', 'string')
            ->setAllowedTypes('shop_name_field', 'string')
        ;
    }
}

<?php
declare(strict_types=1);

namespace MsThemeConfig\Grid\Column;

use PrestaShop\PrestaShop\Core\Grid\Column\AbstractColumn;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 *
 *  Adds an button column to orders table, where the koopman retour creation button is shown.
 *  Button is only shown when the retour option is available.
 *
 */
final class ButtonColumn extends AbstractColumn
{
    /**
     * {@inheritdoc}
     */
    public function getType(): string
    {
        return 'koopman_retour_button';
    }

    /**
     * {@inheritdoc}
     */
    protected function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired([
                'ModuleClass',
                'label',
                'acceptedStates',
                'createdStates'
            ])
            ->setAllowedTypes('ModuleClass', 'object')
            ->setAllowedTypes('label', 'string')
            ->setAllowedTypes('acceptedStates', 'array')
            ->setAllowedTypes('createdStates', 'array');
    }
}

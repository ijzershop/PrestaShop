<?php
/**
 * 2007-2020 PrestaShop SA and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\PrestaShop\Core\Grid\Data\Factory;

use PrestaShop\PrestaShop\Core\Grid\Data\GridData;
use PrestaShop\PrestaShop\Core\Grid\Record\RecordCollection;
use PrestaShop\PrestaShop\Core\Grid\Search\SearchCriteriaInterface;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * Provides data for credit slip grid
 */
final class CreditSlipGridDataFactory implements GridDataFactoryInterface
{
    /**
     * @var GridDataFactoryInterface
     */
    private $creditSlipDataFactory;

    /**
     * @var TranslatorInterface
     */
    private $translator;

    /**
     * @param GridDataFactoryInterface $creditSlipDataFactory
     * @param TranslatorInterface $translator
     */
    public function __construct(
        GridDataFactoryInterface $creditSlipDataFactory,
        TranslatorInterface $translator
    ) {
        $this->creditSlipDataFactory = $creditSlipDataFactory;
        $this->translator = $translator;
    }

    /**
     * {@inheritdoc}
     */
    public function getData(SearchCriteriaInterface $searchCriteria)
    {
        $creditSlipData = $this->creditSlipDataFactory->getData($searchCriteria);

        $modifiedRecords = $this->applyModification(
            $creditSlipData->getRecords()->all()
        );

        return new GridData(
            new RecordCollection($modifiedRecords),
            $creditSlipData->getRecordsTotal(),
            $creditSlipData->getQuery()
        );
    }

    /**
     * @param array $creditSlips
     *
     * @return array
     */
    private function applyModification(array $creditSlips)
    {
        foreach ($creditSlips as $i => $creditSlip) {
            $creditSlips[$i]['link_value'] = $this->translator->trans(
                'Download credit slip', [], 'Admin.Orderscustomers.Feature'
            );
        }

        return $creditSlips;
    }
}

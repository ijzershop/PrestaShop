<?php
/**
 * 2007-2019 PrestaShop and Contributors
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
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\PrestaShop\Core\Grid\Data\Factory;

use PrestaShop\PrestaShop\Core\Grid\Data\GridData;
use PrestaShop\PrestaShop\Core\Grid\Record\RecordCollection;
use PrestaShop\PrestaShop\Core\Grid\Search\SearchCriteriaInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Provides data for attribute grid
 */
final class AttributeGridDataFactory implements GridDataFactoryInterface
{
    /**
     * @var GridDataFactoryInterface
     */
    private $attributeGridDataFactory;

    /**
     * @var RequestStack
     */
    private $requestStack;

    /**
     * @param GridDataFactoryInterface $attributeGridDataFactory
     * @param RequestStack $requestStack
     */
    public function __construct(
        GridDataFactoryInterface $attributeGridDataFactory,
        RequestStack $requestStack
    ) {
        $this->attributeGridDataFactory = $attributeGridDataFactory;
        $this->requestStack = $requestStack;
    }

    /**
     * {@inheritdoc}
     */
    public function getData(SearchCriteriaInterface $searchCriteria)
    {
        $attributesData = $this->attributeGridDataFactory->getData($searchCriteria);

        $modifiedRecords = $this->applyModification(
            $attributesData->getRecords()->all()
        );

        return new GridData(
            new RecordCollection($modifiedRecords),
            $attributesData->getRecordsTotal(),
            $attributesData->getQuery()
        );
    }

    /**
     * @param array $attributes
     *
     * @return array
     */
    private function applyModification(array $attributes)
    {
        foreach ($attributes as $i => $attribute) {
            $attributes[$i]['id_attribute_group'] =
                $this->requestStack->getCurrentRequest()->attributes->getInt('attributeGroupId');
        }

        return $attributes;
    }
}

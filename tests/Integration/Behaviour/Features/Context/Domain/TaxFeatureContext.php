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

namespace Tests\Integration\Behaviour\Features\Context\Domain;

use Behat\Gherkin\Node\TableNode;
use Configuration;
use Exception;
use PrestaShop\PrestaShop\Core\Domain\Tax\Command\AddTaxCommand;
use PrestaShop\PrestaShop\Core\Domain\Tax\Command\BulkDeleteTaxCommand;
use PrestaShop\PrestaShop\Core\Domain\Tax\Command\BulkToggleTaxStatusCommand;
use PrestaShop\PrestaShop\Core\Domain\Tax\Command\DeleteTaxCommand;
use PrestaShop\PrestaShop\Core\Domain\Tax\Command\EditTaxCommand;
use PrestaShop\PrestaShop\Core\Domain\Tax\Command\ToggleTaxStatusCommand;
use PrestaShop\PrestaShop\Core\Domain\Tax\Exception\TaxException;
use PrestaShop\PrestaShop\Core\Domain\Tax\Exception\TaxNotFoundException;
use PrestaShop\PrestaShop\Core\Domain\Tax\Query\GetTaxForEditing;
use PrestaShop\PrestaShop\Core\Domain\Tax\ValueObject\TaxId;
use RuntimeException;
use Tax;
use Tests\Integration\Behaviour\Features\Context\CommonFeatureContext;
use Tests\Integration\Behaviour\Features\Context\SharedStorage;
use Tests\Integration\Behaviour\Features\Context\Util\NoExceptionAlthoughExpectedException;

class TaxFeatureContext extends AbstractDomainFeatureContext
{
    /**
     * "When" steps perform actions, and some of them store the latest exception
     * in this variable so that "Then" action can check it
     *
     * @var mixed
     */
    private $latestException;

    /**
     * @var int default language id from configuration
     */
    private $defaultLangId;

    public function __construct()
    {
        $this->defaultLangId = CommonFeatureContext::getContainer()->get('prestashop.adapter.legacy.configuration')->get('PS_LANG_DEFAULT');
    }

    /**
     * @When I add new tax :taxReference with following properties:
     */
    public function createTax($taxReference, TableNode $table)
    {
        $data = $table->getRowsHash();

        $this->createTaxUsingCommand($taxReference, $data);
    }

    /**
     * @When I add new tax :taxReference with empty name
     */
    public function createTaxWithEmptyName($taxReference)
    {
        $data = $this->getValidDataForTaxCreation();
        $data['name'] = '';

        try {
            $this->createTaxUsingCommand($taxReference, $data);
        } catch (TaxException $e) {
            $this->latestException = $e;
        }
    }

    /**
     * @When I edit tax :taxReference with following properties:
     */
    public function editTaxUsingCommand($taxReference, TableNode $table)
    {
        $data = $table->getRowsHash();

        /** @var Tax $tax */
        $tax = SharedStorage::getStorage()->get($taxReference);
        $taxId = (int) $tax->id;
        $command = new EditTaxCommand($taxId);
        if (isset($data['name'])) {
            $command->setLocalizedNames([$this->defaultLangId => $data['name']]);
        }
        if (isset($data['rate'])) {
            $command->setRate($data['rate']);
        }

        if (isset($data['is_enabled'])) {
            $command->setEnabled($data['is_enabled']);
        }
        $this->getCommandBus()->handle($command);

        SharedStorage::getStorage()->set($taxReference, new Tax($taxId));
    }

    /**
     * @When I toggle tax :taxReference status
     */
    public function toggleStatus($taxReference)
    {
        /** @var Tax $tax */
        $tax = SharedStorage::getStorage()->get($taxReference);
        $taxId = (int) $tax->id;
        $expectedStatus = !(bool) $tax->active;

        $this->getCommandBus()->handle(new ToggleTaxStatusCommand($taxId, $expectedStatus));
        SharedStorage::getStorage()->set($taxReference, new Tax($taxId));
    }

    /**
     * @When I :action taxes with ids: :ids
     */
    public function bulkToggleStatusByIds($action, $ids)
    {
        $expectedStatus = 'enable' === $action ? true : false;

        $this->getCommandBus()->handle(new BulkToggleTaxStatusCommand(
            array_map('intval', explode(',', $ids)),
            $expectedStatus
        ));
    }

    /**
     * @When I delete tax with id :id
     */
    public function deleteTaxById($id)
    {
        $this->getCommandBus()->handle(new DeleteTaxCommand((int) $id));
    }

    /**
     * @When I delete taxes with ids: :ids in bulk action
     */
    public function bulkDeleteTaxesByIds($ids)
    {
        $this->getCommandBus()->handle(
            new BulkDeleteTaxCommand(array_map('intval', explode(',', $ids)))
        );
    }

    /**
     * @Then tax :taxReference name in default language should be :name
     */
    public function assertTaxNameInDefaultLang($taxReference, $name)
    {
        /** @var Tax $tax */
        $tax = SharedStorage::getStorage()->get($taxReference);

        if ($tax->name[$this->defaultLangId] !== $name) {
            throw new RuntimeException(sprintf(
                'Tax "%s" has "%s" name, but "%s" was expected.',
                $taxReference,
                $tax->name,
                $name
            ));
        }
    }

    /**
     * @Then tax :taxReference rate should be :rate
     */
    public function assertTaxRate($taxReference, $rate)
    {
        /** @var Tax $tax */
        $tax = SharedStorage::getStorage()->get($taxReference);

        if ($tax->rate !== $rate) {
            throw new RuntimeException(sprintf(
                'Tax "%s" has "%s" rate, but "%s" was expected.',
                $taxReference,
                $tax->rate,
                $rate
            ));
        }
    }

    /**
     * @Then taxes with ids: :ids should be :status
     */
    public function assertStatusByIds($ids, $status)
    {
        $isEnabled = 'enabled' === $status ? true : false;
        foreach (array_map('intval', explode(',', $ids)) as $id) {
            $editableTax = $this->getQueryBus()->handle(new GetTaxForEditing($id));
            if ($isEnabled !== $editableTax->isActive()) {
                throw new RuntimeException(sprintf(
                    'Tax with id "%s" is %s, but expected to be %s',
                    $id,
                    $editableTax->isActive ? 'enabled' : 'disabled',
                    $status
                ));
            }
        }
    }

    /**
     * @Then taxes with ids: :ids should not be found
     */
    public function assertTaxesByIdsShouldNotBeFound($ids)
    {
        foreach (explode(',', $ids) as $id) {
            $this->assertTaxByIdShouldNotBeFound($id);
        }
    }

    /**
     * @Then tax with id :id should not be found
     */
    public function assertTaxByIdShouldNotBeFound($id)
    {
        try {
            $query = new GetTaxForEditing((int) $id);
            $this->getQueryBus()->handle($query);

            throw new NoExceptionAlthoughExpectedException();
        } catch (TaxNotFoundException $e) {
        }
    }

    /**
     * @Given taxes with ids: :ids exists
     */
    public function assertTaxesExistsByIds($ids)
    {
        foreach (explode(',', $ids) as $id) {
            $this->assertTaxExistsById($id);
        }
    }

    /**
     * @Given tax with id :id exists
     */
    public function assertTaxExistsById($id)
    {
        $query = new GetTaxForEditing((int) $id);

        $this->getQueryBus()->handle($query);
    }

    /**
     * @Then /^tax "(.*)" should be (enabled|disabled)?$/
     */
    public function assertTaxStatus($taxReference, $status)
    {
        /**
         * @var Tax
         */
        $tax = SharedStorage::getStorage()->get($taxReference);

        $isEnabled = $status === 'enabled' ? true : false;
        if ($isEnabled !== (bool) $tax->active) {
            throw new RuntimeException(sprintf(
                'Tax "%s" is %s, but it was expected to be %s',
                $taxReference,
                $tax->active ? 'enabled' : 'disabled',
                $status
            ));
        }
    }

    /**
     * @Then /^I should get error message '(.+)'$/
     */
    public function assertExceptionMessage($message)
    {
        if ($this->latestException instanceof Exception) {
            if ($this->latestException->getMessage() !== $message) {
                throw new RuntimeException(sprintf(
                        'Got error message "%s", but expected "%s"', $this->latestException->getMessage(), $message)
                );
            }

            return true;
        }

        throw new NoExceptionAlthoughExpectedException('No exception was thrown in latest result');
    }

    /**
     * @param $taxReference
     * @param array $data
     */
    private function createTaxUsingCommand($taxReference, array $data)
    {
        $command = new AddTaxCommand(
            [$this->defaultLangId => $data['name']],
            $data['rate'],
            $data['is_enabled']
        );

        /** @var TaxId $taxId */
        $taxId = $this->getCommandBus()->handle($command);

        SharedStorage::getStorage()->set($taxReference, new Tax($taxId->getValue()));
    }

    /**
     * Provides valid data for tax creation.
     *
     * @return array
     */
    private function getValidDataForTaxCreation()
    {
        return [
            'name' => 'my custom tax 500',
            'rate' => 0.5,
            'is_enabled' => 1,
        ];
    }
}

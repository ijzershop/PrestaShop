<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
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
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */

declare(strict_types=1);

namespace Tests\Integration\Behaviour\Features\Context\Domain;

use Behat\Gherkin\Node\TableNode;
use Exception;
use PHPUnit\Framework\Assert;
use PrestaShop\PrestaShop\Core\Domain\SqlManagement\Exception\SqlRequestConstraintException;
use RuntimeException;
use Symfony\Component\HttpFoundation\Request;
use Tests\Integration\Behaviour\Features\Context\SharedStorage;

class SqlManagerFeatureContext extends AbstractDomainFeatureContext
{
    private const SQL_REQUEST_FORM_KEY = 'sql-request-form';

    /**
     * @Given I specify following properties for sql request form
     */
    public function specifyPropertiesForSqlRequestForm(TableNode $node): void
    {
        $data = $node->getRowsHash();

        SharedStorage::getStorage()->set(static::SQL_REQUEST_FORM_KEY, $data);
    }

    /**
     * @When I submit the sql request form
     */
    public function submitTheSqlRequestForm(): void
    {
        $data = SharedStorage::getStorage()->get(static::SQL_REQUEST_FORM_KEY);

        $request = Request::createFromGlobals();
        $request->setMethod(Request::METHOD_POST);
        $request->request->set(
            'sql_request',
            $data
        );

        $form = $this
              ->getContainer()
              ->get('prestashop.core.form.builder.sql_request_form_builder')
              ->getForm([], ['csrf_protection' => false]);
        $form->handleRequest($request);

        $formHandler = $this->getContainer()->get('prestashop.core.form.identifiable_object.sql_request_form_handler');
        try {
            $result = $formHandler->handle($form);
            if (!$result->isValid()) {
                $this->lastException = new RuntimeException('Unable to save form');
            }
        } catch (Exception $e) {
            $this->lastException = $e;
        }

        SharedStorage::getStorage()->clear(static::SQL_REQUEST_FORM_KEY);
    }

    /**
     * @Then the sql request form is valid
     */
    public function sqlRequestFormIsValid(): void
    {
        $this->assertLastErrorIsNull();
    }

    /**
     * @Then I should get an error that only the SELECT request is allowed
     */
    public function assertLastErrorIsOnlySelectRequest(): void
    {
        $this->assertLastErrorIs(SqlRequestConstraintException::class);
        Assert::assertEquals(
            '"SELECT" does not exist.',
            $this->lastException->getMessage()
        );
    }

    /**
     * @Then I should get an error that the SQL request is malformed
     */
    public function assertLastErrorIsAMalformedSqlREquest()
    {
        $this->assertLastErrorIs(SqlRequestConstraintException::class);
        Assert::assertEquals(
            'Bad SQL query',
            $this->lastException->getMessage()
        );
    }

    /**
     * @Then /^I should get an error that the table "(.+)" does not exists$/
     */
    public function assertLastErrorIsAnUnknownTable(string $tableName): void
    {
        $this->assertLastErrorIs(SqlRequestConstraintException::class);
        Assert::assertEquals(
            sprintf('The "%s" table does not exist.', $tableName),
            $this->lastException->getMessage()
        );
    }
}

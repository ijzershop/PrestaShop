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

namespace Tests\Integration\PrestaShopBundle\Controller;

use PrestaShop\PrestaShop\Core\Exception\TypeException;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\BrowserKit\Client;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\DomCrawler\Form;
use Tests\Integration\PrestaShopBundle\Controller\FormFiller\FormFiller;

abstract class GridControllerTestCase extends WebTestCase
{
    /**
     * @var Client
     */
    protected $client;

    /**
     * Route to the grid you are testing
     * @var string
     */
    protected $gridRoute;

    /**
     * The id of the test entity with which filters will be tested
     * Should be set during SetUp
     * @var int
     */
    protected $testEntityId;

    /**
     * The name of entity you are testing, e.g.,address.
     * @var string
     */
    protected $testEntityName;

    /**
     * The route to delete entity
     * @var string
     */
    protected $deleteEntityRoute;

    /**
     * Amount of entities in starting list
     * @var int
     */
    protected $initialEntityCount;

    /**
     * @var FormFiller
     */
    protected $formFiller;

    public function __construct($name = null, array $data = [], $dataName = '')
    {
        parent::__construct($name, $data, $dataName);

        $this->formFiller = new FormFiller();
    }

    /**
     * Creates a test entity and ensures asserts that amount of entities in the list got increased by one
     *
     * @throws TypeException
     */
    public function setUp(): void
    {
        $this->client = static::createClient();
        $this->client->followRedirects(true);

        /** Asserts that list contains as many entities as expected */
        $router = $this->client->getKernel()->getContainer()->get('router');
        $url = $router->generate($this->gridRoute);
        $crawler = $this->client->request('GET', $url);
        $entities = $this->getEntityList($crawler);
        self::assertCount($this->initialEntityCount, $entities);

        $this->createTestEntity();

        /** Asserts amount of entities in the list increased by one and test entity exists */
        $url = $router->generate($this->gridRoute);
        $crawler = $this->client->request('GET', $url);
        $entities = $this->getEntityList($crawler);
        self::assertCount($this->initialEntityCount + 1, $entities);
        $this->assertTestEntityExists($entities);
    }

    /**
     * Removes the created test entity and asserts that it was successfully removed from the list.
     *
     * @throws TypeException
     */
    public function tearDown(): void
    {
        $this->client->followRedirects(true);
        $router = $this->client->getContainer()->get('router');

        /**
         * Assumes that deletion route only requires id param and that id has format is $this->testEntityName . 'Id'
         * If it's not the case you can always override tearDown with logic specific to grid you are testing
         */
        $deleteUrl = $router->generate($this->deleteEntityRoute, [$this->testEntityName . 'Id' => $this->testEntityId]);
        $crawler = $this->client->request('POST', $deleteUrl);
        $entities = $this->getEntityList($crawler);
        self::assertCount($this->initialEntityCount, $entities);
    }

    /**
     * Tests all provided entity filters
     *
     * @throws TypeException
     */
    public function testEntityFilters(): void
    {
        foreach ($this->getTestFilters() as $testFilter) {
            $this->assertFiltersFindOnlyTestEntity($testFilter);
        }
    }

    /**
     * Asserts that there is only one entity left in the list after using filters
     * @param array $testFilters
     *
     * @throws TypeException
     */
    protected function assertFiltersFindOnlyTestEntity(array $testFilters): void
    {
        $router = $this->client->getContainer()->get('router');
        $url = $router->generate($this->gridRoute);
        $crawler = $this->client->request('GET', $url);

        /** Assert that list contains all entities and thus not affected by anything */
        $entities = $this->getEntityList($crawler);
        self::assertCount($this->initialEntityCount + 1, $entities);

        /**
         * Submit filters
         */
        $filterForm = $this->fillFiltersForm($crawler, $testFilters);
        $crawler = $this->client->submit($filterForm);

        /**
         * Assert that there is only test entity left in the list after using filters
         */
        $entities = $this->getEntityList($crawler);
        self::assertCount(1, $entities);
        $this->assertTestEntityExists($entities);
    }

    /**
     * @param Crawler $crawler
     * @param array $formModifications
     *
     * @return Form
     */
    protected function fillFiltersForm(Crawler $crawler, array $formModifications): Form
    {
        $button = $crawler->selectButton($this->testEntityName . '[actions][search]');
        $filtersForm = $button->form();
        $this->formFiller->fillForm($filtersForm, $formModifications);

        return $filtersForm;
    }

    /**
     * Asserts test entity exists with the list
     * @param TestEntityCollection $entities
     */
    protected function assertTestEntityExists(TestEntityCollection $entities): void
    {
        $ids = [];

        foreach ($entities as $entity) {
            $ids[] = $entity->getId();
        }
        self::assertContains($this->getTestEntity()->getId(), $ids);
    }

    /**
     * @param Crawler $crawler
     *
     * @return TestEntityCollection
     *
     * @throws TypeException
     */
    protected function getEntityList(Crawler $crawler): TestEntityCollection
    {
        $testEntityCollection = new TestEntityCollection();
        $entities = $crawler->filter('#' . $this->testEntityName . '_grid_table')->filter('tbody tr')->each(function ($tr, $i) {
            return $this->getEntity($tr, $i);
        });
        foreach ($entities as $entity) {
            $testEntityCollection->add($entity);
        }

        return $testEntityCollection;
    }

    abstract protected function getTestFilters(): array;

    abstract protected function getTestEntity(): TestEntityDTO;

    abstract protected function createTestEntity(): void;

    abstract protected function getEntity($tr, $i): TestEntityDTO;
}

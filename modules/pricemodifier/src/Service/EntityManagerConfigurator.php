<?php
// modules/pricemodifier/src/Service/EntityManagerConfigurator.php
namespace Modernesmid\Module\Pricemodifier\Service;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;

/**
 *
 */
class EntityManagerConfigurator
{
    private $entityManager;
    private $initialized = false;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function onKernelRequest(RequestEvent $event)
    {
        if ($this->initialized || !$event->isMainRequest()) {
            return;
        }

        $this->initialized = true;

        try {
            // Get the configuration
            $configuration = $this->entityManager->getConfiguration();

            // Get existing namespaces
            $namespaces = $configuration->getEntityNamespaces();

            // Remove the problematic namespace if it exists
            if (isset($namespaces['Modulepricemodifier'])) {
                unset($namespaces['Modulepricemodifier']);
            }

            // Add our namespace with a better alias
            $namespaces['Pricemodifier'] = 'Modernesmid\\Module\\Pricemodifier\\Entity';

            // Set the updated namespaces
            $configuration->setEntityNamespaces($namespaces);
        } catch (\Exception $e) {
            // Log the error but don't break the request
        }
    }
}

<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Component\Workflow;

use Symfony\Component\Workflow\Metadata\MetadataStoreInterface;

/**
 * Builds a definition.
 *
 * @author Fabien Potencier <fabien@symfony.com>
 * @author Grégoire Pineau <lyrixx@lyrixx.info>
 * @author Tobias Nyholm <tobias.nyholm@gmail.com>
 */
class DefinitionBuilder
{
    private $places = [];
    private $transitions = [];
    private $initialPlaces;
    private $metadataStore;

    /**
     * @param string[]     $places
     * @param Transition[] $transitions
     */
    public function __construct(array $places = [], array $transitions = [])
    {
        $this->addPlaces($places);
        $this->addTransitions($transitions);
    }

    /**
     * @return Definition
     */
    public function build()
    {
        return new Definition($this->places, $this->transitions, $this->initialPlaces, $this->metadataStore);
    }

    /**
     * Clear all data in the builder.
     *
     * @return $this
     */
    public function clear()
    {
        $this->places = [];
        $this->transitions = [];
        $this->initialPlaces = null;
        $this->metadataStore = null;

        return $this;
    }

    /**
     * @param string|string[]|null $initialPlaces
     *
     * @return $this
     */
    public function setInitialPlaces($initialPlaces)
    {
        $this->initialPlaces = $initialPlaces;

        return $this;
    }

    /**
     * @return $this
     */
    public function addPlace(string $place)
    {
        if (!$this->places) {
            $this->initialPlaces = $place;
        }

        $this->places[$place] = $place;

        return $this;
    }

    /**
     * @param string[] $places
     *
     * @return $this
     */
    public function addPlaces(array $places)
    {
        foreach ($places as $place) {
            $this->addPlace($place);
        }

        return $this;
    }

    /**
     * @param Transition[] $transitions
     *
     * @return $this
     */
    public function addTransitions(array $transitions)
    {
        foreach ($transitions as $transition) {
            $this->addTransition($transition);
        }

        return $this;
    }

    /**
     * @return $this
     */
    public function addTransition(Transition $transition)
    {
        $this->transitions[] = $transition;

        return $this;
    }

    /**
     * @return $this
     */
    public function setMetadataStore(MetadataStoreInterface $metadataStore)
    {
        $this->metadataStore = $metadataStore;

        return $this;
    }
}

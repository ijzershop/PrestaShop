<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace MolliePrefix\Symfony\Component\Config\Definition\Builder;

use MolliePrefix\Symfony\Component\Config\Definition\ArrayNode;
use MolliePrefix\Symfony\Component\Config\Definition\Exception\InvalidDefinitionException;
use MolliePrefix\Symfony\Component\Config\Definition\PrototypedArrayNode;
/**
 * This class provides a fluent interface for defining an array node.
 *
 * @author Johannes M. Schmitt <schmittjoh@gmail.com>
 */
class ArrayNodeDefinition extends \MolliePrefix\Symfony\Component\Config\Definition\Builder\NodeDefinition implements \MolliePrefix\Symfony\Component\Config\Definition\Builder\ParentNodeDefinitionInterface
{
    protected $performDeepMerging = \true;
    protected $ignoreExtraKeys = \false;
    protected $removeExtraKeys = \true;
    protected $children = [];
    protected $prototype;
    protected $atLeastOne = \false;
    protected $allowNewKeys = \true;
    protected $key;
    protected $removeKeyItem;
    protected $addDefaults = \false;
    protected $addDefaultChildren = \false;
    protected $nodeBuilder;
    protected $normalizeKeys = \true;
    /**
     * {@inheritdoc}
     */
    public function __construct($name, \MolliePrefix\Symfony\Component\Config\Definition\Builder\NodeParentInterface $parent = null)
    {
        parent::__construct($name, $parent);
        $this->nullEquivalent = [];
        $this->trueEquivalent = [];
    }
    /**
     * {@inheritdoc}
     */
    public function setBuilder(\MolliePrefix\Symfony\Component\Config\Definition\Builder\NodeBuilder $builder)
    {
        $this->nodeBuilder = $builder;
    }
    /**
     * {@inheritdoc}
     */
    public function children()
    {
        return $this->getNodeBuilder();
    }
    /**
     * Sets a prototype for child nodes.
     *
     * @param string $type The type of node
     *
     * @return NodeDefinition
     */
    public function prototype($type)
    {
        return $this->prototype = $this->getNodeBuilder()->node(null, $type)->setParent($this);
    }
    /**
     * @return VariableNodeDefinition
     */
    public function variablePrototype()
    {
        return $this->prototype('variable');
    }
    /**
     * @return ScalarNodeDefinition
     */
    public function scalarPrototype()
    {
        return $this->prototype('scalar');
    }
    /**
     * @return BooleanNodeDefinition
     */
    public function booleanPrototype()
    {
        return $this->prototype('boolean');
    }
    /**
     * @return IntegerNodeDefinition
     */
    public function integerPrototype()
    {
        return $this->prototype('integer');
    }
    /**
     * @return FloatNodeDefinition
     */
    public function floatPrototype()
    {
        return $this->prototype('float');
    }
    /**
     * @return ArrayNodeDefinition
     */
    public function arrayPrototype()
    {
        return $this->prototype('array');
    }
    /**
     * @return EnumNodeDefinition
     */
    public function enumPrototype()
    {
        return $this->prototype('enum');
    }
    /**
     * Adds the default value if the node is not set in the configuration.
     *
     * This method is applicable to concrete nodes only (not to prototype nodes).
     * If this function has been called and the node is not set during the finalization
     * phase, it's default value will be derived from its children default values.
     *
     * @return $this
     */
    public function addDefaultsIfNotSet()
    {
        $this->addDefaults = \true;
        return $this;
    }
    /**
     * Adds children with a default value when none are defined.
     *
     * This method is applicable to prototype nodes only.
     *
     * @param int|string|array|null $children The number of children|The child name|The children names to be added
     *
     * @return $this
     */
    public function addDefaultChildrenIfNoneSet($children = null)
    {
        $this->addDefaultChildren = $children;
        return $this;
    }
    /**
     * Requires the node to have at least one element.
     *
     * This method is applicable to prototype nodes only.
     *
     * @return $this
     */
    public function requiresAtLeastOneElement()
    {
        $this->atLeastOne = \true;
        return $this;
    }
    /**
     * Disallows adding news keys in a subsequent configuration.
     *
     * If used all keys have to be defined in the same configuration file.
     *
     * @return $this
     */
    public function disallowNewKeysInSubsequentConfigs()
    {
        $this->allowNewKeys = \false;
        return $this;
    }
    /**
     * Sets a normalization rule for XML configurations.
     *
     * @param string $singular The key to remap
     * @param string $plural   The plural of the key for irregular plurals
     *
     * @return $this
     */
    public function fixXmlConfig($singular, $plural = null)
    {
        $this->normalization()->remap($singular, $plural);
        return $this;
    }
    /**
     * Sets the attribute which value is to be used as key.
     *
     * This is useful when you have an indexed array that should be an
     * associative array. You can select an item from within the array
     * to be the key of the particular item. For example, if "id" is the
     * "key", then:
     *
     *     [
     *         ['id' => 'my_name', 'foo' => 'bar'],
     *     ];
     *
     *   becomes
     *
     *     [
     *         'my_name' => ['foo' => 'bar'],
     *     ];
     *
     * If you'd like "'id' => 'my_name'" to still be present in the resulting
     * array, then you can set the second argument of this method to false.
     *
     * This method is applicable to prototype nodes only.
     *
     * @param string $name          The name of the key
     * @param bool   $removeKeyItem Whether or not the key item should be removed
     *
     * @return $this
     */
    public function useAttributeAsKey($name, $removeKeyItem = \true)
    {
        $this->key = $name;
        $this->removeKeyItem = $removeKeyItem;
        return $this;
    }
    /**
     * Sets whether the node can be unset.
     *
     * @param bool $allow
     *
     * @return $this
     */
    public function canBeUnset($allow = \true)
    {
        $this->merge()->allowUnset($allow);
        return $this;
    }
    /**
     * Adds an "enabled" boolean to enable the current section.
     *
     * By default, the section is disabled. If any configuration is specified then
     * the node will be automatically enabled:
     *
     * enableableArrayNode: {enabled: true, ...}   # The config is enabled & default values get overridden
     * enableableArrayNode: ~                      # The config is enabled & use the default values
     * enableableArrayNode: true                   # The config is enabled & use the default values
     * enableableArrayNode: {other: value, ...}    # The config is enabled & default values get overridden
     * enableableArrayNode: {enabled: false, ...}  # The config is disabled
     * enableableArrayNode: false                  # The config is disabled
     *
     * @return $this
     */
    public function canBeEnabled()
    {
        $this->addDefaultsIfNotSet()->treatFalseLike(['enabled' => \false])->treatTrueLike(['enabled' => \true])->treatNullLike(['enabled' => \true])->beforeNormalization()->ifArray()->then(function ($v) {
            $v['enabled'] = isset($v['enabled']) ? $v['enabled'] : \true;
            return $v;
        })->end()->children()->booleanNode('enabled')->defaultFalse();
        return $this;
    }
    /**
     * Adds an "enabled" boolean to enable the current section.
     *
     * By default, the section is enabled.
     *
     * @return $this
     */
    public function canBeDisabled()
    {
        $this->addDefaultsIfNotSet()->treatFalseLike(['enabled' => \false])->treatTrueLike(['enabled' => \true])->treatNullLike(['enabled' => \true])->children()->booleanNode('enabled')->defaultTrue();
        return $this;
    }
    /**
     * Disables the deep merging of the node.
     *
     * @return $this
     */
    public function performNoDeepMerging()
    {
        $this->performDeepMerging = \false;
        return $this;
    }
    /**
     * Allows extra config keys to be specified under an array without
     * throwing an exception.
     *
     * Those config values are ignored and removed from the resulting
     * array. This should be used only in special cases where you want
     * to send an entire configuration array through a special tree that
     * processes only part of the array.
     *
     * @param bool $remove Whether to remove the extra keys
     *
     * @return $this
     */
    public function ignoreExtraKeys($remove = \true)
    {
        $this->ignoreExtraKeys = \true;
        $this->removeExtraKeys = $remove;
        return $this;
    }
    /**
     * Sets key normalization.
     *
     * @param bool $bool Whether to enable key normalization
     *
     * @return $this
     */
    public function normalizeKeys($bool)
    {
        $this->normalizeKeys = (bool) $bool;
        return $this;
    }
    /**
     * {@inheritdoc}
     */
    public function append(\MolliePrefix\Symfony\Component\Config\Definition\Builder\NodeDefinition $node)
    {
        $this->children[$node->name] = $node->setParent($this);
        return $this;
    }
    /**
     * Returns a node builder to be used to add children and prototype.
     *
     * @return NodeBuilder The node builder
     */
    protected function getNodeBuilder()
    {
        if (null === $this->nodeBuilder) {
            $this->nodeBuilder = new \MolliePrefix\Symfony\Component\Config\Definition\Builder\NodeBuilder();
        }
        return $this->nodeBuilder->setParent($this);
    }
    /**
     * {@inheritdoc}
     */
    protected function createNode()
    {
        if (null === $this->prototype) {
            $node = new \MolliePrefix\Symfony\Component\Config\Definition\ArrayNode($this->name, $this->parent);
            $this->validateConcreteNode($node);
            $node->setAddIfNotSet($this->addDefaults);
            foreach ($this->children as $child) {
                $child->parent = $node;
                $node->addChild($child->getNode());
            }
        } else {
            $node = new \MolliePrefix\Symfony\Component\Config\Definition\PrototypedArrayNode($this->name, $this->parent);
            $this->validatePrototypeNode($node);
            if (null !== $this->key) {
                $node->setKeyAttribute($this->key, $this->removeKeyItem);
            }
            if (\false === $this->allowEmptyValue) {
                @\trigger_error(\sprintf('Using %s::cannotBeEmpty() at path "%s" has no effect, consider requiresAtLeastOneElement() instead. In 4.0 both methods will behave the same.', __CLASS__, $node->getPath()), \E_USER_DEPRECATED);
            }
            if (\true === $this->atLeastOne) {
                $node->setMinNumberOfElements(1);
            }
            if ($this->default) {
                $node->setDefaultValue($this->defaultValue);
            }
            if (\false !== $this->addDefaultChildren) {
                $node->setAddChildrenIfNoneSet($this->addDefaultChildren);
                if ($this->prototype instanceof static && null === $this->prototype->prototype) {
                    $this->prototype->addDefaultsIfNotSet();
                }
            }
            $this->prototype->parent = $node;
            $node->setPrototype($this->prototype->getNode());
        }
        $node->setAllowNewKeys($this->allowNewKeys);
        $node->addEquivalentValue(null, $this->nullEquivalent);
        $node->addEquivalentValue(\true, $this->trueEquivalent);
        $node->addEquivalentValue(\false, $this->falseEquivalent);
        $node->setPerformDeepMerging($this->performDeepMerging);
        $node->setRequired($this->required);
        $node->setDeprecated($this->deprecationMessage);
        $node->setIgnoreExtraKeys($this->ignoreExtraKeys, $this->removeExtraKeys);
        $node->setNormalizeKeys($this->normalizeKeys);
        if (null !== $this->normalization) {
            $node->setNormalizationClosures($this->normalization->before);
            $node->setXmlRemappings($this->normalization->remappings);
        }
        if (null !== $this->merge) {
            $node->setAllowOverwrite($this->merge->allowOverwrite);
            $node->setAllowFalse($this->merge->allowFalse);
        }
        if (null !== $this->validation) {
            $node->setFinalValidationClosures($this->validation->rules);
        }
        return $node;
    }
    /**
     * Validate the configuration of a concrete node.
     *
     * @throws InvalidDefinitionException
     */
    protected function validateConcreteNode(\MolliePrefix\Symfony\Component\Config\Definition\ArrayNode $node)
    {
        $path = $node->getPath();
        if (null !== $this->key) {
            throw new \MolliePrefix\Symfony\Component\Config\Definition\Exception\InvalidDefinitionException(\sprintf('->useAttributeAsKey() is not applicable to concrete nodes at path "%s".', $path));
        }
        if (\false === $this->allowEmptyValue) {
            @\trigger_error(\sprintf('->cannotBeEmpty() is not applicable to concrete nodes at path "%s". In 4.0 it will throw an exception.', $path), \E_USER_DEPRECATED);
        }
        if (\true === $this->atLeastOne) {
            throw new \MolliePrefix\Symfony\Component\Config\Definition\Exception\InvalidDefinitionException(\sprintf('->requiresAtLeastOneElement() is not applicable to concrete nodes at path "%s".', $path));
        }
        if ($this->default) {
            throw new \MolliePrefix\Symfony\Component\Config\Definition\Exception\InvalidDefinitionException(\sprintf('->defaultValue() is not applicable to concrete nodes at path "%s".', $path));
        }
        if (\false !== $this->addDefaultChildren) {
            throw new \MolliePrefix\Symfony\Component\Config\Definition\Exception\InvalidDefinitionException(\sprintf('->addDefaultChildrenIfNoneSet() is not applicable to concrete nodes at path "%s".', $path));
        }
    }
    /**
     * Validate the configuration of a prototype node.
     *
     * @throws InvalidDefinitionException
     */
    protected function validatePrototypeNode(\MolliePrefix\Symfony\Component\Config\Definition\PrototypedArrayNode $node)
    {
        $path = $node->getPath();
        if ($this->addDefaults) {
            throw new \MolliePrefix\Symfony\Component\Config\Definition\Exception\InvalidDefinitionException(\sprintf('->addDefaultsIfNotSet() is not applicable to prototype nodes at path "%s".', $path));
        }
        if (\false !== $this->addDefaultChildren) {
            if ($this->default) {
                throw new \MolliePrefix\Symfony\Component\Config\Definition\Exception\InvalidDefinitionException(\sprintf('A default value and default children might not be used together at path "%s".', $path));
            }
            if (null !== $this->key && (null === $this->addDefaultChildren || \is_int($this->addDefaultChildren) && $this->addDefaultChildren > 0)) {
                throw new \MolliePrefix\Symfony\Component\Config\Definition\Exception\InvalidDefinitionException(\sprintf('->addDefaultChildrenIfNoneSet() should set default children names as ->useAttributeAsKey() is used at path "%s".', $path));
            }
            if (null === $this->key && (\is_string($this->addDefaultChildren) || \is_array($this->addDefaultChildren))) {
                throw new \MolliePrefix\Symfony\Component\Config\Definition\Exception\InvalidDefinitionException(\sprintf('->addDefaultChildrenIfNoneSet() might not set default children names as ->useAttributeAsKey() is not used at path "%s".', $path));
            }
        }
    }
}

<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace MolliePrefix\Symfony\Component\Cache\Traits;

use MolliePrefix\Symfony\Component\Cache\CacheItem;
use MolliePrefix\Symfony\Component\Cache\Exception\InvalidArgumentException;
/**
 * @author Titouan Galopin <galopintitouan@gmail.com>
 * @author Nicolas Grekas <p@tchwork.com>
 *
 * @internal
 */
trait PhpArrayTrait
{
    use ProxyTrait;
    private $file;
    private $values;
    private $zendDetectUnicode;
    private static $valuesCache = [];
    /**
     * Store an array of cached values.
     *
     * @param array $values The cached values
     */
    public function warmUp(array $values)
    {
        if (\file_exists($this->file)) {
            if (!\is_file($this->file)) {
                throw new \MolliePrefix\Symfony\Component\Cache\Exception\InvalidArgumentException(\sprintf('Cache path exists and is not a file: "%s".', $this->file));
            }
            if (!\is_writable($this->file)) {
                throw new \MolliePrefix\Symfony\Component\Cache\Exception\InvalidArgumentException(\sprintf('Cache file is not writable: "%s".', $this->file));
            }
        } else {
            $directory = \dirname($this->file);
            if (!\is_dir($directory) && !@\mkdir($directory, 0777, \true)) {
                throw new \MolliePrefix\Symfony\Component\Cache\Exception\InvalidArgumentException(\sprintf('Cache directory does not exist and cannot be created: "%s".', $directory));
            }
            if (!\is_writable($directory)) {
                throw new \MolliePrefix\Symfony\Component\Cache\Exception\InvalidArgumentException(\sprintf('Cache directory is not writable: "%s".', $directory));
            }
        }
        $dump = <<<'EOF'
<?php

// This file has been auto-generated by the Symfony Cache Component.

return [


EOF;
        foreach ($values as $key => $value) {
            \MolliePrefix\Symfony\Component\Cache\CacheItem::validateKey(\is_int($key) ? (string) $key : $key);
            if (null === $value || \is_object($value)) {
                try {
                    $value = \serialize($value);
                } catch (\Exception $e) {
                    throw new \MolliePrefix\Symfony\Component\Cache\Exception\InvalidArgumentException(\sprintf('Cache key "%s" has non-serializable "%s" value.', $key, \get_class($value)), 0, $e);
                }
            } elseif (\is_array($value)) {
                try {
                    $serialized = \serialize($value);
                    $unserialized = \unserialize($serialized);
                } catch (\Exception $e) {
                    throw new \MolliePrefix\Symfony\Component\Cache\Exception\InvalidArgumentException(\sprintf('Cache key "%s" has non-serializable array value.', $key), 0, $e);
                }
                // Store arrays serialized if they contain any objects or references
                if ($unserialized !== $value || \false !== \strpos($serialized, ';R:') && \preg_match('/;R:[1-9]/', $serialized)) {
                    $value = $serialized;
                }
            } elseif (\is_string($value)) {
                // Serialize strings if they could be confused with serialized objects or arrays
                if ('N;' === $value || isset($value[2]) && ':' === $value[1]) {
                    $value = \serialize($value);
                }
            } elseif (!\is_scalar($value)) {
                throw new \MolliePrefix\Symfony\Component\Cache\Exception\InvalidArgumentException(\sprintf('Cache key "%s" has non-serializable "%s" value.', $key, \gettype($value)));
            }
            $dump .= \var_export($key, \true) . ' => ' . \var_export($value, \true) . ",\n";
        }
        $dump .= "\n];\n";
        $dump = \str_replace("' . \"\\0\" . '", "\0", $dump);
        $tmpFile = \uniqid($this->file, \true);
        \file_put_contents($tmpFile, $dump);
        @\chmod($tmpFile, 0666 & ~\umask());
        unset($serialized, $unserialized, $value, $dump);
        @\rename($tmpFile, $this->file);
        unset(self::$valuesCache[$this->file]);
        $this->initialize();
    }
    /**
     * {@inheritdoc}
     */
    public function clear()
    {
        $this->values = [];
        $cleared = @\unlink($this->file) || !\file_exists($this->file);
        unset(self::$valuesCache[$this->file]);
        return $this->pool->clear() && $cleared;
    }
    /**
     * Load the cache file.
     */
    private function initialize()
    {
        if (isset(self::$valuesCache[$this->file])) {
            $this->values = self::$valuesCache[$this->file];
            return;
        }
        if ($this->zendDetectUnicode) {
            $zmb = \ini_set('zend.detect_unicode', 0);
        }
        try {
            $this->values = self::$valuesCache[$this->file] = \file_exists($this->file) ? include $this->file ?: [] : [];
        } finally {
            if ($this->zendDetectUnicode) {
                \ini_set('zend.detect_unicode', $zmb);
            }
        }
    }
}

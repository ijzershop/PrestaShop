<?php

/**
 * Pure-PHP implementation of DES.
 *
 * Uses mcrypt, if available, and an internal implementation, otherwise.
 *
 * PHP version 5
 *
 * Useful resources are as follows:
 *
 *  - {@link http://en.wikipedia.org/wiki/DES_supplementary_material Wikipedia: DES supplementary material}
 *  - {@link http://www.itl.nist.gov/fipspubs/fip46-2.htm FIPS 46-2 - (DES), Data Encryption Standard}
 *  - {@link http://www.cs.eku.edu/faculty/styer/460/Encrypt/JS-DES.html JavaScript DES Example}
 *
 * Here's a short example of how to use this library:
 * <code>
 * <?php
 *    include 'vendor/autoload.php';
 *
 *    $des = new \phpseclib\Crypt\DES();
 *
 *    $des->setKey('abcdefgh');
 *
 *    $size = 10 * 1024;
 *    $plaintext = '';
 *    for ($i = 0; $i < $size; $i++) {
 *        $plaintext.= 'a';
 *    }
 *
 *    echo $des->decrypt($des->encrypt($plaintext));
 * ?>
 * </code>
 *
 * @category  Crypt
 * @package   DES
 * @author    Jim Wigginton <terrafrost@php.net>
 * @copyright 2007 Jim Wigginton
 * @license   http://www.opensource.org/licenses/mit-license.html  MIT License
 * @link      http://phpseclib.sourceforge.net
 */
namespace PrestaShop\Module\PsAccounts\Vendor\phpseclib\Crypt;

/**
 * Pure-PHP implementation of DES.
 *
 * @package DES
 * @author  Jim Wigginton <terrafrost@php.net>
 * @access  public
 */
class DES extends Base
{
    /**#@+
     * @access private
     * @see \phpseclib\Crypt\DES::_setupKey()
     * @see \phpseclib\Crypt\DES::_processBlock()
     */
    /**
     * Contains $keys[self::ENCRYPT]
     */
    const ENCRYPT = 0;
    /**
     * Contains $keys[self::DECRYPT]
     */
    const DECRYPT = 1;
    /**#@-*/
    /**
     * Block Length of the cipher
     *
     * @see \phpseclib\Crypt\Base::block_size
     * @var int
     * @access private
     */
    var $block_size = 8;
    /**
     * Key Length (in bytes)
     *
     * @see \phpseclib\Crypt\Base::setKeyLength()
     * @var int
     * @access private
     */
    var $key_length = 8;
    /**
     * The mcrypt specific name of the cipher
     *
     * @see \phpseclib\Crypt\Base::cipher_name_mcrypt
     * @var string
     * @access private
     */
    var $cipher_name_mcrypt = 'des';
    /**
     * The OpenSSL names of the cipher / modes
     *
     * @see \phpseclib\Crypt\Base::openssl_mode_names
     * @var array
     * @access private
     */
    var $openssl_mode_names = array(self::MODE_ECB => 'des-ecb', self::MODE_CBC => 'des-cbc', self::MODE_CFB => 'des-cfb', self::MODE_OFB => 'des-ofb');
    /**
     * Optimizing value while CFB-encrypting
     *
     * @see \phpseclib\Crypt\Base::cfb_init_len
     * @var int
     * @access private
     */
    var $cfb_init_len = 500;
    /**
     * Switch for DES/3DES encryption
     *
     * Used only if $engine == self::ENGINE_INTERNAL
     *
     * @see self::_setupKey()
     * @see self::_processBlock()
     * @var int
     * @access private
     */
    var $des_rounds = 1;
    /**
     * max possible size of $key
     *
     * @see self::setKey()
     * @var string
     * @access private
     */
    var $key_length_max = 8;
    /**
     * The Key Schedule
     *
     * @see self::_setupKey()
     * @var array
     * @access private
     */
    var $keys;
    /**
     * Shuffle table.
     *
     * For each byte value index, the entry holds an 8-byte string
     * with each byte containing all bits in the same state as the
     * corresponding bit in the index value.
     *
     * @see self::_processBlock()
     * @see self::_setupKey()
     * @var array
     * @access private
     */
    var $shuffle = array("\x00\x00\x00\x00\x00\x00\x00\x00", "\x00\x00\x00\x00\x00\x00\x00\xff", "\x00\x00\x00\x00\x00\x00\xff\x00", "\x00\x00\x00\x00\x00\x00\xff\xff", "\x00\x00\x00\x00\x00\xff\x00\x00", "\x00\x00\x00\x00\x00\xff\x00\xff", "\x00\x00\x00\x00\x00\xff\xff\x00", "\x00\x00\x00\x00\x00\xff\xff\xff", "\x00\x00\x00\x00\xff\x00\x00\x00", "\x00\x00\x00\x00\xff\x00\x00\xff", "\x00\x00\x00\x00\xff\x00\xff\x00", "\x00\x00\x00\x00\xff\x00\xff\xff", "\x00\x00\x00\x00\xff\xff\x00\x00", "\x00\x00\x00\x00\xff\xff\x00\xff", "\x00\x00\x00\x00\xff\xff\xff\x00", "\x00\x00\x00\x00\xff\xff\xff\xff", "\x00\x00\x00\xff\x00\x00\x00\x00", "\x00\x00\x00\xff\x00\x00\x00\xff", "\x00\x00\x00\xff\x00\x00\xff\x00", "\x00\x00\x00\xff\x00\x00\xff\xff", "\x00\x00\x00\xff\x00\xff\x00\x00", "\x00\x00\x00\xff\x00\xff\x00\xff", "\x00\x00\x00\xff\x00\xff\xff\x00", "\x00\x00\x00\xff\x00\xff\xff\xff", "\x00\x00\x00\xff\xff\x00\x00\x00", "\x00\x00\x00\xff\xff\x00\x00\xff", "\x00\x00\x00\xff\xff\x00\xff\x00", "\x00\x00\x00\xff\xff\x00\xff\xff", "\x00\x00\x00\xff\xff\xff\x00\x00", "\x00\x00\x00\xff\xff\xff\x00\xff", "\x00\x00\x00\xff\xff\xff\xff\x00", "\x00\x00\x00\xff\xff\xff\xff\xff", "\x00\x00\xff\x00\x00\x00\x00\x00", "\x00\x00\xff\x00\x00\x00\x00\xff", "\x00\x00\xff\x00\x00\x00\xff\x00", "\x00\x00\xff\x00\x00\x00\xff\xff", "\x00\x00\xff\x00\x00\xff\x00\x00", "\x00\x00\xff\x00\x00\xff\x00\xff", "\x00\x00\xff\x00\x00\xff\xff\x00", "\x00\x00\xff\x00\x00\xff\xff\xff", "\x00\x00\xff\x00\xff\x00\x00\x00", "\x00\x00\xff\x00\xff\x00\x00\xff", "\x00\x00\xff\x00\xff\x00\xff\x00", "\x00\x00\xff\x00\xff\x00\xff\xff", "\x00\x00\xff\x00\xff\xff\x00\x00", "\x00\x00\xff\x00\xff\xff\x00\xff", "\x00\x00\xff\x00\xff\xff\xff\x00", "\x00\x00\xff\x00\xff\xff\xff\xff", "\x00\x00\xff\xff\x00\x00\x00\x00", "\x00\x00\xff\xff\x00\x00\x00\xff", "\x00\x00\xff\xff\x00\x00\xff\x00", "\x00\x00\xff\xff\x00\x00\xff\xff", "\x00\x00\xff\xff\x00\xff\x00\x00", "\x00\x00\xff\xff\x00\xff\x00\xff", "\x00\x00\xff\xff\x00\xff\xff\x00", "\x00\x00\xff\xff\x00\xff\xff\xff", "\x00\x00\xff\xff\xff\x00\x00\x00", "\x00\x00\xff\xff\xff\x00\x00\xff", "\x00\x00\xff\xff\xff\x00\xff\x00", "\x00\x00\xff\xff\xff\x00\xff\xff", "\x00\x00\xff\xff\xff\xff\x00\x00", "\x00\x00\xff\xff\xff\xff\x00\xff", "\x00\x00\xff\xff\xff\xff\xff\x00", "\x00\x00\xff\xff\xff\xff\xff\xff", "\x00\xff\x00\x00\x00\x00\x00\x00", "\x00\xff\x00\x00\x00\x00\x00\xff", "\x00\xff\x00\x00\x00\x00\xff\x00", "\x00\xff\x00\x00\x00\x00\xff\xff", "\x00\xff\x00\x00\x00\xff\x00\x00", "\x00\xff\x00\x00\x00\xff\x00\xff", "\x00\xff\x00\x00\x00\xff\xff\x00", "\x00\xff\x00\x00\x00\xff\xff\xff", "\x00\xff\x00\x00\xff\x00\x00\x00", "\x00\xff\x00\x00\xff\x00\x00\xff", "\x00\xff\x00\x00\xff\x00\xff\x00", "\x00\xff\x00\x00\xff\x00\xff\xff", "\x00\xff\x00\x00\xff\xff\x00\x00", "\x00\xff\x00\x00\xff\xff\x00\xff", "\x00\xff\x00\x00\xff\xff\xff\x00", "\x00\xff\x00\x00\xff\xff\xff\xff", "\x00\xff\x00\xff\x00\x00\x00\x00", "\x00\xff\x00\xff\x00\x00\x00\xff", "\x00\xff\x00\xff\x00\x00\xff\x00", "\x00\xff\x00\xff\x00\x00\xff\xff", "\x00\xff\x00\xff\x00\xff\x00\x00", "\x00\xff\x00\xff\x00\xff\x00\xff", "\x00\xff\x00\xff\x00\xff\xff\x00", "\x00\xff\x00\xff\x00\xff\xff\xff", "\x00\xff\x00\xff\xff\x00\x00\x00", "\x00\xff\x00\xff\xff\x00\x00\xff", "\x00\xff\x00\xff\xff\x00\xff\x00", "\x00\xff\x00\xff\xff\x00\xff\xff", "\x00\xff\x00\xff\xff\xff\x00\x00", "\x00\xff\x00\xff\xff\xff\x00\xff", "\x00\xff\x00\xff\xff\xff\xff\x00", "\x00\xff\x00\xff\xff\xff\xff\xff", "\x00\xff\xff\x00\x00\x00\x00\x00", "\x00\xff\xff\x00\x00\x00\x00\xff", "\x00\xff\xff\x00\x00\x00\xff\x00", "\x00\xff\xff\x00\x00\x00\xff\xff", "\x00\xff\xff\x00\x00\xff\x00\x00", "\x00\xff\xff\x00\x00\xff\x00\xff", "\x00\xff\xff\x00\x00\xff\xff\x00", "\x00\xff\xff\x00\x00\xff\xff\xff", "\x00\xff\xff\x00\xff\x00\x00\x00", "\x00\xff\xff\x00\xff\x00\x00\xff", "\x00\xff\xff\x00\xff\x00\xff\x00", "\x00\xff\xff\x00\xff\x00\xff\xff", "\x00\xff\xff\x00\xff\xff\x00\x00", "\x00\xff\xff\x00\xff\xff\x00\xff", "\x00\xff\xff\x00\xff\xff\xff\x00", "\x00\xff\xff\x00\xff\xff\xff\xff", "\x00\xff\xff\xff\x00\x00\x00\x00", "\x00\xff\xff\xff\x00\x00\x00\xff", "\x00\xff\xff\xff\x00\x00\xff\x00", "\x00\xff\xff\xff\x00\x00\xff\xff", "\x00\xff\xff\xff\x00\xff\x00\x00", "\x00\xff\xff\xff\x00\xff\x00\xff", "\x00\xff\xff\xff\x00\xff\xff\x00", "\x00\xff\xff\xff\x00\xff\xff\xff", "\x00\xff\xff\xff\xff\x00\x00\x00", "\x00\xff\xff\xff\xff\x00\x00\xff", "\x00\xff\xff\xff\xff\x00\xff\x00", "\x00\xff\xff\xff\xff\x00\xff\xff", "\x00\xff\xff\xff\xff\xff\x00\x00", "\x00\xff\xff\xff\xff\xff\x00\xff", "\x00\xff\xff\xff\xff\xff\xff\x00", "\x00\xff\xff\xff\xff\xff\xff\xff", "\xff\x00\x00\x00\x00\x00\x00\x00", "\xff\x00\x00\x00\x00\x00\x00\xff", "\xff\x00\x00\x00\x00\x00\xff\x00", "\xff\x00\x00\x00\x00\x00\xff\xff", "\xff\x00\x00\x00\x00\xff\x00\x00", "\xff\x00\x00\x00\x00\xff\x00\xff", "\xff\x00\x00\x00\x00\xff\xff\x00", "\xff\x00\x00\x00\x00\xff\xff\xff", "\xff\x00\x00\x00\xff\x00\x00\x00", "\xff\x00\x00\x00\xff\x00\x00\xff", "\xff\x00\x00\x00\xff\x00\xff\x00", "\xff\x00\x00\x00\xff\x00\xff\xff", "\xff\x00\x00\x00\xff\xff\x00\x00", "\xff\x00\x00\x00\xff\xff\x00\xff", "\xff\x00\x00\x00\xff\xff\xff\x00", "\xff\x00\x00\x00\xff\xff\xff\xff", "\xff\x00\x00\xff\x00\x00\x00\x00", "\xff\x00\x00\xff\x00\x00\x00\xff", "\xff\x00\x00\xff\x00\x00\xff\x00", "\xff\x00\x00\xff\x00\x00\xff\xff", "\xff\x00\x00\xff\x00\xff\x00\x00", "\xff\x00\x00\xff\x00\xff\x00\xff", "\xff\x00\x00\xff\x00\xff\xff\x00", "\xff\x00\x00\xff\x00\xff\xff\xff", "\xff\x00\x00\xff\xff\x00\x00\x00", "\xff\x00\x00\xff\xff\x00\x00\xff", "\xff\x00\x00\xff\xff\x00\xff\x00", "\xff\x00\x00\xff\xff\x00\xff\xff", "\xff\x00\x00\xff\xff\xff\x00\x00", "\xff\x00\x00\xff\xff\xff\x00\xff", "\xff\x00\x00\xff\xff\xff\xff\x00", "\xff\x00\x00\xff\xff\xff\xff\xff", "\xff\x00\xff\x00\x00\x00\x00\x00", "\xff\x00\xff\x00\x00\x00\x00\xff", "\xff\x00\xff\x00\x00\x00\xff\x00", "\xff\x00\xff\x00\x00\x00\xff\xff", "\xff\x00\xff\x00\x00\xff\x00\x00", "\xff\x00\xff\x00\x00\xff\x00\xff", "\xff\x00\xff\x00\x00\xff\xff\x00", "\xff\x00\xff\x00\x00\xff\xff\xff", "\xff\x00\xff\x00\xff\x00\x00\x00", "\xff\x00\xff\x00\xff\x00\x00\xff", "\xff\x00\xff\x00\xff\x00\xff\x00", "\xff\x00\xff\x00\xff\x00\xff\xff", "\xff\x00\xff\x00\xff\xff\x00\x00", "\xff\x00\xff\x00\xff\xff\x00\xff", "\xff\x00\xff\x00\xff\xff\xff\x00", "\xff\x00\xff\x00\xff\xff\xff\xff", "\xff\x00\xff\xff\x00\x00\x00\x00", "\xff\x00\xff\xff\x00\x00\x00\xff", "\xff\x00\xff\xff\x00\x00\xff\x00", "\xff\x00\xff\xff\x00\x00\xff\xff", "\xff\x00\xff\xff\x00\xff\x00\x00", "\xff\x00\xff\xff\x00\xff\x00\xff", "\xff\x00\xff\xff\x00\xff\xff\x00", "\xff\x00\xff\xff\x00\xff\xff\xff", "\xff\x00\xff\xff\xff\x00\x00\x00", "\xff\x00\xff\xff\xff\x00\x00\xff", "\xff\x00\xff\xff\xff\x00\xff\x00", "\xff\x00\xff\xff\xff\x00\xff\xff", "\xff\x00\xff\xff\xff\xff\x00\x00", "\xff\x00\xff\xff\xff\xff\x00\xff", "\xff\x00\xff\xff\xff\xff\xff\x00", "\xff\x00\xff\xff\xff\xff\xff\xff", "\xff\xff\x00\x00\x00\x00\x00\x00", "\xff\xff\x00\x00\x00\x00\x00\xff", "\xff\xff\x00\x00\x00\x00\xff\x00", "\xff\xff\x00\x00\x00\x00\xff\xff", "\xff\xff\x00\x00\x00\xff\x00\x00", "\xff\xff\x00\x00\x00\xff\x00\xff", "\xff\xff\x00\x00\x00\xff\xff\x00", "\xff\xff\x00\x00\x00\xff\xff\xff", "\xff\xff\x00\x00\xff\x00\x00\x00", "\xff\xff\x00\x00\xff\x00\x00\xff", "\xff\xff\x00\x00\xff\x00\xff\x00", "\xff\xff\x00\x00\xff\x00\xff\xff", "\xff\xff\x00\x00\xff\xff\x00\x00", "\xff\xff\x00\x00\xff\xff\x00\xff", "\xff\xff\x00\x00\xff\xff\xff\x00", "\xff\xff\x00\x00\xff\xff\xff\xff", "\xff\xff\x00\xff\x00\x00\x00\x00", "\xff\xff\x00\xff\x00\x00\x00\xff", "\xff\xff\x00\xff\x00\x00\xff\x00", "\xff\xff\x00\xff\x00\x00\xff\xff", "\xff\xff\x00\xff\x00\xff\x00\x00", "\xff\xff\x00\xff\x00\xff\x00\xff", "\xff\xff\x00\xff\x00\xff\xff\x00", "\xff\xff\x00\xff\x00\xff\xff\xff", "\xff\xff\x00\xff\xff\x00\x00\x00", "\xff\xff\x00\xff\xff\x00\x00\xff", "\xff\xff\x00\xff\xff\x00\xff\x00", "\xff\xff\x00\xff\xff\x00\xff\xff", "\xff\xff\x00\xff\xff\xff\x00\x00", "\xff\xff\x00\xff\xff\xff\x00\xff", "\xff\xff\x00\xff\xff\xff\xff\x00", "\xff\xff\x00\xff\xff\xff\xff\xff", "\xff\xff\xff\x00\x00\x00\x00\x00", "\xff\xff\xff\x00\x00\x00\x00\xff", "\xff\xff\xff\x00\x00\x00\xff\x00", "\xff\xff\xff\x00\x00\x00\xff\xff", "\xff\xff\xff\x00\x00\xff\x00\x00", "\xff\xff\xff\x00\x00\xff\x00\xff", "\xff\xff\xff\x00\x00\xff\xff\x00", "\xff\xff\xff\x00\x00\xff\xff\xff", "\xff\xff\xff\x00\xff\x00\x00\x00", "\xff\xff\xff\x00\xff\x00\x00\xff", "\xff\xff\xff\x00\xff\x00\xff\x00", "\xff\xff\xff\x00\xff\x00\xff\xff", "\xff\xff\xff\x00\xff\xff\x00\x00", "\xff\xff\xff\x00\xff\xff\x00\xff", "\xff\xff\xff\x00\xff\xff\xff\x00", "\xff\xff\xff\x00\xff\xff\xff\xff", "\xff\xff\xff\xff\x00\x00\x00\x00", "\xff\xff\xff\xff\x00\x00\x00\xff", "\xff\xff\xff\xff\x00\x00\xff\x00", "\xff\xff\xff\xff\x00\x00\xff\xff", "\xff\xff\xff\xff\x00\xff\x00\x00", "\xff\xff\xff\xff\x00\xff\x00\xff", "\xff\xff\xff\xff\x00\xff\xff\x00", "\xff\xff\xff\xff\x00\xff\xff\xff", "\xff\xff\xff\xff\xff\x00\x00\x00", "\xff\xff\xff\xff\xff\x00\x00\xff", "\xff\xff\xff\xff\xff\x00\xff\x00", "\xff\xff\xff\xff\xff\x00\xff\xff", "\xff\xff\xff\xff\xff\xff\x00\x00", "\xff\xff\xff\xff\xff\xff\x00\xff", "\xff\xff\xff\xff\xff\xff\xff\x00", "\xff\xff\xff\xff\xff\xff\xff\xff");
    /**
     * IP mapping helper table.
     *
     * Indexing this table with each source byte performs the initial bit permutation.
     *
     * @var array
     * @access private
     */
    var $ipmap = array(0x0, 0x10, 0x1, 0x11, 0x20, 0x30, 0x21, 0x31, 0x2, 0x12, 0x3, 0x13, 0x22, 0x32, 0x23, 0x33, 0x40, 0x50, 0x41, 0x51, 0x60, 0x70, 0x61, 0x71, 0x42, 0x52, 0x43, 0x53, 0x62, 0x72, 0x63, 0x73, 0x4, 0x14, 0x5, 0x15, 0x24, 0x34, 0x25, 0x35, 0x6, 0x16, 0x7, 0x17, 0x26, 0x36, 0x27, 0x37, 0x44, 0x54, 0x45, 0x55, 0x64, 0x74, 0x65, 0x75, 0x46, 0x56, 0x47, 0x57, 0x66, 0x76, 0x67, 0x77, 0x80, 0x90, 0x81, 0x91, 0xa0, 0xb0, 0xa1, 0xb1, 0x82, 0x92, 0x83, 0x93, 0xa2, 0xb2, 0xa3, 0xb3, 0xc0, 0xd0, 0xc1, 0xd1, 0xe0, 0xf0, 0xe1, 0xf1, 0xc2, 0xd2, 0xc3, 0xd3, 0xe2, 0xf2, 0xe3, 0xf3, 0x84, 0x94, 0x85, 0x95, 0xa4, 0xb4, 0xa5, 0xb5, 0x86, 0x96, 0x87, 0x97, 0xa6, 0xb6, 0xa7, 0xb7, 0xc4, 0xd4, 0xc5, 0xd5, 0xe4, 0xf4, 0xe5, 0xf5, 0xc6, 0xd6, 0xc7, 0xd7, 0xe6, 0xf6, 0xe7, 0xf7, 0x8, 0x18, 0x9, 0x19, 0x28, 0x38, 0x29, 0x39, 0xa, 0x1a, 0xb, 0x1b, 0x2a, 0x3a, 0x2b, 0x3b, 0x48, 0x58, 0x49, 0x59, 0x68, 0x78, 0x69, 0x79, 0x4a, 0x5a, 0x4b, 0x5b, 0x6a, 0x7a, 0x6b, 0x7b, 0xc, 0x1c, 0xd, 0x1d, 0x2c, 0x3c, 0x2d, 0x3d, 0xe, 0x1e, 0xf, 0x1f, 0x2e, 0x3e, 0x2f, 0x3f, 0x4c, 0x5c, 0x4d, 0x5d, 0x6c, 0x7c, 0x6d, 0x7d, 0x4e, 0x5e, 0x4f, 0x5f, 0x6e, 0x7e, 0x6f, 0x7f, 0x88, 0x98, 0x89, 0x99, 0xa8, 0xb8, 0xa9, 0xb9, 0x8a, 0x9a, 0x8b, 0x9b, 0xaa, 0xba, 0xab, 0xbb, 0xc8, 0xd8, 0xc9, 0xd9, 0xe8, 0xf8, 0xe9, 0xf9, 0xca, 0xda, 0xcb, 0xdb, 0xea, 0xfa, 0xeb, 0xfb, 0x8c, 0x9c, 0x8d, 0x9d, 0xac, 0xbc, 0xad, 0xbd, 0x8e, 0x9e, 0x8f, 0x9f, 0xae, 0xbe, 0xaf, 0xbf, 0xcc, 0xdc, 0xcd, 0xdd, 0xec, 0xfc, 0xed, 0xfd, 0xce, 0xde, 0xcf, 0xdf, 0xee, 0xfe, 0xef, 0xff);
    /**
     * Inverse IP mapping helper table.
     * Indexing this table with a byte value reverses the bit order.
     *
     * @var array
     * @access private
     */
    var $invipmap = array(0x0, 0x80, 0x40, 0xc0, 0x20, 0xa0, 0x60, 0xe0, 0x10, 0x90, 0x50, 0xd0, 0x30, 0xb0, 0x70, 0xf0, 0x8, 0x88, 0x48, 0xc8, 0x28, 0xa8, 0x68, 0xe8, 0x18, 0x98, 0x58, 0xd8, 0x38, 0xb8, 0x78, 0xf8, 0x4, 0x84, 0x44, 0xc4, 0x24, 0xa4, 0x64, 0xe4, 0x14, 0x94, 0x54, 0xd4, 0x34, 0xb4, 0x74, 0xf4, 0xc, 0x8c, 0x4c, 0xcc, 0x2c, 0xac, 0x6c, 0xec, 0x1c, 0x9c, 0x5c, 0xdc, 0x3c, 0xbc, 0x7c, 0xfc, 0x2, 0x82, 0x42, 0xc2, 0x22, 0xa2, 0x62, 0xe2, 0x12, 0x92, 0x52, 0xd2, 0x32, 0xb2, 0x72, 0xf2, 0xa, 0x8a, 0x4a, 0xca, 0x2a, 0xaa, 0x6a, 0xea, 0x1a, 0x9a, 0x5a, 0xda, 0x3a, 0xba, 0x7a, 0xfa, 0x6, 0x86, 0x46, 0xc6, 0x26, 0xa6, 0x66, 0xe6, 0x16, 0x96, 0x56, 0xd6, 0x36, 0xb6, 0x76, 0xf6, 0xe, 0x8e, 0x4e, 0xce, 0x2e, 0xae, 0x6e, 0xee, 0x1e, 0x9e, 0x5e, 0xde, 0x3e, 0xbe, 0x7e, 0xfe, 0x1, 0x81, 0x41, 0xc1, 0x21, 0xa1, 0x61, 0xe1, 0x11, 0x91, 0x51, 0xd1, 0x31, 0xb1, 0x71, 0xf1, 0x9, 0x89, 0x49, 0xc9, 0x29, 0xa9, 0x69, 0xe9, 0x19, 0x99, 0x59, 0xd9, 0x39, 0xb9, 0x79, 0xf9, 0x5, 0x85, 0x45, 0xc5, 0x25, 0xa5, 0x65, 0xe5, 0x15, 0x95, 0x55, 0xd5, 0x35, 0xb5, 0x75, 0xf5, 0xd, 0x8d, 0x4d, 0xcd, 0x2d, 0xad, 0x6d, 0xed, 0x1d, 0x9d, 0x5d, 0xdd, 0x3d, 0xbd, 0x7d, 0xfd, 0x3, 0x83, 0x43, 0xc3, 0x23, 0xa3, 0x63, 0xe3, 0x13, 0x93, 0x53, 0xd3, 0x33, 0xb3, 0x73, 0xf3, 0xb, 0x8b, 0x4b, 0xcb, 0x2b, 0xab, 0x6b, 0xeb, 0x1b, 0x9b, 0x5b, 0xdb, 0x3b, 0xbb, 0x7b, 0xfb, 0x7, 0x87, 0x47, 0xc7, 0x27, 0xa7, 0x67, 0xe7, 0x17, 0x97, 0x57, 0xd7, 0x37, 0xb7, 0x77, 0xf7, 0xf, 0x8f, 0x4f, 0xcf, 0x2f, 0xaf, 0x6f, 0xef, 0x1f, 0x9f, 0x5f, 0xdf, 0x3f, 0xbf, 0x7f, 0xff);
    /**
     * Pre-permuted S-box1
     *
     * Each box ($sbox1-$sbox8) has been vectorized, then each value pre-permuted using the
     * P table: concatenation can then be replaced by exclusive ORs.
     *
     * @var array
     * @access private
     */
    var $sbox1 = array(0x808200, 0x0, 0x8000, 0x808202, 0x808002, 0x8202, 0x2, 0x8000, 0x200, 0x808200, 0x808202, 0x200, 0x800202, 0x808002, 0x800000, 0x2, 0x202, 0x800200, 0x800200, 0x8200, 0x8200, 0x808000, 0x808000, 0x800202, 0x8002, 0x800002, 0x800002, 0x8002, 0x0, 0x202, 0x8202, 0x800000, 0x8000, 0x808202, 0x2, 0x808000, 0x808200, 0x800000, 0x800000, 0x200, 0x808002, 0x8000, 0x8200, 0x800002, 0x200, 0x2, 0x800202, 0x8202, 0x808202, 0x8002, 0x808000, 0x800202, 0x800002, 0x202, 0x8202, 0x808200, 0x202, 0x800200, 0x800200, 0x0, 0x8002, 0x8200, 0x0, 0x808002);
    /**
     * Pre-permuted S-box2
     *
     * @var array
     * @access private
     */
    var $sbox2 = array(0x40084010, 0x40004000, 0x4000, 0x84010, 0x80000, 0x10, 0x40080010, 0x40004010, 0x40000010, 0x40084010, 0x40084000, 0x40000000, 0x40004000, 0x80000, 0x10, 0x40080010, 0x84000, 0x80010, 0x40004010, 0x0, 0x40000000, 0x4000, 0x84010, 0x40080000, 0x80010, 0x40000010, 0x0, 0x84000, 0x4010, 0x40084000, 0x40080000, 0x4010, 0x0, 0x84010, 0x40080010, 0x80000, 0x40004010, 0x40080000, 0x40084000, 0x4000, 0x40080000, 0x40004000, 0x10, 0x40084010, 0x84010, 0x10, 0x4000, 0x40000000, 0x4010, 0x40084000, 0x80000, 0x40000010, 0x80010, 0x40004010, 0x40000010, 0x80010, 0x84000, 0x0, 0x40004000, 0x4010, 0x40000000, 0x40080010, 0x40084010, 0x84000);
    /**
     * Pre-permuted S-box3
     *
     * @var array
     * @access private
     */
    var $sbox3 = array(0x104, 0x4010100, 0x0, 0x4010004, 0x4000100, 0x0, 0x10104, 0x4000100, 0x10004, 0x4000004, 0x4000004, 0x10000, 0x4010104, 0x10004, 0x4010000, 0x104, 0x4000000, 0x4, 0x4010100, 0x100, 0x10100, 0x4010000, 0x4010004, 0x10104, 0x4000104, 0x10100, 0x10000, 0x4000104, 0x4, 0x4010104, 0x100, 0x4000000, 0x4010100, 0x4000000, 0x10004, 0x104, 0x10000, 0x4010100, 0x4000100, 0x0, 0x100, 0x10004, 0x4010104, 0x4000100, 0x4000004, 0x100, 0x0, 0x4010004, 0x4000104, 0x10000, 0x4000000, 0x4010104, 0x4, 0x10104, 0x10100, 0x4000004, 0x4010000, 0x4000104, 0x104, 0x4010000, 0x10104, 0x4, 0x4010004, 0x10100);
    /**
     * Pre-permuted S-box4
     *
     * @var array
     * @access private
     */
    var $sbox4 = array(0x80401000, 0x80001040, 0x80001040, 0x40, 0x401040, 0x80400040, 0x80400000, 0x80001000, 0x0, 0x401000, 0x401000, 0x80401040, 0x80000040, 0x0, 0x400040, 0x80400000, 0x80000000, 0x1000, 0x400000, 0x80401000, 0x40, 0x400000, 0x80001000, 0x1040, 0x80400040, 0x80000000, 0x1040, 0x400040, 0x1000, 0x401040, 0x80401040, 0x80000040, 0x400040, 0x80400000, 0x401000, 0x80401040, 0x80000040, 0x0, 0x0, 0x401000, 0x1040, 0x400040, 0x80400040, 0x80000000, 0x80401000, 0x80001040, 0x80001040, 0x40, 0x80401040, 0x80000040, 0x80000000, 0x1000, 0x80400000, 0x80001000, 0x401040, 0x80400040, 0x80001000, 0x1040, 0x400000, 0x80401000, 0x40, 0x400000, 0x1000, 0x401040);
    /**
     * Pre-permuted S-box5
     *
     * @var array
     * @access private
     */
    var $sbox5 = array(0x80, 0x1040080, 0x1040000, 0x21000080, 0x40000, 0x80, 0x20000000, 0x1040000, 0x20040080, 0x40000, 0x1000080, 0x20040080, 0x21000080, 0x21040000, 0x40080, 0x20000000, 0x1000000, 0x20040000, 0x20040000, 0x0, 0x20000080, 0x21040080, 0x21040080, 0x1000080, 0x21040000, 0x20000080, 0x0, 0x21000000, 0x1040080, 0x1000000, 0x21000000, 0x40080, 0x40000, 0x21000080, 0x80, 0x1000000, 0x20000000, 0x1040000, 0x21000080, 0x20040080, 0x1000080, 0x20000000, 0x21040000, 0x1040080, 0x20040080, 0x80, 0x1000000, 0x21040000, 0x21040080, 0x40080, 0x21000000, 0x21040080, 0x1040000, 0x0, 0x20040000, 0x21000000, 0x40080, 0x1000080, 0x20000080, 0x40000, 0x0, 0x20040000, 0x1040080, 0x20000080);
    /**
     * Pre-permuted S-box6
     *
     * @var array
     * @access private
     */
    var $sbox6 = array(0x10000008, 0x10200000, 0x2000, 0x10202008, 0x10200000, 0x8, 0x10202008, 0x200000, 0x10002000, 0x202008, 0x200000, 0x10000008, 0x200008, 0x10002000, 0x10000000, 0x2008, 0x0, 0x200008, 0x10002008, 0x2000, 0x202000, 0x10002008, 0x8, 0x10200008, 0x10200008, 0x0, 0x202008, 0x10202000, 0x2008, 0x202000, 0x10202000, 0x10000000, 0x10002000, 0x8, 0x10200008, 0x202000, 0x10202008, 0x200000, 0x2008, 0x10000008, 0x200000, 0x10002000, 0x10000000, 0x2008, 0x10000008, 0x10202008, 0x202000, 0x10200000, 0x202008, 0x10202000, 0x0, 0x10200008, 0x8, 0x2000, 0x10200000, 0x202008, 0x2000, 0x200008, 0x10002008, 0x0, 0x10202000, 0x10000000, 0x200008, 0x10002008);
    /**
     * Pre-permuted S-box7
     *
     * @var array
     * @access private
     */
    var $sbox7 = array(0x100000, 0x2100001, 0x2000401, 0x0, 0x400, 0x2000401, 0x100401, 0x2100400, 0x2100401, 0x100000, 0x0, 0x2000001, 0x1, 0x2000000, 0x2100001, 0x401, 0x2000400, 0x100401, 0x100001, 0x2000400, 0x2000001, 0x2100000, 0x2100400, 0x100001, 0x2100000, 0x400, 0x401, 0x2100401, 0x100400, 0x1, 0x2000000, 0x100400, 0x2000000, 0x100400, 0x100000, 0x2000401, 0x2000401, 0x2100001, 0x2100001, 0x1, 0x100001, 0x2000000, 0x2000400, 0x100000, 0x2100400, 0x401, 0x100401, 0x2100400, 0x401, 0x2000001, 0x2100401, 0x2100000, 0x100400, 0x0, 0x1, 0x2100401, 0x0, 0x100401, 0x2100000, 0x400, 0x2000001, 0x2000400, 0x400, 0x100001);
    /**
     * Pre-permuted S-box8
     *
     * @var array
     * @access private
     */
    var $sbox8 = array(0x8000820, 0x800, 0x20000, 0x8020820, 0x8000000, 0x8000820, 0x20, 0x8000000, 0x20020, 0x8020000, 0x8020820, 0x20800, 0x8020800, 0x20820, 0x800, 0x20, 0x8020000, 0x8000020, 0x8000800, 0x820, 0x20800, 0x20020, 0x8020020, 0x8020800, 0x820, 0x0, 0x0, 0x8020020, 0x8000020, 0x8000800, 0x20820, 0x20000, 0x20820, 0x20000, 0x8020800, 0x800, 0x20, 0x8020020, 0x800, 0x20820, 0x8000800, 0x20, 0x8000020, 0x8020000, 0x8020020, 0x8000000, 0x20000, 0x8000820, 0x0, 0x8020820, 0x20020, 0x8000020, 0x8020000, 0x8000800, 0x8000820, 0x0, 0x8020820, 0x20800, 0x20800, 0x820, 0x820, 0x20020, 0x8000000, 0x8020800);
    /**
     * Test for engine validity
     *
     * This is mainly just a wrapper to set things up for \phpseclib\Crypt\Base::isValidEngine()
     *
     * @see \phpseclib\Crypt\Base::isValidEngine()
     * @param int $engine
     * @access public
     * @return bool
     */
    function isValidEngine($engine)
    {
        if ($this->key_length_max == 8) {
            if ($engine == self::ENGINE_OPENSSL) {
                // quoting https://www.openssl.org/news/openssl-3.0-notes.html, OpenSSL 3.0.1
                // "Moved all variations of the EVP ciphers CAST5, BF, IDEA, SEED, RC2, RC4, RC5, and DES to the legacy provider"
                // in theory openssl_get_cipher_methods() should catch this but, on GitHub Actions, at least, it does not
                if (\defined('OPENSSL_VERSION_TEXT') && \version_compare(\preg_replace('#OpenSSL (\\d+\\.\\d+\\.\\d+) .*#', '$1', \OPENSSL_VERSION_TEXT), '3.0.1', '>=')) {
                    return \false;
                }
                $this->cipher_name_openssl_ecb = 'des-ecb';
                $this->cipher_name_openssl = 'des-' . $this->_openssl_translate_mode();
            }
        }
        return parent::isValidEngine($engine);
    }
    /**
     * Sets the key.
     *
     * Keys can be of any length.  DES, itself, uses 64-bit keys (eg. strlen($key) == 8), however, we
     * only use the first eight, if $key has more then eight characters in it, and pad $key with the
     * null byte if it is less then eight characters long.
     *
     * DES also requires that every eighth bit be a parity bit, however, we'll ignore that.
     *
     * If the key is not explicitly set, it'll be assumed to be all zero's.
     *
     * @see \phpseclib\Crypt\Base::setKey()
     * @access public
     * @param string $key
     */
    function setKey($key)
    {
        // We check/cut here only up to max length of the key.
        // Key padding to the proper length will be done in _setupKey()
        if (\strlen($key) > $this->key_length_max) {
            $key = \substr($key, 0, $this->key_length_max);
        }
        // Sets the key
        parent::setKey($key);
    }
    /**
     * Encrypts a block
     *
     * @see \phpseclib\Crypt\Base::_encryptBlock()
     * @see \phpseclib\Crypt\Base::encrypt()
     * @see self::encrypt()
     * @access private
     * @param string $in
     * @return string
     */
    function _encryptBlock($in)
    {
        return $this->_processBlock($in, self::ENCRYPT);
    }
    /**
     * Decrypts a block
     *
     * @see \phpseclib\Crypt\Base::_decryptBlock()
     * @see \phpseclib\Crypt\Base::decrypt()
     * @see self::decrypt()
     * @access private
     * @param string $in
     * @return string
     */
    function _decryptBlock($in)
    {
        return $this->_processBlock($in, self::DECRYPT);
    }
    /**
     * Encrypts or decrypts a 64-bit block
     *
     * $mode should be either self::ENCRYPT or self::DECRYPT.  See
     * {@link http://en.wikipedia.org/wiki/Image:Feistel.png Feistel.png} to get a general
     * idea of what this function does.
     *
     * @see self::_encryptBlock()
     * @see self::_decryptBlock()
     * @access private
     * @param string $block
     * @param int $mode
     * @return string
     */
    function _processBlock($block, $mode)
    {
        static $sbox1, $sbox2, $sbox3, $sbox4, $sbox5, $sbox6, $sbox7, $sbox8, $shuffleip, $shuffleinvip;
        if (!$sbox1) {
            $sbox1 = \array_map("intval", $this->sbox1);
            $sbox2 = \array_map("intval", $this->sbox2);
            $sbox3 = \array_map("intval", $this->sbox3);
            $sbox4 = \array_map("intval", $this->sbox4);
            $sbox5 = \array_map("intval", $this->sbox5);
            $sbox6 = \array_map("intval", $this->sbox6);
            $sbox7 = \array_map("intval", $this->sbox7);
            $sbox8 = \array_map("intval", $this->sbox8);
            /* Merge $shuffle with $[inv]ipmap */
            for ($i = 0; $i < 256; ++$i) {
                $shuffleip[] = $this->shuffle[$this->ipmap[$i]];
                $shuffleinvip[] = $this->shuffle[$this->invipmap[$i]];
            }
        }
        $keys = $this->keys[$mode];
        $ki = -1;
        // Do the initial IP permutation.
        $t = \unpack('Nl/Nr', $block);
        list($l, $r) = array($t['l'], $t['r']);
        $block = $shuffleip[$r & 0xff] & "\x80\x80\x80\x80\x80\x80\x80\x80" | $shuffleip[$r >> 8 & 0xff] & "@@@@@@@@" | $shuffleip[$r >> 16 & 0xff] & "        " | $shuffleip[$r >> 24 & 0xff] & "\x10\x10\x10\x10\x10\x10\x10\x10" | $shuffleip[$l & 0xff] & "\x08\x08\x08\x08\x08\x08\x08\x08" | $shuffleip[$l >> 8 & 0xff] & "\x04\x04\x04\x04\x04\x04\x04\x04" | $shuffleip[$l >> 16 & 0xff] & "\x02\x02\x02\x02\x02\x02\x02\x02" | $shuffleip[$l >> 24 & 0xff] & "\x01\x01\x01\x01\x01\x01\x01\x01";
        // Extract L0 and R0.
        $t = \unpack('Nl/Nr', $block);
        list($l, $r) = array($t['l'], $t['r']);
        for ($des_round = 0; $des_round < $this->des_rounds; ++$des_round) {
            // Perform the 16 steps.
            for ($i = 0; $i < 16; $i++) {
                // start of "the Feistel (F) function" - see the following URL:
                // http://en.wikipedia.org/wiki/Image:Data_Encryption_Standard_InfoBox_Diagram.png
                // Merge key schedule.
                $b1 = $r >> 3 & 0x1fffffff ^ $r << 29 ^ $keys[++$ki];
                $b2 = $r >> 31 & 0x1 ^ $r << 1 ^ $keys[++$ki];
                // S-box indexing.
                $t = $sbox1[$b1 >> 24 & 0x3f] ^ $sbox2[$b2 >> 24 & 0x3f] ^ $sbox3[$b1 >> 16 & 0x3f] ^ $sbox4[$b2 >> 16 & 0x3f] ^ $sbox5[$b1 >> 8 & 0x3f] ^ $sbox6[$b2 >> 8 & 0x3f] ^ $sbox7[$b1 & 0x3f] ^ $sbox8[$b2 & 0x3f] ^ $l;
                // end of "the Feistel (F) function"
                $l = $r;
                $r = $t;
            }
            // Last step should not permute L & R.
            $t = $l;
            $l = $r;
            $r = $t;
        }
        // Perform the inverse IP permutation.
        return $shuffleinvip[$r >> 24 & 0xff] & "\x80\x80\x80\x80\x80\x80\x80\x80" | $shuffleinvip[$l >> 24 & 0xff] & "@@@@@@@@" | $shuffleinvip[$r >> 16 & 0xff] & "        " | $shuffleinvip[$l >> 16 & 0xff] & "\x10\x10\x10\x10\x10\x10\x10\x10" | $shuffleinvip[$r >> 8 & 0xff] & "\x08\x08\x08\x08\x08\x08\x08\x08" | $shuffleinvip[$l >> 8 & 0xff] & "\x04\x04\x04\x04\x04\x04\x04\x04" | $shuffleinvip[$r & 0xff] & "\x02\x02\x02\x02\x02\x02\x02\x02" | $shuffleinvip[$l & 0xff] & "\x01\x01\x01\x01\x01\x01\x01\x01";
    }
    /**
     * Creates the key schedule
     *
     * @see \phpseclib\Crypt\Base::_setupKey()
     * @access private
     */
    function _setupKey()
    {
        if (isset($this->kl['key']) && $this->key === $this->kl['key'] && $this->des_rounds === $this->kl['des_rounds']) {
            // already expanded
            return;
        }
        $this->kl = array('key' => $this->key, 'des_rounds' => $this->des_rounds);
        static $shifts = array(
            // number of key bits shifted per round
            1,
            1,
            2,
            2,
            2,
            2,
            2,
            2,
            1,
            2,
            2,
            2,
            2,
            2,
            2,
            1,
        );
        static $pc1map = array(0x0, 0x0, 0x8, 0x8, 0x4, 0x4, 0xc, 0xc, 0x2, 0x2, 0xa, 0xa, 0x6, 0x6, 0xe, 0xe, 0x10, 0x10, 0x18, 0x18, 0x14, 0x14, 0x1c, 0x1c, 0x12, 0x12, 0x1a, 0x1a, 0x16, 0x16, 0x1e, 0x1e, 0x20, 0x20, 0x28, 0x28, 0x24, 0x24, 0x2c, 0x2c, 0x22, 0x22, 0x2a, 0x2a, 0x26, 0x26, 0x2e, 0x2e, 0x30, 0x30, 0x38, 0x38, 0x34, 0x34, 0x3c, 0x3c, 0x32, 0x32, 0x3a, 0x3a, 0x36, 0x36, 0x3e, 0x3e, 0x40, 0x40, 0x48, 0x48, 0x44, 0x44, 0x4c, 0x4c, 0x42, 0x42, 0x4a, 0x4a, 0x46, 0x46, 0x4e, 0x4e, 0x50, 0x50, 0x58, 0x58, 0x54, 0x54, 0x5c, 0x5c, 0x52, 0x52, 0x5a, 0x5a, 0x56, 0x56, 0x5e, 0x5e, 0x60, 0x60, 0x68, 0x68, 0x64, 0x64, 0x6c, 0x6c, 0x62, 0x62, 0x6a, 0x6a, 0x66, 0x66, 0x6e, 0x6e, 0x70, 0x70, 0x78, 0x78, 0x74, 0x74, 0x7c, 0x7c, 0x72, 0x72, 0x7a, 0x7a, 0x76, 0x76, 0x7e, 0x7e, 0x80, 0x80, 0x88, 0x88, 0x84, 0x84, 0x8c, 0x8c, 0x82, 0x82, 0x8a, 0x8a, 0x86, 0x86, 0x8e, 0x8e, 0x90, 0x90, 0x98, 0x98, 0x94, 0x94, 0x9c, 0x9c, 0x92, 0x92, 0x9a, 0x9a, 0x96, 0x96, 0x9e, 0x9e, 0xa0, 0xa0, 0xa8, 0xa8, 0xa4, 0xa4, 0xac, 0xac, 0xa2, 0xa2, 0xaa, 0xaa, 0xa6, 0xa6, 0xae, 0xae, 0xb0, 0xb0, 0xb8, 0xb8, 0xb4, 0xb4, 0xbc, 0xbc, 0xb2, 0xb2, 0xba, 0xba, 0xb6, 0xb6, 0xbe, 0xbe, 0xc0, 0xc0, 0xc8, 0xc8, 0xc4, 0xc4, 0xcc, 0xcc, 0xc2, 0xc2, 0xca, 0xca, 0xc6, 0xc6, 0xce, 0xce, 0xd0, 0xd0, 0xd8, 0xd8, 0xd4, 0xd4, 0xdc, 0xdc, 0xd2, 0xd2, 0xda, 0xda, 0xd6, 0xd6, 0xde, 0xde, 0xe0, 0xe0, 0xe8, 0xe8, 0xe4, 0xe4, 0xec, 0xec, 0xe2, 0xe2, 0xea, 0xea, 0xe6, 0xe6, 0xee, 0xee, 0xf0, 0xf0, 0xf8, 0xf8, 0xf4, 0xf4, 0xfc, 0xfc, 0xf2, 0xf2, 0xfa, 0xfa, 0xf6, 0xf6, 0xfe, 0xfe);
        // Mapping tables for the PC-2 transformation.
        static $pc2mapc1 = array(0x0, 0x400, 0x200000, 0x200400, 0x1, 0x401, 0x200001, 0x200401, 0x2000000, 0x2000400, 0x2200000, 0x2200400, 0x2000001, 0x2000401, 0x2200001, 0x2200401);
        static $pc2mapc2 = array(0x0, 0x800, 0x8000000, 0x8000800, 0x10000, 0x10800, 0x8010000, 0x8010800, 0x0, 0x800, 0x8000000, 0x8000800, 0x10000, 0x10800, 0x8010000, 0x8010800, 0x100, 0x900, 0x8000100, 0x8000900, 0x10100, 0x10900, 0x8010100, 0x8010900, 0x100, 0x900, 0x8000100, 0x8000900, 0x10100, 0x10900, 0x8010100, 0x8010900, 0x10, 0x810, 0x8000010, 0x8000810, 0x10010, 0x10810, 0x8010010, 0x8010810, 0x10, 0x810, 0x8000010, 0x8000810, 0x10010, 0x10810, 0x8010010, 0x8010810, 0x110, 0x910, 0x8000110, 0x8000910, 0x10110, 0x10910, 0x8010110, 0x8010910, 0x110, 0x910, 0x8000110, 0x8000910, 0x10110, 0x10910, 0x8010110, 0x8010910, 0x40000, 0x40800, 0x8040000, 0x8040800, 0x50000, 0x50800, 0x8050000, 0x8050800, 0x40000, 0x40800, 0x8040000, 0x8040800, 0x50000, 0x50800, 0x8050000, 0x8050800, 0x40100, 0x40900, 0x8040100, 0x8040900, 0x50100, 0x50900, 0x8050100, 0x8050900, 0x40100, 0x40900, 0x8040100, 0x8040900, 0x50100, 0x50900, 0x8050100, 0x8050900, 0x40010, 0x40810, 0x8040010, 0x8040810, 0x50010, 0x50810, 0x8050010, 0x8050810, 0x40010, 0x40810, 0x8040010, 0x8040810, 0x50010, 0x50810, 0x8050010, 0x8050810, 0x40110, 0x40910, 0x8040110, 0x8040910, 0x50110, 0x50910, 0x8050110, 0x8050910, 0x40110, 0x40910, 0x8040110, 0x8040910, 0x50110, 0x50910, 0x8050110, 0x8050910, 0x1000000, 0x1000800, 0x9000000, 0x9000800, 0x1010000, 0x1010800, 0x9010000, 0x9010800, 0x1000000, 0x1000800, 0x9000000, 0x9000800, 0x1010000, 0x1010800, 0x9010000, 0x9010800, 0x1000100, 0x1000900, 0x9000100, 0x9000900, 0x1010100, 0x1010900, 0x9010100, 0x9010900, 0x1000100, 0x1000900, 0x9000100, 0x9000900, 0x1010100, 0x1010900, 0x9010100, 0x9010900, 0x1000010, 0x1000810, 0x9000010, 0x9000810, 0x1010010, 0x1010810, 0x9010010, 0x9010810, 0x1000010, 0x1000810, 0x9000010, 0x9000810, 0x1010010, 0x1010810, 0x9010010, 0x9010810, 0x1000110, 0x1000910, 0x9000110, 0x9000910, 0x1010110, 0x1010910, 0x9010110, 0x9010910, 0x1000110, 0x1000910, 0x9000110, 0x9000910, 0x1010110, 0x1010910, 0x9010110, 0x9010910, 0x1040000, 0x1040800, 0x9040000, 0x9040800, 0x1050000, 0x1050800, 0x9050000, 0x9050800, 0x1040000, 0x1040800, 0x9040000, 0x9040800, 0x1050000, 0x1050800, 0x9050000, 0x9050800, 0x1040100, 0x1040900, 0x9040100, 0x9040900, 0x1050100, 0x1050900, 0x9050100, 0x9050900, 0x1040100, 0x1040900, 0x9040100, 0x9040900, 0x1050100, 0x1050900, 0x9050100, 0x9050900, 0x1040010, 0x1040810, 0x9040010, 0x9040810, 0x1050010, 0x1050810, 0x9050010, 0x9050810, 0x1040010, 0x1040810, 0x9040010, 0x9040810, 0x1050010, 0x1050810, 0x9050010, 0x9050810, 0x1040110, 0x1040910, 0x9040110, 0x9040910, 0x1050110, 0x1050910, 0x9050110, 0x9050910, 0x1040110, 0x1040910, 0x9040110, 0x9040910, 0x1050110, 0x1050910, 0x9050110, 0x9050910);
        static $pc2mapc3 = array(0x0, 0x4, 0x1000, 0x1004, 0x0, 0x4, 0x1000, 0x1004, 0x10000000, 0x10000004, 0x10001000, 0x10001004, 0x10000000, 0x10000004, 0x10001000, 0x10001004, 0x20, 0x24, 0x1020, 0x1024, 0x20, 0x24, 0x1020, 0x1024, 0x10000020, 0x10000024, 0x10001020, 0x10001024, 0x10000020, 0x10000024, 0x10001020, 0x10001024, 0x80000, 0x80004, 0x81000, 0x81004, 0x80000, 0x80004, 0x81000, 0x81004, 0x10080000, 0x10080004, 0x10081000, 0x10081004, 0x10080000, 0x10080004, 0x10081000, 0x10081004, 0x80020, 0x80024, 0x81020, 0x81024, 0x80020, 0x80024, 0x81020, 0x81024, 0x10080020, 0x10080024, 0x10081020, 0x10081024, 0x10080020, 0x10080024, 0x10081020, 0x10081024, 0x20000000, 0x20000004, 0x20001000, 0x20001004, 0x20000000, 0x20000004, 0x20001000, 0x20001004, 0x30000000, 0x30000004, 0x30001000, 0x30001004, 0x30000000, 0x30000004, 0x30001000, 0x30001004, 0x20000020, 0x20000024, 0x20001020, 0x20001024, 0x20000020, 0x20000024, 0x20001020, 0x20001024, 0x30000020, 0x30000024, 0x30001020, 0x30001024, 0x30000020, 0x30000024, 0x30001020, 0x30001024, 0x20080000, 0x20080004, 0x20081000, 0x20081004, 0x20080000, 0x20080004, 0x20081000, 0x20081004, 0x30080000, 0x30080004, 0x30081000, 0x30081004, 0x30080000, 0x30080004, 0x30081000, 0x30081004, 0x20080020, 0x20080024, 0x20081020, 0x20081024, 0x20080020, 0x20080024, 0x20081020, 0x20081024, 0x30080020, 0x30080024, 0x30081020, 0x30081024, 0x30080020, 0x30080024, 0x30081020, 0x30081024, 0x2, 0x6, 0x1002, 0x1006, 0x2, 0x6, 0x1002, 0x1006, 0x10000002, 0x10000006, 0x10001002, 0x10001006, 0x10000002, 0x10000006, 0x10001002, 0x10001006, 0x22, 0x26, 0x1022, 0x1026, 0x22, 0x26, 0x1022, 0x1026, 0x10000022, 0x10000026, 0x10001022, 0x10001026, 0x10000022, 0x10000026, 0x10001022, 0x10001026, 0x80002, 0x80006, 0x81002, 0x81006, 0x80002, 0x80006, 0x81002, 0x81006, 0x10080002, 0x10080006, 0x10081002, 0x10081006, 0x10080002, 0x10080006, 0x10081002, 0x10081006, 0x80022, 0x80026, 0x81022, 0x81026, 0x80022, 0x80026, 0x81022, 0x81026, 0x10080022, 0x10080026, 0x10081022, 0x10081026, 0x10080022, 0x10080026, 0x10081022, 0x10081026, 0x20000002, 0x20000006, 0x20001002, 0x20001006, 0x20000002, 0x20000006, 0x20001002, 0x20001006, 0x30000002, 0x30000006, 0x30001002, 0x30001006, 0x30000002, 0x30000006, 0x30001002, 0x30001006, 0x20000022, 0x20000026, 0x20001022, 0x20001026, 0x20000022, 0x20000026, 0x20001022, 0x20001026, 0x30000022, 0x30000026, 0x30001022, 0x30001026, 0x30000022, 0x30000026, 0x30001022, 0x30001026, 0x20080002, 0x20080006, 0x20081002, 0x20081006, 0x20080002, 0x20080006, 0x20081002, 0x20081006, 0x30080002, 0x30080006, 0x30081002, 0x30081006, 0x30080002, 0x30080006, 0x30081002, 0x30081006, 0x20080022, 0x20080026, 0x20081022, 0x20081026, 0x20080022, 0x20080026, 0x20081022, 0x20081026, 0x30080022, 0x30080026, 0x30081022, 0x30081026, 0x30080022, 0x30080026, 0x30081022, 0x30081026);
        static $pc2mapc4 = array(0x0, 0x100000, 0x8, 0x100008, 0x200, 0x100200, 0x208, 0x100208, 0x0, 0x100000, 0x8, 0x100008, 0x200, 0x100200, 0x208, 0x100208, 0x4000000, 0x4100000, 0x4000008, 0x4100008, 0x4000200, 0x4100200, 0x4000208, 0x4100208, 0x4000000, 0x4100000, 0x4000008, 0x4100008, 0x4000200, 0x4100200, 0x4000208, 0x4100208, 0x2000, 0x102000, 0x2008, 0x102008, 0x2200, 0x102200, 0x2208, 0x102208, 0x2000, 0x102000, 0x2008, 0x102008, 0x2200, 0x102200, 0x2208, 0x102208, 0x4002000, 0x4102000, 0x4002008, 0x4102008, 0x4002200, 0x4102200, 0x4002208, 0x4102208, 0x4002000, 0x4102000, 0x4002008, 0x4102008, 0x4002200, 0x4102200, 0x4002208, 0x4102208, 0x0, 0x100000, 0x8, 0x100008, 0x200, 0x100200, 0x208, 0x100208, 0x0, 0x100000, 0x8, 0x100008, 0x200, 0x100200, 0x208, 0x100208, 0x4000000, 0x4100000, 0x4000008, 0x4100008, 0x4000200, 0x4100200, 0x4000208, 0x4100208, 0x4000000, 0x4100000, 0x4000008, 0x4100008, 0x4000200, 0x4100200, 0x4000208, 0x4100208, 0x2000, 0x102000, 0x2008, 0x102008, 0x2200, 0x102200, 0x2208, 0x102208, 0x2000, 0x102000, 0x2008, 0x102008, 0x2200, 0x102200, 0x2208, 0x102208, 0x4002000, 0x4102000, 0x4002008, 0x4102008, 0x4002200, 0x4102200, 0x4002208, 0x4102208, 0x4002000, 0x4102000, 0x4002008, 0x4102008, 0x4002200, 0x4102200, 0x4002208, 0x4102208, 0x20000, 0x120000, 0x20008, 0x120008, 0x20200, 0x120200, 0x20208, 0x120208, 0x20000, 0x120000, 0x20008, 0x120008, 0x20200, 0x120200, 0x20208, 0x120208, 0x4020000, 0x4120000, 0x4020008, 0x4120008, 0x4020200, 0x4120200, 0x4020208, 0x4120208, 0x4020000, 0x4120000, 0x4020008, 0x4120008, 0x4020200, 0x4120200, 0x4020208, 0x4120208, 0x22000, 0x122000, 0x22008, 0x122008, 0x22200, 0x122200, 0x22208, 0x122208, 0x22000, 0x122000, 0x22008, 0x122008, 0x22200, 0x122200, 0x22208, 0x122208, 0x4022000, 0x4122000, 0x4022008, 0x4122008, 0x4022200, 0x4122200, 0x4022208, 0x4122208, 0x4022000, 0x4122000, 0x4022008, 0x4122008, 0x4022200, 0x4122200, 0x4022208, 0x4122208, 0x20000, 0x120000, 0x20008, 0x120008, 0x20200, 0x120200, 0x20208, 0x120208, 0x20000, 0x120000, 0x20008, 0x120008, 0x20200, 0x120200, 0x20208, 0x120208, 0x4020000, 0x4120000, 0x4020008, 0x4120008, 0x4020200, 0x4120200, 0x4020208, 0x4120208, 0x4020000, 0x4120000, 0x4020008, 0x4120008, 0x4020200, 0x4120200, 0x4020208, 0x4120208, 0x22000, 0x122000, 0x22008, 0x122008, 0x22200, 0x122200, 0x22208, 0x122208, 0x22000, 0x122000, 0x22008, 0x122008, 0x22200, 0x122200, 0x22208, 0x122208, 0x4022000, 0x4122000, 0x4022008, 0x4122008, 0x4022200, 0x4122200, 0x4022208, 0x4122208, 0x4022000, 0x4122000, 0x4022008, 0x4122008, 0x4022200, 0x4122200, 0x4022208, 0x4122208);
        static $pc2mapd1 = array(0x0, 0x1, 0x8000000, 0x8000001, 0x200000, 0x200001, 0x8200000, 0x8200001, 0x2, 0x3, 0x8000002, 0x8000003, 0x200002, 0x200003, 0x8200002, 0x8200003);
        static $pc2mapd2 = array(0x0, 0x100000, 0x800, 0x100800, 0x0, 0x100000, 0x800, 0x100800, 0x4000000, 0x4100000, 0x4000800, 0x4100800, 0x4000000, 0x4100000, 0x4000800, 0x4100800, 0x4, 0x100004, 0x804, 0x100804, 0x4, 0x100004, 0x804, 0x100804, 0x4000004, 0x4100004, 0x4000804, 0x4100804, 0x4000004, 0x4100004, 0x4000804, 0x4100804, 0x0, 0x100000, 0x800, 0x100800, 0x0, 0x100000, 0x800, 0x100800, 0x4000000, 0x4100000, 0x4000800, 0x4100800, 0x4000000, 0x4100000, 0x4000800, 0x4100800, 0x4, 0x100004, 0x804, 0x100804, 0x4, 0x100004, 0x804, 0x100804, 0x4000004, 0x4100004, 0x4000804, 0x4100804, 0x4000004, 0x4100004, 0x4000804, 0x4100804, 0x200, 0x100200, 0xa00, 0x100a00, 0x200, 0x100200, 0xa00, 0x100a00, 0x4000200, 0x4100200, 0x4000a00, 0x4100a00, 0x4000200, 0x4100200, 0x4000a00, 0x4100a00, 0x204, 0x100204, 0xa04, 0x100a04, 0x204, 0x100204, 0xa04, 0x100a04, 0x4000204, 0x4100204, 0x4000a04, 0x4100a04, 0x4000204, 0x4100204, 0x4000a04, 0x4100a04, 0x200, 0x100200, 0xa00, 0x100a00, 0x200, 0x100200, 0xa00, 0x100a00, 0x4000200, 0x4100200, 0x4000a00, 0x4100a00, 0x4000200, 0x4100200, 0x4000a00, 0x4100a00, 0x204, 0x100204, 0xa04, 0x100a04, 0x204, 0x100204, 0xa04, 0x100a04, 0x4000204, 0x4100204, 0x4000a04, 0x4100a04, 0x4000204, 0x4100204, 0x4000a04, 0x4100a04, 0x20000, 0x120000, 0x20800, 0x120800, 0x20000, 0x120000, 0x20800, 0x120800, 0x4020000, 0x4120000, 0x4020800, 0x4120800, 0x4020000, 0x4120000, 0x4020800, 0x4120800, 0x20004, 0x120004, 0x20804, 0x120804, 0x20004, 0x120004, 0x20804, 0x120804, 0x4020004, 0x4120004, 0x4020804, 0x4120804, 0x4020004, 0x4120004, 0x4020804, 0x4120804, 0x20000, 0x120000, 0x20800, 0x120800, 0x20000, 0x120000, 0x20800, 0x120800, 0x4020000, 0x4120000, 0x4020800, 0x4120800, 0x4020000, 0x4120000, 0x4020800, 0x4120800, 0x20004, 0x120004, 0x20804, 0x120804, 0x20004, 0x120004, 0x20804, 0x120804, 0x4020004, 0x4120004, 0x4020804, 0x4120804, 0x4020004, 0x4120004, 0x4020804, 0x4120804, 0x20200, 0x120200, 0x20a00, 0x120a00, 0x20200, 0x120200, 0x20a00, 0x120a00, 0x4020200, 0x4120200, 0x4020a00, 0x4120a00, 0x4020200, 0x4120200, 0x4020a00, 0x4120a00, 0x20204, 0x120204, 0x20a04, 0x120a04, 0x20204, 0x120204, 0x20a04, 0x120a04, 0x4020204, 0x4120204, 0x4020a04, 0x4120a04, 0x4020204, 0x4120204, 0x4020a04, 0x4120a04, 0x20200, 0x120200, 0x20a00, 0x120a00, 0x20200, 0x120200, 0x20a00, 0x120a00, 0x4020200, 0x4120200, 0x4020a00, 0x4120a00, 0x4020200, 0x4120200, 0x4020a00, 0x4120a00, 0x20204, 0x120204, 0x20a04, 0x120a04, 0x20204, 0x120204, 0x20a04, 0x120a04, 0x4020204, 0x4120204, 0x4020a04, 0x4120a04, 0x4020204, 0x4120204, 0x4020a04, 0x4120a04);
        static $pc2mapd3 = array(0x0, 0x10000, 0x2000000, 0x2010000, 0x20, 0x10020, 0x2000020, 0x2010020, 0x40000, 0x50000, 0x2040000, 0x2050000, 0x40020, 0x50020, 0x2040020, 0x2050020, 0x2000, 0x12000, 0x2002000, 0x2012000, 0x2020, 0x12020, 0x2002020, 0x2012020, 0x42000, 0x52000, 0x2042000, 0x2052000, 0x42020, 0x52020, 0x2042020, 0x2052020, 0x0, 0x10000, 0x2000000, 0x2010000, 0x20, 0x10020, 0x2000020, 0x2010020, 0x40000, 0x50000, 0x2040000, 0x2050000, 0x40020, 0x50020, 0x2040020, 0x2050020, 0x2000, 0x12000, 0x2002000, 0x2012000, 0x2020, 0x12020, 0x2002020, 0x2012020, 0x42000, 0x52000, 0x2042000, 0x2052000, 0x42020, 0x52020, 0x2042020, 0x2052020, 0x10, 0x10010, 0x2000010, 0x2010010, 0x30, 0x10030, 0x2000030, 0x2010030, 0x40010, 0x50010, 0x2040010, 0x2050010, 0x40030, 0x50030, 0x2040030, 0x2050030, 0x2010, 0x12010, 0x2002010, 0x2012010, 0x2030, 0x12030, 0x2002030, 0x2012030, 0x42010, 0x52010, 0x2042010, 0x2052010, 0x42030, 0x52030, 0x2042030, 0x2052030, 0x10, 0x10010, 0x2000010, 0x2010010, 0x30, 0x10030, 0x2000030, 0x2010030, 0x40010, 0x50010, 0x2040010, 0x2050010, 0x40030, 0x50030, 0x2040030, 0x2050030, 0x2010, 0x12010, 0x2002010, 0x2012010, 0x2030, 0x12030, 0x2002030, 0x2012030, 0x42010, 0x52010, 0x2042010, 0x2052010, 0x42030, 0x52030, 0x2042030, 0x2052030, 0x20000000, 0x20010000, 0x22000000, 0x22010000, 0x20000020, 0x20010020, 0x22000020, 0x22010020, 0x20040000, 0x20050000, 0x22040000, 0x22050000, 0x20040020, 0x20050020, 0x22040020, 0x22050020, 0x20002000, 0x20012000, 0x22002000, 0x22012000, 0x20002020, 0x20012020, 0x22002020, 0x22012020, 0x20042000, 0x20052000, 0x22042000, 0x22052000, 0x20042020, 0x20052020, 0x22042020, 0x22052020, 0x20000000, 0x20010000, 0x22000000, 0x22010000, 0x20000020, 0x20010020, 0x22000020, 0x22010020, 0x20040000, 0x20050000, 0x22040000, 0x22050000, 0x20040020, 0x20050020, 0x22040020, 0x22050020, 0x20002000, 0x20012000, 0x22002000, 0x22012000, 0x20002020, 0x20012020, 0x22002020, 0x22012020, 0x20042000, 0x20052000, 0x22042000, 0x22052000, 0x20042020, 0x20052020, 0x22042020, 0x22052020, 0x20000010, 0x20010010, 0x22000010, 0x22010010, 0x20000030, 0x20010030, 0x22000030, 0x22010030, 0x20040010, 0x20050010, 0x22040010, 0x22050010, 0x20040030, 0x20050030, 0x22040030, 0x22050030, 0x20002010, 0x20012010, 0x22002010, 0x22012010, 0x20002030, 0x20012030, 0x22002030, 0x22012030, 0x20042010, 0x20052010, 0x22042010, 0x22052010, 0x20042030, 0x20052030, 0x22042030, 0x22052030, 0x20000010, 0x20010010, 0x22000010, 0x22010010, 0x20000030, 0x20010030, 0x22000030, 0x22010030, 0x20040010, 0x20050010, 0x22040010, 0x22050010, 0x20040030, 0x20050030, 0x22040030, 0x22050030, 0x20002010, 0x20012010, 0x22002010, 0x22012010, 0x20002030, 0x20012030, 0x22002030, 0x22012030, 0x20042010, 0x20052010, 0x22042010, 0x22052010, 0x20042030, 0x20052030, 0x22042030, 0x22052030);
        static $pc2mapd4 = array(0x0, 0x400, 0x1000000, 0x1000400, 0x0, 0x400, 0x1000000, 0x1000400, 0x100, 0x500, 0x1000100, 0x1000500, 0x100, 0x500, 0x1000100, 0x1000500, 0x10000000, 0x10000400, 0x11000000, 0x11000400, 0x10000000, 0x10000400, 0x11000000, 0x11000400, 0x10000100, 0x10000500, 0x11000100, 0x11000500, 0x10000100, 0x10000500, 0x11000100, 0x11000500, 0x80000, 0x80400, 0x1080000, 0x1080400, 0x80000, 0x80400, 0x1080000, 0x1080400, 0x80100, 0x80500, 0x1080100, 0x1080500, 0x80100, 0x80500, 0x1080100, 0x1080500, 0x10080000, 0x10080400, 0x11080000, 0x11080400, 0x10080000, 0x10080400, 0x11080000, 0x11080400, 0x10080100, 0x10080500, 0x11080100, 0x11080500, 0x10080100, 0x10080500, 0x11080100, 0x11080500, 0x8, 0x408, 0x1000008, 0x1000408, 0x8, 0x408, 0x1000008, 0x1000408, 0x108, 0x508, 0x1000108, 0x1000508, 0x108, 0x508, 0x1000108, 0x1000508, 0x10000008, 0x10000408, 0x11000008, 0x11000408, 0x10000008, 0x10000408, 0x11000008, 0x11000408, 0x10000108, 0x10000508, 0x11000108, 0x11000508, 0x10000108, 0x10000508, 0x11000108, 0x11000508, 0x80008, 0x80408, 0x1080008, 0x1080408, 0x80008, 0x80408, 0x1080008, 0x1080408, 0x80108, 0x80508, 0x1080108, 0x1080508, 0x80108, 0x80508, 0x1080108, 0x1080508, 0x10080008, 0x10080408, 0x11080008, 0x11080408, 0x10080008, 0x10080408, 0x11080008, 0x11080408, 0x10080108, 0x10080508, 0x11080108, 0x11080508, 0x10080108, 0x10080508, 0x11080108, 0x11080508, 0x1000, 0x1400, 0x1001000, 0x1001400, 0x1000, 0x1400, 0x1001000, 0x1001400, 0x1100, 0x1500, 0x1001100, 0x1001500, 0x1100, 0x1500, 0x1001100, 0x1001500, 0x10001000, 0x10001400, 0x11001000, 0x11001400, 0x10001000, 0x10001400, 0x11001000, 0x11001400, 0x10001100, 0x10001500, 0x11001100, 0x11001500, 0x10001100, 0x10001500, 0x11001100, 0x11001500, 0x81000, 0x81400, 0x1081000, 0x1081400, 0x81000, 0x81400, 0x1081000, 0x1081400, 0x81100, 0x81500, 0x1081100, 0x1081500, 0x81100, 0x81500, 0x1081100, 0x1081500, 0x10081000, 0x10081400, 0x11081000, 0x11081400, 0x10081000, 0x10081400, 0x11081000, 0x11081400, 0x10081100, 0x10081500, 0x11081100, 0x11081500, 0x10081100, 0x10081500, 0x11081100, 0x11081500, 0x1008, 0x1408, 0x1001008, 0x1001408, 0x1008, 0x1408, 0x1001008, 0x1001408, 0x1108, 0x1508, 0x1001108, 0x1001508, 0x1108, 0x1508, 0x1001108, 0x1001508, 0x10001008, 0x10001408, 0x11001008, 0x11001408, 0x10001008, 0x10001408, 0x11001008, 0x11001408, 0x10001108, 0x10001508, 0x11001108, 0x11001508, 0x10001108, 0x10001508, 0x11001108, 0x11001508, 0x81008, 0x81408, 0x1081008, 0x1081408, 0x81008, 0x81408, 0x1081008, 0x1081408, 0x81108, 0x81508, 0x1081108, 0x1081508, 0x81108, 0x81508, 0x1081108, 0x1081508, 0x10081008, 0x10081408, 0x11081008, 0x11081408, 0x10081008, 0x10081408, 0x11081008, 0x11081408, 0x10081108, 0x10081508, 0x11081108, 0x11081508, 0x10081108, 0x10081508, 0x11081108, 0x11081508);
        $keys = array();
        for ($des_round = 0; $des_round < $this->des_rounds; ++$des_round) {
            // pad the key and remove extra characters as appropriate.
            $key = \str_pad(\substr($this->key, $des_round * 8, 8), 8, "\x00");
            // Perform the PC/1 transformation and compute C and D.
            $t = \unpack('Nl/Nr', $key);
            list($l, $r) = array($t['l'], $t['r']);
            $key = $this->shuffle[$pc1map[$r & 0xff]] & "\x80\x80\x80\x80\x80\x80\x80\x00" | $this->shuffle[$pc1map[$r >> 8 & 0xff]] & "@@@@@@@\x00" | $this->shuffle[$pc1map[$r >> 16 & 0xff]] & "       \x00" | $this->shuffle[$pc1map[$r >> 24 & 0xff]] & "\x10\x10\x10\x10\x10\x10\x10\x00" | $this->shuffle[$pc1map[$l & 0xff]] & "\x08\x08\x08\x08\x08\x08\x08\x00" | $this->shuffle[$pc1map[$l >> 8 & 0xff]] & "\x04\x04\x04\x04\x04\x04\x04\x00" | $this->shuffle[$pc1map[$l >> 16 & 0xff]] & "\x02\x02\x02\x02\x02\x02\x02\x00" | $this->shuffle[$pc1map[$l >> 24 & 0xff]] & "\x01\x01\x01\x01\x01\x01\x01\x00";
            $key = \unpack('Nc/Nd', $key);
            $c = $key['c'] >> 4 & 0xfffffff;
            $d = $key['d'] >> 4 & 0xffffff0 | $key['c'] & 0xf;
            $keys[$des_round] = array(self::ENCRYPT => array(), self::DECRYPT => \array_fill(0, 32, 0));
            for ($i = 0, $ki = 31; $i < 16; ++$i, $ki -= 2) {
                $c <<= $shifts[$i];
                $c = ($c | $c >> 28) & 0xfffffff;
                $d <<= $shifts[$i];
                $d = ($d | $d >> 28) & 0xfffffff;
                // Perform the PC-2 transformation.
                $cp = $pc2mapc1[$c >> 24] | $pc2mapc2[$c >> 16 & 0xff] | $pc2mapc3[$c >> 8 & 0xff] | $pc2mapc4[$c & 0xff];
                $dp = $pc2mapd1[$d >> 24] | $pc2mapd2[$d >> 16 & 0xff] | $pc2mapd3[$d >> 8 & 0xff] | $pc2mapd4[$d & 0xff];
                // Reorder: odd bytes/even bytes. Push the result in key schedule.
                $val1 = $cp & \intval(0xff000000) | $cp << 8 & 0xff0000 | $dp >> 16 & 0xff00 | $dp >> 8 & 0xff;
                $val2 = $cp << 8 & \intval(0xff000000) | $cp << 16 & 0xff0000 | $dp >> 8 & 0xff00 | $dp & 0xff;
                $keys[$des_round][self::ENCRYPT][] = $val1;
                $keys[$des_round][self::DECRYPT][$ki - 1] = $val1;
                $keys[$des_round][self::ENCRYPT][] = $val2;
                $keys[$des_round][self::DECRYPT][$ki] = $val2;
            }
        }
        switch ($this->des_rounds) {
            case 3:
                // 3DES keys
                $this->keys = array(self::ENCRYPT => \array_merge($keys[0][self::ENCRYPT], $keys[1][self::DECRYPT], $keys[2][self::ENCRYPT]), self::DECRYPT => \array_merge($keys[2][self::DECRYPT], $keys[1][self::ENCRYPT], $keys[0][self::DECRYPT]));
                break;
            // case 1: // DES keys
            default:
                $this->keys = array(self::ENCRYPT => $keys[0][self::ENCRYPT], self::DECRYPT => $keys[0][self::DECRYPT]);
        }
    }
    /**
     * Setup the performance-optimized function for de/encrypt()
     *
     * @see \phpseclib\Crypt\Base::_setupInlineCrypt()
     * @access private
     */
    function _setupInlineCrypt()
    {
        $lambda_functions =& self::_getLambdaFunctions();
        // Engine configuration for:
        // -  DES ($des_rounds == 1) or
        // - 3DES ($des_rounds == 3)
        $des_rounds = $this->des_rounds;
        // We create max. 10 hi-optimized code for memory reason. Means: For each $key one ultra fast inline-crypt function.
        // (Currently, for DES, one generated $lambda_function cost on php5.5@32bit ~135kb unfreeable mem and ~230kb on php5.5@64bit)
        // (Currently, for TripleDES, one generated $lambda_function cost on php5.5@32bit ~240kb unfreeable mem and ~340kb on php5.5@64bit)
        // After that, we'll still create very fast optimized code but not the hi-ultimative code, for each $mode one
        $gen_hi_opt_code = (bool) (\count($lambda_functions) < 10);
        // Generation of a unique hash for our generated code
        $code_hash = "Crypt_DES, {$des_rounds}, {$this->mode}";
        if ($gen_hi_opt_code) {
            // For hi-optimized code, we create for each combination of
            // $mode, $des_rounds and $this->key its own encrypt/decrypt function.
            // After max 10 hi-optimized functions, we create generic
            // (still very fast.. but not ultra) functions for each $mode/$des_rounds
            // Currently 2 * 5 generic functions will be then max. possible.
            $code_hash = \str_pad($code_hash, 32) . $this->_hashInlineCryptFunction($this->key);
        }
        // Is there a re-usable $lambda_functions in there? If not, we have to create it.
        if (!isset($lambda_functions[$code_hash])) {
            // Init code for both, encrypt and decrypt.
            $init_crypt = 'static $sbox1, $sbox2, $sbox3, $sbox4, $sbox5, $sbox6, $sbox7, $sbox8, $shuffleip, $shuffleinvip;
                if (!$sbox1) {
                    $sbox1 = array_map("intval", $self->sbox1);
                    $sbox2 = array_map("intval", $self->sbox2);
                    $sbox3 = array_map("intval", $self->sbox3);
                    $sbox4 = array_map("intval", $self->sbox4);
                    $sbox5 = array_map("intval", $self->sbox5);
                    $sbox6 = array_map("intval", $self->sbox6);
                    $sbox7 = array_map("intval", $self->sbox7);
                    $sbox8 = array_map("intval", $self->sbox8);' . '
                    for ($i = 0; $i < 256; ++$i) {
                        $shuffleip[]    =  $self->shuffle[$self->ipmap[$i]];
                        $shuffleinvip[] =  $self->shuffle[$self->invipmap[$i]];
                    }
                }
            ';
            switch (\true) {
                case $gen_hi_opt_code:
                    // In Hi-optimized code mode, we use our [3]DES key schedule as hardcoded integers.
                    // No futher initialisation of the $keys schedule is necessary.
                    // That is the extra performance boost.
                    $k = array(self::ENCRYPT => $this->keys[self::ENCRYPT], self::DECRYPT => $this->keys[self::DECRYPT]);
                    $init_encrypt = '';
                    $init_decrypt = '';
                    break;
                default:
                    // In generic optimized code mode, we have to use, as the best compromise [currently],
                    // our key schedule as $ke/$kd arrays. (with hardcoded indexes...)
                    $k = array(self::ENCRYPT => array(), self::DECRYPT => array());
                    for ($i = 0, $c = \count($this->keys[self::ENCRYPT]); $i < $c; ++$i) {
                        $k[self::ENCRYPT][$i] = '$ke[' . $i . ']';
                        $k[self::DECRYPT][$i] = '$kd[' . $i . ']';
                    }
                    $init_encrypt = '$ke = $self->keys[$self::ENCRYPT];';
                    $init_decrypt = '$kd = $self->keys[$self::DECRYPT];';
                    break;
            }
            // Creating code for en- and decryption.
            $crypt_block = array();
            foreach (array(self::ENCRYPT, self::DECRYPT) as $c) {
                /* Do the initial IP permutation. */
                $crypt_block[$c] = '
                    $in = unpack("N*", $in);
                    $l  = $in[1];
                    $r  = $in[2];
                    $in = unpack("N*",
                        ($shuffleip[ $r        & 0xFF] & "\\x80\\x80\\x80\\x80\\x80\\x80\\x80\\x80") |
                        ($shuffleip[($r >>  8) & 0xFF] & "\\x40\\x40\\x40\\x40\\x40\\x40\\x40\\x40") |
                        ($shuffleip[($r >> 16) & 0xFF] & "\\x20\\x20\\x20\\x20\\x20\\x20\\x20\\x20") |
                        ($shuffleip[($r >> 24) & 0xFF] & "\\x10\\x10\\x10\\x10\\x10\\x10\\x10\\x10") |
                        ($shuffleip[ $l        & 0xFF] & "\\x08\\x08\\x08\\x08\\x08\\x08\\x08\\x08") |
                        ($shuffleip[($l >>  8) & 0xFF] & "\\x04\\x04\\x04\\x04\\x04\\x04\\x04\\x04") |
                        ($shuffleip[($l >> 16) & 0xFF] & "\\x02\\x02\\x02\\x02\\x02\\x02\\x02\\x02") |
                        ($shuffleip[($l >> 24) & 0xFF] & "\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01")
                    );
                    ' . '
                    $l = $in[1];
                    $r = $in[2];
                ';
                $l = '$l';
                $r = '$r';
                // Perform DES or 3DES.
                for ($ki = -1, $des_round = 0; $des_round < $des_rounds; ++$des_round) {
                    // Perform the 16 steps.
                    for ($i = 0; $i < 16; ++$i) {
                        // start of "the Feistel (F) function" - see the following URL:
                        // http://en.wikipedia.org/wiki/Image:Data_Encryption_Standard_InfoBox_Diagram.png
                        // Merge key schedule.
                        $crypt_block[$c] .= '
                            $b1 = ((' . $r . ' >>  3) & 0x1FFFFFFF)  ^ (' . $r . ' << 29) ^ ' . $k[$c][++$ki] . ';
                            $b2 = ((' . $r . ' >> 31) & 0x00000001)  ^ (' . $r . ' <<  1) ^ ' . $k[$c][++$ki] . ';' . $l . ' = $sbox1[($b1 >> 24) & 0x3F] ^ $sbox2[($b2 >> 24) & 0x3F] ^
                                     $sbox3[($b1 >> 16) & 0x3F] ^ $sbox4[($b2 >> 16) & 0x3F] ^
                                     $sbox5[($b1 >>  8) & 0x3F] ^ $sbox6[($b2 >>  8) & 0x3F] ^
                                     $sbox7[ $b1        & 0x3F] ^ $sbox8[ $b2        & 0x3F] ^ ' . $l . ';
                        ';
                        // end of "the Feistel (F) function"
                        // swap L & R
                        list($l, $r) = array($r, $l);
                    }
                    list($l, $r) = array($r, $l);
                }
                // Perform the inverse IP permutation.
                $crypt_block[$c] .= '$in =
                    ($shuffleinvip[($l >> 24) & 0xFF] & "\\x80\\x80\\x80\\x80\\x80\\x80\\x80\\x80") |
                    ($shuffleinvip[($r >> 24) & 0xFF] & "\\x40\\x40\\x40\\x40\\x40\\x40\\x40\\x40") |
                    ($shuffleinvip[($l >> 16) & 0xFF] & "\\x20\\x20\\x20\\x20\\x20\\x20\\x20\\x20") |
                    ($shuffleinvip[($r >> 16) & 0xFF] & "\\x10\\x10\\x10\\x10\\x10\\x10\\x10\\x10") |
                    ($shuffleinvip[($l >>  8) & 0xFF] & "\\x08\\x08\\x08\\x08\\x08\\x08\\x08\\x08") |
                    ($shuffleinvip[($r >>  8) & 0xFF] & "\\x04\\x04\\x04\\x04\\x04\\x04\\x04\\x04") |
                    ($shuffleinvip[ $l        & 0xFF] & "\\x02\\x02\\x02\\x02\\x02\\x02\\x02\\x02") |
                    ($shuffleinvip[ $r        & 0xFF] & "\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01");
                ';
            }
            // Creates the inline-crypt function
            $lambda_functions[$code_hash] = $this->_createInlineCryptFunction(array('init_crypt' => $init_crypt, 'init_encrypt' => $init_encrypt, 'init_decrypt' => $init_decrypt, 'encrypt_block' => $crypt_block[self::ENCRYPT], 'decrypt_block' => $crypt_block[self::DECRYPT]));
        }
        // Set the inline-crypt function as callback in: $this->inline_crypt
        $this->inline_crypt = $lambda_functions[$code_hash];
    }
}

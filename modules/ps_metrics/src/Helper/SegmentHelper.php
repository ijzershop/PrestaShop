<?php
/**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\Module\Ps_metrics\Helper;

use PrestaShop\Module\Ps_metrics\Environment\SegmentEnv;
use Segment;

class SegmentHelper
{
    /**
     * @var SegmentEnv
     */
    private $segmentEnv;

    /**
     * SegmentHelper constructor.
     *
     * @param SegmentEnv $segmentEnv
     *
     * @return void
     */
    public function __construct(SegmentEnv $segmentEnv)
    {
        $this->segmentEnv = $segmentEnv;
    }

    /**
     * Init segment
     *
     * @return void
     */
    public function init()
    {
        Segment::init($this->segmentEnv->getSegmentApiKey());
    }

    /**
     * @param array $message
     *
     * @return void
     */
    public function track($message)
    {
        Segment::track($message);
    }

    /**
     * Flush segment
     *
     * @return void
     */
    public function flush()
    {
        Segment::flush();
    }
}

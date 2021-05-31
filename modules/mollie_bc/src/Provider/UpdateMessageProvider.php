<?php
/**
 * Copyright (c) 2012-2021, Mollie B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * - Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
 * DAMAGE.
 *
 * @author     Mollie B.V. <info@mollie.nl>
 * @copyright  Mollie B.V.
 * @license    Berkeley Software Distribution License (BSD-License 2) http://www.opensource.org/licenses/bsd-license.php
 *
 * @category   Mollie
 *
 * @see       https://www.mollie.nl
 * @codingStandardsIgnoreStart
 */

namespace Mollie\Provider;

use Context;
use Mollie;
use Mollie\Utility\TagsUtility;
use SimpleXMLElement;
use Tools;

class UpdateMessageProvider implements UpdateMessageProviderInterface
{
    /**
     * @var Mollie
     */
    private $module;

    public function __construct(Mollie $module)
    {
        $this->module = $module;
    }

    /**
     * @param string $url
     * @param mixed $addons
     *
     * @return string
     *
     * @throws \SmartyException
     */
    public function getUpdateMessageFromOutsideUrl($url, $addons)
    {
        $updateXml = $this->getUpdateXML($url, $addons);

        if (!$updateXml) {
            return $this->module->l('Warning: Could not retrieve update xml file from github.');
        }

        /* @var SimpleXMLElement $tags */
        $tags = new SimpleXMLElement($updateXml);

        if (!$this->xmlFileFollowsExpectedFormat($tags)) {
            return $this->module->l('Warning: Update xml file from github follows an unexpected format.', $this->module->name);
        }

        $title = $tags->entry[0]->id;
        $latestVersion = preg_replace('/[^0-9,.]/', '', Tools::substr($title, strrpos($title, '/')));

        if (version_compare($this->module->version, $latestVersion, '>=')) {
            return '';
        }

        Context::getContext()->smarty->assign(
            [
                'this_version' => $this->module->version,
                'release_version' => $latestVersion,
                'github_url' => TagsUtility::ppTags(
                    sprintf(
                        $this->module->l('You are currently using version \'%s\' of this plugin. The latest version is \'%s\'. We advice you to [1]update[/1] to enjoy the latest features. '),
                        $this->module->version,
                        $latestVersion
                    ),
                    [
                        $this->module->display($this->module->getPathUri(), 'views/templates/admin/github_redirect.tpl'),
                    ]
                ),
            ]
        );

        return Context::getContext()->smarty->fetch(_PS_MODULE_DIR_ . 'mollie/views/templates/admin/new_release.tpl');
    }

    /**
     * @param string $url
     * @param mixed $addons
     *
     * @return bool|string
     */
    private function getUpdateXML($url, $addons)
    {
        if ($addons) {
            return '';
        }

        return @Tools::file_get_contents($url . '/releases.atom');
    }

    /**
     * @param SimpleXMLElement $tags
     *
     * @return bool
     */
    private function xmlFileFollowsExpectedFormat($tags)
    {
        if (empty($tags)) {
            return false;
        }

        if (!isset($tags->entry)) {
            return false;
        }

        if (!isset($tags->entry[0])) {
            return false;
        }

        if (!isset($tags->entry[0]->id)) {
            return false;
        }

        return true;
    }
}

{**
* 2010-2018 Tuni-Soft
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author
*  @copyright 2014-2015
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*}

{$dp_controller = $link->getAdminLink('DynamicProductAjax')}
<form class="dp_field_image_form" action="{$dp_controller|escape:'htmlall':'UTF-8'}" method="post" enctype="multipart/form-data" target="dp_iframe">
    <input type="hidden" name="id_field" value="">
    <input type="hidden" name="ajax" value="1">
    <input type="file" name="image" class="dp_file">
    <input type="submit" name="action" value="field_image" class="dp_hide">
</form>
<iframe name="dp_iframe" id="dp_iframe"></iframe>
{**
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License version 3.0
* that is bundled with this package in the file LICENSE.txt
* It is also available through the world-wide-web at this URL:
* https://opensource.org/licenses/AFL-3.0
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade this module to a newer
* versions in the future. If you wish to customize this module for your
* needs please refer to CustomizationPolicy.txt file inside our module for more information.
*
* @author Webkul IN
* @copyright Since 2010 Webkul
* @license https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
*}

<div class="alert alert-info webpcron">
    <p>{l s='First of all, make sure the curl library is installed on your server to execute your cron tasks.' mod='wkwebp'}</p>
</div>
<div class="alert alert-info">
    <p>{l s='To generate webp images, please insert the following line in your cron tasks manager for everyday:' mod='wkwebp'}</p>
    <br>
    <p>
        <ul class="list-unstyled">
            <li><code>0 0 * * * curl {$cronUrl|escape:'htmlall':'UTF-8'}</code></li>
        </ul>
    </p>
</div>

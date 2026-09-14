<?php
/**
 * @author    N1ED http://n1ed.com
 * @copyright N1ED/EdSDK
 * @license   Proprietary license
 */
?>

<div id="top-index" class="panel">
    <h3><i class="icon-cogs"></i>&nbsp;Prestashop content editor configuration</h3>
    <div id="cms-conf-placeholder"></div>
    <script src='https://n1ed.com/js/n1ed-cms-conf-3.js'></script>
    <script>
        var saveFunc = window.attachN1EDCmsConf({
            el: document.getElementById("cms-conf-placeholder"),
            urlSetApiKeyAndToken:  '/modules/n1ed/apiKey.php',
            apiKey: '{$APIKEY|escape:'htmlall':'UTF-8'}',
            token: '{$TOKEN|escape:'htmlall':'UTF-8'}',
            editorName: 'tinymce', // or 'ckeditor' if you use it as base editor
            integration: 'prestashop', // your CMS name in lowercase, type once and do not change in future please
            isCheckBoxN1EDEcoEnabledVisible: false,
            checkBoxN1EDEcoEnabledTitle: null,
            checkBoxN1EDEcoEnabledValue: null,
            onN1EDEcoEnabledChange: function (value, onFinished) {},
            onApiKeyChange: function (apiKey, token) {}
        });
    </script>
</div>


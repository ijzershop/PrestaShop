{* Wrapper template to embed the Twig-rendered Catalog Backup HTML inside the Back Office layout *}
{block name='content'}
  <div class="ms-wrapper">
    {$ms_inner_html nofilter}
  </div>
{/block}

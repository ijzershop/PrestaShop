{include file='_partials/form-errors.tpl' errors=$errors['']}

{* TODO StarterTheme: HOOKS!!! *}

<form id="login-form" action="{$action}" method="post" data-toggle="validator">

  <section>
    {block name='form_fields'}
      {foreach from=$formFields item="field"}
        {block name='form_field'}
          {form_field field=$field}
        {/block}
      {/foreach}
    {/block}
  </section>

  <footer class="form-footer text-xs-center">
    <input type="hidden" name="submitLogin" value="1">
    {block name='form_buttons'}
      <button type="submit" class="form-control-submit">
        {l s='Sign in'}
      </button>
    {/block}
  </footer>

    <div class="forgot-password">
      <a href="{$urls.pages.password}" rel="nofollow">
        {l s='Forgot your password?'}
      </a>
    </div>


</form>

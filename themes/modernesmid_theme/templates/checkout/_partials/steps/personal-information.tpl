{extends file='checkout/_partials/steps/checkout-step.tpl'}

{block name='step_content'}
  {hook h='displayPersonalInformationTop' customer=$customer}
  {if $customer.is_logged && !$customer.is_guest}

    <p class="identity">
      {* [1][/1] is for a HTML tag. *}
      {l s='Connected as [1]%firstname% %lastname%[/1].'
        d='Shop.Theme.Customeraccount'
        sprintf=[
          '[1]' => "<a href='{$urls.pages.identity}'>",
          '[/1]' => "</a>",
          '%firstname%' => $customer.firstname,
          '%lastname%' => $customer.lastname
        ]
      }
    </p>
    <p>
      {* [1][/1] is for a HTML tag. *}
      {l
        s='Not you? [1]Log out[/1]'
        d='Shop.Theme.Customeraccount'
        sprintf=[
        '[1]' => "<a href='{$urls.actions.logout}'>",
        '[/1]' => "</a>"
        ]
      }
    </p>
    {if !isset($empty_cart_on_logout) || $empty_cart_on_logout}
      <p><small>{l s='If you sign out now, your cart will be emptied.' d='Shop.Theme.Checkout'}</small></p>
    {/if}

    <div class="clearfix">
      <form method="GET" action="{$urls.pages.order}">
        <button
          class="continue w-100 btn btn-success float-xs-right"
          name="controller"
          type="submit"
          value="order"
        >
          {l s='Continue' d='Shop.Theme.Actions'}
        </button>
      </form>

    </div>

  {else}
    <ul class="nav nav-inline my-2" role="tablist">
      <li style="border-color:#3b56ad !important;" class="nav-item col-6 text-center {if !$show_login_form}border-right border-top border-left{else}border-bottom{/if}">
        <a
          class="nav-link h5 mt-2 {if !$show_login_form} text-dark active user-select-none {else} btn btn-outline-white {/if}"
          data-toggle="tab"
          href="#checkout-guest-form"
          role="tab"
          aria-controls="checkout-guest-form"
          {if !$show_login_form} aria-selected="true"{/if}
          >
          {if $guest_allowed}
            Gast{if $show_login_form}{/if}
{*            {l s='Order as a guest' d='Shop.Theme.Checkout'}*}
          {else}
            {l s='Create an account' d='Shop.Theme.Customeraccount'}{if !$show_login_form}{/if}
          {/if}
        </a>
      </li>


      <li style="border-color:#3b56ad !important;" class="nav-item col-6 text-center {if $show_login_form}border-left border-top border-right{else}border-bottom{/if}">
        <a
          class="nav-link h5 mt-2 {if $show_login_form}text-dark active user-select-none{else} btn btn-outline-white {/if}"
          data-link-action="show-login-form"
          data-toggle="tab"
          href="#checkout-login-form"
          role="tab"
          aria-controls="checkout-login-form"
          {if $show_login_form} aria-selected="true"{/if}
        >
          Account{if !$show_login_form}{/if}
{*          {l s='Sign in' d='Shop.Theme.Actions'}*}
        </a>
      </li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane {if !$show_login_form}active{/if}" id="checkout-guest-form" role="tabpanel" {if $show_login_form}aria-hidden="true"{/if}>
        {render file='checkout/_partials/customer-form.tpl' ui=$register_form guest_allowed=$guest_allowed}
      </div>
      <div class="tab-pane {if $show_login_form}active{/if}" id="checkout-login-form" role="tabpanel" {if !$show_login_form}aria-hidden="true"{/if}>
        {render file='checkout/_partials/login-form.tpl' ui=$login_form}
      </div>
    </div>


  {/if}
{/block}

{**
 * 2007-2019 PrestaShop and Contributors
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
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}

<script type="text/javascript">
  var productCommentUpdatePostErrorMessage = '{l s='Sorry, your review appreciation cannot be sent.' d='Modules.Productcomments.Shop' js=1}';
  var productCommentAbuseReportErrorMessage = '{l s='Sorry, your abuse report cannot be sent.' d='Modules.Productcomments.Shop' js=1}';
</script>

<div class="row mt-5" id="product-comments-block">
  <div class="col-12">
    <div class="col-12 border-top" style="padding-top: 18px;">
      <span style="font-size:15px;font-weight:bold;color:#777777;font-family:Helvetica, Tahoma, sans-serif, Arial;padding-top:15px;">Product opmerkingen</span>
    </div>
  </div>
</div>
{include file='module:productcomments/views/templates/hook/product-comment-item-prototype.tpl' assign="comment_prototype"}
{include file='module:productcomments/views/templates/hook/empty-product-comment.tpl'}
<div class="row">
  <div class="col-md-12 col-sm-12"
       id="product-comments-list"
       data-list-comments-url="{$list_comments_url nofilter}"
       data-update-comment-usefulness-url="{$update_comment_usefulness_url nofilter}"
       data-report-comment-url="{$report_comment_url nofilter}"
       data-comment-item-prototype="{$comment_prototype|escape:'html'}">
  </div>
</div>


{* Appreciation post error modal *}
{include file='module:productcomments/views/templates/hook/alert-modal.tpl'
  modal_id='update-comment-usefulness-post-error'
  modal_title={l s='Your review appreciation cannot be sent' d='Modules.Productcomments.Shop'}
  icon='error'
}

{* Confirm report modal *}
{include file='module:productcomments/views/templates/hook/confirm-modal.tpl'
  modal_id='report-comment-confirmation'
  modal_title={l s='Report comment' d='Modules.Productcomments.Shop'}
  modal_message={l s='Are you sure that you want to report this comment?' d='Modules.Productcomments.Shop'}
  icon='feedback'
}

{* Report comment posted modal *}
{include file='module:productcomments/views/templates/hook/alert-modal.tpl'
  modal_id='report-comment-posted'
  modal_title={l s='Report sent' d='Modules.Productcomments.Shop'}
  modal_message={l s='Your report has been submitted and will be considered by a moderator.' d='Modules.Productcomments.Shop'}
}

{* Report abuse error modal *}
{include file='module:productcomments/views/templates/hook/alert-modal.tpl'
modal_id='report-comment-post-error'
modal_title={l s='Your report cannot be sent' d='Modules.Productcomments.Shop'}
icon='error'
}

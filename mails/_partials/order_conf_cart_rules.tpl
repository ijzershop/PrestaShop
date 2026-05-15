{**
 * For the full copyright and license information, please view the
 * docs/licenses/LICENSE.txt file that was distributed with this source code.
 *}
{foreach $list as $cart_rule}
  <tr>
    <td colspan="2"  style="border:none;">
      <table class="table">
        <tr>
          <td width="5">&nbsp;</td>
          <td style="Margin:0;mso-line-height-rule:exactly;font-family:'Open Sans', sans-serif;line-height:20px;letter-spacing:0;color:#ffffff;font-size:16px" align="right">
            <font size="2" face="Open-sans, sans-serif" color="#ffffff">
              {$cart_rule['voucher_name']}
            </font>
          </td>
          <td width="5">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>
{/foreach}

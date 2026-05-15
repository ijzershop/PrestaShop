{**
 * For the full copyright and license information, please view the
 * docs/licenses/LICENSE.txt file that was distributed with this source code.
 *}
{foreach $list as $product}
<tr>
  <td style="border:none;">
    <table class="table">
      <tr>
        <td width="5">&nbsp;</td>
        <td style="Margin:0;mso-line-height-rule:exactly;font-family:'Open Sans', sans-serif;line-height:20px;letter-spacing:0;color:#ffffff;font-size:16px" align="right">
          <font size="2" face="Open-sans, sans-serif" color="#ffffff">
            {$product['quantity']}X
          </font>
        </td>
        <td width="5">&nbsp;</td>
      </tr>
    </table>
  </td>
	<td style="border:none;">
		<table class="table">
			<tr>
				<td width="5">&nbsp;</td>
				<td style="Margin:0;mso-line-height-rule:exactly;font-family:'Open Sans', sans-serif;line-height:20px;letter-spacing:0;color:#ffffff;font-size:16px">
					<font size="2" face="Open-sans, sans-serif" color="#ffffff">
						<strong>{$product['name']|stripSawCutModuleAttributeGroupName}</strong>
						{if count($product['customization']) >= 1}
							<br>
							{foreach $product['customization'] as $customization}
                <span style="font-size:12px;">{$customization['customization_text'] nofilter}</span>
							{/foreach}
						{/if}

					</font>
				</td>
				<td width="5">&nbsp;</td>
			</tr>
		</table>
	</td>
</tr>
  {if count($product['customization']) > 1}
  	{foreach $product['customization'] as $customization}
  		<tr>
  		<td colspan="3" style="border:none;">
  			<table class="table">
  				<tr>
  					<td width="5">&nbsp;</td>
  					<td style="Margin:0;mso-line-height-rule:exactly;font-family:'Open Sans', sans-serif;line-height:20px;letter-spacing:0;color:#ffffff;font-size:12px">
  						<font size="2" face="Open-sans, sans-serif" color="#ffffff">
  							{$customization['customization_text'] nofilter}
  						</font>
  					</td>
  					<td width="5">&nbsp;</td>
  				</tr>
  			</table>
  		</td>
  		<td style="border:none;">
  			<table class="table">
  				<tr>
  					<td width="5">&nbsp;</td>
  					<td style="Margin:0;mso-line-height-rule:exactly;font-family:'Open Sans', sans-serif;line-height:20px;letter-spacing:0;color:#ffffff;font-size:12px" align="right">
  						<font size="2" face="Open-sans, sans-serif" color="#ffffff">
  							{if count($product['customization']) > 1}
  								{$customization['customization_quantity']}
  							{/if}
  						</font>
  					</td>
  					<td width="5">&nbsp;</td>
  				</tr>
  			</table>
  		</td>
  		<td style="border:none;"></td>
  	</tr>
  	{/foreach}
  {/if}
  {/foreach}

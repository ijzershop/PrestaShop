{assign var=_counter value=0}
{function name="menu" nodes=[] depth=0 parent=null}
    {if $nodes|count}
        {foreach from=$nodes item=node}
            <li class="{$node.type}{if $node.current} active {/if} {if $node.children|count}dropdown-submenu{/if}" id="{$node.page_identifier}">
            {assign var=_counter value=$_counter+1}
              <a class="dropdown-item {if $node.children|count}dropdown-toggle{/if}" href="{$node.url}" data-depth="{$depth}" {if $node.open_in_new_window} rel="noopener" target="_blank" {/if}>{$node.label}</a>
                {if $node.children|count}
                  <ul class="dropdown-menu">
                    {menu nodes=$node.children depth=$node.depth parent=$node}
                  </ul> 
                 {/if}
            </li>
        {/foreach}
    {/if}
{/function}
{menu nodes=$menu.children}

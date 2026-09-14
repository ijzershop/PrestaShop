/**
 *    This file is part of eMagicOne Bridge Connector.
 *
 *   eMagicOne Bridge Connector is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   eMagicOne Bridge Connector is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with eMagicOne Bridge Connector.  If not, see <http://www.gnu.org/licenses/>.
 *
 *  @author    eMagicOne <contact@emagicone.com>
 *  @copyright 2014-2025 eMagicOne
 *  @license   http://www.gnu.org/licenses   GNU General Public License
 */

$(function () {
    let bridgeconnector_div_tables = '<div id="bridgeconnector_div_tables" style="height: 300px; overflow: scroll;">';
    let baseUrl = $('#mobassistantconnector_base_url').val();
    let adminModuleUrl = $('#bridgeconnector_admin_module_url').val();
    let loader_img = '<img src="' + baseUrl + 'modules/bridgeconnector/views/img/loader.gif" alt="Loader">';
    let loader = '<div class="mobassistantconnector_loader">' + loader_img + '</div>';
    let loader_tables_container = '<div id="bridgeconnector_tables_loader_container">' + loader + '</div>';
    let tables_parent = $('#bridgeconnector_db_tables_invisible').parent();
    let key = $('#bridgeconnector_key').val();
    let new_users_count = 0;
    let enabled = '<img src="' + baseUrl +
        'modules/bridgeconnector/views/img/enabled.gif" alt="Disable" title="Disable">';
    let disabled = '<img src="' + baseUrl +
        'modules/bridgeconnector/views/img/disabled.gif" alt="Enable" title="Enable">';
    let bridgeconnector_tables_container = '<div id="bridgeconnector_tables_container">' +
        loader_tables_container + '</div>';

    tables_parent.append(bridgeconnector_tables_container);
    $('#bridgeconnector_tables_container').append(bridgeconnector_div_tables);

    getTables();

    function getTables() {
        let loader_tables = $('#bridgeconnector_tables_loader_container');
        $.post(adminModuleUrl,
            {
                call_function: 'bridgeGetTables',
                auth_key: key
            },
            function (data) {
                let target = $('#bridgeconnector_div_tables');

                let table_data;
                if (data != 'error' && data != 'Authentication error') {
                    let count_data = data.length;
                    table_data = '';
                    for (let i = 0; i < count_data; i++) {
                        table_data +=
                            '<input type="checkbox" class="" name="bridgeconnector_exclude_db_tables_checked[]" ' +
                            'value="' + data[i].table_name + '" ' + data[i].checked + '> ' +
                            data[i].table_name +
                            '<br>';
                    }

                    loader_tables.hide();
                    target.html(table_data);
                } else {
                    loader_tables.hide();
                    if (data == "error") {
                        alert("Some error occurred while getting tables");
                    }

                    alert(data);
                }
            }, 'json'
        ).error(function (error) {
            loader_tables.hide();
            alert("eMagicOne Store Manager Bridge Connector Error:\r\n" + error.responseText);
        });
    }
});

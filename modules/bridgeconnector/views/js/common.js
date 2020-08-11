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
 *  @copyright 2014-2019 eMagicOne
 *  @license   http://www.gnu.org/licenses   GNU General Public License
 */

$(function () {
    let bridgeconnector_div_tables = '<div id="bridgeconnector_div_tables" style="height: 300px; overflow: scroll;">';
    let baseUrl = $('#mobassistantconnector_base_url').val();
    let adminModuleUrl = $('#mobassistantconnector_admin_module_url').val();
    let loader_img = '<img src="' + baseUrl + 'modules/bridgeconnector/views/img/loader.gif" alt="Loader">';
    let loader = '<div class="mobassistantconnector_loader">' + loader_img + '</div>';
    let loader_users_container = '<div id="mobassistantconnector_users_loader_container">' + loader + '</div>';
    let loader_tables_container = '<div id="bridgeconnector_tables_loader_container">' + loader + '</div>';
    let users_parent = $('#mobassistantconnector_users').parent();
    let tables_parent = $('#bridgeconnector_db_tables_invisible').parent();
    let key = $('#mobassistantconnector_key').val();
    let new_users_count = 0;
    let enabled = '<img src="' + baseUrl +
        'modules/bridgeconnector/views/img/enabled.gif" alt="Disable" title="Disable">';
    let disabled = '<img src="' + baseUrl +
        'modules/bridgeconnector/views/img/disabled.gif" alt="Enable" title="Enable">';
    let mobassistantconnector_users_container = '<div id="mobassistantconnector_users_container">' +
        loader_users_container + '</div>';
    let mobassistantconnector_users_table_div = '<div id="mobassistantconnector_users_table_div"></div>';
    let bridgeconnector_tables_container = '<div id="bridgeconnector_tables_container">' +
        loader_tables_container + '</div>';

    tables_parent.append(bridgeconnector_tables_container);
    $('#bridgeconnector_tables_container').append(bridgeconnector_div_tables);
    users_parent.append(mobassistantconnector_users_container);
    $('#mobassistantconnector_users_container').append(mobassistantconnector_users_table_div);

    getUsers();
    setEvents();
    generateAppQRCode();
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

    function generateAppQRCode() {
        $("#mobassistantconnector_qrcode_app").parent().prepend(
            "<div id='mobassistantconnector_qr_code_app_img' style='padding-bottom: 10px'></div>"
        );
        let qrcodeAppContainer = document.getElementById("mobassistantconnector_qr_code_app_img");

        if (qrcodeAppContainer != null) {
            let qrCode = new QRCode(qrcodeAppContainer, {
                width: 150,
                height: 150
            });
            qrCode.makeCode("goo.gl/UwJJ6W");
        }
    }

    function setEvents() {
        $('div.mobassistantconnector_status').live('click', function () {
            changeStatus($(this));
        });

        $('div.mobassistantconnector_users_delete').live('click', function () {
            if (isNewUser($(this)) == '0') {
                if (confirm('Are you sure you want to delete user?')) {
                    deleteUser($(this).attr('user_id'));
                }
            } else {
                let user_id = $(this).attr('user_id');

                $('#mobassistantconnector_row_user_' + user_id).remove();
                $('#mobassistantconnector_row_loader_user_' + user_id).remove();
            }
        });

        $('#mobassistantconnector_users_bulk_select_all').live('click', function () {
            $('.mobassistantconnector_users').each(function () {
                $(this).prop('checked', true);
            });
        });

        $('#mobassistantconnector_users_bulk_unselect_all').live('click', function () {
            $('.mobassistantconnector_users').each(function () {
                $(this).prop('checked', false);
            });
        });

        $('.mobassistantconnector_users_td_employees').live('click', function () {
            let user_id = $(this).attr('user_id');

            showUserEmploeesDialog(user_id);
            getEmployees(user_id);
        });

        $('.mobassistantconnector_users_td_actions').live('click', function () {
            let user_id = $(this).attr('user_id');

            showUserPermissionsDialog(user_id);

            if (isNewUser($(this)) == '0') {
                getActions(user_id);
            } else {
                getActionsForNewUser(user_id);
            }
        });

        $('.mobassistantconnector_users_icon_qr_code').live('click', function () {
            let user_id = $(this).attr('user_id');
            let qr_code_link = $('#mobassistantconnector_qr_code_link_user_' + user_id).val();

            $('#mobassistantconnector_qr_code_scan_user').html('');

            let qrcode_container = document.getElementById('mobassistantconnector_qr_code_scan_user');
            let qrcode = new QRCode(qrcode_container, {
                width: 250,
                height: 250
            });

            qrcode.makeCode($(this).attr('qr_code_data'));
            showUserQrCodeDialog(user_id);

            $('#mobassistantconnector_qr_code_link_user').html(
                '<a href="' + qr_code_link + '" target="_blank">' + qr_code_link + '</a>'
            );
            $('#mobassistantconnector_qr_code_user').show();
            setDialogPosition($('#mobassistantconnector_users_qr_code_dialog'));
        });

        $('#mobassistantconnector_user_permissions_toggle_all').live('click', function () {
            let is_checked = $('#mobassistantconnector_user_permissions_chb_toggle_all').is(':checked');

            $('.mobassistantconnector_user_permissions').each(function () {
                $(this).prop('checked', is_checked);
            });
        });

        $('#mobassistantconnector_add_user').live('click', function () {
            addNewUserRow();
        });

        $('.mobassistantconnector_users_save').live('click', function () {
            checkUserData($(this).attr('user_id'), isNewUser($(this)));
        });

        $('.mobassistantconnector_users_status').live('click', function () {
            if (isNewUser($(this)) == '0') {
                changeStatusForUser($(this));
            } else {
                changeStatusForNewUser($(this));
            }
        });

        $('#mobassistantconnector_users_bulk_status_active').live('click', function () {
            changeUserStatusBulk(1);
        });

        $('#mobassistantconnector_users_bulk_status_inactive').live('click', function () {
            changeUserStatusBulk(0);
        });

        $('#mobassistantconnector_users_bulk_delete').live('click', function () {
            if (confirm('Are you sure you want to delete selected users?')) {
                deleteUserBulk();
            }
        });

        $('.mobassistantconnector_users_login').live('click', function () {
            $(this).keyup(function () {
                processSaveButtonVisibility($(this).attr('user_id'));
            });
        });

        $('.mobassistantconnector_users_password').live('click', function () {
            $(this).keyup(function () {
                processSaveButtonVisibility($(this).attr('user_id'));
            });
        });

        $('.mobassistantconnector_users_save_login_password').live('click', function () {
            checkUserData($(this).attr('user_id'), isNewUser($(this)));
        });

        $('.mobassistantconnector_user_permissions').live('change', function () {
            processSelectedAction($(this));
        });

        $('.mobassistantconnector_users_td_actions_text').live('mouseenter', function () {
            $('#mobassistantconnector_users_actions_text_user_' + $(this).attr('user_id'))
                .addClass('mobassistantconnector_actions_hover');
        }).live('mouseleave', function () {
            $('#mobassistantconnector_users_actions_text_user_' + $(this).attr('user_id'))
                .removeClass('mobassistantconnector_actions_hover');
        });

        $(document).on('click', function (e) {
            let bulk_users_list = $('#mobassistantconnector_users_bulk_list');

            if (!bulk_users_list.is(':visible') && e.target.hasAttribute('id')
                && (e.target.id == 'mobassistantconnector_users_bulk_btn'
                    || e.target.id == 'mobassistantconnector_users_bulk_btn_img')
            ) {
                bulk_users_list.show();
            } else if (bulk_users_list.is(':visible')) {
                bulk_users_list.hide();
            }
        });
    }

    function changeStatus(selector) {
        let val = selector.attr('val');
        let img_prev = selector.html();

        selector.html(loader_img);

        if (val == 0) {
            val = 1;
        } else {
            val = 0;
        }

        $.post(adminModuleUrl,
            {
                call_function: 'emoChangeStatus',
                user_id: selector.attr('user_id'),
                value: val,
                auth_key: key
            },
            function (data) {
                if (data == 'success') {
                    let enabled = '<img src="' + baseUrl + 'modules/bridgeconnector/views/img/enabled.gif" ' +
                        'alt="Disable" title="Disable ' + selector.attr("username") + '">';
                    let disabled = '<img src="' + baseUrl + 'modules/bridgeconnector/views/img/disabled.gif" ' +
                        'alt="Enable" title="Enable ' + selector.attr("username") + '">';

                    if (val == 1) {
                        selector.html(enabled);
                        selector.attr('val', 1);
                    } else {
                        selector.html(disabled);
                        selector.attr('val', 0)
                    }
                } else {
                    selector.html(img_prev);
                    if (data == "error") {
                        alert("Some error occurred while changing account status");
                    }

                    alert(data);
                }
            }, 'json'
        ).error(function (error) {
            selector.html(img_prev);
            alert("eMagicOne Store Manager Bridge Connector Error:\r\n" + error.responseText);
        });
    }

    function changeUserStatusBulk(val) {
        let user_ids = getUserIds();

        if (user_ids.length == 0) {
            alert('Nothing selected');
            return;
        }

        let loader = $('#mobassistantconnector_users_loader_container');

        loader.show();
        $('#mobassistantconnector_users_table_div').addClass('mobassistantconnector_inactive');

        $.post(adminModuleUrl,
            {
                call_function: 'emoChangeStatus',
                user_ids: user_ids,
                value: val,
                auth_key: key
            },
            function (data) {
                if (data != 'success') {
                    alert(data);
                }

                getUsers();
            }, 'json'
        ).error(function (error) {
            loader.hide();
            alert("eMagicOne Store Manager Bridge Connector Error:\r\n" + error.responseText);
        });
    }

    function changeStatusForUser(selector) {
        let val = selector.attr('val');
        let img_prev = selector.html();

        selector.html(loader_img);

        if (val == 0) {
            val = 1;
        } else {
            val = 0;
        }

        $.post(adminModuleUrl,
            {
                call_function: 'emoChangeStatus',
                user_ids: selector.attr('user_id'),
                value: val,
                auth_key: key
            },
            function (data) {
                if (data == 'success') {
                    if (val == 1) {
                        selector.html(enabled);
                        selector.attr('val', 1);
                    } else {
                        selector.html(disabled);
                        selector.attr('val', 0)
                    }
                } else {
                    selector.html(img_prev);
                    alert(data);
                }
            }, 'json'
        ).error(function (error) {
            selector.html(img_prev);
            alert("eMagicOne Store Manager Bridge Connector Error:\r\n" + error.responseText);
        });
    }

    function changeStatusForNewUser(element) {
        if (element.attr('val') == '1') {
            element.html(disabled);
            element.attr('val', '0');
        } else {
            element.html(enabled);
            element.attr('val', '1');
        }
    }

    function deleteUserBulk() {
        let user_ids = getUserIds();

        if (user_ids.length == 0) {
            alert('Nothing selected');
            return;
        }

        let loader_bulk = $('#mobassistantconnector_users_loader_container');

        loader_bulk.show();
        $('#mobassistantconnector_users_table_div').addClass('mobassistantconnector_inactive');

        $.post(adminModuleUrl,
            {
                call_function: 'emoDeleteUser',
                user_ids: user_ids,
                auth_key: key
            },
            function (data) {
                if (data != 'success') {
                    alert(data);
                }

                getUsers();
            }, 'json'
        ).error(function (error) {
            loader_bulk.hide();
            alert("eMagicOne Store Manager Bridge Connector Error:\r\n" + error.responseText);
        });
    }

    function deleteUser(user_id) {
        let row_user = $('#mobassistantconnector_row_user_' + user_id);
        let row_user_loader = $('#mobassistantconnector_row_loader_user_' + user_id);

        row_user.hide();
        row_user_loader.show();

        $.post(adminModuleUrl,
            {
                call_function: 'emoDeleteUser',
                user_ids: user_id,
                auth_key: key
            },
            function (data) {
                if (data == 'success') {
                    row_user.remove();
                    row_user_loader.remove();
                } else {
                    row_user_loader.hide();
                    row_user.show();

                    alert(data);
                }
            }, 'json'
        ).error(function (error) {
            row_user_loader.hide();
            row_user.show();

            alert("eMagicOne Store Manager Bridge Connector Error:\r\n" + error.responseText);
        });
    }

    function getUserIds() {
        let user_ids = '';

        $('[name="mobassistantconnector_users[]"]:checked').each(function () {
            if (user_ids != '') {
                user_ids += ',' + $(this).val();
            } else {
                user_ids = $(this).val();
            }
        });

        return user_ids;
    }

    function getSelectedActions() {
        let selected_actions = '';

        $('.mobassistantconnector_user_permissions:checked').each(function () {
            if (selected_actions.length > 0) {
                selected_actions += ';' + $(this).val();
            } else {
                selected_actions = $(this).val();
            }
        });

        return selected_actions;
    }

    function getSelectedEmployee() {
        let selected_employee = '';

        $('.mobassistantconnector_user_employees:checked').each(function () {
            if (selected_employee.length > 0) {
                selected_employee += ';' + $(this).val();
            } else {
                selected_employee = $(this).val();
            }
        });

        return selected_employee;
    }

    function showSelectedActionsForNewUser(user_id) {
        let selected_actions = '';
        let selected_actions_codes = '';
        let not_checked = $('.mobassistantconnector_user_permissions:not(:checked)');
        let checked = $('.mobassistantconnector_user_permissions:checked');

        if (not_checked.length > 0) {
            if (checked.length > 0) {
                checked.each(function () {
                    if (selected_actions != '') {
                        selected_actions += ', ';
                    }

                    if (selected_actions_codes != '') {
                        selected_actions_codes += ';';
                    }

                    selected_actions += $(this).parent().text().trim();
                    selected_actions_codes += $(this).val();
                });
            } else {
                selected_actions = 'Nothing';
            }
        } else {
            checked.each(function () {
                if (selected_actions_codes != '') {
                    selected_actions_codes += ';';
                }

                selected_actions_codes += $(this).val();
            });

            selected_actions = 'All';
        }

        $('#mobassistantconnector_div_actions_text_user_' + user_id).html(selected_actions);
        $('#mobassistantconnector_actions_codes_user_' + user_id).val(selected_actions_codes);
        preparePermissionsToView(true, user_id);
        $('#mobassistantconnector_users_permissions_dialog').dialog('close');
    }

    function getUsers() {
        let loader_users_bulk = $('#mobassistantconnector_users_loader_container');

        $.post(adminModuleUrl,
            {
                call_function: 'emoGetUsers',
                auth_key: key
            },
            function (data) {
                let target = $('#mobassistantconnector_users_table_div');

                if (data != 'error' && data != 'Authentication error') {
                    let table_data = '<table id="mobassistantconnector_users_table" class="table product">' +
                        '<tr>' +
                            '<th>' +
                            '</th>' +
                            '<th style="width: 30%">' +
                                '<table width="100%">' +
                                    '<tr>' +
                                        '<th style="width: 50%">Login</th>' +
                                        '<th style="width: 50%">Password</th>' +
                                    '</tr>' +
                                '</table>' +
                            '</th>' +
                            '<th id="mobassistantconnector_users_employees">Related Employee</th>' +
                            '<th id="mobassistantconnector_users_permissions">Permissions</th>' +
                            '<th>QR-code</th>' +
                            '<th>Status</th>' +
                            '<th></th>' +
                            '<th></th>' +
                            '<th></th>' +
                        '</tr>';
                    let count_users = data.length;

                    for (let i = 0; i < count_users; i++) {
                        table_data += '<tr id="mobassistantconnector_row_user_' + data[i].user_id + '">' +
                            generateUserRow(data[i]) + generateUserRowLoader(data[i].user_id);
                    }

                    if (count_users == 0) {
                        table_data +=
                            '<tr class="mobassistantconnector_users_no_data">' +
                                '<td colspan="6" ' + 'style="text-align: center">No data</td>' +
                            '</tr>';
                    }

                    table_data += '</table>' +
                        '<table>' +
                            '<tr>' +
                                '<td>' +
                                    '<div style="margin-top: 10px; margin-bottom: 10px; margin-right: 15px">' +
                                        '<button type="button" id="mobassistantconnector_users_bulk_btn" class="btn btn-default">Bulk actions ' +
                                            '<img alt="Down" id="mobassistantconnector_users_bulk_btn_img" src="' + baseUrl + 'modules/bridgeconnector/views/img/down.png">' +
                                        '</button>' +
                                    '</div>' +
                                    '<div id="mobassistantconnector_users_bulk_list">' +
                                        '<table>' +
                                            '<tr id="mobassistantconnector_users_bulk_select_all">' +
                                                '<td><img alt="Checked" src="' + baseUrl + 'modules/bridgeconnector/views/img/checked.png"></td>' +
                                                '<td>Select all</td>' +
                                            '</tr>' +
                                            '<tr id="mobassistantconnector_users_bulk_unselect_all">' +
                                                '<td><img alt="Unchecked" src="' + baseUrl + 'modules/bridgeconnector/views/img/unchecked.png"></td>' +
                                                '<td>Unselect all</td>' +
                                            '</tr>' +
                                            '<tr class="mobassistantconnector_delimiter">' +
                                                '<td colspan="2"><hr></td>' +
                                            '</tr>' +
                                            '<tr id="mobassistantconnector_users_bulk_status_active">' +
                                                '<td><img alt="Enabled" width="12px" height="12px" src="' + baseUrl + 'modules/bridgeconnector/views/img/enabled.gif"></td>' +
                                                '<td>Change status to active</td>' +
                                            '</tr>' +
                                            '<tr id="mobassistantconnector_users_bulk_status_inactive">' +
                                                '<td>' +
                                                    '<img alt="Disabled" width="12px" height="12px" src="' + baseUrl + 'modules/bridgeconnector/views/img/disabled.gif">' +
                                                '</td>' +
                                                '<td>Change status to inactive</td>' +
                                            '</tr>' +
                                            '<tr class="mobassistantconnector_delimiter">' +
                                                '<td colspan="2"><hr></td>' +
                                            '</tr>' +
                                            '<tr id="mobassistantconnector_users_bulk_delete">' +
                                                '<td><img alt="Delete" src="' + baseUrl + 'modules/bridgeconnector/views/img/bulk_trash.png"></td>' +
                                                '<td>Delete selected</td>' +
                                            '</tr>' +
                                        '</table>' +
                                    '</div>' +
                                '</td>' +
                                '<td>' +
                                    '<div>' +
                                        '<button type="button" id="mobassistantconnector_add_user" class="btn btn-default pull-right">Add user</button>' +
                                    '</div>' +
                                '</td>' +
                            '</tr>' +
                        '</table>' +
                        '<div id="mobassistantconnector_users_employees_dialog" title="User Employees">' +
                            getUserEmployeesDialogBody() +
                        '</div>' +
                        '<div id="mobassistantconnector_users_permissions_dialog" title="User Permissions">' +
                            getUserPermissionsDialogBody() +
                        '</div>' +
                        '<div id="mobassistantconnector_users_qr_code_dialog" title="QR-code for PrestaShop Mobile Assistant App">' +
                            getUserQrCodeDialogBody() +
                        '</div>';
                    loader_users_bulk.hide();
                    target.removeClass('mobassistantconnector_inactive');
                    target.html(table_data);

                    preparePermissionsToView(false, 0);
                } else {
                    if (data == "error") {
                        data = "Some error occurred while getting users";
                    }

                    loader_users_bulk.hide();
                    if (data == "error") {
                        alert("Some error occurred while getting users");
                    }

                    alert(data);
                }
            }, 'json'
        ).error(function (error) {
            loader_users_bulk.hide();
            alert("eMagicOne Store Manager Bridge Connector Error:\r\n" + error.responseText);
        });
    }

    /**
     * Add some style to view users' permissions
     * If is_new_user = false then user_id is ignored else user_id must be equal new user id
     * @param is_new_user
     * @param user_id
     */
    function preparePermissionsToView(is_new_user, user_id) {
        let width;
        let elements;

        if (!is_new_user) {
            elements = $('.mobassistantconnector_div_user_actions_text');
            width = $('#mobassistantconnector_users_permissions').width() - 44
        } else {
            elements = $('#mobassistantconnector_div_actions_text_user_' + user_id);
            width = $('.mobassistantconnector_div_user_actions_text:first').width();
        }

        // $.each(elements, function () {
        //     $(this).css('width', width + 'px').addClass('mobassistantconnector_div_user_actions_text_view');
        // });
    }

    function getActions(user_id) {
        let actions_container = $('#mobassistantconnector_user_actions_container');
        let loader_actions = $('#mobassistantconnector_loader_actions');

        actions_container.removeClass('mobassistantconnector_inactive');
        actions_container.html('');
        loader_actions.css({paddingTop: '14px'});
        loader_actions.show();

        $.post(adminModuleUrl,
            {
                call_function: 'emoGetActions',
                user_id: user_id,
                auth_key: key
            },
            function (data) {
                if (data != 'error' && data != 'Authentication error') {
                    let actions_data = generateUserPermissionsDialogBodyFromData(data);

                    loader_actions.hide();
                    loader_actions.css({paddingTop: '0'});
                    actions_container.html(actions_data);
                    setDialogPosition($('#mobassistantconnector_users_permissions_dialog'));
                } else {
                    if (data == "error") {
                        data = "Some error occurred while getting user actions";
                    }

                    loader_actions.hide();
                    alert(data);
                }
            }, 'json'
        ).error(function (error) {
            loader_actions.hide();
            alert("eMagicOne Store Manager Bridge Connector Error:\r\n" + error.responseText);
        });
    }

    function getEmployees(user_id) {
        let employees_container = $('#mobassistantconnector_user_employees_container');
        let loader_employees = $('#mobassistantconnector_loader_employees');

        employees_container.removeClass('mobassistantconnector_inactive');
        employees_container.html('');
        loader_employees.css({paddingTop: '14px'});
        loader_employees.show();

        $.post(adminModuleUrl,
            {
                call_function: 'emoGetEmployees',
                user_id: user_id,
                auth_key: key
            },
            function (data) {
                if (data != 'error' && data != 'Authentication error') {
                    let actions_data = generateUserEmployeesDialogBodyFromData(data);

                    loader_employees.hide();
                    loader_employees.css({paddingTop: '0'});
                    employees_container.html(actions_data);
                    setDialogPosition($('#mobassistantconnector_users_employees_dialog'));
                } else {
                    if (data == "error") {
                        data = "Some error occurred while getting employees";
                    }

                    loader_employees.hide();
                    alert(data);
                }
            }, 'json'
        ).error(function (error) {
            loader_employees.hide();
            alert("eMagicOne Store Manager Bridge Connector Error:\r\n" + error.responseText);
        });
    }

    function generateUserPermissionsGroupName(group_name) {
        return '<div class="mobassistantconnector_user_permissions_group">' + group_name + '</div>';
    }

    function generateUserPermissionsRow(permission_data) {
        let checked = '';

        if (permission_data.allowed == 1) {
            checked = 'checked';
        }

        return '<div class="mobassistantconnector_user_permission">' +
            '<label class="mobassistantconnector_user_permission_label"><input type="checkbox" ' +
            'id="mobassistantconnector_user_action_' + permission_data.code +
            '" class="mobassistantconnector_user_permissions" value="' + permission_data.code +
            '" ' + checked + '> ' + permission_data.name + '</label></div>';
    }

    function generateUserEmploeesRow(data) {
        let checked = '';

        if (data.selected == 1) {
            checked = 'checked';
        }

        return '<div class="mobassistantconnector_user_employee">' +
                '<label class="mobassistantconnector_user_employee_label">' +
                    '<input type="radio" id="mobassistantconnector_user_employee_' + data.employee_id + '" class="mobassistantconnector_user_employees" value="' + data.employee_id + '" ' + checked + '>' + data.full_name +
                '</label>' +
            '</div>';
    }

    function getActionsForNewUser(user_id) {
        let actions_container = $('#mobassistantconnector_user_actions_container');
        let loader_actions = $('#mobassistantconnector_loader_actions');

        actions_container.removeClass('mobassistantconnector_inactive');
        actions_container.html('');
        loader_actions.css({paddingTop: '14px'});
        loader_actions.show();

        $.post(adminModuleUrl,
            {
                call_function: 'emoGetActionsByCodes',
                user_id: user_id,
                actions_codes: $('#mobassistantconnector_actions_codes_user_' + user_id).val(),
                auth_key: key
            },
            function (data) {
                if (data != 'error' && data != 'Authentication error') {
                    let actions_data = generateUserPermissionsDialogBodyFromData(data);

                    loader_actions.hide();
                    loader_actions.css({paddingTop: '0'});
                    actions_container.html(actions_data);
                    setDialogPosition($('#mobassistantconnector_users_permissions_dialog'));
                } else {
                    if (data == "error") {
                        data = "Some error occurred while getting user actions";
                    }

                    loader_actions.hide();
                    alert(data);
                }
            }, 'json'
        );
    }

    function generateUserPermissionsDialogBodyFromData(data) {
        let actions_data = '';
        let groups_count = data.length;
        let child_count;
        let checked_all = 'checked';

        for (let i = 0; i < groups_count; i++) {
            child_count = data[i].child.length;
            actions_data += generateUserPermissionsGroupName(data[i].group_name);

            for (let j = 0; j < child_count; j++) {
                actions_data += generateUserPermissionsRow(data[i].child[j]);

                if (data[i].child[j].allowed == 0) {
                    checked_all = '';
                }
            }
        }

        if (groups_count == 0) {
            actions_data = '<div class="mobassistantconnector_no_data">No data</div>';
        } else {
            actions_data = '<div class="mobassistantconnector_user_permissions_toggle_all">' +
                '<label id="mobassistantconnector_user_permissions_toggle_all"><input type="checkbox" ' +
                ' id="mobassistantconnector_user_permissions_chb_toggle_all" value="1" ' + checked_all +
                '>Toggle all</label></div>' + actions_data;
        }

        return actions_data;
    }

    function generateUserEmployeesDialogBodyFromData(data) {
        let employees_data = '';
        let count = data.employees.length;

        for (let i = 0; i < count; i++) {
            employees_data += generateUserEmploeesRow(data.employees[i]);
        }

        if (count == 0) {
            employees_data = '<div class="mobassistantconnector_no_data">No data</div>';
        }

        return employees_data;
    }

    function saveUserEmployees(user_id) {
        let selected_employee_id = getSelectedEmployee();
        let loader_employees = $('#mobassistantconnector_loader_employees');
        let employees_container = $('#mobassistantconnector_user_employees_container');

        loader_employees.show();
        employees_container.addClass('mobassistantconnector_inactive');

        $.post(adminModuleUrl,
            {
                call_function: 'emoSaveUserEmployee',
                employee_id: selected_employee_id,
                user_id: user_id,
                auth_key: key
            },
            function (data) {
                $('#mobassistantconnector_users_employees_user_' + user_id).hide();

                if (data == 'success') {
                    $('#mobassistantconnector_users_employees_dialog').dialog('close');
                    updateEmployeeText(user_id);
                } else {
                    if (data == "error") {
                        data = "Some error occurred while saving user actions";
                    }

                    loader_employees.hide();
                    employees_container.removeClass('mobassistantconnector_inactive');
                    alert(data);
                }
            }, 'json'
        ).error(function () {
            loader_employees.hide();
            employees_container.removeClass('mobassistantconnector_inactive');
            alert('Some error occurred while saving user actions');
        });
    }

    function saveUserActions(user_id) {
        let selected_actions = getSelectedActions();
        let loader_actions = $('#mobassistantconnector_loader_actions');
        let actions_container = $('#mobassistantconnector_user_actions_container');

        loader_actions.show();
        actions_container.addClass('mobassistantconnector_inactive');

        $.post(adminModuleUrl,
            {
                call_function: 'emoSaveUserActions',
                selected_actions: selected_actions,
                user_id: user_id,
                auth_key: key
            },
            function (data) {
                $('#mobassistantconnector_users_actions_user_' + user_id).hide();

                if (data == 'success') {
                    $('#mobassistantconnector_users_permissions_dialog').dialog('close');
                    updateAllowedActionsText(user_id);
                } else {
                    if (data == "error") {
                        data = "Some error occurred while saving user actions";
                    }

                    loader_actions.hide();
                    actions_container.removeClass('mobassistantconnector_inactive');
                    alert(data);
                }
            }, 'json'
        ).error(function () {
            loader_actions.hide();
            actions_container.removeClass('mobassistantconnector_inactive');
            alert('Some error occurred while saving user actions');
        });
    }

    function updateEmployeeText(user_id) {
        let employees_update_loader = $('#mobassistantconnector_employees_text_loader_user_' + user_id);
        let employees_text = $('#mobassistantconnector_div_employees_text_user_' + user_id);

        employees_update_loader.show();
        employees_text.addClass('mobassistantconnector_inactive');

        $.post(adminModuleUrl,
            {
                call_function: 'emoGetUserEmployee',
                user_id: user_id,
                auth_key: key
            },
            function (data) {
                employees_update_loader.hide();
                employees_text.removeClass('mobassistantconnector_inactive');

                if (data != 'error' && data != 'Authentication error') {
                    employees_text.html(data.full_name);
                } else {
                    if (data == "error") {
                        data = "Some error occurred while updating allowed actions text";
                    }

                    alert(data);
                }
            }, 'json'
        ).error(function (error) {
            alert("eMagicOne Store Manager Bridge Connector Error:\r\n" + error.responseText);
        });
    }

    function updateAllowedActionsText(user_id) {
        let actions_update_loader = $('#mobassistantconnector_actions_text_loader_user_' + user_id);
        let actions_text = $('#mobassistantconnector_div_actions_text_user_' + user_id);

        actions_update_loader.show();
        actions_text.addClass('mobassistantconnector_inactive');

        $.post(adminModuleUrl,
            {
                call_function: 'emoGetUserActions',
                user_id: user_id,
                auth_key: key
            },
            function (data) {
                actions_update_loader.hide();
                actions_text.removeClass('mobassistantconnector_inactive');

                if (data != 'error' && data != 'Authentication error') {
                    actions_text.html(data);
                } else {
                    if (data == "error") {
                        data = "Some error occurred while updating allowed actions text";
                    }

                    alert(data);
                }
            }, 'json'
        ).error(function (error) {
            alert("eMagicOne Store Manager Bridge Connector Error:\r\n" + error.responseText);
        });
    }

    function addNewUserRow() {
        let data = {};

        new_users_count++;
        data.user_id = 'new_' + new_users_count;
        data.status = 1;
        data.username = '';
        data.password = '';
        data.employee = 'Current';
        data.allowed_actions = 'Nothing';
        $('#mobassistantconnector_users_table > tbody:last-child').append(
            '<tr id="mobassistantconnector_row_user_' + data.user_id + '">' +
            generateUserRow(data) + '</tr>' +
            generateUserRowLoader(data.user_id)
        );
    }

    function checkUserData(user_id, is_new_user) {
        let login = $('#mobassistantconnector_login_user_' + user_id).val().trim();
        let password = $('#mobassistantconnector_password_user_' + user_id).val();

        let row_user = $('#mobassistantconnector_row_user_' + user_id);
        let row_user_loader = $('#mobassistantconnector_row_loader_user_' + user_id);

        row_user.hide();
        row_user_loader.show();

        $.post(adminModuleUrl,
            {
                call_function: 'emoCheckUserData',
                login: login,
                user_id: user_id,
                auth_key: key
            },
            function (data) {
                if (data == 'success') {
                    if (login == '' || password.trim() == '') {
                        alert('Check if login or password are not empty!');
                        row_user_loader.hide();
                        row_user.show();
                        return;
                    }

                    if (login.length < 4) {
                        alert('Login cannot contain less than 4 symbols');
                        row_user_loader.hide();
                        row_user.show();
                        return;
                    }

                    if (password.length < 6) {
                        alert('Password cannot contain less than 6 symbols');
                        row_user_loader.hide();
                        row_user.show();
                        return;
                    }
                    saveUser(user_id, is_new_user, login, password);
                } else {
                    if (data == "error") {
                        alert("Some error occurred while checking user data");
                    }

                    row_user_loader.hide();
                    row_user.show();
                    alert(data);
                }
            }, 'json'
        ).error(function () {
            row_user_loader.hide();
            row_user.show();
            alert(
                'Some error occurred while checking user data. Try reinstall eMagicOne Store Manager Bridge Connector'
            );
        });
    }

    function saveUser(user_id, is_new_user, login, password) {
        let actions_codes = '';
        let actions_codes_container = $('#mobassistantconnector_actions_codes_user_' + user_id);
        let employee_id = '';
        let employee_container = $('#mobassistantconnector_employee_user_' + user_id);
        let status = $('#mobassistantconnector_td_status_user_' + user_id + ' div').attr('val');

        if (actions_codes_container.length > 0) {
            actions_codes = actions_codes_container.val();
        }

        if (employee_container.length > 0) {
            employee_id = employee_container.val();
        }

        if (login == '' || password.trim() == '') {
            alert('Check if login or password are not empty!');
            return;
        }

        if (login.length < 4) {
            alert('Login cannot contain less than 4 symbols');
            return;
        }

        if (password.trim().length < 6) {
            alert('Password cannot contain less than 6 symbols');
            return;
        }

        $.post(adminModuleUrl,
            {
                call_function: 'emoSaveUser',
                user_id: user_id,
                login: login,
                password: password,
                employee: employee_id,
                actions_codes: actions_codes,
                value: status,
                is_new_user: is_new_user,
                auth_key: key
            },
            function (data) {
                if (data == 'success') {
                    getUserByUsername(login, user_id, is_new_user);
                } else {
                    $('#mobassistantconnector_row_loader_user_' + user_id).hide();
                    $('#mobassistantconnector_row_user_' + user_id).show();
                    if (data == "error") {
                        alert("Some error occurred while saving user");
                    }

                    alert(data);
                }
            }, 'json'
        ).error(function (error) {
            $('#mobassistantconnector_row_loader_user_' + user_id).hide();
            $('#mobassistantconnector_row_user_' + user_id).show();
            alert("eMagicOne Store Manager Bridge Connector Error:\r\n" + error.responseText);
        });
    }

    function isNewUser(element) {
        return isNewUserByValue(element.attr('user_id'));
    }

    function isNewUserByValue(value) {
        let is_new_user = '1';

        if (String(value).indexOf('new_') == -1) {
            is_new_user = '0';
        }

        return is_new_user;
    }

    function generateUserRow(data) {
        let status;
        let checkbox = '';
        let actions_codes = '';
        let employee = '';
        let qr_code = '';
        let save_btn_new_user = '';
        let save_login_password = '';
        let login_prev = '';
        let password_prev = '';
        let devices = '';

        if (data.status == 1) {
            status = '<div class="mobassistantconnector_users_status" user_id="' + data.user_id + '" val="1">' +
                enabled + '</div>';
        } else {
            status = '<div class="mobassistantconnector_users_status" user_id="' + data.user_id + '" val="0">' +
                disabled + '</div>';
        }

        if (isNewUserByValue(data.user_id) == '0') {
            checkbox =
                '<input type="checkbox" class="mobassistantconnector_users" name="mobassistantconnector_users[]" ' +
                'value="' + data.user_id + '">';

            qr_code = '<div class="mobassistantconnector_td_users_qr_code">' +
                '<img alt="QR-code" class="mobassistantconnector_users_icon_qr_code" ' +
                'id="mobassistantconnector_img_qr_code_user_' + data.user_id + '" user_id="' +
                data.user_id + '" qr_code_data="' + data.qr_code_data +
                '" title="Get QR-code" class="mobassistantconnector_img_users_qr_code" src="' +
                baseUrl + 'modules/bridgeconnector/views/img/qrcode.png"><input type="hidden" ' +
                'id="mobassistantconnector_qr_code_link_user_' + data.user_id + '" value="' +
                getQrCodeLink(data.qr_code_hash) + '"></div>';

            save_login_password =
                '<input class="button btn btn-primary mobassistantconnector_users_save_login_password" ' +
                'id="mobassistantconnector_save_login_password_user_' + data.user_id + '" user_id="' + data.user_id +
                '" type="button" value="Save login/password">';

            login_prev = '<input id="mobassistantconnector_login_prev_user_' + data.user_id +
                '" type="hidden" value="' + data.username + '" size="40">';

            password_prev = '<input id="mobassistantconnector_password_prev_user_' + data.user_id +
                '" type="hidden" value="' + data.password + '" size="40">';

        } else {
            actions_codes = '<input id="mobassistantconnector_actions_codes_user_' + data.user_id +
                '" type="hidden" value="">';

            employee = '<input id="mobassistantconnector_employee_user_' + data.user_id +
                '" type="hidden" value="">';

            save_btn_new_user = '<input class="button btn btn-primary mobassistantconnector_users_save" ' +
                'id="mobassistantconnector_save_user_' + data.user_id + '" user_id="' + data.user_id +
                '" type="button" value="Save">';
        }

        return '<td>' + checkbox + '</td>' +
                '<td>' +
                    '<table class="mobassistantconnector_users_login_password_table">' +
                        '<tr>' +
                            '<td>' +
                                '<input class="mobassistantconnector_users_login" id="mobassistantconnector_login_user_' + data.user_id + '" user_id="' + data.user_id + '" type="text" value="' + data.username + '" size="40">' + login_prev +
                            '</td>' +
                            '<td>' +
                                '<input class="mobassistantconnector_users_password" id="mobassistantconnector_password_user_' + data.user_id + '" user_id="' + data.user_id + '" type="password" value="' + data.password + '" size="40">' + password_prev + '' +
                            '</td>' +
                        '</tr>' +
                        '<tr id="mobassistantconnector_tr_save_login_password_user_' + data.user_id + '" class="mobassistantconnector_tr_users_save_login_password">' +
                            '<td colspan="2">' + save_login_password + '</td>' +
                        '</tr>' +
                    '</table>' +
                '</td>' +
                '<td>' +
                    '<div class="mobassistantconnector_users_td_employees" title="Edit related employees" user_id="' + data.user_id + '">' +
                        '<div style="width: 100%"> ' +
                            '<button type="button" style="width: 100%" class="mobassistantconnector_users_td_employees_text btn btn-default pull-left" id="mobassistantconnector_users_td_employees_text_user_' + data.user_id + '" user_id="' + data.user_id + '">' +
                                '<table width="100%" class="mobassistantconnector_users_table_employees">' +
                                    '<tr>' +
                                        '<td class="mobassistantconnector_users_employees_text" id="mobassistantconnector_users_employees_text_user_' + data.user_id + '">' +
                                            '<div class="mobassistantconnector_div_user_employees_text" ' + 'id="mobassistantconnector_div_employees_text_user_' + data.user_id + '">' + data.employee + '</div>' +
                                        '</td>' +
                                        '<td style="width: 20px">' +
                                            '<img alt="Down" src="' + baseUrl + 'modules/bridgeconnector/views/img/down.png">' +
                                        '</td>' +
                                    '</tr>' +
                                '</table>' +
                            '</button>' +
                            '<div class="mobassistantconnector_users_div_edit_employees">' + employee + '</div>' +
                        '</div>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="mobassistantconnector_users_td_actions" title="Edit allowed actions" user_id="' + data.user_id + '">' +
                        '<div style="width: 100%"> ' +
                            '<div class="mobassistantconnector_actions_text_loader" id="mobassistantconnector_actions_text_loader_user_' + data.user_id + '">' + loader + '</div>' +
                            '<button type="button" class="mobassistantconnector_users_td_actions_text btn btn-default pull-right" id="mobassistantconnector_users_td_actions_text_user_' + data.user_id + '" user_id="' + data.user_id + '">' +
                                '<table width="100%" class="mobassistantconnector_users_table_actions">' +
                                    '<tr>' +
                                        '<td class="mobassistantconnector_users_actions_text" id="mobassistantconnector_users_actions_text_user_' + data.user_id + '">' +
                                            '<div class="mobassistantconnector_div_user_actions_text" ' + 'id="mobassistantconnector_div_actions_text_user_' + data.user_id + '">' + data.allowed_actions + '</div>' +
                                        '</td>' +
                                        '<td style="width: 20px">' +
                                            '<img alt="Down" src="' + baseUrl + 'modules/bridgeconnector/views/img/down.png">' +
                                        '</td>' +
                                    '</tr>' +
                                '</table>' +
                            '</button>' +
                            '<div class="mobassistantconnector_users_div_employee">' + employee + '</div>' +
                            '<div class="mobassistantconnector_users_div_edit_actions">' + actions_codes + '</div>' +
                        '</div>' +
                    '</div>' +
                '</td>' +
                '<td>' + qr_code + '</td>' +
                '<td id="mobassistantconnector_td_status_user_' + data.user_id + '" class="mobassistantconnector_center mobassistantconnector_td_users_status">' + status + '</td>' +
                '<td class="mobassistantconnector_center">' + devices + '</td>' +
                '<td>' +
                    '<div class="mobassistantconnector_users_delete" user_id="' + data.user_id + '" title="Delete user">' +
                        '<img alt="Delete" src="' + baseUrl + 'modules/bridgeconnector/views/img/trash.png">' +
                    '</div>' +
                '</td>' +
            '<td class="mobassistantconnector_users_save_td">' + save_btn_new_user + '</td>';
    }

    function getUserQrCodeDialogBody() {
        return '<div class="mobassistantconnector_users_qr_code_container" id="mobassistantconnector_qr_code_user">' +
            '<div class="mobassistantconnector_users_qr_code_link_loader"><div>' +
            '<div id="mobassistantconnector_qr_code_scan_user">' +
            '</div></div><div id="mobassistantconnector_qr_code_link_user"></div>' +
            '<div id="mobassistantconnector_qr_code_loader_user">' +
            '<div class="mobassistantconnector_users_qr_code_loader_inner_div"><img alt="Loader" src="' + baseUrl +
            'modules/bridgeconnector/views/img/loader.gif"></div></div></div><div></div>';
    }

    function getUserPermissionsDialogBody() {
        return '<div style="position: relative">' +
            '<div id="mobassistantconnector_users_actions_container">' +
                '<div id="mobassistantconnector_loader_actions">' +
                    '<div class="mobassistantconnector_loader">' +
                        '<img alt="Loader" src="' + baseUrl + 'modules/bridgeconnector/views/img/loader.gif">' +
                    '</div>' +
                '</div>' +
                '<div id="mobassistantconnector_user_actions_container"></div>' +
            '</div>';
    }

    function getUserEmployeesDialogBody() {
        return '<div style="position: relative">' +
            '<div id="mobassistantconnector_users_employees_container">' +
                '<div id="mobassistantconnector_loader_employees" style="display: none">' +
                    '<div class="mobassistantconnector_loader">' +
                        '<img alt="Loader" ' + 'src="' + baseUrl + 'modules/bridgeconnector/views/img/loader.gif">' +
                    '</div>' +
                '</div>' +
                '<div id="mobassistantconnector_user_employees_container"></div>' +
            '</div>';
    }

    function generateUserRowLoader(user_id) {
        return '<tr id="mobassistantconnector_row_loader_user_' + user_id + '" style="display: none">' +
                '<td id="mobassistantconnector_td_loader_user_' + user_id + '" colspan="8">' +
                    '<div id="mobassistantconnector_tr_loader_user_' + user_id + '" class="mobassistantconnector_tr_loader_user" style="display: block;">' +
                        '<img alt="Loader" src="' + baseUrl + 'modules/bridgeconnector/views/img/loader.gif">' +
                    '</div>' +
                '</td>' +
            '</tr>';
    }

    function getUserByUsername(login, user_id, is_new_user) {
        let user_row = $('#mobassistantconnector_row_user_' + user_id);
        let user_row_loader = $('#mobassistantconnector_row_loader_user_' + user_id);

        $.post(adminModuleUrl,
            {
                call_function: 'emoGetUserByUsername',
                login: login,
                auth_key: key
            },
            function (data) {
                if (data.hasOwnProperty('user_id')) {
                    if (is_new_user == '1') {
                        user_row.remove();
                        user_row_loader.remove();
                        $('#mobassistantconnector_users_table > tbody:last-child').append(
                            '<tr id="mobassistantconnector_row_user_' + data.user_id + '">' + generateUserRow(data) +
                            '</tr>' + generateUserRowLoader(data.user_id)
                        );
                        preparePermissionsToView(is_new_user, data.user_id);
                    } else {
                        user_row.html(generateUserRow(data));
                        user_row_loader.hide();
                        user_row.show();
                    }

                    $('.mobassistantconnector_users_no_data').remove();
                } else {
                    user_row_loader.hide();
                    user_row.show();
                    alert("Could not get user by username");
                }
            }, 'json'
        ).error(function () {
            user_row_loader.hide();
            user_row.show();
            alert(
                'Some error occurred while getting user by username. ' +
                'Try reinstall eMagicOne Store Manager Bridge Connector'
            );
        });
    }

    function regenerateQrCode(user_id) {
        let qr_code_loader = $('#mobassistantconnector_qr_code_loader_user');
        let qr_code_link = $('#mobassistantconnector_qr_code_link_user');

        qr_code_link.hide();
        qr_code_loader.show();

        $.post(adminModuleUrl,
            {
                call_function: 'emoRegenerateQrCodeHash',
                user_id: user_id,
                auth_key: key
            },
            function (data) {
                if (data.hasOwnProperty('hash')) {
                    let qr_code_lnk = getQrCodeLink(data.hash);

                    qr_code_link.html('<a href="' + qr_code_lnk + '" target="_blank">' + qr_code_lnk + '</a>');
                    $("#mobassistantconnector_qr_code_link_user_" + user_id).val(qr_code_lnk);
                    qr_code_loader.hide();
                    qr_code_link.show();
                } else {
                    qr_code_loader.hide();
                    qr_code_link.show();
                    alert("Could not regenerate QR-code");
                }
            }, 'json'
        ).error(function (error) {
            qr_code_loader.hide();
            qr_code_link.show();
            alert("eMagicOne Store Manager Bridge Connector Error:\r\n" + error.responseText);
        });
    }

    function getQrCodeLink(hash) {
        return baseUrl +
            'index.php?fc=module&module=bridgeconnector&controller=mobassistantconnector&call_function=get_qr_code&' +
            'data=%7B%22hash%22%3A%22' + hash + '%22%7D';
    }

    function processSaveButtonVisibility(user_id) {
        if ($('#mobassistantconnector_login_user_' + user_id).val() != $('#mobassistantconnector_login_prev_user_' + user_id).val()
            || $('#mobassistantconnector_password_user_' + user_id).val() != $('#mobassistantconnector_password_prev_user_' + user_id).val()) {
            $('#mobassistantconnector_tr_save_login_password_user_' + user_id).show();
        } else {
            $('#mobassistantconnector_tr_save_login_password_user_' + user_id).hide();
        }
    }

    function processSelectedAction(element) {
        let value_selected = element.val();
        let action_orders_view = 'orders_view';
        let action_order_details_pdf = 'order_details_pdf';
        let action_update_order_status = 'update_order_status';
        let action_update_order_tracking_number = 'update_order_tracking_number';

        if (element.is(':checked')) {
            if (
                value_selected == action_order_details_pdf
                || value_selected == action_update_order_status
                || value_selected == action_update_order_tracking_number
            ) {
                $('#mobassistantconnector_user_action_' + action_orders_view).prop('checked', true);
            }
        } else if (value_selected == action_orders_view) {
            $('#mobassistantconnector_user_action_' + action_order_details_pdf).prop('checked', false);
            $('#mobassistantconnector_user_action_' + action_update_order_status).prop('checked', false);
            $('#mobassistantconnector_user_action_' + action_update_order_tracking_number).prop('checked', false);
        }
    }

    function showUserPermissionsDialog(user_id) {
        let dialog_obj = $('#mobassistantconnector_users_permissions_dialog');

        $(function () {
            dialog_obj.dialog({
                resizable: false,
                modal: true,
                autoOpen: false,
                buttons: {
                    "Save": function () {
                        if (isNewUserByValue(user_id) == '0') {
                            saveUserActions(user_id);
                        } else {
                            showSelectedActionsForNewUser(user_id);
                        }
                    },
                    Cancel: function () {
                        $(this).dialog('close');
                    }
                }
            });

            dialog_obj.dialog('open');
        });
    }

    function showUserEmploeesDialog(user_id) {
        let dialog_obj = $('#mobassistantconnector_users_employees_dialog');

        dialog_obj.dialog({
            resizable: false,
            modal: true,
            autoOpen: false,
            buttons: {
                "Save": function () {
                    if (isNewUserByValue(user_id) == '0') {
                        saveUserEmployees(user_id);
                    } else {
                        let employee_id = $('.mobassistantconnector_user_employees:checked').val();
                        let employee_name = $('.mobassistantconnector_user_employees:checked').parent().text();
                        $('#mobassistantconnector_employee_user_' + user_id).val(employee_id);
                        $('#mobassistantconnector_div_employees_text_user_' + user_id).text(employee_name);
                        $('#mobassistantconnector_users_employees_dialog').dialog('close');
                    }
                },
                Cancel: function () {
                    $(this).dialog('close');
                }
            }
        });

        dialog_obj.dialog('open');
        // $(function () {
        // });
    }

    function showUserQrCodeDialog(user_id) {
        let dialog_obj = $('#mobassistantconnector_users_qr_code_dialog');

        $(function () {
            dialog_obj.dialog({
                resizable: false,
                modal: true,
                autoOpen: false,
                width: 320,
                buttons: {
                    "Regenerate QR-code link": function () {
                        regenerateQrCode(user_id);
                    },
                    Cancel: function () {
                        $(this).dialog('close');
                    }
                }
            });

            dialog_obj.dialog('open');
        });
    }

    function setDialogPosition(dialog_obj) {
        dialog_obj.dialog("option", "position", dialog_obj.dialog("option", "position"));
    }
});
<?php
/**
 *    This file is part of eMagicOne Store Manager Bridge Connector.
 *
 *   eMagicOne Store Manager Bridge Connector is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   eMagicOne Store Manager Bridge Connector is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with eMagicOne Store Manager Bridge Connector.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @author    eMagicOne <contact@emagicone.com>
 * @copyright 2014-2019 eMagicOne
 * @license   http://www.gnu.org/licenses   GNU General Public License
 */

class EM1Errors
{
    const ERROR = array(
            'authentification'                  => 'BridgeConnector (v.111): Authentication Error',
            'create_tmp_file'                   => "BridgeConnector (v.111): Can't Create Temporary File",
            'open_tmp_file'                     => "BridgeConnector (v.111): Can't Open Temporary File",
            'not_writeable_dir'                 => 'BridgeConnector (v.111): Temporary Directory specified in' .
                'BridgeConnector settings doesn\'t exist or is not writable',
            'temporary_file_exist_not'          => 'BridgeConnector (v.111): Temporary File doesn\'t exist',
            'temporary_file_readable_not'       => 'BridgeConnector (v.111): Temporary File isn\'t readable',
            'file_uid_mismatch'                 => 'BridgeConnector (v.111): SAFE MODE Restriction in effect.' .
                'The script uid is not allowed to access tmp folder owned by other uid. If you don\'t understand ' .
                'this error, please contact your hosting provider for help',
            'open_basedir'                      => 'BridgeConnector (v.111): Please create local Temporary' .
                ' Directory, see 111temporary_dir variable in bridge.php',
            'checksum_dif'                      => 'Checksums are different',
            'ip_check'                          => 'BridgeConnector (v.111): Add your IP to allowed list to run' .
                ' bridge, please',
            'module_disabled'                   => 'Module is disabled',
            'filename_param_missing'            => 'Request parameter "filename" is missing',
            'position_param_missing'            => 'Request parameter "position" is missing',
            'sql_param_missing'                 => 'Request parameter "sql" is missing',
            'category_param_missing'            => 'Request parameter "category" is missing',
            'searchpath_param_missing'          => 'Request parameter "search_path" is missing',
            'varsmaindir_param_missing'         => 'Request parameter "vars_main_dir" is missing',
            'varsnames_param_missing'           => 'Request parameter "vars_names" is missing',
            'xmlpath_param_missing'             => 'Request parameter "xml_path" is missing',
            'xmlfields_param_missing'           => 'Request parameter "xml_fields" is missing',
            'xmlitemsnode_param_missing'        => 'Request parameter "xml_items_node" is missing',
            'xmlitemsinfonode_param_missing'    => 'Request parameter "xml_items_info_node" is missing',
            'tablename_param_missing'           => 'Request parameter "table_name" is missing',
            'orderid_param_missing'             => 'Request parameter "order_id" is missing',
            'entitytype_param_missing'          => 'Request parameter "entity_type" is missing',
            'imageid_param_missing'             => 'Request parameter "image_id" is missing',
            'toimageid_param_missing'           => 'Request parameter "to_image_id" is missing',
            'path_param_missing'                => 'Request parameter "path" is missing',
            'searchpath_param_empty'            => 'Request parameter "search_path" is empty',
            'varsmaindir_param_empty'           => 'Request parameter "vars_main_dir" is empty',
            'varsnames_param_empty'             => 'Request parameter "vars_names" is empty',
            'xmlpath_param_empty'               => 'Request parameter "xml_path" is empty',
            'xmlfields_param_empty'             => 'Request parameter "xml_fields" is empty',
            'xmlitemsnode_param_empty'          => 'Request parameter "xml_items_node" is empty',
            'xmlitemsinfonode_param_empty'      => 'Request parameter "xml_items_info_node" is empty',
            'tablename_param_empty'             => 'Request parameter "table_name" is empty',
            'entitytype_param_empty'            => 'Request parameter "entity_type" is empty',
            'imageurl_param_empty'              => 'Request parameter "image_url" is empty',
            'key_param_empty'                   => 'Request parameter "key" is empty',
            'hash_param_empty'                  => 'Request parameter "hash" is empty',
            'filename_param_empty'              => 'Request parameter "filename" is empty',
            'path_param_empty'                  => 'Request parameter "path" is empty',
            'category_param_empty'              => 'Request parameter "category" is empty',
            'orderid_param_incorrect'           => 'Request parameter "order_id" is incorrect',
            'imageid_param_incorrect'           => 'Request parameter "image_id" is incorrect',
            'toimageid_param_incorrect'         => 'Request parameter "to_image_id" is incorrect',
            'upload_file_error'                 => 'Some error occurs uploading file into temporary server folder',
            'delete_file_error'                 => 'No such file',
            'zip_archive_not_supported'         => 'ZipArchive is supported in php version >= 5.2.0',
            'zip_not_loaded'                    => 'Zip extension not loaded',
            'cannot_archive_files'              => 'Cannot archive files'
    );
}

/**
 * File used for compatibility purpose
 * @type {*|jQuery}
 */
let path_array = baseAdminDir.split('/');
path_array.splice((path_array.length - 2), 2);
let final_path = path_array.join('/');
window.tinyMCEPreInit = {};
window.tinyMCEPreInit.base = final_path+'/js/tiny_mce';
window.tinyMCEPreInit.suffix = '.min';
$.getScript(final_path+'/js/tiny_mce/tinymce.min.js');

<?php

return array(

    'Select' => 'Chọn',
    'Deselect_All' => 'Bỏ chọn tất cả',
    'Select_All' => 'Chọn tất cả',
	'Erase' => 'Xóa',
	'Open' => 'Mở',
	'Confirm_del' => 'Bạn có chắc chắn muốn xóa file này không?',
	'All' => 'Tất cả',
	'Files' => 'File',
	'Images' => 'Hình ảnh',
	'Archives' => 'Lưu trữ',
	'Error_Upload' => 'File được upload vượt quá dung lượng cho phép.',
	'Error_extension' => 'Định dạng file không được chấp nhận.',
	'Upload_file' => 'Upload',
	'Filters' => 'Lọc',
	'Videos' => 'Video',
	'Music' => 'Music',
	'New_Folder' => 'Tạo thư mục',
	'Folder_Created' => 'Thư mục đã được tạo',
	'Existing_Folder' => 'Thư mục đã tồn tại',
	'Confirm_Folder_del' => 'Bạn có chắc chắn muốn xóa Thư mục này cùng với mọi thứ bên trong?',
	'Return_Files_List' => 'Quay lại danh sách file',
	'Preview' => 'Xem trước',
	'Download' => 'Tải xuống',
	'Insert_Folder_Name' => 'Nhập tên thư mục:',
	'Root' => 'root',
	'Rename' => 'Đổi tên',
	'Back' => 'quay lại',
	'View' => 'Xem',
	'View_list' => 'Xem dạng danh sách',
	'View_columns_list' => 'Xem dạng cột',
	'View_boxes' => 'Xem dạng lưới',
	'Toolbar' => 'Thanh công cụ',
	'Actions' => 'Actions',
	'Rename_existing_file' => 'File này đã tồn tại',
	'Rename_existing_folder' => 'Thư mục này đã tồn tại',
	'Empty_name' => 'Tên để trống',
	'Text_filter' => 'Lọc theo tên',
	'Swipe_help' => 'Vuốt vào tên file hoặc thư mục để xem tác vụ khác',
	'Upload_base' => 'Upload thông thường',
    'Upload_base_help' => "Kéo và Thả file hoặc click vào khu vực phía trên (modern browsers) và chọn file. Sau khi upload thành công, click vào nút 'Quay lại danh sách file'.",
    'Upload_add_files' => 'Tải file lên',
    'Upload_start' => 'Bắt đầu upload',
    'Upload_error_messages' =>array(
        1 => 'Dung lượng file vượt quá giới hạn (upload_max_filesize trong php.ini)',
        2 => 'Dung lượng file vượt quá giới hạn (MAX_FILE_SIZE trong HTML form)',
        3 => 'The uploaded file was only partially uploaded',
        4 => 'Chưa upload được file nào',
        6 => 'Lỗi thư mục tạm (tmp) khi upload file',
        7 => 'Không lưu được file vào ổ đĩa',
        8 => 'A PHP extension stopped the file upload',
        'post_max_size' => 'Dung lượng file vượt quá post_max_size trong php.ini',
        'max_file_size' => 'File size quá lớn',
        'min_file_size' => 'File size quá bé',
        'accept_file_types' => 'Loại file không được cho phép',
        'max_number_of_files' => 'Vượt quá số file được upload cùng lúc',
        'max_width' => 'Chiều ngang ảnh vượt quá cho phép',
        'min_width' => 'Chiều ngang ảnh quá bé',
        'max_height' => 'Chiều cao ảnh quá mức cho phép',
        'min_height' => 'Chiều cao ảnh quá bé',
        'abort' => 'Upload file bị gián đoạn',
        'image_resize' => 'Lỗi khi resize ảnh'
    ),
    'Upload_url' => 'Từ url',
    'Type_dir' => 'thư mục',
	'Type' => 'Loại File',
	'Dimension' => 'Kích thước',
	'Size' => 'Size',
	'Date' => 'Ngày tạo',
	'Filename' => 'Tên File',
	'Operations' => 'Tùy chọn',
	'Date_type' => 'y-m-d',
	'OK' => 'OK',
	'Cancel' => 'Hủy',
	'Sorting' => 'đang sắp xếp',
	'Show_url' => 'Xem URL',
	'Extract' => 'Giải nén tại đây',
	'File_info' => 'Thông tin file',
	'Edit_image' => 'Sửa image',
	'Duplicate' => 'Nhân bản',
	'Folders' => 'Thư mục',
	'Copy' => 'Copy',
	'Cut' => 'Cut',
	'Paste' => 'Paste',
	'CB' => 'CB', // clipboard
	'Paste_Here' => 'Paste vào thư mục này',
	'Paste_Confirm' => 'Bạn có chắc chắn muốn Paste vào thư mục này? Việc này sẽ ghe đè lên cáo file/folder cũ nếu có.',
	'Paste_Failed' => 'Lỗi khi paste file',
	'Clear_Clipboard' => 'Xóa clipboard',
	'Clear_Clipboard_Confirm' => 'Bạn có chắc chắn muốn xóa clipboard?',
	'Files_ON_Clipboard' => 'Danh sách file trong clipboard.',
	'Copy_Cut_Size_Limit' => 'File/folder được chọn quá lớn để %s. Giới hạn: %d MB/thao tác', // %s = cut or copy
	'Copy_Cut_Count_Limit' => 'Bạn đã chọn quá nhiều file/folder để %s. Giới hạn: %d files/thao tác', // %s = cut or copy
	'Copy_Cut_Not_Allowed' => 'Bạn không được phép để %s file.', // %s(1) = cut or copy, %s(2) = files or folders
    'Image_Editor_No_Save' => 'Could not save image',
    'Image_Editor_Exit' => "Exit",
    'Image_Editor_Save' => "Save",
	'Zip_No_Extract' => 'Không thể giải nén. File có thể bị lỗi.',
	'Zip_Invalid' => 'Định dạng này không được hỗ trợ. Chấp nhận: zip, gz, tar.',
	'Dir_No_Write' => 'Thư mục bạn chọn không cho phép ghi dữ liệu vào.',
	'Function_Disabled' => 'Chức năng %s đã bị Tắt bơi server.', // %s = cut or copy
	'File_Permission' => 'File permission',
	'File_Permission_Not_Allowed' => 'Đổi permissions của %s không được chấp nhận.', // %s = files or folders
	'File_Permission_Recursive' => 'Apply recursively?',
	'File_Permission_Wrong_Mode' => "Các permission bạn chọn không chính xác.",
	'User' => 'User',
	'Group' => 'Group',
	'Yes' => 'Yes',
	'No' => 'No',
	'Lang_Not_Found' => 'Không tìm thấy ngôn ngữ.',
	'Lang_Change' => 'Đổi ngôn ngữ',
	'File_Not_Found' => 'Không tìm thấy file.',
	'File_Open_Edit_Not_Allowed' => 'Bạn không được phép để %s file này.', // %s = open or edit
	'Edit' => 'Sửa',
	'Edit_File' => "Sửa nội dung file",
	'File_Save_OK' => "File được lưu thành công.",
	'File_Save_Error' => "Đã có lỗi khi lưu file.",
	'New_File' => 'Tạo File mới',
	'No_Extension' => 'You have to add a file extension.',
	'Valid_Extensions' => 'Extension được chấp nhận: %s', // %s = txt,log etc.

	'SERVER ERROR' => "LỖI MÁY CHỦ",
	'forbiden' => "Bị từ chối",
	'wrong path' => "Sai đường dẫn",
	'wrong name' => "Sai tên",
	'wrong extension' => "Sai định dạng",
	'wrong option' => "Sai tùy chọn",
	'wrong data' => "Sai dữ liệu",
	'wrong action' => "Wrong action",
	'wrong sub-action' => "Wrong sub-actio",
	'no action passed' => "No action passed",
	'no path' => "Không có đường dẫn",
	'no file' => "Không có file",
	'view type number missing' => "View type number missing",
	'Not enought Memory' => "Không đủ bộ nhớ",
	'max_size_reached' => "Thư mục chứa ảnh của bạn đã đến giới hạn dung lượng là %d MB.", //%d = max overall size
	'B' => "B",
	'KB' => "KB",
	'MB' => "MB",
	'GB' => "GB",
	'TB' => "TB",
    'total size' => "Tổng dung lượng",
);

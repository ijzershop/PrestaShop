SET SESSION sql_mode = '';
SET NAMES 'utf8';

ALTER TABLE `PREFIX_order_detail` DROP KEY product_id, ADD KEY product_id (product_id, product_attribute_id);

INSERT IGNORE INTO `PREFIX_hook` (`id_hook`, `name`, `title`, `description`, `position`) VALUES
  (NULL, 'actionAdministrationPageForm', 'Manage Administration Page form fields', 'This hook adds, update or remove fields of the Administration Page form', '1'),
  (NULL, 'actionAdministrationPageFormSave', 'Processing Administration page form', 'This hook is called when the Administration Page form is processed', '1'),
  (NULL, 'actionPerformancePageForm', 'Manage Performance Page form fields', 'This hook adds, update or remove fields of the Performance Page form', '1'),
  (NULL, 'actionPerformancePageFormSave', 'Processing Performance page form', 'This hook is called when the Performance Page form is processed', '1'),
  (NULL, 'actionMaintenancePageForm', 'Manage Maintenance Page form fields', 'This hook adds, update or remove fields of the Maintenance Page form', '1'),
  (NULL, 'actionMaintenancePageFormSave', 'Processing Maintenance page form', 'This hook is called when the Maintenance Page form is processed', '1'),
  (NULL, 'displayAdminEndContent', 'Administration end of content', 'This hook is displayed at the end of the main content, before the footer', '1');

/* PHP:ps_1740_update_module_tabs(); */;

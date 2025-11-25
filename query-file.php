$query = 'SELECT CONCAT(`' . _DB_PREFIX_ . 'cart_rule_lang`.`name`) as name,
         CONCAT(`' . _DB_PREFIX_ . 'cart_rule`.`code`) as code,
          COALESCE(SUM(`' . _DB_PREFIX_ . 'orders`.`total_paid`), 0.00) as total_sales,
          COUNT(DISTINCT CASE WHEN `' . _DB_PREFIX_ . 'orders`.`id_order` IS NOT NULL THEN `' . _DB_PREFIX_ . 'orders`.`id_order` END) as total_orders FROM `' . _DB_PREFIX_ . 'cart_rule`
          LEFT JOIN `' . _DB_PREFIX_ . 'cart_rule_lang` ON `' . _DB_PREFIX_ . 'cart_rule_lang`.`id_cart_rule` = `' . _DB_PREFIX_ . 'cart_rule`.`id_cart_rule`
          LEFT JOIN `' . _DB_PREFIX_ . 'order_cart_rule` ON `' . _DB_PREFIX_ . 'order_cart_rule`.`id_cart_rule` = `' . _DB_PREFIX_ . 'cart_rule`.`id_cart_rule`
          LEFT JOIN `' . _DB_PREFIX_ . 'orders` ON `' . _DB_PREFIX_ . 'order_cart_rule`.`id_order` = `' . _DB_PREFIX_ . 'orders`.`id_order`
          AND `' . _DB_PREFIX_ . 'orders`.`date_add` > "' . date('Y-m-d', strtotime('first day of april this year')) . '"
          AND `' . _DB_PREFIX_ . 'orders`.`current_state` IN (2,3,4,5)
           GROUP BY `' . _DB_PREFIX_ . 'cart_rule`.`id_cart_rule`, `' . _DB_PREFIX_ . 'cart_rule`.`code` ORDER BY total_sales DESC';

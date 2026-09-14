SELECT COUNT(*) as index_exists
FROM information_schema.statistics
WHERE table_name = 'ps_dynamicproduct_custom_orders'
  AND index_name = 'id_orders';

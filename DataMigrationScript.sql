/* =========================================================
   Copy ps176_product* data from ijzershop81 -> deModerneSmid_webshop
   Source: ijzershop81 (READ ONLY)
   Target: deModerneSmid_webshop
   Dialect: MariaDB
   ========================================================= */

SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET @OLD_UNIQUE_CHECKS      = @@UNIQUE_CHECKS;

SET FOREIGN_KEY_CHECKS = 0;
SET UNIQUE_CHECKS = 0;

/* ---------- 1) msmid_product (base product) ---------- */
/* Handles schema differences:
   - source has id_color_default (not present in target) -> ignored
   - target has second_name (not in source) -> set NULL
   - target has oi_offer_memo INT but source has text -> set NULL to avoid type errors
   - source min_cut_remainder is INT but target is DECIMAL -> cast
   - source seo_keywords is VARCHAR(500) but target VARCHAR(255) -> truncate
   - jsonld: source MEDIUMTEXT -> target TEXT (fine, may truncate if huge)
*/
INSERT INTO deModerneSmid_webshop.msmid_product (
  id_product,
  id_supplier,
  id_manufacturer,
  id_category_default,
  id_shop_default,
  id_tax_rules_group,
  on_sale,
  online_only,
  ean13,
  isbn,
  upc,
  mpn,
  ecotax,
  quantity,
  minimal_quantity,
  low_stock_threshold,
  low_stock_alert,
  price,
  wholesale_price,
  unity,
  unit_price,
  unit_price_ratio,
  additional_shipping_cost,
  reference,
  supplier_reference,
  location,
  width,
  height,
  depth,
  weight,
  out_of_stock,
  additional_delivery_times,
  quantity_discount,
  customizable,
  uploadable_files,
  text_fields,
  active,
  redirect_type,
  id_type_redirected,
  available_for_order,
  available_date,
  show_condition,
  `condition`,
  show_price,
  indexed,
  visibility,
  cache_is_pack,
  cache_has_attachments,
  is_virtual,
  cache_default_attribute,
  date_add,
  date_upd,
  advanced_stock_management,
  pack_stock_type,
  state,
  product_type,
  alternate_name,
  id_oi_offer,
  oi_offer_memo,
  oi_offer_extra_shipping,
  saw_loss,
  min_saw_size,
  min_cut_size,
  min_cut_remainder,
  seo_keywords,
  jsonld,
  second_name,
  default_cut_price
)
SELECT
  p.id_product,
  p.id_supplier,
  p.id_manufacturer,
  p.id_category_default,
  p.id_shop_default,
  p.id_tax_rules_group,
  p.on_sale,
  p.online_only,
  p.ean13,
  p.isbn,
  p.upc,
  p.mpn,
  p.ecotax,
  p.quantity,
  p.minimal_quantity,
  p.low_stock_threshold,
  p.low_stock_alert,
  p.price,
  p.wholesale_price,
  p.unity,
  p.unit_price,              -- exists in source
  p.unit_price_ratio,
  p.additional_shipping_cost,
  p.reference,
  p.supplier_reference,
  p.location,
  p.width,
  p.height,
  p.depth,
  p.weight,
  p.out_of_stock,
  p.additional_delivery_times,
  p.quantity_discount,
  p.customizable,
  p.uploadable_files,
  p.text_fields,
  p.active,
  p.redirect_type,
  p.id_type_redirected,
  p.available_for_order,
  p.available_date,
  p.show_condition,
  p.`condition`,
  p.show_price,
  p.indexed,
  p.visibility,
  p.cache_is_pack,
  p.cache_has_attachments,
  p.is_virtual,
  p.cache_default_attribute,
  p.date_add,
  p.date_upd,
  p.advanced_stock_management,
  p.pack_stock_type,
  p.state,
  p.product_type,
  p.alternate_name,
  p.id_oi_offer,
  NULL AS oi_offer_memo,     -- avoid TEXT->INT mismatch
  p.oi_offer_extra_shipping,
  p.saw_loss,
  p.min_saw_size,
  p.min_cut_size,
  CAST(p.min_cut_remainder AS DECIMAL(20,6)) AS min_cut_remainder,
  LEFT(p.seo_keywords, 255) AS seo_keywords,
  p.jsonld,
  NULL AS second_name,       -- not present in source
  CAST(p.default_cut_price AS DECIMAL(20,6)) AS default_cut_price
FROM ijzershop81.ps176_product p;


/* ---------- 2) msmid_product_lang ---------- */
/* target does NOT have meta_keywords -> ignored */
INSERT INTO deModerneSmid_webshop.msmid_product_lang (
  id_product,
  id_shop,
  id_lang,
  description,
  description_short,
  link_rewrite,
  meta_description,
  meta_title,
  name,
  available_now,
  available_later,
  delivery_in_stock,
  delivery_out_stock
)
SELECT
  pl.id_product,
  pl.id_shop,
  pl.id_lang,
  pl.description,
  pl.description_short,
  pl.link_rewrite,
  pl.meta_description,
  pl.meta_title,
  pl.name,
  pl.available_now,
  pl.available_later,
  pl.delivery_in_stock,
  pl.delivery_out_stock
FROM ijzershop81.ps176_product_lang pl;


/* ---------- 3) msmid_product_attribute ---------- */
/* target does not have location/quantity columns -> ignored
   ean13 differs length (13 vs 20) -> fine */
INSERT INTO deModerneSmid_webshop.msmid_product_attribute (
  id_product_attribute,
  id_product,
  reference,
  supplier_reference,
  ean13,
  isbn,
  upc,
  mpn,
  wholesale_price,
  price,
  ecotax,
  weight,
  unit_price_impact,
  default_on,
  minimal_quantity,
  low_stock_threshold,
  low_stock_alert,
  available_date
)
SELECT
  pa.id_product_attribute,
  pa.id_product,
  pa.reference,
  pa.supplier_reference,
  pa.ean13,
  pa.isbn,
  pa.upc,
  pa.mpn,
  pa.wholesale_price,
  pa.price,
  pa.ecotax,
  pa.weight,
  pa.unit_price_impact,
  pa.default_on,
  pa.minimal_quantity,
  pa.low_stock_threshold,
  pa.low_stock_alert,
  pa.available_date
FROM ijzershop81.ps176_product_attribute pa;


/* ---------- 4) msmid_product_attribute_lang ---------- */
INSERT INTO deModerneSmid_webshop.msmid_product_attribute_lang (
  id_product_attribute,
  id_lang,
  available_now,
  available_later
)
SELECT
  pal.id_product_attribute,
  pal.id_lang,
  pal.available_now,
  pal.available_later
FROM ijzershop81.ps176_product_attribute_lang pal;


/* ---------- 5) msmid_product_attribute_shop ---------- */
INSERT INTO deModerneSmid_webshop.msmid_product_attribute_shop (
  id_product,
  id_product_attribute,
  id_shop,
  wholesale_price,
  price,
  ecotax,
  weight,
  unit_price_impact,
  default_on,
  minimal_quantity,
  low_stock_threshold,
  low_stock_alert,
  available_date
)
SELECT
  pas.id_product,
  pas.id_product_attribute,
  pas.id_shop,
  pas.wholesale_price,
  pas.price,
  pas.ecotax,
  pas.weight,
  pas.unit_price_impact,
  pas.default_on,
  pas.minimal_quantity,
  pas.low_stock_threshold,
  pas.low_stock_alert,
  pas.available_date
FROM ijzershop81.ps176_product_attribute_shop pas;


/* ---------- 6) msmid_product_attribute_combination ---------- */
INSERT INTO deModerneSmid_webshop.msmid_product_attribute_combination (
  id_attribute,
  id_product_attribute
)
SELECT
  pac.id_attribute,
  pac.id_product_attribute
FROM ijzershop81.ps176_product_attribute_combination pac;


/* ---------- 7) msmid_product_attribute_image ---------- */
INSERT INTO deModerneSmid_webshop.msmid_product_attribute_image (
  id_product_attribute,
  id_image
)
SELECT
  pai.id_product_attribute,
  pai.id_image
FROM ijzershop81.ps176_product_attribute_image pai;


SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS      = @OLD_UNIQUE_CHECKS;

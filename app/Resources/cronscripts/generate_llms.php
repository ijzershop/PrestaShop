<?php
/**
 * Script to generate llms.txt for PrestaShop
 */

require_once __DIR__ . '/config/config.inc.php';

function cleanText($text) {
    if (empty($text)) {
        return '';
    }
    // Decode HTML entities
    $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    // Remove HTML tags
    $text = strip_tags($text);
    // Replace multiple newlines/whitespace with a single space
    $text = preg_replace('/\s+/', ' ', $text);
    return trim($text);
}

function generateLlmsTxt() {
    $id_lang = (int)Configuration::get('PS_LANG_DEFAULT');
    $shop_name = Configuration::get('PS_SHOP_NAME');
    $shop_url = Context::getContext()->link->getBaseLink();

    $output = "# $shop_name - LLM structured data\n\n";
    $output .= "> Information about $shop_name products, categories, and materials for AI crawlers.\n\n";

    $output .= "## Shop Information\n\n";
    $output .= "- Name: $shop_name\n";
    $output .= "- URL: $shop_url\n";

    // Categories
    $output .= "\n## Categories\n\n";
    $categories = Category::getSimpleCategories($id_lang);
    foreach ($categories as $category) {
        if ($category['id_category'] == Configuration::get('PS_HOME_CATEGORY') || $category['id_category'] == Configuration::get('PS_ROOT_CATEGORY')) {
            continue;
        }
        $cat_obj = new Category($category['id_category'], $id_lang);
        $link = Context::getContext()->link->getCategoryLink($cat_obj);
        $output .= "- [" . $category['name'] . "]($link)";
        $desc = cleanText($cat_obj->description);
        if (!empty($desc)) {
            // Keep more description for categories
            if (strlen($desc) > 500) {
                $desc = substr($desc, 0, 497) . '...';
            }
            $output .= ": " . $desc;
        }
        $output .= "\n";
    }

    // Products - Increase limit to include ALL products
    $output .= "\n## Products\n\n";
    $batch_size = 100;
    $start = 0;
    while (true) {
        $products = Product::getProducts($id_lang, $start, $batch_size, 'id_product', 'ASC', false, true);
        if (empty($products)) {
            break;
        }
        foreach ($products as $product) {
            $prod_obj = new Product($product['id_product'], false, $id_lang);
            $link = Context::getContext()->link->getProductLink($prod_obj);
            $output .= "- [" . $product['name'] . "]($link)";

            $details = [];

            $desc_short = cleanText($product['description_short']);
            if (!empty($desc_short)) {
                $details[] = $desc_short;
            }

            $desc = cleanText($product['description']);
            if (!empty($desc)) {
                if (strlen($desc) > 500) {
                    $desc = substr($desc, 0, 497) . '...';
                }
                $details[] = $desc;
            }

            // Add Features (often contains material info)
            $features = $prod_obj->getFrontFeatures($id_lang);
            if (!empty($features)) {
                $feature_info = [];
                foreach ($features as $feature) {
                    $feature_info[] = $feature['name'] . ": " . $feature['value'];
                }
                $details[] = "Features: " . implode(', ', $feature_info);
            }

            if (!empty($details)) {
                $output .= ": " . implode(' | ', $details);
            }
            $output .= "\n";
        }
        $start += $batch_size;
        // Safety break for extremely large shops if needed, but let's try to get all
        if ($start > 10000) break;
    }

    // CMS Pages
    $output .= "\n## Information & Materials\n\n";
    $cms_pages = CMS::getCMSPages($id_lang, null, true);
    foreach ($cms_pages as $page) {
        $cms_obj = new CMS($page['id_cms'], $id_lang);
        $link = Context::getContext()->link->getCMSLink($cms_obj);
        $output .= "- [" . $page['meta_title'] . "]($link)";

        $content = cleanText($cms_obj->content);
        if (!empty($content)) {
            // Include a good portion of CMS content as it often contains the "material information" requested
            if (strlen($content) > 1000) {
                $content = substr($content, 0, 997) . '...';
            }
            $output .= ": " . $content;
        }
        $output .= "\n";
    }

    $file_path = _PS_ROOT_DIR_ . '/llms.txt';
    if (file_put_contents($file_path, $output)) {
        echo "llms.txt generated successfully at $file_path\n";
    } else {
        echo "Failed to generate llms.txt\n";
    }
}

if (PHP_SAPI === 'cli' || isset($_GET['token'])) {
    // Basic security if run via web: check for a token or just allow it for now if simple
    generateLlmsTxt();
} else {
    echo "This script must be run from CLI or with a proper token.\n";
}

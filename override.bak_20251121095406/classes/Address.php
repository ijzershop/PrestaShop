<?php
/**
 * Overide to add housenumber to address form
 */

class Address extends AddressCore
{
    public $house_number;
    public $house_number_extension;


    // because it will give you exception on checkout address step
    public static $definition = array(
        'table' => 'address',
        'primary' => 'id_address',
        'fields' => array(
            'id_customer' => array('type' => self::TYPE_INT, 'validate' => 'isNullOrUnsignedId', 'copy_post' => false),
            'id_manufacturer' => array('type' => self::TYPE_INT, 'validate' => 'isNullOrUnsignedId', 'copy_post' => false),
            'id_supplier' => array('type' => self::TYPE_INT, 'validate' => 'isNullOrUnsignedId', 'copy_post' => false),
            'id_warehouse' => array('type' => self::TYPE_INT, 'validate' => 'isNullOrUnsignedId', 'copy_post' => false),
            'id_country' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true),
            'id_state' => array('type' => self::TYPE_INT, 'validate' => 'isNullOrUnsignedId'),
            'alias' => array('type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 32),
            'company' => array('type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 255),
            'lastname' => array('type' => self::TYPE_STRING, 'validate' => 'isName', 'required' => true, 'size' => 255),
            'firstname' => array('type' => self::TYPE_STRING, 'validate' => 'isName', 'required' => true, 'size' => 255),
            'vat_number' => array('type' => self::TYPE_STRING, 'validate' => 'isGenericName'),
            'address1' => array('type' => self::TYPE_STRING, 'validate' => 'isAddress', 'required' => true, 'size' => 128),
            'address2' => array('type' => self::TYPE_STRING, 'validate' => 'isAddress', 'size' => 128),
            'house_number' => array('type' => self::TYPE_STRING, 'validate' => 'isAddress', 'required' => true, 'size' => 8),
            'house_number_extension' => array('type' => self::TYPE_STRING, 'validate' => 'isAddress', 'required' => false, 'size' => 8),
            'postcode' => array('type' => self::TYPE_STRING, 'validate' => 'isPostCode', 'size' => 12),
            'city' => array('type' => self::TYPE_STRING, 'validate' => 'isCityName', 'required' => true, 'size' => 64),
            'other' => array('type' => self::TYPE_STRING, 'validate' => 'isMessage', 'size' => 300),
            'phone' => array('type' => self::TYPE_STRING, 'validate' => 'isPhoneNumber', 'size' => 32),
            'phone_mobile' => array('type' => self::TYPE_STRING, 'validate' => 'isPhoneNumber', 'size' => 32),
            'dni' => array('type' => self::TYPE_STRING, 'validate' => 'isDniLite', 'size' => 16),
            'deleted' => array('type' => self::TYPE_BOOL, 'validate' => 'isBool', 'copy_post' => false),
            'date_add' => array('type' => self::TYPE_DATE, 'validate' => 'isDate', 'copy_post' => false),
            'date_upd' => array('type' => self::TYPE_DATE, 'validate' => 'isDate', 'copy_post' => false),
        ),
    );


    /**
     * Split a combined street text into optimal street and house number fields.
     * Rules:
     * - Extract the trailing house number with optional letter/extension using regex.
     * - If the extracted house number part length (including extension) > 5, append it to the street; house_number becomes empty.
     * - Otherwise, keep the full number+extension in house_number (max 5 chars) and keep street separately.
     * - Street max length is 30 characters. If the street exceeds 30, abbreviations are applied first, then it will be trimmed to 30 chars if still too long.
     * Notes:
     * - Input may contain letters, numbers, and spaces.
     * - Returns an associative array with keys: street, house_number, house_number_extension.
     */
    public static function splitStreetAndNumber($full): array
    {
        $input = trim((string)$full);
        $houseNumber = '';
        $houseExt = '';
        $original = $input;
        $changed = false;

        if ($input === '') {
            return [
                'street' => '',
                'house_number' => '',
                'house_number_extension' => '',
            ];
        }

        // First, abbreviate general parts (including titles and "van der" etc.)
        $pre = self::abbreviateStreetParts($input);
        if ($pre !== $input) { $changed = true; }

        // Split into left (base street + primary number) and right (descriptor)
        $parts = array_map('trim', explode(',', $pre, 2));
        $left = $parts[0];
        $right = isset($parts[1]) ? $parts[1] : '';

        // Extract primary number from left and KEEP it with the street
        // Matches things like: 45-2, 7A, 263-1, 221, 84C, 12D
        if (preg_match('/^(.*?)(\s+(\d+[A-Za-z]?|\d+-\d+|\d+[A-Za-z]-\d+))\s*$/u', $left, $m)) {
            $street = trim($m[1] . ' ' . trim($m[2]));
            if (trim($street) !== trim($left)) { $changed = true; }
        } else {
            $street = $left; // No primary number found
        }

        // Parse right side descriptor to construct house_number like "app.12", "std.2", "u.B-4", "bte.5", "lk.4"
        if ($right !== '') {
            $r = trim($right);
            // Normalize spaces
            $r = preg_replace('/\s+/', ' ', $r);
            // For matching, also remove accents to simplify descriptor detection
            $normalize = function($s){
                if (class_exists('Normalizer')) {
                    $s = Normalizer::normalize($s, Normalizer::FORM_D);
                }
                // remove combining marks
                $s = preg_replace('/\p{Mn}+/u', '', $s);
                return mb_strtolower($s, 'UTF-8');
            };
            $rLower = $normalize($r);

            // Map descriptors to short labels (normalized to lowercase, accent-insensitive)
            $map = [
                'appartement' => 'app.',
                'apt' => 'app.',
                'app.' => 'app.',
                'studio' => 'st.',
                'st.' => 'st.',
                'std.' => 'st.',
                'unit' => 'u.',
                'u.' => 'u.',
                'boite' => 'bte.',
                'boîte' => 'bte.',
                'box' => 'bte.',
                'lokaal' => 'lok.',
                'lk.' => 'lok.',
                'apt.' => 'app.'
            ];

            $label = '';
            foreach ($map as $key => $abbr) {
                if (preg_match('/^' . preg_quote($key, '/') . '(?:\b|\s|:)/u', $rLower)) {
                    $label = $abbr;
                    break;
                }
            }

            // Extract the value (number or token) after the descriptor (e.g., "Appartement 12" => 12)
            $value = '';
            if ($label !== '') {
                if (preg_match('/^\S+\s*:?\s+(.+)$/u', $r, $mval)) {
                    $value = trim($mval[1]);
                } else {
                    // If descriptor present but no explicit value (rare), try to take trailing token
                    if (preg_match('/^(?:\S+)\s*:?\s*(\S.+)$/u', $r, $mval2)) {
                        $value = trim($mval2[1]);
                    }
                }
            } else {
                // Try to detect patterns like "1e etage achter" -> not a box/apartment; keep empty
                if (preg_match('/(\d+\s*e\s*(etage|verdieping)|verdieping|etage)/iu', $r, $fm)) {
                    // Build compact floor indicator like "3e ver" or "1e et"
                    $num = '';
                    if (preg_match('/(\d+\s*e)/iu', $r, $nm)) {
                        $num = preg_replace('/\s+/', '', $nm[1]);
                    }
                    $which = isset($fm[2]) ? mb_strtolower($fm[2], 'UTF-8') : 'verdieping';
                    $suffix = ($which === 'etage') ? ' et' : ' ver';
                    $value = $num . $suffix;
                    $label = 'floor';
                }
            }

            if ($label !== '' && $value !== '') {
                // Keep tokens like B-4 as-is after label; for floor we don't want a prefix
                $candidate = ($label === 'floor') ? $value : ($label . $value);
                // Respect DB field size (8)
                if (mb_strlen($candidate, 'UTF-8') > 5) {
                    $value = preg_replace('/\s+/', '', $value);
                    $candidate = mb_substr($label . $value, 0, 8, 'UTF-8');
                }
                $houseNumber = $candidate;
                $changed = true;
            }
        }

        // Final tidy: no hard 30-char cut; only abbreviate again if very long
        if (mb_strlen($street, 'UTF-8') > 60) {
            $street = mb_substr($street, 0, 60, 'UTF-8');
        }

        $result = [
            'street' => $street,
            'house_number' => $houseNumber,
            'house_number_extension' => $houseExt,
        ];
        if ($changed) {
            $result['original_if_fixed'] = $original;
            $result['changed'] = true;
        } else {
            $result['changed'] = false;
        }
        return $result;
    }

    /**
     * Apply splitStreetAndNumber to a model and preserve original if fixed.
     * Sets address1, house_number, house_number_extension. Appends original to 'other' when changed.
     * Returns the same array as splitStreetAndNumber (with added 'changed' and 'original_if_fixed').
     */
    public static function applySplitToModel(Address $address, string $full): array
    {
        $parts = self::splitStreetAndNumber($full);
        // Set fields on the model
        $address->address1 = $parts['street'] ?? '';
        $address->house_number = $parts['house_number'] ?? '';
        $address->house_number_extension = $parts['house_number_extension'] ?? '';
        // If changed, append original to 'other' (up to 300 chars)
        if (!empty($parts['changed']) && !empty($parts['original_if_fixed'])) {
            $existing = isset($address->other) ? (string)$address->other : '';
            $toAppend = '[orig addr] ' . $parts['original_if_fixed'];
            $sep = ($existing !== '') ? ' | ' : '';
            $combined = $existing . $sep . $toAppend;
            // Truncate to 300
            if (function_exists('mb_substr')) {
                $combined = mb_substr($combined, 0, 300, 'UTF-8');
            } else {
                $combined = substr($combined, 0, 300);
            }
            $address->other = $combined;
        }
        return $parts;
    }

    /**
     * Abbreviate common street parts to reduce length.
     * Applies case-insensitive find and replace for common street types and words.
     *
     * @param string $street The street name to abbreviate
     * @return string The abbreviated street name
     */
    private static function abbreviateStreetParts(string $street): string
    {
        // Handle common multi-word patterns first
        $street = preg_replace('/\bvan der\b/i', 'v/d', $street);
        $street = preg_replace('/\bvan den\b/i', 'v/d', $street);
        $street = preg_replace('/\bvan de\b/i', 'v/d', $street);

        // Define abbreviation mappings (case-insensitive)
        $abbreviations = [
            // Street name types
            "straat" => "str.",
            "laan" => "ln.",
            "weg" => "wg.",
            "plein" => "pl.",
            "steeg" => "stg.",
            "gracht" => "gr.",
            "kade" => "kd.",
            "poort" => "pt.",
            "plantsoen" => "ps.",
            "dreef" => "dr.",
            "singel" => "sg.",
            "pad" => "pd.",
            "rijbaan" => "rb.",
            "plaats" => "plts.",
            "boommarkt" => "bmkt.",
            "vismarkt" => "vmkt.",
            "groenemarkt" => "gmkt.",
            "botermarkt" => "btmkt.",
            'dwarsstraat' => 'dwstr',
            'kruisstraat' => 'krstr',
            'parkstraat' => 'pkstr',
            'hoofdstraat' => 'hfdstr',
            'kerkstraat' => 'krkstr',
            'schoolstraat' => 'schlstr',
            'stationsplein' => 'statpln',
            'marktplein' => 'mktpln',
            'kerkplein' => 'krkpln',
            // Titles and honorifics
            "heer" => "hr.",
            "de heer" => "dhr.",
            "mevrouw" => "mevr.",
            "doctor" => "dr.",
            "doctorandus" => "drs.",
            "ingenieur" => "ir.",
            "meester in de rechten" => "mr.",
            "professor" => "prof.",
            "dominee" => "ds.",
            "pastoor" => "past.",
            "burgemeester" => "burg.",
            "jonkvrouw" => "jkvr.",
            "jonkheer" => "jhr.",
            "baron" => "baron",
            "barones" => "barones",
            "graaf" => "graaf",
            "gravin" => "gravin",
            "kapitein" => "kap.",
            "generaal" => "gen.",
            "admiraal" => "adm.",
            "kolonel" => "kol.",
            // Address components
            "unit" => "u.",
            "pand" => "pd.",
            "lokaal" => "lk.",
            "appartement" => "apt.",
            "studio" => "std.",
            "huis" => "hs.",
            "winkel" => "wk.",
            // Ordinals
            "eerste" => "1e",
            "tweede" => "2e",
            "derde" => "3e",
            "vierde" => "4e",
            "vijfde" => "5e",
            "zesde" => "6e",
            "zevende" => "7e",
            "achtste" => "8e",
            "negende" => "9e",
            "tiende" => "10e"
        ];

        $result = $street;

        foreach ($abbreviations as $full => $abbrev) {
            // Case-insensitive word boundary replacement to avoid partial matches
            $pattern = '/\b' . preg_quote($full, '/') . '\b/i';
            $result = preg_replace($pattern, $abbrev, $result);
        }

        // Additionally, shorten compound endings like Schaarstraat->Schaarstr., *laan->*ln., *weg->*wg.
        $result = preg_replace('/(\p{L}+?)straat\b/iu', '$1str.', $result);
        $result = preg_replace('/(\p{L}+?)laan\b/iu', '$1ln.', $result);
        $result = preg_replace('/(\p{L}+?)weg\b/iu', '$1wg.', $result);

        return trim($result);
    }



    /**
     * Initialize an address corresponding to the specified id address or if empty to the
     * default shop configuration.
     *
     * @param int $id_address
     * @param bool $with_geoloc
     *
     * @return Address address
     *
     * @throws PrestaShopException
     */
    public static function initialize($id_address = null, $with_geoloc = false)
    {
        $context = Context::getContext();

        if ($id_address) {
            $context_hash = (int) $id_address;
        } elseif ($with_geoloc && isset($context->customer->geoloc_id_country)) {
            $context_hash = md5((int) $context->customer->geoloc_id_country . '-' . (int) $context->customer->id_state . '-' .
                                $context->customer->postcode);
        } else {
            $context_hash = md5((string) $context->country->id);
        }

        $cache_id = 'Address::initialize_' . $context_hash;

        if (!Cache::isStored($cache_id)) {
            // if an id_address has been specified retrieve the address
            if ($id_address) {
                $address = new Address((int) $id_address);

//                if (!Validate::isLoadedObject($address)) {
//                    $address->id = (int) $id_address;
//                    $address->delete();
////                    throw new PrestaShopException('Invalid address #' . (int) $id_address);
//                }
            } elseif ($with_geoloc && isset($context->customer->geoloc_id_country)) {
                $address = new Address();
                $address->id_country = (int) $context->customer->geoloc_id_country;
                $address->id_state = (int) $context->customer->id_state;
                $address->postcode = $context->customer->postcode;
            } elseif ((int) $context->country->id && ((int) $context->country->id != Configuration::get('PS_SHOP_COUNTRY_ID'))) {
                $address = new Address();
                $address->id_country = (int) $context->country->id;
                $address->id_state = 0;
                $address->postcode = '0';
            } elseif ((int) Configuration::get('PS_SHOP_COUNTRY_ID')) {
                // set the default address
                $address = new Address();
                $address->id_country = (int) Configuration::get('PS_SHOP_COUNTRY_ID');
                $address->id_state = (int) Configuration::get('PS_SHOP_STATE_ID');
                $address->postcode = Configuration::get('PS_SHOP_CODE');
            } else {
                // set the default address
                $address = new Address();
                $address->id_country = (int) Configuration::get('PS_COUNTRY_DEFAULT');
                $address->id_state = 0;
                $address->postcode = '0';
            }
            Cache::store($cache_id, $address);

            return $address;
        }

        return Cache::retrieve($cache_id);
    }
}


?>

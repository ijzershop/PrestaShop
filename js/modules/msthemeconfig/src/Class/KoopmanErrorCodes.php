<?php
declare(strict_types=1);

namespace MsThemeConfig\Class;

/**
 * Class KoopmanErrorCodes
 * Contains all error codes for the Koopman API
 */
class KoopmanErrorCodes
{
    /* Algemene errors (specifieke veld wordt vermeld) */
    public const ERR_UNKNOWN_ATTRIBUTE = 'ERR_UNKNOWN_ATTRIBUTE';
    public const ERR_REQUIRED = 'ERR_REQUIRED';
    public const ERR_EMPTY = 'ERR_EMPTY';
    public const ERR_NOT_A_NUMBER = 'ERR_NOT_A_NUMBER';
    public const ERR_INVALID_FORMAT = 'ERR_INVALID_FORMAT';
    public const ERR_NOT_A_DATE = 'ERR_NOT_A_DATE';

    /* Shipment errors */
    public const ERR_DATE_TOO_OLD = 'ERR_DATE_TOO_OLD';
    public const ERR_SHIPMENT_DEPOT = 'ERR_SHIPMENT_DEPOT';
    public const ERR_SHIPMENT_RESTRICTED_DEPOT = 'ERR_SHIPMENT_RESTRICTED_DEPOT';
    public const ERR_SHIPMENT_UPDATE_RESTRICTED = 'ERR_SHIPMENT_UPDATE_RESTRICTED';
    public const ERR_SHIPMENT_CUSTOMER = 'ERR_SHIPMENT_CUSTOMER';
    public const ERR_SHIPMENT_RESTRICTED_CUSTOMER = 'ERR_SHIPMENT_RESTRICTED_CUSTOMER';
    public const ERR_CUSTOMER_UNKNOWN = 'ERR_CUSTOMER_UNKNOWN';
    public const ERR_SATURDAY_RESTRICTED_COUNTRY = 'ERR_SATURDAY_RESTRICTED_COUNTRY';

    /* Meldingen over addresses */
    public const ERR_ADDRESS_TYPE = 'ERR_ADDRESS_TYPE';
    public const ERR_ADDRESS_POSTALCODE = 'ERR_ADDRESS_POSTALCODE';
    public const ERR_ADDRESS_HOUSENUMBER = 'ERR_ADDRESS_HOUSENUMBER';
    public const ERR_ADDRESS_COUNTRY = 'ERR_ADDRESS_COUNTRY';
    public const ERR_ADDRESS_EMAIL = 'ERR_ADDRESS_EMAIL';
    public const ERR_ADDRESS_POSTALCODE_INVALID = 'ERR_ADDRESS_POSTALCODE_INVALID';

    /* Meldingen over shipment services */
    public const ERR_SHIPMENT_SERVICE_TYPE_NOT_FOUND = 'ERR_SHIPMENT_SERVICE_TYPE_NOT_FOUND';
    public const ERR_SHIPMENT_RESTRICTED_SERVICE_TYPE = 'ERR_SHIPMENT_RESTRICTED_SERVICE_TYPE';
    public const ERR_SERVICE_NOT_FOUND = 'ERR_SERVICE_NOT_FOUND';
    public const ERR_SERVICE_COLLO = 'ERR_SERVICE_COLLO';
    public const ERR_SERVICE_PALLET = 'ERR_SERVICE_PALLET';
    public const ERR_SERVICE_NO_REGION = 'ERR_SERVICE_NO_REGION';
    public const ERR_SERVICE_T = 'ERR_SERVICE_T';
    public const ERR_SERVICE_A = 'ERR_SERVICE_A';
    public const ERR_SERVICE_P = 'ERR_SERVICE_P';
    public const ERR_SERVICE_D = 'ERR_SERVICE_D';
    public const ERR_SERVICE_N = 'ERR_SERVICE_N';

    /* Meldingen over shipment units */
    public const ERR_SHIPMENT_UNIT_NOT_FOUND = 'ERR_SHIPMENT_UNIT_NOT_FOUND';
    public const ERR_SHIPMENT_STATUS_BARCODE_REQUIRED = 'ERR_SHIPMENT_STATUS_BARCODE_REQUIRED';
    public const ERR_SHIPMENT_NOT_FOUND = 'ERR_SHIPMENT_NOT_FOUND';
    public const ERR_SHIPMENT_REQUIRED = 'ERR_SHIPMENT_REQUIRED';
    public const ERR_SHIPMENT_PICKUP_REQUIRED = 'ERR_SHIPMENT_PICKUP_REQUIRED';
    public const ERR_SHIPMENT_DELIVERY_REQUIRED = 'ERR_SHIPMENT_DELIVERY_REQUIRED';
    public const ERR_SHIPMENT_UNIT_REQUIRED = 'ERR_SHIPMENT_UNIT_REQUIRED';
    public const ERR_SHIPMENT_TYPE = 'ERR_SHIPMENT_TYPE';
    public const ERR_SHIPMENT_RESTRICTED_TYPE = 'ERR_SHIPMENT_RESTRICTED_TYPE';
    public const ERR_SHIPMENT_COD_COUNTRY = 'ERR_SHIPMENT_COD_COUNTRY';
    public const ERR_SHIPMENT_COD_MAX = 'ERR_SHIPMENT_COD_MAX';
    public const ERR_SHIPMENT_COD_TYPE = 'ERR_SHIPMENT_COD_TYPE';
    public const ERR_SHIPMENT_TYPE_RESTRICTED_COUNTRY = 'ERR_SHIPMENT_TYPE_RESTRICTED_COUNTRY';
    public const ERR_SHIPMENT_TYPE_MAX_UNIT = 'ERR_SHIPMENT_TYPE_MAX_UNIT';
    public const ERR_SHIPMENT_TYPE_MAX_WEIGHT = 'ERR_SHIPMENT_TYPE_MAX_WEIGHT';
    public const ERR_SHIPMENT_TYPE_UNIT_TYPE = 'ERR_SHIPMENT_TYPE_UNIT_TYPE';
    public const ERR_SHIPMENT_RESTRICTED_UNIT_TYPE = 'ERR_SHIPMENT_RESTRICTED_UNIT_TYPE';
    public const ERR_SHIPMENT_DELIVERY_TERM_UNKNOWN = 'ERR_SHIPMENT_DELIVERY_TERM_UNKNOWN';
    public const ERR_SHIPMENT_DELIVERY_TERM_RESTRICTED = 'ERR_SHIPMENT_DELIVERY_TERM_RESTRICTED';
    public const ERR_SHIPMENT_UNIT_ADR_UN_REQUIRED = 'ERR_SHIPMENT_UNIT_ADR_UN_REQUIRED';
    public const ERR_SHIPMENT_UNIT_ADR_UN_UNKNOWN = 'ERR_SHIPMENT_UNIT_ADR_UN_UNKNOWN';
    public const ERR_SHIPMENT_UNIT_ADR_WEIGHT_REQUIRED = 'ERR_SHIPMENT_ADR_WEIGHT_REQUIRED';
    public const ERR_SHIPMENT_UNIT_ADR_DESCRIPTION_REQUIRED = 'ERR_SHIPMENT_UNIT_ADR_DESCRIPTION_REQUIRED';
    public const ERR_SHIPMENT_UNIT_ADR_TRANSPORT_CATEGORY_REQUIRED = 'ERR_SHIPMENT_UNIT_ADR_TRANSPORT_CATEGORY_REQUIRED';
    public const ERR_SHIPMENT_UNIT_ADR_TUNNEL_CODE_REQUIRED = 'ERR_SHIPMENT_UNIT_ADR_TUNNEL_CODE_REQUIRED';
    public const ERR_UNIT_NOT_FOUND = 'ERR_UNIT_NOT_FOUND';
    public const ERR_UNIT_REQ_MEASUREMENTS = 'ERR_UNIT_REQ_MEASUREMENTS';
    public const ERR_UNIT_REQ_WEIGHT = 'ERR_UNIT_REQ_WEIGHT';
    public const ERR_UNIT_REQ_LENGTH = 'ERR_UNIT_REQ_LENGTH';
    public const ERR_UNIT_REQ_WIDTH = 'ERR_UNIT_REQ_WIDTH';
    public const ERR_UNIT_REQ_HEIGHT = 'ERR_UNIT_REQ_HEIGHT';
    public const ERR_UNIT_MAX_WEIGHT = 'ERR_UNIT_MAX_WEIGHT';
    public const ERR_UNIT_MAX_LENGTH = 'ERR_UNIT_MAX_LENGTH';
    public const ERR_UNIT_MAX_HEIGHT = 'ERR_UNIT_MAX_HEIGHT';
    public const ERR_UNIT_MAX_VOLUME = 'ERR_UNIT_MAX_VOLUME';
    public const ERR_MAX_UNIT_COUNT = 'ERR_MAX_UNIT_COUNT';

    /**
     * Get human-readable error message for a given error code
     *
     * @param string $errorCode The error code
     * @return string The human-readable error message
     */
    public static function getErrorMessage(string $errorCode): string
    {
        $errorMessages = [
            self::ERR_ADDRESS_POSTALCODE => 'Ongeldige postcode',
            self::ERR_ADDRESS_HOUSENUMBER => 'Ongeldig huisnummer',
            self::ERR_ADDRESS_POSTALCODE_INVALID => 'Ongeldige postcode formaat',
            // Add more human-readable error messages as needed
        ];

        return $errorMessages[$errorCode] ?? 'Onbekende fout: ' . $errorCode;
    }
}

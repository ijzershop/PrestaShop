# Koopman returns

The **Retour** column in the admin orders list opens a customer-collection form. Enter the pickup date, packages (dimensions in cm, weight in kg) and an optional driver message. The existing carrier connection and sender address settings apply to the order's shop. After booking, the same modal shows the saved PDF label for review.

Opening a new return checks the pickup address's phone number immediately. If it is missing or longer than 30 characters, the modal explains how to correct the order's delivery address and hides the booking controls until the form is reopened with a valid number. A blank mobile field falls back to the address's landline. The same validation runs again when booking; existing return labels and email actions remain accessible.

The package selector uses the shop's seven collie names. Selecting a type fills its dimensions; entering or changing the weight recalculates parcel dimensions with the same `calculateVolumeSize` function used for outgoing shipments. Weight is entered per returned package because the outgoing code derives it from the products rather than a fixed preset. Measurements remain editable.

The order product list shows the calculated weight for each row: the saved order-detail `product_weight` multiplied by `product_quantity`, matching the order grid's existing weight calculation. Weights are shown in kg with three decimal places; unavailable weights are marked as unknown. This helps staff choose the returned package weight without assuming the whole order is being returned.

| Collie | Base length × width × minimum height (cm) | Transmission unit |
| --- | --- | --- |
| Envelop | 25 × 30 × 0.5, adjusted for weight | COL |
| Plaat | 100 × 50 × 0.5, adjusted for weight | COL |
| 1 meter | 100 × 20 × 5, adjusted for weight | COL |
| 2 meter | 200 × 25 × 5, adjusted for weight | COL |
| Standaardpallet | 200 × 30 × 30, fixed | PLH |
| Plaatpallet | 100 × 50 × 15, fixed | MP |
| Balkpallet | 200 × 15 × 15, fixed | PLH |

The exporter `ExportOrdersMultipleCollies::prepareShippingData` maps these names to Transmission units and forwards the measurements. Dimensions originate in `views/js/koopman.js`: parcel height is calculated from weight using a volume multiplier of 250; below the minimum height, width is adjusted instead. Pallet sizes follow the outgoing pallet buttons' measurement fields, including the plate pallet's actual 100 cm length. Outgoing weight-splitting limits (23 kg for parcels, 500 kg for standard/beam pallets and 150 kg for plate pallets) are not default package weights.

**Annuleren** closes this preview without emailing the customer; the carrier booking remains in place. **Versturen naar klant** explicitly emails the order's customer the return number and the saved Transmission tracking link, without a PDF attachment. The carrier's driver supplies the label at pickup; the saved PDF is for staff review. The message says: “Er is een retourzending aangemaakt met nummer {tracking_number}.” Reopening a return shows the same preview and email status, so an unsent notification can be sent later.

`KOOPMANORDEREXPORT_SHOW_RETOUR` controls column visibility. `KOOPMANORDEREXPORT_RETOUR_ACCEPTED_STATUSSES` controls which order states allow a booking. `KOOPMANORDEREXPORT_RETOUR_CREATED_STATUSSES` identifies historic return states and prevents a new booking. Both JSON lists and legacy comma-separated lists are supported. Workshop profiles retain the existing hidden-column behavior.

The form, POST booking, POST email and PDF preview/download use authenticated admin routes with order-update permission and employee access to the order's shop. Booking and email dispatch require a per-order CSRF token. Recipient, return number and tracking link are loaded on the server, never accepted from browser input. The legacy public AJAX return actions are retired.

## Carrier contract

The implementation uses `POST /shipments/shipment`, `depot_number`, `labels: PDF`, and `AFLINFO` remarks (180 characters maximum) from the user-supplied REST v2.2 manual (03-01-2023). Return orders use the customer's address as `pickup`, including the requested date and contact details, and the shop's address as `consignor`.

The old integration's shipment type `A` and its `pickup` + `consignor` address roles are retained from `controllers/front/ajaxOldVersion.php`. The manual's generic `loading`/`delivery` example does not describe returns: the live carrier rejection explicitly requires `pickup` and rejects a `delivery` address for a return order. No separate `delivery` address is sent. Shipment-unit fields follow the manual's JSON example and the existing outbound exporter; the manual's table/XML example use different names. Both base64 and raw PDF label content are accepted.

Return references append `-R` to the webshop reference. Return transport numbers and PDFs are stored separately; outgoing tracking, order status and return-cost products are unaffected. Booking itself does not send the customer email: this requires the explicit send action in the preview.

## Persistence and retry behavior

The service creates `{prefix}msthemeconfig_koopman_return` on first use. It retains one return record per shop/order, with employee attribution and protected PDF content. Reopening the form shows the saved result and download links.

An atomic claim prevents double bookings, including simultaneous requests and reopened forms. A definite carrier rejection permits another attempt with a new form. A timeout, conflict or incomplete response remains blocked because the carrier may already have accepted it. Check the order reference ending in `-R` in the Transmission portal before resolving such a record; there is no automatic rebooking or cancellation.

Email dispatch creates `{prefix}msthemeconfig_koopman_return_email` on first use, with its own atomic record per return. Double clicks and reopened previews cannot dispatch an already sent notification again. A missing return number or valid tracking link, invalid customer details or disabled shop email block sending. Email dispatch does not depend on PDF availability. An ambiguous mail-transport result is recorded for checking rather than retried automatically. PDF previews and download links remain available to staff even if notification status cannot be loaded.

## Verification

Run from the shop root:

```text
php modules/msthemeconfig/tests/koopman-return-test.php
php modules/msthemeconfig/tests/koopman-return-controller-test.php
php modules/msthemeconfig/tests/koopman-return-ui-test.php
php modules/msthemeconfig/tests/koopman-return-notification-test.php
```

The browser harness `tests/koopman-return-ui-browser-test.js` accepts a Playwright page and fixture JSON produced by the UI test with `--fixture`; it creates an isolated page and blocks network requests.

These checks use mocked carrier requests, mocked mail transport and isolated storage. They never book a shipment or send an email. For a carrier check, use a real intended return with its pickup date, package measurements/weight and driver instructions, then verify the resulting pickup and PDF in Transmission.

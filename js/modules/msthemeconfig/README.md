# MsThemeConfig
Configuratie module voor het ModerneSmid Thema

## Plasma cutting (1.0.18)

Full-sheet DXF/SVG quoting, selectable Fabric.js contours and sheet placement,
cached employee parts, and order production files are integrated in this module.
See [deployment, machine configuration and verification](docs/PLASMA_CUTTING.md).

## Guest accounts (1.0.16)

Upgrade the module after deployment to register `actionSubmitAccountBefore` and
`actionEmailAddAfterContent`. Existing generated conversion emails are repaired
by the mail hook; regenerating files outside the module is not required.

Guest-only login failures explain how to register and link to registration.
Registration accepts a guest email, validates the form, and rejects an email
already belonging to a registered customer. Registering from the current guest
session converts that customer and keeps its orders. A fresh session creates a
new account without claiming old guest orders solely by email. Back-office
conversion keeps the guest's customer ID and sends a password setup link.

Run the focused checks from the shop root (no real customers or emails):

```sh
php modules/msthemeconfig/tests/guest-login-test.php
php modules/msthemeconfig/tests/registration-test.php
php modules/msthemeconfig/tests/guest-registration-test.php
php modules/msthemeconfig/tests/guest-account-email-test.php
```

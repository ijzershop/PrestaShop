# Certificate Authentication - Quick Start

## What is this?

Adds an extra security layer for employee accounts without 2FA:
- **Accounts with 2FA**: Can log in from anywhere (no certificate needed)
- **Accounts without 2FA**: Must use workstations with valid client certificates

## Quick Setup (5 minutes)

### 1. Install/Update Module

In PrestaShop admin:
```
Modules > Module Manager > msthemeconfig > Install/Update
```

### 2. Generate Certificates / Certificaten Genereren

**🔒 Security Requirement / Beveiligingseis**: Generate CA on an **encrypted USB stick** - this is mandatory!
**Genereer CA op een versleutelde USB stick - dit is verplicht!**

```bash
# USB Stick Storage (Mandatory / Verplicht - CA key stays offline / CA sleutel blijft offline)
cd /media/usb/modernesmid-certs/
/path/to/generate_certificates.sh --init  # Generate CA (one time) / Genereer CA (eenmalig)
/path/to/generate_certificates.sh --generate "Employee Name" "email@example.com" "employee_id"

# Copy ONLY ca.crt to server (NOT ca.key!)
# Kopieer ALLEEN ca.crt naar server (NIET ca.key!)
scp ca/ca.crt admin@server:/etc/ssl/certs/modernesmid_employee_ca.crt
```

**Files created in / Bestanden aangemaakt in** `certificates/clients/`:
- `employee_name_id.p12` ← Send this to employee for browser install / Stuur dit naar medewerker voor browser installatie

**Why USB? / Waarom USB?** If your web server is compromised, attacker cannot create new certificates! / Als je webserver gecompromitteerd is, kan een aanvaller geen nieuwe certificaten aanmaken!

### 3. Configure Apache

Edit your SSL VirtualHost (`/etc/apache2/sites-available/modernesmid-ssl.conf`):

```apache
<VirtualHost *:443>
    # ... existing config ...

    SSLVerifyClient optional
    SSLCACertificateFile /path/to/modules/msthemeconfig/cron_scripts/certificates/ca/ca.crt
    SSLOptions +StdEnvVars +ExportCertData

    <Location /admin-dev>
        SSLVerifyClient optional
        SSLOptions +StdEnvVars
    </Location>
</VirtualHost>
```

```bash
sudo apache2ctl configtest
sudo systemctl reload apache2
```

### 4. Install Certificate on Workstation

**Windows/macOS:**
- Double-click `employee_name_id.p12`
- Import to browser (no password)

**Linux:**
- Firefox: Settings → Certificates → Import
- Chrome: Settings → Security → Manage certificates → Import

### 5. Configure Employees

PrestaShop admin:
```
Moderne Smid > Certificate Auth
```

- View all employees
- See 2FA status
- Toggle certificate requirements

## How It Works

```
Login attempt
    ↓
Has 2FA enabled?
    ├─ YES → Normal login + 2FA code (no certificate needed)
    └─ NO → Check certificate
            ├─ Valid → Proceed with password
            └─ Invalid → Block with error message
```

## Testing

1. **Test without certificate** (incognito browser):
   - Login with non-2FA account
   - Expected: "This account requires certificate authentication..."

2. **Test with certificate**:
   - Import certificate
   - Login with non-2FA account
   - Expected: Success

3. **Test with 2FA**:
   - Login with 2FA account
   - No certificate needed
   - Expected: Normal login + 2FA prompt

## Troubleshooting

### Error: "Certificate authentication required"

- ✅ Certificate installed in browser?
- ✅ Browser restarted after install?
- ✅ Apache configured with `SSLOptions +StdEnvVars`?
- ✅ Certificate not expired? (`openssl x509 -in cert.crt -noout -dates`)

### Browser doesn't prompt for certificate

- ✅ Apache `SSLVerifyClient optional` set?
- ✅ Certificate imported to correct store (Personal/login)?
- ✅ Browser has access to certificate?

### Cannot access admin at all

**Emergency fix**: Comment out certificate check in:
```
external/modernesmid_webshop/override/controllers/admin/AdminLoginController.php
```

Lines 48-88 (the certificate check block)

## Files & Locations

```
modules/msthemeconfig/
├── src/Service/CertificateAuthService.php        # Core logic
├── controllers/admin/MsAdminCertificateAuthController.php  # Admin UI
├── cron_scripts/generate_certificates.sh         # Certificate generator
├── cron_scripts/certificates/
│   ├── ca/
│   │   ├── ca.crt     ← Install in Apache config
│   │   └── ca.key     ← KEEP SECURE!
│   └── clients/
│       └── *.p12      ← Distribute to employees
└── docs/
    ├── CERTIFICATE_AUTH_SETUP.md    # Full guide
    └── CERTIFICATE_AUTH_README.md   # This file

external/modernesmid_webshop/override/controllers/admin/
└── AdminLoginController.php         # Login hook

Database tables:
├── ps_employee_certificate_auth      # Certificate requirements
└── ps_employee_certificate_auth_log  # Login logs
```

## Security Tips / Beveiligingstips

1. **Store CA key on encrypted USB stick / Bewaar CA sleutel op versleutelde USB stick**: Keep offline in locked safe, only use when creating certificates / Bewaar offline in afgesloten kluis, gebruik alleen bij aanmaken certificaten
2. **USB backups**: Maintain 2-3 encrypted copies in separate secure locations (office safe, bank, DR site) / Onderhoud 2-3 versleutelde kopieën op verschillende veilige locaties (kantoorkluis, bank, DR locatie)
3. **Short validity / Korte geldigheid**: Set certificates to expire yearly and rotate / Stel certificaten in op jaarlijkse vervaldatum en roteer
4. **Monitor logs / Monitor logboeken**: Check admin panel regularly for failed attempts / Controleer admin paneel regelmatig op mislukte pogingen
5. **Revoke on leave / Intrekken bij vertrek**: Immediately remove access when employees leave / Verwijder direct toegang wanneer medewerkers vertrekken
6. **Document access / Documenteer toegang**: Log every time USB is accessed to generate certificates / Log elke keer dat USB wordt gebruikt om certificaten te genereren

## Need Help?

📖 **Full documentation**: `modules/msthemeconfig/docs/CERTIFICATE_AUTH_SETUP.md`
📊 **View logs**: Moderne Smid > Certificate Auth > View Login Logs
🔍 **Module logs**: `var/logs/MsThemeConfig.log`
🔧 **Apache logs**: `/var/log/apache2/error.log`

---

**Moderne Smid BV** - Certificate Authentication v1.0

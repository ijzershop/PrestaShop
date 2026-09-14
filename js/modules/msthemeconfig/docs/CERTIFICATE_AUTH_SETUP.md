# Certificate-Based Authentication Setup Guide

## Overview

This guide explains how to set up certificate-based authentication for PrestaShop employee accounts. This adds an extra security layer for accounts that don't have 2FA enabled, requiring employees to access the admin panel only from authorized workstations with valid client certificates.

## Architecture

### Authentication Flow

1. **Accounts with 2FA**: Can log in from anywhere without certificates
2. **Accounts without 2FA**: Must have a valid client certificate installed on their workstation

### How It Works

1. Employee submits username in the login form
2. System checks if employee has 2FA enabled (Google Authenticator module)
3. If **2FA is enabled**: Proceed with normal login + 2FA verification
4. If **2FA is NOT enabled**: Check for valid client certificate
   - If certificate is valid: Proceed with password verification
   - If certificate is missing/invalid: Block login with error message

## Installation Steps

### 1. Install the Module

The certificate authentication system is integrated into the `msthemeconfig` module. Simply install or update the module:

```bash
# In PrestaShop admin panel
Modules > Module Manager > Find "msthemeconfig" > Install/Update
```

The module will automatically create the required database tables:
- `ps_employee_certificate_auth` - Certificate requirements per employee
- `ps_employee_certificate_auth_log` - Login attempt logs

### 2. Generate Certificates

Use the provided certificate generation script:

```bash
cd modules/msthemeconfig/cron_scripts/
chmod +x generate_certificates.sh
./generate_certificates.sh
```

#### Interactive Mode

Run the script without arguments to enter interactive mode:

```bash
./generate_certificates.sh
```

Menu options:
1. **Generate CA** - Creates the Certificate Authority (one-time setup)
2. **Generate client certificate** - Creates a certificate for an employee
3. **Show certificate information** - View certificate details
4. **List all certificates** - Show all generated certificates
5. **Exit**

#### Command-Line Mode

For automation or scripting:

```bash
# Initialize CA (first time only)
./generate_certificates.sh --init

# Generate client certificate
./generate_certificates.sh --generate "John Doe" "john@modernesmid.nl" "15"

# Show certificate info
./generate_certificates.sh --info certificates/clients/john_doe_15.crt
```

#### Certificate Files Generated

For each employee, the script creates:
- `employee_name_id.crt` - Certificate (public key)
- `employee_name_id.key` - Private key
- `employee_name_id.pem` - Combined PEM file (certificate + private key)
- `employee_name_id.p12` - PKCS#12 file for browser import (no password)

**Important:** Keep the CA private key (`certificates/ca/ca.key`) secure! Anyone with this file can create valid certificates.

#### CA Key Storage: USB Stick 🔒

**Security Requirement**: The CA private key (`ca.key`) **MUST** be stored on an **encrypted USB stick**, kept offline in a secure location.

**Why USB storage is mandatory:**
- ✅ **Air-gapped security**: CA key never on internet-connected machine
- ✅ **Physical security**: Keep USB in locked safe when not in use
- ✅ **Compromise mitigation**: If web server is hacked, attacker cannot create new certificates
- ✅ **Audit trail**: Log every time USB is accessed for certificate generation
- ✅ **Easy backup**: Simply copy encrypted USB to secure backup location

**Setup process:**

```bash
# 1. Generate CA on USB stick (one-time setup)
# Eenmalige setup: Genereer CA op USB stick
cd /media/usb/modernesmid-certs/
/path/to/generate_certificates.sh --init

# 2. Copy ONLY the CA certificate (not the key!) to web server
# Kopieer ALLEEN het CA certificaat (niet de sleutel!) naar de webserver
scp ca/ca.crt admin@server:/etc/ssl/certs/modernesmid_employee_ca.crt

# 3. Secure the USB
# Beveilig de USB
#    - Encrypt with BitLocker (Windows), LUKS (Linux), or FileVault (Mac)
#      Versleutel met BitLocker (Windows), LUKS (Linux), of FileVault (Mac)
#    - Store in locked safe
#      Bewaar in afgesloten kluis
#    - Document access in security log
#      Documenteer toegang in beveiligingslogboek

# 4. When creating employee certificates (as needed)
# Bij het aanmaken van medewerker certificaten (indien nodig)
cd /media/usb/modernesmid-certs/
./generate_certificates.sh --generate "Jane Smith" "jane@company.com" "22"

# 5. Copy only the .p12 file to distribute to employee
# Kopieer alleen het .p12 bestand om te versturen naar de medewerker
cp clients/jane_smith_22.p12 /tmp/distribute/

# 6. Unmount USB and lock away immediately
# Ontkoppel USB en sluit direct weg
```

**File locations / Bestandslocaties:**

| File / Bestand | Purpose / Doel | Location / Locatie | Access / Toegang |
|------|---------|----------|--------|
| `ca.key` | Signs new certificates / Ondertekent nieuwe certificaten | **USB stick (offline)** | 🔴 Only when creating certs / Alleen bij aanmaken certificaten |
| `ca.crt` | Validates client certs / Valideert client certificaten | **Web server** (`/etc/ssl/certs/`) | 🟢 Apache needs to read this / Apache moet dit kunnen lezen |
| `employee.p12` | Employee's certificate / Medewerker certificaat | Employee workstation / Medewerker werkstation | 🟡 Distribute securely / Veilig distribueren |

#### USB Backup Strategy / USB Backup Strategie

1. **Primary USB / Primaire USB**: Daily use, stored in office safe / Dagelijks gebruik, bewaard in kantoorkluis
2. **Backup USB #1**: Encrypted copy, stored in fireproof safe at office / Versleutelde kopie, bewaard in brandvrije kluis op kantoor
3. **Backup USB #2**: Encrypted copy, stored off-site (bank deposit box, DR site) / Versleutelde kopie, bewaard off-site (bankkluis, DR locatie)

**Recovery procedure / Herstel procedure**: Test quarterly that you can generate certificates from backup USB. / Test elk kwartaal dat je certificaten kunt genereren vanaf backup USB.

#### If USB is Lost or Compromised / Als USB verloren of gecompromitteerd is

**Immediate actions / Directe acties:**
1. Generate new CA on new USB / Genereer nieuwe CA op nieuwe USB
2. Re-generate all employee certificates with new CA / Genereer alle medewerker certificaten opnieuw met nieuwe CA
3. Update `ca.crt` on web server / Update `ca.crt` op webserver
4. Distribute new `.p12` files to all employees / Distribueer nieuwe `.p12` bestanden naar alle medewerkers
5. Revoke/block old CA (add to revocation list if implemented) / Intrekken/blokkeren oude CA (toevoegen aan revocation list indien geïmplementeerd)

**This is why physical security of the USB is critical! / Daarom is fysieke beveiliging van de USB cruciaal!**

### 3. Configure Apache

#### Option A: Optional Client Certificates (Recommended)

This allows both certificate and non-certificate users to access the admin, with validation handled by PHP:

```apache
<VirtualHost *:443>
    ServerName modernesmid.nl
    DocumentRoot /var/www/modernesmid-webshop

    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/modernesmid.crt
    SSLCertificateKeyFile /etc/ssl/private/modernesmid.key

    # Make client certificates optional
    SSLVerifyClient optional
    SSLVerifyDepth 1
    # Path to CA certificate - ONLY the public certificate (ca.crt), NOT the private key!
    # If using USB storage: copy ca.crt from USB to /etc/ssl/certs/ on server
    SSLCACertificateFile /etc/ssl/certs/modernesmid_employee_ca.crt

    # Pass certificate information to PHP
    SSLOptions +StdEnvVars +ExportCertData

    # Admin directory - request (but don't require) certificate
    <Location /admin-dev>
        SSLVerifyClient optional
    </Location>

    <Directory /var/www/modernesmid-webshop>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

#### Option B: Require Certificates for Admin (Stricter)

This blocks access to the entire admin area without a certificate, with exemptions for 2FA users handled in PHP:

```apache
<VirtualHost *:443>
    ServerName modernesmid.nl
    DocumentRoot /var/www/modernesmid-webshop

    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/modernesmid.crt
    SSLCertificateKeyFile /etc/ssl/private/modernesmid.key

    # Make client certificates optional by default
    SSLVerifyClient optional
    SSLVerifyDepth 1
    # Path to CA certificate - copy from USB to server (public cert only, not private key!)
    SSLCACertificateFile /etc/ssl/certs/modernesmid_employee_ca.crt

    # Pass certificate information to PHP
    SSLOptions +StdEnvVars +ExportCertData

    # Admin directory - require certificate (PHP will handle 2FA exemptions)
    <Location /admin-dev>
        SSLVerifyClient require
        SSLOptions +StdEnvVars
    </Location>

    <Directory /var/www/modernesmid-webshop>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

**Note:** Replace `/admin-dev` with your actual admin directory name.

#### Apache Configuration Directives Explained

- `SSLVerifyClient optional` - Request but don't require client certificate
- `SSLVerifyClient require` - Require valid client certificate to access
- `SSLVerifyDepth 1` - Verify certificate chain depth (1 = CA + client cert)
- `SSLCACertificateFile` - Path to your CA certificate that signed client certificates
- `SSLOptions +StdEnvVars` - Export SSL variables to environment (PHP can read them)
- `SSLOptions +ExportCertData` - Export full certificate data

#### Enable Apache SSL Module

```bash
# Debian/Ubuntu
sudo a2enmod ssl
sudo systemctl restart apache2

# RHEL/CentOS
sudo yum install mod_ssl
sudo systemctl restart httpd
```

### 4. Configure PrestaShop Module

In the PrestaShop admin panel:

1. Go to **Moderne Smid > Certificate Auth**
2. View list of all employees
3. See which employees have 2FA enabled
4. Toggle certificate requirements for specific employees

**Auto-Configuration:**
- Employees with 2FA enabled: Certificate NOT required (by default)
- Employees without 2FA: Certificate required (by default)

You can override these defaults using the toggle switches or bulk actions.

#### Optional: Set CA Issuer DN (for extra validation)

In your database or via configuration:

```sql
INSERT INTO ps_configuration (name, value)
VALUES ('MSCERT_AUTH_ISSUER_DN', '/C=NL/ST=Noord-Brabant/L=Eindhoven/O=Moderne Smid BV/OU=IT Department/CN=Moderne Smid Employee CA');
```

This ensures only certificates signed by your specific CA are accepted.

### 5. Install Certificates on Workstations

#### Windows (Chrome, Edge, IE)

1. Double-click the `.p12` file
2. Certificate Import Wizard will open
3. **Current User** → Next
4. File path is pre-filled → Next
5. **Password**: Leave empty (no password)
6. **Automatically select certificate store** → Next
7. Finish

Or manually:
1. Open `certmgr.msc` (Windows + R)
2. **Personal > Certificates**
3. Right-click → **All Tasks > Import**
4. Browse to `.p12` file and import

#### macOS (Safari, Chrome)

1. Double-click the `.p12` file
2. **Keychain Access** will open
3. Enter your Mac password
4. Certificate appears in **login** keychain
5. Double-click certificate → **Trust** → **Always Trust**

#### Linux (Chrome, Firefox)

**Firefox:**
1. Preferences → Privacy & Security → Certificates → **View Certificates**
2. **Your Certificates** tab → **Import**
3. Select the `.p12` file
4. No password required

**Chrome:**
```bash
# Import to NSS database
pk12util -i employee_name.p12 -d sql:$HOME/.pki/nssdb
```

Or use Chrome settings:
1. Settings → Privacy and Security → Security → **Manage certificates**
2. **Your certificates** → **Import**
3. Select `.p12` file

### 6. Test the Setup

#### Test Certificate Validation

1. **Without certificate (non-2FA account)**:
   - Open admin login in incognito/private mode
   - Enter credentials
   - Expected: Error message "This account requires certificate authentication. Please use an authorized workstation."

2. **With certificate (non-2FA account)**:
   - Install certificate in browser
   - Open admin login
   - Browser should prompt to select certificate
   - Enter credentials
   - Expected: Successful login

3. **With 2FA enabled**:
   - No certificate needed
   - Login works from any location
   - Still prompted for 2FA code

#### Check Certificate Info in Apache

Create a test PHP file:

```php
<?php
// test_cert.php in admin-dev directory
echo '<pre>';
echo 'SSL_CLIENT_VERIFY: ' . ($_SERVER['SSL_CLIENT_VERIFY'] ?? 'NOT SET') . "\n";
echo 'SSL_CLIENT_S_DN: ' . ($_SERVER['SSL_CLIENT_S_DN'] ?? 'NOT SET') . "\n";
echo 'SSL_CLIENT_I_DN: ' . ($_SERVER['SSL_CLIENT_I_DN'] ?? 'NOT SET') . "\n";
echo 'SSL_CLIENT_V_START: ' . ($_SERVER['SSL_CLIENT_V_START'] ?? 'NOT SET') . "\n";
echo 'SSL_CLIENT_V_END: ' . ($_SERVER['SSL_CLIENT_V_END'] ?? 'NOT SET') . "\n";
echo '</pre>';
```

Access: `https://yoursite.com/admin-dev/test_cert.php`

Expected output with certificate:
```
SSL_CLIENT_VERIFY: SUCCESS
SSL_CLIENT_S_DN: /C=NL/ST=Noord-Brabant/L=Eindhoven/O=Moderne Smid BV/OU=Employees/CN=John Doe/emailAddress=john@modernesmid.nl
SSL_CLIENT_I_DN: /C=NL/ST=Noord-Brabant/L=Eindhoven/O=Moderne Smid BV/OU=IT Department/CN=Moderne Smid Employee CA
SSL_CLIENT_V_START: Jan 1 12:00:00 2025 GMT
SSL_CLIENT_V_END: Jan 1 12:00:00 2026 GMT
```

#### View Logs

In PrestaShop admin:
1. Go to **Moderne Smid > Certificate Auth**
2. Click **View Login Logs**
3. See all certificate authentication attempts (success/failure, IP, timestamp)

Or query directly:

```sql
SELECT * FROM ps_employee_certificate_auth_log
ORDER BY date_add DESC
LIMIT 50;
```

## Troubleshooting

### "Certificate authentication required" error even with certificate installed

**Possible causes:**

1. **Certificate not sent by browser**
   - Check browser certificate settings
   - Ensure certificate is installed in correct location
   - Browser may need restart after import

2. **Apache not passing certificate to PHP**
   ```bash
   # Check Apache config
   apachectl -t -D DUMP_VHOSTS

   # Verify SSL module loaded
   apache2ctl -M | grep ssl
   ```
   - Add `SSLOptions +StdEnvVars` to your admin `<Location>` block

3. **Certificate expired**
   ```bash
   # Check certificate validity
   openssl x509 -in certificate.crt -noout -dates
   ```

4. **Wrong CA certificate**
   - Ensure `SSLCACertificateFile` points to correct CA
   - Verify client certificate was signed by this CA:
   ```bash
   openssl verify -CAfile ca.crt client.crt
   ```

### Cannot access admin at all

1. **Temporary disable in code**: Edit `AdminLoginController.php` override and comment out certificate check
2. **Check Apache error logs**:
   ```bash
   tail -f /var/log/apache2/error.log
   ```
3. **Set Apache to optional**: Change `SSLVerifyClient require` to `optional`

### Browser not prompting for certificate

1. **Check Apache config**: Ensure `SSLVerifyClient optional` (or `require`) is set
2. **Certificate not in browser**: Re-import `.p12` file
3. **Wrong certificate store**: Ensure imported to "Personal" (Windows) or "login" (Mac)

### 2FA users still asked for certificate

Check database:
```sql
SELECT e.id_employee, e.email, ge.secret
FROM ps_employee e
LEFT JOIN ps_gauth_employee ge ON e.id_employee = ge.id_employee
WHERE e.email = 'user@example.com';
```

If `secret` is NULL or empty, 2FA is not configured for this user.

## Security Best Practices / Beveiligingsrichtlijnen

1. **Store CA private key on encrypted USB stick (mandatory / verplicht)**
   - Generate CA on USB / Genereer CA op USB: `cd /media/usb/ && ./generate_certificates.sh --init`
   - Keep USB in locked safe when not in use / Bewaar USB in afgesloten kluis wanneer niet in gebruik
   - Only mount when creating new employee certificates / Alleen aansluiten bij aanmaken nieuwe medewerker certificaten
   - Maintain 2-3 encrypted backup copies in separate secure locations / Onderhoud 2-3 versleutelde backup kopieën op verschillende veilige locaties
   - Document USB access in security log / Documenteer USB toegang in beveiligingslogboek
   - See "CA Key Storage" section above for detailed setup / Zie "CA Key Storage" sectie hierboven voor gedetailleerde setup

2. **Set short certificate validity / Stel korte certificaat geldigheid in** (e.g., 1 year / bijv. 1 jaar) and rotate regularly / en roteer regelmatig

3. **Revoke compromised certificates / Intrekken gecompromitteerde certificaten**: Implement CRL (Certificate Revocation List) / Implementeer CRL (Certificate Revocation List)
   ```bash
   # Create CRL / Maak CRL aan
   openssl ca -gencrl -keyfile ca.key -cert ca.crt -out crl.pem
   ```
   Add to Apache config / Toevoegen aan Apache config:
   ```apache
   SSLCARevocationFile /path/to/crl.pem
   ```

4. **Monitor logs / Monitor logboeken** regularly via admin panel or direct database queries / regelmatig via admin paneel of directe database queries

5. **Backup certificates / Backup certificaten** securely (encrypted, off-site) / veilig (versleuteld, off-site)

6. **Limit certificate distribution / Beperk certificaat distributie**: Only authorized IT personnel should handle certificates / Alleen geautoriseerd IT personeel mag certificaten behandelen

7. **Employee offboarding / Medewerker uitdiensttreding**: Immediately revoke certificates when employees leave / Trek direct certificaten in wanneer medewerkers vertrekken

8. **Use strong passwords / Gebruik sterke wachtwoorden**: Certificate is "something you have", password is "something you know" / Certificaat is "iets wat je hebt", wachtwoord is "iets wat je weet"

## Advanced Configuration

### Per-Employee Certificate Management

Force specific employee to require certificate regardless of 2FA status:

```sql
INSERT INTO ps_employee_certificate_auth (id_employee, require_certificate)
VALUES (15, 1)
ON DUPLICATE KEY UPDATE require_certificate = 1;
```

### Custom Validation Rules

Edit `CertificateAuthService.php` to add custom validation:

```php
public function validateClientCertificate(): bool
{
    // ... existing checks ...

    // Example: Only allow certificates from specific organizational unit
    if (isset($_SERVER['SSL_CLIENT_S_DN_OU'])) {
        if ($_SERVER['SSL_CLIENT_S_DN_OU'] !== 'Authorized Employees') {
            return false;
        }
    }

    // Example: Check certificate serial number against whitelist
    $allowedSerials = Configuration::get('MSCERT_ALLOWED_SERIALS');
    if ($allowedSerials && isset($_SERVER['SSL_CLIENT_M_SERIAL'])) {
        $serials = explode(',', $allowedSerials);
        if (!in_array($_SERVER['SSL_CLIENT_M_SERIAL'], $serials)) {
            return false;
        }
    }

    return true;
}
```

### IP-Based Restrictions (Extra Layer)

Combine certificate auth with IP whitelist for workplace:

```apache
<Location /admin-dev>
    SSLVerifyClient optional

    # Require certificate OR office IP
    <RequireAny>
        Require expr %{SSL_CLIENT_VERIFY} == 'SUCCESS'
        Require ip 192.168.1.0/24
    </RequireAny>
</Location>
```

## Maintenance

### Renewing Certificates

When certificates expire, regenerate them:

```bash
cd modules/msthemeconfig/cron_scripts/
./generate_certificates.sh --generate "John Doe" "john@modernesmid.nl" "15"
```

Send new `.p12` file to employee to re-import.

### Monitoring

Set up automated monitoring:

```bash
# Check certificates expiring in next 30 days
find certificates/clients -name "*.crt" -exec openssl x509 -checkend 2592000 -noout -in {} \; -print
```

Create cron job to email report:

```bash
0 9 * * 1 /path/to/check_cert_expiry.sh
```

## Support

For issues or questions:
- Check module logs: `var/logs/MsThemeConfig.log`
- Check Apache error logs: `/var/log/apache2/error.log`
- Database logs: `ps_employee_certificate_auth_log` table
- Contact: IT Department - Moderne Smid BV

## Changelog

- **v1.0** (2025-02-23): Initial implementation
  - Certificate-based authentication for non-2FA accounts
  - Automatic detection of Google Authenticator 2FA
  - Admin interface for certificate management
  - Login attempt logging

<?php
/**
 * Certificate-based Authentication Service
 * Provides certificate validation for employee accounts without 2FA
 */

declare(strict_types=1);

namespace MsThemeConfig\Service;

use Db;
use Employee;
use Configuration;

class CertificateAuthService
{
    /**
     * Check if an employee requires certificate authentication
     *
     * @param int $employeeId
     * @return bool
     */
    public function requiresCertificate(int $employeeId): bool
    {
        $sql = 'SELECT require_certificate
                FROM `' . _DB_PREFIX_ . 'employee_certificate_auth`
                WHERE id_employee = ' . (int)$employeeId;

        $result = Db::getInstance()->getValue($sql);

        // If no record exists, check if employee has 2FA enabled
        if ($result === false) {
            return !$this->has2FAEnabled($employeeId);
        }

        return (bool)$result;
    }

    /**
     * Check if employee has 2FA (Google Authenticator) enabled
     *
     * @param int $employeeId
     * @return bool
     */
    public function has2FAEnabled(int $employeeId): bool
    {
        // Check if Google Authenticator module is installed and active
        $gauthEnabled = (bool)Configuration::get('GAUTH_ENABLED');

        if (!$gauthEnabled) {
            return false;
        }

        // Check if this specific employee has 2FA configured
        $sql = 'SELECT secret
                FROM `' . _DB_PREFIX_ . 'gauth_employee`
                WHERE id_employee = ' . (int)$employeeId . '
                AND secret IS NOT NULL
                AND secret != ""';

        $secret = Db::getInstance()->getValue($sql);

        return !empty($secret);
    }

    /**
     * Validate client certificate from Apache environment
     *
     * @return bool
     */
    public function validateClientCertificate(): bool
    {
        // Check if client certificate is present (set by Apache)
        if (!isset($_SERVER['SSL_CLIENT_VERIFY'])) {
            return false;
        }

        // Certificate must be successfully verified
        if ($_SERVER['SSL_CLIENT_VERIFY'] !== 'SUCCESS') {
            return false;
        }

        // Certificate must not be expired
        if (isset($_SERVER['SSL_CLIENT_V_END'])) {
            $endDate = $_SERVER['SSL_CLIENT_V_END'];
            // Format: "Jan 1 12:00:00 2026 GMT"
            $endTimestamp = strtotime($endDate);
            if ($endTimestamp && $endTimestamp < time()) {
                return false;
            }
        }

        // Optionally: validate certificate issuer
        if (isset($_SERVER['SSL_CLIENT_I_DN'])) {
            $expectedIssuer = Configuration::get('MSCERT_AUTH_ISSUER_DN');
            if (!empty($expectedIssuer) && $_SERVER['SSL_CLIENT_I_DN'] !== $expectedIssuer) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get certificate subject name for logging/display
     *
     * @return string|null
     */
    public function getCertificateSubject(): ?string
    {
        return $_SERVER['SSL_CLIENT_S_DN'] ?? null;
    }

    /**
     * Set certificate requirement for an employee
     *
     * @param int $employeeId
     * @param bool $required
     * @return bool
     */
    public function setCertificateRequirement(int $employeeId, bool $required): bool
    {
        // First check if record exists
        $exists = Db::getInstance()->getValue(
            'SELECT id_employee
             FROM `' . _DB_PREFIX_ . 'employee_certificate_auth`
             WHERE id_employee = ' . (int)$employeeId
        );

        if ($exists) {
            return Db::getInstance()->update(
                'employee_certificate_auth',
                ['require_certificate' => (int)$required],
                'id_employee = ' . (int)$employeeId
            );
        } else {
            return Db::getInstance()->insert(
                'employee_certificate_auth',
                [
                    'id_employee' => (int)$employeeId,
                    'require_certificate' => (int)$required
                ]
            );
        }
    }

    /**
     * Get all employees requiring certificate authentication
     *
     * @return array
     */
    public function getEmployeesRequiringCertificate(): array
    {
        $sql = 'SELECT e.id_employee, e.email, e.firstname, e.lastname, eca.require_certificate
                FROM `' . _DB_PREFIX_ . 'employee` e
                LEFT JOIN `' . _DB_PREFIX_ . 'employee_certificate_auth` eca
                    ON e.id_employee = eca.id_employee
                WHERE e.active = 1
                ORDER BY e.lastname, e.firstname';

        $results = Db::getInstance()->executeS($sql);

        if (!$results) {
            return [];
        }

        // Enrich with 2FA status
        foreach ($results as &$row) {
            $row['has_2fa'] = $this->has2FAEnabled((int)$row['id_employee']);

            // If no explicit certificate setting, default based on 2FA
            if ($row['require_certificate'] === null) {
                $row['require_certificate'] = !$row['has_2fa'];
            }
        }

        return $results;
    }

    /**
     * Log certificate authentication attempt
     *
     * @param int $employeeId
     * @param bool $success
     * @param string $ipAddress
     * @return bool
     */
    public function logAuthAttempt(int $employeeId, bool $success, string $ipAddress): bool
    {
        return Db::getInstance()->insert(
            'employee_certificate_auth_log',
            [
                'id_employee' => (int)$employeeId,
                'success' => (int)$success,
                'ip_address' => pSQL($ipAddress),
                'certificate_subject' => pSQL($this->getCertificateSubject() ?? ''),
                'date_add' => date('Y-m-d H:i:s')
            ]
        );
    }
}

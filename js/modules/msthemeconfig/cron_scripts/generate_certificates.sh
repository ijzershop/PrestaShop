#!/bin/bash
# Certificate Generation Script for Employee Authentication
# This script creates a Certificate Authority (CA) and client certificates
# for employee workstation authentication

set -e

# Configuration
CERT_DIR="./certificates"
CA_DIR="$CERT_DIR/ca"
CLIENT_DIR="$CERT_DIR/clients"
DAYS_VALID_CA=3650  # 10 years for CA
DAYS_VALID_CLIENT=365  # 1 year for client certificates
COUNTRY="NL"
STATE="Noord-Brabant"
CITY="Eindhoven"
ORGANIZATION="Moderne Smid BV"
OU="IT Department"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Moderne Smid Certificate Generation Tool ===${NC}\n"

# Create directory structure
mkdir -p "$CA_DIR"
mkdir -p "$CLIENT_DIR"

# Function to generate CA if it doesn't exist
generate_ca() {
    if [ -f "$CA_DIR/ca.key" ] && [ -f "$CA_DIR/ca.crt" ]; then
        echo -e "${YELLOW}CA certificate already exists. Skipping CA generation.${NC}"
        return 0
    fi

    echo -e "${GREEN}Generating Certificate Authority (CA)...${NC}"

    # Generate CA private key
    openssl genrsa -out "$CA_DIR/ca.key" 4096

    # Generate CA certificate
    openssl req -new -x509 -days $DAYS_VALID_CA -key "$CA_DIR/ca.key" \
        -out "$CA_DIR/ca.crt" \
        -subj "/C=$COUNTRY/ST=$STATE/L=$CITY/O=$ORGANIZATION/OU=$OU/CN=Moderne Smid Employee CA"

    echo -e "${GREEN}CA certificate generated successfully!${NC}"
    echo -e "CA Certificate: $CA_DIR/ca.crt"
    echo -e "CA Key: $CA_DIR/ca.key (${RED}KEEP THIS SECURE!${NC})\n"
}

# Function to generate client certificate
generate_client_cert() {
    local employee_name="$1"
    local employee_email="$2"
    local employee_id="$3"

    if [ -z "$employee_name" ]; then
        echo -e "${RED}Error: Employee name is required${NC}"
        return 1
    fi

    # Sanitize filename
    local safe_name=$(echo "$employee_name" | tr ' ' '_' | tr '[:upper:]' '[:lower:]')
    local cert_name="${safe_name}_${employee_id}"

    echo -e "${GREEN}Generating client certificate for: $employee_name${NC}"

    # Generate client private key
    openssl genrsa -out "$CLIENT_DIR/${cert_name}.key" 2048

    # Generate certificate signing request (CSR)
    local subject="/C=$COUNTRY/ST=$STATE/L=$CITY/O=$ORGANIZATION/OU=Employees/CN=$employee_name"
    if [ -n "$employee_email" ]; then
        subject="$subject/emailAddress=$employee_email"
    fi

    openssl req -new -key "$CLIENT_DIR/${cert_name}.key" \
        -out "$CLIENT_DIR/${cert_name}.csr" \
        -subj "$subject"

    # Sign the certificate with CA
    openssl x509 -req -days $DAYS_VALID_CLIENT \
        -in "$CLIENT_DIR/${cert_name}.csr" \
        -CA "$CA_DIR/ca.crt" \
        -CAkey "$CA_DIR/ca.key" \
        -CAcreateserial \
        -out "$CLIENT_DIR/${cert_name}.crt"

    # Create PKCS#12 format for easy import (includes private key + certificate)
    openssl pkcs12 -export \
        -out "$CLIENT_DIR/${cert_name}.p12" \
        -inkey "$CLIENT_DIR/${cert_name}.key" \
        -in "$CLIENT_DIR/${cert_name}.crt" \
        -certfile "$CA_DIR/ca.crt" \
        -passout pass:

    # Create combined PEM file
    cat "$CLIENT_DIR/${cert_name}.crt" "$CLIENT_DIR/${cert_name}.key" > "$CLIENT_DIR/${cert_name}.pem"

    # Clean up CSR
    rm "$CLIENT_DIR/${cert_name}.csr"

    echo -e "${GREEN}Certificate generated successfully!${NC}"
    echo -e "Certificate: $CLIENT_DIR/${cert_name}.crt"
    echo -e "Private Key: $CLIENT_DIR/${cert_name}.key"
    echo -e "Combined PEM: $CLIENT_DIR/${cert_name}.pem"
    echo -e "PKCS#12 (for browser): $CLIENT_DIR/${cert_name}.p12 (no password)\n"
}

# Function to show certificate info
show_cert_info() {
    local cert_file="$1"

    if [ ! -f "$cert_file" ]; then
        echo -e "${RED}Certificate file not found: $cert_file${NC}"
        return 1
    fi

    echo -e "${GREEN}Certificate Information:${NC}"
    openssl x509 -in "$cert_file" -noout -subject -issuer -dates
    echo ""
}

# Main menu
show_menu() {
    echo -e "${YELLOW}What would you like to do?${NC}"
    echo "1) Generate CA (if not exists)"
    echo "2) Generate client certificate"
    echo "3) Show certificate information"
    echo "4) List all certificates"
    echo "5) Exit"
    echo ""
    read -p "Enter your choice [1-5]: " choice

    case $choice in
        1)
            generate_ca
            ;;
        2)
            read -p "Employee name: " emp_name
            read -p "Employee email: " emp_email
            read -p "Employee ID: " emp_id

            if [ ! -f "$CA_DIR/ca.key" ]; then
                echo -e "${YELLOW}CA not found. Generating CA first...${NC}"
                generate_ca
            fi

            generate_client_cert "$emp_name" "$emp_email" "$emp_id"
            ;;
        3)
            read -p "Certificate file path: " cert_path
            show_cert_info "$cert_path"
            ;;
        4)
            echo -e "${GREEN}CA Certificates:${NC}"
            ls -lh "$CA_DIR"/*.crt 2>/dev/null || echo "No CA certificates found"
            echo ""
            echo -e "${GREEN}Client Certificates:${NC}"
            ls -lh "$CLIENT_DIR"/*.p12 2>/dev/null || echo "No client certificates found"
            echo ""
            ;;
        5)
            echo -e "${GREEN}Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid choice${NC}"
            ;;
    esac

    echo ""
    show_menu
}

# Check if running with arguments for automation
if [ $# -gt 0 ]; then
    case "$1" in
        --init)
            generate_ca
            ;;
        --generate)
            if [ $# -lt 4 ]; then
                echo -e "${RED}Usage: $0 --generate <name> <email> <id>${NC}"
                exit 1
            fi
            if [ ! -f "$CA_DIR/ca.key" ]; then
                generate_ca
            fi
            generate_client_cert "$2" "$3" "$4"
            ;;
        --info)
            if [ $# -lt 2 ]; then
                echo -e "${RED}Usage: $0 --info <certificate_path>${NC}"
                exit 1
            fi
            show_cert_info "$2"
            ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --init                          Initialize CA"
            echo "  --generate <name> <email> <id>  Generate client certificate"
            echo "  --info <cert_path>              Show certificate information"
            echo "  --help                          Show this help message"
            echo ""
            echo "If no options provided, interactive menu will be displayed."
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
else
    # Interactive mode
    show_menu
fi

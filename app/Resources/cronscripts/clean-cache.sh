#!/bin/bash
set -euo pipefail
SCRIPT_SOURCE="$(readlink -f -- "${BASH_SOURCE[0]}")"
source "$(dirname "$SCRIPT_SOURCE")/shop-root.sh"
SHOP_ROOT="$(modernesmid_cron_shop_root)"
LOGS="$(modernesmid_cron_runtime_path "$SHOP_ROOT" var/logs)"
if [ -d "$LOGS" ]; then
  rm -f -- "$LOGS"/*_exception.log "$LOGS/dev.log" "$LOGS/prod.log"
fi

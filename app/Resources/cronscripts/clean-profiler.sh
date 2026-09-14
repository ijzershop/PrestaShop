#!/bin/bash
set -euo pipefail
SCRIPT_SOURCE="$(readlink -f -- "${BASH_SOURCE[0]}")"
source "$(dirname "$SCRIPT_SOURCE")/shop-root.sh"
SHOP_ROOT="$(modernesmid_cron_shop_root)"
PROFILER="$(modernesmid_cron_runtime_path "$SHOP_ROOT" var/cache/dev/profiler)"
if [ -d "$PROFILER" ]; then
  rm -rf -- "$PROFILER"/*
fi

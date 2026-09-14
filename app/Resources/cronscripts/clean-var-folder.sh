#!/bin/bash
set -euo pipefail
SCRIPT_SOURCE="$(readlink -f -- "${BASH_SOURCE[0]}")"
source "$(dirname "$SCRIPT_SOURCE")/shop-root.sh"
SHOP_ROOT="$(modernesmid_cron_shop_root)"
# Validate both destinations before removing anything.
LOGS="$(modernesmid_cron_runtime_path "$SHOP_ROOT" var/logs)"
PROFILER="$(modernesmid_cron_runtime_path "$SHOP_ROOT" var/cache/dev/profiler)"
if [ -d "$LOGS" ]; then
  rm -f -- "$LOGS"/*_exception.log "$LOGS/dev.log"
fi
if [ -d "$PROFILER" ]; then
  rm -rf -- "$PROFILER"/*
fi

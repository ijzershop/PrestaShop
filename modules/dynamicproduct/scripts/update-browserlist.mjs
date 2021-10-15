#!/usr/bin/env zx

await $`npm_config_yes=true npx browserslist@latest --update-db`;
await $`git commit -m "Update browserslist" yarn.lock || true`;

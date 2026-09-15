# Repository layout rules

## Source of truth

- Keep the parent `bare-presta` repository as close to upstream PrestaShop as possible.
- Put all custom modules, themes, overrides, mail templates, scripts, documentation, and related tests in `external/modernesmid_webshop`.
- Always edit custom code through its canonical path below `external/modernesmid_webshop`. Never edit it through a deployed symlink or Windows junction.
- In particular, `js/modules/*` is not a customization source or deployment destination.

## Deployment links

- Create and refresh runtime links only with `external/modernesmid_webshop/scripts/install.ps1` on Windows or the corresponding external install script for the active platform.
- The installer maps external sources such as `module/*` to their PrestaShop runtime paths such as `modules/*`.
- Do not manually copy, move, restore, clean, or recursively delete a linked runtime path. Resolve and verify every link target before changing the link itself.

## Git workflow

- Check `git rev-parse --show-toplevel` before editing, staging, committing, or pushing.
- Commit and push customization changes in `external/modernesmid_webshop` first.
- In the parent repository, commit only deliberate upstream/core changes, repository instructions, deployment metadata, and the intended external submodule pointer.
- Never run `git add -A`, `git restore`, `git clean`, or recursive removal from the deployed parent checkout without first excluding and verifying all symlinks and junctions.
- Inspect the status of the parent and external repositories separately before every commit.

## Local verification and user review

- Functional customization work is not ready for review until it is available in the local PrestaShop runtime through the external install script.
- After deploying source changes, run required module upgrades and targeted cache refreshes before asking the user to test.
- Verify the source commit, deployed link target, installed module version or schema, and the exact affected Back Office or storefront route.
- Give the user concise steps describing where and how to test the behavior locally.
- Respect any explicit review gate: when the user wants to test or inspect first, do not push the pending change until they have had that opportunity.
- A document committed below `docs/` is not an online wiki publication. Publish through the separate wiki repository and verify its remote commit and rendered navigation before reporting it online.

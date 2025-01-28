# Changelog

All notable changes to this project will be documented in this file.


## [1.26] - 2024-01-30
### Added
- System for disabling/enabling ps_accounts module Back Office login override

### Changed
- Call indirectly serialize functions to appease the Addons validator - the current module DB structure depends on them, and removing them would break compatibility with all current users

### Fixed
- Authenticator accounts list filters


## [1.25.2] - 2024-01-13
### Added
- French translation

### Fixed
- Minor corrections for module validator

## [1.25.1] - 2023-12-04
### Fixed
- Corrected Spanish translation

## [1.25] - 2023-05-09
### Added
- support for Prestashop 8
- more compatibility checks during install and usage

## Changed
- use AdminLogin hooks instead of override in latest versions
- use Prestashop built-in QR Code libraries instead of custom one
- code clean-up

### Removed
- deprecated support for Prestashop 1.5


## [1.23.2] - 2023-04-30
### Fixed
- Minor incompatibility with some major Prestashop version upgrades

## [1.23.1] - 2021-08-01
### Fixed
- Made Admin Controller error strings translatable

## [1.23] - 2021-03-24
### Added
- Disabled overrides warning

## [1.22] - 2018-07-18
### Fixed
- QRcode scan bug on some devices
- Disabled module BO login showed gauth field on PS 1.7 (requires module uninstall and reinstall)

## [1.21] - 2018-05-21
### Added
- Support for Prestashop 1.7
- Warning on module's config when module is disabled

### Fixed
- Bug where an account's protection could get enabled before completing the token verification

## [1.20] - 2017-06-05
### Added
- Recovery code system

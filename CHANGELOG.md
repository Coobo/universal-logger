# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.4-a] - 2019-05-21

### Added

- Testing environment now output all logs to a silent Console (nothing shows on test reports);
- The logger now outputs the expressLogger in order to keep version compatible across spendfy apps.

### Changed

- Updated winston-daily-rotate-file;
- Updated winston-mongodb;
- Updated yn.

## [0.0.3-alpha] - 2019-02-11

### Added

- Automated test for all environments

### Changed

- Development SQL Logger no longer transports to FILE

[unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/0.0.4-alpha...HEAD
[0.0.4-alpha]: https://github.com/olivierlacan/keep-a-changelog/compare/0.0.3-alpha...0.0.4-alpha
[0.0.3-alpha]: https://github.com/olivierlacan/keep-a-changelog/compare/0.0.3-alpha...0.0.3-alpha


# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.0] - 2025-05-03

### Added
- Added About page information
- Added styling to all pages
- Added Dashboard page, which includes an interface for sending data to a chosen neural network and a history component of past inputs
  - Added requests via fetch to neural network IP address
- Added Marketplace page
- Added neural network model storage and hosting via Google Artifact Registry API, Kubernetes API and back4app
  - Added backend to interact with APIs
- Added neural network upload form with several fields including model name, endpoint, and input types

### Changed
- Changed identifier to become marketplace
- Changed default auth page to be `/auth/register`

### Fixed
- Fixed logout button not triggering page refresh

## [0.3.0] - 2025-04-02
 
### Added
- Added authentication via Parse and back4app
- Added protected routes
 
### Changed
- Changed identifier to be a protected route
- Changed auth page to include additional button to home

### Fixed

 
## [0.2.0] - 2025-03-06
 
### Added
- Added database via back4app
- Added routing
 
### Changed
- Changed services to use Parse
 
### Fixed
 
## [0.1.0] - 2017-02-20
 
### Added
- Created initial project structure
- Created multiple components
- Created custom service

### Changed

### Fixed

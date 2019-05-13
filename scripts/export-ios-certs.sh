#!/bin/bash

set -euo pipefail

mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
uuid=`grep UUID -A1 -a certs/salsita.mobileprovision | grep -io "[-A-F0-9]\{36\}"`
cp certs/salsita.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/$uuid.mobileprovision

security create-keychain -p 'circleci' circleci.keychain
security set-keychain-settings circleci.keychain
security unlock-keychain -p 'circleci' circleci.keychain
security import certs/salsita.p12  -k circleci.keychain -P "$IOS_P12_PASS" -T /usr/bin/codesign -T /usr/bin/security
security default-keychain -s circleci.keychain
security set-key-partition-list -S apple-tool:,apple:,codesign:,security: -s -k 'circleci' circleci.keychain
security find-identity

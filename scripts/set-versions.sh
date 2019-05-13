#!/bin/bash

set -euo pipefail

VERSION=""
PACKAGE_VERSION=$( jq -r '.version' < package.json )

if [[ "$CIRCLE_BRANCH" = 'master' ]] ; then
  export VERSION="${PACKAGE_VERSION}"
else
  export VERSION="${PACKAGE_VERSION}-${CIRCLE_BRANCH}"
fi

# CCI_BUILD_NUM e.g. 123
# VERSION e.g. 0.8.3-dev

/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $CIRCLE_BUILD_NUM" cordova/platforms/ios/SalsitaMeetupApp/SalsitaMeetupApp-Info.plist
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $VERSION" cordova/platforms/ios/SalsitaMeetupApp/SalsitaMeetupApp-Info.plist

gsed -i "s|version=\"[0-9]+\.[0-9]+\.[0-9]+\"|version=\"$VERSION\"|" cordova/config.xml

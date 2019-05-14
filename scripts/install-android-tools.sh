#!/bin/bash

set -euo pipefail

if [[ -d ~/.android ]] && [[ -d ~/.gradle ]] ; then
  echo "Android SDK restored from cache"
  exit 0
  else
  ls -la ~/
fi

. ./android-tools-versions.env

cd ~
mkdir .android
cd .android
touch repositories.cfg
curl -s https://dl.google.com/android/repository/$CURRENT > tools.zip
curl -L -s https://dl.google.com/android/repository/platform-tools-latest-darwin.zip > platform-tools.zip
unzip tools.zip &> /dev/null
unzip platform-tools.zip &> /dev/null
rm platform-tools.zip tools.zip
echo y | ./tools/bin/sdkmanager "$PLATFORM"
echo y | ./tools/bin/sdkmanager "$BUILD_TOOLS"

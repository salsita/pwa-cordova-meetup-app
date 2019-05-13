#!/bin/bash

set -euo pipefail

export PATH="$HOME/.android/tools:$HOME/.android/platform-tools:$PATH"
export ANDROID_HOME="$HOME/.android"

. ./android-tools-versions.env

if [[ -d ~/.android ]] && [[ -d ~/.gradle ]] ; then
  echo "Android SDK restored from cache"
else
  cd ~
  mkdir .android
  cd .android
  touch repositories.cfg
  curl -s https://dl.google.com/android/repository/$CURRENT > tools.zip
  curl -L -s https://dl.google.com/android/repository/platform-tools-latest-darwin.zip > platform-tools.zip
  unzip tools.zip > /dev/null
  unzip platform-tools.zip > /dev/null
  rm platform-tools.zip tools.zip
  echo y | ./tools/bin/sdkmanager "$PLATFORM"
  echo y | ./tools/bin/sdkmanager "$BUILD_TOOLS"
fi

cd /Users/distiller/app/cordova
cordova build android --release --buildConfig build-android.json -- --versionCode="$CIRCLE_BUILD_NUM"

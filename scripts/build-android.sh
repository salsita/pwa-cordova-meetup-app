#!/bin/bash

set -euo pipefail

export PATH="$HOME/.android/tools:$HOME/.android/platform-tools:$HOME/.gradle/gradle/bin:$PATH"
export ANDROID_HOME="$HOME/.android"

cd /Users/distiller/app/cordova
cordova build android --release --buildConfig build-android.json -- --versionCode="$CIRCLE_BUILD_NUM"

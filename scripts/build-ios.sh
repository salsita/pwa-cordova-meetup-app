#!/bin/bash

cd cordova
cordova build ios \
  --release \
  --device \
  --buildConfig build-ios.json

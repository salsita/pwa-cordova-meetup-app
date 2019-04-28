#!/bin/bash
set -e

function build_one {
  echo Building $1 ...
  cd $1
  npm run build
  echo "... done"
  echo ""
  cd ..
}

build_one client
build_one server

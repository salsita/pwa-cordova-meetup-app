#!/bin/bash
set -e

function install_one {
  echo Installing packages in $1 ...
  cd $1
  npm install
  echo "... done"
  echo ""
  cd ..
}

install_one client
install_one server

#!/bin/sh

echo "Run tests"
BROWSER=$BROWSER PS_VERSION=$PS_VERSION TEST_PATH=$TEST_PATH npm run $COMMAND

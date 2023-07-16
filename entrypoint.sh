#!/bin/sh -l

set -e

cd /slack-blot


npm run build

node ./dist/index.js
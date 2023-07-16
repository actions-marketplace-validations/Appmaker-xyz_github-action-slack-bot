#!/bin/sh -l

cd /slack-blot

npm run build

node ./dist/index.js
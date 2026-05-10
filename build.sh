#!/bin/bash

rm -rf output
mkdir output

rsync -av \
  --exclude='output' \
  --exclude='node_modules' \
  --exclude='.git' \
  . output/

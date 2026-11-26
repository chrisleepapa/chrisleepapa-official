#!/usr/bin/env bash
set -euo pipefail

mkdir -p dist
cp -- ./*.html ads.txt manifest.json robots.txt sitemap.xml sw.js dist/
cp -R -- assets components css images js dist/

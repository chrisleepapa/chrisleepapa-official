#!/usr/bin/env bash
set -euo pipefail

mkdir -p dist
cp -- ./*.html ads.txt manifest.json robots.txt sitemap.xml sw.js dist/
cp -R -- assets components css images js dist/

./node_modules/.bin/esbuild src/premiere.jsx --bundle --minify --outfile=dist/js/premiere.js

./node_modules/.bin/esbuild src/home-hub.jsx --bundle --minify --outfile=dist/js/home-hub.js

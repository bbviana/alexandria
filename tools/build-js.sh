#!/usr/bin/env bash

#cria diretorio de output caso não exista
mkdir -p ${npm_package_config_scripts_dest}

browserify ${npm_package_config_scripts_src}/main.jsx \
-o ${npm_package_config_scripts_dest}/bundle.js \
--extension=jsx \
-p [minifyify --compressPath . --no-map]

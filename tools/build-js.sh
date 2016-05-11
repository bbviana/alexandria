#!/usr/bin/env bash

#cria diretorio de output caso não exista
mkdir -p ${npm_package_config_client_bundle_dest}

browserify ${npm_package_config_client_main_src} \
-o ${npm_package_config_client_bundle_dest}/bundle.js \
--extension=jsx \
-p [minifyify --compressPath . --no-map]

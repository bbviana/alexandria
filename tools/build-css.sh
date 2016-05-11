#!/usr/bin/env bash

#cria diretorio de output caso não exista
mkdir -p ${npm_package_config_client_styles_dest}

rm -f ${npm_package_config_client_styles_dest}/*

find ${npm_package_config_client_styles_src} -type f -name "*.css" \
-exec cp {} ./${npm_package_config_client_styles_dest} \;

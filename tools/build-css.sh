#!/usr/bin/env bash

#cria diretorio de output caso não exista
mkdir -p ${npm_package_config_styles_dest}

rm -f ${npm_package_config_styles_dest}/*

find ${npm_package_config_styles_src} -name "*.css" -type f -exec cp {} ./${npm_package_config_styles_dest} \;

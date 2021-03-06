#!/usr/bin/env bash

#cria diretorio de output caso não exista
#mkdir -p ${npm_package_config_client_main_src}

watchify ${npm_package_config_client_main_src} \
--outfile ${npm_package_config_client_bundle_dest}/bundle.js \
--verbose \
--debug \
--extension=jsx \
--poll

# --poll é importante se não o watchify para de recarregar depois de alguns saves, principalmente se o intervalo entre
# um e outro for curto
# Há uma discussão aqui https://github.com/substack/watchify/issues/205

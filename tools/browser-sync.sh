#!/usr/bin/env bash

# delay é importante para esperar o watchify terminar
browser-sync start \
--reload-delay 1500 \
--no-open \
--logLevel info \
--proxy localhost:8000 \
--no-notify \
--files "$npm_package_config_client_styles_dest/*.css, $npm_package_config_client_bundle_dest/*.js"

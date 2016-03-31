#!/usr/bin/env bash

#browser-sync start --reload-delay 200 --no-open \
#--server ${npm_package_config_webapp_dest} \
#--files "$npm_package_config_styles_dest/*.css, $npm_package_config_scripts_dest/*.js" \
#--index index.html


# delay é importante para esperar o watchify terminar
browser-sync start \
--reload-delay 2000 \
--no-open \
--logLevel info \
--proxy localhost:8000 \
--files "$npm_package_config_styles_dest/*.css, $npm_package_config_scripts_dest/*.js"

#!/usr/bin/env bash
# delay é importante para esperar o watchify terminar
browser-sync start --reload-delay 200 --no-open \
--server ${npm_package_config_webapp_dest} \
--files "$npm_package_config_styles_dest/*.css, $npm_package_config_scripts_dest/*.js" \
--index index.html


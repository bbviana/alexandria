#!/usr/bin/env bash

nodemon \
--watch ${npm_package_config_client_styles_src} \
--ext css \
--exec 'npm run build:css'
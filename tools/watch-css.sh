#!/usr/bin/env bash

nodemon \
--watch ${npm_package_config_views_styles_src} \
--ext css \
--exec 'npm run build:css'
#!/usr/bin/env bash

nodemon server/index.js \
--watch ${npm_package_config_server_dest}


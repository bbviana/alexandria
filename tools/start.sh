#!/usr/bin/env bash

#--debug-brk=7000 \

nodemon \
--watch ${npm_package_config_server_dest} \
server/index.js


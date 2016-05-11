#!/usr/bin/env bash

#--debug-brk=7000 \

nodemon --watch ${npm_package_config_server_dir} ${npm_package_config_server}

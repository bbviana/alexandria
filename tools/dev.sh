#!/usr/bin/env bash

parallelshell 'npm start' 'npm run watch' 'npm run browser-sync'

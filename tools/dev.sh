#!/usr/bin/env bash
parallelshell 'npm run watch' 'npm run browser-sync' 'npm start'

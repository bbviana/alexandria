#!/usr/bin/env bash

process.env.NODE_ENV = 'test'

#jest
mocha --compilers js:babel-core/register $1
#mocha $1

#!/usr/bin/env bash

#jest
mocha --compilers js:babel-core/register $1
#mocha $1

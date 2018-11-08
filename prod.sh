#!/bin/bash

yarn unlink @textactor/domain

yarn upgrade --latest

yarn add @textactor/domain

yarn test

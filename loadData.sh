#!/bin/bash

cd data-loader;

docker build -t data-loader ./;

docker run --link gunsnfun_elastic_1:elastic data-loader;


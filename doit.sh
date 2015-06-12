#!/bin/bash

boot2docker up;

docker-compose -f services.yml up -d;

docker-compose up web

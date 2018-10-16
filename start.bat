@ECHO OFF

docker-compose -f services.yml up -d && docker-compose up -d web
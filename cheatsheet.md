# Docker Cheat Sheet

### Managing docker images

Stop all docker containers

`docker stop $(docker ps -a -q)`

Remove all docker containers 
`docker rm $(docker ps -a -q)`

Remove all docker images
`docker rmi $(docker images -q)`

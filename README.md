# SpredShot

SpredShot is an online marketplace for guns.

## Installation

1. `docker-compose build`

2. `docker-compose -f services.yml up -d` (service layer first)

3. `docker-compose up -d web`

## Usage

The server is configured to run on port 3069.

## Storage

Storage is handled through named volumes in docker.  The data directory in the containers that need persistent storage is mapped out to a directory in the host OS.  This is similar to the data containers that used to be best practice, however, it does not need an actual container definition.  Named volumes can be managed with the "docker volume" command and will not be wiped even with a --force-recreate flag from docker-compose.

Data management

* Named volumes survive all container restarts, recreates, apocalypses.
* You can view current volumes and where they are being stored with "docker volume ls".
* To access the raw data via mac/windows you must "docker-machine ssh default", then "sudo su", then go to the directory listed with "docker volume ls".
* To wipe a volume you must REMOVE the container currently using it. You can then use "docker volume rm <volume_name>"

## History

Just some good ol' boys tryin to make a difference...and buy some shit.

## Credits

Brent Mills
Bryson Reynolds

## License

I am the law bitch!


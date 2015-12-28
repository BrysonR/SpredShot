# SpredShot

SpredShot is an online marketplace for guns.

## Installation

1. `docker-compose build`

2. `docker-compose -f services.yml up -d` (service layer first)

3. `docker-compose up -d web`

## Usage

The server is configured to run on port 3069.

## Transient vs persistent storage

There are situations where we need to persist data such as production and when we don't such as in testing.  2 separate files exist to manage this.  Right now they are on the same ports so you can't run both together.  The best way to handle this is to use the persistent storage config and delete data containers as needed.

* Persistent storage
Storage is handled in data containers.  As long as we don't ever change the configs docker will always bring up the same one with all our data.  If you need to wipe the data just delete the appropriate data container and it will be recreated on next startup.
docker-compose -f services-persistent.yml up -d

* Transient storage
All storage is handled within the container so we need to tell docker to not reuse the containers.
docker-compose -f services-transient.yml up -d --force-recreate

## History

Just some good ol' boys tryin to make a difference...and buy some shit.

## Credits

Brent Mills
Bryson Reynolds

## License

I am the law bitch!


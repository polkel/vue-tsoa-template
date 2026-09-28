# Local Postgres Database

This docker compose file provides a local postgres instance to help with development. You'll need
docker and docker-compose to be able to use it.

The compose file includes a named volume, so the database persists even when the container isn't
running.

To initialize it, you'll need to use the shell script in this directory. This is because it is using
the same `.env` file defined in the `/packages/backend` directory.

Docker compose does not allow interpolation of variables when it `env_file` is defined within it. So
the env file path has to be passed it on the cli command. Alternately, you can do this yourself if
you want to define your `.env` file elsewhere.

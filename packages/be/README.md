# Todo

Todo backend part. A Node.js server with Express and SQLite.

## Serve via Docker

Build image for server container defined in `Dockerfile` with

```sh
docker build -t todo .
```

then create and run container, to serve it at a given port, say `4004`, with

```sh
docker run --name todo -p 4004:3001 -d todo
```

or use

```sh
docker run --restart unless-stopped --name todo -p 4004:3001 -d todo
```

to have it always running unless stopped.

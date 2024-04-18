# Rest api application

## Requirements
- Node.js
- NPM
- Docker compose as docker-compose-plugin

## Setting up
development.env file with the following content:
```env
PORT=8080
POSTGRES_DB=dbname
POSTGRES_USER=user
POSTGRES_PASSWORD=password
```

## Start local (development mode)
```bash
npm run local
```

## Client documentation
Read the [client documentation](client/README.md)

## Server documentation
Read the [server documentation](server/README.md)

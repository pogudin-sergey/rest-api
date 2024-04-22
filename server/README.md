# Server

## Configuration
Create a `.env` file in the root of the project with the following content:
```env
PORT=8080
POSTGRES_DB=auto
POSTGRES_USER=user1
POSTGRES_PASSWORD=pass1
MONGODB_URI=mongodb://mongo:27017/auto
MONGODB_DBNAME=optimacros
MONGODB_COLLECTION=auto
LOG_LEVEL='debug'
```

## Install
```bash
npm ci
```

## Run development
```bash
npm start
```

## Run tests
Databases must be started first. Redad the [README.md](../README.md) file for more information.

```bash
npm run test
```

## Rest api
| Method | Endpoint      | Post params                     | Description                          |
|--------|---------------|---------------------------------|--------------------------------------|
| POST   | /api/auth     | username<br>password            | Logs in and returns the Bearer token |
| POST   | /api/auto     | brand<br>model<br>year<br>price | Adds a car                           |
| DELETE | /api/auto/:id |                                 | Deletes a car by ID                  |
| PUT    | /api/auto/:id | brand<br>model<br>year<br>price | Updates the car by ID                |
| GET    | /api/auto/:id |                                 | Returns an auto by ID                |
| GET    | /api/auto     |                                 | Returns an sorted list of cars       |

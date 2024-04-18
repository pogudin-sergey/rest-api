# Server

## Configuration
Create a `.env` file in the root of the project with the following content:
```env
PORT=8080
```

## Install
```bash
npm ci
```

## Run product
```bash
npm start
```

## Run development
```bash
npm run dev
```

## Run tests
```bash
npm test
```

## Rest api
| Method | Endpoint      | Post params                     | Description                          |
|--------|---------------|---------------------------------|--------------------------------------|
| POST   | /api/auth     | username<br>password            | Logs in and returns the Bearer token |
| POST   | /api/auto     | brand<br>model<br>year<br>price | Adds a car by ID                     |
| DELETE | /api/auto/:id |                                 | Deletes a car by ID                  |
| PUT    | /api/auto/:id | brand<br>model<br>year<br>price | Updates the car by ID                |
| GET    | /api/auto/:id |                                 | Get an auto by ID                    |
| GET    | /api/auto     |                                 | Returns a sorted list of cars        |

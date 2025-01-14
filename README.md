# System rezerwacji sal konferencyjnych

## Requirements

- Python 3.12
- npm
- docker compose

## Setup

```shell
git clone github.com/rikardoricz/conference-room-booking
cd conference-room-booking
```

### ENV variables

Create `.env` files with content given below. Change values to suit your needs.

`./backend/.env`:

```
SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@postgres-db:5432/dbname'
JWT_SECRET_KEY = 'your_jwt_secret_key'
SECRET_KEY = 'secret_key'
POSTGRES_DB = 'dbname'
POSTGRES_USER = 'postgres'
POSTGRES_PASSWORD = 'postgres'
PGADMIN_EMAIL: 'admin@example.com'
PGADMIN_PASSWORD: 'admin'
```

`./backend/app/.env`:

```
SQLALCHEMY_DATABASE_URI="postgresql://postgres:postgres@postgres-db:5432/dbname"
SECRET_KEY="secret_key"
JWT_SECRET_KEY="your_jwt_secret_key"

```

### Backend

```shell
cd backend
docker compose up -d
```

### Frontend

In `./frontend/src/config/apiConfig.js` file update ip addres of server that backend will run on:
```
export const API_BASE_URL = 'http://<server-ip-address>:5000'; 
```

Create free account on [expo.dev](https://expo.dev). Build the app using expo:
```
npm install eas-cli
npx eas login
npx eas build --platform android --profile preview
```
Then use the provided link to download `.apk` file, copy it on your mobile device and install.

 <!-- Download `conf-room-booking.apk` form Releases and run on your mobile device. -->

_Alternatively you can run app on emulator:_

```shell
cd frontend
npm install
npx expo start
```


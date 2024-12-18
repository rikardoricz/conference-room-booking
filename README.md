# System rezerwacji sal konferencyjnych

## Requirements

- Python 3.12
- npm

## Setup

```shell
git clone github.com/rikardoricz/conference-room-booking
cd conference-room-booking
```

### Backend

```shell
cd backend
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
flask run
```

### Frontend

```shell
cd frontend
npm install
npx expo start
```

### Database

Create `.env` file containing env variables used by `compose.yml`:

```yaml
services:
  postgres:
    image: postgres
    container_name: postgres_db
    ports:
      - 5432:5432
    env_file: .env
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin_conf_room
    env_file: .env
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_EMAIL}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_PASSWORD}
    ports:
      - 5050:80
    depends_on:
      - postgres
    restart: unless-stopped

volumes:
  postgres_data:
    driver: local
```

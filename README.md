# Zealthy Help Desk TMS

Full Stack Engineering Exercise

## Dev

To start frontend:

```bash
cd frontend/
npm i
npm run dev
```

To start backend:

```bash
cd backend/
make
```

To setup and run containerized Postgres on Docker:

```bash
cd backend/
docker build -t zealthy-postgres .
docker volume create zealthy-postgres-data
docker run -d --name zealthy-database-server -e POSTGRES_DB=zealthy-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -v zealthy-postgres-data:/var/lib/postgresql/data -p 5432:5432 zealthy-postgres
```

## Prod

### Triggering Deployments

To trigger run deploy script (must be authorized on heroku*):

```bash
chmod 700 ./deploy.sh 
./deploy.sh
```

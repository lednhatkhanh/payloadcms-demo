# Local setup and recovery

## Start the demo

```sh
cp .env.example .env
pnpm install
pnpm db:up
pnpm db:migrate
pnpm seed
pnpm dev
```

Open the public site at `http://localhost:3000` and Payload Admin at `http://localhost:3001/admin`.

## Refresh content after a pull

Run the migrations and idempotent seed. This preserves local form submissions and any other records not owned by the seed.

```sh
pnpm db:migrate
pnpm seed
```

## Start again from a known state

```sh
pnpm db:reseed
```

This command removes the Docker volume named `payload-newsroom_payload_postgres_data`, recreates PostgreSQL, runs every committed migration, and restores the demo content and accounts. It is destructive to all local database records in this project, including form submissions.

If PostgreSQL is not healthy afterward, run `pnpm db:logs` to inspect the database service.

## Lawn Starter Backend

> **📖 Full Project Documentation**: See the [Root README](../README.md) for Docker Compose setup, project overview, and architecture details.

Backend-only Laravel 10 service that:

- Proxies the [swapi.tech](https://swapi.tech) resources listed below.
- Captures latency + resource metrics for every query via events.
- Recomputes aggregated statistics every five minutes through a queued job triggered by the scheduler.

Everything necessary to operate the backend lives inside this directory.

---

## Quick Start

```bash
# Install PHP dependencies inside the Sail PHP 8.2 image (has DOM/XML extensions).
docker run --rm -v /home/raryson/projects/lawn-starter/backend:/app \
  -w /app laravelsail/php82-composer:latest composer install

# Copy environment template and tweak DB / queue credentials as needed.
cp .env.example .env

# Generate the application key (or reuse the existing one from .env).
docker run --rm -v /home/raryson/projects/lawn-starter/backend:/app \
  -w /app laravelsail/php82-composer:latest php artisan key:generate

# Run migrations (creates swapi tables + database queue tables).
docker run --rm -v /home/raryson/projects/lawn-starter/backend:/app \
  -w /app laravelsail/php82-composer:latest php artisan migrate

# Start the HTTP server, queue worker, and scheduler (separate shells).
docker run --rm -p 8000:8000 -v /home/raryson/projects/lawn-starter/backend:/app \
  -w /app laravelsail/php82-composer:latest php artisan serve --host=0.0.0.0 --port=8000
docker run --rm -v /home/raryson/projects/lawn-starter/backend:/app \
  -w /app laravelsail/php82-composer:latest php artisan queue:work database
docker run --rm -v /home/raryson/projects/lawn-starter/backend:/app \
  -w /app laravelsail/php82-composer:latest php artisan schedule:work
```

### Docker Compose Stack

An alternate workflow that bundles the backend, queue worker, scheduler, and MySQL database lives in `infra/docker-compose.yml`. Recommended commands:

```bash
cd /home/raryson/projects/lawn-starter/infra

# Build the PHP 8.5 image + install dependencies
docker compose build backend-app
docker compose run --rm backend-app composer install

# Copy environment & update APP_KEY (only the first time)
cp ../backend/.env.example ../backend/.env
docker compose run --rm backend-app php artisan key:generate

# Bring the stack online (db, app server, queue worker, scheduler)
docker compose up -d

# Run migrations against the MySQL container
docker compose exec backend-app php artisan migrate --force
```

The Compose services expose:

- Backend HTTP API at http://localhost:8000
- Swagger UI at http://localhost:8080
- MySQL on localhost:3306 (credentials match the ones set in the compose file)

Stop everything with `docker compose down` (add `-v` to wipe the MySQL volume).

Key environment variables:

```dotenv
QUEUE_CONNECTION=database   # queue driver used by metrics pipeline
SWAPI_TIMEOUT=10            # request timeout in seconds
DB_CONNECTION=sqlite        # default for local development
```

---

## Request Flow & Metrics Pipeline

1. `GET /api/swapi` validates the requested resource and proxies the call to the mapped SWAPI endpoint.
2. The controller measures request duration and dispatches `SwapiQueryPerformed`.
3. `PersistSwapiQuery` listens to the event and stores the resource + duration in `swapi_queries`.
4. The scheduler dispatches `SwapiStatsRecomputeRequested` every five minutes.
5. `DispatchSwapiStatsComputation` reacts by queueing `ComputeSwapiStats`.
6. `ComputeSwapiStats` aggregates totals, top five resources, average duration, and the most active hour.
7. The resulting snapshot lives in `swapi_stats` and is served by `GET /api/swapi/stats`.

Events & listeners are registered in `App\Providers\EventServiceProvider`. The queue worker **must** be running; otherwise query metrics and stats recomputations will back up in the `jobs` table.

---

## REST Endpoints

| Method | Path             | Description                                                                                             |
|--------|------------------|---------------------------------------------------------------------------------------------------------|
| GET    | `/api/swapi`     | Proxies one of the allowed SWAPI resources. Supports the standard SWAPI query params (`search`, `page`). |
| GET    | `/api/swapi/stats` | Returns the most recently computed metrics snapshot (recomputed every five minutes).                    |

### `/api/swapi` query parameters

| Name     | Type   | Required | Notes                                                                 |
|----------|--------|----------|-----------------------------------------------------------------------|
| resource | string | no       | Defaults to `people`. Must be one of `films`, `people`, `planets`, `species`, `starships`, `vehicles`. |
| search   | string | no       | Forwarded untouched to swapi.tech.                                    |
| page     | int    | no       | Forwarded untouched to swapi.tech.                                    |
| ...      | any    | no       | Any additional key/value pair is forwarded to swapi.tech.             |

Responses are identical to the upstream SWAPI payloads (opaque proxy).

### `/api/swapi/stats` response shape

```json
{
  "computed_at": "2025-11-24T14:25:00Z",
  "metrics": {
    "total_queries": 42,
    "top_resources": [
      { "resource": "people", "count": 20, "percentage": 47.62 }
    ],
    "average_duration_ms": 112.4,
    "popular_hour": "14"
  }
}
```

---

## Swagger / OpenAPI

The OpenAPI contract lives at `docs/openapi.yaml`. Swagger UI is automatically started with `docker compose up` and is available at **http://localhost:8080**.

If you're not using docker-compose, you can run Swagger UI manually:

```bash
# Swagger UI via Docker
docker run --rm -p 8080:8080 \
  -e SWAGGER_JSON=/docs/openapi.yaml \
  -v /home/raryson/projects/lawn-starter/backend/docs:/docs \
  swaggerapi/swagger-ui

# OR Redoc via npx (requires Node >=18)
npx @redocly/cli preview-docs docs/openapi.yaml
```

---

## Testing

Execute the full PHPUnit suite (runs feature tests for both endpoints + stats job):

```bash
docker run --rm -e QUEUE_CONNECTION=sync \
  -v /home/raryson/projects/lawn-starter/backend:/app \
  -w /app laravelsail/php82-composer:latest php artisan test
```

---

## Operational Notes

- This repo is backend-only; no Vite/Blade assets remain.
- The `database` queue driver uses the `jobs` table created by the migrations; rotate or clean it like any other queue-backed service.
- Metrics freshness depends on both the scheduler and queue worker. If stats fall behind, check `jobs` for stuck `ComputeSwapiStats` jobs.
- To reset metrics, truncate `swapi_queries` and `swapi_stats`, then either wait for the next scheduled recomputation or dispatch `SwapiStatsRecomputeRequested` manually via `php artisan tinker`.

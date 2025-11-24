# Lawn Starter

A full-stack application for searching and viewing Star Wars API (SWAPI) data, featuring a Laravel backend and a React frontend.

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Start with Docker Compose](#quick-start-with-docker-compose)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Services](#services)
- [Development](#development)

## 🎯 Overview

Lawn Starter is a modern full-stack application that:

- **Backend**: Laravel 10 API that proxies SWAPI resources, captures metrics, and provides aggregated statistics
- **Frontend**: React 18 application with TypeScript, featuring a search interface for Star Wars data

Both services are containerized and can be run together using Docker Compose.

## 🚀 Quick Start with Docker Compose

The easiest way to run the entire application is using Docker Compose, which sets up all services including the database, backend, frontend, and Swagger UI.

### Prerequisites

- Docker and Docker Compose installed
- Git

### Initial Setup

1. **Clone the repository** (if you haven't already)
   ```bash
   git clone <repository-url>
   cd lawn-starter
   ```

2. **Navigate to the infrastructure directory**
   ```bash
   cd infra
   ```

3. **Build the backend Docker image**
   ```bash
   docker compose build backend-app
   ```

4. **Install backend dependencies**
   ```bash
   docker compose run --rm backend-app composer install
   ```

5. **Set up the backend environment file**
   ```bash
   cp ../backend/.env.example ../backend/.env
   docker compose run --rm backend-app php artisan key:generate
   ```

6. **Start all services**
   ```bash
   docker compose up -d
   ```

7. **Run database migrations**
   ```bash
   docker compose exec backend-app php artisan migrate --force
   ```

### Accessing Services

Once all services are running, you can access:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Swagger UI**: http://localhost:8080
- **MySQL Database**: localhost:3306
  - Database: `lawn`
  - Username: `lawn`
  - Password: `lawn`
  - Root Password: `root`

### Docker Compose Commands

```bash
# Start all services in detached mode
docker compose up -d

# View logs from all services
docker compose logs -f

# View logs from a specific service
docker compose logs -f frontend
docker compose logs -f backend-app

# Stop all services
docker compose down

# Stop services and remove volumes (⚠️ deletes database data)
docker compose down -v

# Rebuild a specific service
docker compose build frontend
docker compose build backend-app

# Rebuild and restart a service
docker compose up -d --build frontend

# Execute commands in a service container
docker compose exec backend-app php artisan migrate
docker compose exec backend-app php artisan tinker
```

### Services Overview

The Docker Compose stack includes:

- **`db`**: MySQL 8.2 database
- **`backend-app`**: Laravel HTTP API server
- **`backend-queue`**: Laravel queue worker for background jobs
- **`backend-scheduler`**: Laravel scheduler for periodic tasks
- **`frontend`**: React frontend application (nginx)
- **`swagger-ui`**: API documentation interface

## 🏗️ Architecture

### Backend

The backend is a Laravel 10 application that:

- Proxies requests to [swapi.tech](https://swapi.tech)
- Captures latency and resource metrics for every query
- Recomputes aggregated statistics every 5 minutes via queued jobs
- Provides REST endpoints for searching SWAPI resources and retrieving stats

**Key Features:**
- Event-driven metrics pipeline
- Database-backed queue system
- Scheduled job processing
- OpenAPI/Swagger documentation

**See the [Backend README](./backend/README.md) for detailed information.**

### Frontend

The frontend is a React 18 application built with:

- **TypeScript** for type safety
- **Vite** for fast development and building
- **TanStack Router** for type-safe routing
- **TanStack Query** for server state management
- **Tailwind CSS** for styling

**Key Features:**
- Feature-based architecture
- Type-safe routing with automatic route generation
- Server state management with automatic caching
- Modern, responsive UI

**See the [Frontend README](./frontend/README.md) for detailed information.**

## 📁 Project Structure

```
lawn-starter/
├── backend/              # Laravel 10 backend application
│   ├── Dockerfile       # Backend container definition
│   ├── README.md        # Backend documentation
│   └── ...
├── frontend/            # React 18 frontend application
│   ├── Dockerfile       # Frontend container definition
│   ├── README.md        # Frontend documentation
│   └── ...
├── infra/               # Infrastructure as code
│   └── docker-compose.yml  # Docker Compose configuration
└── README.md           # This file
```

### Backend Structure

```
backend/
├── app/
│   ├── Http/Controllers/    # API controllers
│   ├── Jobs/                # Queue jobs
│   ├── Events/              # Event classes
│   ├── Listeners/           # Event listeners
│   └── Providers/           # Service providers
├── database/
│   ├── migrations/          # Database migrations
│   └── seeders/             # Database seeders
├── docs/
│   └── openapi.yaml         # OpenAPI specification
├── routes/
│   └── api.php              # API routes
├── Dockerfile               # Container definition
└── README.md                # Detailed backend docs
```

**Highlights:**
- Event-driven architecture for metrics collection
- Database migrations for SWAPI queries and stats tables
- Queue jobs for statistics computation
- OpenAPI documentation

### Frontend Structure

```
frontend/
├── src/
│   ├── features/            # Feature-based modules
│   │   └── search/         # Search feature
│   │       ├── components/  # Feature components
│   │       ├── pages/       # Page components
│   │       └── hooks/       # Custom hooks
│   ├── lib/                 # Shared utilities
│   │   ├── api.ts          # API client
│   │   └── components/     # Shared components
│   ├── routes/              # TanStack Router routes
│   └── main.tsx            # Entry point
├── Dockerfile               # Container definition
└── README.md                # Detailed frontend docs
```

**Highlights:**
- Feature-based organization
- Type-safe routing with TanStack Router
- Centralized API client
- Component co-location pattern

## 🔧 Development

### Backend Development

For detailed backend development instructions, see the [Backend README](./backend/README.md).

**Key commands:**
```bash
cd infra
docker compose exec backend-app php artisan test
docker compose exec backend-app php artisan migrate
docker compose exec backend-app php artisan tinker
```

### Frontend Development

For detailed frontend development instructions, see the [Frontend README](./frontend/README.md).

**Key commands:**
```bash
cd frontend
npm install
npm run dev        # Development server
npm run build      # Production build
npm test           # Run tests
```

### Running Services Individually

You can also run services individually without Docker Compose:

#### Backend (Standalone)

See the [Backend README](./backend/README.md) for standalone setup instructions using Docker or local PHP.

#### Frontend (Standalone)

See the [Frontend README](./frontend/README.md) for standalone development instructions.

**Note:** When running services individually, make sure to configure:
- Frontend API base URL (default: `http://localhost:8000/api`)
- Backend database connection
- Backend environment variables

## 📚 Documentation

- **[Backend README](./backend/README.md)** - Comprehensive backend documentation including:
  - Request flow and metrics pipeline
  - REST endpoints
  - Testing
  - Operational notes

- **[Frontend README](./frontend/README.md)** - Comprehensive frontend documentation including:
  - Architecture and patterns
  - Development workflow
  - Testing strategies
  - Styling guidelines

## 🔗 API Endpoints

### Backend API

- `GET /api/swapi` - Proxy SWAPI requests (supports `resource`, `search`, `page` params)
- `GET /api/swapi/stats` - Get aggregated metrics snapshot

**API Documentation**: Available at http://localhost:8080 (Swagger UI) when running Docker Compose.

See the [Backend README](./backend/README.md) for detailed API documentation.

## 🧪 Testing

### Backend Tests

```bash
cd infra
docker compose exec backend-app php artisan test
```

### Frontend Tests

```bash
cd frontend
npm test              # Watch mode
npm run test:run      # Single run
npm run test:coverage # With coverage
```

## 📝 Notes

- The database persists data in a Docker volume. Use `docker compose down -v` to remove it.
- Backend metrics are recomputed every 5 minutes by the scheduler.
- The queue worker must be running for metrics collection and stats computation to work.
- Frontend is served as static files via nginx in production mode.

## 🤝 Contributing

1. Follow the patterns and structure outlined in each component's README
2. Write tests for new features
3. Ensure all tests pass before submitting
4. Follow the coding standards defined in each component

## 📄 License

[Add your license information here]


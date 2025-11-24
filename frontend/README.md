# Lawn Starter Frontend

A React application built with:
- **React 18** + **TypeScript**
- **Vite** for build tooling
- **TanStack Query** for server state management
- **TanStack Form** for form state management
- **TanStack Router** for routing
- **Tailwind CSS** for styling

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Build

Build for production:

```bash
npm run build
```

### Preview Production Build

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── routes/          # TanStack Router route files
│   │   ├── __root.tsx   # Root layout route
│   │   └── index.tsx    # Home page route
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles with Tailwind
│   └── vite-env.d.ts    # Vite type definitions
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## Features

- **TanStack Query**: Example query setup with automatic caching and refetching
- **TanStack Form**: Example form with validation
- **TanStack Router**: File-based routing with type safety
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

## Adding New Routes

Create new route files in `src/routes/` following TanStack Router conventions:
- `about.tsx` → `/about`
- `posts/$postId.tsx` → `/posts/:postId`

The router will automatically generate the route tree when you run the dev server.


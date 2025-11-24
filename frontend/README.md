# Lawn Starter Frontend

> **📖 Full Project Documentation**: See the [Root README](../README.md) for Docker Compose setup, project overview, and architecture details.

A modern React application built with TypeScript, featuring a feature-based architecture and type-safe routing. This frontend application provides a search interface for Star Wars API (SWAPI) data, allowing users to search for people and films with detailed views.

## 🚀 Tech Stack

### Core Framework
- **React 18** - Modern React with hooks and functional components
- **TypeScript 5.5** - Type-safe development with strict type checking
- **Vite 5.4** - Fast build tool and development server

### State Management & Data Fetching
- **TanStack Query (React Query) 5.59** - Server state management with automatic caching, refetching, and synchronization
- **TanStack Form 1.6** - Performant form state management with validation

### Routing
- **TanStack Router 1.77** - Type-safe, file-based routing with automatic route tree generation
- **TanStack Router Devtools** - Development tools for debugging routes

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework with custom design tokens
- **PostCSS** - CSS processing and transformation
- **Autoprefixer** - Automatic vendor prefixing

### Testing
- **Vitest 4.0** - Fast unit test framework with Vite integration
- **Testing Library** - React component testing utilities
- **jsdom** - DOM environment for testing
- **@vitest/coverage-v8** - Code coverage reporting

### Development Tools
- **ESLint** - Code linting with TypeScript support
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📁 Project Structure

```
frontend/
├── src/
│   ├── features/              # Feature-based modules
│   │   └── search/            # Search feature module
│   │       ├── components/     # Feature-specific components
│   │       │   ├── ComponentName/
│   │       │   │   ├── ComponentName.tsx
│   │       │   │   ├── ComponentName.css
│   │       │   │   └── ComponentName.test.tsx
│   │       │   └── index.ts   # Component exports
│   │       ├── pages/          # Page components (route-level)
│   │       │   ├── PageName/
│   │       │   │   ├── PageName.tsx
│   │       │   │   ├── PageName.css
│   │       │   │   └── PageName.test.tsx
│   │       │   └── index.ts   # Page exports
│   │       ├── hooks/          # Custom React hooks
│   │       │   ├── useSwapiSearch.ts
│   │       │   └── useSwapiSearch.test.tsx
│   │       ├── types.ts        # Feature-specific types
│   │       └── index.ts        # Feature public API
│   ├── lib/                    # Shared utilities and components
│   │   ├── api.ts             # API client functions
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   └── Header/
│   │   └── ...
│   ├── routes/                 # TanStack Router route files
│   │   ├── __root.tsx         # Root layout route
│   │   ├── index.tsx          # Home route (/)
│   │   ├── people.$userId.tsx # Dynamic route (/people/:userId)
│   │   └── movies.$movieId.tsx # Dynamic route (/movies/:movieId)
│   ├── test/                   # Test configuration
│   │   └── setup.ts           # Test setup file
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles
│   ├── routeTree.gen.ts       # Auto-generated route tree
│   └── vite-env.d.ts          # Vite type definitions
├── index.html                 # HTML template
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## 🏗️ Architecture

### Feature-Based Organization

The application follows a **feature-based architecture** where code is organized by business features rather than technical layers. Each feature is self-contained with its own components, pages, hooks, and types.

**Benefits:**
- Better code organization and discoverability
- Easier to scale and maintain
- Clear separation of concerns
- Facilitates team collaboration

### Component Structure

Each component follows a consistent structure:
```
ComponentName/
├── ComponentName.tsx      # Component implementation
├── ComponentName.css      # Component-specific styles
└── ComponentName.test.tsx # Component tests
```

**Key Principles:**
- Components are co-located with their styles and tests
- Component-specific CSS is never added to global `index.css`
- Only global styles (fonts, CSS variables) belong in `index.css`
- Each component folder is self-contained

### Routing Architecture

**TanStack Router** provides type-safe, file-based routing:

- **File-based routes**: Route files in `src/routes/` automatically generate routes
- **Type safety**: Route parameters and navigation are fully typed
- **Layout routes**: `__root.tsx` provides the application layout
- **Dynamic routes**: Files like `people.$userId.tsx` create parameterized routes
- **Auto-generation**: Route tree is automatically generated on dev server start

**Route Structure:**
- `/` - Home page (SearchPage)
- `/people/:userId` - Person detail page
- `/movies/:movieId` - Movie detail page

### State Management

**Server State (TanStack Query):**
- All API calls are managed through React Query
- Automatic caching, background refetching, and synchronization
- Query client configured with 5-minute stale time
- Error handling and loading states managed automatically

**Form State (TanStack Form):**
- Form state managed by TanStack Form
- Built-in validation support
- Optimized re-renders

**Local State:**
- React hooks (`useState`, `useEffect`) for component-local state
- Custom hooks for shared stateful logic

### API Layer

The API layer is centralized in `src/lib/api.ts`:
- All API functions are typed with TypeScript interfaces
- Consistent error handling
- Base URL configuration
- Response transformation logic

**Key Functions:**
- `searchSwapi()` - Search for resources (people, films, etc.)
- `getPersonDetail()` - Fetch person details
- `getMovieDetail()` - Fetch movie details

### Styling Architecture

**Tailwind CSS** with custom design tokens:
- Utility-first approach for rapid development
- Custom spacing, colors, and utilities defined in `tailwind.config.js`
- Design tokens ensure consistency across the app
- Component-specific CSS files for complex styling needs

**Guidelines:**
- Use Tailwind utilities for most styling
- Define custom tokens in Tailwind config instead of arbitrary values
- Use component CSS files only when necessary
- Never add component styles to global CSS

## 🛠️ Development

### Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ui` - Run tests with UI

### Adding New Features

1. **Create Feature Directory**
   ```
   src/features/your-feature/
   ├── components/
   ├── pages/
   ├── hooks/
   ├── types.ts
   └── index.ts
   ```

2. **Create Components**
   - Each component gets its own folder
   - Include component file, CSS, and test file
   - Export from `components/index.ts`

3. **Create Pages**
   - Page components go in `pages/` directory
   - Each page gets its own folder with component, CSS, and test
   - Export from `pages/index.ts`

4. **Add Routes**
   - Create route file in `src/routes/`
   - TanStack Router will auto-generate the route tree
   - Example: `about.tsx` → `/about`

### Adding New Routes

TanStack Router uses file-based routing:

- `index.tsx` → `/`
- `about.tsx` → `/about`
- `posts/$postId.tsx` → `/posts/:postId`
- `users/$userId/posts/$postId.tsx` → `/users/:userId/posts/:postId`

The router automatically generates the route tree when you start the dev server.

## 🧪 Testing

### Test Structure

Tests are co-located with their components:
- Component tests: `ComponentName.test.tsx`
- Hook tests: `hookName.test.tsx`
- API tests: `api.test.ts`

### Test Configuration

- **Framework**: Vitest with jsdom environment
- **Utilities**: React Testing Library
- **Coverage**: v8 provider with thresholds:
  - Lines: 75%
  - Functions: 75%
  - Branches: 70%
  - Statements: 75%

### Coverage Exclusions

The following are excluded from coverage:
- Test files themselves
- Route files (`src/routes/`)
- Entry point (`src/main.tsx`)
- Generated files (`routeTree.gen.ts`)
- Type definition files
- Configuration files

### Running Tests

```bash
# Watch mode
npm test

# Single run
npm run test:run

# With coverage
npm run test:coverage

# With UI
npm run test:ui
```

## 📦 Build & Deployment

### Build Process

1. **Type Checking**: TypeScript compiler checks all types
2. **Bundling**: Vite bundles the application
3. **Optimization**: Code splitting, tree shaking, minification
4. **Output**: Production build in `dist/` directory

### Build Output

- `dist/index.html` - HTML entry point
- `dist/assets/` - Bundled JavaScript and CSS files
- Assets are hashed for cache busting

### Environment Configuration

- API base URL is configured in `src/lib/api.ts`
- Default: `http://localhost:8000/api`
- Update for production deployment

## 🎨 Styling Guidelines

### Tailwind CSS

1. **Use Design Tokens**: Always use tokens from `tailwind.config.js`
   ```tsx
   // ✅ Good
   <div className="my-input-margin-y border-xs">
   
   // ❌ Bad
   <div className="my-[10px] border-[0.5px]">
   ```

2. **Component CSS**: Use component CSS files for complex styling
   ```tsx
   import './ComponentName.css'
   ```

3. **Global Styles**: Only in `index.css`:
   - Font families
   - CSS variables
   - Base resets

### CSS Variables

Global CSS variables are defined in `index.css`:
- `--background-gray`: Background color for pages

## 🔧 Configuration

### TypeScript

- Strict mode enabled
- Path aliases: `@/` maps to `src/`
- Type checking runs before build

### Vite

- React plugin for JSX transformation
- TanStack Router plugin for route generation
- Path alias resolution
- Test configuration integrated

### ESLint

- TypeScript-aware linting
- React hooks rules
- Strict error reporting (max-warnings: 0)

## 📚 Key Libraries Documentation

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [TanStack Router Docs](https://tanstack.com/router/latest)
- [TanStack Form Docs](https://tanstack.com/form/latest)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Vitest Docs](https://vitest.dev)

## 📝 Notes

- The route tree (`routeTree.gen.ts`) is auto-generated - do not edit manually
- Component-specific CSS should never be in `index.css`
- All API calls should go through the centralized API layer
- Test coverage thresholds are enforced in CI/CD

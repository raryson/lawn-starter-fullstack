import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Header } from '@/lib/components/Header'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--background-gray)' }}>
        <Header>
          <h1>SWStarter</h1>
        </Header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})

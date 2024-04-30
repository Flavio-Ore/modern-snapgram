import LazyPages from '@/components/shared/app/LazyPages'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { lazy, StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

const BrowserRouter = lazy(
  async () =>
    await import('react-router-dom').then(module => ({
      default: module.BrowserRouter
    }))
)
const AccountProvider = lazy(async () => await import('@/context/AccountContext'))
const QueryProvider = lazy(
  async () => await import('@/lib/queries/QueryProvider')
)
const App = lazy(async () => await import('@/App'))

const ROOT = document.getElementById('root')
if (ROOT == null) throw new Error('Root element not found')
ReactDOM.createRoot(ROOT).render(
  <StrictMode>
    <LazyPages>
      <BrowserRouter>
        <QueryProvider>
          <AccountProvider>
            <App />
          </AccountProvider>
          <ReactQueryDevtools />
        </QueryProvider>
      </BrowserRouter>
    </LazyPages>
  </StrictMode>
)

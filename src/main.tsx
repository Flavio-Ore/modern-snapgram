import App from '@/App'
import LazyPages from '@/components/shared/app/LazyPages'
import AccountProvider from '@/states/account/providers/AccountProvider'
import QueryProvider from '@/states/query/providers/QueryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

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

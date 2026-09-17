import App from '@/App'
import LazyPages from '@/components/shared/app/LazyPages'
import AuthProvider from '@/context/AuthContext'
import QueryProvider from '@/lib/queries/QueryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyPages>
      <BrowserRouter>
        <QueryProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
          <ReactQueryDevtools />
        </QueryProvider>
      </BrowserRouter>
    </LazyPages>
  </StrictMode>
)

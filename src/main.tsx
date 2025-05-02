import App from '@/App'
import LazyPages from '@/components/LazyPages'
import SnapgramProvider from '@/states/providers/SnapgramProvider'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

const ROOT = document.getElementById('root')
if (ROOT == null) throw new Error('Root element not found')
ReactDOM.createRoot(ROOT).render(
  <StrictMode>
    <LazyPages>
      <BrowserRouter>
        <SnapgramProvider>
          <App />
        </SnapgramProvider>
      </BrowserRouter>
    </LazyPages>
  </StrictMode>
)

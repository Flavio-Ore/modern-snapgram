import { App } from '@app'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

const ROOT = document.getElementById('root')
if (ROOT == null) throw new Error('Root element not found')

ReactDOM.createRoot(ROOT).render(
  <StrictMode>
    <App />
  </StrictMode>
)

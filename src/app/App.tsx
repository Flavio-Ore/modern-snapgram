import './styles/global.css'
import { AppProviders } from './providers'
import { AppRoutes } from './routes'

export const App = () => {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  )
}

export default App

import { INITIAL_ACCOUNT_STATE } from '@/context/accountState'
import { account } from '@/services/appwrite/config'
import { type AccountContextType } from '@/types'
import { AppwriteException } from 'appwrite'
import { createContext, type ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AccountContext = createContext<AccountContextType>(
  INITIAL_ACCOUNT_STATE
)
const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AppwriteException>()
  const navigate = useNavigate()
  const checkAuth = async () => {
    try {
      setIsLoading(true)
      const session = await account.getSession('current')
      console.log('session :>> ', session)

      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error(error)
      setIsAuthenticated(false)
      if (error instanceof AppwriteException) {
        setError(error)
        return false
      }
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuth,
    error
  }

  useEffect(() => {
    if (
      window.localStorage.getItem('cookieFallback') === '[]' ||
      window.localStorage.getItem('cookieFallback') == null
    ) {
      navigate('/sign-in')
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(true)
      checkAuth()
    }
  }, [])

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  )
}

export default AccountProvider

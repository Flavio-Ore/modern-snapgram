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
      await account.getSession('current')
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

  useEffect(() => {
    if (
      window.localStorage.getItem('cookieFallback') === '[]' ||
      window.localStorage.getItem('cookieFallback') == null
    ) {
      setIsAuthenticated(false)
      navigate('/sign-in')
    } else {
      account
        .getSession('current')
        .then(session => {
          if (session == null) {
            setIsAuthenticated(false)
            navigate('/sign-in')
            return
          }
          if (
            window.localStorage.getItem('cookieFallback') === '[]' ||
            window.localStorage.getItem('cookieFallback') == null
          ) {
            setIsAuthenticated(false)
            navigate('/sign-in')
            return
          }
          setIsAuthenticated(true)
          navigate('/')
        })
        .catch(sessionError => {
          console.error({ sessionError })
          setIsAuthenticated(false)
          navigate('/sign-in')
        })
    }
  }, [])

  const value = {
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuth,
    error
  }

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  )
}

export default AccountProvider

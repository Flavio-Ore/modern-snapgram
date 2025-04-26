import { account } from '@/services/appwrite/config'
import { AccountContext } from '@/states/account/contexts/AccountContext'
import { AppwriteException } from 'appwrite'
import { type ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AppwriteException>()
  const navigate = useNavigate()

  const checkAuth = async () => {
    try {
      setIsLoading(true)
      const session = await account.getSession('current')
      console.log({ session })
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
          window.localStorage.removeItem('cookieFallback')
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

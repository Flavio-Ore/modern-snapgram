import { INITIAL_ACCOUNT_STATE, INITIAL_USER } from '@/context/accountState'
import { api } from '@/services'
import { type AccountContextType, type IUser } from '@/types'
import { createContext, type ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AccountContext = createContext<AccountContextType>(INITIAL_ACCOUNT_STATE)
const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const checkAuth = async () => {
    try {
      setIsLoading(true)
      const currentUser = await api.account.user()
      console.log('currentUser CONTEXT :>> ', currentUser)
      if (currentUser != null) {
        const {
          $id: id,
          name,
          email,
          username,
          imageUrl,
          bio,
          save,
          liked,
          posts
        } = currentUser
        setUser({
          id,
          name,
          email,
          username,
          imageUrl,
          bio: bio ?? '',
          save,
          liked,
          posts
        })
        setIsAuthenticated(true)
        return true
      }
      setIsAuthenticated(false)
      return false
    } catch (error) {
      console.error(error)
      setIsAuthenticated(false)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    checkAuth
  }

  useEffect(() => {
    console.log('isAuthenticated :>> ', isAuthenticated)
    console.log('user :>> ', user)
    console.log('isLoading :>> ', isLoading)
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

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}

export default AccountProvider

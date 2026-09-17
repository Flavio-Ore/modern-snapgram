import { INITIAL_AUTH_STATE, INITIAL_USER } from '@/context/constants'
import { api } from '@/lib/services'
import { type IContextType, type IUser } from '@/types'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext<IContextType>(INITIAL_AUTH_STATE)
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuthUser = async () => {
    try {
      setIsLoading(true)

      const currentUser = await api.account.user()

      // ✅ Check if user is authenticated
      // ✅ If user is authenticated, set `isAuthenticated` to true
      // ✅ If user is not authenticated, set `isAuthenticated` to false

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

      return false
    } catch (error) {
      console.error(error)
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
    checkAuthUser
  }

  useEffect(() => {
    if (
      localStorage.getItem('cookieFallback') === '[]' ||
      localStorage.getItem('cookieFallback') === null
    ) {
      navigate('/sign-in')
    }
    checkAuthUser()
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

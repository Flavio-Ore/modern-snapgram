import { getCurrentUser } from '@/lib/services/api'
import { IContextType, IUser } from '@/types'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { INITIAL_AUTH_STATE, INITIAL_USER } from './constants'

export const AuthContext = createContext<IContextType>(INITIAL_AUTH_STATE)
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuthUser = async () => {
    try {
      setIsLoading(true)

      const currentUser = await getCurrentUser()
      // ✅ Check if user is authenticated
      // ✅ If user is authenticated, set `isAuthenticated` to true
      // ✅ If user is not authenticated, set `isAuthenticated` to false

      if (currentUser) {
        const { $id, name, email, username, imageUrl, bio } = currentUser
        setUser({ id: $id, name, email, username, imageUrl, bio })
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
    )
      navigate('/sign-in')
    checkAuthUser()
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

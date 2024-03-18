import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export const useUserContext = () => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('useUserContext must be used within AuthProvider')
  }
  return authContext
}

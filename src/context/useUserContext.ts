import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'

export const useUserContext = () => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('useUserContext must be used within AuthProvider')
  }
  return authContext
}

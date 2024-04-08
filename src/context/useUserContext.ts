import { AuthContext } from '@/context/AuthContext'
import { type IContextType } from '@/types'
import { useContext } from 'react'

export const useUserContext = (): IContextType => {
  const authContext = useContext(AuthContext)
  if (authContext == null) {
    throw new Error('useUserContext must be used within AuthProvider')
  }
  return authContext
}

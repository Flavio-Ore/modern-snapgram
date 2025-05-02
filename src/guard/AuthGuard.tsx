import { PUBLIC_ROUTES } from '@/routes/routes'
import { useAuth } from '@auth/hooks/useAuth'
import { useMemo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthGuard = () => {
  const { data: isAuthenticated } = useAuth()
  const isAuth = useMemo(
    () => isAuthenticated?.data ?? false,
    [isAuthenticated]
  )
  return isAuth ? <Outlet /> : <Navigate to={PUBLIC_ROUTES.SIGN_IN} />
}

export default AuthGuard

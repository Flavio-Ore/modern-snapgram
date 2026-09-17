import { useAuth } from '@auth/hooks/useAuth'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthGuard = () => {
  const navigate = useNavigate()
  const { data: isAuth } = useAuth()
  useEffect(() => {
    if (isAuth?.data == null) return
    if (isAuth.data) navigate('/home')
    else navigate('/sign-in')
  }, [isAuth])
  return <Outlet />
}

export default AuthGuard

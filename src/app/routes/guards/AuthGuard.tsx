import { useAuth } from '@features/auth-by-email'
import { LoaderIcon, Skeleton } from '@shared/ui'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthGuard = () => {
  const { data: isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <Skeleton className='common-container animate-pulse-fade-in flex-center backdrop-blur-sm size-full bg-primary-600/5'>
        <LoaderIcon className='stroke-secondary-500' />
      </Skeleton>
    )
  }

  if (isAuthenticated != null && !isAuthenticated) {
    return <Navigate to='/sign-in' replace />
  }

  return <Outlet />
}

export default AuthGuard

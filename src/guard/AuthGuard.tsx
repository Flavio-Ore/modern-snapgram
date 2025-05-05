import LoaderIcon from '@/components/icons/LoaderIcon'
import { Skeleton } from '@/components/ui/skeleton'
import { PUBLIC_ROUTES } from '@/routes/public'
import { useAuth } from '@auth/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const AuthGuard = () => {
  const { data: isAuthenticated, isLoading } = useAuth()
  return (
    <>
      {isLoading && (
        <Skeleton className='common-container animate-pulse-fade-in flex-center backdrop-blur-sm size-full bg-primary-600/5 '>
          <LoaderIcon className='stroke-secondary-500' />
        </Skeleton>
      )}
      {!isLoading && isAuthenticated != null && !isAuthenticated && (
        <Navigate to={PUBLIC_ROUTES.SIGN_IN} replace />
      )}
      {!isLoading && isAuthenticated != null && isAuthenticated && <Outlet />}
    </>
  )
}

export default AuthGuard

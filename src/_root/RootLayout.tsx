import Bottombar from '@/components/shared/app/Bottombar'
import LeftSidebar from '@/components/shared/app/LeftSidebar'
import Topbar from '@/components/shared/app/Topbar'
import { Skeleton } from '@/components/ui/skeleton'
import { useAccount } from '@/context/useAccountContext'
import { cn } from '@/lib/utils'
import { links } from '@/values'
import { lazy, Suspense } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const Outlet = lazy(
  async () =>
    await import('react-router-dom').then(module => ({
      default: module.Outlet
    }))
)

const RootLayout = () => {
  const { pathname } = useLocation()
  const { isAuthenticated } = useAccount()

  return isAuthenticated
    ? <div className='w-full md:flex'>
          <Topbar />
          <LeftSidebar />
          <section
            className={cn('flex flex-1 size-full', {
              'overflow-ellipsis': pathname.startsWith('/profile')
            })}
          >
            <Suspense
              fallback={
                <Skeleton className='common-container flex-center backdrop-blur-sm size-full bg-primary-600/5'>
                  <h2 className='h1-bold animate-pulse-fade-in'>
                    {links.sidebar.find(link => pathname === link.route)?.label}
                  </h2>
                </Skeleton>
              }
            >
              <Outlet />
            </Suspense>
          </section>
          <Bottombar />
        </div>
    : <Navigate to={'/sign-in'} />
}

export default RootLayout

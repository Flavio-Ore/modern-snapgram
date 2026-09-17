import Bottombar from '@/components/shared/app/Bottombar'
import LeftSidebar from '@/components/shared/app/LeftSidebar'
import Loader from '@/components/shared/app/Loader'
import Topbar from '@/components/shared/app/Topbar'
import { cn } from '@/lib/utils'
import { lazy, Suspense } from 'react'
import { useLocation, useMatch } from 'react-router-dom'

const Outlet = lazy(
  async () =>
    await import('react-router-dom').then(module => ({
      default: module.Outlet
    }))
)

const RootLayout = () => {
  const { pathname } = useLocation()
  const matchedPath = useMatch({
    path: '/profile/*',
    end: false
  })
  console.log('pathname :>> ', pathname)
  console.log('matchedPath :>> ', matchedPath?.pathnameBase)
  return (
    <div className='w-full md:flex'>
      <Topbar />
      <LeftSidebar />
      <section className={cn('flex flex-1 h-full w-full', (matchedPath?.pathnameBase === '/profile') && 'overflow-ellipsis')}>
        <Suspense
          fallback={
            <div className='flex-center mx-auto'>
              <Loader />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </section>
      <Bottombar />
    </div>
  )
}

export default RootLayout

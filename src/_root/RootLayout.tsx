import Bottombar from '@/components/shared/app/Bottombar'
import LeftSidebar from '@/components/shared/app/LeftSidebar'
import Loader from '@/components/shared/app/Loader'
import Topbar from '@/components/shared/app/Topbar'
import { lazy, Suspense } from 'react'
const Outlet = lazy(() =>
  import('react-router-dom').then(module => ({ default: module.Outlet }))
)

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <Topbar />
      <LeftSidebar />
      <section className='flex flex-1 h-full'>
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

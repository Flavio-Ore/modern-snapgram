import Bottombar from '@/components/shared/app/Bottombar'
import LeftSidebar from '@/components/shared/app/LeftSidebar'
import Topbar from '@/components/shared/app/Topbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <Topbar />
      <LeftSidebar />
      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>
      <Bottombar />
    </div>
  )
}

export default RootLayout

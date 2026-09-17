import HomeIcon from '@/components/icons/HomeIcon'
import RightSidebar from '@/components/RightSidebar'
import HomePosts from '@posts/components/HomePosts'
import { useEffect, useState } from 'react'

const Home = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1280)
  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 1280)
  }
  useEffect(() => {
    if (isLargeScreen) {
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isLargeScreen])
  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <div className='flex-start w-full max-w-5xl gap-6'>
            <HomeIcon className='size-9 stroke-primary-500' />
            <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
          </div>
          <HomePosts />
        </div>
      </div>
      {isLargeScreen && <RightSidebar />}
    </div>
  )
}

export default Home

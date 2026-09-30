import { UserCard, useGetTopUsers } from '@entities/user'
import { HomeIcon, Skeleton } from '@shared/ui'
import { HomePosts } from '@widgets/post-feed'
import { useEffect, useState } from 'react'

const TopCreators = () => {
  const { data: topCreators, isLoading, isError } = useGetTopUsers({ limit: 8 })

  return (
    <ul className='home-creators_grid'>
      {isLoading &&
        Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className='user-card min-w-[190px] min-h-[190px]'>
            <Skeleton className='min-h-14 min-w-14 rounded-full' />
            <div className='flex-center flex-col gap-1 w-full'>
              <Skeleton className='min-h-4 w-4/6' />
              <Skeleton className='min-h-2 w-9/12' />
            </div>
            <Skeleton className='min-h-6 w-5/12 rounded-lg bg-dark-4' />
          </div>
        ))}
      {isError && (
        <h4 className='flex-center h3-bold animate-pulse text-secondary-500 h-full text-center'>
          Oops... something went wrong.
        </h4>
      )}
      {!isLoading &&
        !isError &&
        topCreators?.map(user => (
          <li key={user.$id}>
            <UserCard
              imgUrl={
                user.imageUrl.trim().length > 0
                  ? user.imageUrl
                  : '/assets/icons/default-avatar.svg'
              }
              name={user.name.trim().length > 0 ? user.name : 'Not found'}
              mainFollower={`@${user.username}`}
              profileLink={`/profile/${user.$id}`}
              role='TOP_CREATORS'
            />
          </li>
        ))}
    </ul>
  )
}

const RightSidebar = () => {
  return (
    <aside className='home-creators'>
      <h2 className='h3-bold'>Top Creators</h2>
      <TopCreators />
    </aside>
  )
}

export const HomePage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1280)

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1280)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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

export default HomePage

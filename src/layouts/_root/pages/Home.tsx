import HomeIcon from '@/components/icons/HomeIcon'
import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import PostCard from '@/components/shared/posts/PostCard'
import HomePostSkeleton from '@/components/shared/skeletons/HomePostSkeleton'
import RightSidebar from '@/components/shared/users/RightSidebar'
import { useGetInfiniteRecentPosts } from '@/states/query/hooks/infiniteQueries'
import { useEffect, useMemo, useState } from 'react'

const HomePosts = () => {
  const { data, isError, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useGetInfiniteRecentPosts()
  const posts = useMemo(
    () => data?.pages.flatMap(postsPage => postsPage?.data ?? []) ?? [],
    [data]
  )
  return (
    <InfiniteScroll
      data={data}
      skeleton={<HomePostSkeleton />}
      isDataEmpty={posts.length === 0}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      isLoading={isLoading}
      isError={isError}
      hasNextPage={hasNextPage}
    >
      {posts.map(post => (
        <PostCard post={post} key={post?.$id} />
      ))}
    </InfiniteScroll>
  )
}

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

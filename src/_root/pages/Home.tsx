import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import PostCard from '@/components/shared/posts/PostCard'
import RightSidebar from '@/components/shared/users/RightSidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetInfiniteRecentPosts } from '@/lib/queries/infiniteQueries'
import { useMemo } from 'react'

const HomePostSkeleton = () => {
  return (
    <div className='post-card'>
      <div className='flex-start gap-4'>
        <Skeleton className='min-w-14 min-h-14 rounded-full' />
        <div className='flex items-start w-full flex-col gap-3'>
          <Skeleton className='h-4 w-2/3' />
          <Skeleton className='h-2 w-1/2' />
        </div>
      </div>

      <div className='flex-center flex-col gap-2 py-5'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-3 w-full' />
      </div>
      <Skeleton className='post-card_img' />
      <div className='flex-between'>
        <Skeleton className='min-w-5 min-h-5 rounded-full' />
        <Skeleton className='min-w-5 min-h-5 rounded-full' />
      </div>
    </div>
  )
}

const HomePosts = () => {
  const { data, isError, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useGetInfiniteRecentPosts()
  const posts = useMemo(
    () => data?.pages.flatMap(postsPage => postsPage) ?? [],
    [data]
  )

  console.log('posts :>> ', posts)
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
  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
          <HomePosts />
        </div>
      </div>
      <RightSidebar />
    </div>
  )
}

export default Home

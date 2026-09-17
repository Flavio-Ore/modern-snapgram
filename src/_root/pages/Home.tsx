import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import PostCard from '@/components/shared/posts/PostCard'
import RightSidebar from '@/components/shared/users/RightSidebar'
import { useGetInfiniteRecentPosts } from '@/lib/queries/infiniteQueries'
import { useMemo } from 'react'

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

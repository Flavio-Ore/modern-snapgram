import InfinitePosts from '@/components/shared/InfinitePosts'
import PostCard from '@/components/shared/PostCard'
import { useGetInfiniteRecentPosts } from '@/lib/queries/infiniteQueries'

const HomePosts = () => {
  const { data, isError, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useGetInfiniteRecentPosts()
  const posts = data?.pages.flatMap(postsPage => postsPage) ?? []
  return (
    <InfinitePosts
      data={data}
      isDataEmpty={posts.length === 0}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      isLoading={isLoading}
      isError={isError}
      hasNextPage={hasNextPage}
    >
      {posts.map(post => (
        <PostCard post={post} key={post.$id} />
      ))}
    </InfinitePosts>
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
    </div>
  )
}

export default Home

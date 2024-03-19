import InfinitePosts from '@/components/shared/InfinitePosts'
import PostCard from '@/components/shared/PostCard'
import { useGetInfiniteRecentPosts } from '@/lib/queries/queriesAndMutations'

const HomePosts = () => {
  const infiniteRecentPosts = useGetInfiniteRecentPosts()
  const { data } = infiniteRecentPosts
  return (
    <InfinitePosts infinityHookResponse={infiniteRecentPosts}>
      {data?.pages.map(currentPosts =>
        currentPosts.documents.map(post => (
          <PostCard post={post} key={post.$id} />
        ))
      )}
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

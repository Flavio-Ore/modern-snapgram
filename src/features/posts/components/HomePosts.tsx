import InfiniteScroll from '@/components/InfiniteScroll'
import HomePostSkeleton from '@/components/skeletons/HomePostSkeleton'
import PostCard from '@posts/components/PostCard'
import { useGetInfiniteRecentPosts } from '@posts/hooks/useGetInfiniteRecentPosts'
import { useMemo } from 'react'

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

export default HomePosts

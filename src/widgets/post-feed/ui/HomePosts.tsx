import { HomePostSkeleton, InfiniteScroll } from '@shared/ui'
import { PostCard, useGetInfiniteRecentPosts } from '@entities/post'
import { useMemo } from 'react'

export const HomePosts = () => {
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

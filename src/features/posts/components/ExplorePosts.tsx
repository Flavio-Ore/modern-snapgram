import InfiniteScroll from '@/components/InfiniteScroll'
import GridPostList from '@posts/components/GridPostList'
import GridPostSkeleton from '@posts/components/GridPostSkeleton'
import { useGetInfinitePosts } from '@posts/hooks/useGetInfinitePosts'
import { useMemo } from 'react'

const ExplorePosts = () => {
  const { data, isFetching, isError, isLoading, hasNextPage, fetchNextPage } =
    useGetInfinitePosts()
  const posts = useMemo(
    () => data?.pages.flatMap(postsPage => postsPage?.data ?? []) ?? [],
    [data]
  )
  return (
    <InfiniteScroll
      data={data}
      skeleton={<GridPostSkeleton />}
      isFetching={isFetching}
      isLoading={isLoading}
      isError={isError}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isDataEmpty={posts.length === 0}
    >
      <GridPostList posts={posts} />
    </InfiniteScroll>
  )
}

export default ExplorePosts

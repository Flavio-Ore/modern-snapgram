import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import GridPostList from '@/components/shared/posts/GridPostList'
import GridPostSkeleton from '@/components/shared/skeletons/GridPostSkeleton'
import { useGetInfinitePosts } from '@/lib/queries/infiniteQueries'
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

import { useGetInfinitePosts } from '@entities/post'
import { GridPostSkeleton, InfiniteScroll } from '@shared/ui'
import { useMemo } from 'react'
import GridPostList from './GridPostList'

export const ExplorePosts = () => {
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

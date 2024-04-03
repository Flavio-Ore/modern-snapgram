import GridPostList from '@/components/shared/GridPostList'
import InfinitePosts from '@/components/shared/InfinitePosts'
import { useGetInfinitePosts } from '@/lib/queries/infiniteQueries'
import { OPERATIONS } from '@/values'
import { useMemo } from 'react'

const ExplorePosts = () => {
  const { data, isFetching, isError, isLoading, hasNextPage, fetchNextPage } =
    useGetInfinitePosts()
  const posts = useMemo(
    () => data?.pages.flatMap(postsPage => postsPage) ?? [],
    [data]
  )
  return (
    <InfinitePosts
      data={data}
      isFetching={isFetching}
      isLoading={isLoading}
      isError={isError}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isDataEmpty={posts.length === 0}
    >
      <GridPostList
        key={`${posts[posts.length - 1]}-${OPERATIONS.EXPLORE_POSTS}-$}`}
        posts={posts}
      />
    </InfinitePosts>
  )
}

export default ExplorePosts

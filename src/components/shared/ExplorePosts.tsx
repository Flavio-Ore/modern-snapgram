import { useGetInfinitePosts } from '@/lib/queries/infiniteQueries'
import { OPERATIONS } from '@/values'
import GridPostList from './GridPostList'
import InfinitePosts from './InfiniteScroll'

const ExploreDefaultPosts = () => {
  const { data, isFetching, isError, isLoading, hasNextPage, fetchNextPage } =
    useGetInfinitePosts()
  const posts = data?.pages.flatMap(postsPage => postsPage) ?? []

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
      {data?.pages.map((postsPage, i) => (
        <GridPostList
          key={`${postsPage[i]}-${OPERATIONS.EXPLORE_POSTS}-${i}`}
          posts={postsPage}
        />
      ))}
    </InfinitePosts>
  )
}

export default ExploreDefaultPosts

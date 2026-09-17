import { useGetPosts } from '@/lib/queries/queries'
import { OPERATIONS } from '@/values'
import { useEffect, useState } from 'react'
import GridPostList from './GridPostList'
import InfinitePosts from './InfiniteScroll'
import Loader from './Loader'

const ExploreDefaultPosts = () => {
  // Add a loading state
  const [loading, setLoading] = useState(true)
  const { data, isFetching, isError, isLoading, hasNextPage, fetchNextPage } =
    useGetPosts()
  const lastPosts = data?.pages.reverse()[0] ?? []
  const noMoreDefaultResults = lastPosts.length === 0
  console.log('EXPLORE DEFAULT POSTS :>> ', {
    data,
    isFetching,
    isError,
    isLoading,
    hasNextPage,
    noMoreDefaultResults
  })

  // Update loading state when hasNextPage changes
  useEffect(() => {
    setLoading(false)
  }, [hasNextPage])

  return loading ? (
    <Loader />
  ) : (
    <InfinitePosts
      data={data}
      isFetching={isFetching}
      isLoading={isLoading}
      isError={isError}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isDataEmpty={noMoreDefaultResults}
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

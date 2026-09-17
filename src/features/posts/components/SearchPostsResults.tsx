import InfiniteScroll from '@/components/InfiniteScroll'
import GridPostList from '@posts/components/GridPostList'
import GridPostSkeleton from '@posts/components/GridPostSkeleton'
import { useGetInfiniteSearchedPosts } from '@posts/hooks/useGetInfiniteSearchedPosts'
import { useMemo } from 'react'

interface SearchResultsProps {
  debouncedValue: string
}

const SearchPostsResults = ({ debouncedValue }: SearchResultsProps) => {
  const { data, isLoading, isError, isFetching, hasNextPage, fetchNextPage } =
    useGetInfiniteSearchedPosts({
      searchTerm: debouncedValue
    })
  const posts = useMemo(
    () => data?.pages.flatMap(postsPage => postsPage?.data ?? []) ?? [],
    [data]
  )
  return (
    <InfiniteScroll
      data={data}
      skeleton={<GridPostSkeleton />}
      isDataEmpty={posts.length === 0}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isLoading={isLoading}
      isError={isError}
    >
      <GridPostList posts={posts} />
    </InfiniteScroll>
  )
}

export default SearchPostsResults

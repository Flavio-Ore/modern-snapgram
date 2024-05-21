import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import GridPostList from '@/components/shared/posts/GridPostList'
import GridPostSkeleton from '@/components/shared/skeletons/GridPostSkeleton'
import { useInfiniteSearchPosts } from '@/lib/queries/infiniteQueries'
import { useMemo } from 'react'

interface SearchResultsProps {
  debouncedValue: string
}

const SearchResults = ({ debouncedValue }: SearchResultsProps) => {
  const { data, isLoading, isError, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteSearchPosts({
      searchTerm: debouncedValue
    })
  const posts = useMemo(
    () => data?.pages.flatMap(postsPage => postsPage) ?? [],
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

export default SearchResults

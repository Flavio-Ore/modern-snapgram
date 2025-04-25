import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import GridPostList from '@/components/shared/posts/GridPostList'
import GridPostSkeleton from '@/components/shared/skeletons/GridPostSkeleton'
import { useGetInfiniteSearchedPosts } from '@/states/TanStack-query/hooks/infinite-queries/posts/useGetInfiniteSearchedPosts'
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

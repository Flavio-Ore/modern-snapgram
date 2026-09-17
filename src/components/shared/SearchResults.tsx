import GridPostList from '@/components/shared/GridPostList'
import InfinitePosts from '@/components/shared/InfinitePosts'
import { useInfiniteSearchPosts } from '@/lib/queries/infiniteQueries'
import { OPERATIONS } from '@/values'
import { useMemo } from 'react'

interface SearchResultsModel {
  debouncedValue: string
}
type SearchResultsProps = SearchResultsModel

const SearchResults: React.FC<SearchResultsProps> = ({ debouncedValue }) => {
  const { data, isLoading, isError, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteSearchPosts({
      searchTerm: debouncedValue
    })
  const posts = useMemo(
    () => data?.pages.flatMap(postsPage => postsPage) ?? [],
    [data]
  )
  return (
    <InfinitePosts
      data={data}
      isDataEmpty={posts.length === 0}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isLoading={isLoading}
      isError={isError}
    >
      <GridPostList
        key={`${posts}-${OPERATIONS.SEARCH_POSTS}-${posts}`}
        posts={posts}
      />
    </InfinitePosts>
  )
}

export default SearchResults

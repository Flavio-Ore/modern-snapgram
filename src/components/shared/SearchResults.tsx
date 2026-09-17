import { useInfiniteSearchPosts } from '@/lib/queries/infiniteQueries'
import { OPERATIONS } from '@/values'
import GridPostList from './GridPostList'
import InfinitePosts from './InfiniteScroll'

interface SearchResultsModel {
  debouncedValue: string
}
type SearchResultsProps = SearchResultsModel

const SearchResults: React.FC<SearchResultsProps> = ({ debouncedValue }) => {
  const { data, isLoading, isError, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteSearchPosts({
      searchTerm: debouncedValue
    })
  const posts = data?.pages.flatMap(postsPage => postsPage) ?? []
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
      {data?.pages.map((postsPage, i) => (
        <GridPostList
          key={`${postsPage[i]}-${OPERATIONS.SEARCH_POSTS}-${i}`}
          posts={postsPage}
        />
      ))}
    </InfinitePosts>
  )
}

export default SearchResults

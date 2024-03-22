import { useInfiniteSearchPosts } from '@/lib/queries/queries'
import { OPERATIONS } from '@/values'
import GridPostList from './GridPostList'
import InfinitePosts from './InfiniteScroll'

interface SearchResultsModel {
  isSearching: boolean
  searchValue: string
}
type SearchResultsProps = SearchResultsModel

const SearchResults: React.FC<SearchResultsProps> = ({
  isSearching,
  searchValue
}) => {
  const { data, isLoading, isError, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteSearchPosts({
      searchTerm: searchValue
    })

  const isEmptyPosts = data?.pages.reverse()[0].length === 0
  return (
    <InfinitePosts
      data={data}
      isDataEmpty={isEmptyPosts}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage && !searchValue}
      isFetching={isFetching}
      isLoading={isLoading && isSearching}
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

import { useInfiniteSearchPosts } from '@/lib/queries/queriesAndMutations'
import { OPERATIONS } from '@/values'
import GridPostList from './GridPostList'
import InfinitePosts from './InfiniteScroll'

interface SearchResultsModel {
  isSearching: boolean
  searchValue: string
  isNothingMoreToShow: boolean
}
type SearchResultsProps = SearchResultsModel

const SearchResults: React.FC<SearchResultsProps> = ({
  isSearching,
  searchValue,
  isNothingMoreToShow
}) => {
  const infiniteSearch = useInfiniteSearchPosts({
    searchTerm: searchValue
  })
  const { data } = infiniteSearch

  return (
    <InfinitePosts
      infinityHookResponse={infiniteSearch}
      isNothingMoreToShow={isNothingMoreToShow}
      dependencyList={[searchValue]}
      triggerLoader={isSearching}
      triggerFetchNextPage={searchValue && !isSearching ? true : false}
    >
      {data?.pages.map((currentPosts, i) => (
        <GridPostList
          key={`${currentPosts}-${OPERATIONS.SEARCH_POSTS}-${i}`}
          posts={currentPosts.documents}
        />
      ))}
    </InfinitePosts>
  )
}

export default SearchResults

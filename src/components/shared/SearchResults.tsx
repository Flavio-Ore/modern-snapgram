import { useInfiniteSearchPosts } from '@/lib/queries/queriesAndMutations'
import GridPostList from './GridPostList'
import InfiniteData from './InfiniteScroll'

interface SearchResultsModel {
  isSearching: boolean
  searchValue: string
}
type SearchResultsProps = SearchResultsModel

const SearchResults: React.FC<SearchResultsProps> = ({
  isSearching,
  searchValue
}) => {
  const infiniteSearch = useInfiniteSearchPosts({
    searchTerm: searchValue
  })
  const { data } = infiniteSearch

  return (
    <InfiniteData
      infinityHookResponse={infiniteSearch}
      dependencyList={[searchValue]}
      conditionIfNoData={isSearching}
      conditionIfinView={searchValue && !isSearching ? true : false}
    >
      {data?.pages.map((currentPosts, i) => (
        <GridPostList
          key={`${currentPosts.documents[i].$id}-searched-posts-${i}`}
          posts={currentPosts.documents}
        />
      ))}
    </InfiniteData>
  )
}

export default SearchResults

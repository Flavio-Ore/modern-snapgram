import { Models } from 'appwrite'
import GridPostList from './GridPostList'
import Loader from './Loader'

interface SearchResultsModel {
  isSearching: boolean
  searchedPosts: Models.Document[] | undefined
}
type SearchResultsProps = SearchResultsModel

const SearchResults: React.FC<SearchResultsProps> = ({
  isSearching,
  searchedPosts
}) => {
  if (isSearching) {
    return <Loader />
  } else if (searchedPosts && searchedPosts.length > 0) {
    return <GridPostList posts={searchedPosts} />
  } else {
    return (
      <p className='text-light-4 mt-10 text-center w-full'>No results found</p>
    )
  }
}
export default SearchResults

import ExploreDefaultPosts from '@/components/shared/ExplorePosts'
import SearchResults from '@/components/shared/SearchResults'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import {
  useGetPosts,
  useInfiniteSearchPosts
} from '@/lib/queries/queriesAndMutations'
import { useEffect, useState } from 'react'

const Explore = () => {
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { data: infinitePosts, isFetching: isInfinitePostsFetching } =
    useGetPosts()
  const debouncedValue = useDebounce(searchValue, 500)
  const { data: infiniteSearched, isFetching: isInfiniteSearchedFetching } =
    useInfiniteSearchPosts({
      searchTerm: debouncedValue
    })

  useEffect(() => {
    if (!isInfiniteSearchedFetching || !isInfinitePostsFetching)
      setIsSearchLoading(false)
  }, [isInfiniteSearchedFetching, isInfinitePostsFetching])

  const isTyping = searchValue !== ''
  const noMoreSearchedResults =
    infiniteSearched?.pages[infiniteSearched.pages.length - 1]?.documents
      .length === 0
  const noMoreDefaultResults =
    infinitePosts?.pages[infinitePosts.pages.length - 1]?.documents.length === 0
  const noMoreDefaultPosts = !isTyping && noMoreDefaultResults

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setIsSearchLoading(true)
    setSearchValue(value)
  }

  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>
        <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <img
            src='/assets/icons/search.svg'
            width={24}
            height={24}
            alt='Search Icon'
          />
          <Input
            type='search'
            placeholder='Search for posts...'
            className='explore-search'
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h3 className='body-bold md:h3-bold'>Popular today</h3>
        <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium md:base-medium text-light-2'>All</p>
          <img
            src='/assets/icons/filter.svg'
            width={20}
            height={20}
            alt='Filter Icon'
          />
        </div>
      </div>
      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {isTyping && (
          <SearchResults
            searchValue={debouncedValue}
            isSearching={isSearchLoading}
            isNothingMoreToShow={noMoreSearchedResults}
          />
        )}
        {!isTyping && (
          <ExploreDefaultPosts
            searchValue={debouncedValue}
            isSearching={isSearchLoading}
            isNothingMoreToShow={noMoreDefaultPosts}
          />
        )}
      </div>
    </div>
  )
}

export default Explore

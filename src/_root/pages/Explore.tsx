import InfinitePosts from '@/components/shared/InfinitePosts'
import Loader from '@/components/shared/Loader'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { useGetPosts, useSearchPosts } from '@/lib/queries/queriesAndMutations'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const Explore = () => {
  const { ref, inView } = useInView()
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const {
    data: infinitePosts,
    fetchNextPage,
    isFetching: isInfiniteFetching,
    hasNextPage
  } = useGetPosts()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const { data: searchedPosts, isFetching: isSearchedFetching } =
    useSearchPosts({
      searchTerm: debouncedValue
    })

  useEffect(() => {
    if (inView && !searchValue && !isInfiniteFetching) fetchNextPage()
  }, [inView, searchValue])

  useEffect(() => {
    if (!isSearchedFetching) setIsSearchLoading(false)
  }, [isSearchedFetching])

  if (!infinitePosts)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )

  const shouldShowSearchResults = searchValue !== ''
  const shouldShowPosts =
    !shouldShowSearchResults &&
    infinitePosts.pages.every(item => item.documents.length === 0)

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
      <InfinitePosts todo={'tasks'} />
    </div>
  )
}

export default Explore

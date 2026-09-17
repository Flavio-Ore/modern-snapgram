import FilterIcon from '@/components/icons/FilterIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import Loader from '@/components/Loader'
import { useDebounce } from '@/hooks/useDebounce'
import ExplorePosts from '@posts/components/ExplorePosts'
import SearchPostsResults from '@posts/components/SearchPostsResults'
import { Input } from '@shadcn/input'
import { useState } from 'react'
// TODO - TRY useDeferredValue HOOK FROM REACT TO IMPROVE PERFORMANCE AND REPLACE useDebounce HOOK
const Explore = () => {
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const isTyping = searchValue !== ''

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }
  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <div className='flex-start w-full max-w-5xl gap-6'>
          <SearchIcon className='size-9 stroke-primary-500' />
          <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>
        </div>
        <div className='flex items-center gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <SearchIcon className='size-6' />
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
          <FilterIcon />
        </div>
      </div>
      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {isTyping && debouncedValue === '' && <Loader />}
        {isTyping && <SearchPostsResults debouncedValue={debouncedValue} />}
        {!isTyping && <ExplorePosts />}
      </div>
    </div>
  )
}

export default Explore

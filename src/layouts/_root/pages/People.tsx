import SearchIcon from '@/components/icons/SearchIcon'
import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import Loader from '@/components/shared/app/Loader'
import AllUsersSkeleton from '@/components/shared/skeletons/AllUsersSkeleton'
import SearchUsersResults from '@/components/shared/users/SearchUsersResults'
import UserCard from '@/components/shared/users/UserCard'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { useGetInfiniteUsers } from '@/states/query/hooks/infiniteQueries'
import { E_USERS } from '@/values'
import { UserSearchIcon } from 'lucide-react'
import { useMemo, useState } from 'react'

const AllUsers = () => {
  const {
    data: infinitePeople,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetching
  } = useGetInfiniteUsers()
  const users = useMemo(
    () => infinitePeople?.pages.flatMap(page => page?.data ?? []) ?? [],
    [infinitePeople]
  )
  return (
    <InfiniteScroll
      data={infinitePeople}
      skeleton={<AllUsersSkeleton />}
      isDataEmpty={users?.length === 0}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    >
      <ul className='user-grid'>
        {users.map(user => (
          <li key={user.$id}>
            <UserCard
              imgUrl={user.imageUrl}
              name={user.name}
              mainFollower={`@${user.username}`}
              profileLink={`/profile/${user.$id}`}
              role={E_USERS.ALL_USERS}
            />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  )
}

const People = () => {
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const isTyping = searchValue !== ''

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }

  return (
    <div className='common-container'>
      <div className='user-container'>
        <div className='explore-inner_container'>
          <div className='flex-start w-full max-w-5xl gap-6'>
            <UserSearchIcon size={36} className=' stroke-primary-500' />
            <h2 className='h3-bold md:h2-bold w-full'>Search Users</h2>
          </div>
          <div className='flex items-center gap-1 px-4 w-full rounded-lg bg-dark-4'>
            <SearchIcon className='size-6' />
            <Input
              type='search'
              placeholder='Search for the users whose name or username starts with...'
              className='explore-search'
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className='flex-start w-full max-w-5xl gap-6'>
          <h2 className='md:h2-bold h3-bold'>All Users</h2>
        </div>
        <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
          {isTyping && debouncedValue === '' && <Loader />}
          {isTyping && <SearchUsersResults debouncedValue={debouncedValue} />}
          {!isTyping && <AllUsers />}
        </div>
      </div>
    </div>
  )
}
export default People

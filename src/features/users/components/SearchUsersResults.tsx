import InfiniteScroll from '@/components/InfiniteScroll'
import AllUsersSkeleton from '@users/components/AllUsersSkeleton'
import UserCard from '@users/components/UserCard'
import { useGetInfiniteSearchedUsers } from '@users/hooks/useGetInfiniteSearchedUsers'
import { E_USERS } from '@users/utils/DISPLAY-USERS'
import { useMemo } from 'react'

interface SearchResultsProps {
  debouncedValue: string
}

const SearchUsersResults = ({ debouncedValue }: SearchResultsProps) => {
  const { data, isLoading, isError, isFetching, hasNextPage, fetchNextPage } =
    useGetInfiniteSearchedUsers({
      searchTerm: debouncedValue
    })
  const users = useMemo(
    () => data?.pages.flatMap(postsPage => postsPage?.data ?? []) ?? [],
    [data]
  )
  return (
    <InfiniteScroll
      data={data}
      skeleton={<AllUsersSkeleton />}
      isDataEmpty={users.length === 0}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isLoading={isLoading}
      isError={isError}
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

export default SearchUsersResults

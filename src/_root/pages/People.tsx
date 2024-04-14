import PeopleIcon from '@/components/icons/PeopleIcon'
import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import AllUsersSkeleton from '@/components/shared/skeletons/AllUsersSkeleton'
import UserCard from '@/components/shared/users/UserCard'
import { useGetInfiniteUsers } from '@/lib/queries/infiniteQueries'
import { E_USERS, OPERATIONS } from '@/values'
import { useMemo } from 'react'

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
    () => infinitePeople?.pages.flatMap(page => page) ?? [],
    [infinitePeople]
  )
  const key =
    users
      ?.map(user => user.$id)
      .toString()
      .concat(OPERATIONS.PEOPLE) ?? ''

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
        {users.map((user, i) => (
          <li key={`${key}-${i}`}>
            <UserCard
              imgUrl={user.imageUrl}
              name={user.name}
              mainFollower={`Followed by @${user.username}`}
              profileLink={`/profile/${user.$id}`}
              role={E_USERS.ALL_USERS}
            />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  )
}

const People = () => (
  <div className='common-container'>
    <div className='user-container'>
      <div className='flex-start w-full max-w-5xl gap-6'>
        <PeopleIcon className='size-9 fill-light-1'/>
        <h2 className='md:h1-bold h3-bold'>All Users</h2>
      </div>
      <AllUsers />
    </div>
  </div>
)

export default People

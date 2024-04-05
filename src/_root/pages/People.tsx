import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import Loader from '@/components/shared/app/Loader'
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
    () => infinitePeople?.pages.flatMap(page => page) || [],
    [infinitePeople]
  )
  const key =
    users
      ?.map(user => user.$id)
      .toString()
      .concat(OPERATIONS.PEOPLE) || ''

  if (!users)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )
  return (
    <InfiniteScroll
      data={infinitePeople}
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
              imgUrl={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              name={user.name || 'Not found'}
              mainFollower={`Followed by @${user.username || ''}`}
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
        <img
          src='/assets/icons/people.svg'
          height={36}
          width={36}
          className='invert-white'
          alt='people'
        />
        <h2 className='md:h1-bold h3-bold'>All Users</h2>
      </div>
      <AllUsers />
    </div>
  </div>
)

export default People

import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import UserCard from '@/components/shared/users/UserCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetInfiniteUsers } from '@/lib/queries/infiniteQueries'
import { E_USERS, OPERATIONS } from '@/values'
import { useMemo } from 'react'

const AllUsersSkeleton = () => (
  <div className='user-grid'>
    <div className='user-card'>
      <Skeleton className='min-h-24 min-w-24 rounded-full' />
      <div className='flex-center flex-col gap-1 w-full'>
        <Skeleton className='h-4 w-4/6' />
        <Skeleton className='h-2 w-9/12' />
      </div>
      <Skeleton className='h-6 w-5/12 rounded-lg bg-primary-500' />
    </div>
    <div className='user-card'>
      <Skeleton className='min-h-24 min-w-24 rounded-full' />
      <div className='flex-center flex-col gap-1 w-full'>
        <Skeleton className='h-4 w-4/6' />
        <Skeleton className='h-2 w-9/12' />
      </div>
      <Skeleton className='h-6 w-5/12 rounded-lg bg-primary-500' />
    </div>
    <div className='user-card'>
      <Skeleton className='min-h-24 min-w-24 rounded-full' />
      <div className='flex-center flex-col gap-1 w-full'>
        <Skeleton className='h-4 w-4/6' />
        <Skeleton className='h-2 w-9/12' />
      </div>
      <Skeleton className='h-6 w-5/12 rounded-lg bg-primary-500' />
    </div>
    <div className='user-card'>
      <Skeleton className='min-h-24 min-w-24 rounded-full' />
      <div className='flex-center flex-col gap-1 w-full'>
        <Skeleton className='h-4 w-4/6' />
        <Skeleton className='h-2 w-9/12' />
      </div>
      <Skeleton className='h-6 w-5/12 rounded-lg bg-primary-500' />
    </div>
    <div className='user-card'>
      <Skeleton className='min-h-24 min-w-24 rounded-full' />
      <div className='flex-center flex-col gap-1 w-full'>
        <Skeleton className='h-4 w-4/6' />
        <Skeleton className='h-2 w-9/12' />
      </div>
      <Skeleton className='h-6 w-5/12 rounded-lg bg-primary-500' />
    </div>
    <div className='user-card'>
      <Skeleton className='min-h-24 min-w-24 rounded-full' />
      <div className='flex-center flex-col gap-1 w-full'>
        <Skeleton className='h-4 w-4/6' />
        <Skeleton className='h-2 w-9/12' />
      </div>
      <Skeleton className='h-6 w-5/12 rounded-lg bg-primary-500' />
    </div>
    <div className='user-card'>
      <Skeleton className='min-h-24 min-w-24 rounded-full' />
      <div className='flex-center flex-col gap-1 w-full'>
        <Skeleton className='h-4 w-4/6' />
        <Skeleton className='h-2 w-9/12' />
      </div>
      <Skeleton className='h-6 w-5/12 rounded-lg bg-primary-500' />
    </div>
    <div className='user-card'>
      <Skeleton className='min-h-24 min-w-24 rounded-full' />
      <div className='flex-center flex-col gap-1 w-full'>
        <Skeleton className='h-4 w-4/6' />
        <Skeleton className='h-2 w-9/12' />
      </div>
      <Skeleton className='h-6 w-5/12 rounded-lg bg-primary-500' />
    </div>
    <div className='user-card'>
      <Skeleton className='min-h-24 min-w-24 rounded-full' />
      <div className='flex-center flex-col gap-1 w-full'>
        <Skeleton className='h-4 w-4/6' />
        <Skeleton className='h-2 w-9/12' />
      </div>
      <Skeleton className='h-6 w-5/12 rounded-lg bg-primary-500' />
    </div>
  </div>
)

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

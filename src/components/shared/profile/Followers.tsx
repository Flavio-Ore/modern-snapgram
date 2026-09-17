import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import AllUsersSkeleton from '@/components/shared/skeletons/AllUsersSkeleton'
import UserCard from '@/components/shared/users/UserCard'
import { useGetInfiniteFollowers } from '@/states/query/hooks/infiniteQueries'
import { E_USERS } from '@/values'
import { useMemo } from 'react'

const Followers = ({ userId }: { userId: string }) => {
  const {
    data: infiniteFollowers,
    isLoading,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage
  } = useGetInfiniteFollowers({
    userId: userId ?? ''
  })

  const followers = useMemo(
    () =>
      infiniteFollowers?.pages.flatMap(
        page => page?.data.map(record => record?.following) ?? []
      ) ?? [],
    [infiniteFollowers]
  )

  return (
    <InfiniteScroll
      data={infiniteFollowers}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isDataEmpty={followers.length === 0}
      skeleton={<AllUsersSkeleton />}
    >
      <ul className='user-grid'>
        {followers.map(user => (
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

export default Followers

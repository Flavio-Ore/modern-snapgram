import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import AllUsersSkeleton from '@/components/shared/skeletons/AllUsersSkeleton'
import UserCard from '@/components/shared/users/UserCard'
import { useGetInfiniteFollowings } from '@/lib/queries/infiniteQueries'
import { E_USERS } from '@/values'
import { useMemo } from 'react'

const Followings = ({ userId }: { userId: string }) => {
  const {
    data: infiniteFollowings,
    isLoading,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage
  } = useGetInfiniteFollowings({
    userId: userId ?? ''
  })

  const followings = useMemo(
    () =>
      infiniteFollowings?.pages.flatMap(
        page => page?.data.map(record => record?.followed) ?? []
      ) ?? [],
    [infiniteFollowings]
  )

  return (
    <InfiniteScroll
      data={infiniteFollowings}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isDataEmpty={followings.length === 0}
      skeleton={<AllUsersSkeleton />}
    >
      <ul className='user-grid'>
        {followings.map(user => (
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

export default Followings

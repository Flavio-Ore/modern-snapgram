import { AllUsersSkeleton, InfiniteScroll } from '@shared/ui'
import { UserCard } from '@entities/user'
import { useGetInfiniteFollowings } from '@features/follow-user'
import { useMemo } from 'react'

export interface FollowingsProps {
  userId: string
}

export const Followings = ({ userId }: FollowingsProps) => {
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
        {followings.map(user => {
          if (!user) return null
          return (
            <li key={user.$id}>
              <UserCard
                name={user.name}
                imgUrl={user.imageUrl}
                username={user.username}
                profileLink={`/profile/${user.$id}`}
              />
            </li>
          )
        })}
      </ul>
    </InfiniteScroll>
  )
}

export default Followings

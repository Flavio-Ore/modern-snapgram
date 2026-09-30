import { AllUsersSkeleton, InfiniteScroll } from '@shared/ui'
import { UserCard } from '@entities/user'
import { useGetInfiniteFollowers } from '@features/follow-user'
import { useMemo } from 'react'

export interface FollowersProps {
  userId: string
}

export const Followers = ({ userId }: FollowersProps) => {
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
        {followers.map(user => {
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

export default Followers

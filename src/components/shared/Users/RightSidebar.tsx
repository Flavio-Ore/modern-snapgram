import UserCard from '@/components/shared/users/UserCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetUsers } from '@/lib/queries/queries'
import { E_USERS } from '@/values'

const TopCreators = () => {
  const { data: topCreators, isLoading, isError } = useGetUsers({ limit: 8 })
  return (
    <ul className='home-creators_grid'>
      {isLoading &&
        Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className='user-card min-w-[190px] min-h-[190px]'>
            <Skeleton className='min-h-14 min-w-14 rounded-full' />
            <div className='flex-center flex-col gap-1 w-full'>
              <Skeleton className='min-h-4 w-4/6' />
              <Skeleton className='min-h-2 w-9/12' />
            </div>
            <Skeleton className='min-h-6 w-5/12 rounded-lg bg-primary-500' />
          </div>
        ))}
      {isError && (
        <h4 className='flex-center h3-bold animate-pulse text-secondary-500 h-full  text-center'>
          Oops... Error loading creators!
        </h4>
      )}
      {!isLoading &&
        !isError &&
        topCreators?.data.map(user => (
          <li key={user.$id}>
            <UserCard
              imgUrl={
                user.imageUrl.trim().length > 0
                  ? user.imageUrl
                  : '/assets/icons/default-avatar.svg'
              }
              name={user.name.trim().length > 0 ? user.name : 'Not found'}
              mainFollower={`Followed by ${user.followers ?? 'Not found'}`}
              profileLink={`/profile/${user.$id}`}
              role={E_USERS.TOP_CREATORS}
            />
          </li>
        ))}
    </ul>
  )
}

const RightSidebar = () => {
  return (
    <div className='home-creators'>
      <h2 className='h3-bold'>Top Creators</h2>
      <TopCreators />
    </div>
  )
}

export default RightSidebar

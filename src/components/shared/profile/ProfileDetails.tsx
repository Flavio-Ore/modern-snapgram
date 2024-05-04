import EditIcon from '@/components/icons/EditIcon'
import LoaderIcon from '@/components/icons/LoaderIcon'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetUserById, useUser } from '@/lib/queries/queries'
import { type FC, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

interface ProfileButtonProps {
  className?: string
  idMatch: boolean
}
const ProfileButtons: React.FC<ProfileButtonProps> = ({
  idMatch,
  className
}) => (
  <div className={className}>
    {idMatch && (
      <Link
        to='/update-profile'
        className='flex-center gap-2 small-medium py-2.5  px-5 bg-dark-3 hover:bg-light-4 rounded-lg transition'
      >
        <EditIcon className='size-5 fill-secondary-500' />
        Edit Profile
      </Link>
    )}
    {!idMatch && [
      <Button
        key='follow'
        className='shad-button_primary px-5 py-2.5 hover:bg-primary-600'
      >
        <p className='small-medium'>Follow</p>
      </Button>,
      <Button
        key='message'
        className='shad-button_ghost bg-light-1 text-dark-1 hover:bg-light-4'
      >
        <p className='small-semibold'>Message</p>
      </Button>
    ]}
  </div>
)

type UserStats = Array<{ name: string, value: number }>
interface ProfileStatsProps {
  stats: UserStats
}
const ProfileStats: FC<ProfileStatsProps> = ({ stats }) => (
  <div className='grid grid-flow-row xxs:flex place-items-center w-full max-w-lg gap-1 xxs:gap-0'>
    {stats.map(({ name, value }) => (
      <Button
        key={name}
        className='shad-button_ghost small-medium md:body-medium'
      >
        <span className='text-primary-500'>{value}</span> {name}
      </Button>
    ))}
  </div>
)


const ProfileDetails = () => {
  const { id } = useParams()
  const { data: account, isLoading: isSessionLoading } = useUser()
  const {
    data: user,
    isLoading: isUserLoading,
    isError,
    isFetched
  } = useGetUserById({ userId: id ?? '' })

  const isCurrentUser = useMemo(() => id === account?.data?.$id, [id, account])

  const profileStats = useMemo(
    () => ({
      posts: user?.data?.posts?.length ?? 0,
      followers: user?.data?.followers?.length ?? 0,
      following: user?.data?.following?.length ?? 0
    }),
    [user]
  )
  const isLoading = isSessionLoading || isUserLoading
  const stats: UserStats = Object.keys(profileStats).map(key => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: profileStats[key as keyof typeof profileStats]
  }))
  return (
    <div className='profile-inner_container'>
      {isLoading && (
        <Skeleton className='min-h-[150px] min-w-[150px] rounded-full' />
      )}
      {isError && (
        <p className='body-bold text-red-500 max-w-xl text-pretty'>
          Something went wrong...
        </p>
      )}
      {!isLoading && !isError && (
        <img
          src={
            user?.data?.imageUrl ?? '/assets/icons/profile-placeholder.svg'
          }
          alt={user?.data?.name ?? 'Profile Avatar'}
          height={150}
          width={150}
          className='rounded-full'
        />
      )}
      <div className='flex justify-between items-start flex-col h-full gap-2 xl:gap-0 w-full overflow-ellipsis'>
        {isLoading && <Skeleton className='h-4 w-1/2' />}
        {isError && (
          <p className='base-regular text-light-2 max-w-xl text-pretty'>
            Error loading name...
          </p>
        )}
        {!isLoading && !isError && (
          <div className='flex-between flex-col md:flex-row gap-2 xl:gap-0 w-full min-w-0 overflow-ellipsis'>
            <h2 className='body-medium text-center md:text-justify xs:h3-bold w-full lg:h1-semibold overflow-ellipsis'>
              {user?.data?.name}
            </h2>
            {isFetched && user?.data != null
              ? (
              <ProfileButtons idMatch={isCurrentUser} className='flex gap-1' />
                )
              : (
              <div className='w-1/2'>
                <LoaderIcon />
              </div>
                )}
          </div>
        )}
        {isLoading && <Skeleton className='h-3 w-[100px]' />}
        {isError && (
          <p className='base-regular text-light-2 max-w-xl text-pretty'>
            Error loading username...
          </p>
        )}
        {!isError && !isLoading && (
          <h3 className='md:self-start self-center small-medium xs:base-medium text-light-3'>
            @{user?.data?.username ?? 'Not Found'}
          </h3>
        )}

        <ProfileStats stats={stats} />
        {isLoading && (
          <>
            <Skeleton className='h-4 w-9/12' />
            <Skeleton className='h-4 w-9/12' />
          </>
        )}
        {isError && (
          <p className='base-regular text-light-2 max-w-xl text-pretty'>
            Error loading bio...
          </p>
        )}
        {!isError && !isLoading && user?.data != null && (
          <p className='base-regular text-light-2 max-w-xl text-pretty'>
            {user.data?.bio ?? ''}
          </p>
        )}
      </div>
    </div>
  )
}

export default ProfileDetails

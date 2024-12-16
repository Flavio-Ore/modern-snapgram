import LoaderIcon from '@/components/icons/LoaderIcon'
import ProfileActions from '@/components/shared/profile/ProfileActions'
import ProfileStats from '@/components/shared/profile/ProfileStats'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetUserById, useUser } from '@/states/query/hooks/queries'
import { type UserStats } from '@/types'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

const ProfileDetails = () => {
  const { id } = useParams()
  const { data: sessionUser, isLoading: isSessionLoading } = useUser()
  const {
    data: profileUser,
    isLoading: isUserLoading,
    isError,
    isFetched
  } = useGetUserById({ userId: id ?? '' })

  const profileStats = useMemo(
    () => ({
      posts: profileUser?.posts?.length ?? 0,
      followers: profileUser?.followers?.length ?? 0,
      following: profileUser?.followings?.length ?? 0
    }),
    [profileUser]
  )
  const isLoading = useMemo(
    () => isUserLoading || isSessionLoading,
    [isUserLoading, isSessionLoading]
  )
  const stats: UserStats = useMemo(
    () =>
      Object.keys(profileStats).map(key => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: profileStats[key as keyof typeof profileStats]
      })),
    [profileStats]
  )
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
          src={profileUser?.imageUrl ?? '/assets/icons/profile-placeholder.svg'}
          alt={profileUser?.name ?? 'Profile Avatar'}
          height={144}
          width={144}
          className='rounded-full aspect-square object-cover'
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
              {profileUser?.name}
            </h2>
            {isFetched && sessionUser != null && profileUser != null
              ? (
              <ProfileActions
                currentUser={sessionUser}
                profileUser={profileUser}
                className='flex gap-4'
              />
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
            @{profileUser?.username ?? 'Not Found'}
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
        {!isError && !isLoading && (
          <p className='base-regular text-light-2 max-w-xl text-pretty'>
            {profileUser?.bio ?? ''}
          </p>
        )}
      </div>
    </div>
  )
}

export default ProfileDetails

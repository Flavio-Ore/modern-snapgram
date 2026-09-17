import Loader from '@/components/shared/Loader'
import { Button } from '@/components/ui/button'
import { useGetCurrentUser, useGetUserById } from '@/lib/queries/queries'
import { useParams } from 'react-router-dom'
import NotFound from './NotFound'

const Profile = () => {
  const { data: sessionUser } = useGetCurrentUser()
  const { id } = useParams()
  const {
    data: user,
    isLoading,
    isError
  } = useGetUserById({ userId: id || '' })
  console.log('sessionUser :>> ', sessionUser)
  console.log('param :>> ', { paramId: id })
  console.log('user :>> ', user)

  if (isLoading) return <Loader />
  if (isError) return <p>Something went wrong</p>
  if (!user) return <NotFound />
  if (!sessionUser) return <NotFound />

  return (
    <div className='profile-container'>
      <div className='profile-inner_container'>
        <img
          src={id === sessionUser.id ? sessionUser.imageUrl : user.imageUrl}
          alt={id === sessionUser.id ? sessionUser.name : user.name}
          className='h-[150px] w-[150px] rounded-full aspect-square'
        />
        <div className='flex-between flex-col gap-4 h-full'>
          <div className='flex-between flex-col md:flex-row  w-full xs:gap-5 gap-2'>
            <h2 className='body-medium xs:h3-bold lg:h2-bold max-w-48 lg:max-w-72 xl:max-w-2xl text-overflow-ellipsis'>
              {id === sessionUser.id ? sessionUser.name : user.name}
            </h2>
            {id === sessionUser.$id ? (
              <Button className='shad-button_dark_4 hover:bg-primary-600'>
                <img
                  src='/assets/icons/edit-profile.svg'
                  alt='edit'
                  className='h-[18px] w-[18px] invert-primary aspect-square stroke-secondary-500'
                />
                Edit Profile
              </Button>
            ) : (
              <div className='flex-center gap-1'>
                <Button className='shad-button_primary px-5 py-2.5 hover:bg-primary-600'>
                  <p className='small-medium'>Follow</p>
                </Button>
                <Button className='shad-button_ghost bg-light-1 text-dark-1 hover:bg-light-4'>
                  <p className='small-semibold'>Message</p>
                </Button>
              </div>
            )}
          </div>
          <h3 className='xs:self-start self-center base-medium text-light-3'>
            @{id === sessionUser.id ? sessionUser.username : user.username}
          </h3>
          <div className='flex-center xs:self-start self-center xs:flex-row flex-col '>
            <Button className='shad-button_ghost'>
              <span className='text-primary-500'>
                {id === sessionUser?.$id
                  ? sessionUser.posts?.length || 0
                  : user.posts?.length || 0}
              </span>{' '}
              Posts
            </Button>
            <Button className='shad-button_ghost'>
              <span className='text-primary-500'>
                {id === sessionUser.$id
                  ? sessionUser.liked?.length || 0
                  : user.liked?.length || 0}
              </span>{' '}
              Liked
            </Button>
            <Button className='shad-button_ghost'>
              <span className='text-primary-500'>
                {id === sessionUser.$id
                  ? sessionUser.followers?.length || 0
                  : user.followers?.length || 0}
              </span>{' '}
              Following
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

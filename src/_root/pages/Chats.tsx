import ChatsIcon from '@/components/icons/ChatsIcon'
import Loader from '@/components/shared/app/Loader'
import Chat from '@/components/shared/chats/Chat'
import { useGetUserById, useGetUsers, useUser } from '@/lib/queries/queries'
import { cn } from '@/lib/utils'
import { Link, useParams } from 'react-router-dom'

const Chats = () => {
  const { data: userRes } = useUser()
  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isUsersError
  } = useGetUsers({ limit: 10 })
  const { id: userId } = useParams()
  const {
    data: userToChat,
    isLoading: isChatLoading,
    isError: isChatError
  } = useGetUserById({
    userId: userId ?? ''
  })
  return (
    <div className='common-container'>
      <div className='flex-center flex-col flex-1 w-full gap-4 md:flex-row'>
        <div
          className={cn('size-full p-2 gap-4 transition-[flex-basis]', {
            'basis-full': userId == null,
            'basis-1/3': userId != null
          })}
        >
          <div className='flex-start gap-3 mb-4'>
            <ChatsIcon className='size-9 fill-light-1' />
            <h1 className='h1-bold'>All Chats</h1>
          </div>
          {isUsersLoading && <Loader />}
          {isUsersError && (
            <div className='flex-center flex-col gap-4'>
              <h1 className='h1-bold'>Error fetching users</h1>
              <Link to='/chats' className='button_secondary'>
                Try again
              </Link>
            </div>
          )}
          <ul>
            {users?.map(
              user =>
                user.accountId !== userRes?.accountId && (
                  <li key={user.$id}>
                    <Link
                      to={`/chats/${user.$id}`}
                      className="flex-between hover:bg-dark-3 pr-4 pb-2 after:content-[''] after:rounded-full after:bottom-0 after:left-3 after:size-3 after:bg-green-500 px-1"
                    >
                      <div className='flex-start gap-4 py-4'>
                        <img
                          src={user?.imageUrl}
                          alt='User profile picture'
                          height='56'
                          width='56'
                          className='rounded-full aspect-square object-cover'
                        />
                        <div className='flex gap-1 flex-col text-light-3'>
                          <p className='body-medium text-light-1'>
                            {user?.name}
                          </p>
                          <p className='gap-2 text-light-3'>
                            @{user?.username}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <hr className='border w-full border-dark-4/80' />
                  </li>
                )
            )}
          </ul>
        </div>

        {userId != null && isChatLoading && <div className='basis-2/3 size-full flex-center'><Loader /></div>}
        {userId != null && isChatError && (
          <div className='basis-2/3 flex-center flex-col gap-4'>
            <h1 className='h1-bold'>User not found</h1>
            <Link to='/chats' className='button_secondary'>
              Go back to chats
            </Link>
          </div>
        )}
        {userId != null && userToChat != null && <Chat user={userToChat} />}
      </div>
    </div>
  )
}

export default Chats

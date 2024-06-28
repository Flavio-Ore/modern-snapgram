import ChatsIcon from '@/components/icons/ChatsIcon'
import Chat from '@/components/shared/chats/Chat'
import ChatItem from '@/components/shared/chats/ChatItem'
import ChatSkeleton from '@/components/shared/skeletons/ChatSkeleton'
import ChatsSkeleton from '@/components/shared/skeletons/UsersToChatSkeleton'
import { useGetAliveChats, useGetUserById } from '@/lib/queries/queries'
import { cn } from '@/lib/utils'
import { FlameKindlingIcon, MessageSquareWarningIcon, TentTreeIcon, TreesIcon } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const Chats = () => {
  const { id: userChatId } = useParams()
  const {
    data: usersToChat,
    isLoading: isUsersLoading,
    isError: isUsersError
  } = useGetAliveChats()
  const {
    data: userToChat,
    isLoading: isChatLoading,
    isError: isChatError
  } = useGetUserById({
    userId: userChatId ?? ''
  })

  return (
    <div className='flex flex-col flex-1 items-center gap-10 overflow-y-scroll p-0 md:py-10 md:px-8 lg:p-14 custom-scrollbar'>
      <div className='flex-center md:flex-1 size-full gap-4 flex-col md:flex-row'>
        <div
          className={cn(
            'size-full p-2 gap-4 transition-[flex-basis] lg:basis-1/3',
            {
              hidden: usersToChat != null && usersToChat?.length <= 0,
              'hidden lg:block': userChatId != null
            }
          )}
        >
          <div className='flex-start items-center mb-4 gap-3'>
            <ChatsIcon className='size-9 fill-primary-500' />
            <h1 className='xs:h2-bold h3-bold'>All Chats</h1>
          </div>
          {isUsersLoading && <ChatsSkeleton />}
          {isUsersError && (
            <div className='flex-center size-full flex-col text-center  text-light-3 animate-pulse'>
              <MessageSquareWarningIcon size={64} />
              <h3 className='h1-bold'>Error finding friends!</h3>
              <p className='text-primary-500'>Try again later.</p>
            </div>
          )}
          <ul>
            {usersToChat != null &&
              usersToChat.length > 0 &&
              !isUsersError &&
              !isUsersLoading &&
              usersToChat.map(user => (
                <ChatItem key={user.$id} userSelectableToChat={user} />
              ))}
          </ul>
        </div>
        {userChatId == null && (
          <div className='flex-center flex-col basis-2/3 size-full gap-12'>
            <h2 className='h2-bold'>Select a chat to start messaging!</h2>
            <div className='flex-center'>
              <TreesIcon
                size={400}
                strokeWidth={0.75}
                className='size-full  stroke-green-950 hidden md:block'
              />
              <FlameKindlingIcon
                size={100}
                className='size-1/4 stroke-orange-950 self-end animate-pulse'
              />
              <TentTreeIcon
                size={400}
                strokeWidth={0.75}
                className='size-full stroke-stone-800'
              />
            </div>
            <Link
              to={'/all-users'}
              className='flex-center shad-button_dark_4 hover:bg-dark-2 body-bold text-light-2 hover:text-primary-500'
            >
              Find friends!
            </Link>
          </div>
        )}
        {userChatId != null && isChatLoading && <ChatSkeleton />}
        {userChatId != null && isChatError && (
          <div className='basis-2/3 flex-center flex-col gap-4'>
            <h1 className='h1-bold'>User not found</h1>
            <Link to='/chats' className='button_secondary'>
              Go back to chats
            </Link>
          </div>
        )}
        {userChatId != null && userToChat != null && (
          <Chat userToChatWith={userToChat} />
        )}
      </div>
    </div>
  )
}

export default Chats

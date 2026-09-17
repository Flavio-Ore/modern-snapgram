import ChatsIcon from '@/components/icons/ChatsIcon'
import Loader from '@/components/Loader'
import ChatItem from '@/features/chats/components/ChatItem'
import { appwriteConfig, client } from '@/services/config'
import { type ChatMemberModel } from '@/types'
import { cn } from '@/utils/cn'
import { useSessionUser } from '@auth/hooks/useSessionUser'
import Chat from '@chats/components/Chat'
import ChatSkeleton from '@chats/components/skeletons/ChatSkeleton'
import ChatsSkeleton from '@chats/components/skeletons/ChatsSkeleton'
import { useCreateChatRoomFromUsers } from '@chats/hooks/useCreateChatRoomFromUsers'
import { useGetAllChatRoomsByUserId } from '@chats/hooks/useGetAllChatRoomsByUserId'
import {
  FlameKindlingIcon,
  MessageSquareWarningIcon,
  TentTreeIcon,
  TreesIcon
} from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

const Chats = () => {
  const { chatRoomId } = useParams()
  const {
    data: user,
    isLoading: loadingUser,
    isError: errorUser
  } = useSessionUser()
  const { isPending: isPendingChatRoom } = useCreateChatRoomFromUsers()
  const chatRoomsIds = useMemo(
    () => user?.chats.map(chat => chat.chat_room.$id) ?? [],
    [user]
  )
  const {
    data: chatRooms,
    isLoading: loadingChats,
    isError: errorChats,
    refetch: refetchChats
  } = useGetAllChatRoomsByUserId({
    chatRoomsIds
  })
  const membersExceptCurrentUser = useMemo(
    () =>
      chatRooms?.flatMap(chatRoom =>
        chatRoom.members.filter(chat => chat.member.$id !== user?.$id)
      ) ?? [],
    [chatRooms, user]
  )

  const chatRoomSelected = useMemo(
    () => chatRooms?.find(chat => chat.$id === chatRoomId) ?? null,
    [chatRooms, chatRoomId]
  )
  const chatMemberChannels = useMemo(
    () =>
      membersExceptCurrentUser.map(
        chatMemberId =>
          `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.chatMemberCollectionId}.documents.${chatMemberId.$id}`
      ),
    [membersExceptCurrentUser]
  )

  useEffect(() => {
    if (chatMemberChannels.length <= 0 || user == null) return
    const unsubscribeOtherMemberChats = client.subscribe<ChatMemberModel>(
      chatMemberChannels,
      ({ payload, events }) => {
        if (
          events.includes(
            `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.chatMemberCollectionId}.documents.*.update`
          )
        ) {
          if (membersExceptCurrentUser.some(chat => chat.$id === payload.$id)) {
            refetchChats()
          }
        }
      }
    )

    return () => {
      unsubscribeOtherMemberChats()
    }
  }, [user, chatMemberChannels])
  return (
    <div className='flex flex-col flex-1 items-center gap-10 overflow-y-scroll p-0 md:py-10 md:px-8 lg:p-14 custom-scrollbar'>
      <div className='flex-center md:flex-1 size-full gap-4 flex-col md:flex-row'>
        <div
          className={cn(
            'size-full p-2 gap-4 transition-[flex-basis] lg:basis-1/3',
            {
              hidden: chatRooms != null && chatRooms.length <= 0,
              'hidden lg:block': chatRoomId != null
            }
          )}
        >
          <div className='flex-start items-center mb-4 gap-3'>
            <ChatsIcon className='size-9 fill-primary-500' />
            <h1 className='xs:h2-bold h3-bold'>All Chats</h1>
          </div>
          {(loadingUser || loadingChats) && <ChatsSkeleton />}
          {(errorUser || errorChats) && (
            <div className='flex-center size-full flex-col text-center  text-light-3 animate-pulse'>
              <MessageSquareWarningIcon size={64} />
              <h3 className='h1-bold'>Error finding friends!</h3>
              <p className='text-primary-500'>Try again later.</p>
            </div>
          )}
          {(chatRooms == null || chatRooms.length <= 0) &&
            !loadingUser &&
            !loadingChats &&
            !errorUser &&
            !errorChats && (
              <div className='flex-center size-full flex-col text-center  text-light-3'>
                <MessageSquareWarningIcon size={64} />
                <h3 className='h1-bold'>No chats found!</h3>
                <p className='text-primary-500'>Start chatting with friends.</p>
              </div>
          )}
          <ul>
            {isPendingChatRoom && (
              <li className='flex-center gap-2 w-10'>
                <Loader />
                <p className='text-light-3'>Creating chat...</p>
              </li>
            )}
            {chatRooms != null &&
              user != null &&
              chatRooms.length > 0 &&
              chatRooms.map(chatRoom => (
                <ChatItem
                  key={chatRoom.$id}
                  selectableChatRoom={chatRoom}
                  currentUser={user}
                />
              ))}
          </ul>
        </div>
        {chatRoomId == null && (
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
        {chatRoomId != null && loadingUser && <ChatSkeleton />}
        {chatRoomId != null && errorUser && (
          <div className='basis-2/3 flex-center flex-col gap-4'>
            <h1 className='h1-bold'>User not found</h1>
            <Link to='/chats' className='button_secondary'>
              Go back to chats
            </Link>
          </div>
        )}
        {chatRoomId != null &&
          user != null &&
          chatRooms != null &&
          chatRoomSelected != null &&
          !loadingUser &&
          !loadingChats &&
          !errorUser &&
          !errorChats && <Chat chatRoom={chatRoomSelected} />}
      </div>
    </div>
  )
}

export default Chats

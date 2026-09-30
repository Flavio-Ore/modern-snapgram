import { appwriteConfig } from '@shared/config'
import { client } from '@shared/api'
import { ChatSkeleton } from '@shared/ui'
import { useCreateChatRoomFromUsers } from '@features/chat-messaging'
import { useGetAllChatRoomsByUserId } from '@entities/message'
import { useSessionUser } from '@entities/user'
import { cn } from '@shared/lib'
import type { ChatMemberModel } from '@shared/types'
import { ChatListPane, ChatPane } from '@widgets/chat-pane'
import { FlameKindlingIcon, TentTreeIcon, TreesIcon } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

export const ChatsPage = () => {
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
      ({ events }) => {
        if (
          events.includes(
            `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.chatMemberCollectionId}.documents.*.update`
          )
        ) {
          void refetchChats()
        }
      }
    )
    return () => {
      unsubscribeOtherMemberChats()
    }
  }, [chatMemberChannels, user, refetchChats])

  return (
    <div className='flex flex-1 size-full p-2 lg:p-4'>
      <div className='flex w-full h-[calc(100vh-100px)] gap-4'>
        <ChatListPane
          chatRooms={chatRooms}
          currentUser={user}
          isLoading={loadingUser || loadingChats}
          isError={errorUser || errorChats}
          isPendingChatRoom={isPendingChatRoom}
          className={cn({
            'hidden lg:flex': chatRoomId != null
          })}
        />

        {chatRoomId == null && (
          <div className='hidden lg:flex flex-center flex-col basis-2/3 size-full gap-12 bg-dark-2 rounded-xl p-8'>
            <h2 className='h2-bold'>Select a chat to start messaging!</h2>
            <div className='flex-center'>
              <TreesIcon
                size={400}
                strokeWidth={0.75}
                className='size-full stroke-green-950 hidden md:block'
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
              to={'/people'}
              className='flex-center shad-button_dark_4 hover:bg-dark-2 body-bold text-light-2 hover:text-primary-500 py-3 px-6 rounded-lg'
            >
              Find friends!
            </Link>
          </div>
        )}

        {chatRoomId != null && loadingUser && <ChatSkeleton />}

        {chatRoomId != null && errorUser && (
          <div className='basis-2/3 flex-center flex-col gap-4 bg-dark-2 rounded-xl'>
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
          !errorChats && <ChatPane chatRoom={chatRoomSelected} />}
      </div>
    </div>
  )
}

export default ChatsPage

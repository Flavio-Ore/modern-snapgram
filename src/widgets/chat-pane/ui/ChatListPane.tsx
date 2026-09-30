import { ChatsIcon, ChatsSkeleton, Loader } from '@shared/ui'
import { ChatMemberCard } from '@entities/message'
import { cn } from '@shared/lib/cn'
import type { ChatRoomModel, UserModel } from '@shared/types'
import { MessageSquareWarningIcon } from 'lucide-react'

export interface ChatListPaneProps {
  chatRooms?: ChatRoomModel[] | null
  currentUser?: UserModel | null
  isLoading?: boolean
  isError?: boolean
  isPendingChatRoom?: boolean
  className?: string
}

export const ChatListPane = ({
  chatRooms,
  currentUser,
  isLoading = false,
  isError = false,
  isPendingChatRoom = false,
  className
}: ChatListPaneProps) => {
  return (
    <div
      className={cn(
        'flex flex-col basis-1/3 bg-dark-2 rounded-xl p-4 gap-4 overflow-y-auto custom-scrollbar',
        className
      )}
    >
      <div className='flex items-center gap-3 px-2'>
        <ChatsIcon className='size-7 fill-primary-500' />
        <h2 className='h3-bold'>Chats</h2>
      </div>

      {isLoading && <ChatsSkeleton />}

      {isError && (
        <div className='flex-center size-full flex-col text-center text-light-3 animate-pulse'>
          <MessageSquareWarningIcon size={64} />
          <h3 className='h1-bold'>Error finding friends!</h3>
          <p className='text-primary-500'>Try again later.</p>
        </div>
      )}

      {!isLoading && !isError && (!chatRooms || chatRooms.length === 0) && (
        <div className='flex-center size-full flex-col text-center text-light-3'>
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
          currentUser != null &&
          chatRooms.length > 0 &&
          chatRooms.map(chatRoom => (
            <ChatMemberCard
              key={chatRoom.$id}
              selectableChatRoom={chatRoom}
              currentUser={currentUser}
            />
          ))}
      </ul>
    </div>
  )
}

export default ChatListPane

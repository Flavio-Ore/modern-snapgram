import type { ChatRoomModel } from '../model/types'
import type { UserModel } from '@shared/types'
import { cn } from '@shared/lib/cn'
import { multiFormatDateString } from '@shared/lib/multiFormatDateString'
import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

export interface ChatMemberCardProps {
  selectableChatRoom?: ChatRoomModel
  chatRoom?: ChatRoomModel
  currentUser?: UserModel
  currentUserId?: string
  className?: string
}

export const ChatMemberCard = ({
  selectableChatRoom: propSelectable,
  chatRoom: propChatRoom,
  currentUser,
  currentUserId: propCurrentUserId,
  className
}: ChatMemberCardProps) => {
  const room = (propSelectable ?? propChatRoom)!
  const { chatRoomId } = useParams()
  const activeUserId = propCurrentUserId ?? currentUser?.$id ?? ''

  const currentMember = useMemo(
    () =>
      room?.members?.find(
        chatMember => chatMember.member?.$id === activeUserId
      ) ?? null,
    [room, activeUserId]
  )

  const otherMembers = useMemo(
    () =>
      room?.members?.filter(
        chatMember => chatMember.member?.$id !== activeUserId
      ) ?? [],
    [room, activeUserId]
  )

  const otherMember = otherMembers[0]?.member
  const isOnline = otherMembers.some(m => m.online)

  const lastMessage = useMemo(() => {
    const messages = room?.messages ?? []
    return messages.length === 0 ? null : messages[messages.length - 1]
  }, [room])

  const lastMessageAuthor = useMemo(() => {
    if (lastMessage?.author_chat_id == null) return ''
    return (
      room?.members?.find(
        member => member.$id === lastMessage.author_chat_id
      )?.member?.name ?? ''
    )
  }, [lastMessage, room])

  const isCurrentChat = chatRoomId === room?.$id

  return (
    <li className={cn('relative', className)}>
      <Link
        to={`/chats/${room?.$id}`}
        className={cn(
          "flex-between px-3 bg-dark-1 hover:bg-dark-2 after:content-[''] after:absolute after:rounded-full after:top-1/4 after:right-3 after:size-3 after:bg-gray-500",
          {
            'bg-dark-2': isCurrentChat,
            'after:bg-green-500': isOnline,
            'after:bg-red-500': !isOnline
          }
        )}
      >
        <div className='flex-start gap-x-4 py-3'>
          <img
            src={otherMember?.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt='User profile picture'
            height='56'
            width='56'
            className='size-14 rounded-full aspect-square object-cover'
            loading='lazy'
          />
          <div className='flex flex-col overflow-ellipsis gap-y-1'>
            <div>
              <p className='base-medium text-light-2 max-w-64 overflow-ellipsis'>
                {otherMember?.name ?? 'Unknown user'}
              </p>
              <p className='small-regular text-light-4 max-w-64 overflow-ellipsis'>
                @{otherMember?.username ?? 'user'}
              </p>
            </div>
            <div>
              <p className='subtle-regular text-light-2 lg:text-justify max-w-64 overflow-ellipsis'>
                {lastMessageAuthor ? <span className='text-light-3'>{lastMessageAuthor}: </span> : null}
                {lastMessage?.body ?? ''}
              </p>
              {lastMessage?.$createdAt && (
                <p className='tiny-medium text-light-3'>
                  {multiFormatDateString(lastMessage.$createdAt)}
                </p>
              )}
              {currentMember?.messages_to_read != null &&
                currentMember.messages_to_read > 0 && (
                  <span className='block absolute text-dark-1 subtle-regular bg-secondary-500 size-4 text-center pb-4 rounded-sm shadow-[0px_0px_6px_0.5px_#FFB620] shadow-secondary-500 top-1/2 right-4'>
                    {currentMember.messages_to_read}
                  </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <hr className='border w-full border-dark-4/80' />
    </li>
  )
}

export default ChatMemberCard

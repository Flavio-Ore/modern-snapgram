import { cn, multiFormatDateString } from '@/lib/utils'
import { type ChatRoomModel, type UserModel } from '@/types'
import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

const ChatItem = ({
  currentUser,
  selectableChatRoom
}: {
  currentUser: UserModel
  selectableChatRoom: ChatRoomModel
}) => {
  const { chatRoomId } = useParams()
  const currentMember = useMemo(
    () =>
      selectableChatRoom?.members.find(
        chatMember => chatMember.member.$id === currentUser?.$id
      ) ?? null,
    [selectableChatRoom, currentUser]
  )
  const membersExceptCurrentUser = useMemo(
    () =>
      selectableChatRoom?.members.filter(
        chatMember => chatMember.member.$id !== currentUser?.$id
      ) ?? [],
    [selectableChatRoom, currentUser]
  )
  const lastMessage = useMemo(() => {
    const messages = selectableChatRoom?.messages ?? []
    return messages[messages.length - 1]
  }, [selectableChatRoom])

  const lastMessageAuthor = useMemo(() => {
    return (
      selectableChatRoom.members.find(
        member => member.$id === lastMessage.author_chat_id
      )?.member.name ?? ''
    )
  }, [lastMessage])

  return (
    <li className='relative'>
      <Link
        to={`/chats/${selectableChatRoom.$id}`}
        className={cn(
          "flex-between px-3 bg-dark-1 hover:bg-dark-2 after:content-[''] after:absolute after:rounded-full after:top-1/4 after:right-3 after:size-3 after:bg-gray-500",
          {
            'bg-dark-2': chatRoomId === selectableChatRoom.$id,
            'after:bg-green-500': membersExceptCurrentUser.some(
              memberChat => memberChat.online
            ),
            'after:bg-red-500': membersExceptCurrentUser.every(
              memberChat => !memberChat.online
            )
          }
        )}
      >
        <div className='flex-start gap-x-4 py-3'>
          <img
            src={membersExceptCurrentUser[0]?.member.imageUrl}
            alt='User profile picture'
            height='56'
            width='56'
            className='rounded-full aspect-square object-cover'
          />
          <div className='flex flex-col overflow-ellipsis gap-y-1'>
            <div>
              <p className='base-medium text-light-2 max-w-64 overflow-ellipsis'>
                {membersExceptCurrentUser[0]?.member.name}
              </p>
              <p className='small-regular text-light-4 max-w-64 overflow-ellipsis'>
                @{membersExceptCurrentUser[0]?.member.username}
              </p>
            </div>
            <div>
              <p className='subtle-regular text-light-2 lg:text-justify max-w-64 overflow-ellipsis'>
                <span className='text-light-3'>{lastMessageAuthor}</span> :{' '}
                {lastMessage?.body ?? ''}
              </p>
              <p className='tiny-medium text-light-3'>
                {multiFormatDateString(lastMessage?.$createdAt ?? '')}{' '}
              </p>
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

export default ChatItem

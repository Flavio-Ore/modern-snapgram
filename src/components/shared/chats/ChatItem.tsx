import { Skeleton } from '@/components/ui/skeleton'
import { useGetInfiniteMessages } from '@/lib/queries/infiniteQueries'
import { useUser } from '@/lib/queries/queries'
import { cn, multiFormatDateString } from '@/lib/utils'
import { type UserModel } from '@/types'
import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

const ChatItem = ({
  userSelectableToChat
}: {
  userSelectableToChat: UserModel
}) => {
  const { id: userChatId } = useParams()
  const { data: currentUser } = useUser()
  const { data: infiniteMessages, isLoading: isMessagesLoading } =
    useGetInfiniteMessages({
      senderId: currentUser?.accountId ?? '',
      receiversId: [userSelectableToChat?.accountId ?? '']
    })
  const lastMessage = useMemo(() => {
    console.log('infiniteMessages :>> ', infiniteMessages)
    const lastResponse =
      infiniteMessages?.pages[infiniteMessages.pages.length - 1]
    return lastResponse?.data[lastResponse.data.length - 1]
  }, [infiniteMessages])
  return (
    <li className='relative'>
      <Link
        to={`/chats/${userSelectableToChat.$id}`}
        className={cn(
          "flex-between px-3 bg-dark-1 hover:bg-dark-2 after:content-[''] after:absolute after:rounded-full after:top-1/4 after:right-3 after:size-3 after:bg-green-500",
          {
            'bg-dark-2': userChatId === userSelectableToChat.$id
          }
        )}
      >
        <div className='flex-start gap-x-4 py-3'>
          <img
            src={userSelectableToChat?.imageUrl}
            alt='User profile picture'
            height='56'
            width='56'
            className='rounded-full aspect-square object-cover'
          />
          <div className='flex flex-col overflow-ellipsis gap-y-1'>
            <div>
              <p className='base-medium text-light-2 max-w-64 overflow-ellipsis'>
                {userSelectableToChat?.name}
              </p>
              <p className='small-regular text-light-4 max-w-64 overflow-ellipsis'>
                @{userSelectableToChat?.username}
              </p>
            </div>
            {isMessagesLoading && (
              <div>
                <Skeleton className='w-full h-2 mb-1' />
                <Skeleton className='w-2/3 h-1' />
              </div>
            )}
            {!isMessagesLoading && (
              <div>
                <p className='subtle-regular text-light-2 lg:text-justify max-w-64 overflow-ellipsis'>
                  {lastMessage?.body ?? ''}
                </p>
                <p className='tiny-medium text-light-3'>
                  {multiFormatDateString(lastMessage?.$createdAt ?? '')}{' '}
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
      <hr className='border w-full border-dark-4/80' />
    </li>
  )
}

export default ChatItem

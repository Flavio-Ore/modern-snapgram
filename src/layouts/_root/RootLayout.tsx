import Bottombar from '@/components/shared/app/Bottombar'
import LeftSidebar from '@/components/shared/app/LeftSidebar'
import Topbar from '@/components/shared/app/Topbar'
import { Skeleton } from '@/components/ui/skeleton'
import { cn, extractFirstRoutePart } from '@/lib/utils'
import { appwriteConfig, client } from '@/services/appwrite/config'
import { useAccount } from '@/states/account/hooks/useAccountContext'
import { useSetChatMemberOnline } from '@/states/query/hooks/mutations'
import { useGetAllChatRoomsByUserId, useUser } from '@/states/query/hooks/queries'
import { type MessageModel } from '@/types'
import { links } from '@/values'
import { lazy, Suspense, useEffect, useMemo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const Outlet = lazy(
  async () =>
    await import('react-router-dom').then(module => ({
      default: module.Outlet
    }))
)

const RootLayout = () => {
  const { pathname } = useLocation()
  const { isAuthenticated, isLoading } = useAccount()
  const { data: user } = useUser()
  const { mutateAsync: updateStatus } = useSetChatMemberOnline()
  const chatRoomsIds = useMemo(
    () => user?.chats.map(chat => chat.chat_room.$id) ?? [],
    [user]
  )
  const { data: allChatRooms, refetch: refetchChats } =
    useGetAllChatRoomsByUserId({
      chatRoomsIds
    })

  const ownChats = useMemo(
    () =>
      allChatRooms?.flatMap(chatRoom =>
        chatRoom.members.filter(chat => chat.member.$id === user?.$id)
      ) ?? null,
    [allChatRooms, user]
  )

  const totalMessagesToRead = useMemo(
    () => ownChats?.reduce((acc, chat) => acc + chat.messages_to_read, 0) ?? 0,
    [ownChats]
  )

  const ownChatMembersIds = useMemo(
    () => user?.chats.map(chat => chat.$id) ?? [],
    [user]
  )

  useEffect(() => {
    if (isAuthenticated) {
      updateStatus({
        chatIds: ownChatMembersIds,
        online: true
      })
    }
  }, [isAuthenticated, ownChatMembersIds])

  useEffect(() => {
    if (ownChatMembersIds.length <= 0) return
    const unsubscribeMessagesToRead = client.subscribe<MessageModel>(
      [
        `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents`
      ],
      ({ events, payload: newMessage }) => {
        if (
          events.includes(
            `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents.*.create`
          ) ||
          events.includes(
            `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents.*.update`
          ) ||
          events.includes(
            `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents.*.delete`
          )
        ) {
          if (
            ownChatMembersIds.some(id => id === newMessage.author_chat_id) ||
            newMessage.receivers_chat_id.some(id =>
              ownChatMembersIds.some(ownId => ownId === id)
            )
          ) {
            refetchChats()
          }
        }
      }
    )

    return () => {
      unsubscribeMessagesToRead()
    }
  }, [ownChatMembersIds])

  return isAuthenticated || !isLoading
    ? (
    <div className='w-full md:flex'>
      <Topbar totalMessagesToRead={totalMessagesToRead} />
      <LeftSidebar totalMessagesToRead={totalMessagesToRead} />
      <section
        className={cn('flex flex-1 size-full', {
          'overflow-ellipsis': pathname.startsWith('/profile')
        })}
      >
        <Suspense
          fallback={
            <Skeleton className='common-container flex-center backdrop-blur-sm size-full bg-primary-600/5'>
              <h2 className='h1-bold animate-pulse-fade-in'>
                {
                  links.sidebar.find(
                    ({ route }) =>
                      extractFirstRoutePart(pathname) ===
                      extractFirstRoutePart(route)
                  )?.label
                }
              </h2>
            </Skeleton>
          }
        >
          <Outlet />
        </Suspense>
      </section>
      <Bottombar />
    </div>
      )
    : (
    <Navigate to={'/sign-in'} />
      )
}

export default RootLayout

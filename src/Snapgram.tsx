import { links } from '@/routes/links'
import { appwriteConfig, client } from '@/services/config'
import { type MessageModel } from '@/types'
import { cn } from '@/utils/cn'
import { useAuth } from '@auth/hooks/useAuth'
import { useSessionUser } from '@auth/hooks/useSessionUser'
import { useSignOut } from '@auth/hooks/useSignOut'
import { useGetAllChatRoomsByUserId } from '@chats/hooks/useGetAllChatRoomsByUserId'
import { useSetChatMemberOnline } from '@chats/hooks/useSetChatMemberOnline'
import { Skeleton } from '@shadcn/skeleton'
import { useToast } from '@shadcn/use-toast'
import { lazy, Suspense, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { extractFirstRoutePart } from './utils/extractFirstRoutePart'

const Topbar = lazy(async () => await import('@/components/Topbar'))
const LeftSidebar = lazy(
  async () => await import('@/components/LeftSidebar')
)
const Bottombar = lazy(
  async () => await import('@/components/Bottombar')
)
const Outlet = lazy(
  async () =>
    await import('react-router-dom').then(module => ({
      default: module.Outlet
    }))
)

const Snapgram = () => {
  const { toast } = useToast()
  const { isPending: isSigninOut } = useSignOut()
  const { pathname } = useLocation()
  const { data: auth } = useAuth()
  const { data: user } = useSessionUser()
  const { mutateAsync: updateStatus } = useSetChatMemberOnline()
  const authentication = useMemo(
    () => ({
      isAuthenticated: auth?.data ?? false,
      errorCode: auth?.code ?? false
    }),
    [auth]
  )
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
    if (authentication.isAuthenticated) {
      updateStatus({
        chatIds: ownChatMembersIds,
        online: true
      })
    }
  }, [authentication, ownChatMembersIds])

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

  useEffect(() => {
    if (isSigninOut) {
      toast({
        title: 'Logging out...',
        description: 'Please wait while we log you out.',
        variant: 'default'
      })
    }
  }, [isSigninOut])

  return (
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
}

export default Snapgram

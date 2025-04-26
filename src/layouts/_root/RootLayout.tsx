import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { cn, extractFirstRoutePart } from '@/lib/utils'
import { appwriteConfig, client } from '@/services/appwrite/config'
import { useSetChatMemberOnline } from '@/states/TanStack-query/hooks/mutations/chats/useSetChatMemberOnline'
import { useSignOut } from '@/states/TanStack-query/hooks/mutations/session/useSignOut'
import { useGetAllChatRoomsByUserId } from '@/states/TanStack-query/hooks/queries/chats/useGetAllChatRoomsByUserId'
import { useAuth } from '@/states/TanStack-query/hooks/queries/session/useAuth'
import { useSessionUser } from '@/states/TanStack-query/hooks/queries/session/useSessionUser'
import { type MessageModel } from '@/types'
import { links } from '@/values/links'
import { lazy, Suspense, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const Topbar = lazy(async () => await import('@/components/shared/app/Topbar'))
const LeftSidebar = lazy(
  async () => await import('@/components/shared/app/LeftSidebar')
)
const Bottombar = lazy(
  async () => await import('@/components/shared/app/Bottombar')
)
const Outlet = lazy(
  async () =>
    await import('react-router-dom').then(module => ({
      default: module.Outlet
    }))
)

const RootLayout = () => {
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

export default RootLayout

import { appwriteConfig, links } from '@shared/config'
import { client } from '@shared/api'
import {
  useGetAllChatRoomsByUserId,
  useSetChatMemberOnline
} from '@entities/message'
import { useSessionUser } from '@entities/user'
import { useAuth, useSignOut } from '@features/auth-by-email'
import { cn, extractFirstRoutePart } from '@shared/lib'
import type { MessageModel } from '@shared/types'
import { Skeleton, useToast } from '@shared/ui'
import Bottombar from '@widgets/bottombar'
import LeftSidebar from '@widgets/left-sidebar'
import Topbar from '@widgets/topbar'
import { Suspense, useEffect, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export const AppLayout = () => {
  const { toast } = useToast()
  const { isPending: isSigninOut } = useSignOut()
  const { pathname } = useLocation()
  const { data: isAuth, isLoading: isLoadingAuth } = useAuth()
  const { data: user } = useSessionUser()
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
    if (isAuth != null && isAuth) {
      void updateStatus({
        chatIds: ownChatMembersIds,
        online: true
      })
    }
  }, [isAuth, isLoadingAuth, ownChatMembersIds, updateStatus])

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
            void refetchChats()
          }
        }
      }
    )

    return () => {
      unsubscribeMessagesToRead()
    }
  }, [ownChatMembersIds, refetchChats])

  useEffect(() => {
    if (isSigninOut) {
      toast({
        title: 'Logging out...',
        description: 'Please wait while we log you out.',
        variant: 'default'
      })
    }
  }, [isSigninOut, toast])

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

export default AppLayout

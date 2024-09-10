import Bottombar from '@/components/shared/app/Bottombar'
import LeftSidebar from '@/components/shared/app/LeftSidebar'
import Topbar from '@/components/shared/app/Topbar'
import { Skeleton } from '@/components/ui/skeleton'
import { useAccount } from '@/context/useAccountContext'
import { useGetAllChatRoomsByUserId, useUser } from '@/lib/queries/queries'
import { cn, extractFirstRoutePart } from '@/lib/utils'
import { appwriteConfig, client, databases } from '@/services/appwrite/config'
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
  const { data: allChatRooms, refetch: refetchChats } =
    useGetAllChatRoomsByUserId({
      userId: user?.$id ?? ''
    })

  console.log({
    allChatRooms: allChatRooms ?? 'All chat Rooms null'
  })
  const totalMessagesToRead = useMemo(() => {
    const allMemberChats = allChatRooms?.flatMap(chatRoom =>
      chatRoom.members.filter(chat => chat.member.$id === user?.$id)
    ) ?? []

    return allMemberChats.reduce(
      (acc, chat) => acc + chat.messages_to_read,
      0
    )
  }, [allChatRooms])

  const ownChatMembersIds = useMemo(
    () =>
      allChatRooms?.flatMap(chatRoom =>
        chatRoom.members.filter(chat => chat.member.$id !== user?.$id)
      ) ?? [],
    [allChatRooms]
  )

  useEffect(() => {
    ownChatMembersIds.forEach(async chatMemberId => {
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.chatMemberCollectionId,
        chatMemberId.$id,
        {
          online: true
        }
      )
    })
    const unsubscribeMessagesToRead = client.subscribe(
      [
        `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents`
      ],
      response => {
        console.log({ realTimeResponse: response })
        if (
          response.events.includes(
            'databases.*.collections.*.documents.*.create'
          ) ||
          response.events.includes(
            'databases.*.collections.*.documents.*.update'
          ) ||
          response.events.includes(
            'databases.*.collections.*.documents.*.delete'
          )
        ) {
          refetchChats()
        }
      }
    )

    return () => {
      unsubscribeMessagesToRead()
    }
  }, [])

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

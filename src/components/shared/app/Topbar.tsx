import ChatsIcon from '@/components/icons/ChatsIcon'
import Logo from '@/components/icons/Logo'
import LogoutDialog from '@/components/shared/app/LogoutDialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/lib/queries/queries'
import { cn, extractFirstRoutePart } from '@/lib/utils'
import { Link, useLocation, useParams } from 'react-router-dom'
const Topbar = () => {
  const { data: user, isLoading, isError } = useUser()
  const { id: userIdToChat } = useParams()
  const { pathname } = useLocation()

  return (
    <section
      className={cn('sticky top-0 z-50 md:hidden bg-dark-2 w-full', {
        hidden: userIdToChat != null
      })}
    >
      <div className='flex-between py-4 px-5'>
        <Link to='/' className='flex gap-3 items-center'>
          <Logo width={170} height={36} className='w-full' />
        </Link>

        <div className='flex gap-4'>
          <LogoutDialog />
          <Link
            to='/chats'
            className={cn('flex-center flex-col gap-1 p-2 transition', {
              'bg-dark-4 rounded-[10px]':
                extractFirstRoutePart(pathname) ===
                extractFirstRoutePart('/chats')
            })}
          >
            <ChatsIcon
              className={cn('size-6', {
                'fill-secondary-500':
                  extractFirstRoutePart(pathname) ===
                  extractFirstRoutePart('/chats')
              })}
            />
          </Link>
          {isLoading && <Skeleton className='min-w-8 min-h-8 rounded-full' />}
          {isError && (
            <Skeleton className='min-w-8 min-h-8 rounded-full bg-red-500/40' />
          )}
          {!isLoading && user?.data != null && (
            <Link
              to={`/profile/${user.data.$id}`}
              className='flex-center gap-3'
            >
              <img
                src={user.data.imageUrl}
                alt='profile'
                height={32}
                width={32}
                className='rounded-full'
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default Topbar

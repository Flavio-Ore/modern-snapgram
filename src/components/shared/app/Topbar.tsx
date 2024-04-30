import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Logo from '@/components/icons/Logo'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAccount } from '@/context/useAccountContext'
import { useSignOut } from '@/lib/queries/mutations'
import { LogOutIcon } from 'lucide-react'
const Topbar = () => {
  const navigate = useNavigate()
  const { user, isLoading } = useAccount()
  const { mutate: signOut, isSuccess } = useSignOut()

  const handleLogOut = () => {
    signOut()
  }

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess])

  return (
    <section className='topbar'>
      <div className='flex-between py-4 px-5'>
        <Link to='/' className='flex gap-3 items-center'>
          <Logo width={170} height={36} className='w-full'/>
        </Link>

        <div className='flex gap-4'>
          <Button
            variant='ghost'
            className='shad-button_ghost'
            onClick={handleLogOut}
          >
            <LogOutIcon size={24} className='stroke-red-500 w-full' />
          </Button>
          {isLoading && <Skeleton className='min-w-8 min-h-8 rounded-full' />}
          {!isLoading && user != null && (
            <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
              <img
                src={user.imageUrl}
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

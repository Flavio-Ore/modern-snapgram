import LoaderIcon from '@/components/icons/LoaderIcon'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { useAccount } from '@/states/account/hooks/useAccountContext'
import { CopyCheckIcon, CopyIcon } from 'lucide-react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
const Outlet = lazy(
  async () =>
    await import('react-router-dom').then(module => ({
      default: module.Outlet
    }))
)

const AuthSkeleton = () => (
  <Skeleton className='common-container animate-pulse-fade-in flex-center backdrop-blur-sm size-full bg-primary-600/5 '>
    <LoaderIcon className='stroke-secondary-500' />
  </Skeleton>
)

const AuthLayout = () => {
  const { isAuthenticated } = useAccount()
  const [isEmailClicked, setIsEmailClicked] = useState(false)
  const [isPasswordClicked, setIsPasswordClicked] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1280)
  const { toast } = useToast()
  const handleCLickEmail = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    window.navigator.clipboard.writeText('steban@gmail.com')
    setIsEmailClicked(prev => !prev)
    setTimeout(() => {
      setIsEmailClicked(false)
    }, 3000)
    toast({
      title: 'Email copied to clipboard'
    })
  }

  const handleClickPasswd = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    window.navigator.clipboard.writeText('gongongon')
    setIsPasswordClicked(prev => !prev)
    setTimeout(() => {
      setIsPasswordClicked(false)
    }, 3000)
    toast({
      title: 'Password copied to clipboard'
    })
  }
  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 1280)
  }

  useEffect(() => {
    if (isLargeScreen) {
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isLargeScreen])

  return isAuthenticated
    ? (
    <Navigate to={'/'} />
      )
    : (
    <>
      <section className='flex flex-1 items-center justify-center flex-col'>
        <Suspense fallback={<AuthSkeleton />}>
          <Outlet />
        </Suspense>
        <Dialog>
          <DialogTrigger
            asChild
            className='mt-2 p-2 cursor-pointer bg-dark-1 text-secondary-500 hover:text-light-3'
          >
            <h3 className='body-medium text-pretty text-center'>
              Try logging in without having to create an account!
            </h3>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md backdrop-blur-lg border-none'>
            <DialogHeader>
              <DialogTitle>Try out this free account!</DialogTitle>
            </DialogHeader>
            <div className='flex items-center space-x-2'>
              <div className='grid flex-1 gap-2'>
                <Label htmlFor='email' className='sr-only'>
                  email
                </Label>
                <Input
                  id='email'
                  className='shad-input'
                  defaultValue='steban@gmail.com'
                  readOnly
                />
              </div>
              <Button
                type='submit'
                size='sm'
                className='shad-button_primary px-3'
                onClick={handleCLickEmail}
              >
                <span className='sr-only'>Copy</span>
                {isEmailClicked
                  ? (
                  <CopyCheckIcon className='h-4 w-4' />
                    )
                  : (
                  <CopyIcon className='h-4 w-4' />
                    )}
              </Button>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='grid flex-1 gap-2'>
                <Label htmlFor='password' className='sr-only'>
                  password
                </Label>
                <Input
                  id='password'
                  className='shad-input '
                  defaultValue='gongongon'
                  readOnly
                />
              </div>
              <Button
                type='submit'
                size='sm'
                className='shad-button_primary px-3'
                onClick={handleClickPasswd}
              >
                <span className='sr-only'>Copy</span>
                {isPasswordClicked
                  ? (
                  <CopyCheckIcon className='h-4 w-4' />
                    )
                  : (
                  <CopyIcon className='h-4 w-4' />
                    )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>
      {isLargeScreen && (
        <img
          src='/assets/images/side-img.svg'
          alt='Galery of photos conceptual'
          className='hidden xl:block h-dvh w-1/2 object-cover bg-no-repeat aspect-auto'
        />
      )}
    </>
      )
}

export default AuthLayout

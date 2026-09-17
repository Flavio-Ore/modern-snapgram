import LoaderIcon from '@/components/icons/LoaderIcon'
import { Skeleton } from '@/components/ui/skeleton'
import { USER_ROUTES } from '@/routes/user'
import { useAuth } from '@auth/hooks/useAuth'
import { Button } from '@shadcn/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@shadcn/dialog'
import { Input } from '@shadcn/input'
import { Label } from '@shadcn/label'
import { useToast } from '@shadcn/use-toast'
import { CopyCheckIcon, CopyIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Auth = () => {
  const { data: isAuthenticated, isLoading } = useAuth()
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

  return (
    <>
      {isLoading && (
        <Skeleton className='common-container animate-pulse-fade-in flex-center backdrop-blur-sm size-full bg-primary-600/5 '>
          <LoaderIcon className='stroke-secondary-500' />
        </Skeleton>
      )}
      {!isLoading && isAuthenticated != null && isAuthenticated && (
        <Navigate to={USER_ROUTES.HOME} replace />
      )}
      {!isLoading && isAuthenticated != null && !isAuthenticated && (
        <>
          <section className='flex flex-1 items-center justify-center flex-col'>
            <Outlet />
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
      )}
    </>
  )
}

export default Auth

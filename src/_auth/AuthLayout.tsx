import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Label } from '@radix-ui/react-label'
import { CopyCheckIcon, CopyIcon } from 'lucide-react'
import { useState } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const [isEmailClicked, setIsEmailClicked] = useState(false)
  const [isPasswordClicked, setIsPasswordClicked] = useState(false)
  const { toast } = useToast()
  const isAuth = false

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

  return (
    <>
      {isAuth ? (
        <Navigate to='/' />
      ) : (
        <section className='flex flex-1 items-center justify-center flex-col'>
          <Outlet />
          {/* TO TEST THE APP */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='ghost' className='mt-2 border'>
                <h3 className='h3-bold text-light-2 p-4 hover:text-light-3'>
                  Try logging in without having to create an account!
                </h3>
              </Button>
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
                  {isEmailClicked ? (
                    <CopyCheckIcon className='h-4 w-4' />
                  ) : (
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
                  {isPasswordClicked ? (
                    <CopyCheckIcon className='h-4 w-4' />
                  ) : (
                    <CopyIcon className='h-4 w-4' />
                  )}
                </Button>
              </div>
              <DialogFooter className='sm:justify-start'>
                <DialogClose asChild>
                  <Button
                    type='button'
                    variant='ghost'
                    className='shad-button_primary'
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>
      )}
      <img
        src='/assets/images/side-img.svg'
        alt='galery of photos'
        className='hidden xl:block h-dvh w-1/2 object-cover bg-no-repeat aspect-auto'
      />
    </>
  )
}

export default AuthLayout

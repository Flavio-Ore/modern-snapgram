import Loader from '@/components/shared/Loader'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useUserContext } from '@/context/useUserContext'

import { useSignInAccount } from '@/lib/queries/mutations'
import { SigninValidationSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const SigninForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const { mutateAsync: signInAccount } = useSignInAccount()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidationSchema>>({
    resolver: zodResolver(SigninValidationSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // 2. Define a submit handler. Create a user
  const handleSignin = async (user: z.infer<typeof SigninValidationSchema>) => {
    try {
      const session = await signInAccount({
        email: user.email,
        password: user.password
      })

      if (!session) {
        toast({
          title: 'Something went wrong.',
          description: 'Please try again.'
        })
        navigate('/sign-in')
        return
      }

      const isLoggedIn = await checkAuthUser()

      if (isLoggedIn) {
        form.reset()
        navigate('/')
      } else {
        toast({ title: 'Login failed. Please try again.' })
        return
      }
    } catch (error) {
      console.log({ error })
    }
  }
  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <img src='/assets/images/logo.svg' alt='logo' />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>
          Log in into your account
        </h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>
          Welcome back! Log in to your account to continue
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className='flex flex-col gap-5 w-full mt-4'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className='shad-input'
                    type='email'
                    placeholder='Email*'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className='shad-input'
                    type='password'
                    placeholder='Password*'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='shad-button_primary' type='submit'>
            {isUserLoading ? <Loader /> : 'Sign in'}
          </Button>

          <p className='text-small-regular text-light-2 text-center mt-2'>
            Don't have an account yet?{' '}
            <Link
              to='/sign-up'
              className='text-primary-500 text-small-semibold ml-1'
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm

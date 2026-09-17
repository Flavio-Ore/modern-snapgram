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

import { useCreateUserAccount, useSignInAccount } from '@/lib/queries/mutations'
import { SignupValidationSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const SignupForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount()
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidationSchema>>({
    resolver: zodResolver(SignupValidationSchema),
    defaultValues: {
      username: '',
      name: '',
      email: '',
      password: ''
    }
  })

  // 2. Define a submit handler. Create a user
  const handleSignup = async (user: z.infer<typeof SignupValidationSchema>) => {
    try {
      const newUser = await createUserAccount(user)
      if (!newUser) {
        toast({ title: 'Sign up failed. Please try again.' })
        return
      }

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
          Create a new account
        </h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>
          To use Snapgram, please enter your account details
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className='flex flex-col gap-5 w-full mt-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className='shad-input'
                    type='text'
                    placeholder='Name*'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className='shad-input'
                    type='text'
                    placeholder='Username*'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            {isCreatingAccount || isUserLoading ? <Loader /> : 'Signup'}
          </Button>

          <p className='text-small-regular text-light-2 text-center mt-2'>
            Already have an account?{' '}
            <Link
              to='/sign-in'
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

export default SignupForm

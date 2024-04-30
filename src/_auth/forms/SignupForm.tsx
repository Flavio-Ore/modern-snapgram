import LoaderIcon from '@/components/icons/LoaderIcon'
import Logo from '@/components/icons/Logo'

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
import { useAccount } from '@/context/useAccountContext'
import { useCreateAccount, useSignIn } from '@/lib/queries/mutations'
import { SignupValidationSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppwriteException } from 'appwrite'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { type z } from 'zod'

const SignupForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { checkAuth, isLoading: isSessionLoading } = useAccount()
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateAccount()
  const { mutateAsync: signInAccount } = useSignIn()

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
      const createdUser = await createUserAccount(user)
      console.log({ newUser: createdUser })

      if (createdUser instanceof AppwriteException) {
        toast({
          title: 'Something went wrong.',
          description: createdUser.message ?? 'Please try again later.',
          variant: 'destructive'
        })
        return
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password
      })

      if (session instanceof AppwriteException) {
        toast({
          title: 'Something went wrong.',
          description: session.message ?? 'Please try again later.',
          variant: 'destructive'
        })
        navigate('/sign-in')
        return
      }

      const isLoggedIn = await checkAuth()
      if (isLoggedIn) {
        form.reset()
        navigate('/')
      } else {
        toast({
          title: 'Login failed.',
          description: 'Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error({ error })
    }
  }
  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <Logo />
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
            {isCreatingAccount || isSessionLoading ? <LoaderIcon /> : 'Signup'}
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

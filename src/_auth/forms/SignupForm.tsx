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

  const form = useForm<z.infer<typeof SignupValidationSchema>>({
    resolver: zodResolver(SignupValidationSchema),
    defaultValues: {
      username: '',
      name: '',
      email: '',
      password: ''
    }
  })

  const handleSignup = async (user: z.infer<typeof SignupValidationSchema>) => {
    try {
      const createdUserResponse = await createUserAccount(user)
      if (createdUserResponse?.data == null) {
        toast({
          title: 'Something went wrong.',
          description:
            createdUserResponse?.message ?? 'Please try again later.',
          variant: 'destructive'
        })
      } else {
        const sessionResponse = await signInAccount({
          email: user.email,
          password: user.password
        })

        if (sessionResponse?.data == null) {
          toast({
            title: 'Something went wrong.',
            description: sessionResponse?.message ?? 'Please try again later.',
            variant: 'destructive'
          })
          navigate('/sign-in')
        } else {
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
        }
      }
    } catch (error) {
      console.error({ error })
    }
  }
  return (
    <Form {...form}>
      <div className='flex flex-col sm:w-420 w-full p-5'>
        <Logo />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-9'>
          Create a new account
        </h2>
        <p className='text-light-3 small-medium md:base-regular'>
          Sign up to see what&apos;s new in the world!
        </p>
        <p className='text-green-500 small-regular'>
          All fields are required. &#40;*&#41;
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
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input
                    className='shad-input'
                    type='text'
                    placeholder='My name is...'
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
                <FormLabel>Username *</FormLabel>
                <FormControl>
                  <Input
                    className='shad-input'
                    type='text'
                    placeholder='@username'
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
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    className='shad-input'
                    type='email'
                    placeholder='username@domain.com'
                    autoComplete='email'
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
                <FormLabel>Password *</FormLabel>
                <FormControl>
                  <Input
                    className='shad-input'
                    type='password'
                    placeholder='Type the hardest password ever!'
                    autoComplete='off'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            variant='default'
            disabled={!form.formState.isDirty || !form.formState.isValid}
          >
            {isCreatingAccount || isSessionLoading
              ? (
              <LoaderIcon />
                )
              : (
                  'Create my account'
                )}
          </Button>
          <p className='small-regular text-light-2'>
            Already have an account?{' '}
            <Link to='/sign-in' className='text-primary-500 small-semibold'>
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm

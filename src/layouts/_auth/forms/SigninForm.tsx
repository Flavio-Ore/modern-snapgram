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
import { SigninValidationSchema } from '@/lib/validations/schemas/signin.validation.schema'
import { useAccount } from '@/states/account/hooks/useAccountContext'
import { useSignIn } from '@/states/TanStack-query/hooks/mutations/session/useSignIn'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { type z } from 'zod'

const SigninForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { isLoading } = useAccount()
  const { mutateAsync: signInAccount, isPending } = useSignIn()

  const signinForm = useForm<z.infer<typeof SigninValidationSchema>>({
    resolver: zodResolver(SigninValidationSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSignin = async (user: z.infer<typeof SigninValidationSchema>) => {
    try {
      const sessionResponse = await signInAccount({
        email: user.email,
        password: user.password
      })
      if (sessionResponse?.data == null) {
        toast({
          title: 'Login failed.',
          description: sessionResponse?.message ?? 'Please try again later.',
          variant: 'destructive'
        })
        navigate('/sign-in')
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Form {...signinForm}>
      <div className='flex flex-col sm:w-420 w-full p-5'>
        <Logo />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-9'>
          Log in into your account
        </h2>
        <p className='text-light-3 small-medium md:base-regular'>
          Welcome back master, we miss you!
        </p>
        <form
          onSubmit={signinForm.handleSubmit(handleSignin)}
          className='flex flex-col gap-5 w-full mt-4'
        >
          <FormField
            control={signinForm.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
            control={signinForm.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className='shad-input'
                    type='password'
                    placeholder='Top secret!'
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
            disabled={
              !signinForm.formState.isDirty || !signinForm.formState.isValid
            }
          >
            {isLoading || isPending ? <LoaderIcon /> : 'Sign in'}
          </Button>

          <p className='small-regular text-light-2'>
            Don&apos;t have an account?{' '}
            <Link to='/sign-up' className='text-primary-500 small-semibold'>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm

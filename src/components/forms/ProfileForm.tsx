import LoaderIcon from '@/components/icons/LoaderIcon'
import AvatarFileUploader from '@/components/shared/files/AvatarFileUploader'
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
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { useUpdateUser } from '@/lib/queries/mutations'
import { useUser } from '@/lib/queries/queries'
import { ProfileValidationSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { type z } from 'zod'

const ProfileForm = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { data: user, isLoading, isError } = useUser()
  const { mutateAsync: updateUser, isPending } = useUpdateUser()
  const { toast } = useToast()
  const navigate = useNavigate()
  const profileForm = useForm<z.infer<typeof ProfileValidationSchema>>({
    resolver: zodResolver(ProfileValidationSchema),
    defaultValues: {
      file: [],
      name: user?.name ?? '',
      username: user?.username ?? '',
      email: user?.email ?? '',
      bio: user?.bio ?? ''
    }
  })

  const onSubmit = async (value: z.infer<typeof ProfileValidationSchema>) => {
    if (user == null) return
    const updatedUser = await updateUser({
      ...value,
      userId: user?.$id ?? '',
      imageUrl: user?.imageUrl ?? '',
      imageId: user?.imageId ?? ''
    })
    if (updatedUser?.data == null) {
      toast({
        title: 'Profile update error',
        description:
          updatedUser?.message ?? 'Something went wrong, please try again',
        variant: 'destructive'
      })
    } else {
      toast({
        title: 'Profile Updated',
        description: updatedUser.message
      })
      navigate(`/profile/${user.$id}`)
    }
  }

  useEffect(() => {
    const formSubscription = profileForm.watch(() => {
      if (textAreaRef.current != null) {
        textAreaRef.current.style.height = '40px'
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
      }
    })
    return () => {
      formSubscription.unsubscribe()
    }
  }, [profileForm.watch('bio')])

  return (
    <Form {...profileForm}>
      <form
        onSubmit={profileForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-6 w-full max-w-5xl'
      >
        <FormField
          control={profileForm.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Avatar</FormLabel>
              <FormControl>
                <AvatarFileUploader
                  fieldChange={field.onChange}
                  avatarUrl={user?.imageUrl ?? ''}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={profileForm.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Name</FormLabel>
              <FormControl>
                <>
                  {isLoading && <Skeleton className='w-full shad-input' />}
                  {!isLoading && !isError && (
                    <Input
                      className='shad-input'
                      type='text'
                      placeholder='Your name'
                      {...field}
                    />
                  )}
                </>
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={profileForm.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Username</FormLabel>
              <div className='flex-center gap-0.5'>
                <span className='bg-dark-4 p-2 rounded-lg'>@</span>
                <FormControl>
                  <>
                    {isLoading && <Skeleton className='w-full shad-input' />}
                    {!isLoading && !isError && (
                      <Input
                        className='shad-input'
                        type='text'
                        placeholder='How people will find you'
                        disabled
                        {...field}
                      />
                    )}
                  </>
                </FormControl>
              </div>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={profileForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Email</FormLabel>
              <FormControl>
                <>
                  {isLoading && <Skeleton className='w-full shad-input' />}
                  {!isLoading && !isError && (
                    <Input
                      className='shad-input'
                      type='email'
                      placeholder='username@domain.com'
                      disabled
                      {...field}
                    />
                  )}
                </>
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={profileForm.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Bio{' '}
                <span className='text-light-3 small-regular'>- optional</span>
              </FormLabel>
              <FormControl>
                <>
                  {isLoading && <Skeleton className='w-full shad-textarea' />}
                  {!isLoading && !isError && (
                    <Textarea
                      className='shad-textarea custom-scrollbar'
                      placeholder='Tell us about yourself'
                      {...field}
                      ref={textAreaRef}
                    />
                  )}
                </>
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <div className='flex gap-4 items-center justify-end'>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              navigate(-1)
            }}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            className='shad-button_primary whitespace-nowrap'
            disabled={
              !profileForm.formState.isValid || !profileForm.formState.isDirty
            }
          >
            {isPending ? <LoaderIcon /> : 'Update Profile'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProfileForm

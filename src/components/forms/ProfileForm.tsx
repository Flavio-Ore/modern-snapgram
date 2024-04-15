import Loader from '@/components/shared/app/Loader'
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
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { useUpdateUser } from '@/lib/queries/mutations'
import { useUser } from '@/lib/queries/queries'
import { isObjectEmpty } from '@/lib/utils'
import { ProfileValidationSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { type FileWithPath, useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { type z } from 'zod'

interface FileUploaderModel {
  fieldChange: (files: File[]) => void
  avatarUrl: string
}
type FileUploaderProps = FileUploaderModel
const AvatarFileUploader: React.FC<FileUploaderProps> = ({
  avatarUrl,
  fieldChange
}) => {
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setfileUrl] = useState(avatarUrl)
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles)
      fieldChange(acceptedFiles)
      setfileUrl(URL.createObjectURL(acceptedFiles[0]))
    },
    [file]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg']
    }
  })

  return (
    <div
      {...getRootProps()}
      className='flex-center flex-col cursor-pointer w-full'
    >
      <input {...getInputProps()} type='file' className='cursor-pointer' />
      <div className='flex-start flex-1 gap-4 w-full py-5 lg:py-10'>
        <img
          src={
            fileUrl === '' ? '/assets/icons/profile-placeholder.svg' : fileUrl
          }
          alt='New Avatar Image'
          height={100}
          width={100}
          loading='lazy'
          className='rounded-full aspect-square object-cover'
        />
        <p className='body-medium text-[#0095F6]'>Change profile photo</p>
      </div>
    </div>
  )
}

const ProfileForm = () => {
  const { mutateAsync: updateUser, isPending } = useUpdateUser()
  const { data: user, isLoading } = useUser()
  const { toast } = useToast()
  const navigate = useNavigate()
  // 1. Define your form.
  const form = useForm<z.infer<typeof ProfileValidationSchema>>({
    resolver: zodResolver(ProfileValidationSchema),
    defaultValues: {
      file: [],
      name: user?.name ?? '',
      username: user?.username ?? '',
      email: user?.email ?? '',
      bio: user?.bio ?? ''
    }
  })

  // 2. Define a submit handler.
  // Handler
  const onSubmit = async (value: z.infer<typeof ProfileValidationSchema>) => {
    if (user == null) return
    // 3. Implement your form logic.
    const updatedUser = await updateUser({
      ...value,
      userId: user.$id,
      imageUrl: user?.imageUrl ?? '',
      imageId: user?.imageId ?? ''
    })

    if (isObjectEmpty(updatedUser)) {
      toast({
        title: 'Profile update error',
        description: 'Please try again',
        variant: 'destructive'
      })
      navigate(`/profile/${user.$id}`)
      return
    }

    toast({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully'
    })
    navigate(`/profile/${user.$id}`)
  }

  if (isLoading) return <Loader />
  if (user == null) return <p>Something went wrong</p>
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-9 w-full max-w-5xl'>
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Avatar</FormLabel>
              <FormControl>
                <AvatarFileUploader
                  fieldChange={field.onChange}
                  avatarUrl={user.imageUrl}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Name</FormLabel>
              <FormControl>
                <Input
                  className='shad-input'
                  type='text'
                  placeholder='Name*'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Username</FormLabel>
              <div className='flex-center gap-0.5'>
                <span className='bg-dark-4 p-2 rounded-lg'>@</span>
                <FormControl>
                  <Input
                    className='shad-input'
                    type='text'
                    placeholder='@Username*'
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Email</FormLabel>
              <FormControl>
                <Input
                  className='shad-input'
                  type='email'
                  placeholder='Email*'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Bio</FormLabel>
              <FormControl>
                <Textarea
                  className='shad-textarea custom-scrollbar'
                  placeholder='Bio*'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <div className='flex gap-4 items-center justify-end'>
          <Button
            type='button'
            className='shad-button_dark_4'
            onClick={() => {
              navigate(-1)
            }}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            className='shad-button_primary whitespace-nowrap'
          >
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProfileForm

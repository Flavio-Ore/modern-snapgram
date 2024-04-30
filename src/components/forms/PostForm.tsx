import FileUploader from '@/components/shared/app/FileUploader'
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
import { useAccount } from '@/context/useAccountContext'
import { useCreatePost, useUpdatePost } from '@/lib/queries/mutations'
import { isObjectEmpty } from '@/lib/utils'
import { PostValidationSchema } from '@/lib/validations'
import { type E_FORM_ACTIONS } from '@/values'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Models } from 'appwrite'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { type z } from 'zod'

type Actions = keyof typeof E_FORM_ACTIONS
interface PostFormProps {
  post?: Models.Document
  action: Actions
}
const PostForm: FC<PostFormProps> = ({ post, action }) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost()
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost()
  const { user } = useAccount()
  const { toast } = useToast()
  const navigate = useNavigate()
  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidationSchema>>({
    resolver: zodResolver(PostValidationSchema),
    defaultValues: {
      caption: post?.caption ?? '',
      file: [],
      location: post?.location ?? '',
      tags: post?.tags?.join(',') ?? ''
    }
  })

  // if (action === 'UPDATE' && !post) return console.error('No post to update')

  // 2. Define a submit handler.
  // Handler
  const onSubmit = async (value: z.infer<typeof PostValidationSchema>) => {
    console.log({ value })
    console.log({ post })
    try {
      if (post != null && action === 'UPDATE') {
        const updatedPost = await updatePost({
          ...value,
          postId: post.$id,
          imageId: post?.imageId,
          imageUrl: post?.imageUrl
        })

        if (isObjectEmpty(updatedPost)) {
          toast({ title: 'Post update error', description: 'Please try again' })
          navigate(`/posts/${post.$id}`)
          return
        }
        navigate('/')
        return
      }

      if (post == null && action === 'CREATE') {
        const newPost = await createPost({
          ...value,
          userId: user.id
        })

        if (isObjectEmpty(newPost)) {
          toast({
            title: 'Post is empty.'
          })
        }
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-9 w-full max-w-5xl'
      >
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Caption</FormLabel>
              <FormControl>
                <Textarea
                  className='shad-textarea custom-scrollbar'
                  {...field}
                />
              </FormControl>

              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Add Photos/Videos
              </FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl ?? ''}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Location</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' {...field} />
              </FormControl>

              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label body-medium'>
                Add tags{', '}
                <span className='tiny-medium text-light-4'>
                  separated by comma &quot; , &quot;
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='shad-input'
                  placeholder='Art, Work, Sports, ...'
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
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {isLoadingCreate || isLoadingUpdate
              ? (
              <Loader />
                )
              : (
              `${action[0].toUpperCase() + action.slice(1)} Post`
                )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm

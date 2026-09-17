import Loader from '@/components/Loader'
import { type FileModelWithUrl, type Post } from '@/types'
import { type FORM_ACTIONS } from '@/utils/FORM_ACTIONS'
import { useSessionUser } from '@auth/hooks/useSessionUser'
import { zodResolver } from '@hookform/resolvers/zod'
import FileUploader from '@posts/components/FileUploader'
import PreviousFiles from '@posts/components/PreviousFiles'
import { useCreatePost } from '@posts/hooks/useCreatePost'
import { useUpdatePost } from '@posts/hooks/useUpdatePost'
import { PostValidationSchema } from '@posts/schemas/post.validation.schema'
import { Button } from '@shadcn/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@shadcn/form'
import { Input } from '@shadcn/input'
import { Textarea } from '@shadcn/textarea'
import { useToast } from '@shadcn/use-toast'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { type z } from 'zod'

type Actions = keyof typeof FORM_ACTIONS
interface PostFormProps {
  post?: Post
  action: Actions
}
const PostForm = ({ post, action }: PostFormProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost()
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost()
  const { data: user } = useSessionUser()
  const { toast } = useToast()
  const navigate = useNavigate()

  const postForm = useForm<z.infer<typeof PostValidationSchema>>({
    resolver: zodResolver(PostValidationSchema),
    defaultValues: {
      caption: post?.caption ?? '',
      originalFiles: post?.files ?? [],
      newFiles: [],
      location: post?.location ?? '',
      tags: post?.tags?.join(',') ?? ''
    }
  })

  const handlePreviousFileDelete = (fileId: FileModelWithUrl['$id']) => () => {
    postForm.setValue(
      'originalFiles',
      postForm.getValues('originalFiles').filter(file => file.$id !== fileId)
    )
  }
  const onSubmit = async (value: z.infer<typeof PostValidationSchema>) => {
    try {
      if (post != null && action === 'UPDATE') {
        const originalFileIds = new Set(post?.files?.map(file => file.$id))
        const currentFileIds = new Set(
          value.originalFiles.map(file => file.$id)
        )
        const removedFileIds = [...originalFileIds].filter(
          id => !currentFileIds.has(id)
        )
        const updatedPostResponse = await updatePost({
          ...value,
          filesToRemoveById: removedFileIds,
          postId: post.$id
        })

        if (updatedPostResponse?.data == null) {
          toast({
            title: 'Error updating the post!',
            description: 'Please try again'
          })
          navigate(`/posts/${post.$id}.`)
          return
        }
        navigate('/home')
        return
      }

      if (post == null && user != null && action === 'CREATE') {
        const createPostResponse = await createPost({
          caption: value.caption,
          location: value.location,
          tags: value.tags,
          newFiles: value.newFiles,
          userId: user.$id
        })
        if (createPostResponse?.data == null) {
          toast({
            title: 'Post is empty.',
            description: createPostResponse?.message ?? 'Please try again.'
          })
        } else {
          navigate('/home')
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const formSubscription = postForm.watch(() => {
      if (textAreaRef.current != null) {
        textAreaRef.current.style.height = '40px'
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
      }
    })
    return () => {
      formSubscription.unsubscribe()
    }
  }, [postForm.watch('caption')])
  return (
    <Form {...postForm}>
      <form
        onSubmit={postForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <div className='self-start'>
          <h3 className='text-light-3 h3-bold'>
            Share your moments, inspire the world!
          </h3>
          <p className='text-light-3 body-bold'>
            Your stories and experiences can light up someone&apos;s day.
          </p>
        </div>
        <FormField
          control={postForm.control}
          name='caption'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Caption</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    action === 'CREATE'
                      ? 'Tell us your story...'
                      : 'Update your story...'
                  }
                  {...field}
                  ref={textAreaRef}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={postForm.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Location</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='The moon'
                  className='shad-input'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={postForm.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label body-medium'>
                Tags{' '}
                <span className='subtle-regular text-light-3'>
                  , separated by comma &quot; , &quot;
                </span>{' '}
                <span className='text-light-3 small-regular'>- optional</span>
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
        {action === 'UPDATE' && (
          <FormField
            control={postForm.control}
            name='originalFiles'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className='shad-form_label'>
                    Previous files
                  </FormLabel>
                  <FormControl>
                    <PreviousFiles
                      filesModelsWithUrl={field.value ?? []}
                      onDelete={handlePreviousFileDelete}
                    />
                  </FormControl>
                  <FormMessage className='shad-form_message' />
                </FormItem>
              )
            }}
          />
        )}
        <FormField
          control={postForm.control}
          name='newFiles'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Photos, videos or both!
              </FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  fileLimit={
                    action === 'UPDATE' &&
                    post?.files != null &&
                    post.files.length > 0
                      ? 10 - post.files.length
                      : 10
                  }
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <div className='flex gap-4 items-center justify-end'>
          <Button
            type='button'
            variant='outline'
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
            disabled={
              isLoadingCreate ||
              isLoadingUpdate ||
              (!postForm.formState.isValid && postForm.formState.isDirty)
            }
          >
            {isLoadingCreate || isLoadingUpdate ? (
              <Loader />
            ) : (
              `${
                action[0].toLocaleUpperCase() +
                action.slice(1).toLocaleLowerCase()
              } Post`
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm

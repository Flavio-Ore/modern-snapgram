import FileUploader from '@/components/shared/app/FileUploader'
import Loader from '@/components/shared/app/Loader'
import PreviousFiles from '@/components/shared/posts/PreviousFiles'
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
import { useCreatePost, useUpdatePost } from '@/lib/queries/mutations'
import { useUser } from '@/lib/queries/queries'
import { PostValidationSchema } from '@/lib/validations'
import { type FileModelWithUrl, type Post } from '@/types'
import { type E_FORM_ACTIONS } from '@/values'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { type z } from 'zod'

type Actions = keyof typeof E_FORM_ACTIONS
interface PostFormProps {
  post?: Post
  action: Actions
}
const PostForm = ({ post, action }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost()
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost()
  const { data: user } = useUser()
  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof PostValidationSchema>>({
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
    form.setValue(
      'originalFiles',
      form.getValues('originalFiles').filter(file => file.$id !== fileId)
    )
  }
  const onSubmit = async (value: z.infer<typeof PostValidationSchema>) => {
    console.log({ value })
    console.log({ post })
    try {
      if (post != null && action === 'UPDATE') {
        const originalFileIds = new Set(post?.files?.map(file => file.$id))
        const currentFileIds = new Set(
          value.originalFiles.map(file => file.$id)
        )
        const removedFileIds = [...originalFileIds].filter(
          id => !currentFileIds.has(id)
        )
        console.log('originalFileIds :>> ', originalFileIds)
        console.log('currentFileIds :>> ', currentFileIds)
        console.log('removedFileIds :>> ', removedFileIds)
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
        navigate('/')
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
        console.log({ createPostResponse })
        if (createPostResponse?.data == null) {
          toast({
            title: 'Post is empty.',
            description: createPostResponse?.message ?? 'Please try again.'
          })
        } else {
          navigate('/')
        }
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
                Add tags{' '}
                <span className='tiny-medium text-light-4'>
                  , separated by comma &quot; , &quot;
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
        {action === 'UPDATE' && (
          <FormField
            control={form.control}
            name='originalFiles'
            render={({ field }) => {
              console.log(
                'PREVIOUS UPDATED FILES VALUES: ',
                form.getValues('originalFiles')
              )
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
          control={form.control}
          name='newFiles'
          render={({ field }) => {
            console.log('ADDED FILES VALUE: ', form.getValues('newFiles'))
            return (
              <FormItem>
                <FormLabel className='shad-form_label'>
                  Add photos or videos or both
                </FormLabel>
                <FormControl>
                  <FileUploader
                    fieldChange={field.onChange}
                    fileLimit={
                      action === 'UPDATE' && post?.files != null && post.files.length > 0
                        ? 10 - post.files.length
                        : 10
                    }
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )
          }}
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

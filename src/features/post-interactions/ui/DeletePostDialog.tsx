import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  useToast
} from '@shared/ui'
import DeleteIcon from '@/components/icons/DeleteIcon'
import { useDeletePost } from '../model/useDeletePost'

export interface DeletePostDialogProps {
  postId: string
  filesId: string[]
  trigger?: React.ReactNode
  onSuccess?: () => void
  className?: string
}

export const DeletePostDialog = ({
  postId,
  filesId,
  trigger,
  onSuccess,
  className
}: DeletePostDialogProps) => {
  const { toast } = useToast()
  const { mutate: deletePost, isPending } = useDeletePost()

  const handleDelete = () => {
    deletePost(
      { postId, filesId },
      {
        onSuccess: () => {
          toast({
            title: 'Post deleted',
            description: 'Your post has been deleted successfully'
          })
          onSuccess?.()
        }
      }
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger ?? (
          <Button
            variant='ghost'
            disabled={isPending}
            className={className ?? 'post_details-delete_btn'}
          >
            <DeleteIcon className='size-6 hover:fill-red-500/50' />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Post</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this post? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className='bg-red-600 hover:bg-red-700 text-white'>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePostDialog

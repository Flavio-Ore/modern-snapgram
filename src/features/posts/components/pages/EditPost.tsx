import CreatePostIcon from '@/components/icons/CreatePostIcon'
import Loader from '@/components/Loader'
import { FORM_ACTIONS } from '@/utils/FORM_ACTIONS'
import { useAuth } from '@auth/hooks/useAuth'
import PostForm from '@posts/components/forms/PostForm'
import { useGetPostById } from '@posts/hooks/useGetPostById'
import { useToast } from '@shadcn/use-toast'
import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { data: auth, refetch } = useAuth()
  const { id } = useParams()
  const {
    data: post,
    isLoading,
    isError
  } = useGetPostById({ postId: id ?? '' })
  const authentication = useMemo(
    () => ({
      isAuthenticated: auth?.data ?? false,
      errorCode: auth?.code ?? false
    }),
    [auth]
  )
  useEffect(() => {
    refetch()
  }, [])
  useEffect(() => {
    if (!authentication.isAuthenticated || authentication.errorCode === 401) {
      toast({
        title: 'Session expired',
        description: 'Please sign in again to continue.',
        variant: 'destructive'
      })
      navigate('/sign-in')
    }
  }, [auth])
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <CreatePostIcon className='size-9 fill-secondary-500' />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Post</h2>
        </div>
        {isLoading && <Loader />}
        {isError && (
          <h3 className='body-medium text-center text-red-800 animate-pulsing'>
            Error getting the post
          </h3>
        )}
        {!isLoading && !isError && post != null && (
          <PostForm action={FORM_ACTIONS.UPDATE} post={post} />
        )}
      </div>
    </div>
  )
}

export default EditPost

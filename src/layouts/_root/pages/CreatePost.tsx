import PostForm from '@/components/forms/PostForm'
import CreatePostIcon from '@/components/icons/CreatePostIcon'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/states/TanStack-query/hooks/queries/session/useAuth'
import { E_FORM_ACTIONS } from '@/values/enums'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { data: auth, refetch } = useAuth()
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
          <CreatePostIcon
            width={40}
            height={40}
            className='fill-secondary-500'
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
        </div>
        <PostForm action={E_FORM_ACTIONS.CREATE} />
      </div>
    </div>
  )
}

export default CreatePost

import ProfileForm from '@/components/forms/ProfileForm'
import EditIcon from '@/components/icons/EditIcon'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/states/TanStack-query/hooks/queries/session/useAuth'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
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
          <EditIcon className='size-10 fill-secondary-500' />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Profile</h2>
        </div>
        <ProfileForm />
      </div>
    </div>
  )
}

export default UpdateProfile

import EditIcon from '@/components/icons/EditIcon'
import { useAuth } from '@auth/hooks/useAuth'
import { useToast } from '@shadcn/use-toast'
import ProfileForm from '@users/profile/components/ProfileForm'
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
    if (
      !authentication.isAuthenticated ||
      authentication.errorCode === 401
    ) {
      toast({
        title: 'Session expired',
        description: 'Please sign in again to continue.',
        variant: 'destructive'
      })
      navigate('/sign-in')
    }
  }, [authentication])

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

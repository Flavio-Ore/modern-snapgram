import EditIcon from '@/components/icons/EditIcon'
import ProfileForm from '@profile/components/ProfileForm'

const UpdateProfile = () => {
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

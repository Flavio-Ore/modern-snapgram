import { useUserContext } from '@/context/useUserContext'

const Profile = () => {
  const { user } = useUserContext()
  console.log('user :>> ', user)
  return (
    <div className='profile-container'>
      <div className='profile-inner_container'>
        <img
          src={user.imageUrl}
          alt={user.name}
          className='h-[150px] w-[150px] rounded-full aspect-square'
        />
        <h2 className='h2-bold'>{user.name}</h2>
        <h3 className='base-medium'>{user.username}</h3>
      </div>
    </div>
  )
}

export default Profile

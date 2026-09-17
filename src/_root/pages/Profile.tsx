import { useUserContext } from '@/context/useUserContext'

const Profile = () => {
  const { user } = useUserContext()
  console.log('user :>> ', user)
  return (
    <div className='profile-container'>
      <ul className='profile-inner_container'>
        <li>
          <img src={user?.imageUrl} alt={user?.name} className='' />
        </li>
        <li>
          <h1 className='h1-bold'>{user?.name}</h1>
        </li>
        <li>
          <h2 className='h2-bold'>{user?.username}</h2>
        </li>
        <li>
          <h2 className='base-medium'>{user?.email}</h2>
        </li>
        <li>
          <h3>{user?.bio}</h3>
        </li>
      </ul>
    </div>
  )
}

export default Profile

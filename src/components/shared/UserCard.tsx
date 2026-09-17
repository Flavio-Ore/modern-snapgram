import { Link } from 'react-router-dom'

interface UserCardModel {
  page: 'sidebar' | 'people'
  imgUrl: string
  name: string
  mainFollower: string
}
type UserCardProps = UserCardModel
const UserCard: React.FC<UserCardProps> = ({
  imgUrl,
  name,
  mainFollower,
  page
}) => {
  return (
    <div className='flex-center flex-col gap-3'>
      <img src={imgUrl} alt={name} className='h-[54px] w-[54px] rounded-full' />
      <div className='flex-center flex-col gap-0.5'>
        <p className='small-semibold'>{name}</p>
        <p className='tiny-medium text-light-3'>Followed by {mainFollower}</p>
      </div>
      <Link className='rightsidebar-link '>Follow</Link>
    </div>
  )
}

export default UserCard

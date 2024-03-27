import { E_USERS } from '@/values'
import { Link } from 'react-router-dom'

const roleClassNames = {
  ALL_USERS: {
    card: '2xl:max-w-[303px] 2xl:max-h-[319px]',
    avatar: 'h-[90px] w-[90px]',
    name: 'h3-bold',
    subtitle: 'body-medium',
    link: 'small-medium w-[110px] h-[38px] py-2.5 px-5'
  },
  TOP_CREATORS: {
    card: '2xl:max-w-[190px] 2xl:max-h-[190px]',
    avatar: 'h-[54px] w-[54px]',
    name: 'base-semibold',
    subtitle: 'small-medium',
    link: 'subtle-semibold py-1.5 px-[18px]'
  }
}

interface UserCardModel {
  profileLink: string
  imgUrl: string
  name: string
  mainFollower: string
  role: string
}
type UserCardProps = UserCardModel & {
  role: keyof typeof E_USERS
}
const UserCard: React.FC<UserCardProps> = ({
  profileLink,
  imgUrl,
  name,
  mainFollower,
  role
}) => {
  const classes = roleClassNames[role]
  return (
    <div className={`user-card ${classes.card}`}>
      {classes.avatar && (
        <img
          src={imgUrl}
          alt={name}
          className={`rounded-full aspect-square ${classes.avatar}`}
        />
      )}
      <div className='flex-center flex-col gap-0.5'>
        {classes.name && <h3 className={classes.name}>{name}</h3>}
        {classes.subtitle && (
          <p className={`text-light-3 ${classes.subtitle}`}>{mainFollower}</p>
        )}
      </div>
      {classes.link && (
        <Link
          to={profileLink}
          className={`flex-center rounded-lg text-center bg-primary-500 ${classes.link}`}
        >
          Follow
        </Link>
      )}
    </div>
  )
}
export default UserCard
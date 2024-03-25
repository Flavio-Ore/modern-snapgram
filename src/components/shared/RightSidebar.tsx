import { Link } from 'react-router-dom'

const TopCreators = () => {
  return (
    <ul className='rightsidebar-top_creators'>
      {Array.from({ length: 8 }, (_, i) => i + 1).map(i => {
        const imgUrl = '/assets/icons/profile-placeholder.svg'
        const name = 'The Midudev'
        const mainFollower = 'Steban'
        const profileLink = `/profile/65e42bcc7cd2846e471b`
        return (
          <li key={i} className='rightsidebar-creators_container'>
            <div className='flex-center flex-col gap-3'>
              <img
                src={imgUrl}
                alt={name}
                className='h-[54px] w-[54px] rounded-full'
              />
              <div className='flex-center flex-col gap-0.5'>
                <p className='small-semibold'>{name}</p>
                <p className='tiny-medium text-light-3'>
                  Followed by {mainFollower}
                </p>
              </div>
              <Link to={profileLink} className='rightsidebar-link '>
                Follow
              </Link>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

const RightSidebar = () => {
  return (
    <div className='rightsidebar'>
      <h2 className='h3-bold'>Top Creators</h2>
      <TopCreators />
    </div>
  )
}

export default RightSidebar

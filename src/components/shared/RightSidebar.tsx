import UserCard from './UserCard'

const TopCreators = () => {
  return (
    <ul className='home-creators_grid'>
      {Array.from({ length: 8 }, (_, i) => i + 1).map(i => {
        const imgUrl = '/assets/icons/profile-placeholder.svg'
        const name = 'The Midudev'
        const mainFollower = 'Steban'
        const profileLink = `/profile/65e42bcc7cd2846e471b`
        return (
          <li key={i}>
            <UserCard
              imgUrl={imgUrl}
              name={name}
              mainFollower={`Followed by ${mainFollower}`}
              profileLink={profileLink}
              role='TOP_CREATORS'
            />
          </li>
        )
      })}
    </ul>
  )
}

const RightSidebar = () => {
  return (
    <div className='home-creators bg-dark-2'>
      <h2 className='h3-bold'>Top Creators</h2>
      <TopCreators />
    </div>
  )
}

export default RightSidebar

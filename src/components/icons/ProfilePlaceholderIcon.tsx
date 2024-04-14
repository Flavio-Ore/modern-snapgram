import { useId } from 'react'

const ProfilePlaceholderIcon = () => {
  const id = useId()
  return (
    <svg
      width='54'
      height='54'
      viewBox='0 0 54 54'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath={`url(#${id})`}>
        <ellipse cx='27.034' cy='26.966' rx='26.494' ry='25.954' fill='#fff' />
        <path
          d='M27 .001c-14.91 0-27 12.088-27 27 0 14.91 12.089 26.998 27 26.998C41.913 54 54 41.912 54 27S41.913.001 27 .001m0 8.073a8.93 8.93 0 1 1 .001 17.862A8.93 8.93 0 0 1 27 8.074m-.006 38.866c-4.92 0-9.427-1.792-12.903-4.758a3.8 3.8 0 0 1-1.336-2.893c0-5 4.048-9.004 9.05-9.004h10.392c5.004 0 9.036 4.003 9.036 9.004 0 1.113-.486 2.17-1.334 2.892a19.8 19.8 0 0 1-12.905 4.76'
          fill='#877EFF'
        />
      </g>
      <defs>
        <clipPath id={id}>
          <path fill='#fff' d='M0 0h54v54H0z' />
        </clipPath>
      </defs>
    </svg>
  )
}
export default ProfilePlaceholderIcon

import { useId, type SVGProps } from 'react'
const Logo = (props: SVGProps<SVGSVGElement>) => {
  const id = useId()
  return <svg
      width='171'
      height='36'
      fill='#000'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 171 36'
      {...props}
    >
      <defs>
        <linearGradient
          id={id}
          x1='15'
          y1='3'
          x2='15'
          y2='33'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#877EFF'></stop>
          <stop offset='0.461' stopColor='#685DFF'></stop>
          <stop offset='1' stopColor='#3121FF'></stop>
        </linearGradient>
      </defs>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M27.833 18c0 7.088-5.745 12.833-12.833 12.833S2.167 25.088 2.167 18 7.912 5.167 15 5.167 27.833 10.912 27.833 18M30 18c0 8.284-6.716 15-15 15S0 26.284 0 18 6.716 3 15 3s15 6.716 15 15m-6.724-6.724a1.552 1.552 0 11-3.103 0 1.552 1.552 0 013.103 0m-12.788 7.933a4.671 4.671 0 109.024-2.418 4.671 4.671 0 00-9.024 2.418m-2.093.56a6.838 6.838 0 1013.21-3.539 6.838 6.838 0 00-13.21 3.54'
        fill={`url(#${id})`}
      ></path>
      <path
        d='M46.737 28.396q-2.29 0-4.043-.82t-2.743-2.347-.99-3.676v-.791h3.676v.791q0 1.782 1.103 2.686 1.102.877 2.997.877 1.923 0 2.856-.764.96-.763.961-1.95 0-.82-.48-1.33-.453-.508-1.358-.82-.876-.339-2.149-.621l-.65-.142q-2.036-.452-3.506-1.13-1.443-.708-2.234-1.839-.763-1.131-.763-2.94 0-1.81.848-3.082.876-1.3 2.432-1.98 1.583-.706 3.704-.706 2.12 0 3.76.735 1.669.706 2.602 2.149.96 1.414.96 3.562v.849h-3.675v-.849q0-1.13-.452-1.81-.425-.706-1.244-1.017-.82-.34-1.951-.34-1.696 0-2.517.65-.792.623-.791 1.726 0 .735.367 1.244.395.51 1.16.848.763.339 1.95.594l.65.141q2.122.452 3.676 1.16 1.584.706 2.46 1.866.877 1.16.877 2.968 0 1.81-.933 3.195-.904 1.358-2.602 2.15-1.668.762-3.958.763M56.278 28V13.976h3.506v1.837h.51q.338-.734 1.272-1.385.933-.678 2.827-.679 1.64 0 2.856.764 1.245.735 1.922 2.064.68 1.3.68 3.054V28h-3.564v-8.087q0-1.583-.791-2.375-.764-.79-2.206-.791-1.64 0-2.544 1.102-.905 1.075-.905 3.026V28zm20.93.396q-1.5 0-2.687-.51-1.187-.536-1.894-1.526-.678-1.017-.679-2.46 0-1.441.679-2.403.706-.99 1.923-1.47 1.245-.51 2.827-.51h3.846v-.791q0-.99-.622-1.612-.623-.65-1.98-.65-1.329 0-1.979.622-.65.594-.848 1.555l-3.28-1.103a5.7 5.7 0 011.074-1.95q.764-.906 2.008-1.443 1.273-.565 3.082-.565 2.77 0 4.383 1.385 1.611 1.386 1.611 4.015v5.231q0 .848.792.848h1.13V28H84.22q-1.047 0-1.725-.509a1.61 1.61 0 01-.679-1.357v-.028h-.537q-.113.339-.509.904-.395.537-1.244.962-.848.423-2.318.424m.622-2.884q1.499 0 2.431-.82.962-.848.962-2.234v-.283h-3.591q-.99 0-1.555.424-.566.425-.566 1.188 0 .764.594 1.244.593.48 1.725.48m10.521 8.143v-19.68h3.507v1.697h.508q.48-.82 1.499-1.442 1.019-.65 2.912-.65 1.696 0 3.139.848 1.442.82 2.318 2.432.877 1.611.877 3.902v.452q0 2.29-.877 3.902-.876 1.611-2.318 2.46a6.24 6.24 0 01-3.139.82q-1.272 0-2.149-.311-.848-.284-1.385-.735-.51-.48-.82-.962h-.509v7.267zm7.352-8.37q1.668 0 2.742-1.046 1.103-1.074 1.103-3.11v-.283q0-2.035-1.103-3.081-1.103-1.075-2.742-1.075t-2.743 1.075q-1.102 1.046-1.102 3.081v.283q0 2.036 1.102 3.11 1.103 1.047 2.743 1.047m9.152-4.24v-.453q0-2.206.877-3.76.876-1.584 2.318-2.404a6.3 6.3 0 013.195-.848q1.923 0 2.913.678.99.68 1.442 1.414h.509v-1.696h3.506v16.512q0 1.443-.848 2.29-.849.877-2.262.877h-9.388v-3.11h8.143q.792 0 .792-.849V26.05h-.509a4.8 4.8 0 01-.791.933q-.51.453-1.358.764-.847.31-2.149.31a6.46 6.46 0 01-3.195-.82q-1.442-.848-2.318-2.403-.877-1.582-.877-3.789m7.408 3.901q1.64 0 2.743-1.046t1.103-2.94v-.283q0-1.923-1.103-2.94-1.074-1.047-2.743-1.047-1.64 0-2.742 1.046-1.103 1.018-1.103 2.94v.284q0 1.894 1.103 2.94t2.742 1.046M122.716 28V13.976h3.507v1.583h.508q.312-.848 1.018-1.244.735-.396 1.697-.396h1.696v3.167h-1.753q-1.356 0-2.233.735-.877.707-.877 2.205V28zm14.386.396q-1.499 0-2.686-.51-1.188-.536-1.895-1.526-.678-1.017-.678-2.46 0-1.441.678-2.403.707-.99 1.923-1.47 1.244-.51 2.827-.51h3.846v-.791q0-.99-.622-1.612-.623-.65-1.98-.65-1.328 0-1.979.622-.65.594-.848 1.555l-3.28-1.103a5.7 5.7 0 011.075-1.95q.763-.906 2.007-1.443 1.273-.565 3.082-.565 2.77 0 4.383 1.385 1.611 1.386 1.611 4.015v5.231q0 .848.792.848h1.131V28h-2.375q-1.046 0-1.725-.509a1.61 1.61 0 01-.678-1.357v-.028h-.538q-.113.339-.509.904-.395.537-1.244.962-.848.423-2.318.424m.622-2.884q1.498 0 2.431-.82.962-.848.962-2.234v-.283h-3.591q-.99 0-1.555.424-.566.425-.566 1.188 0 .764.594 1.244t1.725.48M148.246 28V13.976h3.506v1.526h.509q.368-.706 1.215-1.215.85-.538 2.234-.538 1.498 0 2.404.594a3.8 3.8 0 011.385 1.499h.509a4.1 4.1 0 011.357-1.499q.876-.594 2.488-.594 1.301 0 2.347.566 1.074.537 1.697 1.668.65 1.102.65 2.8V28h-3.563v-8.963q0-1.16-.593-1.725-.594-.594-1.669-.594-1.215 0-1.894.792-.65.763-.65 2.205V28h-3.563v-8.963q0-1.16-.594-1.725-.594-.594-1.668-.594-1.216 0-1.894.792-.651.763-.651 2.205V28z'
        fill='#f2f2f2'
      ></path>
    </svg>
}
export default Logo

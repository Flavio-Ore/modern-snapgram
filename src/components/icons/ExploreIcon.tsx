import { cn } from '@/lib/utils'
import { type SVGProps } from 'react'
const ExploreIcon = ({ className }: SVGProps<SVGSVGElement>) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('fill-primary-500', className)}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M10.945 1.25h2.11c1.367 0 2.47 0 3.337.117.9.12 1.658.38 2.26.981.4.4.648.87.806 1.404.211.003.388.012.55.038a3.25 3.25 0 0 1 2.702 2.702c.04.253.04.542.04.943v9.13c0 .401 0 .69-.04.943a3.25 3.25 0 0 1-2.702 2.702 4 4 0 0 1-.55.038c-.158.534-.406 1.003-.806 1.404-.602.602-1.36.86-2.26.982-.867.116-1.97.116-3.337.116h-2.11c-1.367 0-2.47 0-3.337-.116-.9-.122-1.658-.38-2.26-.982-.4-.4-.648-.87-.806-1.404a4 4 0 0 1-.55-.038 3.25 3.25 0 0 1-2.702-2.702c-.04-.253-.04-.542-.04-.943v-9.13c0-.401 0-.69.04-.943A3.25 3.25 0 0 1 3.992 3.79c.162-.026.339-.035.55-.038.158-.534.406-1.003.806-1.404.602-.602 1.36-.86 2.26-.981.867-.117 1.97-.117 3.337-.117M4.302 5.262l-.076.01a1.75 1.75 0 0 0-1.454 1.454c-.02.122-.022.28-.022.774v9c0 .493.002.652.022.774a1.75 1.75 0 0 0 1.53 1.464c-.052-.749-.052-1.639-.052-2.683v-8.11c0-1.044 0-1.934.052-2.683m1.448 9.859V16c0 1.435.002 2.436.103 3.192.099.734.28 1.122.556 1.399.277.277.665.457 1.4.556.754.101 1.756.103 3.191.103h2c1.435 0 2.437-.002 3.192-.103.734-.099 1.122-.28 1.399-.556a1.6 1.6 0 0 0 .371-.596L16.08 18.01c-.503-.531-1.198-.567-1.728-.13l-.22.18c-.916.755-2.177.607-2.937-.284l-3.16-3.706c-.35-.41-.85-.42-1.207-.054zm12.48 2.975-1.06-1.119c-1.03-1.085-2.615-1.21-3.772-.256l-.22.18c-.255.211-.588.198-.842-.1l-3.16-3.706c-.912-1.069-2.437-1.138-3.422-.127l-.004.004V8c0-1.435.002-2.437.103-3.192.099-.734.28-1.122.556-1.399.277-.277.665-.457 1.4-.556.754-.101 1.756-.103 3.191-.103h2c1.435 0 2.437.002 3.192.103.734.099 1.122.28 1.399.556.277.277.457.665.556 1.4.101.754.103 1.756.103 3.191v8c0 .833 0 1.519-.02 2.096m1.468.642.076-.01a1.75 1.75 0 0 0 1.454-1.454c.02-.122.022-.28.022-.774v-9c0-.493-.002-.652-.021-.774a1.75 1.75 0 0 0-1.53-1.464c.051.749.051 1.639.051 2.683v8.11c0 1.044 0 1.934-.052 2.683M14.5 5.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m-2.25.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0'
    />
  </svg>
)

export default ExploreIcon

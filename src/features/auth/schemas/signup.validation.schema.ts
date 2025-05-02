import { z } from 'zod'

export const SignupValidationSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters long.'
  }),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters long.'
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
})

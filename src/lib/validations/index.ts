import * as z from 'zod'

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

export const SigninValidationSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
})

export const PostValidationSchema = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string()
})

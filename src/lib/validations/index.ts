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
  file: z.custom<File[]>().refine(files => files.length > 0, {
    message: 'Please upload at least one file.'
  }),
  location: z.string().min(2).max(100),
  tags: z.string()
})

export const ProfileValidationSchema = z.object({
  file: z.custom<File[]>(),
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters long.'
    })
    .max(20, {
      message:
        'Username must be at least 2 characters long and at most 20 characters long.'
    }),
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters long.'
    })
    .max(50, {
      message:
        'Name must be at least 2 characters long and at most 50 characters long.'
    }),
  bio: z.string().max(2200, {
    message:
      'Bio must be at least 1 character long and at most 2200 characters long.'
  }),
  email: z.string().email()
})

export const MessageValidationSchema = z.object({
  body: z.string().min(1).max(2200)
})

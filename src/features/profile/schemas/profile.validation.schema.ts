import { z } from 'zod'

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

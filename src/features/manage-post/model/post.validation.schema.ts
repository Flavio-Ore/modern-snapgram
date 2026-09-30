import type { FileModelWithUrl } from '@shared/types'
import { z } from 'zod'

export const PostValidationSchema = z.object({
  caption: z.string().min(5).max(2200),
  originalFiles: z.custom<FileModelWithUrl[]>(),
  newFiles: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string()
})

export type PostFormValues = z.infer<typeof PostValidationSchema>

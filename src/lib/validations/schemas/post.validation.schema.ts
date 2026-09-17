import { type FileModelWithUrl } from '@/types'
import { z } from 'zod'

export const PostValidationSchema = z.object({
  caption: z.string().min(5).max(2200),
  originalFiles: z.custom<FileModelWithUrl[]>(),
  newFiles: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string()
})

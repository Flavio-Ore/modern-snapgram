import { z } from 'zod'

export const MessageValidationSchema = z.object({
  body: z.string().min(1).max(2200)
})

export type MessageFormValues = z.infer<typeof MessageValidationSchema>

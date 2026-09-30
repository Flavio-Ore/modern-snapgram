import { z } from 'zod'

export const EditionMessageValidationSchema = z.object({
  body: z.string().min(1).max(2200),
  messageId: z.string()
})

export type EditionMessageFormValues = z.infer<
  typeof EditionMessageValidationSchema
>

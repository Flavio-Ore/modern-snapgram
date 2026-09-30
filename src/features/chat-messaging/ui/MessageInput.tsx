import SendIcon from '@/components/icons/SendIcon'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@shared/lib/cn'
import { Button, Form, FormControl, FormField, FormItem, Textarea } from '@shared/ui'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { MessageValidationSchema } from '../model/message.validation.schema'

export interface MessageInputProps {
  onSendMessage: (body: string) => Promise<void> | void
  isLoading?: boolean
  placeholder?: string
  className?: string
}

export const MessageInput = ({
  onSendMessage,
  isLoading = false,
  placeholder = 'Type a message...',
  className
}: MessageInputProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const form = useForm<z.infer<typeof MessageValidationSchema>>({
    resolver: zodResolver(MessageValidationSchema),
    defaultValues: {
      body: ''
    }
  })

  const handleSubmit = async (values: z.infer<typeof MessageValidationSchema>) => {
    if (!values.body.trim()) return
    await onSendMessage(values.body)
    form.reset({ body: '' })
    if (textAreaRef.current != null) {
      textAreaRef.current.style.height = '40px'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      form.handleSubmit(handleSubmit)()
    }
  }

  const handleInput = () => {
    if (textAreaRef.current != null) {
      textAreaRef.current.style.height = '40px'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        onKeyDown={handleKeyDown}
        className={cn('flex-center gap-x-4 w-full max-w-5xl', className)}
      >
        <FormField
          control={form.control}
          name='body'
          render={({ field }) => (
            <FormItem className='flex-auto'>
              <FormControl>
                <Textarea
                  placeholder={placeholder}
                  {...field}
                  ref={textAreaRef}
                  onInput={handleInput}
                  className='shad-textarea resize-none min-h-[40px] max-h-36 py-2 px-3 bg-dark-4 border-none text-light-1 focus-visible:ring-1 focus-visible:ring-primary-500'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={isLoading}
          className='size-12 bg-dark-4 hover:bg-dark-2 rounded-xl flex-center p-0 transition'
        >
          <SendIcon className='size-6 stroke-secondary-500 group-hover:stroke-primary-500' />
        </Button>
      </form>
    </Form>
  )
}

export default MessageInput

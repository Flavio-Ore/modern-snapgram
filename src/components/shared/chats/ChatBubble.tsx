import DeleteIcon from '@/components/icons/DeleteIcon'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { useDeleteMessage, useEditMessage } from '@/lib/queries/mutations'
import { cn, multiFormatDateString } from '@/lib/utils'
import { EditionMessageValidationSchema } from '@/lib/validations'
import { type ChatMemberModel, type MessageModel } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CopyIcon, Edit2Icon, GripIcon, SendHorizonalIcon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

const ChatBubble = ({
  message,
  currentChatMember
}: {
  message: MessageModel
  currentChatMember: ChatMemberModel
}) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()
  const { mutateAsync: deleteMessage } = useDeleteMessage()
  const { mutateAsync: editMessage } = useEditMessage()
  const isTheAuthor = useMemo(
    () => message?.author_chat?.$id === currentChatMember?.$id,
    [message, currentChatMember]
  )
  const editMessageForm = useForm<
  z.infer<typeof EditionMessageValidationSchema>
  >({
    resolver: zodResolver(EditionMessageValidationSchema),
    defaultValues: {
      messageId: message.$id,
      body: message.body
    }
  })

  const handleCopyMessage = (message: string) => () => {
    navigator.clipboard.writeText(message)
    toast({
      title: 'Copied to clipboard',
      duration: 1500
    })
    setIsEditing(false)
    setIsDeleting(false)
  }
  const handleDeleteMessage = (messageId: string) => async () => {
    console.log('messageId :>> ', messageId)
    try {
      await deleteMessage({
        messageId
      })
      setIsEditing(false)
      setIsDeleting(false)
      toast({
        title: 'Message deleted.',
        duration: 1500
      })
    } catch (e) {
      console.error({ e })
      toast({
        title: 'Error deleting message.',
        description: 'Try again later.',
        duration: 1500
      })
    }
  }

  async function onSubmitEditedMessage (
    values: z.infer<typeof EditionMessageValidationSchema>
  ) {
    try {
      const messageRes = await editMessage({
        messageId: values.messageId,
        newBody: values.body
      })
      console.log('EDITED MESSAGE RESPONSE', messageRes)
      setIsEditing(false)
      setIsDeleting(false)
      editMessageForm.reset()
    } catch (e) {
      console.error({ e })
    }
  }

  useEffect(() => {
    if (textAreaRef.current != null) {
      textAreaRef.current.style.height = '40px'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
    const formSubscription = editMessageForm.watch(() => {
      if (textAreaRef.current != null) {
        textAreaRef.current.style.height = '40px'
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
      }
    })
    if (!isEditing) {
      formSubscription.unsubscribe()
    }
    return () => {
      formSubscription.unsubscribe()
    }
  }, [isEditing])

  return (
    <div className='flex flex-col w-full py-2 gap-y-0.5 group hover:bg-dark-2'>
      <div
        className={cn('flex-center gap-1', {
          'mr-4 self-end flex-row': isTheAuthor,
          'ml-4 self-start flex-row-reverse': !isTheAuthor
        })}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='rounded-full opacity-50 bg-dark-1 hover:bg-dark-3 hover:opacity-100'>
              <GripIcon className='size-3 stroke-secondary-500' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleCopyMessage(message.body)}>
                <CopyIcon size={16} className='mr-2 stroke-primary-600' />
                <span>Copy</span>
              </DropdownMenuItem>
              {isTheAuthor && (
                <DropdownMenuItem
                  onClick={() => {
                    setIsEditing(true)
                    setIsDeleting(false)
                  }}
                >
                  <Edit2Icon size={16} className='mr-2 stroke-secondary-500' />
                  <span>Edit</span>
                </DropdownMenuItem>
              )}
              {isTheAuthor && (
                <DropdownMenuItem
                  onClick={() => {
                    setIsDeleting(true)
                    setIsEditing(false)
                  }}
                >
                  <DeleteIcon className='mr-2 size-4' />
                  <span>Delete</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete message</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the following message?
              </AlertDialogDescription>
              <AlertDialogDescription className='text-light-3 text-pretty break-words'>
                {message.body}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteMessage(message.$id)}>
                <div className='flex-center'>
                  <DeleteIcon className='mr-2 size-5 fill-red-500' />
                  <span className='text-red-500 group-hover:text-primary-500'>
                    Delete
                  </span>
                </div>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {isEditing && (
          <Dialog open={isEditing} modal={false}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editing the following message</DialogTitle>
                <DialogDescription className='text-light-3 text-pretty break-words'>
                  {message.body}
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={editMessageForm.handleSubmit(onSubmitEditedMessage)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    editMessageForm.handleSubmit(onSubmitEditedMessage)(e)
                  }
                }}
              >
                <Form {...editMessageForm}>
                  <FormField
                    control={editMessageForm.control}
                    name='body'
                    defaultValue={message.body}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder='Type the new message...'
                            {...field}
                            ref={textAreaRef}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <DialogFooter className='mt-4'>
                    <DialogClose
                      type='button'
                      onClick={() => {
                        setIsEditing(false)
                        setIsDeleting(false)
                      }}
                    >
                      Cancel
                    </DialogClose>
                    <Button
                      type='submit'
                      variant='ghost'
                      className='hover:bg-dark-4'
                    >
                      <div className='flex-center'>
                        <SendHorizonalIcon className='size-5 stroke-secondary-500' />
                        <span className='sr-only'>Upload edited message</span>
                      </div>
                    </Button>
                  </DialogFooter>
                </Form>
              </form>
            </DialogContent>
          </Dialog>
        )}
        <p
          className={cn(
            'py-3 px-4 max-w-80 min-w-30 rounded-xl text-pretty break-words tiny-medium xs:small-regular',
            {
              'bg-primary-600 relative after:block after:absolute after:bottom-0 after:-right-2 after:border-primary-600 after:border-b-[20px] after:border-b-primary-600 after:border-r-[20px] after:border-r-transparent':
                isTheAuthor,
              'bg-dark-4 relative z-10 after:block after:absolute after:bottom-0 after:-left-2 after:border-dark-4 after:border-b-[20px] after:border-b-dark-4 after:border-l-[20px] after:border-l-transparent':
                !isTheAuthor
            }
          )}
        >
          {message.body}
        </p>
      </div>
      {message.is_edited && (
        <p
          className={cn('subtle-semibold text-light-3 w-max', {
            'mr-4 self-end': isTheAuthor,
            'ml-4': !isTheAuthor
          })}
        >
          Edited
        </p>
      )}
      <p
        className={cn('tiny-medium text-light-4 w-max', {
          'mr-4 self-end': isTheAuthor,
          'ml-4': !isTheAuthor
        })}
      >
        {multiFormatDateString(message.$createdAt)}
      </p>
    </div>
  )
}

export default ChatBubble

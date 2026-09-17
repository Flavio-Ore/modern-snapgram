import DeleteIcon from '@/components/icons/DeleteIcon'
import Loader from '@/components/shared/app/Loader'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useGetInfiniteMessages } from '@/lib/queries/infiniteQueries'
import { useUser } from '@/lib/queries/queries'
import { cn, multiFormatDateString } from '@/lib/utils'
import { MessageValidationSchema } from '@/lib/validations'
import { appwriteConfig, client, databases } from '@/services/appwrite/config'
import { type UserModel } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { ID, Permission, Role } from 'appwrite'
import { PhoneIcon, SendIcon, VideoIcon } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { type z } from 'zod'

const Chat = ({ user }: { user: UserModel }) => {
  const { data: account } = useUser()
  const {
    data: messagesPages,
    isLoading,
    isError,
    refetch: refetchMessages
  } = useGetInfiniteMessages({
    senderId: account?.accountId ?? '',
    receiversId: [user.accountId]
  })
  console.log('messages :>> ', messagesPages)
  const recieverId = user.accountId

  const form = useForm<z.infer<typeof MessageValidationSchema>>({
    resolver: zodResolver(MessageValidationSchema),
    defaultValues: {
      body: ''
    }
  })

  const messages = useMemo(
    () =>
      messagesPages?.pages.flatMap(
        page => page?.data.flatMap(message => message) ?? []
      ) ?? [],
    [messagesPages]
  )

  const accountId = useMemo(() => account?.accountId ?? '', [account])
  console.log('accountId :>> ', accountId)

  const handleDeleteMessage =
    (messageId: string) =>
      async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        try {
          const message = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.messageCollectionId,
            messageId
          )
          console.log('DELETED MESSAGE', message)
        } catch (e) {
          console.error({ e })
        }
      }

  async function onSubmit (values: z.infer<typeof MessageValidationSchema>) {
    try {
      const payload = {
        sender: accountId,
        receivers: [recieverId],
        body: values.body
      }
      console.log('payload :>> ', payload)
      console.log('permissions :>> ', [
        Permission.write(Role.user(account?.accountId ?? ''))
      ])

      const message = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.messageCollectionId,
        ID.unique(),
        payload,
        [Permission.write(Role.user(accountId))]
      )
      console.log('CREATED MESSAGE', message)

      form.reset()
    } catch (e) {
      console.error({ e })
    }
  }

  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents`,
      response => {
        console.log('Chat:', response)
        if (
          response.events.includes(
            'databases.*.collections.*.documents.*.create'
          ) ||
          response.events.includes(
            'databases.*.collections.*.documents.*.update'
          ) ||
          response.events.includes(
            'databases.*.collections.*.documents.*.delete'
          )
        ) {
          refetchMessages()
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className='flex-between flex-col basis-2/3 size-full bg-dark-3 rounded-xl border border-light-4/40 px-6 py-4 gap-y-2'>
      <div className='flex-between w-full'>
        <Link className='flex items-center gap-3' to={`/profile/${user?.$id}`}>
          <div className="relative before:absolute before:rounded-full before:content-[''] before:bottom-0 before:right-0 before:size-4 before:bg-green-500 hover:before:animate-rubber-band hover:before:animate-iteration-count-infinite hover:before:animate-duration-[3000ms] before:z-50">
            <img
              src={user?.imageUrl}
              alt='Chat profile picture'
              height='70'
              width='70'
              className='relative rounded-full aspect-square object-cover'
            />
          </div>
          <div className='flex gap-1 flex-col'>
            <p className='base-medium lg:body-bold text-light-1'>
              {user?.name}
            </p>
            <p className='subtle-semibold text-light-3 lg:small-regular'>
              online
            </p>
          </div>
        </Link>
        <div className='flex-center gap-4'>
          <PhoneIcon
            size={28}
            className='stroke-light-3 hover:stroke-primary-500/50 cursor-pointer'
          />
          <VideoIcon
            size={28}
            className='stroke-light-3 hover:stroke-primary-500/50 cursor-pointer'
          />
        </div>
      </div>
      <hr className='border w-full border-dark-4/80' />
      <div className='flex flex-col size-full max-h-[600px] custom-scrollbar overflow-y-scroll py-4'>
        {isLoading && (
          <div className='flex-center size-full'>
            <Loader />
          </div>
        )}
        {isError && (
          <div className='flex-center flex-col gap-4'>
            <h1 className='h1-bold'>Error fetching messages</h1>
            <Link to='/chats' className='button_secondary'>
              Try again
            </Link>
          </div>
        )}
        {!isLoading &&
          !isError &&
          messages.map(message => (
            <div
              key={message.$id}
              className={cn(
                'flex-between gap-2 py-2 px-4 rounded-xl base-regular max-w-max',
                {
                  'self-end bg-dark-4': message.sender === accountId,
                  'bg-dark-2': message.sender !== accountId
                }
              )}
            >
              <p>{message.body}</p>
              <small className='subtle-semibold text-light-4'>
                {multiFormatDateString(message.$createdAt)}
              </small>
              {message.$permissions.includes(`delete("user:${accountId}")`) && (
                <Button onClick={handleDeleteMessage(message.$id)} className=''>
                  <DeleteIcon className='size-3 stroke-red-500 hover:stroke-500/50' />
                </Button>
              )}
            </div>
          ))}
      </div>
      <hr className='border w-full border-dark-4/80' />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex gap-x-4 w-full max-w-5xl '
        >
          <FormField
            control={form.control}
            name='body'
            render={({ field }) => (
              <FormItem className='flex-auto'>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Write your message here...'
                    className='shad-input w-full flex-auto'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='shad-button_secondary whitespace-nowrap flex-initial'
          >
            <SendIcon size={17.5} className='stroke-dark-2' />
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Chat

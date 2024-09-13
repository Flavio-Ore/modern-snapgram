import BackIcon from '@/components/icons/BackIcon'
import LoaderIcon from '@/components/icons/LoaderIcon'
import PhoneIcon from '@/components/icons/PhoneIcon'
import SendIcon from '@/components/icons/SendIcon'
import VideoIcon from '@/components/icons/VideoIcon'
import ChatBubble from '@/components/shared/chats/ChatBubble'
import MessagesSkeleton from '@/components/shared/skeletons/MessagesSkeleton'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { useGetInfiniteMessagesByChatRoomId } from '@/lib/queries/infiniteQueries'
import {
  useCreateMessage,
  useSetMessagesReadToZero
} from '@/lib/queries/mutations'
import { useUser } from '@/lib/queries/queries'
import { cn } from '@/lib/utils'
import { MessageValidationSchema } from '@/lib/validations'
import { appwriteConfig, client } from '@/services/appwrite/config'
import { type ChatRoomModel, type MessageModel } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageCircleWarningIcon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { type z } from 'zod'

const Chat = ({ chatRoom }: { chatRoom: ChatRoomModel }) => {
  const [isFirstTimeInChat, setIsFirstTimeInChat] = useState(true)
  const bottomOfChatRef = useRef<HTMLDivElement>(null)
  const isAtBottomOnce = useRef(false)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()
  const { ref: topChatRef, inView: topChatInView } = useInView({
    threshold: 0
  })
  const { data: user } = useUser()
  const { mutateAsync: createMessage } = useCreateMessage()
  const { mutateAsync: setMessagesReadToZero, isPending } =
    useSetMessagesReadToZero()
  const {
    data: messagesResponse,
    isLoading,
    isError,
    refetch: refetchMessages,
    isFetching,
    hasNextPage,
    isRefetching,
    fetchNextPage
  } = useGetInfiniteMessagesByChatRoomId({
    chatRoomId: chatRoom.$id
  })
  const currentMember = useMemo(
    () =>
      chatRoom.members.find(
        chatMember => chatMember.member.$id === user?.$id
      ) ?? null,
    [chatRoom, user]
  )
  const membersExceptCurrentUser = useMemo(
    () =>
      chatRoom.members.filter(
        chatMember => chatMember.member.$id !== user?.$id
      ) ?? [],
    [chatRoom, user]
  )

  const chatForm = useForm<z.infer<typeof MessageValidationSchema>>({
    resolver: zodResolver(MessageValidationSchema),
    defaultValues: {
      body: ''
    }
  })
  const messages = useMemo(
    () => messagesResponse?.pages.flatMap(page => page?.data ?? []) ?? [],
    [messagesResponse]
  )
  const ownChatMembersIds = useMemo(
    () => user?.chats.map(chat => chat.$id) ?? [],
    [user]
  )
  const accountId = useMemo(() => user?.accountId ?? '', [user])
  async function onSubmitMessage (
    values: z.infer<typeof MessageValidationSchema>
  ) {
    try {
      if (currentMember == null) return
      const messageRes = await createMessage({
        body: values.body,
        authorAccountId: accountId,
        authorChat: currentMember,
        receiversChat: membersExceptCurrentUser,
        chatRoomId: chatRoom.$id
      })
      if (messageRes?.data != null) {
        chatForm.reset()
        if (textAreaRef.current != null) {
          textAreaRef.current.style.height = '40px'
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Error sending message!',
          description: 'Try again later.'
        })
      }
    } catch (e) {
      console.error({ e })
    }
  }

  useEffect(() => {
    if (textAreaRef.current != null) {
      textAreaRef.current.style.height = '40px'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
    const formSubscription = chatForm.watch(() => {
      if (textAreaRef.current != null) {
        textAreaRef.current.style.height = '40px'
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
      }
    })
    return () => {
      formSubscription.unsubscribe()
    }
  }, [chatForm.watch('body')])

  useEffect(() => {
    if (bottomOfChatRef.current != null && !isRefetching) {
      bottomOfChatRef.current?.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, [isRefetching])

  useEffect(() => {
    if (bottomOfChatRef.current != null && !isAtBottomOnce.current) {
      isAtBottomOnce.current = true
      bottomOfChatRef.current?.scrollIntoView({
        behavior: 'instant'
      })
    }
  }, [messagesResponse])

  useEffect(() => {
    if (topChatInView && !isFetching && hasNextPage) void fetchNextPage()
  }, [topChatInView])

  useEffect(() => {
    if (
      currentMember == null ||
      isPending ||
      currentMember.messages_to_read <= 0 ||
      !isFirstTimeInChat
    ) {
      return
    }
    setIsFirstTimeInChat(false)

    setMessagesReadToZero({
      chatId: currentMember.$id
    })
      .then()
      .catch(e => {
        console.error({ e })
      })
  }, [currentMember])

  useEffect(() => {
    if (ownChatMembersIds.length <= 0) return
    const unsubscribeMessages = client.subscribe<MessageModel>(
      [
        `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents`
      ],
      ({ events, payload: newMessage }) => {
        if (
          events.includes(
            `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents.*.create`
          ) ||
          events.includes(
            `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents.*.update`
          ) ||
          events.includes(
            `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents.*.delete`
          )
        ) {
          if (
            ownChatMembersIds.some(id => id === newMessage.author_chat_id) ||
            newMessage.receivers_chat_id.some(id =>
              ownChatMembersIds.some(ownId => ownId === id)
            )
          ) {
            refetchMessages()
          }
        }
      }
    )
    return () => {
      unsubscribeMessages()
    }
  }, [ownChatMembersIds])

  return (
    <div className='flex-between flex-col lg:basis-2/3 size-full bg-dark-1 rounded-xl border border-dark-4 px-6 py-4'>
      <div className='flex-between w-full'>
        <div className='inline-flex gap-x-4'>
          <Link to='/chats' className='flex gap-3 items-center'>
            <BackIcon className='size-7' />
          </Link>
          <Link
            className='flex items-center gap-3'
            to={`/profile/${membersExceptCurrentUser[0].member.$id}`}
          >
            <div
              className={cn(
                "relative before:absolute before:rounded-full before:content-[''] before:bottom-0 before:right-0 before:size-4 hover:before:animate-rubber-band hover:before:animate-iteration-count-infinite hover:before:animate-duration-[3000ms] before:z-10 lg:before:bg-transparent",
                {
                  'before:bg-green-500': membersExceptCurrentUser.some(
                    memberChat => memberChat.online
                  ),
                  'before:bg-red-500': membersExceptCurrentUser.every(
                    memberChat => !memberChat.online
                  )
                }
              )}
            >
              <img
                src={membersExceptCurrentUser[0].member.imageUrl}
                alt='Chat profile picture'
                height='68'
                width='68'
                className='rounded-full aspect-square object-cover'
              />
            </div>
            <div className='flex gap-1 flex-col overflow-ellipsis'>
              <p className='base-medium lg:body-medium overflow-ellipsis'>
                {membersExceptCurrentUser[0].member.name}
              </p>
              <p className='subtle-semibold text-light-3 lg:small-regular'>
                {membersExceptCurrentUser.some(memberChat => memberChat.online)
                  ? 'Online'
                  : 'Offline'}
              </p>
            </div>
          </Link>
        </div>
        <div className='flex-center gap-4'>
          <PhoneIcon
            strokeWidth={1}
            className='size-7 hover:stroke-primary-500 cursor-pointer'
          />
          <VideoIcon
            strokeWidth={1}
            className='size-7 hover:stroke-primary-500 cursor-pointer'
          />
        </div>
      </div>
      <hr className='border w-full border-dark-4 my-2' />
      <div className='flex flex-col size-full custom-scrollbar overflow-y-scroll py-4'>
        <>
          {isLoading && <MessagesSkeleton />}
          {isError && (
            <div className='flex-center size-full flex-col text-light-3 animate-pulse'>
              <MessageCircleWarningIcon size={64} />
              <h3 className='h1-bold'>Error receiving messages!</h3>
              <p className='text-primary-500'>Try again later.</p>
            </div>
          )}
          {!isLoading &&
            !isError &&
            messagesResponse != null &&
            messages.length === 0 && (
              <p className='text-light-4 mt-10 text-center body-bold w-full animate-pulse'>
                Type a message to start chatting!
              </p>
          )}
          {!isLoading &&
            !isError &&
            currentMember != null &&
            messagesResponse != null &&
            messages.length !== 0 && (
              <>
                {!hasNextPage && (
                  <p className='text-light-4 mb-10 text-center w-full animate-pulse'>
                    You reached the beginning!
                  </p>
                )}
                {hasNextPage && (
                  <div
                    ref={topChatRef}
                    className={cn('flex mb-10 flex-center w-full', {
                      'animate-fade-out-down animate-duration-1000 animate-delay-1000':
                        topChatInView
                    })}
                  >
                    <LoaderIcon className='stroke-secondary-500' />
                  </div>
                )}
                {messages.map(message => (
                  <ChatBubble
                    key={message.$id}
                    message={message}
                    currentChatMember={currentMember}
                  />
                ))}
                <div ref={bottomOfChatRef} />
              </>
          )}
        </>
      </div>
      <hr className='border w-full border-dark-4 my-4' />
      <Form {...chatForm}>
        <form
          onSubmit={chatForm.handleSubmit(onSubmitMessage)}
          className='flex-center gap-x-4 w-full max-w-5xl'
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              chatForm.handleSubmit(onSubmitMessage)(e)
            }
          }}
        >
          <FormField
            control={chatForm.control}
            name='body'
            render={({ field }) => (
              <FormItem className='flex-auto'>
                <FormControl>
                  <Textarea
                    placeholder='Type a message...'
                    {...field}
                    ref={textAreaRef}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit' className='size-12 bg-dark-4 hover:bg-dark-2'>
            <SendIcon className='size-full stroke-secondary-500 group-hover:stroke-primary-500 ' />
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Chat

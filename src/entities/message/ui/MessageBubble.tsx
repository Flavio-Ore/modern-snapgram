import { type MessageModel } from '../model/types'
import { cn } from '@shared/lib/cn'
import { multiFormatDateString } from '@shared/lib/multiFormatDateString'
import { type ReactNode } from 'react'

export interface MessageBubbleProps {
  message: MessageModel
  isTheAuthor: boolean
  actionsSlot?: ReactNode
  className?: string
}

export const MessageBubble = ({
  message,
  isTheAuthor,
  actionsSlot,
  className
}: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        'group flex w-full flex-col gap-y-0.5 py-2 hover:bg-dark-2/40',
        className
      )}
    >
      <div
        className={cn('flex items-center gap-1.5', {
          'mr-4 self-end flex-row': isTheAuthor,
          'ml-4 self-start flex-row-reverse': !isTheAuthor
        })}
      >
        {actionsSlot}

        <p
          className={cn(
            'min-w-30 max-w-80 rounded-xl px-4 py-3 text-pretty break-words tiny-medium xs:small-regular text-light-1',
            {
              'relative bg-primary-600 after:absolute after:bottom-0 after:-right-2 after:block after:border-b-[20px] after:border-b-primary-600 after:border-r-[20px] after:border-r-transparent':
                isTheAuthor,
              'relative z-10 bg-dark-4 after:absolute after:bottom-0 after:-left-2 after:block after:border-b-[20px] after:border-b-dark-4 after:border-l-[20px] after:border-l-transparent':
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

export default MessageBubble

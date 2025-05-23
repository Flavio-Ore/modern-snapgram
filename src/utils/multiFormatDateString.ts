import { formatDateString } from '@/utils/formatDateString'

export const multiFormatDateString = (timestamp: string = '') => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000)
  const date: Date = new Date(timestampNum * 1000)
  const now: Date = new Date()

  const diff: number = now.getTime() - date.getTime()
  const diffInSeconds: number = diff / 1000
  const diffInMinutes: number = diffInSeconds / 60
  const diffInHours: number = diffInMinutes / 60
  const diffInDays: number = diffInHours / 24

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(timestamp)
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} day ago`
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hours ago`
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`
    default:
      return 'Just now'
  }
}

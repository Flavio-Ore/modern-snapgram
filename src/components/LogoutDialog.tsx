import { PUBLIC_ROUTES } from '@/routes/public'
import { useSessionUser } from '@auth/hooks/useSessionUser'
import { useSignOut } from '@auth/hooks/useSignOut'
import { useGetAllMemberChats } from '@chats/hooks/useGetAllMemberChats'
import { useSetChatMemberOnline } from '@chats/hooks/useSetChatMemberOnline'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@shadcn/alert-dialog'
import { Button } from '@shadcn/button'
import { useToast } from '@shadcn/use-toast'
import { LucideLogOut } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutDialog = () => {
  const { data: user } = useSessionUser()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { data: ownMembers } = useGetAllMemberChats({
    userId: user?.$id ?? ''
  })
  const { mutateAsync: updateStatus } = useSetChatMemberOnline()
  const { mutate: signOut } = useSignOut()

  const chatMembersIds = useMemo(
    () => ownMembers?.map(chatMember => chatMember.$id) ?? [],
    [ownMembers]
  )
  const handleLogout = async () => {
    toast({
      title: 'Logging out...',
      description: 'Please wait while we log you out.',
      variant: 'default'
    })
    await updateStatus({
      chatIds: chatMembersIds,
      online: false
    })
    signOut()
    navigate(PUBLIC_ROUTES.SIGN_IN)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' className='flex-start gap-x-3 hover:bg-red-700'>
          <LucideLogOut
            size={24}
            className='stroke-red-700 group-hover:stroke-white'
          />
          <span className='hidden xl:inline group-hover:text-light-2 small-regular'>
            Logout
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>
            <div className='flex-center gap-x-2'>
              <span className='text-red-500 group-hover:text-primary-500'>
                Logout
              </span>
              <LucideLogOut
                size={24}
                className='stroke-red-500 group-hover:stroke-secondary-500'
              />
            </div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default LogoutDialog

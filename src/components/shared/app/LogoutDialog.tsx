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
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useSetChatMemberOnline, useSignOut } from '@/lib/queries/mutations'
import { useGetAllMemberChats, useUser } from '@/lib/queries/queries'
import { LucideLogOut } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutDialog = () => {
  const { data: user } = useUser()
  const { data: ownMembers } = useGetAllMemberChats({
    userId: user?.$id ?? ''
  })
  const { mutateAsync: updateStatus } = useSetChatMemberOnline()
  const { mutate: signOut, isSuccess } = useSignOut()
  const navigate = useNavigate()

  const chatMembersIds = useMemo(
    () => ownMembers?.map(chatMember => chatMember.$id) ?? [],
    [ownMembers]
  )
  const handleLogout = async () => {
    await updateStatus({
      chatIds: chatMembersIds,
      online: false
    })
    signOut()
  }
  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess])
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

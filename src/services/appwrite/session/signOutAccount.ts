import {
  account
} from '@/services/appwrite/config'
export async function signOutAccount () {
  try {
    await account.deleteSession('current')
  } catch (error) {
    console.error(error)
  }
}

import {
  account
} from '@/services/config'
export async function signOutAccount () {
  try {
    await account.deleteSession('current')
    window.localStorage.removeItem('cookieFallback')
  } catch (error) {
    console.error(error)
  }
}

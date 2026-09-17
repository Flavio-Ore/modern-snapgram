import {
  account
} from '@/services/config'

export async function isAuthenticated () {
  try {
    const session = window.localStorage.getItem('cookieFallback') ?? ''
    if (session === '' || session === '[]') {
      console.log('No session found')
      await account.deleteSession('current')
      window.localStorage.removeItem('cookieFallback')
      return false
    }

    const isLoggedIn = await account.get()
    console.log('isLoggedIn: ', isLoggedIn)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

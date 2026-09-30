import { account } from '@/services/config'

export async function isAuthenticated() {
  try {
    const session = window.localStorage.getItem('cookieFallback') ?? ''
    if (session === '' || session === '[]') {
      await account.deleteSession('current')
      window.localStorage.removeItem('cookieFallback')
      return false
    }

    await account.get()
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

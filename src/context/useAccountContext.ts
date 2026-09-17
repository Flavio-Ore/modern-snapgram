import AccountProvider, { AccountContext } from '@/context/AccountContext'
import { type AccountContextType } from '@/types'
import { useContext } from 'react'

export const useAccount = (): AccountContextType => {
  const accountContext = useContext(AccountContext)

  if (accountContext == null) {
    throw new Error(`${Object.keys({ accountContext })[0]} must be used within ${Object.keys({ AccountProvider })[0]}`)
  }
  return accountContext
}

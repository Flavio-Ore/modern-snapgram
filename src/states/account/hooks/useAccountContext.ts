import { AccountContext } from '@/states/account/contexts/AccountContext'
import AccountProvider from '@/states/account/providers/AccountProvider'
import { type AccountContextType } from '@/types'
import { useContext } from 'react'

export const useAccount = (): AccountContextType => {
  const accountContext = useContext(AccountContext)

  if (accountContext == null) {
    throw new Error(
      `${Object.keys({ accountContext })[0]} must be used within ${
        Object.keys({ AccountProvider })[0]
      }`
    )
  }
  return accountContext
}

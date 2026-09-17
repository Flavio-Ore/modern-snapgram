import { INITIAL_ACCOUNT_STATE } from '@/states/account/states'
import { type AccountContextType } from '@/types'
import { createContext } from 'react'

export const AccountContext = createContext<AccountContextType>(
  INITIAL_ACCOUNT_STATE
)

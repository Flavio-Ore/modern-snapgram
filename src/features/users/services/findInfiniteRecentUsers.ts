import {
  account
} from '@/services/config'
import { findInfiniteUsers } from '@users/services/findInfiniteUsers'
import { Query } from 'appwrite'

export async function findInfiniteRecentUsers ({ lastId = '' }) {
  const userAccount = await account.get()

  return await findInfiniteUsers({
    lastId,
    query: [
      Query.notEqual('accountId', userAccount.$id),
      Query.orderAsc('$createdAt')
    ]
  })
}

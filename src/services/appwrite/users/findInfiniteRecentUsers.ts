import {
  account
} from '@/services/appwrite/config'
import { findInfiniteUsers } from '@/services/appwrite/users/findInfiniteUsers'
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

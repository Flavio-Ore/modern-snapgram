import { findInfiniteUsers } from '@/services/appwrite/users/findInfiniteUsers'
import { type UserModel } from '@/types'
import { Query } from 'appwrite'

export async function findInfiniteSearchedUsers ({
  lastId = '',
  searchTerm = ''
}: {
  lastId: UserModel['$id']
  searchTerm: string
}) {
  return await findInfiniteUsers({
    lastId,
    query: [
      Query.or([
        Query.search('name', searchTerm),
        Query.search('username', searchTerm)
      ])
    ]
  })
}

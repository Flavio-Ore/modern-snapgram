import { type UserModel } from '@/types'
import { findInfiniteUsers } from '@users/services/findInfiniteUsers'
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

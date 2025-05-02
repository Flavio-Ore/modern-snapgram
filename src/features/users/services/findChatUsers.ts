import {
  account,
  appwriteConfig,
  databases
} from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import { type UserModel } from '@/types'
import { AppwriteException, type Models, Query } from 'appwrite'

interface UsersChatsIds extends Models.Document {
  sender: string
  receivers: string[]
}
export async function findChatUsers () {
  const userAccount = await account.get()

  try {
    const chatUsersIds = await databases.listDocuments<UsersChatsIds>(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      [
        Query.or([
          Query.equal('sender', userAccount.$id),
          Query.contains('receivers', [userAccount.$id])
        ]),
        Query.select(['sender', 'receivers'])
      ]
    )

    const setOfUniqueUsersIds = new Set<string>()
    chatUsersIds.documents.forEach(({ sender, receivers }) => {
      setOfUniqueUsersIds.add(sender)
      receivers.forEach(receiver => setOfUniqueUsersIds.add(receiver))
    })
    setOfUniqueUsersIds.delete(userAccount.$id)

    if (setOfUniqueUsersIds.size === 0) {
      return appwriteResponse({
        data: [],
        code: APPWRITE_RESPONSE_CODES.OK.code,
        message: APPWRITE_RESPONSE_CODES.OK.message,
        status: APPWRITE_RESPONSE_CODES.OK.status
      })
    }
    const { documents: usersDocuments } =
      await databases.listDocuments<UserModel>(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [
          Query.contains('accountId', Array.from(setOfUniqueUsersIds)),
          Query.limit(100)
        ]
      )

    return appwriteResponse({
      data: usersDocuments,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.status
    })
  } catch (e) {
    console.error({ e })
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: [],
        message: e.message,
        code: e.code,
        status: e.type
      })
    }
    return null
  }
}

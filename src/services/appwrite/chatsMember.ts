import { appwriteConfig, databases } from '@/services/appwrite/config'
import {
  APPWRITE_RESPONSE_CODES,
  appwriteResponse
} from '@/services/appwrite/util'
import { type ChatMemberModel, type UserModel } from '@/types'
import { AppwriteException, ID, Query } from 'appwrite'

export async function findInfiniteChats ({
  lastId = '',
  userId
}: {
  lastId: ChatMemberModel['$id']
  userId: UserModel['$id']
}) {
  try {
    const query = [Query.equal('member', userId), Query.limit(1)]

    if (lastId.trim().length !== 0) {
      query.push(Query.cursorAfter(lastId))
    }

    const chatMemberships = await databases.listDocuments<ChatMemberModel>(
      appwriteConfig.databaseId,
      appwriteConfig.chatMemberCollectionId,
      query
    )

    return appwriteResponse({
      data: chatMemberships.documents,
      message: 'Chats found successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
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

export async function findAllOtherMembersFromAllChatsByUserId ({
  userId
}: {
  userId: UserModel['$id']
}) {
  try {
    const query = [Query.notEqual('member', userId)]
    const chatMemberships = await databases.listDocuments<ChatMemberModel>(
      appwriteConfig.databaseId,
      appwriteConfig.chatMemberCollectionId,
      query
    )

    return appwriteResponse({
      data: chatMemberships.documents,
      message: 'Chats found successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
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

export async function findAllMemberChatsByUserId ({
  userId
}: {
  userId: UserModel['$id']
}) {
  try {
    const query = [Query.equal('member', [userId])]
    const chatMemberships = await databases.listDocuments<ChatMemberModel>(
      appwriteConfig.databaseId,
      appwriteConfig.chatMemberCollectionId,
      query
    )

    return appwriteResponse({
      data: chatMemberships.documents,
      message: 'All member-chats found successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
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

export async function createChat ({ userId }: { userId: UserModel['$id'] }) {
  try {
    const chatMembership = await databases.createDocument<ChatMemberModel>(
      appwriteConfig.databaseId,
      appwriteConfig.chatMemberCollectionId,
      ID.unique(),
      {
        member: userId
      }
    )

    return appwriteResponse({
      data: chatMembership,
      message: 'User added to chat successfully.',
      status: APPWRITE_RESPONSE_CODES.CREATED.status,
      code: APPWRITE_RESPONSE_CODES.CREATED.code
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: null,
        message: e.message,
        code: e.code,
        status: e.type
      })
    }
    return null
  }
}

export async function findChatMembers ({
  memberId
}: {
  memberId: UserModel['$id']
}) {
  try {
    const query = [Query.equal('member', memberId)]
    const chatMemberships = await databases.listDocuments<ChatMemberModel>(
      appwriteConfig.databaseId,
      appwriteConfig.chatMemberCollectionId,
      query
    )

    return appwriteResponse({
      data: chatMemberships.documents,
      message: 'Chat members found successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
    })
  } catch (e) {
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

export async function resetMessagesToRead ({
  chatId
}: {
  chatId: ChatMemberModel['$id']
}) {
  try {
    const chatMembership = await databases.updateDocument<ChatMemberModel>(
      appwriteConfig.databaseId,
      appwriteConfig.chatMemberCollectionId,
      chatId,
      {
        messages_to_read: 0
      }
    )

    return appwriteResponse({
      data: chatMembership,
      message: 'Messages from chat marked as read successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: null,
        message: e.message,
        code: e.code,
        status: e.type
      })
    }
    return null
  }
}

export async function updateChatMemberOnlineStatus ({
  chatIds,
  online
}: {
  chatIds: Array<ChatMemberModel['$id']>
  online: boolean
}) {
  try {
    const updatedMemberChats = await Promise.all(
      chatIds.map(
        async chatId =>
          await databases.updateDocument<ChatMemberModel>(
            appwriteConfig.databaseId,
            appwriteConfig.chatMemberCollectionId,
            chatId,
            {
              online
            }
          )
      )
    )

    return appwriteResponse({
      data: updatedMemberChats,
      message: 'Chat member online status updated successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: null,
        message: e.message,
        code: e.code,
        status: e.type
      })
    }
    return null
  }
}

export async function findChatById ({
  chatId
}: {
  chatId: ChatMemberModel['$id']
}) {
  try {
    const chatMembership = await databases.getDocument<ChatMemberModel>(
      appwriteConfig.databaseId,
      appwriteConfig.chatMemberCollectionId,
      chatId
    )

    return appwriteResponse({
      data: chatMembership,
      message: 'Chat found successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: null,
        message: e.message,
        code: e.code,
        status: e.type
      })
    }
    return null
  }
}

export async function deleteChat ({
  chatId
}: {
  chatId: ChatMemberModel['$id']
}) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.chatMemberCollectionId,
      chatId
    )

    return appwriteResponse({
      data: null,
      message: 'Chat deleted successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: null,
        message: e.message,
        code: e.code,
        status: e.type
      })
    }
    return null
  }
}

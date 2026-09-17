import { appwriteConfig, databases } from '@/services/appwrite/config'
import {
  APPWRITE_RESPONSE_CODES,
  appwriteResponse
} from '@/services/appwrite/util'
import {
  type ChatMemberModel,
  type ChatRoomModel,
  type UserModel
} from '@/types'
import { AppwriteException, ID, Query } from 'appwrite'

export async function findAllChatRoomsByMemberId ({
  memberId
}: {
  memberId: ChatMemberModel['$id']
}) {
  try {
    const query = [Query.equal('members', [memberId])]
    const chatRooms = await databases.listDocuments<ChatRoomModel>(
      appwriteConfig.databaseId,
      appwriteConfig.chatRoomCollectionId,
      query
    )

    return appwriteResponse({
      data: chatRooms,
      message: 'Chat rooms found successfully.',
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

export async function findAllChatRoomsByUserId ({
  chatRoomsIds
}: {
  chatRoomsIds: Array<ChatRoomModel['$id']>
}) {
  try {
    if (chatRoomsIds.length <= 0) {
      return appwriteResponse({
        data: [],
        message: 'Chat rooms found successfully.',
        status: APPWRITE_RESPONSE_CODES.OK.status,
        code: APPWRITE_RESPONSE_CODES.OK.code
      })
    }
    const chatRooms = await databases.listDocuments<ChatRoomModel>(
      appwriteConfig.databaseId,
      appwriteConfig.chatRoomCollectionId,
      [Query.equal('$id', chatRoomsIds)]
    )
    return appwriteResponse({
      data: chatRooms.documents,
      message: 'Chat rooms found successfully.',
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

export async function findChatRoomsByIds ({
  chatRoomIds
}: {
  chatRoomIds: Array<ChatRoomModel['$id']>
}) {
  try {
    const query = [Query.equal('$id', chatRoomIds)]
    const chatRooms = await databases.listDocuments<ChatRoomModel>(
      appwriteConfig.databaseId,
      appwriteConfig.chatRoomCollectionId,
      query
    )

    return appwriteResponse({
      data: chatRooms.documents,
      message: 'Chat rooms found successfully.',
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

export async function createChatRoomFromUsers ({
  users
}: {
  users: UserModel[]
}) {
  try {
    if (users.length < 2) return null
    const chatRoomExists = users.some(user =>
      users.some(
        currentUserToEval =>
          user.$id !== currentUserToEval.$id &&
          user.chats.some(chatMember =>
            currentUserToEval.chats.some(
              member => member.chat_room.$id === chatMember.chat_room.$id
            )
          )
      )
    )

    if (chatRoomExists) {
      return appwriteResponse({
        data: null,
        message: 'Chat room already exists.',
        status: APPWRITE_RESPONSE_CODES.OK.status,
        code: APPWRITE_RESPONSE_CODES.OK.code
      })
    }

    if (users.some(user => user.chats.length <= 0)) {
      const chatMembers = await Promise.all(
        users.map(
          async user =>
            await databases.createDocument<ChatMemberModel>(
              appwriteConfig.databaseId,
              appwriteConfig.chatMemberCollectionId,
              ID.unique(),
              {
                member: user.$id
              }
            )
        )
      )
      const firstChatRoom = await databases.createDocument<ChatRoomModel>(
        appwriteConfig.databaseId,
        appwriteConfig.chatRoomCollectionId,
        ID.unique(),
        {
          members: chatMembers.map(chatMember => chatMember.$id)
        }
      )
      return appwriteResponse({
        data: firstChatRoom,
        message: 'First chat room created successfully!',
        status: APPWRITE_RESPONSE_CODES.OK.status,
        code: APPWRITE_RESPONSE_CODES.OK.code
      })
    }
    const chatRoomIds = users.flatMap(user =>
      user.chats.map(chat => chat.chat_room.$id)
    )

    const chatRooms = await databases.listDocuments<ChatRoomModel>(
      appwriteConfig.databaseId,
      appwriteConfig.chatRoomCollectionId,
      [Query.equal('$id', chatRoomIds)]
    )

    const sharedUserChatRooms = chatRooms.documents.filter(chatRoom => {
      return chatRoom.members.every(chatMember =>
        users.some(user => user.$id === chatMember.member.$id)
      )
    })

    if (sharedUserChatRooms.length === 1) {
      return appwriteResponse({
        data: sharedUserChatRooms[0],
        message: 'Chat room already exists.',
        status: APPWRITE_RESPONSE_CODES.OK.status,
        code: APPWRITE_RESPONSE_CODES.OK.code
      })
    }
    const chatMembers = await Promise.all(
      users.map(
        async user =>
          await databases.createDocument<ChatMemberModel>(
            appwriteConfig.databaseId,
            appwriteConfig.chatMemberCollectionId,
            ID.unique(),
            {
              member: user.$id
            }
          )
      )
    )

    const newChatRoom = await databases.createDocument<ChatRoomModel>(
      appwriteConfig.databaseId,
      appwriteConfig.chatRoomCollectionId,
      ID.unique(),
      {
        members: chatMembers.map(chatMember => chatMember.$id)
      }
    )

    return appwriteResponse({
      data: newChatRoom,
      message: 'Chat room created successfully.',
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

export async function deleteChatRoomById ({
  chatRoomId
}: {
  chatRoomId: ChatRoomModel['$id']
}) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.chatRoomCollectionId,
      chatRoomId
    )

    return appwriteResponse({
      data: null,
      message: 'Chat room deleted successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
    })
  } catch (e) {
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

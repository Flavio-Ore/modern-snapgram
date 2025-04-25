import { appwriteConfig, databases } from '@/services/appwrite/config'
import { appwriteResponse } from '@/services/appwrite/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/appwrite/utils/constants/APPWRITE_RESPONSE_CODES'
import {
  type ChatMemberModel,
  type ChatRoomModel,
  type UserModel
} from '@/types'
import { AppwriteException, ID, Query } from 'appwrite'

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

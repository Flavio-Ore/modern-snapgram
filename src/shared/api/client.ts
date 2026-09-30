import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'appwrite'
import { appwriteConfig } from '../config/env'
import type { IApiClient } from './contract'
import { mockClient } from './mock/mockClient'
import type {
  AppwriteResponse,
  ChatMemberModel,
  ChatRoomModel,
  DeletePostParams,
  INewUser,
  MessageModel,
  NewPostData,
  Post,
  PostModel,
  Save,
  SaveModel,
  UpdatedPostData,
  UserModel,
  UserUpdateData
} from '../types'

export { appwriteConfig }

export const client = new Client()
if (appwriteConfig.projectId) {
  client.setProject(appwriteConfig.projectId)
}
if (appwriteConfig.endpoint) {
  client.setEndpoint(appwriteConfig.endpoint)
}

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)

const createResponse = <T>(
  data: T,
  message = 'Success',
  code = 200,
  status = 'OK'
): AppwriteResponse<T> => ({
  data,
  message,
  status,
  code
})

const hydratePostFiles = async (post: PostModel | Post): Promise<Post> => {
  const existingFiles = (post as Post).files
  if (Array.isArray(existingFiles) && existingFiles.length > 0) {
    return post as Post
  }
  const filesId = (post as PostModel).filesId ?? []
  if (filesId.length === 0) {
    return { ...(post as Post), files: [] }
  }
  try {
    const files = await Promise.all(
      filesId.map(async fileId => {
        try {
          const file = await storage.getFile(appwriteConfig.postsStorageId, fileId)
          const url = storage.getFileView(appwriteConfig.postsStorageId, fileId).toString()
          return { ...file, url }
        } catch {
          return {
            $id: fileId,
            bucketId: appwriteConfig.postsStorageId,
            $createdAt: new Date().toISOString(),
            $updatedAt: new Date().toISOString(),
            $permissions: [],
            name: 'media',
            signature: '',
            mimeType: 'image/jpeg',
            sizeOriginal: 0,
            chunksTotal: 0,
            chunksUploaded: 0,
            url: '/assets/icons/file-upload.svg'
          }
        }
      })
    )
    return { ...(post as Post), files }
  } catch {
    return { ...(post as Post), files: [] }
  }
}

const liveClient: IApiClient = {
  auth: {
    signIn: async ({ email, password }) => {
      try {
        const session = await account.createEmailPasswordSession(email, password)
        return createResponse(session)
      } catch {
        return null
      }
    },
    signUp: async (userData: INewUser) => {
      try {
        const newAccount = await account.create(
          ID.unique(),
          userData.email,
          userData.password,
          userData.name
        )
        const avatarUrl = avatars.getInitials(userData.name)
        await account.createEmailPasswordSession(userData.email, userData.password)
        const newUser = await databases.createDocument<UserModel>(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          ID.unique(),
          {
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: userData.username,
            imageUrl: avatarUrl
          }
        )
        return createResponse(newUser, 'Account created successfully', 201, 'CREATED')
      } catch {
        return null
      }
    },
    signOut: async () => {
      try {
        await account.deleteSession('current')
        window.localStorage.removeItem('cookieFallback')
      } catch (err) {
        console.error(err)
      }
    },
    getCurrentUser: async () => {
      try {
        const sessionAccount = await account.get()
        const user = await databases.listDocuments<UserModel>(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          [Query.equal('accountId', [sessionAccount.$id])]
        )
        return createResponse(user.documents[0] ?? null)
      } catch {
        return null
      }
    },
    getAccount: async () => {
      try {
        const acc = await account.get()
        return createResponse(acc)
      } catch {
        return null
      }
    },
    checkAuth: async () => {
      try {
        const session = window.localStorage.getItem('cookieFallback') ?? ''
        if (!session || session === '[]') return false
        await account.get()
        return true
      } catch {
        return false
      }
    }
  },

  users: {
    getById: async (userId: string) => {
      try {
        const user = await databases.getDocument<UserModel>(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          userId
        )
        return createResponse(user)
      } catch {
        return null
      }
    },
    getTopUsers: async (limit = 10) => {
      try {
        const users = await databases.listDocuments<UserModel>(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          [Query.limit(limit)]
        )
        return createResponse(users.documents)
      } catch {
        return null
      }
    },
    getInfiniteUsers: async ({ lastId = '' }) => {
      try {
        const queries = [Query.limit(4)]
        if (lastId.trim().length > 0) {
          queries.push(Query.cursorAfter(lastId))
        }
        const users = await databases.listDocuments<UserModel>(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          queries
        )
        return createResponse(users.documents)
      } catch {
        return null
      }
    },
    updateUser: async (data: UserUpdateData) => {
      try {
        const updated = await databases.updateDocument<UserModel>(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          data.userId,
          {
            name: data.name,
            bio: data.bio,
            imageUrl: data.imageUrl,
            imageId: data.imageId
          }
        )
        return createResponse(updated)
      } catch {
        return null
      }
    },
    searchUsers: async (query: string) => {
      try {
        const users = await databases.listDocuments<UserModel>(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          [
            Query.or([
              Query.search('name', query),
              Query.search('username', query)
            ])
          ]
        )
        return createResponse(users.documents)
      } catch {
        return null
      }
    }
  },

  posts: {
    getInfinitePosts: async ({ lastId = '', query = [] }) => {
      try {
        const queries = [...query, Query.limit(4)]
        if (lastId.trim().length > 0) {
          queries.push(Query.cursorAfter(lastId))
        }
        const postDocs = await databases.listDocuments<PostModel>(
          appwriteConfig.databaseId,
          appwriteConfig.postsCollectionId,
          queries
        )
        const data = await Promise.all(postDocs.documents.map(hydratePostFiles))
        return createResponse(data)
      } catch {
        return null
      }
    },
    getRecentPosts: async (lastId = '') => {
      try {
        const queries = [Query.orderDesc('$createdAt'), Query.limit(4)]
        if (lastId.trim().length > 0) {
          queries.push(Query.cursorAfter(lastId))
        }
        const postDocs = await databases.listDocuments<PostModel>(
          appwriteConfig.databaseId,
          appwriteConfig.postsCollectionId,
          queries
        )
        const data = await Promise.all(postDocs.documents.map(hydratePostFiles))
        return createResponse(data)
      } catch {
        return null
      }
    },
    getPostById: async (id: string) => {
      try {
        const post = await databases.getDocument<PostModel>(
          appwriteConfig.databaseId,
          appwriteConfig.postsCollectionId,
          id
        )
        const hydrated = await hydratePostFiles(post)
        return createResponse(hydrated)
      } catch {
        return null
      }
    },
    getUserPosts: async (userId: string) => {
      try {
        const postDocs = await databases.listDocuments<PostModel>(
          appwriteConfig.databaseId,
          appwriteConfig.postsCollectionId,
          [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
        )
        const data = await Promise.all(postDocs.documents.map(hydratePostFiles))
        return createResponse(data)
      } catch {
        return null
      }
    },
    getSearchedPosts: async (searchTerm: string) => {
      try {
        const postDocs = await databases.listDocuments<PostModel>(
          appwriteConfig.databaseId,
          appwriteConfig.postsCollectionId,
          [Query.search('caption', searchTerm)]
        )
        const data = await Promise.all(postDocs.documents.map(hydratePostFiles))
        return createResponse(data)
      } catch {
        return null
      }
    },
    createPost: async (post: NewPostData) => {
      try {
        const newPost = await databases.createDocument<PostModel>(
          appwriteConfig.databaseId,
          appwriteConfig.postsCollectionId,
          ID.unique(),
          {
            creator: post.userId,
            caption: post.caption,
            location: post.location,
            tags: post.tags ? post.tags.split(',').map(t => t.trim()) : []
          }
        )
        const hydrated = await hydratePostFiles(newPost)
        return createResponse(hydrated, 'Post created successfully', 201, 'CREATED')
      } catch {
        return null
      }
    },
    updatePost: async (post: UpdatedPostData) => {
      try {
        const updated = await databases.updateDocument<PostModel>(
          appwriteConfig.databaseId,
          appwriteConfig.postsCollectionId,
          post.postId,
          {
            caption: post.caption,
            location: post.location,
            tags: post.tags ? post.tags.split(',').map(t => t.trim()) : []
          }
        )
        const hydrated = await hydratePostFiles(updated)
        return createResponse(hydrated)
      } catch {
        return null
      }
    },
    deletePost: async ({ postId }: DeletePostParams) => {
      try {
        await databases.deleteDocument(
          appwriteConfig.databaseId,
          appwriteConfig.postsCollectionId,
          postId
        )
        return createResponse(null, 'Post deleted successfully', 204, 'NO_CONTENT')
      } catch {
        return null
      }
    },
    likePost: async (postId: string, likesArray: string[]) => {
      try {
        return await databases.updateDocument<PostModel>(
          appwriteConfig.databaseId,
          appwriteConfig.postsCollectionId,
          postId,
          {
            likes: likesArray
          }
        )
      } catch {
        return null
      }
    }
  },

  saves: {
    savePost: async (userId: string, postId: string) => {
      try {
        const saveRecord = await databases.createDocument<SaveModel>(
          appwriteConfig.databaseId,
          appwriteConfig.savesCollectionId,
          ID.unique(),
          {
            user: userId,
            post: postId
          }
        )
        return createResponse(saveRecord, 'Post saved successfully', 201, 'CREATED')
      } catch {
        return null
      }
    },
    deleteSave: async (saveRecordId: string) => {
      try {
        await databases.deleteDocument(
          appwriteConfig.databaseId,
          appwriteConfig.savesCollectionId,
          saveRecordId
        )
        return createResponse(null, 'Saved post removed successfully', 204, 'NO_CONTENT')
      } catch {
        return null
      }
    },
    getInfiniteSaves: async ({ userId, lastId = '' }) => {
      try {
        const query = [
          Query.equal('user', userId),
          Query.orderDesc('$createdAt'),
          Query.limit(4)
        ]
        if (lastId.trim().length > 0) {
          query.push(Query.cursorAfter(lastId))
        }
        const saves = await databases.listDocuments<Save>(
          appwriteConfig.databaseId,
          appwriteConfig.savesCollectionId,
          query
        )
        const hydratedSaves = await Promise.all(
          saves.documents.map(async save => {
            if (save.post) {
              const hydratedPost = await hydratePostFiles(save.post)
              return { ...save, post: hydratedPost }
            }
            return save
          })
        )
        return createResponse(hydratedSaves)
      } catch {
        return null
      }
    },
    findSaveRecord: async (userId: string, postId: string) => {
      try {
        const saves = await databases.listDocuments<SaveModel>(
          appwriteConfig.databaseId,
          appwriteConfig.savesCollectionId,
          [Query.equal('user', userId), Query.equal('post', postId)]
        )
        return createResponse(saves.documents[0] ?? null)
      } catch {
        return null
      }
    }
  },

  chats: {
    getChatRooms: async (userId: string) => {
      try {
        const chatRooms = await databases.listDocuments<ChatRoomModel>(
          appwriteConfig.databaseId,
          appwriteConfig.chatRoomCollectionId,
          [Query.equal('members', [userId])]
        )
        return createResponse(chatRooms.documents)
      } catch {
        return null
      }
    },
    getMessages: async (chatRoomId: string, lastId = '') => {
      try {
        const queries = [
          Query.equal('related_chat', chatRoomId),
          Query.orderDesc('$createdAt'),
          Query.limit(20)
        ]
        if (lastId.trim().length > 0) {
          queries.push(Query.cursorAfter(lastId))
        }
        const messages = await databases.listDocuments<MessageModel>(
          appwriteConfig.databaseId,
          appwriteConfig.messageCollectionId,
          queries
        )
        return createResponse(messages.documents)
      } catch {
        return null
      }
    },
    sendMessage: async (
      body: string,
      authorChatId: string,
      receiversChatIds: string[],
      chatRoomId: string
    ) => {
      try {
        const message = await databases.createDocument<MessageModel>(
          appwriteConfig.databaseId,
          appwriteConfig.messageCollectionId,
          ID.unique(),
          {
            body,
            author_chat: authorChatId,
            author_chat_id: authorChatId,
            receivers_chat: receiversChatIds,
            receivers_chat_id: receiversChatIds,
            related_chat: chatRoomId
          }
        )
        return createResponse(message, 'Message sent successfully', 201, 'CREATED')
      } catch {
        return null
      }
    },
    setMemberOnline: async (chatIds: string[], online: boolean) => {
      try {
        const updated = await Promise.all(
          chatIds.map(chatId =>
            databases.updateDocument<ChatMemberModel>(
              appwriteConfig.databaseId,
              appwriteConfig.chatMemberCollectionId,
              chatId,
              { online }
            )
          )
        )
        return createResponse(updated)
      } catch {
        return null
      }
    },
    getMemberChats: async (userId: string) => {
      try {
        const query = [Query.equal('member', [userId])]
        const chatMemberships = await databases.listDocuments<ChatMemberModel>(
          appwriteConfig.databaseId,
          appwriteConfig.chatMemberCollectionId,
          query
        )
        return createResponse(chatMemberships.documents)
      } catch {
        return null
      }
    }
  }
}

const useMock = import.meta.env.VITE_USE_MOCK_DATA === 'true' || !appwriteConfig.projectId

export const apiClient: IApiClient = useMock ? mockClient : liveClient

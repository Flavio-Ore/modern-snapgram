import type { Models } from 'appwrite'
import type { IApiClient } from '../contract'
import type {
  AppwriteResponse,
  ChatMemberModel,
  ChatRoomModel,
  DeletePostParams,
  FileModelWithUrl,
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
} from '../../types'
import {
  mockChatMember1,
  mockChatMember2,
  mockChatRooms,
  mockCurrentUser,
  mockMessages,
  mockPostModels,
  mockPosts,
  mockSaveModels,
  mockSaves,
  mockUsers
} from './fixtures'

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

const mockSession: Models.Session = {
  $id: 'mock-session-id',
  $createdAt: '2026-01-15T12:00:00.000Z',
  $updatedAt: '2026-01-15T12:00:00.000Z',
  userId: 'mock-user-1',
  expire: '2026-12-31T23:59:59.000Z',
  provider: 'email',
  providerUid: 'alex.rivera@example.com',
  providerAccessToken: 'mock-token',
  providerAccessTokenExpiry: '2026-12-31T23:59:59.000Z',
  providerRefreshToken: 'mock-refresh-token',
  ip: '127.0.0.1',
  osCode: 'win',
  osName: 'Windows',
  osVersion: '11',
  clientType: 'browser',
  clientCode: 'chrome',
  clientName: 'Chrome',
  clientVersion: '120.0',
  clientEngine: 'Blink',
  clientEngineVersion: '120.0',
  deviceName: 'PC',
  deviceBrand: 'Generic',
  deviceModel: 'Desktop',
  countryCode: 'US',
  countryName: 'United States',
  current: true,
  factors: [],
  secret: 'mock-secret',
  mfaUpdatedAt: '2026-01-15T12:00:00.000Z'
}

const mockAccountUser: Models.User<Models.Preferences> = {
  $id: 'mock-account-1',
  $createdAt: '2026-01-15T12:00:00.000Z',
  $updatedAt: '2026-01-15T12:00:00.000Z',
  name: 'Alex Rivera',
  password: '',
  hash: '',
  hashOptions: {},
  registration: '2026-01-15T12:00:00.000Z',
  status: true,
  labels: [],
  passwordUpdate: '',
  email: 'alex.rivera@example.com',
  phone: '',
  emailVerification: true,
  phoneVerification: false,
  mfa: false,
  prefs: {},
  targets: [],
  accessedAt: '2026-01-15T12:00:00.000Z'
}

let postsStore: Post[] = [...mockPosts]
let postModelsStore: PostModel[] = [...mockPostModels]
let savesStore: Save[] = [...mockSaves]
let saveModelsStore: SaveModel[] = [...mockSaveModels]
let usersStore: UserModel[] = [...mockUsers]
let messagesStore: MessageModel[] = [...mockMessages]
let chatRoomsStore: ChatRoomModel[] = [...mockChatRooms]

export const mockClient: IApiClient = {
  auth: {
    signIn: async (_credentials: { email: string; password: string }) => {
      return createResponse<Models.Session>(mockSession, 'Account signed in successfully')
    },
    signUp: async (userData: INewUser) => {
      const newUser: UserModel = {
        $id: `mock-user-${Date.now()}`,
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: ['read("any")', 'write("user:self")'],
        $databaseId: 'mock-database',
        $collectionId: 'mock-collection',
        name: userData.name,
        username: userData.username,
        accountId: `mock-account-${Date.now()}`,
        email: userData.email,
        imageUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`,
        tags: [],
        posts: [],
        liked: [],
        saves: [],
        followings: [],
        followers: [],
        chats: []
      }
      usersStore.push(newUser)
      return createResponse<UserModel>(newUser, 'Account created successfully', 201, 'CREATED')
    },
    signOut: async () => {
      // Mock session termination
    },
    getCurrentUser: async () => {
      return createResponse<UserModel>(usersStore[0] ?? mockCurrentUser)
    },
    getAccount: async () => {
      return createResponse<Models.User<Models.Preferences>>(mockAccountUser)
    },
    checkAuth: async () => {
      return true
    }
  },

  users: {
    getById: async (userId: string) => {
      const user = usersStore.find(u => u.$id === userId) ?? null
      return createResponse<UserModel | null>(user)
    },
    getTopUsers: async (limit = 10) => {
      return createResponse<UserModel[]>(usersStore.slice(0, limit))
    },
    getInfiniteUsers: async ({ lastId = '', pageParam = '' }) => {
      const cursor = lastId || pageParam
      let results = usersStore
      if (cursor) {
        const index = usersStore.findIndex(u => u.$id === cursor)
        if (index >= 0) {
          results = usersStore.slice(index + 1)
        }
      }
      return createResponse<UserModel[]>(results.slice(0, 4))
    },
    updateUser: async (data: UserUpdateData) => {
      const index = usersStore.findIndex(u => u.$id === data.userId)
      if (index === -1) {
        return createResponse<UserModel | null>(null, 'User not found', 404, 'NOT_FOUND')
      }
      const updatedUser: UserModel = {
        ...usersStore[index],
        name: data.name,
        bio: data.bio,
        imageUrl: typeof data.imageUrl === 'string' ? data.imageUrl : data.imageUrl.toString(),
        imageId: data.imageId
      }
      usersStore[index] = updatedUser
      return createResponse<UserModel>(updatedUser, 'User updated successfully')
    },
    searchUsers: async (query: string) => {
      const lower = query.toLowerCase()
      const filtered = usersStore.filter(
        u => u.name.toLowerCase().includes(lower) || u.username.toLowerCase().includes(lower)
      )
      return createResponse<UserModel[]>(filtered)
    }
  },

  posts: {
    getInfinitePosts: async ({ lastId = '' }) => {
      let results = postsStore
      if (lastId) {
        const index = postsStore.findIndex(p => p.$id === lastId)
        if (index >= 0) {
          results = postsStore.slice(index + 1)
        }
      }
      return createResponse<Post[]>(results.slice(0, 3))
    },
    getRecentPosts: async (lastId = '') => {
      let results = postsStore
      if (lastId) {
        const index = postsStore.findIndex(p => p.$id === lastId)
        if (index >= 0) {
          results = postsStore.slice(index + 1)
        }
      }
      return createResponse<Post[]>(results.slice(0, 3))
    },
    getPostById: async (id: string) => {
      const post = postsStore.find(p => p.$id === id) ?? null
      return createResponse<Post | null>(post)
    },
    createPost: async (postData: NewPostData) => {
      const now = new Date().toISOString()
      const newFiles: FileModelWithUrl[] = postData.newFiles.map((file, i) => ({
        $id: `mock-file-${Date.now()}-${i}`,
        $createdAt: now,
        $updatedAt: now,
        $permissions: ['read("any")'],
        bucketId: 'mock-bucket',
        name: file.name,
        signature: 'mock-sig',
        mimeType: file.type || 'image/jpeg',
        sizeOriginal: file.size,
        chunksTotal: 1,
        chunksUploaded: 1,
        url: URL.createObjectURL(file)
      }))

      const createdPost: Post = {
        $id: `mock-post-${Date.now()}`,
        $createdAt: now,
        $updatedAt: now,
        $permissions: ['read("any")', 'write("user:mock-user-1")'],
        $databaseId: 'mock-database',
        $collectionId: 'mock-collection',
        caption: postData.caption,
        tags: postData.tags ? postData.tags.split(',').map(t => t.trim()) : [],
        location: postData.location ?? '',
        creator: usersStore[0] ?? mockCurrentUser,
        likes: [],
        saved: [],
        files: newFiles
      }

      postsStore.unshift(createdPost)
      const model: PostModel = {
        ...createdPost,
        filesId: newFiles.map(f => f.$id)
      }
      postModelsStore.unshift(model)

      return createResponse<Post>(createdPost, 'Post created successfully', 201, 'CREATED')
    },
    updatePost: async (postData: UpdatedPostData) => {
      const index = postsStore.findIndex(p => p.$id === postData.postId)
      if (index === -1) {
        return createResponse<Post | null>(null, 'Post not found', 404, 'NOT_FOUND')
      }
      const existing = postsStore[index]
      const updatedPost: Post = {
        ...existing,
        caption: postData.caption,
        location: postData.location ?? existing.location,
        tags: postData.tags ? postData.tags.split(',').map(t => t.trim()) : existing.tags
      }
      postsStore[index] = updatedPost
      return createResponse<Post>(updatedPost, 'Post updated successfully')
    },
    deletePost: async ({ postId }: DeletePostParams) => {
      postsStore = postsStore.filter(p => p.$id !== postId)
      postModelsStore = postModelsStore.filter(p => p.$id !== postId)
      return createResponse<null>(null, 'Post deleted successfully', 204, 'NO_CONTENT')
    },
    likePost: async (postId: string, likesArray: string[]) => {
      const postIndex = postsStore.findIndex(p => p.$id === postId)
      if (postIndex === -1) {
        return null
      }
      const likedUsers = usersStore.filter(u => likesArray.includes(u.$id))
      postsStore[postIndex] = {
        ...postsStore[postIndex],
        likes: likedUsers
      }
      const modelIndex = postModelsStore.findIndex(p => p.$id === postId)
      if (modelIndex >= 0) {
        postModelsStore[modelIndex] = {
          ...postModelsStore[modelIndex],
          likes: likedUsers
        }
        return postModelsStore[modelIndex]
      }
      return null
    }
  },

  saves: {
    savePost: async (userId: string, postId: string) => {
      const user = usersStore.find(u => u.$id === userId) ?? mockCurrentUser
      const postModel = postModelsStore.find(p => p.$id === postId) ?? postModelsStore[0]
      const post = postsStore.find(p => p.$id === postId) ?? postsStore[0]
      const now = new Date().toISOString()
      const newSaveModel: SaveModel = {
        $id: `mock-save-${Date.now()}`,
        $createdAt: now,
        $updatedAt: now,
        $permissions: ['read("any")'],
        $databaseId: 'mock-database',
        $collectionId: 'mock-collection',
        user,
        post: postModel
      }
      const newSave: Save = {
        ...newSaveModel,
        post
      }
      saveModelsStore.push(newSaveModel)
      savesStore.push(newSave)
      return createResponse<SaveModel>(newSaveModel, 'Post saved successfully', 201, 'CREATED')
    },
    deleteSave: async (saveRecordId: string) => {
      saveModelsStore = saveModelsStore.filter(s => s.$id !== saveRecordId)
      savesStore = savesStore.filter(s => s.$id !== saveRecordId)
      return createResponse<null>(null, 'Saved post removed successfully', 204, 'NO_CONTENT')
    },
    getInfiniteSaves: async ({ userId, lastId = '' }) => {
      let userSaves = savesStore.filter(s => s.user.$id === userId)
      if (lastId) {
        const index = userSaves.findIndex(s => s.$id === lastId)
        if (index >= 0) {
          userSaves = userSaves.slice(index + 1)
        }
      }
      return createResponse<Save[]>(userSaves.slice(0, 3))
    },
    findSaveRecord: async (userId: string, postId: string) => {
      const save = saveModelsStore.find(s => s.user.$id === userId && s.post.$id === postId) ?? null
      return createResponse<SaveModel | null>(save)
    }
  },

  chats: {
    getChatRooms: async (_userId: string) => {
      return createResponse<ChatRoomModel[]>(chatRoomsStore)
    },
    getMessages: async (chatRoomId: string, lastId = '') => {
      let roomMessages = messagesStore.filter(
        m => m.related_chat.$id === chatRoomId || m.related_chat.$id === mockChatRooms[0].$id
      )
      if (lastId) {
        const index = roomMessages.findIndex(m => m.$id === lastId)
        if (index >= 0) {
          roomMessages = roomMessages.slice(index + 1)
        }
      }
      return createResponse<MessageModel[]>(roomMessages)
    },
    sendMessage: async (
      body: string,
      authorChatId: string,
      receiversChatIds: string[],
      chatRoomId: string
    ) => {
      const now = new Date().toISOString()
      const authorChat = authorChatId === mockChatMember1.$id ? mockChatMember1 : mockChatMember2
      const receiversChat = receiversChatIds.map(id => (id === mockChatMember2.$id ? mockChatMember2 : mockChatMember1))
      const chatRoom = chatRoomsStore.find(r => r.$id === chatRoomId) ?? mockChatRooms[0]

      const newMessage: MessageModel = {
        $id: `mock-msg-${Date.now()}`,
        $createdAt: now,
        $updatedAt: now,
        $permissions: ['read("any")'],
        $databaseId: 'mock-database',
        $collectionId: 'mock-collection',
        body,
        is_edited: false,
        author_chat: authorChat,
        receivers_chat: receiversChat,
        related_chat: chatRoom,
        author_chat_id: authorChat.$id,
        receivers_chat_id: receiversChat.map(r => r.$id)
      }
      messagesStore.push(newMessage)
      return createResponse<MessageModel>(newMessage, 'Message sent successfully', 201, 'CREATED')
    },
    setMemberOnline: async (chatIds: string[], online: boolean) => {
      const updatedMembers: ChatMemberModel[] = []
      if (chatIds.includes(mockChatMember1.$id)) {
        mockChatMember1.online = online
        updatedMembers.push(mockChatMember1)
      }
      if (chatIds.includes(mockChatMember2.$id)) {
        mockChatMember2.online = online
        updatedMembers.push(mockChatMember2)
      }
      return createResponse<ChatMemberModel[]>(updatedMembers)
    }
  }
}

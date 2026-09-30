import type { Models } from 'appwrite'
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

export interface IApiClient {
  auth: {
    signIn: (credentials: { email: string; password: string }) => Promise<AppwriteResponse<Models.Session | null> | null>
    signUp: (userData: INewUser) => Promise<AppwriteResponse<UserModel | null> | null>
    signOut: () => Promise<void>
    getCurrentUser: () => Promise<AppwriteResponse<UserModel | null> | null>
    getAccount: () => Promise<AppwriteResponse<Models.User<Models.Preferences> | null> | null>
    checkAuth: () => Promise<boolean>
  }
  users: {
    getById: (userId: string) => Promise<AppwriteResponse<UserModel | null> | null>
    getTopUsers: (limit?: number) => Promise<AppwriteResponse<UserModel[]> | null>
    getInfiniteUsers: (params: { pageParam?: string; lastId?: string; query?: string[] }) => Promise<AppwriteResponse<UserModel[]> | null>
    updateUser: (data: UserUpdateData) => Promise<AppwriteResponse<UserModel | null> | null>
    searchUsers: (query: string) => Promise<AppwriteResponse<UserModel[]> | null>
  }
  posts: {
    getInfinitePosts: (params: { lastId?: string; query?: string[] }) => Promise<AppwriteResponse<Post[]> | null>
    getRecentPosts: (lastId?: string) => Promise<AppwriteResponse<Post[]> | null>
    getPostById: (id: string) => Promise<AppwriteResponse<Post | null> | null>
    createPost: (post: NewPostData) => Promise<AppwriteResponse<Post | null> | null>
    updatePost: (post: UpdatedPostData) => Promise<AppwriteResponse<Post | null> | null>
    deletePost: (params: DeletePostParams) => Promise<AppwriteResponse<null> | null>
    likePost: (postId: string, likesArray: string[]) => Promise<PostModel | null>
  }
  saves: {
    savePost: (userId: string, postId: string) => Promise<AppwriteResponse<SaveModel | null> | null>
    deleteSave: (saveRecordId: string) => Promise<AppwriteResponse<null> | null>
    getInfiniteSaves: (params: { userId: string; lastId?: string }) => Promise<AppwriteResponse<Save[]> | null>
    findSaveRecord: (userId: string, postId: string) => Promise<AppwriteResponse<SaveModel | null> | null>
  }
  chats: {
    getChatRooms: (userId: string) => Promise<AppwriteResponse<ChatRoomModel[]> | null>
    getMessages: (chatRoomId: string, lastId?: string) => Promise<AppwriteResponse<MessageModel[]> | null>
    sendMessage: (body: string, authorChatId: string, receiversChatIds: string[], chatRoomId: string) => Promise<AppwriteResponse<MessageModel | null> | null>
    setMemberOnline: (chatIds: string[], online: boolean) => Promise<AppwriteResponse<ChatMemberModel[]> | null>
  }
}

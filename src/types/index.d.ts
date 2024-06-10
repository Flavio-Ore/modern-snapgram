import { type Models } from 'appwrite'
import { type ReactNode } from 'react'

interface UserModel extends Models.Document {
  name: string
  username: string
  accountId: string
  email: string
  tags: string[]
  bio?: string
  imageId?: string
  imageUrl: string
  posts: Post[]
  liked: Post[]
  saves: SaveModel[]
}

interface FileModelWithUrl extends Models.File {
  url: string
}

interface Post extends Models.Document {
  caption: string
  tags: string[]
  files: FileModelWithUrl[]
  location: string
  likes: UserModel[]
  saved: SaveModel[]
  creator: UserModel
}

interface PostModel extends Models.Document {
  caption: string
  tags: string[]
  filesId: Array<Models.Document['$id']>
  location: string
  likes: UserModel[]
  saved: SaveModel[]
  creator: UserModel
}

interface SaveModel extends Models.Document {
  post: PostModel
  user: UserModel
}

interface Save extends Models.Document {
  post: Post
  user: UserModel
}

interface Message extends Models.Document {
  body: string
  sender: UserModel['accountId']
  receivers: Array<UserModel['accountId']>
}

interface MessageAttributes {
  body: string
  sender: UserModel['accountId']
  receivers: Array<UserModel['accountId']>
}

interface UserSession extends Models.User<Models.Preferences> {}


export type EmptyObject = Record<keyof object, never>
export type ObjectWithKeys = Record<keyof object, unknown>
export interface AccountContextType {
  isLoading: boolean
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  checkAuth: () => Promise<boolean>
}

export interface UserUpdateData {
  userId: UserModel['$id']
  name: UserModel['name']
  bio: UserModel['bio']
  imageId: UserModel['imageId']
  imageUrl: URL | UserModel['imageUrl']
  file: File[]
}

export interface NewPostData {
  userId: UserModel['$id']
  caption: UserModel['caption']
  newFiles: File[]
  location?: UserModel['location']
  tags?: UserModel['tags'][number]
}

export interface DeletePostParams {
  postId: Post['$id']
  filesId: Array<FileModelWithUrl['$id']>
}

export interface UpdatedPostData {
  postId: string
  caption: string
  originalFiles: FileModelWithUrl[]
  newFiles: File[]
  filesToRemoveById: Array<FileModelWithUrl['$id']>
  location?: string
  tags?: string
}

export interface IUser {
  id: string
  name: string
  username: string
  email: string
  imageUrl: string
  imageId: string
  bio: string
  posts: Post[]
  liked: Post[]
  saved: SaveModel[]
}

export interface INewUser {
  name: string
  email: string
  username: string
  password: string
}

export interface TabsTriggers {
  trigger: string
  Icon: ReactNode
  Content: ReactNode
}

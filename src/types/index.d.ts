import { type Models } from 'appwrite'
import { type ReactNode } from 'react'

export type EmptyObject = Record<keyof object, never>
export type ObjectWithKeys = Record<keyof object, unknown>
export interface AccountContextType {
  isLoading: boolean
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  checkAuth: () => Promise<boolean>
}


export interface IUpdateUser {
  userId: string
  name: string
  bio: string
  imageId: string
  imageUrl: URL | string
  file: File[]
}

export interface INewPost {
  userId: string
  caption: string
  file: File[]
  location?: string
  tags?: string
}

export interface IUpdatePost {
  postId: string
  caption: string
  imageId: string
  imageUrl: URL
  file: File[]
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
  saved: Save[]
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

interface User extends Models.Document {
  name: string
  username: string
  accountId: string
  email: string
  bio?: string
  imageId?: string
  imageUrl: string
  posts: Post[]
  liked: Post[]
  saves: Save[]
}

interface Post extends Models.Document {
  caption: string
  tags: string[]
  imageUrl: string
  imageId: Models.document['$id']
  location: string
  likes: User[]
  saved: Save[]
  creator: User
}

interface PostTest extends Models.Document {
  caption: string
  tags: string[]
  filesId: Array<Models.Document['$id']>
  location: string
  likes: User[]
  saved: Save[]
  creator: User
}

interface Save extends Models.Document {
  post: Post
  user: Use
}

interface Message extends Models.Document {
  body: string
  sender: User['accountId']
  receivers: Array<User['accountId']>
}

interface MessageAttributes {
  body: string
  sender: User['accountId']
  receivers: Array<User['accountId']>
}

interface UserSession extends Models.User<Models.Preferences> {}

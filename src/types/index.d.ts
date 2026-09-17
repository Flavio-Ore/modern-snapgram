import { type Models } from 'appwrite'
import { type ReactNode } from 'react'

export type EmptyObject = Record<keyof object, never>
export type ObjectWithKeys = Record<keyof object, unknown>
export interface IContextType {
  user: IUser
  isLoading: boolean
  setUser: React.Dispatch<React.SetStateAction<IUser>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  checkAuthUser: () => Promise<boolean>
}

export interface INavLink {
  imgURL: string
  route: string
  label: string
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
  bio: string
  posts: Post[]
  liked: Post[]
  save: Post[]
}

export interface INewUser {
  name: string
  email: string
  username: string
  password: string
}

export interface TabsTriggers {
  trigger: string
  icon: string
  Element: ReactNode
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
  save: Post[]
}
type UserSession = Models.User<Models.Preferences> & User
interface Post extends Models.Document {
  caption: string
  tags: string[]
  imageUrl: string
  imageId: string
  location: string
  likes: User[]
  save: User[]
  creator: User
}

interface Save extends Models.Document {
  post: Post[]
  user: User[]
}

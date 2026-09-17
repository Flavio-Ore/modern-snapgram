import { type Models } from 'appwrite'

export type EmptyObject = Record<string, never>

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
  Element: () => JSX.Element
}

export type User = Partial<{
  name: string
  username: string
  accountId: string
  email: string
  bio?: string
  imageId?: string
  imageUrl: string
  $id: string
  $createdAt: string
  $updatedAt: string
  $permissions: string[]
  posts: Post[]
  liked: Post[]
  save: Post[]
}> &
Partial<Models.Document>

export type Post = Partial<{
  caption: string
  tags: string[]
  imageUrl: string
  imageId: string
  location: string
  $id: string
  $createdAt: string
  $updatedAt: string
  $permissions: string[]
  likes: User[]
  save: User[]
}> &
Models.Document

export type IContextType = {
  user: IUser
  isLoading: boolean
  setUser: React.Dispatch<React.SetStateAction<IUser>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  checkAuthUser: () => Promise<boolean>
}

export type INavLink = {
  imgURL: string
  route: string
  label: string
}

export type IUpdateUser = {
  userId: string
  name: string
  bio: string
  imageId: string
  imageUrl: URL | string
  file: File[]
}

export type INewPost = {
  userId: string
  caption: string
  file: File[]
  location?: string
  tags?: string
}

export type IUpdatePost = {
  postId: string
  caption: string
  imageId: string
  imageUrl: URL
  file: File[]
  location?: string
  tags?: string
}

export type IUser = {
  id: string
  name: string
  username: string
  email: string
  imageUrl: string
  bio: string
}

export type INewUser = {
  name: string
  email: string
  username: string
  password: string
}

type User =
  | {
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
    }
  | undefined

export type Post =
  | {
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
    }
  | undefined

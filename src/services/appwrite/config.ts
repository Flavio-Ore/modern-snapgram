import { Account, Avatars, Client, Databases, Storage } from 'appwrite'

interface AppwriteConfig {
  readonly projectId: string
  readonly endpoint: string
  readonly databaseId: string
  readonly postsStorageId: string
  readonly profileStorageId: string
  readonly savesCollectionId: string
  readonly usersCollectionId: string
  readonly followersCollectionId: string
  readonly postsCollectionId: string
  readonly messageCollectionId: string
}
export const appwriteConfig: AppwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE,
  postsStorageId: import.meta.env.VITE_APPWRITE_STORAGE_POSTS_FILES,
  profileStorageId: import.meta.env.VITE_APPWRITE_STORAGE_PROFILE_IMAGES,
  savesCollectionId: import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_SAVES_ID,
  usersCollectionId: import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_USERS_ID,
  followersCollectionId: import.meta.env
    .VITE_APPWRITE_DATABASE_COLLECTION_FOLLOWERS_ID,
  postsCollectionId: import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_POSTS_ID,
  messageCollectionId: import.meta.env
    .VITE_APPWRITE_DATABASE_COLLECTION_MESSAGES_ID
}

export const client = new Client()
client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.endpoint)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)

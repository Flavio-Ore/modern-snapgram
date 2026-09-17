import { Account, Avatars, Client, Databases, Storage } from 'appwrite'

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE,
  savesCollectionId: import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_SAVES_ID,
  usersCollectionId: import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_USERS_ID,
  postsCollectionId: import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_POSTS_ID
}

export const client = new Client()

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.endpoint)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)

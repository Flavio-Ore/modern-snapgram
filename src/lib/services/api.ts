import {
  INewPost,
  INewUser,
  IUpdatePost,
  IUpdateUser,
  type User
} from '@/types'
import { ID, Query } from 'appwrite'
import { account, appwriteConfig, avatars, databases, storage } from './config'

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
export async function createUserAccount (user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(user.name)

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl
    })

    return newUser
  } catch (error) {
    console.error(error)
    return error
  }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB (user: {
  accountId: string
  email: string
  name: string
  imageUrl: URL
  username?: string
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    )
    if (!newUser) throw Error
    return newUser
  } catch (error) {
    console.error(error)
  }
}

// ============================== SIGN IN
export async function signInAccount (user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password)
    if (!session) throw Error
    return session
  } catch (error) {
    console.error(error)
  }
}

// ============================== GET ACCOUNT
export async function getAccount () {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) throw Error
    return currentAccount
  } catch (error) {
    console.error(error)
  }
}

// ============================== GET USER
export async function getCurrentUser () {
  try {
    const currentAccount = await getAccount()
    if (!currentAccount) throw Error
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )
    if (!currentUser) throw Error
    const userSession: User = currentUser.documents[0] as User
    return userSession
  } catch (error) {
    console.error(error)
    const userSession: User = {}
    return userSession
  }
}

// ============================== SIGN OUT
export async function signOutAccount () {
  try {
    const session = await account.deleteSession('current')
    return session
  } catch (error) {
    console.error(error)
  }
}
// ============================================================
// POSTS
// ============================================================

// ============================== CREATE POST
export async function createPost (post: INewPost) {
  try {
    const uploadedFile = await uploadFile(post.file[0])
    if (!uploadedFile) throw Error
    const fileUrl = await getFilePreview(uploadedFile.$id)
    if (!fileUrl) {
      deleteFile(uploadedFile.$id)
      throw Error
    }
    const tags = post.tags?.replace(/ /g, '').split(',') || []
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        location: post.location,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        tags
      }
    )
    if (!newPost) {
      await deleteFile(uploadedFile.$id)
      throw Error
    }
    return newPost
  } catch (error) {
    console.error(error)
  }
}

// ============================== UPLOAD FILE
export async function uploadFile (file: File) {
  try {
    const newFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    )
    if (!newFile) throw Error
    return newFile
  } catch (error) {
    console.error(error)
  }
}

// ============================== GET FILE URL
export async function getFilePreview (fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      180,
      180,
      'top',
      100
    )
    if (!fileUrl) throw Error
    return fileUrl
  } catch (error) {
    console.error(error)
  }
}

// ============================== DELETE FILE
export async function deleteFile (fileId: string) {
  try {
    const deletedFile = await storage.deleteFile(
      appwriteConfig.storageId,
      fileId
    )
    if (!deletedFile) throw Error
    return {
      status: 'success'
    }
  } catch (error) {
    console.error(error)
  }
}

// ============================== GET POSTS
// export async function getRecentPosts () {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.postsCollectionId,
//       [Query.orderDesc('$createdAt'), Query.limit(1)]
//     )
//     if (!posts) throw Error
//     return posts
//   } catch (error) {
//     console.error(error)
//   }
// }

// ============================== GET USER'S POST
export async function getUserPosts ({ userId }: { userId?: string }) {
  if (!userId) return

  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
    )
    if (!post) throw Error
    return post
  } catch (error) {
    console.error(error)
  }
}

// ============================== LIKE / UNLIKE POST
export type LikePost = { postId: string; usersLikes: string[] }
export async function likePost ({ postId, usersLikes }: LikePost) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: usersLikes
      }
    )
    if (!updatedPost) throw Error
    return updatedPost
  } catch (error) {
    console.error(error)
    return
  }
}

// ============================== SAVE POST
export async function savePost ({
  postId,
  userId
}: {
  postId: string
  userId: string
}) {
  try {
    const savedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    )
    if (!savedPost) throw Error
    return savedPost
  } catch (error) {
    console.error(error)
  }
}

// ============================== DELETE SAVED POST
export type DeleteSavedPost = {
  savedRecordId: string
}
export async function deleteSavedPost ({ savedRecordId }: DeleteSavedPost) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    )
    if (!statusCode) throw Error
    return {
      status: 'success'
    }
  } catch (error) {
    console.error(error)
  }
}

// ============================== GET POST BY ID
export async function getPostById (postId: string) {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    )
    if (!post) throw Error
    return post
  } catch (error) {
    console.error(error)
  }
}

// ============================== UPDATE POST
export async function updatePost (post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId
    }

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0])
      if (!uploadedFile) throw Error

      // Get new file url
      const fileUrl = await getFilePreview(uploadedFile.$id)
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id)
        throw Error
      }
      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id }
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, '').split(',') || []

    //  Update post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags
      }
    )

    // Failed to update
    if (!updatedPost) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) await deleteFile(image.imageId)
      // If no new file uploaded, just throw error
      throw Error
    }

    // Safely delete old file after successful update
    if (hasFileToUpdate) await deleteFile(post.imageId)

    return updatedPost
  } catch (error) {
    console.error(error)
  }
}

// ============================== DELETE POST
export async function deletePost ({
  postId,
  imageId
}: {
  postId?: string
  imageId?: string
}) {
  if (!postId || !imageId) return

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    )

    if (!statusCode) throw Error
    await deleteFile(imageId)
    return { status: 'success' }
  } catch (error) {
    console.error(error)
  }
}

export async function getInfinitePosts ({
  lastId = '',
  queries = []
}: {
  lastId: string
  queries: string[]
}) {
  const query = [...queries, Query.limit(2)]
  if (lastId) query.push(Query.cursorAfter(lastId.toString()))
  try {
    const postsDocumentList = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      query
    )
    if (!postsDocumentList) throw Error
    return postsDocumentList.documents || []
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getInfiniteSaves ({
  lastId = '',
  queries = []
}: {
  lastId: string
  queries: string[]
}) {
  const query = [...queries, Query.limit(2)]
  if (lastId) query.push(Query.cursorAfter(lastId.toString()))
  console.log('query :>> ', query)
  try {
    const saves = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      query
    )
    if (!saves) throw Error
    console.log('savedPosts: ', saves)
    return saves.documents || []
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getSavedPosts ({ userId }: { userId: string }) {
  try {
    const saves = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      [Query.equal('user', userId), Query.cursorAfter('65fe081ac1d03e2c241c')]
    )
    if (!saves) throw Error
    console.log('savedPosts: ', saves)
    return saves.documents || []
  } catch (error) {
    console.error(error)
    return []
  }
}

// ============================================================
// USERS
// ============================================================

// ============================== GET USERS
export async function getUsers ({ limit }: { limit?: number }) {
  const queries = [Query.orderDesc('$createdAt')]
  if (limit) queries.push(Query.limit(limit))
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      queries
    )
    if (!users) throw Error
    return users
  } catch (error) {
    console.error(error)
  }
}

// ============================== GET USER BY ID
export async function getUserById ({ userId }: { userId: string }) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId
    )
    if (!user) throw Error
    return user
  } catch (error) {
    console.error(error)
  }
}

// ============================== UPDATE USER
export async function updateUser ({ user }: { user: IUpdateUser }) {
  try {
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        file: user.file,
        imageUrl: user.imageUrl
      }
    )
    if (!updatedUser) throw Error
    return updatedUser
  } catch (error) {
    console.error(error)
  }
}

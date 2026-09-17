import { appwriteConfig, databases } from '@/lib/services/appwrite/config'
import { parseModel } from '@/lib/services/appwrite/util'
import { type Post } from '@/types'
import { Query } from 'appwrite'

export async function findUserPosts ({
  userId
}: {
  userId?: string
}) {
  if (userId == null || userId.trim().length === 0) return null
  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
    )
    parseModel({ model: post, errorMsg: 'No posts found' })
    return post.documents as Post[]
  } catch (error) {
    console.error(error)
    return null
  }
}



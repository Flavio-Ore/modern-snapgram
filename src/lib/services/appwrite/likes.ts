import { isObjectEmpty } from '@/lib/utils'
import { type Models } from 'appwrite'
import { type EmptyObject } from 'react-hook-form'
import { appwriteConfig, databases } from './config'

// ============================== LIKE / UNLIKE POST
interface LikePost {
  postId: string
  usersLikes: string[]
}

export async function updateLikesPost ({
  postId,
  usersLikes
}: LikePost): Promise<Models.Document | EmptyObject> {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: usersLikes
      }
    )
    if (isObjectEmpty(updatedPost)) throw Error('Post not updated')
    return updatedPost
  } catch (error) {
    console.error(error)
    return {}
  }
}

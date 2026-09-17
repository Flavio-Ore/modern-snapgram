import { appwriteConfig, databases } from '@/services/appwrite/config'
import { type Post } from '@/types'

// ============================== LIKE / UNLIKE POST
interface LikePost {
  postId: string
  usersLikes: string[]
}

export async function updateLikesPost ({
  postId,
  usersLikes
}: LikePost) {
  try {
    const updatedPost = await databases.updateDocument<Post>(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: usersLikes
      }
    )
    return updatedPost
  } catch (error) {
    console.error(error)
    return null
  }
}

import { appwriteConfig, databases } from '@/services/appwrite/config'
import { type PostModel } from '@/types'

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
    const updatedPost = await databases.updateDocument<PostModel>(
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

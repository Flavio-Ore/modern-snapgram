import { appwriteConfig, databases } from '@/services/appwrite/config'
import { parseModel } from '@/services/appwrite/util'

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
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: usersLikes
      }
    )
    parseModel({ model: updatedPost, errorMsg: 'Post not updated, try again' })
    return updatedPost
  } catch (error) {
    console.error(error)
    return null
  }
}

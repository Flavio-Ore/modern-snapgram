import { appwriteConfig, databases } from '@/services/appwrite/config'
import { type PostModel } from '@/types'

export async function updateLikesPost ({
  postId,
  usersLikes
}: {
  postId: string
  usersLikes: string[]
}) {
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

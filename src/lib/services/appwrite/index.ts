import * as api from '@/lib/services/appwrite/api'
import * as auth from '@/lib/services/appwrite/auth'
import * as likes from '@/lib/services/appwrite/likes'
import * as postsFunctions from '@/lib/services/appwrite/posts'
import * as saves from '@/lib/services/appwrite/saves'
import * as usersFunctions from '@/lib/services/appwrite/users'

const appwriteService = {
  findUserPosts: api.findUserPosts,
  posts: {
    create: postsFunctions.createPost,
    findInfinite: postsFunctions.findInfinitePosts,
    findById: postsFunctions.findPostById,
    delete: postsFunctions.deletePost,
    update: postsFunctions.updatePost
  },
  users: {
    create: usersFunctions.createUser,
    findById: usersFunctions.findUserById,
    findAll: usersFunctions.findAllUsers,
    update: usersFunctions.updateUser,
    findInfinite: usersFunctions.findInfiniteUsers
  },
  account: {
    user: auth.getUser,
    create: auth.createUserAccount,
    get: auth.getAccount,
    signIn: auth.signInAccount,
    signOut: auth.signOutAccount
  },
  likes: {
    update: likes.updateLikesPost
  },
  saves: {
    findInfinite: saves.findInfiniteSaves,
    delete: saves.deleteSave,
    update: saves.updateSave
  }
}


export default appwriteService

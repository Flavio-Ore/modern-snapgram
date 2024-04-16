import * as api from '@/services/appwrite/api'
import * as auth from '@/services/appwrite/auth'
import * as likes from '@/services/appwrite/likes'
import * as postsFunctions from '@/services/appwrite/posts'
import * as saves from '@/services/appwrite/saves'
import * as usersFunctions from '@/services/appwrite/users'

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
    findById: saves.findSaveRecordById,
    findInfinite: saves.findInfiniteSaves,
    delete: saves.deleteSave,
    update: saves.updateSave
  }
}


export default appwriteService

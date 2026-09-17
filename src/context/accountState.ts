export const INITIAL_USER = {
  id: '',
  name: '',
  email: '',
  username: '',
  imageUrl: '',
  imageId: '',
  bio: '',
  posts: [],
  liked: [],
  save: []
}

export const INITIAL_ACCOUNT_STATE = {
  id: '',
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuth: async () => false as boolean
}

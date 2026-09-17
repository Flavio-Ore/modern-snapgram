export const INITIAL_USER = {
  id: '',
  name: '',
  email: '',
  username: '',
  imageUrl: '',
  bio: '',
  posts: [],
  liked: [],
  save: []
}

export const INITIAL_AUTH_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean
}

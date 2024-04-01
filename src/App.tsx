import { Route, Routes } from 'react-router-dom'
import AuthLayout from './_auth/AuthLayout'
import SignInForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import RootLayout from './_root/RootLayout'
import {
  Chats,
  CreatePost,
  EditPost,
  Explore,
  Home,
  NotFound,
  People,
  PostDetails,
  Profile,
  Reels,
  Saved,
  UpdateProfile
} from './_root/pages'
import GridPostList from './components/shared/GridPostList'
import InfinitePosts from './components/shared/InfinitePosts'
import { Toaster } from './components/ui/toaster'
import './global.css'
import { useGetInfinitePosts } from './lib/queries/infiniteQueries'
import { OPERATIONS } from './values'
export const SavedPosts = () => <h1 className='h1-bold w-full'>Saved Posts</h1>
export const SavedReels = () => <h1 className='h1-bold w-full'>Saved Reels</h1>
export const SavedCollections = () => {
  const { data, isFetching, isError, isLoading, hasNextPage, fetchNextPage } =
    useGetInfinitePosts()
  const posts = data?.pages.flatMap(postsPage => postsPage) ?? []

  return (
    <InfinitePosts
      data={data}
      isFetching={isFetching}
      isLoading={isLoading}
      isError={isError}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isDataEmpty={posts.length === 0}
    >
      {data?.pages.map((postsPage, i) => (
        <GridPostList
          key={`${postsPage[i]}-${OPERATIONS}-${i}`}
          posts={postsPage}
          showStats={false}
          showUser={false}
        />
      ))}
    </InfinitePosts>
  )
}
const App = () => {
  return (
    <main className='flex h-dvh'>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/all-users' element={<People />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/reels' element={<Reels />} />
          <Route path='/chats' element={<Chats />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:id' element={<EditPost />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/profile/:id/*' element={<Profile />} />
          <Route path='/update-profile' element={<UpdateProfile />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}

export default App

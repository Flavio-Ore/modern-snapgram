import '@/global.css'
import AuthGuard from '@/guard/AuthGuard'
import { Toaster } from '@shadcn/toaster'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PUBLIC_ROUTES } from './routes/public'
import { USER_ROUTES } from './routes/user'

const Auth = lazy(async () => await import('@auth/Auth'))
const Snapgram = lazy(async () => await import('@/Snapgram'))
const SignInForm = lazy(async () => await import('@auth/components/SigninForm'))
const SignupForm = lazy(async () => await import('@auth/components/SignupForm'))
const Home = lazy(async () => await import('@posts/components/pages/Home'))
const Explore = lazy(
  async () => await import('@posts/components/pages/Explore')
)
const People = lazy(async () => await import('@users/components/pages/People'))
const Saved = lazy(async () => await import('@saved/Saved'))
const Chats = lazy(async () => await import('@chats/Chats'))
const CreatePost = lazy(
  async () => await import('@posts/components/pages/CreatePost')
)
const EditPost = lazy(
  async () => await import('@posts/components/pages/EditPost')
)
const PostDetails = lazy(
  async () => await import('@posts/components/pages/PostDetails')
)
const Profile = lazy(async () => await import('@/features/profile/Profile'))
const UpdateProfile = lazy(
  async () => await import('@profile/components/pages/UpdateProfile')
)
const NotFound = lazy(async () => await import('@/components/pages/NotFound'))

const App = () => {
  return (
    <main className='flex h-dvh'>
      <ReactQueryDevtools />
      <Toaster />
      <Routes>
        <Route path='/' element={<Navigate to={USER_ROUTES.HOME} />} />
        <Route element={<Auth />}>
          <Route path={PUBLIC_ROUTES.SIGN_IN} element={<SignInForm />} />
          <Route path={PUBLIC_ROUTES.SIGN_UP} element={<SignupForm />} />
        </Route>
        <Route element={<AuthGuard />}>
          <Route element={<Snapgram />}>
            <Route path={USER_ROUTES.HOME} element={<Home />} />
            <Route path={USER_ROUTES.EXPLORE} element={<Explore />} />
            <Route path={USER_ROUTES.PEOPLE} element={<People />} />
            <Route path={USER_ROUTES.SAVED} element={<Saved />} />
            <Route path={USER_ROUTES.CHATS} element={<Chats />} />
            <Route path={USER_ROUTES.CHATS_ROOM} element={<Chats />} />
            <Route path={USER_ROUTES.CREATE_POST} element={<CreatePost />} />
            <Route path={USER_ROUTES.UPDATE_POST} element={<EditPost />} />
            <Route path={USER_ROUTES.POST_DETAILS} element={<PostDetails />} />
            <Route path={USER_ROUTES.PROFILE} element={<Profile />} />
            <Route
              path={USER_ROUTES.UPDATE_PROFILE}
              element={<UpdateProfile />}
            />
            <Route path={USER_ROUTES.NOT_FOUND} element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </main>
  )
}
export default App

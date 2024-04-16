import LazyPages from '@/components/shared/app/LazyPages'
import { Toaster } from '@/components/ui/toaster'
import '@/global.css'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/values'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const AuthLayout = lazy(async () => await import('@/_auth/AuthLayout'))
const RootLayout = lazy(async () => await import('@/_root/RootLayout'))
const SignInForm = lazy(async () => await import('@/_auth/forms/SigninForm'))
const SignupForm = lazy(async () => await import('@/_auth/forms/SignupForm'))
const Home = lazy(async () => await import('@/_root/pages/Home'))
const Explore = lazy(async () => await import('@/_root/pages/Explore'))
const People = lazy(async () => await import('@/_root/pages/People'))
const Saved = lazy(async () => await import('@/_root/pages/Saved'))
const Reels = lazy(async () => await import('@/_root/pages/Reels'))
const Chats = lazy(async () => await import('@/_root/pages/Chats'))
const CreatePost = lazy(async () => await import('@/_root/pages/CreatePost'))
const EditPost = lazy(async () => await import('@/_root/pages/EditPost'))
const PostDetails = lazy(async () => await import('@/_root/pages/PostDetails'))
const Profile = lazy(async () => await import('@/_root/pages/Profile'))
const UpdateProfile = lazy(
  async () => await import('@/_root/pages/UpdateProfile')
)
const NotFound = lazy(async () => await import('@/_root/pages/NotFound'))

const App = () => {
  return (
    <main className='flex h-dvh'>
      <Toaster />
      <Routes>
        {/* public routes */}
        <Route
          element={
            <LazyPages>
              <AuthLayout />
            </LazyPages>
          }
        >
          <Route path={PUBLIC_ROUTES.SIGN_IN} element={<SignInForm />} />
          <Route path={PUBLIC_ROUTES.SIGN_UP} element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route
          element={
            <LazyPages>
              <RootLayout />
            </LazyPages>
          }
        >
          <Route index element={<Home />} />
          <Route path={PRIVATE_ROUTES.EXPLORE} element={<Explore />} />
          <Route path={PRIVATE_ROUTES.PEOPLE} element={<People />} />
          <Route path={PRIVATE_ROUTES.SAVED} element={<Saved />} />
          <Route path={PRIVATE_ROUTES.REELS} element={<Reels />} />
          <Route path={PRIVATE_ROUTES.CHATS} element={<Chats />} />
          <Route path={PRIVATE_ROUTES.CREATE_POST} element={<CreatePost />} />
          <Route path={PRIVATE_ROUTES.UPDATE_POST} element={<EditPost />} />
          <Route path={PRIVATE_ROUTES.POST_DETAILS} element={<PostDetails />} />
          <Route path={PRIVATE_ROUTES.PROFILE} element={<Profile />} />
          <Route
            path={PRIVATE_ROUTES.UPDATE_PROFILE}
            element={<UpdateProfile />}
          />
          <Route path={PRIVATE_ROUTES.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  )
}
export default App

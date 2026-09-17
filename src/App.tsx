import AuthLayout from '@/_auth/AuthLayout'
import RootLayout from '@/_root/RootLayout'
// import SignInForm from '@/_auth/forms/SigninForm'
// import SignupForm from '@/_auth/forms/SignupForm'
// import {
//   Chats,
//   CreatePost,
//   EditPost,
//   Explore,
//   Home,
//   NotFound,
//   People,
//   PostDetails,
//   Profile,
//   Reels,
//   Saved,
//   UpdateProfile
// } from '@/_root/pages'
import Loader from '@/components/shared/app/Loader'
import { Toaster } from '@/components/ui/toaster'
import '@/global.css'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/values'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const SignInForm = lazy(() => import('@/_auth/forms/SigninForm'))
const SignupForm = lazy(() => import('@/_auth/forms/SignupForm'))
const Home = lazy(() => import('@/_root/pages/Home'))
const Explore = lazy(() => import('@/_root/pages/Explore'))
const People = lazy(() => import('@/_root/pages/People'))
const Saved = lazy(() => import('@/_root/pages/Saved'))
const Reels = lazy(() => import('@/_root/pages/Reels'))
const Chats = lazy(() => import('@/_root/pages/Chats'))
const CreatePost = lazy(() => import('@/_root/pages/CreatePost'))
const EditPost = lazy(() => import('@/_root/pages/EditPost'))
const PostDetails = lazy(() => import('@/_root/pages/PostDetails'))
const Profile = lazy(() => import('@/_root/pages/Profile'))
const UpdateProfile = lazy(() => import('@/_root/pages/UpdateProfile'))
const NotFound = lazy(() => import('@/_root/pages/NotFound'))

const LazyPages: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}

const App = () => {
  return (
    <main className='flex h-dvh'>
      <LazyPages>
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout />}>
            <Route path={PUBLIC_ROUTES.SIGN_IN} element={<SignInForm />} />
            <Route path={PUBLIC_ROUTES.SIGN_UP} element={<SignupForm />} />
          </Route>

          {/* private routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path={PRIVATE_ROUTES.EXPLORE} element={<Explore />} />
            <Route path={PRIVATE_ROUTES.PEOPLE} element={<People />} />
            <Route path={PRIVATE_ROUTES.SAVED} element={<Saved />} />
            <Route path={PRIVATE_ROUTES.REELS} element={<Reels />} />
            <Route path={PRIVATE_ROUTES.CHATS} element={<Chats />} />
            <Route path={PRIVATE_ROUTES.CREATE_POST} element={<CreatePost />} />
            <Route path={PRIVATE_ROUTES.UPDATE_POST} element={<EditPost />} />
            <Route
              path={PRIVATE_ROUTES.POST_DETAILS}
              element={<PostDetails />}
            />
            <Route path={PRIVATE_ROUTES.PROFILE} element={<Profile />} />
            <Route
              path={PRIVATE_ROUTES.UPDATE_PROFILE}
              element={<UpdateProfile />}
            />
            <Route path={PRIVATE_ROUTES.NOT_FOUND} element={<NotFound />} />
          </Route>
        </Routes>
      </LazyPages>
      <Toaster />
    </main>
  )
}

export default App

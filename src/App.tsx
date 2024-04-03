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
import { Toaster } from './components/ui/toaster'
import './global.css'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './values'

// const ROUTES_MAP = {
//   [PUBLIC]: [
//     [PUBLIC_ROUTES.SIGN_IN, { path: '/sign-in', component: <SignInForm /> }],
//     [PUBLIC_ROUTES.SIGN_UP, { path: '/sign-up', component: <SignupForm /> }]
//   ],
//   [PRIVATE]: [
//     [PRIVATE_ROUTES.HOME, { path: '/', component: <Home /> }],
//     [PRIVATE_ROUTES.EXPLORE, { path: '/explore', component: <Explore /> }],
//     [PRIVATE_ROUTES.PEOPLE, { path: '/all-users', component: <People /> }],
//     [PRIVATE_ROUTES.SAVED, { path: '/saved', component: <Saved /> }],
//     [PRIVATE_ROUTES.REELS, { path: '/reels', component: <Reels /> }],
//     [PRIVATE_ROUTES.CHATS, { path: '/chats', component: <Chats /> }],
//     [
//       PRIVATE_ROUTES.CREATE_POST,
//       { path: '/create-post', component: <CreatePost /> }
//     ],
//     [
//       PRIVATE_ROUTES.UPDATE_POST,
//       { path: '/update-post/:id', component: <EditPost /> }
//     ],
//     [
//       PRIVATE_ROUTES.POST_DETAILS,
//       { path: '/posts/:id', component: <PostDetails /> }
//     ],
//     [
//       PRIVATE_ROUTES.PROFILE,
//       { path: '/profile/:id/*', component: <Profile /> }
//     ],
//     [
//       PRIVATE_ROUTES.UPDATE_PROFILE,
//       { path: '/update-profile', component: <UpdateProfile /> }
//     ],
//     [PRIVATE_ROUTES.NOT_FOUND, { path: '*', component: <NotFound /> }]
//   ]
// }

const App = () => {
  return (
    <main className='flex h-dvh'>
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
          <Route path={PRIVATE_ROUTES.POST_DETAILS} element={<PostDetails />} />
          <Route path={PRIVATE_ROUTES.PROFILE} element={<Profile />} />
          <Route
            path={PRIVATE_ROUTES.UPDATE_PROFILE}
            element={<UpdateProfile />}
          />
          <Route path={PRIVATE_ROUTES.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}

export default App

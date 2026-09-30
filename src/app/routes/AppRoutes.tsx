import { AppLayout } from '@widgets/layout'
import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthGuard } from './guards/AuthGuard'

const AuthLayout = lazy(async () =>
  import('@features/auth-by-email').then(m => ({ default: m.AuthLayout }))
)
const SignInForm = lazy(async () =>
  import('@features/auth-by-email').then(m => ({ default: m.SignInForm }))
)
const SignUpForm = lazy(async () =>
  import('@features/auth-by-email').then(m => ({ default: m.SignUpForm }))
)

const HomePage = lazy(async () =>
  import('@pages/home').then(m => ({ default: m.HomePage }))
)
const ExplorePage = lazy(async () =>
  import('@pages/explore').then(m => ({ default: m.ExplorePage }))
)
const PeoplePage = lazy(async () =>
  import('@pages/people').then(m => ({ default: m.PeoplePage }))
)
const SavedPage = lazy(async () =>
  import('@pages/saved').then(m => ({ default: m.SavedPage }))
)
const ChatsPage = lazy(async () =>
  import('@pages/chats').then(m => ({ default: m.ChatsPage }))
)
const CreatePostPage = lazy(async () =>
  import('@pages/create-post').then(m => ({ default: m.CreatePostPage }))
)
const EditPostPage = lazy(async () =>
  import('@pages/edit-post').then(m => ({ default: m.EditPostPage }))
)
const PostDetailsPage = lazy(async () =>
  import('@pages/post-details').then(m => ({ default: m.PostDetailsPage }))
)
const ProfilePage = lazy(async () =>
  import('@pages/profile').then(m => ({ default: m.ProfilePage }))
)
const UpdateProfilePage = lazy(async () =>
  import('@pages/profile').then(m => ({ default: m.UpdateProfilePage }))
)
const NotFoundPage = lazy(async () =>
  import('@pages/not-found').then(m => ({ default: m.NotFoundPage }))
)

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />

      {/* Public Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
      </Route>

      {/* Protected App Routes */}
      <Route element={<AuthGuard />}>
        <Route element={<AppLayout />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/explore' element={<ExplorePage />} />
          <Route path='/people' element={<PeoplePage />} />
          <Route path='/all-users' element={<PeoplePage />} />
          <Route path='/saved' element={<SavedPage />} />
          <Route path='/chats' element={<ChatsPage />} />
          <Route path='/chats/:chatRoomId' element={<ChatsPage />} />
          <Route path='/create-post' element={<CreatePostPage />} />
          <Route path='/update-post/:id' element={<EditPostPage />} />
          <Route path='/posts/:id' element={<PostDetailsPage />} />
          <Route path='/profile/:id/*' element={<ProfilePage />} />
          <Route path='/update-profile' element={<UpdateProfilePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes

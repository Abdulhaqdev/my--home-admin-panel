import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthRoute from './components/route/AuthRote'
import { authRoutes, protectedRoutes } from './config/routes'
import { useSelector } from 'react-redux'
import Loader from './components/Loader'
import CreateCategory from './pages/CategoryPage/CreateCategory'
import CreateProduct from './pages/ProductsPage/CreateProduct'
import Header from './components/hedaer/Header'
import ProtectedRoutes from './components/route/PretectedRoute'
import SettingsPage from './pages/SettingPage'
import UserProfile from './pages/UserPage/UserProfile'
import CreatePost from './pages/PostPage/CreatePost'

const App = () => {
	const isAuthenticated = useSelector(state => state.session.signIn)

	return (
		<Suspense fallback={<Loader />}>
			{isAuthenticated && <Header />}
			<Routes>
				<Route path='/' element={<ProtectedRoutes />}>
					{protectedRoutes.map(route => (
						<Route
							path={route.path}
							key={route.key}
							element={<route.component />}
						/>
					))}
					<Route path='/settings' element={<SettingsPage />} />
					<Route path='/createpost' element={<CreatePost />} />
					<Route path='/createcategory' element={<CreateCategory />} />
					<Route path='/createproduct' element={<CreateProduct />} />
					<Route path='/user/:id' element={<UserProfile />} />
				</Route>
				<Route path='/' element={<AuthRoute />}>
					{authRoutes.map(route => (
						<Route
							path={route.path}
							key={route.key}
							element={<route.component />}
						/>
					))}
				</Route>
				<Route path='*' element={<h1>not found</h1>} />
			</Routes>
		</Suspense>
	)
}

export default App

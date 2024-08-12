import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function AuthRoute() {
	const isAuthenticated = useSelector(state => state.session.signIn)

	if (isAuthenticated) {
		return <Navigate to={'/'} replace />
	}
	return <Outlet />
}

export default AuthRoute

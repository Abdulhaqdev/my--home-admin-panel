import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedRoutes() {
	const isAuthenticated = useSelector(state => state.session.signIn)

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />
	}

	return <Outlet />
}

export default ProtectedRoutes

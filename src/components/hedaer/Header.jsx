import { HiOutlineLogout } from 'react-icons/hi'
import { IoSettingsOutline } from 'react-icons/io5'
import { RiSettings5Fill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'
import notification from '../../assets/002-notification-1.png'
import { protectedRoutes } from '../../config/routes'
import SearchInput from '../SearchInput'
import { useDispatch } from 'react-redux'
import { setSignOutSuccess } from '../../store/auth/sesionSlice'

const Header = () => {
	const location = useLocation()
	const dispatch = useDispatch()

	const currentRoute = protectedRoutes.find(
		route => route.path === location.pathname
	)
	const pageTitle = currentRoute ? currentRoute.key : ''

	const handleLogout = () => {
		// Logout funksiyasi: bu yerda foydalanuvchini tizimdan chiqarish logikasini joylashtiring
		// Masalan, tokenni localStorage dan olib tashlash yoki autentifikatsiya holatini yangilash
		// Logoutdan keyin foydalanuvchini login sahifasiga yo'naltirish
		dispatch(setSignOutSuccess())
	}

	return (
		<div className='overflow-hidden'>
			<div className='bg-white w-48 lg:w-64 h-screen fixed rounded-none'>
				<div className='p-4 h-full pt-24 flex flex-col justify-between border text-slate-600'>
					<div>
						{protectedRoutes.map(route => (
							<Link
								key={route.key}
								to={route.path}
								className={`px-2 py-3 flex items-center space-x-4 rounded-md group hover:bg-gray-100 hover:text-blue-600 ${
									location.pathname === route.path
										? 'bg-slate-100 text-blue-600'
										: ''
								}`}
							>
								<route.icon className='text-xl' />
								<span>{route.key}</span>
							</Link>
						))}
					</div>
					<div>
						<Link
							to='/settings'
							className={`px-4 py-3 flex items-center space-x-4 rounded-md group hover:bg-gray-100 hover:text-blue-600 ${
								location.pathname === '/settings'
									? 'bg-gray-100 text-blue-600'
									: ''
							}`}
						>
							<RiSettings5Fill className='text-2xl' />
							<span>Setting</span>
						</Link>
						<button
							onClick={handleLogout}
							className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gray-100 hover:text-blue-600'
						>
							<HiOutlineLogout className='text-2xl' />
							<span>Logout</span>
						</button>
					</div>
				</div>
			</div>
			<nav className='bg-white border-b ml-48 lg:ml-64 w-10/12 h-20 flex items-center'>
				<div className='flex w-full justify-between items-center px-12 lg:px-18'>
					<h2 className='text-2xl font-bold text-gray-800'>{pageTitle}</h2>

					<div className='space-x-5 lg:space-x-10 flex items-center relative'>
						<SearchInput />
						<button className='p-3 rounded-full bg-slate-100 '>
							<IoSettingsOutline className='text-2xl' />
						</button>
						<button className='p-3 rounded-full bg-slate-100 '>
							<img src={notification} alt='notification' />
						</button>
						<div className='rounded-full bg-slate-400 w-14 h-14'></div>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Header

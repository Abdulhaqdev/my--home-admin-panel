import React from 'react'
import { BiBox, BiMessageSquare } from 'react-icons/bi'
import { FaRegUser } from 'react-icons/fa6'
import { TbCategoryPlus } from 'react-icons/tb'
import { TiHomeOutline } from 'react-icons/ti'

export const authRoutes = [
	{
		key: 'login',
		path: '/login',
		component: React.lazy(() => import('../pages/auth/LoginPage.jsx')),
	},
]

export const protectedRoutes = [
	{
		key: 'Dashboard',
		path: '/',
		component: React.lazy(() => import('../pages/DashboardPage.jsx')),
		icon: TiHomeOutline,
	},
	{
		key: 'Пользователи',
		path: '/users',
		component: React.lazy(() => import('../pages/UserPage/UserPage.jsx')),
		icon: FaRegUser,
	},
	{
		key: 'Категория',
		path: '/categories',
		component: React.lazy(() =>
			import('../pages/CategoryPage/CategroyPage.jsx')
		),
		icon: TbCategoryPlus,
	},
	{
		key: 'Посты',
		path: '/post',
		component: React.lazy(() => import('../pages/PostPage/PostPage.jsx')),
		icon: BiMessageSquare,
	},
	{
		key: 'Товары',
		path: '/products',
		component: React.lazy(() =>
			import('../pages/ProductsPage/ProductPage.jsx')
		),
		icon: BiBox,
	},
]

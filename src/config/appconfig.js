const appConfig = {
	apiPrefix: import.meta.env.VITE_APP_BASE_URL,
	authenticatedEmptyPath: '/',
	unauthenticatedEmptyPath: '/login',
	tokenType: 'Bearer ', // Bu joyda token turini ko'rsatish
	token: localStorage.getItem('accessToken'), // 'accesToken' dan 'accessToken' ga o'zgartirildi
}

export default appConfig

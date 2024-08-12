import { createSlice } from '@reduxjs/toolkit'

const accessToken = localStorage.getItem('accessToken')
const initialState = {
	token: accessToken || '',
	signIn: accessToken ? true : false,
}

export const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		setSignInSuccess: (state, action) => {
			state.signIn = true
			state.token = action.payload
			localStorage.setItem('accessToken', action.payload) // 'Bearer' dan 'accessToken' ga o'zgartirildi
		},
		setSignOutSuccess: state => {
			state.signIn = false
			state.token = ''
			localStorage.removeItem('accessToken') // Tokenni o'chirish
		},
	},
})

export const { setSignInSuccess, setSignOutSuccess } = sessionSlice.actions

export default sessionSlice.reducer

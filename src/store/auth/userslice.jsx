import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	login: '',
	email: '',
}

export const userSlice = createSlice({
	name: 'auth/user',
	initialState,
	reducers: {
		setLogin: (state, action) => {
			state.login = action.payload
		},
		setEmail: (state, action) => {
			state.email = action.payload
		},
	},
})

export const { setLogin, setEmail } = userSlice.actions

export default userSlice.reducer

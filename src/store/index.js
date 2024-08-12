import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './auth/sesionSlice'
import userReducer from './auth/userslice'

const rootReducer = {
	session: sessionReducer,
	user: userReducer,
}

const store = configureStore({
	reducer: rootReducer,
})

export default store

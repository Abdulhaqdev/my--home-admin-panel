import axios from 'axios'
import store from '../store'
import appConfig from '../config/appconfig'
import { setSignOutSuccess } from '../store/auth/sesionSlice'

const unAuthenticatedCode = ['403', '401'] // 401 ni ham qo'shish

const BaseService = axios.create({
	timeout: 10000,
	baseURL: appConfig.apiPrefix,
})

BaseService.interceptors.request.use(
	config => {
		const stateData = store.getState()
		if (stateData.session.token !== '') {
			config.headers[
				'Authorization'
			] = `${appConfig.tokenType}${stateData.session.token}`
		}
		return config
	},
	error => Promise.reject(error)
)

BaseService.interceptors.response.use(
	response => response,
	error => {
		const { response } = error
		if (response && unAuthenticatedCode.includes(response.status.toString())) {
			store.dispatch(setSignOutSuccess())
		}
		return Promise.reject(error)
	}
)

export default BaseService

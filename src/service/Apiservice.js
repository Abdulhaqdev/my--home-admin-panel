import BaseService from './BaseService'

const ApiService = {
	fetchData(param) {
		return new Promise((resolve, reject) => {
			BaseService(param)
				.then(response => {
					resolve(response.data)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
}

export default ApiService

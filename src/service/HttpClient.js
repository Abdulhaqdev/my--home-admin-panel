import ApiService from './ApiService'

class HttpClient {
	async get(url, headers = {}) {
		return await ApiService.fetchData({
			method: 'get',
			url: url,
			headers,
		})
	}

	async patch(url, data, headers = {}) {
		return await ApiService.fetchData({
			method: 'patch',
			url: url,
			data,
			headers: headers,
		})
	}

	async post(url, data, headers = {}) {
		return await ApiService.fetchData({
			method: 'post',
			url: url,
			data,
			headers: headers,
		})
	}

	async put(url, data, headers = {}) {
		return await ApiService.fetchData({
			method: 'put',
			url: url,
			data,
			headers: headers,
		})
	}

	async delete(url, headers = {}) {
		return await ApiService.fetchData({
			method: 'delete',
			url: url,
			headers: headers,
		})
	}
}

export default new HttpClient()

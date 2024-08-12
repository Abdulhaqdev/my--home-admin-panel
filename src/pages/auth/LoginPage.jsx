import { useState } from 'react'
import InputField from '../../components/InputFeild'
import HttpClient from '../../service/HttpClient'
import { API_ENDPOINTS } from '../../service/ApiEndPoints'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setSignInSuccess } from '../../store/auth/sesionSlice'

function LoginPage() {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const handleSubmit = async e => {
		e.preventDefault()

		const formData = {
			phone: login,
			password: password,
		}

		console.log(formData) // FormData ma'lumotlarini tekshirish

		try {
			const response = await HttpClient.post(API_ENDPOINTS.LOGIN, formData)
			toast.success(response.data.message)
			dispatch(setSignInSuccess(response.data.token))
			console.log(response)
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message)
				console.error('Error creating category:', error.response.data)
			} else {
				toast.error(error.message)
				console.error('Error creating category:', error)
			}
		}
	}

	return (
		<div className='flex items-center p-14 justify-start h-screen w-full bg-gray-100'>
			<div>
				<Toaster />
			</div>
			<div className='space-y-16'>
				<h2 className='text-5xl font-bold'>Вход</h2>
				<form onSubmit={handleSubmit} className='space-y-20'>
					<div className='flex w-full space-x-8'>
						<InputField
							id='login'
							label='Логин'
							type='text'
							value={login}
							placeholder='998901234567'
							onChange={e => setLogin(e.target.value)}
						/>
						<InputField
							id='password'
							label='Пароль'
							type='password'
							value={password}
							placeholder='sdfjksd3928@#3KRJ'
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<button
						type='submit'
						className='w-full py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700'
					>
						<p className='text-3xl font-bold'>Вход</p>
					</button>
				</form>
			</div>
		</div>
	)
}

export default LoginPage

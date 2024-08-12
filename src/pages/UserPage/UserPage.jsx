import { useEffect, useState } from 'react'
import { TbUserHexagon } from 'react-icons/tb'
import SearchInput from '../../components/SearchInput'
import { useNavigate } from 'react-router-dom'
import HttpClient from '../../service/HttpClient'
import { API_ENDPOINTS } from '../../service/ApiEndPoints'
import appConfig from '../../config/appconfig'

const UserPage = () => {
	const [users, setUsers] = useState([])
	console.log(appConfig.token)
	const getUser = async () => {
		try {
			const response = await HttpClient.get(API_ENDPOINTS.USERS, {
				headers: {
					Authorization: `Bearer ${appConfig.token}`, // Bu yerda token to'g'ri ekanligini tekshiring
				},
			})
			setUsers(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	const navigate = useNavigate()
	const [showModal, setShowModal] = useState(false)
	const [selectedUser, setSelectedUser] = useState(null)
	const handleUserClick = userId => {
		navigate(`/user/${userId}`)
	}

	const handleDotsClick = userId => {
		setSelectedUser(userId)
		setShowModal(!showModal)
	}

	const handleOptionClick = action => {
		console.log(`${action} user with ID: ${selectedUser}`)
		setShowModal(false)
	}

	useEffect(() => {
		getUser()
	}, [])

	return (
		<div className='lg:ml-64 ml-48 bg-slate-100 min-h-screen p-8'>
			<div className='flex items-center justify-between pb-6 px-3'>
				<SearchInput />
				<div className='flex items-center justify-between'>
					<form className='max-w-sm mx-auto'>
						<select
							id='countries'
							className='border-2 border-blue-950 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-2'
						>
							<option value=''>Сортировка</option>
							<option value='1'>1</option>
							<option value='2'>2</option>
							<option value='3'>3</option>
							<option value='4'>4</option>
						</select>
					</form>
					<div className='flex space-x-0.5 pl-6'>
						<span className='h-1.5 w-1.5 bg-slate-400 rounded-full'></span>
						<span className='h-1.5  w-1.5 bg-slate-400 rounded-full'></span>
						<span className='h-1.5 w-1.5 bg-slate-400 rounded-full'></span>
					</div>
				</div>
			</div>
			<div className='overflow-y-hidden rounded-lg'>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead>
							<tr className='bg-slate-100 text-left text-sm font-bold uppercase tracking-widest text-slate-400 border-b-2'>
								<th className='px-5 py-3 flex items-center space-x-4 font-sans'>
									<TbUserHexagon className='text-2xl' />
									<h3>ФИО</h3>
								</th>
								<th className='px-5 py-3'>Телефон номер</th>
								<th className='px-5 py-3'>Билеты</th>
								<th className='px-5 py-3'>Результат</th>
								<th className='px-5 py-3'></th>
								<th className='px-5 py-3'>Действие</th>
							</tr>
						</thead>
						<tbody className='text-gray-500'>
							{users.map(user => (
								<tr
									key={user.id}
									className='border-b-8 border-b-slate-100  rounded-2xl cursor-pointer relative'
								>
									<td
										className='border-b border-gray-200 bg-white px-5 py-5 text-sm '
										onClick={() => handleUserClick(user.id)}
									>
										<div className='flex items-center'>
											<span className='h-8 w-8 bg-slate-200 rounded-full'></span>
											<div className='ml-3'>
												<p className='whitespace-no-wrap'>{user.name}</p>
											</div>
										</div>
									</td>
									<td
										className='border-b border-gray-200 bg-white px-5 py-5 text-sm '
										onClick={() => handleUserClick(user.id)}
									>
										<p className='whitespace-no-wrap'>{user.phone}</p>
									</td>
									<td
										className='border-b border-gray-200 bg-white px-5 py-5 text-sm'
										onClick={() => handleUserClick(user.id)}
									>
										<p className='whitespace-no-wrap'>{user.tickets}</p>
									</td>
									<td
										className='border-b border-gray-200 bg-white px-5 py-5 text-sm'
										onClick={() => handleUserClick(user.id)}
									>
										<p className='whitespace-no-wrap'>{user.result}</p>
									</td>
									<td className='px-5 py-5 bg-white border-b'></td>
									<td
										className='border-b border-gray-200 bg-white px-5 py-5 text-sm'
										onClick={() => handleDotsClick(user.id)}
									>
										<div className='flex space-x-0.5 pl-6'>
											<span className='h-1.5 w-1.5 bg-slate-400 rounded-full'></span>
											<span className='h-1.5  w-1.5 bg-slate-400 rounded-full'></span>
											<span className='h-1.5 w-1.5 bg-slate-400 rounded-full cursor-pointer'></span>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className='flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between'>
					<span className='text-xs text-gray-600 sm:text-sm'>
						{' '}
						Showing 1 to 5 of {users.length} Entries{' '}
					</span>
					<div className='mt-2 inline-flex sm:mt-0'>
						<button className='mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100'>
							Prev
						</button>
						<button className='h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100'>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserPage

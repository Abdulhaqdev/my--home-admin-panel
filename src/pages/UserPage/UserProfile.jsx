import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Reatangle1 from '../../assets/Rectangle1.png'
import Reatangle2 from '../../assets/Rectangle.png'
import { SlLocationPin } from 'react-icons/sl'
import { BsTelephone } from 'react-icons/bs'
import House from '../../assets/RectangleHouse.png'
import Loader from '../../components/Loader'
import HttpClient from '../../service/HttpClient'
import { API_ENDPOINTS } from '../../service/ApiEndPoints'
import appConfig from '../../config/appconfig'

const UserProfile = () => {
	const { id } = useParams()
	const [user, setUser] = useState(null)
	const [region, setRegion] = useState(null)
	const [districtId, setDistrictId] = useState(null)

	console.log(region, districtId)
	const getUser = async () => {
		try {
			const response = await HttpClient.get(`${API_ENDPOINTS.USERS}/${id}`, {
				headers: {
					Authorization: `Bearer ${appConfig.token}`,
				},
			})
			setUser(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	const getRegion = async regionId => {
		try {
			const response = await HttpClient.get(
				`${API_ENDPOINTS.REGION}/${regionId}`
			)
			setRegion(response.data)
		} catch (err) {
			console.log(err)
		}
	}

	const getDistrict = async districtId => {
		try {
			const response = await HttpClient.get(
				`${API_ENDPOINTS.DISTRICT}/${districtId}`
			)
			setDistrictId(response.data)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		if (id) {
			getUser()
		}
	}, [id])

	useEffect(() => {
		if (user && user.regionId) {
			getRegion(user.regionId)
			getDistrict(user.districtId)
		}
	}, [user])

	if (!user) {
		return (
			<div>
				<Loader />
			</div>
		)
	}

	return (
		<div className='lg:ml-64 ml-48 bg-slate-100 min-h-screen px-10 py-14'>
			<div className='bg-white rounded-lg w-full max-w-4xl'>
				<div className='relative mb-8'>
					<div className='bg-purple-700 h-32 w-full rounded-t-xl relative'>
						<div className='absolute top-1/4 left-6 transform bg-white p-2 rounded-full'>
							<div className='bg-purple-200 rounded-full h-40 w-40'></div>
						</div>
						<div>
							<div className='absolute right-36 bottom-0'>
								<img src={Reatangle2} alt='' />
							</div>
							<div className='absolute right-8 bottom-0'>
								<img src={Reatangle1} alt='' />
							</div>
						</div>
					</div>
				</div>
				<div className='mt-20 p-8 space-y-10'>
					<div className='flex space-x-0.5 pl-6 justify-end'>
						<span className='h-2 w-2 bg-slate-400 rounded-full'></span>
						<span className='h-2 w-2 bg-slate-400 rounded-full'></span>
						<span className='h-2 w-2 bg-slate-400 rounded-full'></span>
					</div>
					<h1 className='text-2xl font-bold'>
						{user.name} {user.surname}
					</h1>
					<div className='flex items-center space-x-8'>
						<div className='flex items-center space-x-2 text-gray-600 font-semibold'>
							<span className='p-2 bg-orange-400 text-white rounded-full'>
								<SlLocationPin />
							</span>
							<span>
								{region ? region.name : 'Loading...'}{' '}
								{districtId ? districtId.name : 'Loading'}
							</span>
						</div>
						<div className='flex items-center space-x-2 text-gray-600 font-semibold'>
							<span className='p-2 bg-orange-400 text-white rounded-full'>
								<BsTelephone />
							</span>
							<span>{user.phone}</span>
						</div>
					</div>
					<h2 className='text-xl font-semibold mb-4'>Билеты</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div className='bg-white border space-x-4 flex w-full h-44 rounded-lg p-2'>
							<div className='w-2/5 h-full'>
								<img
									src={House}
									alt='Penthouse'
									className='w-full h-full rounded-xl'
								/>
							</div>
							<div className='space-y-1 w-3/5'>
								<h3 className='text-lg font-bold'>Пентхаус</h3>
								<p className='text-gray-600 text-sm'>Количество билетов</p>
								<p className='text-black font-semibold'>{user.tickets}</p>
								<p className='text-gray-600 text-sm'>Статус</p>
								<div className='mt-2'>
									<span
										className={`inline-block text-center text-sm px-3 py-1 rounded-md1 w-full ${
											user.result === 'Выиграл'
												? 'bg-green-400'
												: 'bg-yellow-200 text-yellow-700'
										}`}
									>
										{user.result}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserProfile

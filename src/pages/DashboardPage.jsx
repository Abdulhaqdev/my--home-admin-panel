import { useEffect, useState } from 'react'
import HttpClient from '../service/HttpClient'
import { API_ENDPOINTS } from '../service/ApiEndPoints'

const DashboardPage = () => {
	const [regions, setRegions] = useState([])

	const getRegions = async () => {
		try {
			const response = await HttpClient.get(API_ENDPOINTS.REGION)
			setRegions(response.data.data)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getRegions()
	}, [])

	return (
		<div className='lg:ml-64 ml-48 bg-slate-100 min-h-screen p-8'>
			<div className='flex space-x-10'>
				<div className='w-2/5 bg-white p-10 flex flex-col space-y-2 rounded-xl relative'>
					<h2 className='text-lg font-bold text-slate-800 left-6 top-4 absolute'>
						Регионы
					</h2>
					{regions.map(item => (
						<button key={item.id} className='text-start text-slate-400'>
							{item.name}
						</button>
					))}
				</div>
				<div className='w-3/5 bg-white p-10  space-y-3 rounded-xl'>
					<h2 className='text-lg font-bold text-slate-800 '>Доходы</h2>
					<div className='grid grid-cols-1 grid-rows-3 lg:grid-cols-2 gap-4'>
						<div className='h-44 w-full p-3 rounded-2xl shadow-lg space-x-6'>
							<h3 className='text-lg font-bold text-slate-800 mb-4'>
								Статистика по дням
							</h3>
							<p className='text-start text-5xl font-bold text-slate-900'>
								500
							</p>
							<p className='text-center text-sm text-slate-600'>Суммов</p>
						</div>
						<div className='h-44 w-full p-3 rounded-2xl shadow-lg space-x-6'>
							<h3 className='text-lg font-bold text-slate-800 mb-4'>
								Статистика по месяцам
							</h3>
							<p className='text-start text-5xl font-bold text-slate-900'>
								500
							</p>
							<p className='text-center text-sm text-slate-600'>Суммов</p>
						</div>
						<div className='h-44 w-full p-3 rounded-2xl shadow-lg space-x-6'>
							<h3 className='text-lg font-bold text-slate-800 mb-4'>
								Количество купленных билетов
							</h3>
							<p className='text-start text-5xl font-bold text-slate-900'>
								500
							</p>
							<p className='text-center text-sm text-slate-600'>Суммов</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DashboardPage

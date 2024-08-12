import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchInput from '../../components/SearchInput'
import HttpClient from '../../service/HttpClient'
import { API_ENDPOINTS } from '../../service/ApiEndPoints'
import Modal from '../../components/Dropdown'
import appConfig from '../../config/appconfig'

function CategoriesPage() {
	const [categories, setCategories] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [selectedCategoryId, setSelectedCategoryId] = useState(null)

	const getCategories = async () => {
		try {
			const response = await HttpClient.get(API_ENDPOINTS.CATEGORY, {
				Authorization: `Bearer ${appConfig.token}`,
			})
			setCategories(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		getCategories()
	}, [])

	const deleteCategory = async id => {
		try {
			const response = await HttpClient.delete(
				`${API_ENDPOINTS.CATEGORY}/${id}`,
				{
					Authorization: `Bearer ${appConfig.token}`,
				}
			)
			setCategories(prevCategories =>
				prevCategories.filter(category => category.id !== id)
			)
			console.log(response)
		} catch (error) {
			console.error(error)
		}
	}

	const handleDotsClick = categoryId => {
		setSelectedCategoryId(categoryId)
		setShowModal(true)
	}

	const handleOptionClick = action => {
		if (action === 'Удалить' && selectedCategoryId !== null) {
			deleteCategory(selectedCategoryId)
		}
		console.log(`${action} category with ID: ${selectedCategoryId}`)
		setShowModal(false)
	}

	return (
		<div className='bg-gray-100 min-h-screen ml-48 lg:ml-64 py-8 px-6'>
			<div className='flex justify-between items-center'>
				<SearchInput />
				<Link
					to={'/createcategory'}
					className='text-base border text-blue-900 border-blue-600 rounded-3xl py-2 px-9'
				>
					Создать Категория
				</Link>
			</div>
			<div className='rounded-2xl bg-white w-full min-h-96 mt-6'>
				<div className='w-full h-14 rounded-t-2xl bg-violet-800 flex items-center p-6'>
					<h2 className='text-white text-2xl'>Категории</h2>
				</div>
				<div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-4 mt-8 p-8'>
					{categories.map(item => (
						<div className='bg-white border rounded-2xl relative' key={item.id}>
							<div className='w-full h-36'>
								<img
									src={item.image}
									alt={item.name}
									className='w-full h-full rounded-t-2xl'
								/>
							</div>
							<div className='p-3 space-y-3'>
								<div className='flex justify-between items-center p-2 h-16 relative'>
									<h2 className='text-2xl font-bold font-sans'>{item.name}</h2>
									<div
										className='flex space-x-0.5 cursor-pointer p-2'
										onClick={() => handleDotsClick(item.id)}
									>
										<span className='h-1.5 w-1.5 bg-slate-400 rounded-full'></span>
										<span className='h-1.5 w-1.5 bg-slate-400 rounded-full'></span>
										<span className='h-1.5 w-1.5 bg-slate-400 rounded-full'></span>
									</div>
									{showModal && selectedCategoryId === item.id && (
										<Modal
											showModal={true}
											onClose={() => setShowModal(false)}
											onAction={handleOptionClick}
										/>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default CategoriesPage

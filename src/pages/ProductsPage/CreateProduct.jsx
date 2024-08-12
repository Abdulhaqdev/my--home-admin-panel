import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast, { Toaster } from 'react-hot-toast'
import { API_ENDPOINTS } from '../../service/ApiEndPoints'
import HttpClient from '../../service/HttpClient'
import appConfig from '../../config/appconfig'

function CreateProduct() {
	const [title, setTitle] = useState('')
	const [categoryId, setCategoryId] = useState('')
	const [description, setDescription] = useState('')
	const [photo, setPhoto] = useState(null)
	const [location, setLocation] = useState('')
	const [roomNumber, setRoomNumber] = useState(0)
	const [floorNumber, setFloorNumber] = useState(0)
	const [ticketNumber, setTicketNumber] = useState(0)
	const [ticketPrice, setTicketPrice] = useState(0)
	const [charCount, setCharCount] = useState(0)
	const [category, setCategory] = useState([])

	const getCategory = async () => {
		try {
			const response = await HttpClient.get(API_ENDPOINTS.CATEGORY, {
				headers: {
					Authorization: `Bearer ${appConfig.token}`,
				},
			})
			setCategory(response.data.data)
		} catch (error) {
			console.error('Error fetching categories:', error)
		}
	}

	useEffect(() => {
		getCategory()
	}, [])

	const onDrop = acceptedFiles => {
		if (acceptedFiles.length > 0) {
			setPhoto(acceptedFiles[0])
		}
	}

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
	})

	const handleDescriptionChange = e => {
		setDescription(e.target.value)
		setCharCount(e.target.value.length)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const formData = new FormData()
		formData.append('title', title)
		formData.append('categoryId', categoryId)
		if (photo) formData.append('images', photo)
		formData.append('description', description)
		formData.append('ticketNumber', ticketNumber.toString())
		formData.append('ticketPrice', ticketPrice.toString())
		formData.append(
			'details',
			JSON.stringify({
				location,
				roomNumber,
				floorNumber,
			})
		)

		try {
			const response = await HttpClient.post(API_ENDPOINTS.PRODUCTS, formData, {
				headers: {
					Authorization: `Bearer ${appConfig.token}`,
				},
			})
			toast.success(response.data.message)

			console.log('Product created successfully:', response.data)
		} catch (error) {
			console.error('Error creating product:', error)
			toast.error(error.message)
		}
		console.log(formData)
	}

	return (
		<div className='bg-gray-100 min-h-screen ml-48 lg:ml-64 py-8 px-6'>
			<div>
				<Toaster />
			</div>
			<div className='rounded-2xl bg-white w-full min-h-96'>
				<div className='w-full h-14 rounded-t-2xl bg-violet-800 flex items-center p-6'>
					<h2 className='text-white text-2xl'>Товары</h2>
				</div>
				<div className='p-5 w-full'>
					<form onSubmit={handleSubmit}>
						<div className='grid grid-cols-1 gap-6 md:grid-cols-2 mb-6'>
							<div>
								<label
									htmlFor='title'
									className='block text-sm font-medium text-gray-700'
								>
									Заголовок
								</label>
								<input
									type='text'
									id='title'
									className='mt-1 px-5 py-3 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
									value={title}
									onChange={e => setTitle(e.target.value)}
									placeholder='Lorem ipsum dolor sit amet'
								/>
							</div>
							<div>
								<label
									htmlFor='categoryId'
									className='block text-sm font-medium text-gray-700'
								>
									Категория
								</label>
								<select
									id='categoryId'
									className='border mt-1 border-blue-950 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3'
									value={categoryId}
									onChange={e => setCategoryId(e.target.value)}
								>
									{category.map(item => (
										<option value={item.id} key={item.id} className='text-base'>
											{item.name}
										</option>
									))}
								</select>
							</div>

							<div className='mb-6'>
								<label
									htmlFor='description'
									className='block text-sm font-medium text-gray-700'
								>
									Описание
								</label>
								<textarea
									rows={6}
									id='description'
									className='mt-1 resize-none text-sm p-3 block border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
									value={description}
									onChange={handleDescriptionChange}
									placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
								/>
								<div className='text-right text-sm text-gray-500'>
									{charCount}/2000
								</div>
							</div>
							<div className='mb-6'>
								<label className='block text-sm font-medium text-gray-700'>
									Фото *
								</label>
								<div
									{...getRootProps()}
									className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer'
								>
									<input {...getInputProps()} />
									<div className='space-y-1 text-center'>
										<div className='flex text-sm text-gray-600'>
											<p className='pl-1'>
												Drag and drop or click here to select file
											</p>
										</div>
										<p className='text-xs text-gray-500'>
											PNG, JPG, GIF up to 10MB
										</p>
										{photo && (
											<p className='text-sm text-gray-500'>{photo.name}</p>
										)}
									</div>
								</div>
							</div>
							<div className='mb-6 space-x-3 flex'>
								<div className='w-full'>
									<label
										htmlFor='floorNumber'
										className='block text-sm font-medium text-gray-700'
									>
										Этаж
									</label>
									<input
										type='number'
										id='floorNumber'
										className='mt-1 px-5 py-3 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
										value={floorNumber}
										onChange={e => setFloorNumber(Number(e.target.value))}
										placeholder='1'
									/>{' '}
								</div>
								<div className='w-full'>
									<label
										htmlFor='roomNumber'
										className='block text-sm font-medium text-gray-700'
									>
										Комнат
									</label>
									<input
										type='number'
										id='roomNumber'
										className='mt-1 px-5 py-3 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
										value={roomNumber}
										onChange={e => setRoomNumber(Number(e.target.value))}
										placeholder='1'
									/>
								</div>
							</div>
							<div className='mb-6'>
								<label
									htmlFor='location'
									className='block text-sm font-medium text-gray-700'
								>
									Локация/Адрес
								</label>
								<input
									type='text'
									id='location'
									className='mt-1 px-5 py-3 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
									value={location}
									onChange={e => setLocation(e.target.value)}
									placeholder='Location'
								/>
							</div>
							<div className='mb-6'>
								<label
									htmlFor='ticketNumber'
									className='block text-sm font-medium text-gray-700'
								>
									Номер билета
								</label>
								<input
									type='number'
									id='ticketNumber'
									className='mt-1 px-5 py-3 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
									value={ticketNumber}
									onChange={e => setTicketNumber(Number(e.target.value))}
									placeholder='1'
								/>
							</div>
							<div className='mb-6'>
								<label
									htmlFor='ticketPrice'
									className='block text-sm font-medium text-gray-700'
								>
									Сумма
								</label>
								<input
									type='number'
									id='ticketPrice'
									className='mt-1 px-5 py-3 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
									value={ticketPrice}
									onChange={e => setTicketPrice(Number(e.target.value))}
									placeholder='0'
								/>
							</div>
						</div>
						<div className='flex justify-end space-x-4'>
							<button
								type='button'
								className='px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-3xl font-semibold hover:bg-indigo-50'
							>
								Save as Draft
							</button>
							<button
								type='submit'
								className='px-6 py-2 bg-indigo-600 text-white rounded-3xl font-semibold hover:bg-indigo-700'
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CreateProduct

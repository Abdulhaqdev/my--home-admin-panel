import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast, { Toaster } from 'react-hot-toast'
import { API_ENDPOINTS } from '../../service/ApiEndPoints'
import HttpClient from '../../service/HttpClient'
import appConfig from '../../config/appconfig'

function CreateCategory() {
	const [title, setTitle] = useState('')
	const [photo, setPhoto] = useState(null)

	const handleSubmit = async e => {
		e.preventDefault()

		const formData = new FormData()
		formData.append('name', title)
		if (photo) {
			formData.append('image', photo)
		}
		try {
			const response = await HttpClient.post(API_ENDPOINTS.CATEGORY, formData, {
				headers: {
					Authorization: `Bearer ${appConfig.token}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			toast.success(response.data.message)
			setTitle('')
			setPhoto(null)
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

	const onDrop = acceptedFiles => {
		setPhoto(acceptedFiles[0])
	}

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
	})

	return (
		<div className='bg-gray-100  min-h-screen ml-48 lg:ml-64 py-8 px-6'>
			<div className='rounded-2xl bg-white w-full'>
				<div>
					<Toaster />
				</div>
				<div className='w-full h-14 rounded-t-2xl bg-violet-800 flex items-center p-6'>
					<h2 className='text-white text-2xl'>Категория</h2>
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
										<svg
											className='mx-auto h-12 w-12 text-gray-400'
											stroke='currentColor'
											fill='none'
											viewBox='0 0 48 48'
											aria-hidden='true'
										>
											<path
												d='M28 8H14C12.8954 8 12 8.89543 12 10V38C12 39.1046 12.8954 40 14 40H34C35.1046 40 36 39.1046 36 38V16L28 8Z'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
											<path
												d='M28 8V16H36'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
											<path
												d='M22 28L18 34H30L26 28L22 22L18 28H30'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
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

export default CreateCategory

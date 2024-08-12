import { Link } from 'react-router-dom'
import SearchInput from '../../components/SearchInput'
import { useEffect, useState } from 'react'
import HttpClient from '../../service/HttpClient'
import { API_ENDPOINTS } from '../../service/ApiEndPoints'
import appConfig from '../../config/appconfig'
import Modal from '../../components/Dropdown'

function PostPage() {
	const [post, setPost] = useState([])
	const [showModal, setShowModal] = useState(false) // Use boolean
	const [selectedPostId, setSelectedPostId] = useState(null)

	const getPost = async () => {
		try {
			const response = await HttpClient.get(API_ENDPOINTS.POSTS, {
				headers: {
					Authorization: `Bearer ${appConfig.token}`,
				},
			})
			setPost(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		getPost()
	}, [])

	const handleDotsClick = postId => {
		setSelectedPostId(postId)
		setShowModal(true)
	}

	const deletePost = async id => {
		try {
			const response = await HttpClient.delete(`${API_ENDPOINTS.POSTS}/${id}`, {
				headers: {
					Authorization: `Bearer ${appConfig.token}`,
				},
			})
			setPost(prevPosts => prevPosts.filter(post => post.id !== id))
			console.log(response)
		} catch (error) {
			console.error(error)
		}
	}

	const handleOptionClick = action => {
		if (action === 'Удалить' && selectedPostId !== null) {
			deletePost(selectedPostId)
		}
		setShowModal(false)
	}

	return (
		<div className='bg-gray-100 ml-48 h-screen lg:ml-64 py-8 px-6'>
			<div>
				<div className='flex justify-between items-center'>
					<SearchInput />
					<Link
						to={'/createpost'}
						className='text-base border text-blue-900 border-blue-600 rounded-3xl py-2 px-9'
					>
						Создать пост
					</Link>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
					{post.map(item => (
						<div
							className='bg-white border rounded-2xl shadow-lg'
							key={item.id}
						>
							<div>
								<iframe
									width='360'
									height='180'
									src='https://www.youtube.com/embed/E12HxLlNlwI?si=zJVL6GrnkI03BLX-'
									title='YouTube video player'
									className='rounded-t-2xl w-full'
								></iframe>
							</div>
							<div className='p-3 space-y-3'>
								<div className='flex justify-between items-center'>
									<h2 className='text-2xl font-bold font-sans'>{item.title}</h2>
									<div
										className='flex space-x-0.5 cursor-pointer p-2 relative'
										onClick={() => handleDotsClick(item.id)}
									>
										<span className='h-1.5 w-1.5 bg-slate-400 rounded-full'></span>
										<span className='h-1.5 w-1.5 bg-slate-400 rounded-full'></span>
										<span className='h-1.5 w-1.5 bg-slate-400 rounded-full'></span>

										{showModal && selectedPostId === item.id && (
											<Modal
												showModal={true}
												onAction={handleOptionClick}
												onClose={() => setShowModal(false)}
											/>
										)}
									</div>
								</div>
								<p className='text-slate-500 text-xs'>{item.text}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default PostPage

import PropTypes from 'prop-types'

function Modal({ showModal, onClose, onAction }) {
	if (!showModal) return null

	return (
		<div className='absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50'>
			<div>
				<div
					className='py-1'
					role='menu'
					aria-orientation='vertical'
					aria-labelledby='options-menu'
				>
					<button
						onClick={() => onAction('Выделить')}
						className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
					>
						Выделить
					</button>
					<button
						onClick={() => onAction('Редактировать')}
						className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
					>
						Редактировать
					</button>
					<button
						onClick={() => onAction('Удалить')}
						className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
					>
						Удалить
					</button>
				</div>
				<button
					onClick={onClose}
					className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'
				>
					×
				</button>
			</div>
		</div>
	)
}

// PropTypes ni qo'shish
Modal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onAction: PropTypes.func.isRequired,
}

export default Modal

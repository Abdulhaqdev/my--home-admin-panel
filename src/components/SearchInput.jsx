import { IoSearch } from 'react-icons/io5'

function SearchInput() {
	return (
		<div>
			<label className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
				Search
			</label>
			<div className='relative'>
				<div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
					<IoSearch className='text-lg' />
				</div>
				<input
					type='search'
					id='default-search'
					className='block rounded-2xl w-full p-3 ps-10 text-sm bg-slate-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 transition-colors duration-200 ease-in-out'
					placeholder='Search here...'
					required
				/>
			</div>
		</div>
	)
}

export default SearchInput

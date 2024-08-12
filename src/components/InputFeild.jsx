function InputField({ id, label, value, placeholder, onChange }) {
	return (
		<div className='relative mb-6'>
			<label htmlFor={id} className='text-xl font-normal text-slate-500'>
				{label}
			</label>
			<input
				type='tel'
				id={id}
				value={value}
				onChange={onChange}
				className='w-full mt-4 bg-white rounded-lg border border-black focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out'
				placeholder={placeholder}
			/>
		</div>
	)
}

export default InputField

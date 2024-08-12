import { TbUserHexagon } from 'react-icons/tb'

const SettingsPage = () => {
	return (
		<div className='bg-gray-100  min-h-screen ml-48 lg:ml-64 py-8 px-6'>
			<div className='rounded-2xl bg-white w-full'>
				<div className='w-full h-14 rounded-t-2xl bg-violet-800 flex items-center p-6'>
					<h2 className='text-white text-2xl'>Пост</h2>
				</div>
				<div className='p-5 w-full'>
					<form>
						<table className='w-full'>
							<thead>
								<tr className='bg-slate-100 text-left text-sm font-bold uppercase tracking-widest text-slate-400 border-b-2'>
									<th className='px-5 py-3 flex items-center space-x-4 font-sans'>
										<TbUserHexagon className='text-2xl' />
										<h3>Логин</h3>
									</th>
									<th className='px-5 py-3'>Пароль</th>
									<th className='px-5 py-3'>Роль</th>
									<th className='px-5 py-3'></th>
									<th className='px-5 py-3'></th>
									<th className='px-5 py-3'>Действие</th>
								</tr>
							</thead>
							<tbody className='text-gray-500'>
								<tr className='border-b-slate-100 rounded-2xl cursor-pointer'>
									<td className='border-b border-gray-200 bg-white px-5 py-5 text-sm'>
										<div className='flex items-center'>
											<span className='h-8 w-8 bg-slate-200 rounded-full'></span>
											<div className='ml-3'>
												<p className='whitespace-no-wrap'>Admin</p>
											</div>
										</div>
									</td>
									<td className='border-b border-gray-200 bg-white px-5 py-5 text-sm'>
										<p className='whitespace-no-wrap text-3xl'>...........</p>
									</td>
									<td className='border-b border-gray-200 bg-white px-5 py-5 text-sm'>
										<p className='whitespace-no-wrap'> admin</p>
									</td>
									<td className='border-b border-gray-200 bg-white px-5 py-5 text-sm'>
										<p className='whitespace-no-wrap'></p>
									</td>
									<td className='px-5 py-5 bg-white border-b'></td>
									<td className='border-b border-gray-200 bg-white px-5 py-5 text-sm'>
										<div className='flex space-x-0.5 pl-6'>
											<span className='h-1.5 w-1.5 bg-slate-400 rounded-full'></span>
											<span className='h-1.5 w-1.5 bg-slate-400 rounded-full'></span>
											<span className='h-1.5 w-1.5 bg-slate-400 rounded-full'></span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
			</div>
		</div>
	)
}

export default SettingsPage

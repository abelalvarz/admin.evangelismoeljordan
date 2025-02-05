
import React, { useState } from 'react'
import { BiMenu } from "react-icons/bi";
import { CgClose } from 'react-icons/cg';
import { AppRoutes } from '../config/AppRoutes';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {

	const [visible, setVisible] = useState(false)
	const location = useLocation()

	console.log(location.pathname)

	return (
		<React.Fragment>
			<div className='w-full fixed z-20 '>
				<button
					onClick={() => setVisible(!visible)}
					className="md:hidden absolute flex justify-center items-center w-[40px] h-[40px] rounded-full right-10 top-3 ">
					{
						visible ? null : <BiMenu size={25} />
					}
				</button>
			</div>
			<div
				className={`fixed bg-blue-950 lg:w-[12%] h-full md:w-[10%] md:ml-0 sm:w-full sm:z-10 ${visible ? 'max-sm:ml-[0] sm:ml-[0]' : 'max-sm:ml-[-100%] sm:ml-[-100%]'} max-sm:w-full max-sm:z-10 duration-500`}      >
				<ul>
					<button
						className='absolute top-5 right-10 '
						onClick={() => setVisible(!visible)}
					>
						<CgClose
							className='md:hidden'
							size={25} />
					</button>

					<div className=' px-5 py-5 '>
						<h1 className='text-3xl font-bold text-white'>Evangelismo</h1>
					</div>
					{
						AppRoutes.map((route, i) => {
							if (!route.icon) return;
							return (
								<Link
									key={i}
									className={`${location.pathname === route.path ? 'text-white' : 'text-gray-400'} w-full px-5 py-2 mt-2 flex items-center  text-sm duration-200`}
									to={route.path}>
									<span className='mr-2'> {route.icon}</span>
									<span> {route.name}</span>
								</Link>
							)
						})
					}
				</ul>
			</div>
		</React.Fragment>
	)
}

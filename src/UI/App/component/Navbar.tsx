import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PrivateRoutes } from '../config/AppRoutes'
import { Link } from 'react-router-dom'
import { CiLogout } from 'react-icons/ci'
import { BiMenu } from 'react-icons/bi'
import { CgClose } from 'react-icons/cg'

export const Navbar = () => {

    const auth = useAuth()
    const [visible, setVisible] = useState(false)
    const location = useLocation()

    if (!auth?.loggedUser.logged) {
        return <></>;
    }

    return (
        <React.Fragment>
            <div className='md:hidden absolute top-0 rigth-0 w-full bg-red-200'>
                <button
                    onClick={() => setVisible(!visible)}
                    className="lg:hidden absolute flex justify-center items-center w-[40px] h-[40px] rounded-full right-10 top-3 z-40 ">
                    <BiMenu className={` ${visible ? 'hidden' : 'visible'}`} size={25} />
                    <CgClose className={` ${visible ? 'visible text-white' : 'hidden'}`} size={25} />
                </button>
            </div>
            {/* Menu content */}
            <div className={`2xl:w-[15rem] xl:w-[12rem] md:w-[10rem] w-full md:z-0  fixed h-full z-30 duration-700 bg-slate-800 ${visible ? 'ml-0' : 'ml-[-200%]  '} md:ml-0`}>
                <div className='px-5 py-5  flex flex-col '>
                    <h1 className='md:text-xl text-2xl font-bold text-white whitespace-nowrap'>Evangelismo</h1>
                    <small className='text-white'>El Jordan</small>
                </div>
                <div className='w-full'>
                    {
                        PrivateRoutes.map((route, i) => {
                            if (!route.icon) return;
                            // if (isSmallScreen() && route.path === '/proyectar')
                            //     return;
                            return (
                                <Link
                                    key={i}
                                    onClick={() => setVisible(!visible)}
                                    className={`${location.pathname.includes(route.path) ? 'text-blue-400 bg-gradient-to-r from-[#2a3d65] to-transparent border-l-[5px] border-blue-500' : 'text-gray-300'} w-full px-5 py-2 mt-2 flex items-center  text-sm duration-200`}
                                    to={route.path}>
                                    <span className='mr-3'> {route.icon}</span>
                                    <span> {route.name}</span>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className='absolute w-full flex  items-center bottom-2 px-5 py-5 '>
                    <button
                        className='text-white flex justify-center  items-center'
                        onClick={() => { auth.logout() }}>
                        <CiLogout className='mr-3' size={25} />
                        <span >Cerrar Sesión</span>
                    </button>
                </div>
            </div>
        </React.Fragment>

    )
}

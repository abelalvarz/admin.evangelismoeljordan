import React from 'react'
import { BsHouse, BsPeople } from "react-icons/bs"
import { GoPeople } from "react-icons/go"
import { TbFriends } from "react-icons/tb"
import { ProgressSpinner } from "primereact/progressspinner";

interface Props {
    summary: any,
    loading: boolean
}

export const ResumeCards = ({ loading, summary}: Props) => {



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4  gap-4">
            <div className="bg-gray-50 border-r-8 border-blue-500 p-5 py-5 rounded-md flex items-center  max-md:mb-1">
                {
                    loading
                        ? <ProgressSpinner className="w-[50px] h-[50px]" />
                        : <React.Fragment>
                            <div className='p-5 bg-blue-400 rounded-full mr-3'>
                                <BsPeople size={30} color='white' />
                            </div>
                            <div>
                                <h1 className='text-3xl font-bold'>{summary.totalAttendance}</h1>
                                <h3 className='text-sm'>Asistencia Total</h3>
                            </div>
                        </React.Fragment>
                }

            </div>
            <div className="bg-gray-50 border-r-8 border-green-500 p-5 py-5 rounded-md flex items-center  max-md:mb-1">
                {
                    loading
                        ? <ProgressSpinner className="w-[50px] h-[50px]" />
                        : <React.Fragment>
                            <div className='p-5 bg-green-400 rounded-full mr-3'>
                                <TbFriends size={30} color='white' />
                            </div>
                            <div>
                                <h1 className='text-3xl font-bold'>{summary.totalVisitors}</h1>
                                <h3 className='text-sm'>Total Visitantes</h3>
                            </div>
                        </React.Fragment>
                }
            </div>
            <div className="bg-gray-50 border-r-8 border-orange-500 p-5 py-5 rounded-md flex items-center  max-md:mb-1">
                {
                    loading
                        ? <ProgressSpinner className="w-[50px] h-[50px]" />
                        : <React.Fragment>
                            <div className='p-5 bg-orange-400 rounded-full mr-3'>
                                <BsHouse size={30} color='white' />
                            </div>
                            <div>
                                <h1 className='text-3xl font-bold'>{summary.totalHomeVisited}</h1>
                                <h3 className='text-sm'>Hogares Visitados</h3>
                            </div>
                        </React.Fragment>
                }
            </div>
            <div className="bg-gray-50 border-r-8 border-red-500 p-5 py-5 rounded-md flex items-center  max-md:mb-1">
                {
                    loading
                        ? <ProgressSpinner className="w-[50px] h-[50px]" />
                        : <React.Fragment>
                            <div className='p-5 bg-red-400 rounded-full mr-3'>
                                <GoPeople size={30} color='white' />
                            </div>
                            <div>
                                <h1 className='text-3xl font-bold'>{summary.totalNewChristians}</h1>
                                <h3 className='text-sm'>Acceptados</h3>
                            </div>
                        </React.Fragment>
                }
            </div>
        </div>
    )
}

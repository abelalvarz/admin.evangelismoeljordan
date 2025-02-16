import { BsHouse, BsPeople } from 'react-icons/bs'
import { TbFriends } from 'react-icons/tb'
import { GoPeople } from 'react-icons/go'
import { useEffect, useState } from 'react'
import { SummaryReport } from '../../../../Core/Reports/application/dtos/SummaryReport'
import { ReportService } from '../../../../Core/Reports/infrastructure/service/ReportService'

interface Props {
    initialDate: Date,
    finalDate: Date
}

const initialState: SummaryReport = {
    totalAttendance: "",
    totalHomeVisited: "",
    totalVisitors: "",
    totalNewChristians: ""
}

export const ResumeCardComponent = ({ initialDate, finalDate }: Props) => {

    const reportService = ReportService;
    const [summary, setSummary] = useState<SummaryReport>(initialState)

    useEffect(() => {
        if (initialDate && finalDate) {
            getSummaryReport();
        }
    }, [initialDate, finalDate]);

    const getSummaryReport = async () => {
        const response = await reportService.getSummaryReport.execute(initialDate, finalDate);
        setSummary(response)
    };

    return (
        <div className='flex justify-between '>
            <div className='bg-gray-50 p-5 py-10 rounded-md flex items-center w-full mr-5'>
                <div className='p-5 bg-blue-300 rounded-full mr-3'>
                    <BsPeople size={30} color='blue' />
                </div>
                <div>
                    <h1 className='text-3xl font-bold'>{summary.totalAttendance}</h1>
                    <h3>Asistencia Total</h3>
                </div>
            </div>
            <div className='bg-gray-50 p-5 py-10 rounded-md flex items-center w-full mr-5'>
                <div className='p-5 bg-blue-300 rounded-full mr-3'>
                    <TbFriends size={30} color='blue' />
                </div>
                <div>
                    <h1 className='text-3xl font-bold'>{summary.totalVisitors}</h1>
                    <h3>Total Visitantes</h3>
                </div>
            </div>
            <div className='bg-gray-50 p-5 py-10 rounded-md flex items-center w-full mr-5'>
                <div className='p-5 bg-blue-300 rounded-full mr-3'>
                    <BsHouse size={30} color='blue' />
                </div>
                <div>
                    <h1 className='text-3xl font-bold'>{summary.totalHomeVisited}</h1>
                    <h3>Hogares Visitados</h3>
                </div>
            </div>
            <div className='bg-gray-50 p-5 py-10 rounded-md flex items-center w-full '>
                <div className='p-5 bg-blue-300 rounded-full mr-3'>
                    <GoPeople size={30} color='blue' />
                </div>
                <div>
                    <h1 className='text-3xl font-bold'>{summary.totalNewChristians}</h1>
                    <h3>Acceptados</h3>
                </div>
            </div>
        </div>
    )
}

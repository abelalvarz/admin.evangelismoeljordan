import { MonthSummaryResponse } from "../../../../Core/Reports/application/useCases/GetSummaryReportUseCase/dto"
import { AttendanceByGroupChart } from "./chart.AttendanceByGroup"
import { CategoryAttendanceChart } from "./chart.CategoryAttendance"
import { MonthAttendanceSummaryChar } from "./chart.MonthAttendanceSummary"

interface Props {
    groupsSummary: any,
    categoriesSummary: any,
    totalMonthSummary: MonthSummaryResponse | null
    loading: boolean
}
export const Charts = ({ groupsSummary, categoriesSummary,totalMonthSummary, loading }: Props) => {
    return (
        <div className="w-full h-full mt-3 flex flex-col">
            <div className="flex flex-col lg:flex-row justify-between h-[50%] mb-3">
                <div className="w-full lg:w-[70%] bg-white h-full p-5 rounded-md flex flex-col">
                    <h1 className='text-xl text-gray-700 font-bold max-lg:text-xl mb-5'>Asistencia Total Por Grupo</h1>
                    <div className="w-full h-full flex justify-center items-center">
                        <AttendanceByGroupChart data={groupsSummary} loading={loading}/>
                    </div>
                </div>
                <div className="w-full lg:w-[30%]  bg-white h-full p-5 rounded-md flex flex-col lg:mt-0 mt-3 lg:ml-5 ">
                    <h1 className='text-xl text-gray-700  font-bold max-lg:text-xl '>Asistencia Por Categorias</h1>
                    <div className="w-full h-full flex justify-center items-center mb-5">
                        <CategoryAttendanceChart data={categoriesSummary} loading={loading}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between h-[50%] mb-3 md:mb-0">
                <div className="w-full lg:w-[100%] bg-white h-full p-5 rounded-md flex flex-col">
                    <h1 className='text-xl text-gray-700 font-bold max-lg:text-xl mb-5'>Asistencia Total Ultimas 4 Semanas</h1>
                    <div className="w-full h-full flex justify-center items-center">
                        <MonthAttendanceSummaryChar data={totalMonthSummary} loading={loading}/>
                    </div>
                </div>
                {/* <div className="w-full lg:w-[50%]  bg-white lg:mt-0 mt-3 lg:ml-5 h-full p-5 rounded-md">
                    <h1 className='text-xl text-gray-700  font-bold max-lg:text-xl'>Resumen del Año</h1>
                    <div className="w-full h-full flex justify-center items-center">
                    </div>
                </div> */}
            </div>
        </div>
    )
}

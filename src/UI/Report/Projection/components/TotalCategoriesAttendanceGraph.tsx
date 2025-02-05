
import { PieChart } from "../../../App/styled-components/PieChart"



export const TotalCategoriesAttendanceGraph = ({data}:any) => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center p-10'>
            <div className='title-container mb-20'>
                <h1 className='text-5xl font-bold'>Asistencia Total por Categorias</h1>
            </div>
            <PieChart params={data} />
        </div>
    )
}

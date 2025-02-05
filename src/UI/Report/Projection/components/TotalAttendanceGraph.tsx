import { BarChart } from '../../../App/styled-components/BarChart'


export const TotalAttendanceGraph = ({ data }: any) => {

    return (
        <div className='w-full h-full flex flex-col justify-center items-center p-10'>
            <div className='title-container mb-20'>
                <h1 className='text-5xl font-bold'>Asistencia Total por Grupo</h1>
            </div>
            <BarChart label={data.labels} value={data.values} colors={data.colors} />
        </div>
    )
}

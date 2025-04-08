import { TotalAttendanceGrafic } from './TotalAttendanceGrafic';
import { CategoryAttendanceGrafic } from './CategoryAttendanceGrafic';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Prosp {
    initialDate: any;
    finalDate: any;
}

export const GraficsComponent = ({ initialDate, finalDate }: Prosp) => {
    return (
        <div className='w-full flex justify-between items-center max-md:h-full '>
            <div
                className="w-full flex justify-between items-center h-[60vh]  max-md:flex-col max-md:h-full max-md:my-10 ">
                <div className='w-[70%] h-full flex flex-col justify-center bg-gray-100 p-5 rounded-lg max-md:w-full'>
                    <div className='h-[15%] '>
                        <h1 className='text-3xl font-bold max-md:text-xl'>Asistencia Total Por Grupo</h1>
                        <p className='max-md:text-sm'>{initialDate && format(initialDate, "EEEE d 'de' MMMM", { locale: es })} a {finalDate && format(finalDate, "EEEE d 'de' MMMM", { locale: es })}</p>
                    </div>
                    <div className='h-[85%] flex justify-center items-center max-md:w-full max-md:text-sm'>
                        <TotalAttendanceGrafic initialDate={initialDate} finalDate={finalDate} />
                    </div>
                </div>
                <div className='ml-2 w-[30%] h-full flex flex-col justify-center bg-gray-100 p-5 rounded-lg max-md:w-full max-md:ml-0 max-md:my-2'>
                    <div className='h-[15%] '>
                        <h1 className='text-3xl font-bold max-md:text-xl'>Asistencia Por Categorias</h1>
                        <p className='max-md:text-sm'>{initialDate && format(initialDate, "EEEE d 'de' MMMM", { locale: es })} a {finalDate && format(finalDate, "EEEE d 'de' MMMM", { locale: es })}</p>
                    </div>
                    <div className='h-[85%] flex justify-center items-center '>
                        <CategoryAttendanceGrafic initialDate={initialDate} finalDate={finalDate} />
                    </div>
                </div>
            </div>
        </div>
    )
}

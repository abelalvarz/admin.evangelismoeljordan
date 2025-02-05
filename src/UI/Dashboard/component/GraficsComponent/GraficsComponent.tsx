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
        <div className='w-full flex justify-between items-center '>
            <div
                className="w-full flex justify-between items-center h-[60vh]  ">
                <div className='w-[70%] h-full flex flex-col justify-center bg-gray-100 p-5 rounded-lg'>
                    <div className='h-[15%] '>
                        <h1 className='text-3xl font-bold'>Asistencia Total Por Grupo</h1>
                        <p>{initialDate && format(initialDate, "EEEE d 'de' MMMM", { locale: es })} a {finalDate && format(finalDate, "EEEE d 'de' MMMM", { locale: es })}</p>
                    </div>
                    <div className='h-[85%] flex justify-center items-center '>
                        <TotalAttendanceGrafic initialDate={initialDate} finalDate={finalDate} />
                    </div>
                </div>
                <div className='ml-2 w-[30%] h-full flex flex-col justify-center bg-gray-100 p-5 rounded-lg'>
                    <div className='h-[15%] '>
                        <h1 className='text-3xl font-bold'>Asistencia Por Categorias</h1>
                        <p>{initialDate && format(initialDate, "EEEE d 'de' MMMM", { locale: es })} a {finalDate && format(finalDate, "EEEE d 'de' MMMM", { locale: es })}</p>
                    </div>
                    <div className='h-[85%] flex justify-center items-center '>
                        <CategoryAttendanceGrafic initialDate={initialDate} finalDate={finalDate} />
                    </div>
                </div>
            </div>
        </div>
    )
}

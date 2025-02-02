import { FullScreenComponent } from '../../styled-component/FullScreenComponent';
import { TotalAttendanceGrafic } from './TotalAttendanceGrafic';
import { CategoryAttendanceGrafic } from './CategoryAttendanceGrafic';
import { CardContainer } from '../../styled-component/CardContainer';

interface Prosp {
    initialDate: any;
    finalDate: any;
}

export const GraficsComponent = ({ initialDate, finalDate }: Prosp) => {
    return (
        <div className='flex justify-between items-center h-[60vh]'>
            <FullScreenComponent
                className="w-full flex justify-between items-center h-[60vh] ">
                <CardContainer
                    title='Asistencia Total Por Grupo'
                    className='w-[70%] h-full mr-2 bg-gray-50 rounded-md'
                    initialDate={initialDate}
                    finalDate={finalDate}>
                    <TotalAttendanceGrafic initialDate={initialDate} finalDate={finalDate} />
                </CardContainer>
                <CardContainer
                    title='Categorias'
                    className='w-[30%] h-full bg-gray-50 rounded-md'
                    contentClassName=""
                    initialDate={initialDate}
                    finalDate={finalDate}>
                    <CategoryAttendanceGrafic initialDate={initialDate} finalDate={finalDate} />
                </CardContainer>
            </FullScreenComponent>
        </div>
    )
}

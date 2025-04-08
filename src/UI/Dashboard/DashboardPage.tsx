import { useState } from 'react'
import { ResumeCardComponent } from './component/ResumenCardComponent/ResumeCardComponent'
import { GraficsComponent } from './component/GraficsComponent/GraficsComponent'
import { FilterDataComponent } from '../App/component/FilterDataComponent'
import '../App/utils/locale'
export const DashboardPage = () => {

    const initialDateRange = {
        initial: null,
        final: null
    }
    
    const [rangeOfDate, setRangeOfDate] = useState<any>(initialDateRange)

    const handleRangeOnChange = (value: any) => setRangeOfDate((prev: any) => ({ ...prev, ...value }))

    return (
        <div className='page-container'>
            <div className='relative h-full flex flex-col justify-around  '>
                <div className="title-container">
                    <h1 className="title-content">Dashboard</h1>
                </div>
                <FilterDataComponent handleRangeOnChange={handleRangeOnChange} />
                <ResumeCardComponent initialDate={rangeOfDate.initial} finalDate={rangeOfDate.final} />
                <GraficsComponent initialDate={rangeOfDate.initial} finalDate={rangeOfDate.final} />
            </div>
        </div>
    )
}

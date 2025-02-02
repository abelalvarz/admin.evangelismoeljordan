import { useState } from 'react'
import { ResumeCardComponent } from './component/ResumenCardComponent/ResumeCardComponent'
import { GraficsComponent } from './component/GraficsComponent/GraficsComponent'
import { FilterComponents } from './component/FilterComponent/FilterComponents'

export const DashboardPage = () => {

    const [rangeOfDate, setRangeOfDate] = useState<any>([])

    const handleRangeOnChange = (value: []) => setRangeOfDate(value)

    return (
        <div className='page-container'>
            <div className='relative h-full flex flex-col justify-evenly '>
                <FilterComponents dateRange={rangeOfDate} handleRangeOnChange={handleRangeOnChange} />
                <ResumeCardComponent initialDate={rangeOfDate[0]} finalDate={rangeOfDate[1]} />
                <GraficsComponent initialDate={rangeOfDate[0]} finalDate={rangeOfDate[1]} />
            </div>
        </div>
    )
}

import { useEffect } from 'react'
import { Calendar } from 'primereact/calendar'
import { getPeriodTime } from '../../../App/utils/getPeriodOfTime';

interface Props {
    dateRange: []
    handleRangeOnChange: (value: any) => void;
}

export const FilterComponents = ({ dateRange, handleRangeOnChange }: Props) => {

    useEffect(() => {
        handleWeekSelection(12)
    }, [])

    const handleWeekSelection = (periodTime: number) => {
        const date = getPeriodTime(periodTime)
        handleRangeOnChange(date)
    }

    return (
        <div className='p-5 justify-between items-center bg-gray-50 h-[10vh] flex rounded-md '>
            <h2 className='text-3xl font-bold'>Dashboard</h2>
            <div className='flex'>
                <div className='flex flex-col  items-center justify-center mr-2 '>
                    <button
                        className='bg-gray-100 p-2 rounded-md hover:bg-slate-300'
                        onClick={() => handleWeekSelection(12)}>
                        Ultima semana
                    </button>
                </div>
                <div className='flex flex-col  items-center justify-center mr-2'>
                    <button
                        className='bg-gray-100 p-2 rounded-md hover:bg-slate-300'
                        onClick={() => handleWeekSelection(5)} >
                        Penultima semana
                    </button>
                </div>
                <div className='flex flex-col items-center justify-center mr-2'>
                    <button
                        className='bg-gray-100 p-2 rounded-md hover:bg-slate-300'
                        onClick={() => handleWeekSelection(-2)}>
                        Antepenultima semana
                    </button>
                </div>
                <div className='flex flex-col bg-gray-100 items-center justify-center rounded-md mr-2'>
                    <Calendar
                        value={dateRange}
                        onChange={(e: any) => handleRangeOnChange(e.value)}
                        inputClassName='p-2 '
                        className='bg-blue-400 mx-0 rounded-md'
                        selectionMode="range"
                        readOnlyInput
                        hideOnRangeSelection
                        showIcon />
                </div>
            </div>
        </div>
    )
}

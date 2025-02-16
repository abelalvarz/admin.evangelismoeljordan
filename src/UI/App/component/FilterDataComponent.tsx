import { Calendar } from 'primereact/calendar';
import { useEffect, useState } from 'react'
import { getPeriodTime } from '../utils/getPeriodOfTime';

interface Props {
    handleRangeOnChange: (value: any) => void;
}

export const FilterDataComponent = ({ handleRangeOnChange }: Props) => {

    const initialSelectDate = {
        initial: null,
        final: null
    }
    
    const [selectedFilter, setSelectedFilter] = useState<string>('currentWeek')
    const [selectedDate, setSelectedDate] = useState(initialSelectDate)

    useEffect(() => {
        handleWeekSelection(12)
    }, [])

    const handleDateOnchange = (newValues: object) => {
        setSelectedFilter("custom")
        setSelectedDate((prev: any) => ({
            ...prev, newValues
        }))
        handleRangeOnChange(newValues)
    }

    const handleWeekSelection = (periodTime: number) => {
        const date = getPeriodTime(periodTime)
        handleRangeOnChange(date)
    }

    const handleFilter = (filterType: string, periodTime: number) => {
        setSelectedFilter(filterType)
        handleWeekSelection(periodTime)
    }

    const filterButtonStyle = (value: any) => `pr-2 py-2 border-b-2 hover:text-gray-950 ${selectedFilter === value ? 'border-b-blue-400 duration-700 font-bold' : ' text-gray-600'}`;

    return (
        <div className="flex justify-between items-center h-20">
            <div>
                <button
                    name="currentWeek"
                    onClick={() => handleFilter("currentWeek", 12)}
                    className={filterButtonStyle("currentWeek")}>
                    Semana Actual
                </button>
                <button
                    name="lastWeek"
                    onClick={() => handleFilter("lastWeek", 5)}
                    className={filterButtonStyle("lastWeek")}>
                    Semana Pasada
                </button>
                <button
                    name="beforeLastWeek"
                    onClick={() => handleFilter("beforeLastWeek", -2)}
                    className={filterButtonStyle("beforeLastWeek")} >
                    Semana Antepasada
                </button>
            </div>
            <div className='flex'>
                <div className='flex flex-col mr-2 '>
                    <label className='text-sm ' htmlFor="">Fecha inicial: </label>
                    <Calendar
                        value={selectedDate.initial}
                        onChange={(e: any) => handleDateOnchange({ initial: e.value })}
                        inputClassName='px-2 py-1 w-40'
                        className='bg-gray-100 mx-0 rounded-md'
                        selectionMode="single"
                        readOnlyInput
                        placeholder='Seleccionar'
                        hideOnRangeSelection
                        icon="pi pi-angle-down"
                        showIcon />
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm' htmlFor="">Fecha final: </label>
                    <Calendar
                        value={selectedDate.final}
                        onChange={(e: any) => handleDateOnchange({ final: e.value })}
                        inputClassName='px-2  py-1 w-40'
                        className='bg-gray-100 mx-0  rounded-md'
                        selectionMode="single"
                        readOnlyInput
                        placeholder='Seleccionar'
                        hideOnRangeSelection
                        icon="pi pi-angle-down"
                        showIcon />
                </div>
            </div>
        </div>
    )
}

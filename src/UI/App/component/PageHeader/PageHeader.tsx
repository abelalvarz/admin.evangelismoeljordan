import { Calendar } from "primereact/calendar"
import { useEffect, useState } from "react"
import { getPeriodTime } from "../../utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export const PageHeader = ({ title, dateValue, dateOnChange }: any) => {

    const [selectedFilter, setSelectedFilter] = useState("currentWeek")

    useEffect(() => {
        handleWeekSelection(0)
    }, [])

    const handleWeekSelection = (periodTime: number) => {
        const date = getPeriodTime(periodTime)
        dateOnChange([date.initial, date.final])
    }

    const handleFilter = (filterType: string, periodTime: number) => {
        setSelectedFilter(filterType)
        handleWeekSelection(periodTime)
    }

    return (
        <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center ">
            <div className="flex flex-col min-w-[18rem] ">
                <h1 className="text-xl font-semibold">{title}</h1>
                <small className="text-gray-600">
                    {dateValue[0] && format(dateValue[0], "EEEE d MMMM, yyyy", { locale: es })} - {dateValue[1] && format(dateValue[1], "EEEE d MMMM, yyyy", { locale: es })}
                </small>
            </div>
            <div className="flex space-x-2 max-md:overflow-x-scroll ">
                <button
                    onClick={() => handleFilter("currentWeek", 0)}
                    className={`py-2 text-white text-xs lg:text-sm whitespace-nowrap px-4 rounded-md mr-1 bg-blue-400 hover:bg-blue-500 ${selectedFilter === 'currentWeek' ? 'bg-blue-600' : ''}`}>
                    Semana Actual
                </button>
                <button
                    onClick={() => handleFilter("lastWeek", 1)}
                    className={`py-2 text-white text-xs lg:text-sm whitespace-nowrap px-4 rounded-md mr-1 bg-blue-400 hover:bg-blue-500 ${selectedFilter === 'lastWeek' ? 'bg-blue-600' : ''}`}>

                    Semana Pasada
                </button>
                <button
                    onClick={() => handleFilter("beforeLastWeek", 2)}
                    className={`py-2 text-white text-xs lg:text-sm whitespace-nowrap px-4 rounded-md mr-1 bg-blue-400 hover:bg-blue-500 ${selectedFilter === 'beforeLastWeek' ? 'bg-blue-600' : ''}`}>

                    Hace 2 Semanas
                </button>

                <Calendar
                    className={`text-white text-xs lg:text-sm whitespace-nowrap  rounded-md rounded-l-xl bg-blue-400 hover:bg-blue-500 ${selectedFilter === 'calendar' ? 'bg-blue-600' : ''}`}
                    inputClassName="py-2 px-4  text-gray-600 text-xs lg:text-sm whitespace-nowrap rounded-l-md"
                    readOnlyInput
                    hideOnRangeSelection
                    selectionMode='range'
                    value={dateValue}
                    locale="es"
                    maxDate={new Date()}
                    onChange={(e) =>{ setSelectedFilter('calendar'), dateOnChange(e.value)}}
                    showIcon />
            </div>
        </div>
    )
}

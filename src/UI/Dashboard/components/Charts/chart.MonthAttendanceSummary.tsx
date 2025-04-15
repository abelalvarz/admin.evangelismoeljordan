import { ProgressSpinner } from "primereact/progressspinner";
import { PiEmptyBold } from "react-icons/pi";
import { MonthSummaryResponse } from "../../../../Core/Reports/application/useCases/GetSummaryReportUseCase/dto";
import { LineChart } from "../../../App/styled-components/LineChart";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";


export const MonthAttendanceSummaryChar = ({ data, loading }: { data: MonthSummaryResponse | null, loading: boolean }) => {

    const [weeks, setWeeks] = useState<any[][]>([])


    useEffect(() => {

        if (data && data.weeks) {
            processWeeks()
        }
    }, [data])
    
    const processWeeks = () => {
        const weekData:any[] =[]

        data?.weeks.forEach((week) => {
            const proceesWeek = []
            const w = `${format(week[0], "EEEE d MMMM", { locale: es })} - ${format(week[1], "EEEE d MMMM", { locale: es })}`;
            proceesWeek.push(w)
            weekData.push(proceesWeek)
        })
        setWeeks(weekData)
    }

    if (loading)
        return <ProgressSpinner />

    if (data?.totalAttendance === null && !loading)
        return <h1 className="text-gray-400">Sin resultados <PiEmptyBold size={100} /> </h1>

    return (
        <LineChart label={weeks} value={data !== null ? data.totalAttendance : []} />
    )
}

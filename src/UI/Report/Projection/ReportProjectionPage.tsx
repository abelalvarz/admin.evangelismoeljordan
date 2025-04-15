import React, { useEffect, useMemo, useState } from "react"
import { FullScreenComponent } from "./components/FullScreenComponent"
import { useGetTotalAttendance } from "./hooks/useGetTotalAttendance"
import { useGetAllReports } from "../utils/customeHooks/useGetAllReports"
import { ReportDetailComponent } from "../utils/components/ReportDetailComponet.tsx/ReportDetailComponent"
import { PiEmptyBold } from "react-icons/pi"
import { PageHeader } from "../../App/component/PageHeader"
import { AttendanceByGroupChart } from "../../Dashboard/components/Charts/chart.AttendanceByGroup"
import { CategoryAttendanceChart } from "../../Dashboard/components/Charts/chart.CategoryAttendance"

export const ReportProjectionPage = () => {

    const { reports, date, seDate } = useGetAllReports();
    const { loading, categoriesSummary, attendanceSummary } = useGetTotalAttendance({ initialDate: date[0], finalDate: date[1] })
    const [active, setActive] = useState(0);

    useEffect(() => {
        setActive(0)
    }, [date])

    const projectionData = useMemo(() => {
        return [
            ...reports,
            { type: "attendanceSummary" },
            { type: "categoriesSummary" }
        ]
    }, [reports, attendanceSummary, categoriesSummary])

    return (
        <div className='page-container'>

            <div className='w-full'>
                <PageHeader title="Presentación de Reportes" dateOnChange={(e: any) => seDate(e)} dateValue={date} />
            </div>

            <FullScreenComponent dataSize={projectionData.length} handleOnchange={setActive}>
                <div className="w-full h-full bg-gray-50 flex justify-center items-center rounded-lg">
                    {reports.length > 0 && projectionData.map((item: any, index: any) => (
                        <React.Fragment key={index}>
                            {item.type === 'attendanceSummary' && (
                                <div className={`w-[90%] h-[80%] flex flex-col justify-center items-center box-border ${active === index ? '' : 'hidden'} `}>
                                    <AttendanceByGroupChart data={attendanceSummary} loading={loading} />
                                </div>
                            )}
                            {item.type === 'categoriesSummary' && (
                                <div className={`w-[90%] h-[80%] flex justify-center items-center box-border ${active === index ? '' : 'hidden'} `}>
                                    <CategoryAttendanceChart data={categoriesSummary} loading={loading} />
                                </div>
                            )}
                            {item.type !== 'attendanceSummary' && item.type !== 'categoriesSummary' && (
                                <div className={`w-full h-[85%] max-md:h-full flex justify-center items-center ${active === index ? '' : 'hidden'} `}>
                                    <ReportDetailComponent data={item} isProjection />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                    {reports.length === 0 && (
                        <h1 className="text-gray-400">Sin resultados <PiEmptyBold size={100} /> </h1>
                    )}
                </div>
            </FullScreenComponent>
        </div>
    )
}

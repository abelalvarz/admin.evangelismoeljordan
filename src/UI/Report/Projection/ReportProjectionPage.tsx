import React, { useEffect, useMemo, useState } from "react"
import { FilterDataComponent } from "../../App/component/FilterDataComponent"
import { FullScreenComponent } from "./components/FullScreenComponent"
import { TotalAttendanceGraph } from "./components/TotalAttendanceGraph"
import { TotalCategoriesAttendanceGraph } from "./components/TotalCategoriesAttendanceGraph"
import { useGetTotalAttendance } from "./hooks/useGetTotalAttendance"
import { useGetTotalAttendanceByCategory } from "./hooks/useGetTotalAttendanceByCategory"
import { useGetAllReports } from "../utils/customeHooks/useGetAllReports"
import { ReportDetailComponent } from "../utils/components/ReportDetailComponet.tsx/ReportDetailComponent"
import { PiEmptyBold } from "react-icons/pi"

export const ReportProjectionPage = () => {

    const { reports, rangeOfDate, handleRangeOnChange } = useGetAllReports();
    const { totalAttendance } = useGetTotalAttendance({ initialDate: rangeOfDate.initial, finalDate: rangeOfDate.final })
    const { totalCategories } = useGetTotalAttendanceByCategory({ initialDate: rangeOfDate.initial, finalDate: rangeOfDate.final })

    const [active, setActive] = useState(0);

    useEffect(() => {
        setActive(0)
    }, [rangeOfDate])

    const projectionData = useMemo(() => {
        return [
            ...reports,
            { type: "totalAttendance" },
            { type: "attendanceByCategory" }
        ]
    }, [reports, totalAttendance, totalCategories])

    return (
        <div className='page-container'>

            <div className='title-container max-md:mt-10'>
                <h1 className='title-content '>Presentación de Reportes</h1>
            </div>

            <FilterDataComponent handleRangeOnChange={handleRangeOnChange} />

            <FullScreenComponent dataSize={projectionData.length} handleOnchange={setActive}>
                <div className="w-full h-full bg-gray-50 flex justify-center items-center rounded-lg">
                    {reports.length > 0 && projectionData.map((item: any, index: any) => (
                        <React.Fragment key={index}>
                            {item.type === 'totalAttendance' && (
                                <div className={`w-[90%] h-[80%] flex flex-col justify-center items-center box-border ${active === index ? '' : 'hidden'} `}>
                                    <TotalAttendanceGraph data={totalAttendance} />
                                </div>
                            )}
                            {item.type === 'attendanceByCategory' && (
                                <div className={`w-[90%] h-[80%] flex justify-center items-center box-border ${active === index ? '' : 'hidden'} `}>
                                    <TotalCategoriesAttendanceGraph data={totalCategories} />
                                </div>
                            )}
                            {item.type !== 'totalAttendance' && item.type !== 'attendanceByCategory' && (
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

import { useEffect, useState, useRef } from "react"
import { Charts } from "./components/Charts"
import { PageHeader } from "../App/component/PageHeader"
import { ResumeCards } from "./components/ResumeCards"
import { SummaryReport } from "../../Core/Reports/application/dtos/SummaryReport"
import { ReportService } from "../../Core/Reports/infrastructure/service/ReportService"
import { AttendanceSummaryResponse, CategorySummary } from "../../Core/Reports/application/useCases"
import { MonthSummaryResponse } from "../../Core/Reports/application/useCases/GetSummaryReportUseCase/dto"

const reportService = ReportService;

const initialState: SummaryReport = {
    totalAttendance: 0,
    totalHomeVisited: 0,
    totalVisitors: 0,
    totalNewChristians: 0
}

export const Dashboard = () => {

    const [date, setDate] = useState<Date[]>([])
    const [summary, setSummary] = useState<SummaryReport>(initialState)
    const [totalSummary, setTotalSummary] = useState<AttendanceSummaryResponse | null>(null)
    const [categoriesSummary, setCategoriesSummary] = useState<CategorySummary | null>(null)
    // const [receivedReports, setReceivedReports] = useState<ReportSummaryStatus[]>([])
    const [totalMonthSummary, setTotalMonthSummary] = useState<MonthSummaryResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (date[0] && date[1]) {
            getSummaryReport();
            getTotalMonthSummary()
        }
    }, [date]);

    const getSummaryReport = async () => {
        setLoading(true)
        const response = await reportService.getSummaryReport.execute(date[0], date[1]);

        setSummary(response.data.totalsSummary)
        setTotalSummary(response.data.attendanceSummary)
        setCategoriesSummary(response.data.categoriesSummary)
        // setReceivedReports(response.data.reportStatusSummary)
        setLoading(false)
    };

    const getTotalMonthSummary = async () => {
        const response = await reportService.getMonthSummaryReport.execute();
        console.log('month', response)
        setTotalMonthSummary(response.data)
    }

    return (
        <div className="page-container">
            <div className="w-full">
                <PageHeader
                    title="Dashboard"
                    dateValue={date}
                    dateOnChange={(e: any) => setDate(e)} />
            </div>
            <div className="pt-3 h-[100vh] md:mt-0 mt-[10vh]">
                <div className={`w-full h-full flex flex-col  2xl:w-[100%] xl:w-[100%]`}>
                    <ResumeCards
                        summary={summary}
                        loading={loading} />

                    <Charts
                        groupsSummary={totalSummary}
                        categoriesSummary={categoriesSummary}
                        totalMonthSummary={totalMonthSummary}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}

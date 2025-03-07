import { useEffect, useState } from "react"
import { Report } from "../../../../Core/Reports/domain/model/Report";
import { ReportService } from "../../../../Core/Reports/infrastructure/service/ReportService";

export const useGetAllReports = () => {

    const reportService = ReportService;

    const [reports, setReports] = useState<Report[]>([])
    const [loading, setLoading] = useState(false)
    const [rangeOfDate, setRangeOfDate] = useState<any>({
        initial: null,
        final: null
    })

    useEffect(() => {
        if ((rangeOfDate.initial && rangeOfDate.final) && (rangeOfDate.initial < rangeOfDate.final)) {
            getAllReports();
        }
    }, [rangeOfDate])

    const getAllReports = async () => {
        setLoading(true)

        const response = await reportService.getAllBetweenDates.execute(rangeOfDate.initial, rangeOfDate.final)
        setReports(response.data || [])

        setLoading(false)
    }


    const handleRangeOnChange = (value: any) => setRangeOfDate((prev: any) => ({ ...prev, ...value }))
    return {
        reports,
        loading,
        rangeOfDate,
        handleRangeOnChange
    }
}

import { useEffect, useState } from "react"
import { ReportService } from "../../../../Core/Adapters/ReportService";
import { Report } from "../../../../Core/Reports/domain/model/Report";

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

        const response = await reportService.getAllBetweenPeriodTime.execute(rangeOfDate.initial, rangeOfDate.final)
        setReports(response || [])

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

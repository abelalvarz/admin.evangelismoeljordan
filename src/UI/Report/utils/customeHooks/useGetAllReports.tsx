import { useEffect, useState } from "react"
import { Report } from "../../../../Core/Reports/domain/model/Report";
import { ReportService } from "../../../../Core/Reports/infrastructure/service/ReportService";

export const useGetAllReports = () => {

    const reportService = ReportService;

    const [reports, setReports] = useState<Report[]>([])
    const [loading, setLoading] = useState(false)
    const [date, seDate] = useState<any>([])

    useEffect(() => {
        if ((date[0] && date[1]) && (date[0] < date[1])) {
            getAllReports();
        }
    }, [date])

    const getAllReports = async () => {
        setLoading(true)

        const response = await reportService.getAllBetweenDates.execute(date[0], date[1])
        setReports(response.data || [])

        setLoading(false)
    }


    return {
        reports,
        loading,
        date,
        seDate,
        
    }
}

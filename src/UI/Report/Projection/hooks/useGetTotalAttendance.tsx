import { useEffect, useState } from 'react'
import { ReportService } from '../../../../Core/Reports/infrastructure/service/ReportService';
import { AttendanceSummaryResponse, CategorySummary } from '../../../../Core/Reports/application/useCases';

interface Prosp {
    initialDate: any;
    finalDate: any;
}

export const useGetTotalAttendance = ({ initialDate, finalDate }: Prosp) => {

    const reportService = ReportService;

    const [attendanceSummary, setAttendanceSummary] = useState<AttendanceSummaryResponse | null>(null)
    const [categoriesSummary, setCategoriesSummary] = useState<CategorySummary | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (initialDate && finalDate) {
            getSummaryReport();
        }
    }, [initialDate,finalDate]);

    const getSummaryReport = async () => {
        setLoading(true)
        const response = await reportService.getSummaryReport.execute(initialDate, finalDate);

        setAttendanceSummary(response.data.attendanceSummary)
        setCategoriesSummary(response.data.categoriesSummary)
        setLoading(false)
    };
    return {
        attendanceSummary,
        categoriesSummary,
        loading
    }
}

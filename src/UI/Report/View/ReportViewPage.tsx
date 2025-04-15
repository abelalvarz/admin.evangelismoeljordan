import { useEffect, useState } from 'react';
import { FamilyGroupReport } from '../../../Core/Reports/application/dtos/FamilyGroupReport';
import { ReportService } from '../../../Core/Reports/infrastructure/service/ReportService';
import { PageHeader } from '../../App/component/PageHeader';
import { TableComponent } from './components/TableComponent';

export const ReportViewPage = () => {

    const reportService = ReportService;

    const [reports, setReports] = useState<FamilyGroupReport[]>([])
    const [loading, setLoading] = useState(false)
    const [rangeOfDate, setRangeOfDate] = useState<Date[]>([])

    useEffect(() => {
        if ((rangeOfDate[0] && rangeOfDate[1]) && (rangeOfDate[0] < rangeOfDate[1])) {
            getAllReports();
        }
    }, [rangeOfDate])

    const getAllReports = async () => {
        setLoading(true)

        const response = await reportService.getReportByFamilyGroup.execute(rangeOfDate[0], rangeOfDate[1])
        setReports(response.data || [])

        setLoading(false)
    }


    return (
        <div className='page-container'>
            <div className='w-full'>
                <PageHeader title="Reportes" dateOnChange={(e: any) => setRangeOfDate(e)} dateValue={rangeOfDate} />
            </div>
            <div className='page-content'>
                <TableComponent data={reports} loading={loading} />
            </div>
        </div>
    )

}

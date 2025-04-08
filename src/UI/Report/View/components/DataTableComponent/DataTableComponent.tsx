import { useEffect, useState } from 'react'
import { FilterDataComponent } from '../../../../App/component/FilterDataComponent'
import { TableComponent } from './TableComponent'
import { ReportService } from '../../../../../Core/Reports/infrastructure/service/ReportService'
import { FamilyGroupReport } from '../../../../../Core/Reports/application/dtos/FamilyGroupReport'

export const DataTableComponent = () => {
    // const { reports, loading, handleRangeOnChange } = useGetAllReports()

    const reportService = ReportService;

    const [reports, setReports] = useState<FamilyGroupReport[]>([])
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

        const response = await reportService.getReportByFamilyGroup.execute(rangeOfDate.initial, rangeOfDate.final)
        setReports(response.data || [])

        setLoading(false)
    }


    const handleRangeOnChange = (value: any) => setRangeOfDate((prev: any) => ({ ...prev, ...value }))

    return (
        <div className='pb-10'>
            <FilterDataComponent handleRangeOnChange={handleRangeOnChange} />
            <TableComponent data={reports} loading={loading} />
        </div>
    )
}

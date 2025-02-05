import React from 'react'
import { FilterDataComponent } from '../../../../App/component/FilterDataComponent'
import { TableComponent } from './TableComponent'
import { useGetAllReports } from '../../../utils/customeHooks/useGetAllReports'

export const DataTableComponent = () => {
    const { reports, loading, handleRangeOnChange } = useGetAllReports()

    return (
        <React.Fragment>
            <FilterDataComponent handleRangeOnChange={handleRangeOnChange} />
            <TableComponent data={reports} loading={loading} />
        </React.Fragment>
    )
}

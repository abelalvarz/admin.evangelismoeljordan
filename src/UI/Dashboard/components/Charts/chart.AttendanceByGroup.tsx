import { BarChart } from '../../../App/styled-components/BarChart'
import { ProgressSpinner } from 'primereact/progressspinner';
import { EmptyResult } from '../EmptyResult/EmptyResult';

export const AttendanceByGroupChart = ({ data, loading }: any) => {

    if (loading)
        return <ProgressSpinner />

    if (!data && !loading)
        return <EmptyResult />

    return (
        <BarChart label={data.familyGroups} value={data.attendance} colors={data.colors} />
    )
}

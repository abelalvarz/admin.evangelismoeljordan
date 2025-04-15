import { ProgressSpinner } from "primereact/progressspinner";
import { PieChart } from "../../../App/styled-components/PieChart";
import { EmptyResult } from "../EmptyResult/EmptyResult";

interface Props {
    data: any,
    loading: boolean
}

export const CategoryAttendanceChart = ({ data, loading }: Props) => {

    if (loading)
        return <ProgressSpinner />

    if (!data && !loading)
        return <EmptyResult />
    return (
        <PieChart params={data} />
    )
}
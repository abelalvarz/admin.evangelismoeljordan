import React, { useEffect, useState } from 'react'
import { BarChart } from '../../../App/styled-components/BarChart'
import { PiEmptyBold } from 'react-icons/pi';
import { ReportService } from '../../../../Core/Reports/infrastructure/service/ReportService';
import { ProgressSpinner } from 'primereact/progressspinner';

interface Prosp {
    initialDate: any;
    finalDate: any;
}

interface TotalAttendance {
    labels: string[],
    values: number[],
    colors: string[]
}

const initialState = {
    labels: [],
    values: [],
    colors: [],
}

export const TotalAttendanceGrafic = ({ initialDate, finalDate }: Prosp) => {

    const reportService = ReportService;
    const [data, setData] = useState<TotalAttendance>(initialState)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (initialDate && finalDate) {
            getWeekAttendance()
        }
    }, [initialDate, finalDate])

    const getWeekAttendance = async () => {
        setLoading(true)
        const response = await reportService.getTotalWeekAttendance.execute(initialDate, finalDate);
        setLoading(false)

        if (!response.success) return;

        const { newLabels, newValues, newColors } = extractData(response.data);
        setData({ ...data, labels: newLabels, values: newValues, colors: newColors });
    };

    const extractData = (response: any) => {
        const newLabels: string[] = [];
        const newValues: number[] = [];
        const newColors: string[] = [];

        response.forEach((item: any) => {
            newLabels.push(item.familyGroup?.name || "");
            newValues.push(parseInt(item.totalAttendance));
            newColors.push(item.familyGroup?.color || "")
        });
        return { newLabels, newValues, newColors }
    }

    if (loading)
        return <ProgressSpinner />

    if (data.values.length === 0 && !loading)
        return <h1 className="text-gray-400">Sin resultados <PiEmptyBold size={100} /> </h1>

    return (
        <React.Fragment>
            <BarChart label={data.labels} value={data.values} colors={data.colors} />
        </React.Fragment>
    )
}

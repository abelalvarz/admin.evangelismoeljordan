import React, { useEffect, useState } from 'react'
import { BarChart } from '../../../App/styled-components/BarChart'
import { ReportService } from '../../../../Core/Adapters/ReportService';
import { PiEmptyBold } from 'react-icons/pi';

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

    useEffect(() => {
        if (initialDate && finalDate) {
            getWeekAttendance()
        }
    }, [initialDate, finalDate])

    const getWeekAttendance = async () => {
        const response = await reportService.getTotalWeekAttendance.execute(initialDate, finalDate);

        if (!response) return;

        const newLabels: string[] = [];
        const newValues: number[] = [];
        const newColors: string[] = [];

        response.forEach((item: any) => {
            console.log(item)
            newLabels.push(item.familyGroup?.name || "");
            newValues.push(parseInt(item.totalAttendance));
            newColors.push(item.familyGroup?.color || "")
        });

        setData({ ...data, labels: newLabels, values: newValues, colors: newColors });
    };

    if (data.values.length === 0)
        return <h1 className="text-gray-400">Sin resultados <PiEmptyBold size={100} /> </h1>

    return (
        <React.Fragment>
            <BarChart label={data.labels} value={data.values} colors={data.colors} />
        </React.Fragment>
    )
}

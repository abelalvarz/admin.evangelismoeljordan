import { useEffect, useState } from 'react'
import { ReportService } from '../../../../Core/Reports/infrastructure/service/ReportService';

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


export const useGetTotalAttendance = ({ initialDate, finalDate }: Prosp) => {

    const reportService = ReportService;

    const [totalAttendance, setTotalAttendance] = useState<TotalAttendance>(initialState)

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

        response.data.forEach((item: any) => {
            console.log(item)
            newLabels.push(item.familyGroup?.name || "");
            newValues.push(parseInt(item.totalAttendance));
            newColors.push(item.familyGroup?.color || "")
        });

        setTotalAttendance({ ...totalAttendance, labels: newLabels, values: newValues, colors: newColors });
    };
    return {
        totalAttendance
    }
}

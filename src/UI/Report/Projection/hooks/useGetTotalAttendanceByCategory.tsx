import { useEffect, useState } from "react";
import { ReportService } from "../../../../Core/Adapters/ReportService";
import { TotalCategoryAttendance } from "../../../../Core/Reports/application/dtos/TotalCategoryAttendance";

interface Props {
    initialDate: any;
    finalDate: any;
}

interface Category {
    labels: string[],
    data: number[]
}

const initialState: Category = {
    labels: [],
    data: []
}

export const useGetTotalAttendanceByCategory = ({ initialDate, finalDate }: Props) => {
    const reportService = ReportService;
    const [totalCategories, setTotalAttendance] = useState<Category>(initialState)

    useEffect(() => {
        if (initialDate && finalDate) {
            getCategoryAttendance();
        }
    }, [initialDate, finalDate]);

    const getCategoryAttendance = async () => {
        const response = await reportService.getTotalCategoryAttendance.execute(initialDate, finalDate);

        const newLabels: string[] = [];
        const newValues: number[] = [];

        response.forEach((item: TotalCategoryAttendance) => {
            newLabels.push(item.category);
            newValues.push(parseInt(item.totalAttendance));
        });

        setTotalAttendance({ ...totalCategories, labels: newLabels, data: newValues })
    };
    return {
        totalCategories
    }
}

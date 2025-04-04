import { useEffect, useState } from "react";
import { TotalCategoryAttendance } from "../../../../Core/Reports/application/dtos/TotalCategoryAttendance";
import { ReportService } from "../../../../Core/Reports/infrastructure/service/ReportService";

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
    const [loading, setLoading] =useState(false)

    useEffect(() => {
        if (initialDate && finalDate) {
            getCategoryAttendance();
        }
    }, [initialDate, finalDate]);

    const getCategoryAttendance = async () => {
        setLoading(true)
        const response = await reportService.getTotalCategoryAttendance.execute(initialDate, finalDate);
        setLoading(false)
        const newLabels: string[] = [];
        const newValues: number[] = [];

        response.data.forEach((item: TotalCategoryAttendance) => {
            newLabels.push(item.category);
            newValues.push(parseInt(item.totalAttendance));
        });

        setTotalAttendance({ ...totalCategories, labels: newLabels, data: newValues })
    };
    return {
        totalCategories,loading
    }
}

import { useEffect, useState } from "react";
import { PieChart } from "../../../App/styled-components/PieChart";
import { ReportService } from "../../../../Core/Adapters/ReportService";
import { TotalCategoryAttendance } from "../../../../Core/Reports/application/dtos/TotalCategoryAttendance";
import { PiEmptyBold } from "react-icons/pi";

interface Prosp {
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

export const CategoryAttendanceGrafic = ({ initialDate, finalDate }: Prosp) => {

    const reportService = ReportService;
    const [categoryValues, setCategoryValues] = useState<Category>(initialState)

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

        setCategoryValues({ ...categoryValues, labels: newLabels, data: newValues })
    };
    if ( categoryValues === null)
        return <h1 className="text-gray-400">Sin resultados <PiEmptyBold size={100} /> </h1>

    return (
        <PieChart params={categoryValues} />
    )
}

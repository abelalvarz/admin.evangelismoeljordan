import { useEffect, useState } from "react";
import { PieChart } from "../../../App/styled-components/PieChart";
import { TotalCategoryAttendance } from "../../../../Core/Reports/application/dtos/TotalCategoryAttendance";
import { PiEmptyBold } from "react-icons/pi";
import { ReportService } from "../../../../Core/Reports/infrastructure/service/ReportService";
import { ProgressSpinner } from "primereact/progressspinner";

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
    const [categoryValues, setCategoryValues] = useState<Category>(initialState);
    const [loading, setLoading] = useState(false)

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

        setCategoryValues({ ...categoryValues, labels: newLabels, data: newValues })
    };

    if (loading)
        return <ProgressSpinner />

    if (categoryValues.data.length === 0 && !loading)
        return <h1 className="text-gray-400">Sin resultados <PiEmptyBold size={100} /> </h1>
    return (
        <PieChart params={categoryValues} />
    )
}

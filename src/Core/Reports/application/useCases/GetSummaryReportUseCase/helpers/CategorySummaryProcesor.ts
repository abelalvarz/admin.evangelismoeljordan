import { Report } from "../../../../domain/model/Report";
import { TotalCategoryAttendance } from "../../../dtos/TotalCategoryAttendance";
import { CategorySummary } from "../dto";
import { ICategorySummaryProcesor } from "./IHelpers";

export class CategorySummaryProcesor implements ICategorySummaryProcesor {

    execute(data: Report[]): CategorySummary | null {
        const totalByCategories = data.reduce((acc: Record<string, any>, report: Report) => {
            console.log(report)
            this.getCategories(report).forEach(category => {

                acc[category] = acc[category] || { totalAttendance: 0 };
                acc[category].totalAttendance += this.getCategoryAttendance(report, category);
            });
            return acc;
        }, {});

        console.log(totalByCategories)
        const dat = Object.entries(totalByCategories).map(
            ([key, value]) => new TotalCategoryAttendance(key, value.totalAttendance)
        );

        const labels: string[] = []
        const values: string[] = []

        dat.forEach((item) => {
            labels.push(item.category)
            values.push(item.totalAttendance)
        })

        if (labels.length === 0 && values.length === 0)
            return null

        return new CategorySummary(labels, values)
    }

    private getCategories(report: Report): string[] {
        const categories: string[] = [];

        if (report.activeMembers) categories.push("Miembros Activos");
        if (report.activeMembersChildren) categories.push("Hijos de miembros Activos");
        if (report.noActiveMembers) categories.push("Miembros no Activos");
        if (report.noActiveMembersChildren) categories.push("Hijos de miembros no activos");
        if (report.visitorChildren) categories.push("Niños visitantes");
        if (report.visitors) categories.push("Visitantes");

        return categories;
    };

    private getCategoryAttendance(report: Report, category: string): number {
        const categoryMap: Record<string, keyof Report> = {
            'Miembros Activos': 'activeMembers',
            'Hijos de miembros Activos': 'activeMembersChildren',
            'Miembros no Activos': 'noActiveMembers',
            'Hijos de miembros no activos': 'noActiveMembersChildren',
            'Niños visitantes': 'visitorChildren',
            'Visitantes': 'visitors',
        };

        const key = categoryMap[category];
        const value = key ? report[key] : 0;
        return typeof value === 'number' ? value : 0;
    };
}
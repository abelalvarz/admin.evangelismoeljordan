import { Response } from "../../../Config/Response";
import { Report } from "../../domain/model/Report"
import { ReportRepository } from "../../domain/repository/ReportRepository";
import { TotalCategoryAttendance } from "../dtos/TotalCategoryAttendance"

export class GetTotalAttendanceByCategory {

    constructor(private readonly repository: ReportRepository) { }

    async execute(initialDate: Date, finalDate: Date): Promise<Response<TotalCategoryAttendance[]>> {
        const reports = await this.repository.getAllBetweenDates(initialDate, finalDate)

        const totalByCategories = reports.reduce((acc: any, report: Report) => {
            const categories = getCategories(report);

            categories.forEach(category => {
                if (!acc[category]) {
                    acc[category] = {
                        totalAttendance: 0
                    };
                }

                acc[category].totalAttendance += getCategoryAttendance(report, category);
            });

            return acc
        }, {});

        const totalList = Object.entries(totalByCategories).map(([key, value]: [string, any]) => {
            return new TotalCategoryAttendance(key, value.totalAttendance)
        });
        return new Response(true, "Datos obtenidos exitosamente", totalList)
    }
}

const getCategories = (report: Report): string[] => {
    const categories: string[] = [];

    if (report.activeMembers) categories.push('Miembros Activos');
    if (report.activeMembersChildren) categories.push('Hijos de miembros Activos');
    if (report.noActiveMembers) categories.push('Miembros no Activos');
    if (report.noActiveMembersChildren) categories.push('Hijos de miembros no activos');
    if (report.visitorChildren) categories.push('Niños visitantes');
    if (report.visitors) categories.push('Visitantes');

    return categories;
}

const getCategoryAttendance = (report: Report, category: string): number => {
    switch (category) {
        case 'Miembros Activos':
            return report.activeMembers || 0;
        case 'Hijos de miembros Activos':
            return report.activeMembersChildren || 0;
        case 'Miembros no Activos':
            return report.noActiveMembers || 0;
        case 'Hijos de miembros no activos':
            return report.noActiveMembersChildren || 0;
        case 'Niños visitantes':
            return report.visitorChildren || 0;
        case 'Visitantes':
            return report.visitors || 0;
        default:
            return 0;
    }
}
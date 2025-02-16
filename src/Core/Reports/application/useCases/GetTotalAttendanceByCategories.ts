import { Report } from "../../domain/model/Report"
import { ReportRepository } from "../../domain/repository/ReportRepository";
import { TotalCategoryAttendance } from "../dtos/TotalCategoryAttendance"

export class GetTotalAttendanceByCategory {

    constructor(private readonly repository: ReportRepository) { }

    async execute(initialDate: Date, finalDate: Date): Promise<TotalCategoryAttendance[]> {
        const reports = await this.repository.getAllBetweenDates(initialDate, finalDate)
        // const totalActiveMembers = reports.reduce((accumulator, report: Report) => accumulator + (parseInt(report.activeMember) | 0), 0)
        // const totalNoActiveMembers = reports.reduce((accumulator, report: Report) => accumulator + (parseInt(report.noActiveMember) | 0), 0)
        // const totalVisitor = reports.reduce((accumulator, report: Report) => accumulator + (parseInt(report.visitors) | 0), 0)

        // const returnDate: TotalCategoryAttendance[] = []
        // returnDate.push(new TotalCategoryAttendance("Miembros Activos", (totalActiveMembers.toString() || "0")))
        // returnDate.push(new TotalCategoryAttendance("Miembros no Activos", (totalNoActiveMembers.toString() || "0")))
        // returnDate.push(new TotalCategoryAttendance("Amigos Visitantes", (totalVisitor.toString() || "0")))
        
        console.log(reports)
        const reportsByName = reports.reduce((acc: any, report: Report) => {
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
        console.log(reportsByName)
        const totalList = Object.entries(reportsByName).map(([key, value]: [string, any]) => {
            console.log(key)
            return new TotalCategoryAttendance(key, value.totalAttendance)
        });
        return Promise.resolve(totalList)
    }
}

const getCategories = (report: Report): string[] => {
    const categories: string[] = [];
    const { activeMembers, activeMembersChildren, noActiveMembers, noActiveMembersChildren, visitorChildren, visitors } = report;

    if (activeMembers) categories.push('Miembros Activos');
    if (activeMembersChildren) categories.push('Hijos de miembros Activos');
    if (noActiveMembers) categories.push('Miembros no Activos');
    if (noActiveMembersChildren) categories.push('Hijos de miembros no activos');
    if (visitorChildren) categories.push('Niños visitantes');
    if (visitors) categories.push('Visitantes');

    return categories;
}

function getCategoryAttendance(report: Report, category: string): number {
    switch (category) {
        case 'Miembros Activos':
            return report.activeMembers || 0;
        case 'Hijos de miembros Activos':
            return report.activeMembersChildren || 0;
        case 'Miembros no Activos':
            return report.noActiveMembers || 0;
        case 'Hijos de miembros no activos':
            return report.noActiveMembersChildren|| 0;
        case 'Niños visitantes':
            return report.visitorChildren || 0;
        case 'Visitantes':
            return report.visitors || 0;
        default:
            return 0;
    }
}
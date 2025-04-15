import { Report } from "../../../../domain/model/Report";
import { AttendanceSummaryResponse, TotalAttendanceSummary } from "../dto";
import { IAttendanceSummaryProcesor } from "./IHelpers";

export class AttendanceSummaryProcesor implements IAttendanceSummaryProcesor {

    execute(data: Report[]): AttendanceSummaryResponse | null {
        const reports = data.reduce((acc: Record<string, any>, report: Report) => {
            const groupName = report.familyGroup?.name;

            if (!groupName) return acc;

            acc[groupName] = acc[groupName] || {
                familyGroup: {
                    name: groupName,
                    color: report.familyGroup?.color,
                },
                totalAttendance: 0,
            };

            acc[groupName].totalAttendance += report.totalAttendance || 0;
            return acc;
        }, {});

        const totalList = Object.values(reports).map((value: any) =>
            new TotalAttendanceSummary(value.familyGroup, value.totalAttendance)
        );

        return totalList.length === 0 ? null : this.extractValue(totalList);
    }

    private extractValue(data: TotalAttendanceSummary[]) {
        const familyGroups: string[] = [];
        const attendance: number[] = [];
        const colors: string[] = [];

        data.forEach((item: any) => {
            familyGroups.push(item.familyGroup?.name || "");
            attendance.push(Number(item.totalAttendance) || 0); // Conversión explícita
            colors.push(item.familyGroup?.color || "");
        });

        return { familyGroups, attendance, colors };
    }

}
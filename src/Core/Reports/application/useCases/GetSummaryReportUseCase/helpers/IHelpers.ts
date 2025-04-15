import { FamilyGroup } from "../../../../../FamilyGroups/domain/model/FamilyGroup";
import { Report } from "../../../../domain/model/Report";
import { FamilyGroupReport } from "../../../dtos/FamilyGroupReport";
import { AttendanceSummaryResponse, CategorySummary, SummaryReport } from "../dto";

export interface ITotalsSummaryProcesor {
    execute(data: Report[]): SummaryReport
}
export interface IAttendanceSummaryProcesor {
    execute(data: Report[]): AttendanceSummaryResponse | null
}
export interface ICategorySummaryProcesor {
    execute(data: Report[]): CategorySummary | null
}
export interface IReportSummaryProcesor {
    execute(data: Report[], familyGroups: FamilyGroup[], endDate:Date): FamilyGroupReport[] | []
}
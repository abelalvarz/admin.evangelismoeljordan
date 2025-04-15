import { Response } from "../../../../Config/Response";
import { FamilyGroupService } from "../../../../FamilyGroups/infrastructure/service/FamiltyGroupService";
import { ReportRepository } from "../../../domain/repository/ReportRepository";
import { SummaryReportResponse } from "./dto";
import { AttendanceSummaryProcesor } from "./helpers/AttendanceSummaryProcesor";
import { CategorySummaryProcesor } from "./helpers/CategorySummaryProcesor";
// import { ReportStatusSummaryProcesor } from "./helpers/ReportStatusProcesor";
import { TotalsSummaryProcesor } from "./helpers/TotalsSummaryProcesor";
import { IGetSummaryReportUseCase } from "./interfaces";

export class GetSummaryReportUseCase implements IGetSummaryReportUseCase {

    familyGroupRepository = FamilyGroupService;
    totalSummaryProcesor = new TotalsSummaryProcesor();
    attendanceSummaryProcessor = new AttendanceSummaryProcesor();
    categorySummaryProcesso = new CategorySummaryProcesor();
    // reportSummaryStatusProcessor = new ReportStatusSummaryProcesor()

    constructor(private readonly repository: ReportRepository) { }

    async execute(startDate: Date, endDate: Date): Promise<Response<SummaryReportResponse>> {

        const reports = await this.repository.getAllBetweenDates(startDate, endDate);
        // const familyGroups = await this.familyGroupRepository.getAll.execute();

        const totalsSummary = this.totalSummaryProcesor.execute(reports)
        const categorySummary = this.categorySummaryProcesso.execute(reports)
        const attendanceSummary = this.attendanceSummaryProcessor.execute(reports)
        // const reportStatusSummary = this.reportSummaryStatusProcessor.execute(reports, familyGroups.data, endDate)

        return Promise.resolve(new Response(true,
            "Success operation",
            new SummaryReportResponse(totalsSummary,attendanceSummary,categorySummary)
        ))
    }
}
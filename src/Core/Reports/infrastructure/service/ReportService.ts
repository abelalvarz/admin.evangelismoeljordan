import { FirebaseReportRepository } from "../database/FirebaseReportRepository"
import {
    CreateReportUseCase,
    DeleteReportUseCase,
    UpdateUseCase,
    GetAllBetweenDateUseCase,
    GetReportByFamilyGroupUseCase,
    GetOneByIdUseCase,
    GetSummaryReportUseCase
} from "../../application/useCases"
import { GetMonthlySummaryUseCase } from "../../application/useCases/GetSummaryReportUseCase/GetMonthlySummaryUseCase"

const repository = new FirebaseReportRepository()

export const ReportService = {
    create: new CreateReportUseCase(repository),
    delete: new DeleteReportUseCase(repository),
    update: new UpdateUseCase(repository),
    getAllBetweenDates: new GetAllBetweenDateUseCase(repository),
    getReportByFamilyGroup: new GetReportByFamilyGroupUseCase(repository),
    getOneById: new GetOneByIdUseCase(repository),
    getSummaryReport: new GetSummaryReportUseCase(repository),
    getMonthSummaryReport: new GetMonthlySummaryUseCase(repository)
}
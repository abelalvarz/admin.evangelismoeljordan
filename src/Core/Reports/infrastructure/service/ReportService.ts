import { CreateReportUseCase } from "../../application/useCases/CreateUseCase"
import { DeleteReportUseCase } from "../../application/useCases/DeleteUseCase"
import { GetAllBetweenDateUseCase } from "../../application/useCases/GetAllBetweenDateUseCase"
import { GetOneByIdUseCase } from "../../application/useCases/GetOneByIdUseCase"
import { GetReportByFamilyGroupUseCase } from "../../application/useCases/GetReportByFamilyGroupUseCase"
import { GetSummaryReportUseCase } from "../../application/useCases/GetSummaryReportUseCase"
import { GetTotalAttendanceByCategory } from "../../application/useCases/GetTotalAttendanceByCategories"
import { GetTotalWeekAttendanceUseCase } from "../../application/useCases/GetTotalWeekAttendanceUseCase"
import { UpdateUseCase } from "../../application/useCases/UpdateUseCase"
import { FirebaseReportRepository } from "../database/FirebaseReportRepository"

const repository = new FirebaseReportRepository()
export const ReportService ={
    create: new CreateReportUseCase(repository),
    delete: new DeleteReportUseCase(repository),
    update: new UpdateUseCase(repository),
    getAllBetweenDates: new GetAllBetweenDateUseCase(repository),
    getReportByFamilyGroup: new GetReportByFamilyGroupUseCase(repository),
    getOneById: new GetOneByIdUseCase(repository),
    getTotalWeekAttendance: new GetTotalWeekAttendanceUseCase(repository),
    getTotalCategoryAttendance: new GetTotalAttendanceByCategory(repository),
    getSummaryReport: new GetSummaryReportUseCase(repository)
}
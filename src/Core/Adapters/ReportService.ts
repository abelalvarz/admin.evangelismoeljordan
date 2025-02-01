import { CreateReportUseCase } from "../Reports/application/useCases/CreateUseCase";
import { GetAllUseCase } from "../Reports/application/useCases/GetAllUseCase";
import { GetSummaryReportUseCase } from "../Reports/application/useCases/GetSummaryReportUseCase";
import { GetTotalAttendanceByCategory } from "../Reports/application/useCases/GetTotalAttendanceByCategories";
import { GetTotalWeekAttendanceUseCase } from "../Reports/application/useCases/GetTotalWeekAttendanceUseCase";
import { FirebaseReportRepository } from "../Reports/infrastructure/persistance/firebase/FirebaseReportRepository";
// import { InMemoryUserRepository } from "../infrastructure/persistance/InMemoryReportRepository";

// const repository = new InMemoryUserRepository()
const repository = new FirebaseReportRepository()
export const ReportService ={
    create: new CreateReportUseCase(repository),
    getAll: new GetAllUseCase(repository),
    getTotalWeekAttendance: new GetTotalWeekAttendanceUseCase(repository),
    getTotalCategoryAttendance: new GetTotalAttendanceByCategory(repository),
    getSummaryReport: new GetSummaryReportUseCase(repository)
}
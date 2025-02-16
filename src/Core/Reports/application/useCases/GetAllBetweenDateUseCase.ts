import { Report } from "../../domain/model/Report";
import { ReportRepository } from "../../domain/repository/ReportRepository";

export class GetAllBetweenDateUseCase {
    constructor(private readonly repository: ReportRepository) { }

    execute(startDate: Date, endDate: Date): Promise<Report[]> {
        return this.repository.getAllBetweenDates(startDate, endDate)
    }
}


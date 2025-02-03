import { Report } from "../../domain/model/Report";
import { ReportRepository } from "../../domain/repository/ReportRepository";

export class GetAllBetweenPeriodTimeUseCase {
    constructor(private readonly repository: ReportRepository) { }

    async execute(initial: Date, final: Date): Promise<Report[]> {
        const response = await this.repository.getByPeriod(initial, final);
        console.log(response)
        return Promise.resolve(response)
    }
}


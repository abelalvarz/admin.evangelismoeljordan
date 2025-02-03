import { Report } from "../../domain/model/Report";
import { ReportRepository } from "../../domain/repository/ReportRepository";

export class GetOneByIdUseCase {
    constructor(private readonly repository: ReportRepository) { }

    execute(id: string): Promise<Report> {
        return this.repository.getOneById(id);
    }
}
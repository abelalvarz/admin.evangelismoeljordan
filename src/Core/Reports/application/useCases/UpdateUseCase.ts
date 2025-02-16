import { Report } from "../../domain/model/Report";
import { ReportRepository } from "../../domain/repository/ReportRepository";

export class UpdateUseCase {
    constructor(private readonly repository: ReportRepository){}
    execute(report:Report):Promise<void>{
        return this.repository.update(report)
    }
}
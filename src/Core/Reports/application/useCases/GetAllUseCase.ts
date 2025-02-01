import { Report } from "../../domain/model/Report";
import { ReportRepository } from "../../domain/repository/ReportRepository";

export class GetAllUseCase{
    constructor(private readonly repository: ReportRepository){}
    async execute():Promise<Report[]>{
        return await this.repository.getAll();
    }
}
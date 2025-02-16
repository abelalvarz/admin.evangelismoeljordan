import { ReportRepository } from "../../domain/repository/ReportRepository";

export class DeleteReportUseCase {
    constructor(private readonly repository: ReportRepository) { }

    execute(id: string): Promise<void> {
        return this.repository.delete(id);
    }
}
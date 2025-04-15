import { Response } from "../../../../../Config";

export interface IGetSummaryReportUseCase {
    execute(startDate: Date, endDate: Date): Promise<Response<null | object>>
}
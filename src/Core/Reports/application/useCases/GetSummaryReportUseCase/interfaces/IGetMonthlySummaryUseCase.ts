import { Response } from "../../../../../Config";
import { MonthSummaryResponse } from "../dto";

export interface IGetMonthlySummaryUseCase {
    execute(): Promise<Response<MonthSummaryResponse|null>>
}
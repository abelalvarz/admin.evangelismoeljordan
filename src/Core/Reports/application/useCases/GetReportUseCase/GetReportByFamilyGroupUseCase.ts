import { getFinishTime } from "../../../../../UI/App/utils";
import { Response } from "../../../../Config/Response";
import { FamilyGroupService } from "../../../../FamilyGroups/infrastructure/service/FamiltyGroupService";
import { ReportRepository } from "../../../domain/repository/ReportRepository";
import { FamilyGroupReport } from "../../dtos/FamilyGroupReport";


export class GetReportByFamilyGroupUseCase {
    constructor(
        private readonly repository: ReportRepository,
    ) { }
    familyGroupRepository = FamilyGroupService
    async execute(startDate: Date, endDate: Date): Promise<Response<FamilyGroupReport[]>> {

        const familyGroups = await this.familyGroupRepository.getAll.execute();
        const data = await this.repository.getAllBetweenDates(startDate, endDate);

        const existingFamilyGroup: FamilyGroupReport[] = []

        data.forEach((report) => {
            existingFamilyGroup.push({
                familyGroupId: report.familyGroup?.id || "",
                familyGroup: report.familyGroup?.name || "",
                teacher: report.familyGroup?.teacher || "",
                meetingDate: report.meetingDate,
                status: 'RECEIVED',
                reportId: report.id

            })
        })
        const finishDate = getFinishTime(1);

        const existingGroupDataSet = new Set(existingFamilyGroup.map(item => item.familyGroup))
        familyGroups.data.forEach((item: any) => {
            if (!existingGroupDataSet.has(item.name)) {
                existingFamilyGroup.push({
                familyGroupId: item.id || "",
                    familyGroup: item.name ,
                    teacher: item.teacher || "",
                    meetingDate: null,
                    status: finishDate < endDate ? 'PENDING' : 'NOT_RECEIVED',
                    reportId: null
                })
            }
        })

        if (!existingFamilyGroup.some(item => item.status === 'RECEIVED')) {
            return new Response(true, "No se recibieron reportes", [])
        }

        return new Response(true, "Reportes obtenidos con exito", existingFamilyGroup)
    }
}


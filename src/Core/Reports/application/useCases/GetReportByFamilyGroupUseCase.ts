import { getFinishTime } from "../../../../UI/App/utils";
import { Response } from "../../../Config/Response";
import { FamilyGroupService } from "../../../FamilyGroups/infrastructure/service/FamiltyGroupService";
import { ReportRepository } from "../../domain/repository/ReportRepository";
import { FamilyGroupReport } from "../dtos/FamilyGroupReport";


export class GetReportByFamilyGroupUseCase {
    constructor(
        private readonly repository: ReportRepository,
    ) { }
    familyGroupRepository = FamilyGroupService
    async execute(startDate: Date, endDate: Date): Promise<Response<FamilyGroupReport[]>> {

        const familyGroups = await this.familyGroupRepository.getAll.execute();
        const data = await this.repository.getAllBetweenDates(startDate, endDate);

        const existingFamilyGroup: FamilyGroupReport[] = []

        data.forEach((report)=>{
            existingFamilyGroup.push({
                familyGroup: report.familyGroup?.name ||"",
                meetingDate:report.meetingDate,
                status: 'RECEIVED',
                reportId: report.id

            })
        })
        const finishDate = getFinishTime(2);

        const existingGroupDataSet = new Set(existingFamilyGroup.map(item=> item.familyGroup))
        familyGroups.data.forEach((item:any)=>{
            if(!existingGroupDataSet.has(item.name)){
                existingFamilyGroup.push({
                    familyGroup: item.name,
                    meetingDate: null,
                    status: finishDate < endDate ? 'PENDING' : 'NOT_RECEIVED',
                    reportId: null
                }) 
            }
        })
        
        if(!existingFamilyGroup.some(item=>item.status==='RECEIVED' )){
            return new Response(true, "No se recibieron reportes", [])
        }

        return new Response(true, "Reportes obtenidos con exito", existingFamilyGroup)
    }
}


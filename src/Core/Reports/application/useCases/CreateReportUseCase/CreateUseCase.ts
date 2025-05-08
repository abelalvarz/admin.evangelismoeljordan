import { getPeriodTime } from "../../../../../Utils/util.time-period";
import { Response } from "../../../../Config";
import { Report } from "../../../domain/model/Report";
import { ReportRepository } from "../../../domain/repository/ReportRepository";
import { CreateReportRequest } from "../../dtos/CreateReportRequest";


export class CreateReportUseCase {
    constructor(private readonly repository: ReportRepository) { }

    async execute(request: CreateReportRequest): Promise<Response<null>> {
        
        const timePeriod = getPeriodTime(0)

        if (!request.familyGroup?.id) {
            return new Response(false, "El grupo es requerido", null)
        }

        const existingReport = await this.repository.existsReportBetweenDateAndGroup(
            request.familyGroup?.id,
            timePeriod.initial,
            timePeriod.final)

        if (existingReport) {
            return new Response(false, "Ya existe un reporte de esta semana del grupo seleccionado", null)
        }

        if (!request.meetingDate) {
            return new Response(false, "La fecha de reunión es requerida", null)
        }

        await this.repository.create(new Report(
            null,
            request.familyGroup,
            request.activeMembers,
            request.activeMembersChildren,
            request.noActiveMembers,
            request.noActiveMembersChildren,
            request.visitorChildren,
            request.visitorChildren,
            request.totalAttendance,
            request.visitedHomes,
            request.newChristians,
            request.reconciled,
            request.vigilAttendance,
            request.offering,
            request.comments,
            request.meetingDate,
            request.creationDate,
            request.createdBy
        ));
        return new Response(true, "Reporte creado exitosamente", null)
    }
}
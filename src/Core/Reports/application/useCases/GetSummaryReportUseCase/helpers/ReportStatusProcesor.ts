// import { getFinishTime } from "../../../../../../UI/App/utils";
// import { FamilyGroup } from "../../../../../FamilyGroups/domain/model/FamilyGroup";
// import { Report } from "../../../../domain/model/Report";
// import { FamilyGroupReport } from "../../../dtos/FamilyGroupReport";
// import { ReportSummaryStatus } from "../dto";
// import { IReportSummaryProcesor } from "./IHelpers";

// export class ReportStatusSummaryProcesor implements IReportSummaryProcesor {

//     execute(data: Report[], familyGroups: FamilyGroup[], endDate: Date): ReportSummaryStatus[] | [] {

//         const existingFamilyGroup: FamilyGroupReport[] = []
//         const finishDate = getFinishTime(1);

//         // data.forEach((report) => {
//         //     existingFamilyGroup.push({
//         //         familyGroup: report.familyGroup?.name || "",
//         //         meetingDate: report.meetingDate,
//         //         status: 'RECEIVED',
//         //         reportId: report.id

//         //     })
//         // })

//         // const existingGroupDataSet = new Set(existingFamilyGroup.map(item => item.familyGroup))
//         // familyGroups.forEach((item: any) => {
//         //     if (!existingGroupDataSet.has(item.name)) {
//         //         existingFamilyGroup.push({
//         //             familyGroup: item.name,
//         //             meetingDate: null,
//         //             status: finishDate < endDate ? 'PENDING' : 'NOT_RECEIVED',
//         //             reportId: null
//         //         })
//         //     }
//         })

//         if (!existingFamilyGroup.some(item => item.status === 'RECEIVED')) {
//             return []
//         }

//         return existingFamilyGroup.map((report) => new ReportSummaryStatus(report.familyGroup, report.meetingDate, report.status, report.reportId))
//     }

// }
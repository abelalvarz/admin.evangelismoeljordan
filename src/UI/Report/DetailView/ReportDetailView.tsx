import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ReportService } from "../../../Core/Adapters/ReportService"
import { Report } from "../../../Core/Reports/domain/model/Report"
import { AttendanceSection } from "./components/AttendanceSection"
import { EvangelismSection } from "./components/EvangelismSection"
import { OfferingSection } from "./components/OfferingSection"
import { es } from "date-fns/locale"
import { format } from "date-fns"

export const ReportDetailView = () => {
    const reportService = ReportService;
    const { id } = useParams()

    const [reportDetail, setReportDetail] = useState<Report>({
        id: "",
        familyGroup: null,
        activeMember: "",
        activeMemberChildren: "",
        noActiveMember: "",
        noActiveMemberChildren: "",
        visitorChildren: "",
        visitors: "",
        totalAttendance: "",
        visitedHomes: "",
        newChristians: "",
        reconciled: "",
        vigilAttendance: "",
        offering: "",
        notes: "",
        meetingDate: new Date(),
        creationDate: new Date(),
        createdBy: ""

    })

    useEffect(() => {
        if (id) {
            getReportDetail(id)
        }
    }, [])

    const getReportDetail = async (id: string) => {
        const response = await reportService.getOneById.execute(id);
        if (!response) {
            return;
        }
        setReportDetail(response)
    }
    return (
        <div className='page-container m-auto'>
            <div className="w-full flex justify-center items-center h-full">
                <div className="w-[40%] bg-slate-50 p-5 rounded-lg pb-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">{reportDetail?.familyGroup?.name}</h1>
                        <h2>Guatemala, {reportDetail?.meetingDate && format(reportDetail?.meetingDate, "EEEE d 'de' MMMM yyyy", { locale: es })}</h2>
                    </div>
                    <div className="flex flex-col w-full justify-evenly">
                        <AttendanceSection data={reportDetail} />
                        <EvangelismSection data={reportDetail} />
                        <OfferingSection data={reportDetail} />
                    </div>
                </div>
            </div>
        </div>
    )
}

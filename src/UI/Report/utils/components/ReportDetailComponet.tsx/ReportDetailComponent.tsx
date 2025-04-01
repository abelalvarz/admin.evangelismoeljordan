import { es } from "date-fns/locale"
import { format } from "date-fns"
import { AttendanceSection } from './components/AttendanceSection'
import { EvangelismSection } from './components/EvangelismSection'
import { OfferingSection } from './components/OfferingSection'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Report } from "../../../../../Core/Reports/domain/model/Report"
import { ReportService } from "../../../../../Core/Reports/infrastructure/service/ReportService"

interface Props {
    data?: Report,
    isProjection?: boolean
}

export const ReportDetailComponent = ({ data, isProjection }: Props) => {
    const reportService = ReportService;
    const { id } = useParams()

    const [reportDetail, setReportDetail] = useState<Report>({
        id: "",
        familyGroup: null,
        activeMembers: null,
        activeMembersChildren: null,
        noActiveMembers: null,
        noActiveMembersChildren: null,
        visitorChildren: null,
        visitors: null,
        totalAttendance: null,
        visitedHomes: null,
        newChristians: null,
        reconciled: null,
        vigilAttendance: null,
        offering: null,
        comments: "",
        meetingDate: new Date(),
        creationDate: new Date(),
        createdBy: ""

    })

    useEffect(() => {
        if (id) {
            getReportDetail(id)
        } else if (data) {
            setReportDetail(data)
        }
    }, [data])

    const getReportDetail = async (id: string) => {
        const response = await reportService.getOneById.execute(id);
        if (!response) {
            return;
        }
        setReportDetail(response.data)
    }

    return (
        <div className="w-[40%] my-5 h-fit flex flex-col items-center justify-center box-border  border-gray-500 border-[1px] bg-slate-50 px-5  rounded-lg  relative overflow-hidden">
            <div className="flex flex-col items-center justify-center text-center  w-full">
                <h1 className="text-4xl font-bold">{reportDetail?.familyGroup?.name}</h1>
                <h2>Guatemala, {reportDetail?.meetingDate && format(reportDetail?.meetingDate, "EEEE d 'de' MMMM yyyy", { locale: es })}</h2>
            </div>
            <div className="flex flex-col w-full box-border  justify-evenly ">
                <AttendanceSection data={reportDetail} />
                <EvangelismSection data={reportDetail} />
                {
                    !isProjection && (
                        <OfferingSection data={reportDetail} />
                    )
                }
            </div>
        </div>
    )
}

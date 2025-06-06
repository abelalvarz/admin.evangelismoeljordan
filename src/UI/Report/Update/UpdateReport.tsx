import { useEffect, useState } from 'react'
import { ReportEditor } from '../utils/components/ReportEditor/ReportEditor'
import { useNavigate, useParams } from 'react-router-dom';
import { Report } from '../../../Core/Reports/domain/model/Report';
import { useToast } from '../../App/context/ToastContext';
import { ReportService } from '../../../Core/Reports/infrastructure/service/ReportService';

const initialReportState = {
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

}

export const UpdateReport = () => {
    
    const navigate = useNavigate()
    const toast = useToast()
    const reportService = ReportService;
    const { id } = useParams()

    const [disable, setDisable] = useState(false)

    const [showConfirmation, setShowConfirmation] = useState(false)
    const [reportDetail, setReportDetail] = useState<Report>(initialReportState)

    useEffect(() => {
        if (id) {
            getReportDetail(id)
        }
    }, [id])

    const getReportDetail = async (id: string) => {
        const response = await reportService.getOneById.execute(id);
        if (!response) {
            return;
        }
        setReportDetail(response.data)
    }

    const handleOnchange = (newValues: any) => setReportDetail((prev) => ({ ...prev, ...newValues }))

    const handleSave = () => {
        setShowConfirmation(!showConfirmation)
    }

    const save = async () => {
        reportService.update.execute(reportDetail)
            .then(() => {
                toast?.show('success', 'Exito', 'Actualizacion realizada exitosamente');
                setDisable(true)
                setShowConfirmation(false)
                navigate("/")
            }).catch(() => {
                toast?.show('error', 'Error', 'No se pudo realizar la actualizacion')
            })
    }

    return (
        <div className='page-container'>
            <ReportEditor
                title={reportDetail.familyGroup && reportDetail.familyGroup.name}
                report={reportDetail}
                handleOnchangeData={handleOnchange}
                handleSave={handleSave}
                disabled={disable}
                showDialog={showConfirmation}
                setShowDialog={setShowConfirmation}
                save={save}
            />
        </div>
    )
}

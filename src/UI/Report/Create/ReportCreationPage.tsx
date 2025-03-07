import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConfirmationDialog } from './components/ConfirmationComponent/ConfirmationDialog'
import { ReportCreation } from './components/ReportFormComponent/ReportCreation'
import { Report } from '../../../Core/Reports/domain/model/Report'
import { useToast } from '../../App/context/ToastContext'
import { ReportService } from '../../../Core/Reports/infrastructure/service/ReportService'

const initialState: Report = {
    id: null,
    familyGroup: null,
    activeMembers: null,
    activeMembersChildren: null,
    noActiveMembers: null,
    noActiveMembersChildren: null,
    totalAttendance: null,
    visitorChildren: null,
    visitors: null,
    visitedHomes: null,
    newChristians: null,
    reconciled: null,
    vigilAttendance: null,
    offering: null,
    comments: "",
    meetingDate: new Date(),
    creationDate: new Date(),
    createdBy: "test",
}

export const ReportCreationPage = () => {

    const service = ReportService;
    const toast = useToast()
    const navigate = useNavigate();

    const [report, setReport] = useState<Report>(initialState)
    const [showDialog, setShowDialog] = useState(false);
    const [disabled, setDisabled] = useState(false)

    const handleOnchangeData = (newValues: Object) => {
        setReport((preValues) => ({
            ...preValues,
            ...newValues
        }))
    }

    const handleSave = () => {
        if (!report.meetingDate) {
            toast?.show('warn', 'Informacion', 'La Fecha es requerida')
            return
        }
        if (!report.familyGroup) {
            toast?.show('warn', 'Informacion', 'Debe seleccionar un grupo')
            return
        }
        if (!report.activeMembers) {
            toast?.show('warn', 'Informacion', 'Campo Miembros activos es requerido')
            return
        }
        setShowDialog(!showDialog)
    }

    const save = async () => {
        const activeMember = report.activeMembers || 0
        const activeMemberChildren = report.activeMembersChildren || 0
        const noActiveMember = report.noActiveMembers || 0
        const noActiveMemberChildren = report.noActiveMembersChildren || 0
        const visitorChildren = report.visitorChildren || 0
        const visitors = report.visitors || 0
        const totalAsistencia = 0 + 0 + activeMember + activeMemberChildren + noActiveMember + noActiveMemberChildren + visitorChildren + visitors
        const reporToSubmit = { ...report, totalAttendance: totalAsistencia }

        const response = await service.create.execute(reporToSubmit)
        if (response === null || !response.success) {
            toast?.show('error', "Error.", "El reporte no se pudo crear.");
            return;
        }

        toast?.show('success', "Exito.", "Reporte creado exitosamente");
        navigate("/")
        setDisabled(true)
    }

    return (
        <div className="page-container">
            <div className='flex flex-col justify-start items-center w-full h-fit bg-transparent sm:mt-[5vh] md:mt-[5vh] rounded-md '>
                <div className={`xl:w-[70%] lg:w-[70%] md:w-[90%] w-full h-fit bg-gray-100 p-10 max-sm:bg-transparent rounded-md top-0 `}>
                    <div className='title-container'>
                        <h1 className='title-content'>Nuevo Reporte</h1>
                    </div>
                    <ReportCreation
                        data={report}
                        onChangeData={handleOnchangeData}
                        handleShowDialog={() => handleSave()}
                        disabled={disabled} />
                    <ConfirmationDialog
                        visible={showDialog}
                        onHide={() => setShowDialog(!showDialog)}
                        handleSave={save}
                    />
                </div>
            </div >
        </div>
    )
}

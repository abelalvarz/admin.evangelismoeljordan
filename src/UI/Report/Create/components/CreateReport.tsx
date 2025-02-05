import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConfirmationDialog } from './ConfirmationDialog'
import { ReportCreation } from './ReportFormComponent/ReportCreation'
import { Report } from '../../../../Core/Reports/domain/model/Report'
import { ReportService } from '../../../../Core/Adapters/ReportService'
import { useToast } from '../../../App/context/ToastContext'

const initialState: Report = {
    id:null,
    familyGroup: null,
    activeMember: "",
    activeMemberChildren: '',
    noActiveMember: "",
    noActiveMemberChildren: '',
    totalAttendance: "",
    visitorChildren: '',
    visitors: "",
    visitedHomes: "",
    newChristians: "",
    reconciled:"",
    vigilAttendance: "",
    offering: "",
    notes: "",
    meetingDate: new Date(),
    creationDate: new Date(),
    createdBy: "test",
}

export const CreateReport = () => {

    const service = ReportService;
    const toast = useToast()
    const navigate = useNavigate();

    const [report, setReport] = useState<Report>(initialState)
    const [showDialog, setShowDialog] = useState(false);

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
        if (!report.activeMember) {
            toast?.show('warn', 'Informacion', 'Campo Miembros activos es requerido')
            return
        }
        setShowDialog(!showDialog)
    }

    const save = async () => {
        const activeMember = report.activeMember == "" ? 0 : parseInt(report.activeMember)
        const activeMemberChildren = report.activeMemberChildren == "" ? 0 : parseInt(report.activeMemberChildren)
        const noActiveMember = report.noActiveMember == "" ? 0 : parseInt(report.noActiveMember)
        const noActiveMemberChildren = report.noActiveMemberChildren == "" ? 0 : parseInt(report.noActiveMemberChildren)
        const visitorChildren = report.visitorChildren == "" ? 0 : parseInt(report.visitorChildren)
        const visitors = report.visitors == "" ? 0 : parseInt(report.visitors)
        const totalAsistencia = 0 + 0 + activeMember + activeMemberChildren + noActiveMember + noActiveMemberChildren + visitorChildren + visitors
        const reporToSubmit = { ...report, totalAttendance: totalAsistencia.toString() }

        const response = await service.create.execute(reporToSubmit)
        if (response === null) {
            toast?.show('error', "Error.", "El reporte no se pudo crear.");
            return;
        }
        
        toast?.show('success', "Exito.", "Reporte enviado exitosamente");
        navigate("/")
    }

    return (
        <div className='flex flex-col justify-start items-center w-full h-fit bg-transparent sm:mt-[5vh] md:mt-[5vh] rounded-md'>
            <div className={`xl:w-[70%] lg:w-[70%] md:w-[90%] w-full h-fit bg-gray-100 p-10 max-sm:bg-transparent rounded-md top-0 `}>

                <div className='title-container'>
                    <h1 className='title-content'>Nuevo Reporte</h1>
                </div>

                <ReportCreation
                    data={report}
                    onChangeData={handleOnchangeData}
                    handleShowDialog={() => handleSave()} />

                <ConfirmationDialog
                    visible={showDialog}
                    onHide={() => setShowDialog(!showDialog)}
                    handleSave={save}
                />

            </div>
        </div >
    )
}
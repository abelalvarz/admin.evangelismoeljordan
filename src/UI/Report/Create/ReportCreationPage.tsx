import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ConfirmationDialog } from './components/ConfirmationComponent/ConfirmationDialog'
import { ReportCreation } from './components/ReportFormComponent/ReportCreation'
import { Report } from '../../../Core/Reports/domain/model/Report'
import { useToast } from '../../App/context/ToastContext'
import { ReportService } from '../../../Core/Reports/infrastructure/service/ReportService'
import { FamilyGroupService } from '../../../Core/FamilyGroups/infrastructure/service/FamiltyGroupService'
import { useAuth } from '../../App/context/AuthContext'

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
    createdBy: "",
}

export const ReportCreationPage = () => {
    const { familyGroupId } = useParams()
    const service = ReportService;
    const auth = useAuth()
    const familyService = FamilyGroupService;
    const toast = useToast()
    const navigate = useNavigate();

    const [report, setReport] = useState<Report>(initialState)
    const [showDialog, setShowDialog] = useState(false);
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        if (familyGroupId) {
            const getFamilyGroupById = async () => {
                const response = await familyService.getOneById.execute(familyGroupId)
                console.log(response)
                if (response.success)
                    handleOnchangeData({ "familyGroup": response.data })
            }
            getFamilyGroupById()
        }
    }, [familyGroupId])

    const handleOnchangeData = (newValues: Object) => {
        console.log(newValues)
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
        if (report.activeMembers === null) {
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
        const reporToSubmit = { ...report, totalAttendance: totalAsistencia, createdBy: auth?.loggedUser.name || "" }

        const response = await service.create.execute(reporToSubmit)
        if (response === null || !response.success) {
            toast?.show('error', "Error.", response.message);
            setShowDialog(false)    
            return;
        }

        toast?.show('success', "Exito.", "Reporte creado exitosamente");
        navigate("/")
        setDisabled(true)
    }

    return (
        <div className="page-container">
            <div className='flex flex-col justify-start items-center w-full h-fit bg-transparent sm:mt-[5vh] md:mt-[5vh] rounded-md '>
                <div className={`xl:w-[70%] lg:w-[70%] md:w-[90%] w-full h-fit bg-gray-50 p-10 max-sm:bg-transparent rounded-md top-0 max-md:p-0`}>
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

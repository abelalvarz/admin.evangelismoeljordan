import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useNavigate } from 'react-router-dom'
import { useToast } from "../../../App/context/ToastContext"
import { ConfirmationDialog } from "../../Create/components/ConfirmationComponent/ConfirmationDialog"
import { useState } from "react"
import { ReportService } from "../../../../Core/Reports/infrastructure/service/ReportService"
import { FamilyGroupReport } from "../../../../Core/Reports/application/dtos/FamilyGroupReport"
import { Tag } from "primereact/tag"
import { BiCalendarCheck } from "react-icons/bi"

interface Props {
    data: FamilyGroupReport[];
    loading?: boolean
}

export const TableComponent = ({ data, loading = false }: Props) => {

    const toast = useToast()
    const navigate = useNavigate()
    const reportService = ReportService

    const [selected, setSelected] = useState('')
    const [showConfirmation, setShowConfirmation] = useState(false)

    const meetingDateBody = (row: any) => {
        if (!row.meetingDate)
            return
        return (
            <div className="w-full flex items-center">
                <BiCalendarCheck size={20} className="mr-5" />
                <p className="max-md:text-sm">{row.meetingDate && format(row.meetingDate, "EEEE d 'de' MMMM yyyy", { locale: es })}</p>
            </div>
        )
    }

    const actionBody = (item: FamilyGroupReport) => {
        if (item.status !== 'RECEIVED')
            return <div className="flex justify-around">
                <button className="bg-green-500 p-3 rounded-full pi pi-plus mr-2 hover:bg-green-400 text-white " onClick={() => handleCreateReport(item.familyGroupId || "x5")} />
            </div>
        return (
            <div className="flex justify-around">
                <button className="bg-blue-300 p-3 rounded-full pi pi-eye mr-2 hover:bg-blue-400 " onClick={() => handleViewDetail(item.reportId || "")} />
                <button className="bg-gray-300 p-3 rounded-full pi pi-pencil mr-2 hover:bg-gray-400" onClick={() => handleEditReport(item.reportId || "")} />
                <button className="bg-red-300 p-3 rounded-full pi pi-trash hover:bg-red-400" onClick={() => handleDelete(item.reportId || "")} />
            </div>
        )
    }

    const handleCreateReport = (id: string) => {
        navigate(`/nuevo-reporte/${id}`)
    }

    const handleViewDetail = (id: string) => {
        if (id === null) {
            toast?.show('warn', 'Info', 'Debe seleccionar un formulario con id valido')
            return
        }
        navigate(`/reportes/detalle/${id}`)
    }

    const handleEditReport = (id: string) => {
        if (id === null) {
            toast?.show('warn', 'Info', 'Debe seleccionar un formulario con id valido')
            return
        }
        navigate(`/reportes/editar/${id}`)

    }

    const handleDelete = (id: string) => {
        if (id === null) {
            toast?.show('warn', 'Info', 'Debe seleccionar un formulario con id valido')
            return
        }
        setSelected(id)
        setShowConfirmation(true)
    }

    const deleteReport = async () => [
        reportService.delete.execute(selected)
            .then(() => {
                toast?.show('success', 'Eliminado', 'Reporte Eliminado exitosamente')
                navigate(`/reportes`)
            }).catch(() => {
                toast?.show('error', 'Error', 'No se pudo eliminar el reporte')
            }).finally(() => {
                setSelected('')
                setShowConfirmation(false)
            })
    ]

    const statusBody = (item: FamilyGroupReport) => {
        if (item.status === 'NOT_RECEIVED') {
            return <Tag severity="danger" value="No Recibido"></Tag>
        }

        if (item.status === 'PENDING') {
            return <Tag severity="warning" value="Pendiente"></Tag>
        }

        return (
            <Tag severity="success" value="Recibido"></Tag>
        )
    }

    return (
        <div className="w-full h-full max-md:m-0">
            <DataTable
                loading={loading}
                className="p-1 bg-white rounded-md "
                value={data}
                emptyMessage="No se encotraron reportes"
                rowClassName={(_) => "border-b-gray-200 border-b-[1px]"}
                >
                <Column sortable field="familyGroup" header="Nombre del Grupo" className="max-md:text-sm" ></Column>
                <Column sortable field="teacher" header="Maestro" className="max-md:text-sm" ></Column>
                <Column header="Fecha de Reunión" body={meetingDateBody}></Column>
                <Column headerClassName="text-center" body={statusBody} header="Estado"></Column>
                <Column headerClassName="flex justify-center items-center h-20" bodyClassName={"text-center"} className="w-10 " body={actionBody} header="Acciones"></Column>
            </DataTable>
            <ConfirmationDialog message="Seguro de Eliminar el reporte" visible={showConfirmation} onHide={() => setShowConfirmation(false)} handleSave={deleteReport} />
        </div>
    )
}

import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useNavigate } from 'react-router-dom'
import { useToast } from "../../../../App/context/ToastContext"
import { ConfirmationDialog } from "../../../Create/components/ConfirmationComponent/ConfirmationDialog"
import { useState } from "react"
import { ReportService } from "../../../../../Core/Reports/infrastructure/service/ReportService"
import { FamilyGroupReport } from "../../../../../Core/Reports/application/dtos/FamilyGroupReport"
import { Tag } from "primereact/tag"

interface Props {
    data: FamilyGroupReport[];
    loading?: boolean
}
export const TableComponent = ({ data, loading = false }: Props) => {

    const toast = useToast()
    const navigate = useNavigate()
    const reportService = ReportService

    const [selected, setSelected] =useState('')
    const [showConfirmation, setShowConfirmation] = useState(false)

    const meetingDateBody = (row: any) => {
        return (
            <p>{row.meetingDate && format(row.meetingDate, "EEEE d 'de' MMMM yyyy", { locale: es })}</p>
        )
    }

    const actionBody = (item: FamilyGroupReport) => {
        if(item.status === 'Pendiente')
            return <></>
        return (
            <div className="flex justify-around">
                <button className="bg-green-300 p-3 rounded-full pi pi-eye mr-2 hover:bg-green-400" onClick={() => handleViewDetail(item.reportId || "")} />
                <button className="bg-gray-300 p-3 rounded-full pi pi-pencil mr-2 hover:bg-gray-400" onClick={() => handleEditReport(item.reportId || "")} />
                <button className="bg-red-300 p-3 rounded-full pi pi-trash hover:bg-red-400" onClick={() => handleDelete(item.reportId || "")} />
            </div>
        )
    }

    const handleViewDetail = (id: string) => {
        if (id === null) {
            toast?.show('warn', 'Info', 'Debe seleccionar un formulario con id valido')
            return
        }
        navigate(`/detalle-reporte/${id}`)
    }

    const handleEditReport = (id: string) => {
        if (id === null) {
            toast?.show('warn', 'Info', 'Debe seleccionar un formulario con id valido')
            return
        }
        navigate(`/editar/${id}`)

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
            }).catch(()=>{
                toast?.show('error', 'Error', 'No se pudo eliminar el reporte')
            }).finally(()=>{
                setSelected('')
                setShowConfirmation(false)
            })
    ]

    const statusBody = (item:FamilyGroupReport)=>{
        if(item.status==='Pendiente'){
            return <Tag severity="danger" value={item.status}></Tag>
        }
        return (
            <Tag severity="success" value={item.status}></Tag>
        )
    }

    return (
        <div className="card  max-sm:mt-20 ">
            <DataTable
                loading={loading}
                tableClassName=" p-5"
                className="p-1 bg-white rounded-md"
                value={data}
                rowHover
                emptyMessage="No se encotraron reportes"
                rowClassName={(_) => "border-b-gray-200 border-b-[1px]"}
                tableStyle={{ minWidth: '50vw', }}>
                <Column sortable field="familyGroup" header="Nombre" ></Column>
                <Column header="Fecha de reunion" body={meetingDateBody}></Column>
                <Column headerClassName="text-center" body={statusBody} header="Estado"></Column>
                <Column headerClassName="flex justify-center items-center h-20" bodyClassName={"text-center"} className="w-10 " body={actionBody} header="Acciones"></Column>
            </DataTable>
            <ConfirmationDialog visible={showConfirmation} onHide={() => setShowConfirmation(false)} handleSave={deleteReport} />
        </div>
    )
}

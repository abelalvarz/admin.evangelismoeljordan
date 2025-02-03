import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useNavigate } from 'react-router-dom'
import { Report } from "../../../../../Core/Reports/domain/model/Report"
import { useToast } from "../../../../App/context/ToastContext"

interface Props {
    data: Report[];
    loading?: boolean
}
export const TableComponent = ({ data, loading = false }: Props) => {

    const toast = useToast()
    const navigate = useNavigate()

    const meetingDateBody = (row: any) => {
        return (
            <p>{row.meetingDate && format(row.meetingDate, "EEEE d 'de' MMMM ", { locale: es })}</p>
        )
    }

    const actionBody = (item: Report) => {
        return (
            <button className="bg-green-200 p-3 rounded-full pi pi-eye" onClick={() => handleViewDetail(item.id || "")} />
        )
    }

    const handleViewDetail = (id: string) => {
        if(id === null){
            toast?.show('warn','Info','Debe seleccionar un formulario con id valido')
            return
        }
        navigate(`/detalle-reporte/${id}`)
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
                <Column sortable field="familyGroup.name" header="Nombre" style={{ width: '20%' }}></Column>
                <Column sortable header="Fecha" style={{ width: '15%' }} body={meetingDateBody}></Column>
                <Column sortable headerClassName="text-center" bodyClassName={"text-center"} field="totalAttendance" header="Asistencia Total"></Column>
                <Column sortable headerClassName="text-center" bodyClassName={"text-center"} field="visitorChildren" header="Niños Visitantes"></Column>
                <Column sortable headerClassName="text-center" bodyClassName={"text-center"} field="visitors" header="Amigos Visitantes"></Column>
                <Column sortable headerClassName="text-center" bodyClassName={"text-center"} field="newChristians" header="Aceptados"></Column>
                <Column sortable headerClassName="text-center" bodyClassName={"text-center"} field="reconciled" header="Reconciliados"></Column>
                <Column bodyClassName={"text-center"} className="w-10 " body={actionBody} header="Acciones"></Column>
            </DataTable>
        </div>
    )
}

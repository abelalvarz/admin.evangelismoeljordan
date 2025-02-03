import { Report } from "../../../../Core/Reports/domain/model/Report"

interface Prosp {
    data: Report
}
export const AttendanceSection = ({ data }: Prosp) => {
    return (
        <div className="w-full mt-3">
            <h1 className="text-xl font-bold bg-green-300 rounded-sm pl-2">Asistencia</h1>
            <div className="w-full bg-slate-50 rounded-md">
                <div className="report-detail-line">
                    <label>Miembros Activos</label>
                    <label>{data.activeMember}</label>
                </div>
                <div className="report-detail-line">
                    <label>Hijos de Miembros Activos</label>
                    <label>{data.activeMemberChildren}</label>
                </div>
                <div className="report-detail-line">
                    <label>Miembros No Activos</label>
                    <label>{data.noActiveMember}</label>
                </div>
                <div className="report-detail-line">
                    <label>Hijos de Miembros no Activos</label>
                    <label>{data.noActiveMemberChildren}</label>
                </div>
                <div className="report-detail-line">
                    <label>Niños Visitantes</label>
                    <label>{data.visitorChildren}</label>
                </div>
                <div className="report-detail-line">
                    <label>Amigos Visitantes</label>
                    <label>{data.visitors}</label>
                </div>
                <div className="w-full flex justify-between mt-[1px] border-t-gray-200 border-t-[1px] py-2 px-2">
                    <label className="font-bold">Total Asistentes</label>
                    <label className="font-bold">{data.totalAttendance}</label>
                </div>
            </div>
        </div>
    )
}

import { Tag } from "primereact/tag"
import { FamilyGroupReport } from "../../../../Core/Reports/application/dtos/FamilyGroupReport"
import { EmptyResult } from "../EmptyResult/EmptyResult"

export const Reports = ({ reports }: any) => {

    const statusBody = (item: FamilyGroupReport) => {
        if (item.status === 'NOT_RECEIVED') {
            return <Tag className="text-xs font-normal whitespace-nowrap" severity="danger" value="No Recibido"></Tag>
        }

        if (item.status === 'PENDING') {
            return <Tag className="text-xs font-normal whitespace-nowrap" severity="warning" value="Pendiente"></Tag>
        }

        return (
            <Tag className="text-xs font-normal whitespace-nowrap" severity="success" value="Recibido"></Tag>
        )
    }


    return (
        <div className='w-full h-full'>
            <h1 className='text-xl text-gray-700  font-bold max-md:text-xl'>Reportes</h1>
            {
                reports.length === 0 && <EmptyResult />
            }
            <div className='flex flex-col justify-between w-full h-full'>
                {
                    reports.length > 0 &&
                    reports.map((item: any, index: number) => {
                        return (
                            <div key={index} className='flex w-full items-center justify-between bg-gray-50 py-3 mb-2 border-b-2'>
                                <h2 className='text-[14px]'>{item.familyGroup}</h2>
                                {statusBody(item)}
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

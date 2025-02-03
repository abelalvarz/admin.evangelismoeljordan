import { DataTableComponent } from "./DataTableComponent/DataTableComponent"

export const ViewReports = () => {

    return (
        <div className='flex flex-col p-10 px-20 w-full h-full rounded-md '>
            <div className="flex justify-between items-end h-[5vh]">
                <h1 className="text-4xl font-bold">Reportes</h1>
            </div>
            <DataTableComponent />
        </div>
    )
}
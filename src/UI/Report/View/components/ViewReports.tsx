import { DataTableComponent } from "./DataTableComponent/DataTableComponent"

export const ViewReports = () => {

    return (
        <div className='flex flex-col p-10 px-20 w-full h-full rounded-md '>
            <div className="title-container ">
                <h1 className="title-content">Reportes</h1>
            </div>
            <DataTableComponent />
        </div>
    )
}
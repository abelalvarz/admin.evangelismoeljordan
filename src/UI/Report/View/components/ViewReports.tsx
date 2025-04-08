import { DataTableComponent } from "./DataTableComponent/DataTableComponent"

export const ViewReports = () => {

    return (
        <div className='flex flex-col p-10 px-20 w-full h-full rounded-md max-md:px-0 max-md:p-0'>
            <div className="title-container">
                <h1 className="title-content">Reportes</h1>
            </div>
            <DataTableComponent />
        </div>
    )
}
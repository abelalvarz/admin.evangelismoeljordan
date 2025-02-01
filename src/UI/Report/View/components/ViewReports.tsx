import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useState } from "react"
import { HeadContainer } from "../../../App/styled-components/HeadContainer"

export const ViewReports = () => {

    const reports = [
        { name: 'Generacion Lehavah', date: 'Enero 11 de 2024', total: 10 },
        { name: 'Generacion Lehavah', date: 'Enero 11 de 2024', total: 10 },
        { name: 'Generacion Lehavah', date: 'Enero 11 de 2024', total: 10 },
        { name: 'Generacion Lehavah', date: 'Enero 11 de 2024', total: 10 },
        { name: 'Generacion Lehavah', date: 'Enero 11 de 2024', total: 10 },
        { name: 'Generacion Lehavah', date: 'Enero 11 de 2024', total: 10 },
        { name: 'Generacion Lehavah', date: 'Enero 11 de 2024', total: 10 },
        { name: 'Generacion Lehavah', date: 'Enero 11 de 2024', total: 10 },
        { name: 'Generacion Lehavah', date: 'Enero 11 de 2024', total: 10 },
        { name: 'Generacion Lehavah', date: 'Enero 11 de 2024', total: 10 },
        { name: 'Generacion Lehavah', date: 'Enero 11 de 2024', total: 10 },
        { name: 'Generacion Lehavah', date: 'Enero 11 de 2024', total: 10 },
        { name: 'Generacion Lehavah', date: 'Enero 11 de 2024', total: 10 },
        { name: 'Generacion Lehavah', date: 'Enero 11 de 2024', total: 10 },
        { name: 'Generacion Lehavah', date: 'Enero 11 de 2024', total: 10 },
    ]

    // const [filter, setFilter] = useState(new Date());
    const currentDate: Date = new Date()

    const getMonth = (date: Date, offset: number) => {
        const newDate = new Date(date);
        const convetedDate = newDate.setMonth(newDate.getMonth() - offset)
        const month = newDate.toLocaleDateString('default', { month: 'long' })
        return { name: month, date: convetedDate }
    }

    const [filterActive, setFilterActive] = useState(0)
    const dateFilter = [
        { name: 'Todo', date: null },//mes actual
        getMonth(currentDate, 0),
        getMonth(currentDate, 1),
        getMonth(currentDate, 2),
    ]

    return (
        <div className='flex flex-col justify-start items-center w-full h-full sm:mt-[5vh] md:mt-[5vh] rounded-md bg-gray-100'>
            <div className={`xl:w-[70%] lg:w-[70%] md:w-[90%] w-full h-full max-sm:bg-transparent rounded-md top-0 `}>
                <HeadContainer className="p-0">
                    <div className="w-full top-0    flex flex-col justify-center z-10">
                        <h1 className='font-bold text-xl'>Reportes</h1>
                        <div className="flex h-fit custom-scroll my-5 flex-col">
                            <div>
                                {dateFilter.map((date, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setFilterActive(index)}
                                        className={`mr-2 h-10 ${filterActive == index ? 'bg-gray-400 text-white' : 'bg-gray-200'} px-5 py-1 rounded-full duration-300`}>
                                        {date.name}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-2 w-full flex">
                                <input className="py-1 px-5 w-full outline-none rounded-md border-gray-300 border-[1px]" type="text" />
                                <Button className="bg-blue-400 ml-1" icon='pi pi-search' />
                            </div>
                        </div>
                    </div>
                </HeadContainer>

                <div className="card mt-10 max-sm:mt-20">
                    <DataTable
                        className="max-sm:hidden"
                        value={reports} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="name" header="Nombre"></Column>
                        <Column field="date" header="Fecha"></Column>
                        <Column field="total" header="Total"></Column>
                        <Column field="total" header="Miembros Activos"></Column>
                        <Column className="w-10 " field="category" header="Acciones"></Column>
                    </DataTable>
                    <div className="sm:hidden">
                        {
                            reports.map((report, i) => (
                                <div key={i}
                                    className="w-full py-5 px-5 bg-gray-200 my-2 rounded-md"
                                >
                                    <div>
                                        <p>{report.date}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

import { HiPlus } from "react-icons/hi"
import { ReportCreationPage } from "../../Report/Create/ReportCreationPage"

export const AppRoutes = [
    { name: 'Nuevo', icon: <HiPlus size={25} />, path: "/nuevo-reporte", element: <ReportCreationPage />, isPrivate: true },
]

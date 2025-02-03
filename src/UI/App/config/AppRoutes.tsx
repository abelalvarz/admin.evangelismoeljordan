import { HiPlus } from "react-icons/hi"
import { ReportCreationPage } from "../../Report/Create/ReportCreationPage"
import { DashboardPage } from "../../Dashboard/DashboardPage"
import { RiDashboardFill } from "react-icons/ri"
import { Navigate } from "react-router-dom"
import { ReportViewPage } from "../../Report/View/ReportViewPage"
import { TbReportAnalytics } from "react-icons/tb"
import { ReportDetailView } from "../../Report/DetailView/ReportDetailView"

export const AppRoutes = [
    { name: 'Dashboard', icon: <RiDashboardFill size={25} />, path: "/dashboard", element: <DashboardPage />, isPrivate: true },
    { name: 'Nuevo', icon: <HiPlus size={25} />, path: "/nuevo-reporte", element: <ReportCreationPage />, isPrivate: true },
    { name: 'Reportes', icon: <TbReportAnalytics size={25} />, path: "/reportes", element: <ReportViewPage />, isPrivate: true },
    { path: "/detalle-reporte/:id", element: <ReportDetailView />, isPrivate: true },
    { path: "*", element: <Navigate to="/dashboard" replace={true} />, isPrivate: true },
]

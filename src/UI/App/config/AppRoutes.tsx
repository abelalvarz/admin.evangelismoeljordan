import { HiPlus } from "react-icons/hi"
import { ReportCreationPage } from "../../Report/Create/ReportCreationPage"
import { DashboardPage } from "../../Dashboard/DashboardPage"
import { RiDashboardFill } from "react-icons/ri"
import { Navigate } from "react-router-dom"
import { ReportViewPage } from "../../Report/View/ReportViewPage"
import { TbReportAnalytics } from "react-icons/tb"
import { ReportDetailView } from "../../Report/DetailView/ReportDetailView"
import { FcVideoProjector } from "react-icons/fc"
import { ReportProjectionPage } from "../../Report/Projection/ReportProjectionPage"
import { LoginPage } from "../../Authentication/Login/LoginPage"
import { RegisterPage } from "../../Authentication/Register/RegisterPage"
import { UpdateReport } from "../../Report/Update/UpdateReport"

export const PrivateRoutes = [
    { name: 'Dashboard', icon: <RiDashboardFill size={25} />, path: "/dashboard", element: <DashboardPage />, isPrivate: true },
    { name: 'Nuevo', icon: <HiPlus size={25} />, path: "/nuevo-reporte", element: <ReportCreationPage />, isPrivate: true },
    { name: 'Reportes', icon: <TbReportAnalytics size={25} />, path: "/reportes", element: <ReportViewPage />, isPrivate: true },
    { name: 'Proyectar Reportes', icon: <FcVideoProjector size={25} />, path: "/proyectar", element: <ReportProjectionPage />, isPrivate: true },
    { path: "*", element: <Navigate to="/dashboard" replace={true} />, isPrivate: true },
    { path: "/detalle-reporte/:id", element: <ReportDetailView />, isPrivate: true },
    { path: "/editar/:id", element: <UpdateReport />, isPrivate: true },
]

export const PublicRoutes = [
    { path: "/login", element: <LoginPage />, isPrivate: false },
    { path: "/register", element: <RegisterPage />, isPrivate: false },
    { path: "*", element: <Navigate to="/login" replace={true} />, isPrivate: false },

]
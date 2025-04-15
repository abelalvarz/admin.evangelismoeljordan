import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { PrivateRoutes, PublicRoutes } from "../config/AppRoutes"
import { useAuth } from "../context/AuthContext"
import { Navbar } from "./Navbar"

export const Router = () => {

    const { loggedUser } = useAuth()!

    return (
        <BrowserRouter>
            {/* <Navigation /> */}
            <div className="w-[100vw] flex h-[100vh] overflow-y-scroll overflow-x-hidden bg-scroll-[transparent]" style={{ boxSizing: 'border-box' }}>
                <Navbar />
                <div className="w-full h-full ">
                    <Routes>
                        {
                            loggedUser.logged
                                ? (PrivateRoutes.map((item, index) => <Route
                                    key={index}
                                    path={item.path}
                                    element={loggedUser.logged ? item.element : <Navigate to="/login" replace />} />))
                                : (PublicRoutes.map((item, index) => <Route
                                    key={index}
                                    path={item.path}
                                    element={loggedUser.logged ? <Navigate to="/dashboard" replace /> : item.element}
                                />))
                        }
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

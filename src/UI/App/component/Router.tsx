import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { PrivateRoutes, PublicRoutes } from "../config/AppRoutes"
import { Navigation } from "./Navigation"
import { useAuth } from "../context/AuthContext"

export const Router = () => {

    const { loggedUser } = useAuth()!

    console.log(loggedUser)
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                {
                    loggedUser.logged
                        ? (PrivateRoutes.map((item, index) => <Route
                            key={index}
                            path={item.path}
                            element={loggedUser.logged ? item.element : <Navigate to="/login" replace /> } />))
                        : (PublicRoutes.map((item, index) => <Route
                            key={index}
                            path={item.path}
                            element={loggedUser.logged ? <Navigate to="/dashboard" replace />:item.element }
                        />))
                }
            </Routes>
        </BrowserRouter>
    )
}

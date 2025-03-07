import { useState } from "react";
import { useToast } from "../../App/context/ToastContext";
import { UserService } from "../../../Core/Users/infrastructure/service/UserService";
import { useAuth } from "../../App/context/AuthContext";
import { LoginComponent } from "./component/LoginComponent";
import { useLoading } from "../../App/context/LoadingContext";

const initialState = {
	email: '',
	password: ''
}

export const LoginPage = () => {

	const service = UserService
	const loading = useLoading()
	const toast = useToast()
	const auth = useAuth()

	const [user, setUser] = useState(initialState)

	const handleOnChange = (e: any) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		loading?.start()

		validateAllFields()
		const response = await service.login.execute({ email: user.email, password: user.password });

		loading?.stop()

		if (!response.success || !response.data)
			return toast?.show('error', 'Error', 'Email o Contraseña incorrecto')

		toast?.show('success', 'Exito', 'Login realizado con exito')
		setTimeout(() => {
			auth?.login({
				name: response.data?.name,
				email: response.data?.email,
				role: response.data?.role,
				token: response.data?.token
			})
		}, 500)
	}

	const validateAllFields = () => {
		if (!user.email) {
			toast?.show('warn', 'Información', 'El campo Email es requerido.')
			return

		} else if (!user.password) {
			toast?.show('warn', 'Información', 'El campo Contraseña es requerido.')
			return
		}
	}

	return (
		<LoginComponent
			user={user}
			handleOnChange={handleOnChange}
			handleSubmit={handleSubmit}
		/>
	)
}
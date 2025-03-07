import { useState } from "react";
import { useToast } from "../../App/context/ToastContext";
import { UserService } from "../../../Core/Users/infrastructure/service/UserService";
import { RegisterComponent } from "./component/RegisterComponent";
import { useLoading } from "../../App/context/LoadingContext";
import { CreateUserRequest } from "../../../Core/Users/application/dtos/request/CreateUserRequest";
import { useNavigate } from "react-router-dom";

const initialState: CreateUserRequest = {
	name: '',
	email: '',
	role: '',
	password: ''
}

export const RegisterPage = () => {

	const service = UserService
	const toast = useToast();
	const loading = useLoading();
	const navigate = useNavigate();
	const [user, setUser] = useState(initialState)

	const handleOnChange = (e: any) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		loading?.start()

		validateAllFields()
		const response = await service.register.execute(user);

		loading?.stop()
		if (!response.success) {
			return toast?.show('error', 'Error', response.message)
		}
		toast?.show('success', 'Exito', response.message);
		navigate('/login')
	}

	const validateAllFields = () => {
		if (!user.name) {
			toast?.show('warn', 'Información', 'El campo Nombre es requerido.')
			return
		} else if (!user.email) {
			toast?.show('warn', 'Información', 'El campo Email es requerido.')
			return
		} else if (!user.role) {
			toast?.show('warn', 'Información', 'El campo Role es requerido.')
			return
		} else if (!user.password) {
			toast?.show('warn', 'Información', 'El campo Contraseña es requerido.')
			return
		}
	}

	return <RegisterComponent
		user={user}
		handleOnChange={handleOnChange}
		handleSubmit={handleSubmit} />
}

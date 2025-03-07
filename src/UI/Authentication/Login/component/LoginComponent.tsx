import { Link } from "react-router-dom";
import { BiEnvelope, BiLock } from "react-icons/bi";

interface Props {
    user: any,
    handleOnChange: (e: any) => void
    handleSubmit: (e: any) => void
}
export const LoginComponent = ({ user, handleOnChange, handleSubmit }: Props) => {
    return (
        <div className={`w-full h-[100vh] flex justify-center items-center bg-[url(/background.jpg)] bg-cover bg-center`}>
            <div className="w-full h-full flex flex-col justify-center items-center bg-[rgba(0,0,0,0.5)]">
                <div className="w-[30%] h-[70%] flex flex-col justify-center items-center backdrop-blur-md rounded-md">
                    <div className="title-container min-h-[20%] ">
                        <h1 className="title-content font-extrabold rounded-full text-white">Evangelismo</h1>
                    </div>
                    <form method="post" className="w-full h-full flex flex-col justify-center items-center  p-10 " onSubmit={handleSubmit}>
                        <p className="text-white">Inicia sesión con tus credenciales</p>
                        <div className={'auth-field-container'}>
                            <input
                                name="email"
                                value={user.email}
                                onChange={handleOnChange}
                                type="email"
                                placeholder="Email"
                                className={'auth-field-content'} />
                            <BiEnvelope size={25} color="black" className="absolute right-5" />

                        </div>
                        <div className={'auth-field-container'}>
                            <input
                                name="password"
                                value={user.password}
                                onChange={handleOnChange}
                                type="password"
                                placeholder="Contraseña"
                                className={'auth-field-content'}
                            />
                            <BiLock size={25} color="black" className="absolute right-5" />
                        </div>
                        <div className={'auth-field-container'}>
                            <button className="bg-blue-950 py-3 text-white my-2 rounded-full  outline-none">Iniciar Sesion</button>
                        </div>

                    </form>
                </div>
                <div className="w-full flex flex-col justify-center items-center h-40">
                    <p className="text-white">Aun no tienes una cuenta? <Link className="text-blue-400 hover:text-blue-200" to={"/register"}>Registrarme</Link></p>
                </div>
            </div>
        </div>
    )
}

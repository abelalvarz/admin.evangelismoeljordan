import { BiEnvelope, BiLock } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineCardTravel } from "react-icons/md";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom"

const roles = [
    {label:'Presidente'},
    {label:'Vicepresidente'},
    {label:'Secretario'},
    {label:'Tesorero'},
]
interface Props {
    user: any,
    handleOnChange: (e: any) => void
    handleSubmit: (e: any) => void
}

export const RegisterComponent = ({user, handleOnChange, handleSubmit}:Props) => {
    return (
        <div className="w-full h-[100vh] flex justify-center items-center bg-[url(/background.jpg)] bg-cover bg-center ">
            <div className="w-full h-full flex flex-col justify-center items-center bg-[rgba(0,0,0,0.5)]">
                <div className="w-[30%] h-[70%] flex flex-col justify-center items-center backdrop-blur-md rounded-md">
                    <div className="title-container min-h-[20%] ">
                        <h1 className="title-content font-extrabold text-white">Evangelismo</h1>
                    </div>
                    <form method="post" className="w-full h-full flex flex-col justify-center items-center  p-10 " onSubmit={handleSubmit}>
                        <p className="text-white">Registrate pare tener acceso a la plataforma</p>

                        <div className={'auth-field-container'}>
                            <InputText
                                name="name"
                                value={user.name}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Nombre"
                                className={`${'auth-field-content'}`} />
                            <CgProfile size={25} color="black" className="absolute right-5" />
                        </div>
                        <div className={'auth-field-container'}>
                            <InputText
                                name="email"
                                value={user.email}
                                onChange={handleOnChange}
                                type="email"
                                placeholder="Email"
                                className={'auth-field-content'} />
                            <BiEnvelope size={25} color="black" className="absolute right-5" />
                        </div>
                        <div className={'auth-field-container'}>
                            <Dropdown
                                name="role"
                                value={user.role}
                                onChange={handleOnChange}
                                type="text"
                                options={roles}
                                optionLabel="label"
                                placeholder="Cargo"
                                style={{ color: 'white' }}
                                dropdownIcon
                                collapseIcon
                                className={` b rounded-full `} />
                            <MdOutlineCardTravel size={25} color="black" className="absolute right-5" />
                        </div>
                        <div className={'auth-field-container'}>
                            <InputText
                                name="password"
                                value={user.password}
                                onChange={handleOnChange}
                                type="password"
                                placeholder="Contraseña"
                                className={`${'auth-field-content'}`}
                            />
                            <BiLock size={25} color="black" className="absolute right-5" />
                        </div>
                        <div className={'auth-field-container'}>
                            <button className="bg-blue-950 py-3 text-white my-2 rounded-full  outline-none">Registrarme</button>
                        </div>

                    </form>
                </div>
                <div className="w-full flex flex-col justify-center items-center h-20">
                    <p className="text-white">Ya tienes una cuenta? <Link className="text-blue-400 hover:text-blue-300" to={"/login"}>Iniciar Sesión</Link></p>
                </div>
            </div>

        </div>
    )
}

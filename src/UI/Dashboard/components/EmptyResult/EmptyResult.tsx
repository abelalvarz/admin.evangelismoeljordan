import { PiEmptyBold } from "react-icons/pi"

export const EmptyResult = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <PiEmptyBold className="text-gray-400" size={100} />
            <h1 className="text-gray-400 text-center">Aun no hemos recibido ningun reporte :(</h1>
        </div>
    )
}

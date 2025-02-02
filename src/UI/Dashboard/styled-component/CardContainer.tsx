import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
    children?: React.ReactNode;
    title: string;
    className?: string;
    contentClassName?: string;
    initialDate?: any,
    finalDate?: any
    fullScreen?: boolean
}
export const CardContainer = ({ initialDate, finalDate, children, title, contentClassName}: Props) => {
    return (
        <div className={`w-full h-full mx-1 flex flex-col rounded-md my-0`}>
            <div className={`px-5 py-4 w-full h-[20%] flex `}>
                <div>
                    <h2 className={`font-bold`}>{title}</h2>
                    <p>{initialDate && format(initialDate, "EEEE d 'de' MMMM", { locale: es })} a {finalDate && format(finalDate, "EEEE d 'de' MMMM", { locale: es })}</p>
                </div>
            </div>
            <div className={`${contentClassName} py-2 md:w-full h-[80%] box-border flex justify-center items-center`}>
                {children}
            </div>

        </div>
    )
}

import { Toast } from "primereact/toast";
import { createContext, useContext, useRef } from "react";

interface ToastProps {
    show: (type: SeverityType, title: String, message: String) =>void;
}
type SeverityType = 'info' | 'success' | 'warn' | 'error'

const ToasContext = createContext<ToastProps|undefined>(undefined)

export const ToastProvider = ({ children }: any) => {
    const toast = useRef<Toast>(null);

    const show = (type: SeverityType, title: String, message: String) => {
        toast.current?.show({ severity: type, summary: title, detail: message });
    };

    return (
        <ToasContext.Provider value={{show}} >
            <Toast ref={toast} />
            {children}
        </ToasContext.Provider>
    )
}

export const useToast = () => {
    return useContext(ToasContext);
}
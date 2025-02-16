import { ProgressSpinner } from "primereact/progressspinner";
import { createContext, ReactNode, useContext, useState } from "react"

interface ContextProps {
    start: VoidFunction;
    stop: VoidFunction;
}
interface ProviderProps {
    children: ReactNode
}
export const LoadingContext = createContext<ContextProps | undefined>(undefined);

export const LoadingProvider = ({ children }: ProviderProps) => {

    const [loading, setLoading] = useState(false);

    const start = () => {
        setLoading(true)
    }

    const stop = () => {
        setLoading(false)
    }

    return (
        <LoadingContext.Provider value={{ start, stop }}>
            <div className={` w-full h-full fixed z-10 flex justify-center items-center bg-[rgba(0,0,0,0.5)] ${loading ? 'visible' : 'hidden'}`}>
                <ProgressSpinner
                    style={{ width: '50px', height: '50px' }}
                    strokeWidth="8"
                    animationDuration=".5s" />
            </div>

            {children}
        </LoadingContext.Provider>
    )
}
export const useLoading = () => {
    return useContext(LoadingContext)
}
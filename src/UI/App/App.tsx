import { Router } from './component/Router'
import { PrimeReactProvider } from 'primereact/api';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';
import './utils/locale'

export const App = () => {
    return (
        <ToastProvider>
            <AuthProvider>
                <LoadingProvider>
                    <PrimeReactProvider value={{ unstyled: false }}>
                        <Router />
                    </PrimeReactProvider>
                </LoadingProvider>
            </AuthProvider>
        </ToastProvider>

    )
}

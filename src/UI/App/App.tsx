import { Router } from './component/Router'
import { PrimeReactProvider } from 'primereact/api';
import { ToastProvider } from './context/ToastContext';

export const App = () => {
  return (
    <ToastProvider>
      <PrimeReactProvider value={{ unstyled: false }}>
        <Router />
      </PrimeReactProvider>
    </ToastProvider>

  )
}

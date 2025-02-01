import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'

interface Props {
    visible: boolean
    onHide: VoidFunction
    handleSave: VoidFunction
}
export const ConfirmationDialog = ({ visible, onHide, handleSave }: Props) => {
    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={onHide} className="p-button-text bg-red-400 px-2 py-1 " />
            <Button label="Si" icon="pi pi-check" onClick={handleSave} autoFocus className='bg-green-600 py-1 px-2 ml-4' />
        </div>
    );
    return (
        <div>
            <Dialog
                header="Confirmación"
                visible={visible}
                onHide={onHide}
                className='max-sm:w-[80vw] rounded-r-md'
                footer={footerContent}>
                <div className='flex items-center justify-around'>
                    <i className='pi pi-exclamation-circle' />
                    <p>Seguro de enviar el reporte?</p>
                </div>
            </Dialog>
        </div>
    )
}

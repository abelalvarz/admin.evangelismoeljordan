import { ReportCreation } from '../../../Create/components/ReportFormComponent/ReportCreation'
import { ConfirmationDialog } from '../../../Create/components/ConfirmationComponent/ConfirmationDialog'

export const ReportEditor = ({ title, report, handleOnchangeData, handleSave, disabled, showDialog, setShowDialog, save }: any) => {

    return (
        <div className='flex flex-col justify-start items-center w-full h-fit bg-transparent sm:mt-[5vh] md:mt-[5vh] rounded-md'>
            <div className={`xl:w-[70%] lg:w-[70%] md:w-[90%] w-full h-fit bg-gray-100 p-10 max-sm:bg-transparent rounded-md top-0 `}>

                <div className='title-container'>
                    <h1 className='title-content'>{title ? title : 'Nuevo Reporte'}</h1>
                </div>

                <ReportCreation
                    data={report}
                    onChangeData={handleOnchangeData}
                    handleShowDialog={() => handleSave()}
                    disabled={disabled} />

                <ConfirmationDialog
                    visible={showDialog}
                    onHide={() => setShowDialog(!showDialog)}
                    handleSave={save}
                />

            </div>
        </div >
    )
}

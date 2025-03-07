import { InputTextarea } from 'primereact/inputtextarea'
import React from 'react'
import { InputCard } from './ReportCreation'
import { Report } from '../../../../../Core/Reports/domain/model/Report'

interface Props {
    onChangeData: (value: any) => void,
    data: Report;
    disabled: boolean;
}
export const OfferingStepperPanel = ({ onChangeData, data, disabled }: Props) => {
    return (
        <React.Fragment>
            <InputCard label="Ofrenda" type="text" value={data.offering}
                onChange={(e: any) => onChangeData({ 'offering': (e.value | 0) })}
                disabled={disabled}
            />
            <div className='w-full flex flex-col'>
                <label>Comentarios u Observaciones: </label>
                <InputTextarea
                    value={data.comments}
                    onChange={(e: any) => onChangeData({ 'comments': e.target.value })}
                    className='border-gray-300 border-x-2 border-y-2 outline-none'
                    disabled={disabled}
                    autoResize rows={5} cols={30} />
            </div>
        </React.Fragment>
    )
}

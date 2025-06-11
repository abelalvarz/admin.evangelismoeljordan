import { InputTextarea } from 'primereact/inputtextarea'
import React from 'react'
import { Report } from '../../../../../Core/Reports/domain/model/Report'
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';

interface Props {
    onChangeData: (value: any) => void,
    data: Report;
    disabled: boolean;
}
export const OfferingStepperPanel = ({ onChangeData, data, disabled }: Props) => {
    return (
        <React.Fragment>
            <div className='w-full flex justify-between items-center mt-2'>
                <div className='w-[70%]'>
                    <label>Ofrenda: </label>
                </div>
                <div className='w-[30%]'>
                    <InputNumber
                        value={data.offering}
                        onChange={(e: InputNumberChangeEvent) => onChangeData({ "offering": e.value })}
                        mode="currency"
                        currency="GTQ"
                        locale="es-GT"
                        inputClassName='w-full p-2 border-gray-300 border-x-2 border-y-2 rounded-md text-center outline' />
                </div>
            </div>
            <div className='w-full flex flex-col'>
                <label>Comentarios u Observaciones: </label>
                <InputTextarea
                    value={data.comments}
                    onChange={(e: any) => onChangeData({ 'comments': e.target.value })}
                    className='border-gray-300 border-x-2 border-y-2 outline-none p-3'
                    disabled={disabled}
                    autoResize rows={5} cols={30} />
            </div>
        </React.Fragment>
    )
}

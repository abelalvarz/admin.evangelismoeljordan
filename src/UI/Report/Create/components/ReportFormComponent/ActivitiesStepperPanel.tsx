import React from 'react'
import { InputCard } from './ReportCreation'

interface Props {
    onChangeData: (value: any) => void,
    data: any
    disabled:boolean
}

export const ActivitiesStepperPanel = ({ onChangeData, data, disabled}: Props) => {
    return (
        <React.Fragment>

            <InputCard label="Hogares Visitados" type="text" value={data.visitedHomes}
                onChange={(e: any) => onChangeData({ 'visitedHomes': (e.value | 0) })}
                disabled={disabled}
            />
            <InputCard label="Aceptados" type="text" value={data.newChristians}
                onChange={(e: any) => onChangeData({ 'newChristians': (e.value | 0) })}
                disabled={disabled}
            />
            <InputCard label="Reconciliados" type="text" value={data.reconciled}
                onChange={(e: any) => onChangeData({ 'reconciled': (e.value | 0) })}
                disabled={disabled}
            />
            <InputCard label="Asistencia a Vigilia" type="text" value={data.vigilAttendance}
                onChange={(e: any) => onChangeData({ 'vigilAttendance': (e.value | 0) })}
                disabled={disabled}
            />
        </React.Fragment>

    )
}

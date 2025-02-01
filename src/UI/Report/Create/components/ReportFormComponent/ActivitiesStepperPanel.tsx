import React from 'react'
import { InputCard } from './ReportCreation'

interface Props {
    onChangeData: (value: any) => void,
    data: any
}

export const ActivitiesStepperPanel = ({ onChangeData, data }: Props) => {
    return (
        <React.Fragment>

            <InputCard label="Hogares Visitados" type="text" value={data.visitedHomes}
                onChange={(e: any) => onChangeData({ 'visitedHomes': (e.value | 0) })}
            />
            <InputCard label="Aceptados" type="text" value={data.newChristians}
                onChange={(e: any) => onChangeData({ 'newChristians': (e.value | 0) })}
            />
            <InputCard label="Reconciliados" type="text" value={data.reconciled}
                onChange={(e: any) => onChangeData({ 'reconciled': (e.value | 0) })}
            />
            <InputCard label="Asistencia a Vigilia" type="text" value={data.vigilAttendance}
                onChange={(e: any) => onChangeData({ 'vigilAttendance': (e.value | 0) })}
            />
        </React.Fragment>

    )
}

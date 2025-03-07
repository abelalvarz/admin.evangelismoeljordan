import React from 'react'
import { InputCard } from './ReportCreation'

interface Props {
    onChangeData: (value: any) => void,
    data: any,
    disabled: boolean
}



export const AssistanceStepperPanel = ({ onChangeData, data, disabled }: Props) => {
    const sum = () => {
        const activeMember = data.activeMembers || 0
        const activeMemberChildren = data.activeMembersChildren || 0
        const noActiveMember = data.noActiveMembers || 0
        const noActiveMemberChildren = data.noActiveMembersChildren || 0
        const visitorChildren = data.visitorChildren || 0
        const visitors = data.visitors || 0
        return 0 + 0 + activeMember + activeMemberChildren + noActiveMember + noActiveMemberChildren + visitorChildren + visitors
    }
    return (
        <React.Fragment>
            <InputCard label="Miembros activos" type="text" value={data.activeMembers}
                onChange={(e: any) => onChangeData({ 'activeMembers': (e.value | 0) })}
                disabled={disabled}
            />
            <InputCard label="Hijos de Miembros activos" type="text" value={data.activeMembersChildren}
                onChange={(e: any) => onChangeData({ 'activeMembersChildren': (e.value | 0) })}
                disabled={disabled}
            />
            <InputCard label="Miembros No activos" type="text" value={data.noActiveMembers}
                onChange={(e: any) => onChangeData({ 'noActiveMembers': (e.value | 0) })}
                disabled={disabled}
            />
            <InputCard label="Hijos de Miembros No activos" type="text" value={data.noActiveMembersChildren}
                onChange={(e: any) => onChangeData({ 'noActiveMembersChildren': (e.value | 0) })}
                disabled={disabled}
            />
            <InputCard label="Niños Visitantes" type="text" value={data.visitorChildren}
                onChange={(e: any) => onChangeData({ 'visitorChildren': (e.value | 0) })}
                disabled={disabled}
            />
            <InputCard label="Amigos Visitantes" type="text" value={data.visitors}
                onChange={(e: any) => onChangeData({ 'visitors': (e.value | 0) })}
                disabled={disabled}
            />
            <InputCard label="Total" type="text" disabled
                value={sum()}
            />
        </React.Fragment>
    )
}

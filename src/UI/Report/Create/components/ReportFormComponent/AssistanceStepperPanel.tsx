import React from 'react'
import { InputCard } from './ReportCreation'

interface Props {
    onChangeData: (value: any) => void,
    data: any
}



export const AssistanceStepperPanel = ({ onChangeData, data }: Props) => {
    const sum = () => {
        const activeMember = data.activeMember == "" ? 0 : parseInt(data.activeMember)
        const activeMemberChildren = data.activeMemberChildren == "" ? 0 : parseInt(data.activeMemberChildren)
        const noActiveMember = data.noActiveMember == "" ? 0 : parseInt(data.noActiveMember)
        const noActiveMemberChildren = data.noActiveMemberChildren == "" ? 0 : parseInt(data.noActiveMemberChildren)
        const visitorChildren = data.visitorChildren == "" ? 0 : parseInt(data.visitorChildren)
        const visitors = data.visitors == "" ? 0 : parseInt(data.visitors)
        return 0 + 0 + activeMember + activeMemberChildren + noActiveMember + noActiveMemberChildren + visitorChildren + visitors
    }
    return (
        <React.Fragment>
            <InputCard label="Miembros activos" type="text" value={data.activeMember}
                onChange={(e: any) => onChangeData({ 'activeMember': (e.value | 0) })}
            />
            <InputCard label="Hijos de Miembros activos" type="text" value={data.activeMemberChildren}
                onChange={(e: any) => onChangeData({ 'activeMemberChildren': (e.value | 0) })}
            />
            <InputCard label="Miembros No activos" type="text" value={data.noActiveMember}
                onChange={(e: any) => onChangeData({ 'noActiveMember': (e.value | 0) })}
            />
            <InputCard label="Hijos de Miembros No activos" type="text" value={data.noActiveMemberChildren}
                onChange={(e: any) => onChangeData({ 'noActiveMemberChildren': (e.value | 0) })}
            />
            <InputCard label="Niños Visitantes" type="text" value={data.visitorChildren}
                onChange={(e: any) => onChangeData({ 'visitorChildren': (e.value | 0) })}
            />
            <InputCard label="Amigos Visitantes" type="text" value={data.visitors}
                onChange={(e: any) => onChangeData({ 'visitors': (e.value | 0) })}
            />
            <InputCard label="Total" type="text" disabled
                value={sum()}
            />
        </React.Fragment>
    )
}

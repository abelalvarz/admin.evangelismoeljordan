
import React, { useEffect, useState } from 'react'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { FamilyGroupService } from '../../../../../Core/FamilyGroups/infrastructure/service/FamiltyGroupService'
import { FamilyGroup } from '../../../../../Core/FamilyGroups/domain/model/FamilyGroup'

interface Props {
    onChangeData: (value: any) => void,
    data: any
}

export const GroupInformation = ({ onChangeData, data }: Props) => {

    const familyGroupService = FamilyGroupService;
    const [familyGroups, setFamilyGroups] = useState<FamilyGroup[]>([])

    useEffect(() => {
        getFamiltyGroups();
    }, [])

    const getFamiltyGroups = async () => {
        const response = await familyGroupService.getAll.execute()
        setFamilyGroups(response.data)
    }

    return (
        <React.Fragment>
            <div className='w-full flex flex-col'>
                <label>Fecha: </label>
                <Calendar
                    value={data.meetingDate}
                    placeholder='Ingresa una Fecha'
                    inputClassName='p-2'
                    showIcon
                    locale='es'
                    onChange={(e: any) => onChangeData({ 'meetingDate': e.value })}
                    className='w-fiull border-gray-300 border-x-2 border-y-2 rounded-md outline-none'
                />
            </div>
            <div className='w-full flex flex-col'>
                <label>Grupo Familiar: </label>
                <Dropdown
                    value={data.familyGroup}
                    onChange={(e: any) => onChangeData({ 'familyGroup': e.value })}
                    options={familyGroups}
                    optionLabel="name"
                    placeholder="Seleccionar Grupo"
                    className="w-fiull border-gray-300 border-x-2 border-y-2 rounded-md" />
            </div>
        </React.Fragment>
    )
}

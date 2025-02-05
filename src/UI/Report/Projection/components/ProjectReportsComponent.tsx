import React from 'react'
import { Report } from '../../../../Core/Reports/domain/model/Report'
import { ReportDetailComponent } from '../../utils/components/ReportDetailComponet.tsx/ReportDetailComponent'

interface Props {
    data: Report,
    active: number,
    index: number
}
export const ProjectReportsComponent = ({ data, active, index }: Props) => {
    return (
        <React.Fragment>
            <div className={`w-full h-full flex justify-center items-center box-border ${active === index ? '' : 'hidden'} `}>
                <ReportDetailComponent data={data} />
            </div>
        </React.Fragment>
    )
}

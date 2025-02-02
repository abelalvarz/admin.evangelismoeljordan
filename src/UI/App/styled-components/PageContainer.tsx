import React from 'react'

interface Props {
    children: React.ReactNode;
}
export const PageContainer = ({ children }: Props) => {
    return (
        <div className={`page-container`}>
            {children}
        </div>
    )
}

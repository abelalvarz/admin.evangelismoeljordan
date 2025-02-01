import React from 'react'

interface Props {
    children: React.ReactNode;
}
export const PageContainer = ({ children }: Props) => {
    return (
        <div className={`md:w-[85%] lg:w-[88%] lg:ml-[12%] md:ml-[15%] h-[100vh]  bg-gray-200 overflow-y-hidden overflow-x-hidden`}>
            {children}
        </div>
    )
}

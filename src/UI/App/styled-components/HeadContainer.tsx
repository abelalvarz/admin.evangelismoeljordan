import React from 'react'

interface Props {
    children: React.ReactNode;
    className?:string
}
export const HeadContainer = ({ children, className }: Props) => {
    return (
        <div className={`flex justify-between items-center  h-[5vh] ${className}`}>
            {children}
        </div>
    )
}

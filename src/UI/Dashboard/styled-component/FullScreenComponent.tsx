import React, { useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Button } from "primereact/button";
import { BiExpand } from "react-icons/bi";
import { FcNext, FcPrevious } from "react-icons/fc";


interface Props {
    children: React.ReactNode[],
    className: string
}

export const FullScreenComponent = ({ children, className }: Props) => {

    const handle = useFullScreenHandle();
    const [fullScreen, setFullScreen] = useState(false);
    const [activeComponent, setActivedComponente] = useState(0)

    useEffect(() => {
        if (!handle.active && fullScreen) {
            setFullScreen(false)
        }
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }

    }, [handle.active])

    const handleKeyDown = (e: any) => {
        const { key } = e;
        if (key === 'ArrowLeft') {
            handlePrev()
        }
        if (key === "ArrowRight") {
            handleNext()
        }
    }

    const handleFullScreen = () => {
        handle.enter()
        setFullScreen(true)
    }

    const handlePrev = () => {
        setActivedComponente(prevComponent => {
            if (prevComponent > 0) {
                return prevComponent - 1;
            }
            return prevComponent;
        });
    };

    const handleNext = () => {
        setActivedComponente(prevComponent => {
            if (prevComponent + 1 < children.length) {
                return prevComponent + 1;
            }
            return prevComponent;
        });
    };

    return (
        <FullScreen
            handle={handle}
            className={`w-full flex justify-center items-center  ${fullScreen ? 'h-[100vh] bg-gray-50' : ''} ${className}`}
        >
            {
                children.length > 1 ?
                    children.map((item: any, index) => (
                        <div key={index} className={`
                            ${fullScreen
                                ? `h-[70vh] ${activeComponent == index ? 'visible w-full justify-center items-center text-5xl' : 'hidden'}`
                                : `${item?.props?.className} text-xl`}`}>
                            {item}
                        </div>
                    )) : children
            }

            {
                fullScreen && (
                    <div className="w-full  absolute flex justify-between">
                        <button className="right-0" onClick={handlePrev}>
                            <FcPrevious size={25} />
                        </button>
                        <button className="right-0" onClick={handleNext}>
                            <FcNext size={25} />
                        </button>
                    </div>
                )
            }

            <div className={`${!fullScreen ? 'bg-blue-200 absolute bottom-6 right-0' : 'hidden'} `}>
                <Button className='300 p-2' onClick={handleFullScreen}>
                    <BiExpand size={25} />
                </Button>
            </div>
        </FullScreen>
    )
}

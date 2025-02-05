import React, { useEffect } from 'react'
import { BiFullscreen } from "react-icons/bi"
import { BsFullscreenExit } from "react-icons/bs"
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import { FcNext, FcPrevious } from "react-icons/fc"

interface Props {
    dataSize: number,
    handleOnchange: any,
    children: React.ReactNode
}
export const FullScreenComponent = ({ dataSize, handleOnchange, children }: Props) => {

    const handle = useFullScreenHandle();

    useEffect(() => {
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

    const toggleFullScreen = () => {
        if (handle.active) {
            handle.exit()
        } else {
            handle.enter()
        }
    }

    const handlePrev = () => {
        handleOnchange((prevItem: any) => {
            if (prevItem > 0) {
                return prevItem - 1;
            }
            return prevItem;
        });
    };

    const handleNext = () => {
        handleOnchange((prevItem: any) => {
            if (prevItem + 1 < dataSize) {
                return prevItem + 1;
            }
            return prevItem;
        });
    };

    return (
        <React.Fragment>
            <FullScreen handle={handle} className={`w-full h-[80%] flex justify-center items-center bg-gray-50 relative rounded-md`}>
                {children}

                <div className="w-full  absolute flex justify-between">
                    <button className="right-0 outline-none hover:bg-gray-200 p-5 rounded-full" onClick={handlePrev}>
                        <FcPrevious size={25} />
                    </button>
                    <button className="right-0 outline-none hover:bg-gray-200 p-5 rounded-full" onClick={handleNext}>
                        <FcNext size={25} />
                    </button>
                </div>
                
                <button
                    onClick={toggleFullScreen}
                    className={`absolute outline-none ${handle.active ? 'bottom-10 right-10' : 'bottom-5 right-5'}`}>
                    {handle.active ? <BsFullscreenExit size={25} /> : <BiFullscreen size={25} />}
                </button>
            </FullScreen>
        </React.Fragment>
    )
}

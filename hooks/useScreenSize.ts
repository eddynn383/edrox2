"use client"

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {
        const handleResize = () => {
            console.log("Before Load: ", screenSize)
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            console.log("After Load: ", screenSize)
        };

        window.addEventListener("load resize", handleResize);
        
        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("load resize", handleResize);
        };
        
    }, []);

    return screenSize;
};

export default useScreenSize;

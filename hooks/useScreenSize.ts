"use client"

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

        window.addEventListener("resize", handleResize);
        
        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
        
    }, []);

    return screenSize;
};

export default useScreenSize;

"use client"

import React, { createContext, useState } from 'react';

const ToggleContext = createContext<any>({
    state: false,
    setState: () => {}
});

const ToggleProvider = ({ children }: any) => {
    const [state, setState] = useState<boolean>(false);

    const handleState = () => {
        setState(!state);
    };

    console.log(state)

    return (
        <ToggleContext.Provider value={{state, handleState}}>
            {children}
        </ToggleContext.Provider>
    );
};

export { ToggleContext, ToggleProvider };

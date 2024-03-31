import { useState } from "react";
import { createContext } from "vm";

const DeviceContext = createContext({})

const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
    const [deviceType, setDeviceType] = useState<string | null>(null);

    const value = {
        deviceType, 
        setDeviceType
    }

    return (
        <DeviceContext.Provider value={value}>
            {children}
        </DeviceContext.Provider>
    );
};

export { DeviceContext, DeviceProvider };
"use client"
import React, { createContext, useState, useContext } from 'react';

interface DeviceContextProps {
    deviceType: string | null;
    updateDeviceType: (newDeviceType: string) => void;
}

const DeviceContext = createContext<DeviceContextProps | null>(null);

const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
    const [deviceType, setDeviceType] = useState<string | null>(null);

    const updateDeviceType = (newDeviceType: string) => setDeviceType(newDeviceType);

    return (
        <DeviceContext.Provider value={{ deviceType, updateDeviceType }}>
            {children}
        </DeviceContext.Provider>
    );
};

export { DeviceContext, DeviceProvider };
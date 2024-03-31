import { useContext } from 'react';
import { DeviceContext } from '@/context/deviceContext';

interface DeviceContextType {
    deviceType: string | null;
    updateDeviceType: (newDeviceType: string) => void;
}

const useDeviceType = () => {
    const { deviceType, updateDeviceType } = useContext(DeviceContext) as DeviceContextType;

    return { deviceType, updateDeviceType };
};

export default useDeviceType;
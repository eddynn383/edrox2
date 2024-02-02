import React from 'react';
import dynamic from 'next/dynamic'
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { IconProps } from "./interface"

const _Icon = ({ name, className, ...props }: IconProps) => {
    const LucideIcon = dynamic(dynamicIconImports[name])

    return <LucideIcon {...props} className={className} />;
};

const Icon = React.memo(_Icon)

export { Icon };
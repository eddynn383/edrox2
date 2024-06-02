import React from 'react';
import dynamic from 'next/dynamic'
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { IconProps } from "./interface"
import icon from "./icon.module.css"

const _Icon = ({ className=icon.container, name, size="M", ...props }: IconProps) => {
    const LucideIcon = dynamic(dynamicIconImports[name])

    return <LucideIcon className={className} data-size={size} {...props} />;
};

const Icon = React.memo(_Icon)

export { Icon };
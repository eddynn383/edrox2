import React from 'react';
import dynamic from 'next/dynamic'
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { IconProps } from "./interface"
import icon from "./icon.module.css"

const _Icon = ({ className = icon.container, name, size = "M", strokeWidth, ...props }: IconProps) => {
    const LucideIcon = dynamic(dynamicIconImports[name])

    return <LucideIcon className={className} data-size={size} strokeWidth={strokeWidth || 2.5} {...props} />;
};

const Icon = React.memo(_Icon)

export { Icon };

// import { icons } from 'lucide-react'
// import { memo } from 'react'

// export type IconProps = {
//     name: keyof typeof icons
//     className?: string
//     strokeWidth?: number
// }

// const Icon = memo(({ name, className, strokeWidth }: IconProps) => {
//     const IconComponent = icons[name]

//     if (!IconComponent) {
//         return null
//     }

//     return <IconComponent className={className} strokeWidth={strokeWidth || 2.5} />
// })

// Icon.displayName = "Icon"

// export { Icon }
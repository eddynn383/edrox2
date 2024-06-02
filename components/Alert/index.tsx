"use client";

import React from 'react';
import { AlertDescriptionProps, AlertProps, AlertTitleProps } from "./interface";
import alert from "./alert.module.css"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ className=alert.container, mode = "solid", status, ...props }, ref) => {

    return (
        <div className={className} data-mode={mode} data-status={status} ref={ref} {...props} />
    )
})

Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(({className=alert.title, ...props }, ref) => (
    <h5 className={className} ref={ref} {...props} />
))

AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(({ className=alert.description, ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
))

AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
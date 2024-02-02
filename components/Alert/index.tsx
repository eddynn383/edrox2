"use client";

import React from 'react';
import { AlertProps } from "./interface";
import sx from "@/styles/component.module.scss";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ mode = "solid", status, ...props }, ref) => {

    return (
        <div className={sx["alert"]} data-mode={mode} data-status={status} ref={ref} {...props} />
    )
})

Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({...props }, ref) => (
    <h5 className={sx['alert_title']} ref={ref} {...props} />
))

AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={sx['alert_description']} {...props} />
))

AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
import React from "react";
import { Mode, Status } from "@/interfaces/global";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    mode?: Mode;
    status: Status;
    position?: "static" | "absolute";
    action?: any;
    delay?: number;
    children?: any;
}

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {

}

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {

}


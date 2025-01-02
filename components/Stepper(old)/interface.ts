import { ReactElement } from "react";

type Status = "Not started" | "Started" | "Completed";

export type Step = {
    id: string;
    icon: any;
    name: string;
    complete: boolean;
    separator: boolean;
    requiredFields?: number;
    href: string;
    onAction?: () => void;
}


export interface StepProps {
    icon: ReactElement;
    number: string;
    name: string;
    complete: boolean;
    separator?: boolean;
    href: string;
    onAction?: () => void;
}

export interface StepperProps {
    steps: Step[];
    // currentStep: number;
    // onPrev?: any;
    // onNext?: any;
    // onClick?: any;
    // onDone?: any;
    orientation?: "vertical" | "horizontal";
}

export interface SeparatorProps {
    complete: boolean;
}
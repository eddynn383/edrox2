
import { CreationStep } from "@prisma/client";

export interface StepProps {
    name: string;
    status: string;
    href: string;
    course?: any;
    onAction?: () => void;
}

export interface StepperProps {
    steps: CreationStep[];
    course?: any;
}

export interface SeparatorProps {
    complete: boolean;
}
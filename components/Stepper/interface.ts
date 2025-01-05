import { CreationStep } from "@prisma/client";

export interface StepProps {
    name: string;
    status: string;
    href: string;
    onAction?: () => void;
}

export interface StepperProps {
    steps: CreationStep[];
}

export interface SeparatorProps {
    complete: boolean;
}
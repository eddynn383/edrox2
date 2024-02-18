export type Step = {
    id: number;
    name: string;
    status: string;
    requiredFields: number;
    url: string;
}

export interface StepperProps {
    steps: Step[];
    currentStep: number;
    onPrev?: any;
    onNext?: any;
    onClick?: any;
    onDone?: any;
}
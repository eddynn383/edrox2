export interface IPropsSkeleton extends React.ComponentProps<"span"> {
    background?: string;
    foreground?: string;
    width: string;
    height: string;
    radius: string;
    animationType: string;
    animationDuration: number;
    extraStyle?: any;
}
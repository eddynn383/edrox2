export interface ToolbarWrapperProps extends React.HTMLProps<HTMLDivElement> {
    shouldShowContent?: boolean;
    orientation?: "horizontal" | "vertical";
    container?: boolean;
}

export interface ToolbarDividerProps extends React.HTMLProps<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
}
import * as LabelPrimitive from "@radix-ui/react-label"

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
    icon?: React.ReactElement
}

export interface FormRowsProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical"
}

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical"
}

export interface FormRowDetailsProps extends React.HTMLAttributes<HTMLDivElement> {

}

export interface FormRowFieldsProps extends React.HTMLAttributes<HTMLDivElement> {

}

export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    direction: "vertical" | "horizontal";
    container?: boolean;
}

export interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
    required?: boolean;
}